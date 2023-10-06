import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import * as ExpoIproov from 'expo-iproov';

export default function App() {


  const launchIproov = () => {
    const token = "0a4aa02d9132fbfb6fd92a3983147fe5c74044cea8c0d6b64d0fc68f1801vi07"
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
