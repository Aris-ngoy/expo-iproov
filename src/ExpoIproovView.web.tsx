import * as React from 'react';

import { ExpoIproovViewProps } from './ExpoIproov.types';

export default function ExpoIproovView(props: ExpoIproovViewProps) {
  return (
    <div>
      <span>{props.name}</span>
    </div>
  );
}
