import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import * as ExpoIproov from 'expo-iproov';

export default function App() {


  const launchIproov = () => {
    const token = "1060a31abe4a5cb13b2cb476d7286a0af8bc1c3ed97a44f2631cb03d1801vi07"
    ExpoIproov.launch('wss://eu.rp.secure.iproov.me/ws', token, { 
      enableScreenshots : true,
    }, (event: any) => {
      console.log(event.name)
      console.log(JSON.stringify(event))
    })
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={launchIproov}>
      <Text>Launch</Text>
      </TouchableOpacity>
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
