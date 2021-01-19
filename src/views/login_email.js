import React, { useState } from 'react'
import { Image, View, Text }from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import firebase from 'firebase'

import { theme } from '../themes/main_theme.js'

export default function LoginEmail(props) {
    const {navigation}=props
    const [user, setUser] = useState({ email:'', passw:''})
    const auth = firebase.auth()

    async function submit(){
        try{
            const res = await auth.signInWithEmailAndPassword(user.email, user.passw)
            navigation.navigate('home')
        } catch (error){
            alert(error)
        }
    }

    return (
        <View style={theme.container}>
            <View style={{flex: 0.3, alignItems: 'center', justifyContent: 'center', margin: 5, flexDirection: 'column'}}>
                <Image style={{height: 50, width: 50}} resizeMode="center" source={require('../../assets/logo.png')}/>
                <Text style={theme.header}>Login com E-mail</Text>
            </View>

            <View>
                <TextInput 
                    label="E-mail"
                    placeholder="Informe seu e-mail"
                    autoCapitalize="none"
                    onChangeText={ text => setUser({...user, email: text})}
                />
                <TextInput
                    label="Senha"
                    placeholder="Informe a senha"
                    secureTextEntry={true}
                    autoCapitalize="none"
                    onChangeText={ text => setUser({...user, passw: text})}
                />
                <Button mode="outlined" onPress={submit}>Entrar</Button>
                <Button mode="outlined" onPress={()=>navigation.navigate('signup')}>ou Registre-se</Button>
            </View>
        </View>
    );
}