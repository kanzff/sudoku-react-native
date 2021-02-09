import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import { fetchBoard, validateBoard } from '../store/actions/boardAction'
import { useSelector, useDispatch } from 'react-redux'

export default function Game({ navigation, route}) {
  const { username } = route.params
  const dispatch = useDispatch()
  const [inputNumber, setInputNumber] = useState('')
  
  useEffect(() => {
    dispatch(fetchBoard())
  }, [dispatch])

  const { board } = useSelector((state) => state.board)
  
  function handleInputChange(e, idx1, idx2) {
    const value = e.nativeEvent.text
    board.board[idx1][idx2] = value
  }
  
  function validate() {
    dispatch(validateBoard(board))
    navigation.navigate('Finish', {
      username
    })
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>SUDOKU</Text>
      </View>
      <View>
        {board.board.map((tiles, idx1) => {
          // console.log(index)
          return (
          <View key={idx1} style={{flexDirection: 'row'}}>
            {tiles.map((tile, idx2) => {
              // console.log(idx)
              if (tile.toString() !== '0') {
                return (
                  <View key={idx2} style={styles.tile}>
                    <Text
                      >{tile}
                    </Text>
                  </View>
                )
              } else {
                return (
                  <View key={idx2} style={styles.tile}>
                    <TextInput
                      Value={inputNumber}
                      onChange={(e) => handleInputChange(e, idx1, idx2)}
                      keyboardType="numeric"
                      >
                    </TextInput>
                  </View>
                )
              }
            })}
          </View>
          )
        })}
      </View>
      <View style={{marginTop: 30}}>
        <Button
          title='validate'
          onPress={validate}
          >Submit
        </Button>  
      </View>
    </View>
  )
}

const styles = {
  tile: {
    borderWidth: 1,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    marginTop: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    marginBottom: 40,
    fontSize: 40
  }
}