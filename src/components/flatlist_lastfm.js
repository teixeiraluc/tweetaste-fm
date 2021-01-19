import React from 'react'
import { FlatList, Text, View } from 'react-native'
import { Card, Button, Title, Paragraph } from 'react-native-paper'

import {theme_lastfm} from '../themes/theme_lastfm'

function LastFMList (props){
    const { navigation, method, api } = props    

    if(method == 'user.gettopartists'){
      
      return(
          <View>
            
              <FlatList
                keyExtractor={(e) => e.key}
                renderItem={({item}) => {
                  return (
                    <Card style={theme_lastfm.card}>
                      <Card.Content>
                        <Title>#{item['@attr'].rank}. {item.name}</Title>
                        <Paragraph>
                          Você ouviu esse artista por {item.playcount} vezes durante o período
                        </Paragraph>
                      </Card.Content>
                    </Card>
                    )
                  }
                }
                render
                data={api.topartists?.artist}
              />

          </View>
      )

    }else if (method == 'user.gettopalbums'){
      console.log(api)
      return(
          <View>
            
              <FlatList
                keyExtractor={(e) => e.key}
                renderItem={({item}) => {
                  return (
                    <Card style={theme_lastfm.card}>
                      <Card.Content>
                        <Title>#{item['@attr'].rank}. {item.name}, de {item.artist.name}</Title>
                        <Paragraph>
                          Você ouviu esse album por {item.playcount} vezes durante o período
                        </Paragraph>
                      </Card.Content>
                      <Card.Cover source={{ uri: item.image[3]['#text']}} style={theme_lastfm.album_cover}/>
                    </Card>
                    )
                  }
                }
                render
                data={api.topalbums?.album}
              />
              
          </View>
      )

    } else {

      return(
          <View>
            
              <FlatList
                keyExtractor={(e) => e.key}
                renderItem={({item}) => {
                  return (
                    <Card style={theme_lastfm.card}>
                      <Card.Content>
                        <Title>#{item['@attr'].rank}. {item.name}, de {item.artist.name}</Title>
                        <Paragraph>
                          Você ouviu essa música por {item.playcount} vezes durante o período.
                        </Paragraph>
                      </Card.Content>
                    </Card>
                    )
                  }
                }
                render
                data={api.toptracks?.track}
              />

          </View>
      )

    }
}

export default LastFMList