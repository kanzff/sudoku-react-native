import React from 'react'
import { View, Text, Button } from 'react-native'

export default function Finish({ navigation, route}) {
  const { username } = route.params

  function playAgain(e) {
    navigation.navigate('Home')
  }

  return (
    <View style={styles.container}>
      <View style={styles.message}>
        <Text style={{fontWeight: 'bold', fontSize: 30, fontFamily: 'serif'}}>Congratulation {username}</Text>
        <Text style={{fontWeight: 'bold', fontSize: 20, fontFamily: 'serif'}}>You Have Solved the Board</Text>
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
    alignItems: 'center',
    backgroundColor: '#90EE90'
  },
  message: {
    marginTop: 70,
    marginBottom: 70
  }
}