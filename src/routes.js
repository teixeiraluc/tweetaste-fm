import React from 'react'

import 'react-native-gesture-handler'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from './views/home'
import Login from './views/login'
import LoginEmail from './views/login_email'
import Signup from './views/signup'
import Profile from './views/profile'
import ShowQuery from './views/show_query'
import ShowMosaic from './views/show_mosaic'

export default function Routes() {
    const AppStack = createStackNavigator()

    return (
        <NavigationContainer>
            <AppStack.Navigator screenOptions={{ headerShown: false }}>
                <AppStack.Screen
                    name='login'
                    component={Login}
                    options={{ title: 'Login' }}
                />
                <AppStack.Screen
                    name='login_email'
                    component={LoginEmail}
                    options={{ title: 'LoginEmail' }}
                />
                <AppStack.Screen
                    name='signup'
                    component={Signup}
                    options={{ title: 'Signup' }}
                />
                <AppStack.Screen
                    name='home'
                    component={Home}
                    options={{ title: 'Home' }}
                />
                <AppStack.Screen
                    name='profile'
                    component={Profile}
                    options={{ title: 'Profile' }}
                />
                <AppStack.Screen
                    name='show_query'
                    component={ShowQuery}
                    options={{ title: 'ShowQuery' }}
                />
                <AppStack.Screen
                    name='show_mosaic'
                    component={ShowMosaic}
                    options={{ title: 'ShowMosaic' }}
                />

            </AppStack.Navigator>
        </NavigationContainer>
    )
}