import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import { fetchBoard, validateBoard } from '../store/actions/boardAction'
import { useSelector, useDispatch } from 'react-redux'

export default function Home() {
  const dispatch = useDispatch()
  const [inputNumber, setInputNumber] = useState('')
  
  useEffect(() => {
    dispatch(fetchBoard())
  }, [dispatch])

  const { board } = useSelector((state) => state.board)
  
  function handleInputChange(e, idx1, idx2) {
    // console.log('ini index', idx1, idx2)
    const value = e.nativeEvent.text
    // console.log(value)
    // console.log('before', board.board[idx1][idx2])
    board.board[idx1][idx2] = value
    // console.log('after', board.board[idx1][idx2])
  }
  
  function validate() {
    dispatch(validateBoard(board))
  }

  return (
    <>
      <View style={{marginTop: 10}}>
        {board.board.map((tiles, idx1) => {
          // console.log(index)
          return (
          <View key={idx1} style={{flexDirection: 'row'}}>
            {tiles.map((tile, idx2) => {
              // console.log(idx)
              return (
                <View key={idx2} style={styles.tile}>
                  <TextInput
                    Value={inputNumber}
                    onChange={(e) => handleInputChange(e, idx1, idx2)}
                    keyboardType="numeric"
                    >{tile}
                  </TextInput>
                </View>
              )
            })}
          </View>
          )
        })}
      </View>
      <View style={{marginTop: 10}}>
        <Button
          title='validate'
          onPress={validate}
          >Submit
        </Button>  
      </View>
    </>
  )
}

const styles = {
  tile: {
    borderWidth: 1,
    width: 30,
    height: 30
  }
}