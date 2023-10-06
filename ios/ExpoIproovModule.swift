import ExpoModulesCore
import iProov

private enum EventName: String, CaseIterable {
    case connecting,
         connected,
         processing,
         success,
         failure,
         cancelled,
         error

    var rawValue: String {
        switch self {
        case .connecting:
            return "iproov_connecting"
        case .connected:
            return "iproov_connected"
        case .processing:
            return "iproov_processing"
        case .success:
            return "iproov_success"
        case .failure:
            return "iproov_failure"
        case .cancelled:
            return "iproov_cancelled"
        case .error:
            return "iproov_error"
        }
    }
}


public class ExpoIproovModule: Module {
    
  private var session: Session?
  
  public func definition() -> ModuleDefinition {
    
    Name("ExpoIproov")

    
    Constants([
      "constants":  [
            "EVENT_CONNECTING": EventName.connecting.rawValue,
            "EVENT_CONNECTED": EventName.connected.rawValue,
            "EVENT_PROCESSING": EventName.processing.rawValue,
            "EVENT_SUCCESS": EventName.success.rawValue,
            "EVENT_FAILURE": EventName.failure.rawValue,
            "EVENT_CANCELLED": EventName.cancelled.rawValue,
            "EVENT_ERROR": EventName.error.rawValue
        ]
    ])

    // Defines event names that the module can send to JavaScript.
    Events(EventName.allCases.map(\.rawValue))

    
    Function("hello") {
      return "Hello world! 👋"
    }
      
      Function("cancel"){
          session?.cancel()
          session = nil
      }
      
      Function("launch"){
          (baseUrl : String, token: String, optionJSON: String) in
          self.launch(streamingURLString: baseUrl, token: token, optionsJSON: optionJSON)
      }
  }
    
   @objc(launch:token:optionsJSON:)
   func launch(streamingURLString: String, token: String, optionsJSON: String) {
       
       guard let streamingURL = URL(string: streamingURLString),
                 let jsonData = optionsJSON.data(using: .utf8),
                 let json = try? JSONSerialization.jsonObject(with: jsonData, options: []) as? [String: Any]
       else {
           self.sendEvent(EventName.error.rawValue, [
               "error": "unexpected_error",
               "reason": nil,
               "message": "Invalid JSON passed from React Native"
           ])
           return
       }

       let options = Options.from(dictionary: json)
       
       session = IProov.launch(streamingURL: streamingURL, token: token, options: options) { status in
           switch status {
           case .connecting:
               self.sendEvent(EventName.connecting.rawValue, [:])
           case .connected:
               self.sendEvent(EventName.connected.rawValue, [:])
           case let .processing(progress, message):
               self.sendEvent(EventName.processing.rawValue, [
                   "progress": progress,
                   "message": message
               ])
           case let .success(result):
               self.sendEvent(EventName.success.rawValue, [
                   "frame": result.frame?.pngData()?.base64EncodedString()
               ])
           case let .failure(result):
               self.sendEvent(EventName.failure.rawValue, [
                   "reason": result.reason,
                   "frame": result.frame?.pngData()?.base64EncodedString()
               ])
           case let .canceled(canceler):
               self.sendEvent(EventName.cancelled.rawValue, [
                   "canceller": canceler.rawValue == 0 ? "user" : "app"
               ])
           case let .error(error):
               self.sendEvent(EventName.error.rawValue, [
                   "error": error.errorName,
                   "reason": error.failureReason,
                   "message": error.localizedMessage
               ])
           @unknown default:
               break
           }
       }
   }
    
}

private extension IProovError {

    var errorName: String {
        switch self {
        case .captureAlreadyActive:
            return "capture_already_active_error"
        case .networkError:
            return "network_error"
        case .cameraPermissionDenied:
            return "camera_permission_error"
        case .serverError:
            return "server_error"
        case .unexpectedError:
            fallthrough
        case .userTimeout:
            return "time_out"
        case .notSupported:
            return "not_supported"
        @unknown default:
            return "unexpected_error"
        }
    }

}
