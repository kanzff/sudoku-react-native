import React, { useState } from 'react'
import { Button, Text, TextInput, View } from "react-native";
import { useSelector, useDispatch } from 'react-redux'
import { emptyBoard } from '../store/actions/boardAction'


export default function Home({ navigation }) {
  const dispatch = useDispatch()
  const [inputName, setInputName] = useState('')

  function handleUsernameChange(e) {
    const value = e.nativeEvent.text
    setInputName(value)
  }

  function handleButton(e, difficulty) {
    dispatch(emptyBoard())
    navigation.navigate("Game", {
      username: inputName,
      difficulty
    })
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>SUDOKU</Text>
      </View>
      <View>
        <Text style={{fontWeight: 'bold', fontFamily: 'serif'}}>Username</Text>
      </View>
      <TextInput 
        style={styles.input}
        value={inputName}
        onChange={(e) => {handleUsernameChange(e)}}
      ></TextInput>
      <View style={{marginTop: 30}}>
        <Text style={{fontWeight: 'bold', fontFamily: 'serif'}}>Select Difficulty : </Text>
      </View>
      <View style={styles.button}>
        <View>
          <Button
            title="EASY"
            onPress={(e) => handleButton(e, 'easy')}
            >
          </Button>
        </View>
        <View style={{marginLeft: 40}}>
          <Button
            title="MEDIUM"
            onPress={(e) => handleButton(e, 'medium')}
            >
          </Button>
        </View>
      </View>
      <View style={styles.button}>
        <View>
          <Button
            title="HARD"
            onPress={(e) => handleButton(e, 'hard')}
            >
          </Button>
        </View>
        <View style={{marginLeft: 40}}>
          <Button
            title="RANDOM"
            onPress={(e) => handleButton(e, 'random')}
            >
          </Button>
        </View>
      </View>
    </View>
  )
}

const styles = {
  container: {
    flex: 1,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#90EE90'
  },
  input: {
    width: 100,
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderRadius: 5,
    fontWeight: 'bold',
    fontFamily: 'serif'
  },
  button: {
    flexDirection: 'row',
    marginTop: 40
  },
  header: {
    marginBottom: 40,
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: 'serif'
  }
}