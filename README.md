# expo-iproov
The iProov Biometrics Expo React Native SDK wraps iProov's native iOS (Swift) and Android (Java) SDKs behind a JavaScript interface for use from within your Expo React Native iOS or Android app

### Requirements

- React Native 0.60 and above
- iOS 11 and above
- Android API Level 21 (Android 5 Lollipop) and above

## Registration

You can obtain API credentials by registering on the [iProov Partner Portal](https://portal.iproov.net).

# Installation in bare React Native projects

For bare React Native projects, you must ensure that you have [installed and configured the `expo` package](https://docs.expo.dev/bare/installing-expo-modules/) before continuing.

### Add the package to your npm dependencies

```
npm install expo-iproov
yarn add expo-iproov
bun install expo-iproov

```

```
npx expo prebuild
```

### Configure for iOS

Run `npx pod-install` after installing the npm package.


### Configure for Android
```
no configure for android
```


## Get started

Once you have a valid token (obtained via the React Native API client or your own backend-to-backend call), you can `launch()` an iProov capture and handle the callback events as follows:

```javascript

import IProov from 'iproov-react-native'

let options = new IProov.Options()
options.filter = {
	name: IProov.Options.LINE_DRAWING,
	style: IProov.Options.CLASSIC,
	foregroundColor: '#00000055',
	backgroundColor: '#32a852'
}

IProov.launch('wss://eu.rp.secure.iproov.me/ws', "< YOUR TOKEN >", options, (event) => {
	switch(event.name) {
	
	case IProov.EVENT_CONNECTING:
	  // The SDK is connecting to the server. You should provide an indeterminate progress indicator
	  // to let the user know that the connection is taking place.
	  break
	
	case IProov.EVENT_CONNECTED:
	  // The SDK has connected, and the iProov user interface will now be displayed. You should hide
	  // any progress indication at this point.
	  break
	
	case IProov.EVENT_PROCESSING:
	  // The SDK will update your app with the progress of streaming to the server and authenticating
	  // the user. This will be called multiple times as the progress updates.
  
	  let progress = event.params.progress
	  let message = event.params.message
	  break
	
	case IProov.EVENT_CANCELLED:
	  // Either the user cancelled iProov by pressing the Close button at the top or
	  // the Home button (canceller == USER)
	  // Or the app cancelled using Session.cancel() (canceller = APP).
	  // You should use this to determine the next step in your flow.

	  let canceller = event.params.canceller
	  break
	
	case IProov.EVENT_FAILURE:
	  // The user was not successfully verified/enrolled, as their identity could not be verified,
	  // or there was another issue with their verification/enrollment. A reason (as a string)
	  // is provided as to why the claim failed, along with a feedback code from the back-end.
  
	  let reason = event.params.reason
	  let frame = event.params.frame // Optional property containing a single Base64 encoded frame
	  break
	
	case IProov.EVENT_SUCCESS:
	  // The user was successfully verified/enrolled and the token has been validated.
   
	  let frame = event.params.frame // Optional property containing a single Base64 encoded frame
	  break

	case IProov.EVENT_ERROR:
	  // The user was not successfully verified/enrolled due to an error (e.g. lost internet connection).
	  // You will be provided with an Exception (see below).
	  // It will be called once, or never.
	  let error = event.params.error
	  let reason = event.params.reason
	  let message = event.params.message
	  break
	}
})
```

* [iProov Biometrics Bare react native sdk](https://github.com/iProov/react-native.git)


# Contributing

Contributions are very welcome! Please refer to guidelines described in the [contributing guide]( https://github.com/expo/expo#contributing).
