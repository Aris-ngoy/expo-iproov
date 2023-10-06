import { Subscription } from 'expo-modules-core';
import ExpoIproovModule from './ExpoIproovModule';
import { convertColorsToARGB, objectToSnakeCase } from './utils';
import { expoIproovEventEmitter } from './expoIproovEventEmitter';

const { constants } = ExpoIproovModule 

export const {
  EVENT_CONNECTING,
  EVENT_CONNECTED,
  EVENT_PROCESSING,
  EVENT_SUCCESS,
  EVENT_FAILURE,
  EVENT_CANCELLED,
  EVENT_ERROR
} = constants


export function hello(): string {
  return ExpoIproovModule.hello();
}

export function launch(baseUrl, token, options, listener) {
  registerDelegateListeners(listener)
  const snakeCaseOptions = objectToSnakeCase(options)
  const snakeCaseOptionsWithARGBColors = convertColorsToARGB(snakeCaseOptions)
  ExpoIproovModule.launch(baseUrl, token, JSON.stringify(snakeCaseOptionsWithARGBColors))
}

export function cancel() {
  ExpoIproovModule.cancel()
}

export function addStepChangedListener(
  listener: (event: any) => void
): Subscription {
  return expoIproovEventEmitter.addListener<any>("onStepCounted", listener);
}

function registerDelegateListeners(listener) {
  const eventEmitter = expoIproovEventEmitter
  const events :any = [
    EVENT_CONNECTING,
    EVENT_CONNECTED,
    EVENT_PROCESSING,
    EVENT_SUCCESS,
    EVENT_FAILURE,
    EVENT_CANCELLED,
    EVENT_ERROR
  ]

  const terminalEvents = [
    EVENT_SUCCESS,
    EVENT_FAILURE,
    EVENT_CANCELLED,
    EVENT_ERROR
  ]

  events.forEach((eventType) => {
    eventEmitter.addListener(eventType, (event) => {
      listener({
        name: eventType,
        params: event
      })

      if (terminalEvents.includes(eventType)) {
        removeAllListeners(eventEmitter)
      }
    })
  })
}

function removeAllListeners(eventEmitter) {
  eventEmitter.removeAllListeners(EVENT_CONNECTING)
  eventEmitter.removeAllListeners(EVENT_CONNECTED)
  eventEmitter.removeAllListeners(EVENT_PROCESSING)
  eventEmitter.removeAllListeners(EVENT_SUCCESS)
  eventEmitter.removeAllListeners(EVENT_FAILURE)
  eventEmitter.removeAllListeners(EVENT_CANCELLED)
  eventEmitter.removeAllListeners(EVENT_ERROR)
}

