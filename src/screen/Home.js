import React, { useState } from 'react'
import { Button, Text, TextInput, View } from "react-native";

export default function Home({ navigation }) {
  const [inputName, setInputName] = useState('')

  function handleUsernameChange(e) {
    const value = e.nativeEvent.text
    setInputName(value)
  }

  function handleButton(e, difficulty) {
    navigation.navigate("Game", {
      username: inputName,
      difficulty
    })
  }

  return (
    <View style={styles.container}>
      <Text>Username</Text>
      <TextInput 
        style={styles.input}
        value={inputName}
        onChange={(e) => {handleUsernameChange(e)}}
      ></TextInput>
      <View style={styles.button}>
        <Button
          title="EASY"
          onPress={(e) => handleButton(e, 'easy')}
          >
        </Button>
        <Button
          title="MEDIUM"
          onPress={(e) => handleButton(e, 'medium')}
          >
        </Button>
      </View>
      <View style={styles.button}>
        <Button
          title="HARD"
          onPress={(e) => handleButton(e, 'hard')}
          >
        </Button>
        <Button
          title="RANDOM"
          onPress={(e) => handleButton(e, 'random')}
          >
        </Button>
      </View>
    </View>
  )
}

const styles = {
  container: {
    flex: 1,
    marginTop: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    width: 100,
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1
  },
  button: {
    flexDirection: 'row',
    marginTop: 20
  }
}