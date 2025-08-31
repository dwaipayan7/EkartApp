import { StatusBar, StyleSheet, useColorScheme, View, Text } from 'react-native';



function App() {

  return (
    <View style = {styles.container}>
      <Text>Dwaipayan</Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default App;
