import React from 'react'
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import {social_button} from '../themes/social_button'

function SocialButton (props){
    const { value, link, social } = props

    return(
        <View style={social_button.container}>
            <TouchableOpacity style={social_button.button_social} onPress={link}>
                <Icon name={social} style={social_button.icon_social}></Icon>
                <Text style={social_button.text_social}> {value} </Text>
            </TouchableOpacity>
        </View>
    )
}

export default SocialButton