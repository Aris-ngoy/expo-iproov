import { requireNativeViewManager } from 'expo-modules-core';
import * as React from 'react';

import { ExpoIproovViewProps } from './ExpoIproov.types';

const NativeView: React.ComponentType<ExpoIproovViewProps> =
  requireNativeViewManager('ExpoIproov');

export default function ExpoIproovView(props: ExpoIproovViewProps) {
  return <NativeView {...props} />;
}
