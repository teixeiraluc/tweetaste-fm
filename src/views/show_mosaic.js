import React from 'react'
import { View, Text, Image, FlatList } from 'react-native'
import ConvertImage from "react-convert-image"

import { theme } from '../themes/main_theme'

function Mosaic(props){
  const { api, mosaic } = props
  var vec = []
  var vec_mult = []
  var n = 0

  for (var i = 0; i < Math.sqrt(mosaic); i++){
    for (var j = 0; j < Math.sqrt(mosaic); j++){
      vec.push(api.topalbums?.album[n].image[3]['#text'])
      n++
    }
    vec_mult.push(vec)
    vec = []
  }

  return(
    <View style={{flexDirection: 'column', height: "100%", width: "100%",justifyContent: 'center',alignItems: 'center'}}>
      {vec_mult.map((item) =>
        <View style={{flexDirection: 'row'}}>
        {item.map((img) =>
          <Image source={{uri: img}} style={{ width: 70, height: 70 }}/>
        )}
        </View>
      )}
    </View>
  )
}

export default function ShowMosaic(props) {
  const {navigation, route}=props
  return(
    <View style={{flex: 1, marginTop: 30}}>
      <Mosaic api={route.params.api} mosaic={route.params.mosaic}/>
    </View>
  )
}