import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, Button, ScrollView } from "react-native";
import { fetchBoard, validateBoard, solveBoard, emptyBoard } from '../store/actions/boardAction'
import { useSelector, useDispatch } from 'react-redux'
import { color } from "react-native-reanimated";

export default function Game({ navigation, route}) {
  const { username, difficulty } = route.params
  const dispatch = useDispatch()
  // const [inputNumber, setInputNumber] = useState('')
  const [initBoard, setInitBoard] = useState({
    board: []
  })
  const [inputBoard, setInputBoard] = useState({
    board: []
  })
  const { board, solvedBoard } = useSelector((state) => state.board)
  
  useEffect(() => {
    dispatch(fetchBoard(difficulty))
    dispatch(emptyBoard())
    // setInitBoard(board)
    // setInputBoard(board)
  }, [])

  useEffect(() => {
    // console.log('use effect 2')
    if (board.board.length > 0) {
      setInitBoard(board)
      setInputBoard(board)
    }
  }, [board])

  useEffect(() => {
    console.log('ini solved board', solvedBoard)
    if (solvedBoard.solution.length > 0) {
      console.log('use effect solved')
      setInputBoard({
        board: solvedBoard.solution
      })
    }
  }, [solvedBoard])
  
  // Object.assign(initBoard, board)
  
  const handleInputChange = (value, idx1, idx2) => {
    // const value = e.nativeEvent.text
    let newBoard = JSON.parse(JSON.stringify(inputBoard))
    // initBoard.board[idx1][idx2] = +value
    newBoard.board[idx1][idx2] = +value
    // console.log('before', inputBoard)
    setInputBoard(newBoard)
    // console.log('after', inputBoard)
  }
  
  function validate() {
    console.log(inputBoard)
    dispatch(validateBoard(inputBoard))
  }

  function solve() {
    dispatch(solveBoard(initBoard))
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
      {/* <View>
        {loading && 
          <Text>Loading Board ...</Text>
        }
      </View> */}
      <View>
        {inputBoard.board.length > 0 && inputBoard.board.map((tiles, idx1) => {
          return (
          <View key={idx1} style={{flexDirection: 'row'}}>
            {tiles.map((tile, idx2) => {
              // if (tile.toString() !== '0') {
              //   return (
              //     <View key={idx2} style={styles.tile}>
              //       <Text
              //         style={{color: 'blue'}}
              //         >{tile}
              //       </Text>
              //     </View>
              //   )
              // } else {
                return (
                  <TextInput
                    key={idx2}
                    style={styles.tile}
                    maxLength={1}
                    value={tile === 0 ? '' : tile.toString()}
                    editable={initBoard.board[idx1][idx2] === 0 ? true : false}
                    onChangeText={(value) => handleInputChange(value, idx1, idx2)}
                    keyboardType="numeric"
                  />
                )
              // }
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
    alignItems: 'center',
    textAlign: 'center',
    color: 'blue'
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