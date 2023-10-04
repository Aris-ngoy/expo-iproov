import { StyleSheet, Text, View } from 'react-native';

import * as ExpoIproov from 'expo-iproov';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>{ExpoIproov.hello()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
