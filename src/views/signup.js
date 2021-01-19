import React, { useState } from 'react'
import { View, Text }from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import firebase from 'firebase'

import { theme } from '../themes/main_theme'

export default function Signup(props){
    const {navigation}=props
    const [user, setUser] = useState({ email:'', passw:''})
    const auth = firebase.auth()

    async function submit(){
        try{
            const res = await auth.createUserWithEmailAndPassword(user.email, user.passw)
            alert("Cadastro efetuado com sucesso!")
            navigation.navigate('profile')
        } catch (error){
            alert(error)
        }
    }

    return (
        <View style={theme.container}>
            <View>
                <Text style={theme.header}>Registrar-se com E-mail</Text>
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
                <Button mode="outlined" onPress={submit}>Registrar</Button>
                <Button mode="outlined" onPress={()=>navigation.navigate('login')}>ou efetue login</Button>
            </View>
        </View>
    );
}