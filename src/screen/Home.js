import React, { useEffect } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import { fetchBoard } from '../store/actions/boardAction'
import { useSelector, useDispatch } from 'react-redux'

export default function Home() {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(fetchBoard())
  }, [dispatch])

  const { board } = useSelector((state) => state.board)
  
  function handleInputChange(idx) {
    console.log('ini index', idx)
  }
  
  function validate() {

  }

  return (
    <>
      <View style={{marginTop: 10}}>
        {board.board.map(tiles => {
          return (
          <View style={{flexDirection: 'row'}}>
            {tiles.map((tile, index) => {
              return (
                <View key={index} style={styles.tile}>
                  <TextInput
                    onChange={(index) => handleInputChange(index)}
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