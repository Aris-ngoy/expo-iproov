import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import * as ExpoIproov from 'expo-iproov';

export default function App() {


  const launchIproov = () => {
    let options = new ExpoIproov.Options()
    options.enableScreenshots = true
   
    const token = "a634d5561d26d0bd0f920370b53168efe2bc0cc03390876c27521f911801vi07"
    ExpoIproov.launch('wss://eu.rp.secure.iproov.me/ws', token, options, (event) => {
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
