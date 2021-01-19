import React, {useEffect, useState} from 'react'
import { Image, TouchableHighlight, View, Text, Picker } from 'react-native'
import { Title, Button } from 'react-native-paper'
import axios from 'axios'

import { theme } from '../themes/main_theme'
import {LASTFM} from '../config'
import LastFMList from '../components/flatlist_lastfm'

export default function ShowQuery(props) {
    const {navigation, route}=props
    console.log(route.params.user)
    const [selectedOptions, setSelectedOptions] = useState({
      method:'user.gettopartists', 
      limit:'4', 
      period:'7day'})
    const [api, setApi] = useState([])
    const [disabled, setDisabled] = useState(false)

    function getMethods(){
      const baseUrl = 'https://ws.audioscrobbler.com/2.0/?method='
      const url = baseUrl
        + selectedOptions.method +
        '&user=' + route.params.user + 
        '&period=' + selectedOptions.period + 
        '&limit=' + selectedOptions.limit + 
        '&api_key=' + LASTFM.apiKey + 
        '&format=json'
      
      axios
          .get(url)
          .then((e) => setApi(e.data))
          .catch((err) => console.log(err))
      selectedOptions.method == "user.gettopalbums" ? setDisabled(true): setDisabled(false)
  }

  function handleButton(){
      getMethods()
  }
        return(
          <View style={theme.container}>
            <View style={{marginTop: 15, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
                <TouchableHighlight onPress={()=>navigation.navigate('home')}>
                  <Image style={{height: 30, width: 30}} resizeMode="center" source={require('../../assets/logo.png')}/>
                </TouchableHighlight>
                <Title style={theme.header}>Selecione sua busca</Title>
            </View>
            <View>
              <View style={theme.main_select_view}>

                <View style={theme.sub_select_view}>
                  <Text style={theme.sub_select_label}>Método</Text>
                  <Picker
                    selectedValue={selectedOptions.method}
                    style={{ height: 30, width: 130 }}
                    onValueChange={(itemValue, itemIndex) => {
                      setSelectedOptions({...selectedOptions, method: itemValue})}
                    }
                  >
                    <Picker.Item label="Artistas" value="user.gettopartists" />
                    <Picker.Item label="Albuns" value="user.gettopalbums" />
                    <Picker.Item label="Músicas" value="user.gettoptracks" />
                  </Picker>
                </View>

                <View style={theme.sub_select_view}>
                  <Text style={theme.sub_select_label}>Período</Text>
                  <Picker
                    selectedValue={selectedOptions.period}
                    style={{ height: 30, width: 140 }}
                    onValueChange={(itemValue, itemIndex) => {
                      setSelectedOptions({...selectedOptions, period: itemValue})}
                    }
                  >
                    <Picker.Item label="1 Semana" value="7day" />
                    <Picker.Item label="1 Mês" value="1month" />
                    <Picker.Item label="3 Meses" value="3month" />
                    <Picker.Item label="6 Meses" value="6month" />
                    <Picker.Item label="1 Ano" value="12month" />
                    <Picker.Item label="Geral" value="overall" />
                  </Picker>
                </View>

                <View style={theme.sub_select_view}>
                  <Text style={theme.sub_select_label}>Limite</Text>
                  <Picker
                    selectedValue={selectedOptions.limit}
                    style={{ height: 30, width: 90 }}
                    onValueChange={(itemValue, itemIndex) => {
                      setSelectedOptions({...selectedOptions, limit: itemValue})}
                    }
                  >
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="9" value="9" />
                    <Picker.Item label="16" value="16" />
                    <Picker.Item label="25" value="25" />
                  </Picker>
                </View>
                
              </View>

            </View>
            <Button 
              mode="outlined" 
              onPress={handleButton}
              style={theme.select_button}
            >
              Enviar
            </Button>
            <Button 
              onPress={()=>navigation.navigate('show_mosaic', {'api': api, 'mosaic':selectedOptions.limit})}
              disabled={selectedOptions.method=="user.gettopalbums" && disabled?false:true}
            > 
              Mostrar mosaico
            </Button>
            <View style={{flex: 1}}>
              <LastFMList method={selectedOptions.method} api={api}/>
            </View>
          </View>
        )
}