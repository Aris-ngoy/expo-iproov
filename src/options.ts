export class Options {
    title: any = null;
    titleTextColor: any = null;
    filter = {
        name: null,
        style: null,
        foregroundColor: null, // LineDrawing filter
        backgroundColor: null // LineDrawing filter
    };
    surroundColor: any = null;
    font: any = null;
    logoImage: any = null;
    enableScreenshots: any = null;
    closeButtonTintColor: any = null;
    closeButtonImage: any = null;
    promptTextColor: any = null;
    promptBackgroundColor: any = null;
    promptRoundedCorners: any = null;
    certificates: any = null;
    timeoutSecs: any = null;
    orientation: any = null;
    camera: any = null;

    // Deprecated: Value to be removed in future release
    faceDetector: any = null;

    genuinePresenceAssurance = {
        readyOvalStrokeColor: null,
        notReadyOvalStrokeColor: null,
        maxPitch: null,
        maxYaw: null,
        maxRoll: null
    };
    livenessAssurance = {
        ovalStrokeColor: null,
        completedOvalStrokeColor: null
    };

    // options.orientation
    static PORTRAIT = 'portrait';

    static LANDSCAPE = 'landscape';

    static REVERSE_LANDSCAPE = 'reverse_landscape';

    static REVERSE_PORTRAIT = 'reverse_portrait';

    // options.camera
    static FRONT = 'front';

    static EXTERNAL = 'external';

    // options.faceDetector
    static AUTO = 'auto';

    static CLASSIC = 'classic';

    static ML_KIT = 'ml_kit';

    static BLAZEFACE = 'blazeface';

    // options.filter.name
    static NATURAL = 'natural';

    static LINE_DRAWING = 'line_drawing';

    // Styles for Natural filter
    // options.filter.style
    static CLEAR = 'clear';

    static BLUR = 'blur';

    // Styles for LineDrawing filter
    // options.filter.style
    static CLASSIC_STYLE = 'classic';

    static SHADED = 'shaded';

    static VIBRANT = 'vibrant';
}

enum EventType {
  EVENT_CONNECTING,
  EVENT_CONNECTED,
  EVENT_PROCESSING,
  EVENT_SUCCESS,
  EVENT_FAILURE,
  EVENT_CANCELLED,
  EVENT_ERROR,
}

export const eventType: EventType = EventType.EVENT_CONNECTING;

export interface IproovEvent {
    name : EventType
    params : any
}
