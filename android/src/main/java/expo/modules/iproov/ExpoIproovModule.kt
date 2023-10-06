package expo.modules.iproov

import android.content.Context
import android.os.Bundle
import com.iproov.sdk.IProov
import com.iproov.sdk.IProovCallbackLauncher
import com.iproov.sdk.bridge.OptionsBridge
import com.iproov.sdk.core.exception.IProovException
import com.iproov.sdk.core.exception.InvalidOptionsException
import expo.modules.kotlin.exception.Exceptions
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import org.json.JSONException
import org.json.JSONObject
import java.lang.ref.WeakReference

const val EVENT_CONNECTING = "iproov_connecting"
const val EVENT_CONNECTED = "iproov_connected"
const val EVENT_PROCESSING = "iproov_processing"
const val EVENT_SUCCESS = "iproov_success"
const val EVENT_FAILURE = "iproov_failure"
const val EVENT_CANCELLED = "iproov_cancelled"
const val EVENT_ERROR = "iproov_error"

class ExpoIproovModule : Module() {

  private val context: Context
    get() = appContext.reactContext ?: throw Exceptions.ReactContextLost()

  private var iProovCallbackListener: ExpoIproovListener? = null
  private var iProov: IProovCallbackLauncher? = null
  private var iProovSession: IProov.Session? = null

  override fun definition() = ModuleDefinition {

    Name("ExpoIproov")

    Constants(
      "constants" to mapOf(
              "EVENT_CONNECTING" to EVENT_CONNECTING,
              "EVENT_CONNECTED" to EVENT_CONNECTED,
              "EVENT_PROCESSING" to EVENT_PROCESSING,
              "EVENT_SUCCESS" to EVENT_SUCCESS,
              "EVENT_FAILURE" to EVENT_FAILURE,
              "EVENT_CANCELLED" to EVENT_CANCELLED,
              "EVENT_ERROR" to EVENT_ERROR)
    )

    Events(
        EVENT_CONNECTING,
        EVENT_CONNECTED,
        EVENT_PROCESSING,
        EVENT_SUCCESS,
        EVENT_FAILURE,
        EVENT_CANCELLED,
        EVENT_ERROR
    )

    OnDestroy {
      iProovSession = null
      iProov?.listener = null
      iProov = null
      iProovCallbackListener = null
    }

    // Defines a JavaScript synchronous function that runs the native code on the JavaScript thread.
    Function("hello") {
      "Hello world! 👋"
    }

    Function("cancel"){
      iProovSession?.cancel()
    }

    Function("launch"){
      baseUrl: String, token: String, optionsString: String ->

      setUpIProovInstances()

      val options = try {
        OptionsBridge.fromJson(context, JSONObject(optionsString))
      } catch(e: IProovException) {
        e.printStackTrace()
        iProovCallbackListener?.onError(e)
      } catch (e: JSONException) {
        e.printStackTrace()
        iProovCallbackListener?.onError(InvalidOptionsException(context, e.localizedMessage));
      }

      try {
        iProovSession = iProov?.launch(context, baseUrl, token, options as IProov.Options)
      } catch(e: IProovException) {
        e.printStackTrace()
        iProovCallbackListener?.onError(e)
      }
    }


  }

  private fun setUpIProovInstances() {
    if( iProov == null)
      iProov = IProovCallbackLauncher()

    if( iProovCallbackListener == null) {
      val weakModule = WeakReference(this@ExpoIproovModule)
      val emitEvent = { name: String, body: Bundle ->
        try {
          weakModule.get()?.sendEvent(name, body)
        } catch (_: Throwable) {
        }
        Unit
      }
      iProovCallbackListener = ExpoIproovListener(context,emitEvent)
      iProov?.listener = iProovCallbackListener!!
    }
  }

}
