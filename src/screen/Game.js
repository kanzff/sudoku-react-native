import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, Button, ScrollView } from "react-native";
import { fetchBoard, validateBoard, solveBoard, emptyBoard } from '../store/actions/boardAction'
import { useSelector, useDispatch } from 'react-redux'
import { color } from "react-native-reanimated";

export default function Game({ navigation, route}) {
  const { username, difficulty } = route.params
  const dispatch = useDispatch()
  const [initBoard, setInitBoard] = useState({
    board: []
  })
  const [inputBoard, setInputBoard] = useState({
    board: []
  })
  let [timer, setTimer] = useState(0)
  const { board, solvedBoard, loading } = useSelector((state) => state.board)
  
  useEffect(() => {
    dispatch(fetchBoard(difficulty))
    dispatch(emptyBoard())
  }, [])

  function counter() {
      setInterval(() => {
      let newTimer = timer++
      setTimer(newTimer)
    }, 1000);
  }

  useEffect(() => {
    if (board.board.length > 0) {
      setInitBoard(board)
      setInputBoard(board)
      counter()
    }
  }, [board])

  useEffect(() => {
    if (solvedBoard.solution.length > 0) {
      setInputBoard({
        board: solvedBoard.solution
      })
    }
  }, [solvedBoard])
  
  const handleInputChange = (value, idx1, idx2) => {
    let newBoard = JSON.parse(JSON.stringify(inputBoard))
    newBoard.board[idx1][idx2] = +value
    setInputBoard(newBoard)
  }
  
  function validate() {
    dispatch(validateBoard(inputBoard))
  }

  function solve() {
    dispatch(solveBoard(initBoard))
  }
  
  const { validationResult } = useSelector((state) => state.board)

  useEffect(() => {
    if (validationResult.status === 'solved') {
      clearInterval(counter)
      navigation.navigate('Finish', {
        username,
        timer
      })
    }
  }, [validationResult])

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.header}>SUDOKU</Text>
      </View>
      <View>
        <Text style={styles.message}>Good Luck {username}</Text>
      </View>
      <View>
        <Text style={styles.message}>Time : {timer}</Text>
      </View>
      <View>
        {loading && 
          <Text>Loading Board ...</Text>
        }
      </View>
      <View>
        {!loading && inputBoard.board.map((tiles, idx1) => {
          return (
          <View key={idx1} style={{flexDirection: 'row'}}>
            {tiles.map((tile, idx2) => {
              return (
                <TextInput
                  key={idx2}
                  style={
                    [
                      initBoard.board[idx1][idx2] === 0 ?
                      styles.tileInput :
                      styles.tile,
                      ((idx2 > 2 && idx2 < 6 && (idx1 < 3 || idx1 > 5)) ||
                      ((idx2 < 3 || idx2 > 5) && (idx1 > 2 && idx1 < 6))) ?
                      styles.box :
                      styles.box2
                    ]
                  }
                  maxLength={1}
                  value={tile === 0 ? '' : tile.toString()}
                  editable={initBoard.board[idx1][idx2] === 0 ? true : false}
                  onChangeText={(value) => handleInputChange(value, idx1, idx2)}
                  keyboardType="numeric"
                />
              )
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

const styles = StyleSheet.create({
  tile: {
    borderWidth: 1,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: 'black',
    borderRadius: 3,
    fontWeight: 'bold'
  },
  tileInput: {
    borderWidth: 1,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: 'white',
    borderRadius: 3,
    fontWeight: 'bold'
  },
  box: {
    backgroundColor: '#1E90FF'
  },
  box2: {
    backgroundColor: '#00BFFF'
  },
  container: {
    flex: 1,
    marginTop: 10,
    backgroundColor: '#90EE90',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    color: 'black',
    marginBottom: 20,
    fontSize: 40,
    fontWeight: 'bold',
    fontFamily: 'serif'
  },
  buttons: {
    flexDirection: 'row'
  },
  message: {
    marginBottom: 20,
    fontWeight: 'bold'
  }
})

// ((idx2 > 2 && idx2 < 6 && (idx1 < 3 || idx1 > 5)) ||
// ((idx2 < 3 || idx2 > 5) && (idx1 > 2 && idx1 < 6)))