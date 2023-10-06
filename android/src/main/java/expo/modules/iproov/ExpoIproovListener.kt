package expo.modules.iproov

import android.content.Context
import android.graphics.Bitmap
import android.os.Bundle
import android.util.Base64
import com.iproov.sdk.IProov
import com.iproov.sdk.IProovCallbackLauncher
import com.iproov.sdk.core.exception.CameraException
import com.iproov.sdk.core.exception.CameraPermissionException
import com.iproov.sdk.core.exception.CaptureAlreadyActiveException
import com.iproov.sdk.core.exception.FaceDetectorException
import com.iproov.sdk.core.exception.IProovException
import com.iproov.sdk.core.exception.InvalidOptionsException
import com.iproov.sdk.core.exception.MultiWindowUnsupportedException
import com.iproov.sdk.core.exception.NetworkException
import com.iproov.sdk.core.exception.ServerException
import java.io.ByteArrayOutputStream

class ExpoIproovListener(private val context: Context, private val sendEvent: (name: String, body: Bundle) -> Unit) : IProovCallbackLauncher.Listener{

    override fun onConnecting() {
        val params = Bundle().apply {
            putString("connecting", EVENT_CONNECTING)
        }
        sendEvent(EVENT_CONNECTING, params)
    }

    override fun onConnected() {
        val params = Bundle().apply {
            putString("connected", EVENT_CONNECTED)
        }
        sendEvent(EVENT_CONNECTED, params)
    }

    override fun onProcessing(progress: Double, message: String?) {
        val params = Bundle().apply {
            putDouble("progress", progress)
            putString("message", message)
        }
        sendEvent(EVENT_PROCESSING, params)
    }

    override fun onSuccess(result: IProov.SuccessResult) {
        val params = Bundle()
        result.frame?.let {
            params.putString("frame", base64EncodeBitmap(it))
        }
        sendEvent(EVENT_SUCCESS, params)
    }

    override fun onFailure(result: IProov.FailureResult) {
        val params = Bundle().apply {
            putString("feedbackCode", result.reason.feedbackCode)
            putString("reason", context.getString(result.reason.description))
        }
        result.frame?.let {
            params.putString("frame", base64EncodeBitmap(it))
        }
        sendEvent(EVENT_FAILURE, params)
    }

    override fun onCanceled(canceler: IProov.Canceler) {
        val params = Bundle().apply {
            putString("canceller", canceler.name)
        }
        sendEvent(EVENT_CANCELLED, params)
    }

    override fun onError(exception: IProovException) {
        exception.printStackTrace()
        val params = Bundle().apply {
            putString("error", toErrorString(exception))
            putString("reason", exception.reason)
            putString("message", exception.localizedMessage)
        }
        sendEvent(EVENT_ERROR, params)
    }

    private fun toErrorString(e: IProovException): String =
            when(e) {
                is CaptureAlreadyActiveException -> "capture_already_active_error"
                is NetworkException -> "network_error"
                is CameraPermissionException -> "camera_permission_error"
                is ServerException -> "server_error"
                is MultiWindowUnsupportedException -> "multi_window_unsupported_error"
                is CameraException -> "camera_error"
                is FaceDetectorException -> "face_detector_error"
                is InvalidOptionsException -> "invalid_options_error"
                else -> "unexpected_error"
            }

    private fun base64EncodeBitmap(bitmap: Bitmap): String {
        val byteArrayOutputStream = ByteArrayOutputStream()
        bitmap.compress(Bitmap.CompressFormat.PNG, 100, byteArrayOutputStream)
        val byteArray = byteArrayOutputStream.toByteArray()
        return Base64.encodeToString(byteArray, Base64.NO_WRAP)
    }

}