import { StyleSheet, Text, View , Button} from 'react-native'
import React from 'react'

const DetailItem = ({navigation, route}) => {
  const {item} = route.params
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Contrat: {JSON.stringify(item.contrat)}</Text>
      <Text>Compteur: {JSON.stringify(item.compteur)}</Text>
      <Button color={'#cdb4db'} title="Go back" onPress={() => navigation.goBack()} />
    </View>
  )
}

export default DetailItem

const styles = StyleSheet.create({})