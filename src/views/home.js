import React, {useEffect, useState} from 'react'
import { TouchableHighlight, ImageBackground, Image, View, Text, Picker, FlatList } from 'react-native'
import { Card, Button, Title, Paragraph } from 'react-native-paper'
import firebase from 'firebase'
import axios from 'axios'

import { theme } from '../themes/main_theme'
import {theme_lastfm} from '../themes/theme_lastfm'

import {LASTFM} from '../config'


export default function Home(props) {
    const {navigation}=props
    const [dados, setDados] = useState([])
    const [userLast, setUserLast] = useState()
    const [api, setApi] = useState([])
    const [refresh, setRefresh] = useState(false)

    const db = firebase.database()
    const user = firebase.auth().currentUser
    const ref = db.ref('profiles/' + user.uid)

    useEffect(() => {
        getData()
    })

    useEffect(() => {
        getRecentTracks()
    },[api])

    async function getData() {
        try{
            let data = []
            const res = await ref.orderByChild('date').once('value')
            res.forEach(e => {
                data.push({ key: e.key, ...e.val()})
            })
            setDados(data)
            setUserLast(dados?.[0]?.user_lastfm)
        } catch(error) {
            alert(error)
        }
    }

    function getRecentTracks(){
      const baseUrl = 'https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks'
      const url = baseUrl +
        '&user=' + userLast + 
        '&limit=4' + 
        '&api_key=' + LASTFM.apiKey + 
        '&format=json'

      axios
          .get(url)
          .then((e) => setApi(e.data))
          .catch((err) => console.log(err))
  }
    return(
        <View style={theme.container}>

            <View style={{flex: 0.3, alignItems: 'center', justifyContent: 'center', margin: 5, flexDirection: 'row'}}>
                <TouchableHighlight onPress={()=>navigation.navigate('home')}>
                  <Image style={{height: 30, width: 30}} resizeMode="center" source={require('../../assets/logo.png')}/>
                </TouchableHighlight>
                <FlatList
                  keyExtractor={(e) => e.key}
                  renderItem={({item}) => {
                    return (<Title style={{fontSize: 30, alignSelf: 'center'}}>Olá, {item.name}</Title>)}}
                  render
                  data={dados}
                />
            </View>
            
            <View>
            
              <FlatList
                keyExtractor={(e) => e.key}
                renderItem={({item}) => {
                  return (
                    <Card style={theme_lastfm.card}>
                      <Card.Content style={{ flexDirection: 'row', alignItems: 'center'}}>
                        <Card.Cover source={{ uri: item.image[1]['#text']}} style={theme.album_mini}/>
                        <View style={{ flexDirection: 'column', marginLeft: 30}}>
                          <Title>{item.name}</Title>
                          <Paragraph> de {item.artist['#text']}</Paragraph>
                        </View>
                      </Card.Content>
                    </Card>
                    )
                  }
                }
                render
                data={api.recenttracks?.track}
              />

          </View>
            <Button onPress={()=>navigation.navigate('show_query', {'user': userLast})}> Buscar dados </Button>
        </View>
    )
}