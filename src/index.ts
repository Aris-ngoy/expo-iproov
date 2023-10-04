import { NativeModulesProxy, EventEmitter, Subscription } from 'expo-modules-core';

// Import the native module. On web, it will be resolved to ExpoIproov.web.ts
// and on native platforms to ExpoIproov.ts
import ExpoIproovModule from './ExpoIproovModule';
import ExpoIproovView from './ExpoIproovView';
import { ChangeEventPayload, ExpoIproovViewProps } from './ExpoIproov.types';

// Get the native constant value.
export const PI = ExpoIproovModule.PI;

export function hello(): string {
  return ExpoIproovModule.hello();
}

export async function setValueAsync(value: string) {
  return await ExpoIproovModule.setValueAsync(value);
}

const emitter = new EventEmitter(ExpoIproovModule ?? NativeModulesProxy.ExpoIproov);

export function addChangeListener(listener: (event: ChangeEventPayload) => void): Subscription {
  return emitter.addListener<ChangeEventPayload>('onChange', listener);
}

export { ExpoIproovView, ExpoIproovViewProps, ChangeEventPayload };
