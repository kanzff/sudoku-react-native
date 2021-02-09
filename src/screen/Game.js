import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, Button, ScrollView } from "react-native";
import { fetchBoard, validateBoard, solveBoard } from '../store/actions/boardAction'
import { useSelector, useDispatch } from 'react-redux'

export default function Game({ navigation, route}) {
  const { username, difficulty } = route.params
  const dispatch = useDispatch()
  const [inputNumber, setInputNumber] = useState('')
  const [newBoard, setNewBoard] = useState({
    board: []
  })
  
  useEffect(() => {
    dispatch(fetchBoard(difficulty))
  }, [])
  
  const { board } = useSelector((state) => state.board)
  Object.assign(newBoard, board)
  
  function handleInputChange(e, idx1, idx2) {
    const value = e.nativeEvent.text
    newBoard.board[idx1][idx2] = +value
  }
  
  function validate() {
    dispatch(validateBoard(newBoard))
  }

  function solve() {
    dispatch(solveBoard(newBoard))
  }

  const { validationResult } = useSelector((state) => state.board)

  useEffect(() => {
    if (validationResult.status === 'solved') {
      navigation.navigate('Finish', {
        username
      })
    }
  }, [validationResult])

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>SUDOKU</Text>
      </View>
      <View>
        {board.board && board.board.map((tiles, idx1) => {
          return (
          <View key={idx1} style={{flexDirection: 'row'}}>
            {tiles.map((tile, idx2) => {
              if (tile.toString() !== '0') {
                return (
                  <View key={idx2} style={styles.tile}>
                    <Text
                      style={{color: 'blue'}}
                      >{tile}
                    </Text>
                  </View>
                )
              } else {
                return (
                  <View key={idx2} style={styles.tile}>
                    <TextInput
                      style={{textAlign: 'center'}}
                      maxLength={1}
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
      <View style={styles.buttons}>
        <View style={{marginTop: 40}}>
          <Button
            title='Validate'
            onPress={() => validate()}
            >
          </Button>  
        </View>
        <View style={{marginTop: 40, marginLeft: 70}}>
          <Button
            title='Solve'
            onPress={() => solve()}
            >
          </Button>  
        </View>
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
  },
  buttons: {
    flexDirection: 'row'
  }
}