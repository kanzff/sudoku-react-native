import React, { useState } from 'react'
import { Button, Text, TextInput, View } from "react-native";

export default function Home({ navigation }) {
  const [inputName, setInputName] = useState('')

  function handleUsernameChange(e) {
    const value = e.nativeEvent.text
    setInputName(value)
  }

  function handleButton(e) {
    navigation.navigate("Game", {
      username: inputName
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
      <Button
        style={styles.button}
        title="confirm"
        onPress={handleButton}
        >Confirm
      </Button>
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
    marginTop: 10
  }
}