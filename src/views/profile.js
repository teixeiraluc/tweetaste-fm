import React, { useState } from 'react'
import { View, Text }from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import firebase from 'firebase'

import { theme } from '../themes/main_theme'

export default function Profile(props){

    const {navigation}=props
    const [data, setData] = useState({birth:"", name:"", user_lastfm:""})
    const db = firebase.database()
    const user = firebase.auth().currentUser
    const ref = db.ref('profiles/' + user.uid)

    async function submit () {
        try {
            const res = await ref.push({birth: data.birth, name: data.name, user_lastfm: data.user_lastfm})
            alert("Dados salvos com sucesso!")
            navigation.navigate('home')
        } catch (error) {
            console.log(ref)
            alert(error)
        }
    }

    return (
        <View style={theme.container}>
            <View>
                <Text style={theme.header}>Complete seu cadastro</Text>
            </View>
            <View>
                <TextInput 
                    label="Usuário"
                    placeholder="Informe seu usuário do LastFM"
                    autoCapitalize="none"
                    onChangeText={text => setData({...data, user_lastfm: text})}
                />
                <TextInput 
                    label="Nome"
                    placeholder="Informe seu nome"
                    autoCapitalize="none"
                    onChangeText={text => setData({...data, name: text})}
                />
                <TextInput 
                    label="Data de Nascimento"
                    placeholder="Informe sua Data de Nascimento"
                    autoCapitalize="none"
                    onChangeText={text => setData({...data, birth: text})}
                />
                <Button mode="outlined" onPress={submit}>Salvar</Button>
            </View>
        </View>
    )
}