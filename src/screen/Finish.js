import React from 'react'
import { View, Text, Button } from 'react-native'

export default function Finish({ navigation, route}) {
  const { username } = route.params

  function playAgain(e) {
    navigation.navigate('Home')
  }

  return (
    <View style={styles.container}>
      <View>
        <Text>Congratulation {username}, you have solved the board</Text>
      </View>
      <View style={{marginTop: 20}}>
        <Button
          title='Play Again'
          onPress={(e) => {playAgain(e)}}>
        </Button>
      </View>
    </View>
  )
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
}