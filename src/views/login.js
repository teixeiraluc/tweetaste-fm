import React from 'react'
import { ImageBackground, Alert, View, Image } from 'react-native'
import { Button } from 'react-native-paper'
import firebase from 'firebase'

import SocialButton from '../components/social_button'

import { theme } from '../themes/main_theme'

export default function Login(props) {
    const {navigation}=props
    const auth = firebase.auth()

    async function facebookLoginPopup(){
      firebase.auth().signInWithPopup('https://www.facebook.com/').then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      }).catch(function(error) {
        alert(error)
      });
    }

    async function facebookLoginRedirect(){
        firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
          // This gives you a Facebook Access Token. You can use it to access the Facebook API.
          var token = result.credential.accessToken;
          // ...
        }
        // The signed-in user info.
        var user = result.user;
      }).catch(function(error) {
        alert(error)
      });
    }

    async function twitterLoginPopup(){
      auth.signInWithPopup('https://twitter.com/login').then(function(result) {
      // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
      // You can use these server side with your app's credentials to access the Twitter API.
      var token = result.credential.accessToken;
      var secret = result.credential.secret;
      // The signed-in user info.
      var user = result.user;
      // ...
      })
      .catch(function(error) { alert(error) });
    }

    async function twitterLoginRedirect(){
      auth.getRedirectResult().then(function(result) {
        if (result.credential) {
          // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
          // You can use these server side with your app's credentials to access the Twitter API.
          var token = result.credential.accessToken;
          var secret = result.credential.secret;
          // ...
        }
      // The signed-in user info.
      var user = result.user;
    }).catch(function(error) {
      alert(error)
    });
    }

    async function gmailLoginPopup(){
      firebase.auth().signInWithPopup('https://accounts.google.com/signin/v2/identifier?service=mail&passive=true&rm=false&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&ss=1&scc=1&ltmpl=default&ltmplcache=2&emr=1&osid=1&flowName=GlifWebSignIn&flowEntry=ServiceLogin').then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
      }).catch(function(error) {
        alert(error)
      });
    }

    async function gmailLoginRedirect(){
      firebase.auth().getRedirectResult().then(function(result) {
        if (result.credential) {
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          // ...
        }
        // The signed-in user info.
        var user = result.user;
      }).catch(function(error) {
        alert(error)
      });
    }

    return(
        <View style={theme.container}>
            <ImageBackground source={require('../../assets/background.jpg')} style={theme.backgroundImage} >
            
            <View style={{flex: 0.8, flexDirection: 'row'}}>
                <Image style={theme.logo_ttfm} resizeMode="center" source={require('../../assets/tweetaste.png')}/>
            </View>
            <View style={{marginTop: 150}}>

                <SocialButton 
                  value="Entrar com Facebook" 
                  social="facebook" 
                  link={facebookLoginPopup}>
                </SocialButton>

                <SocialButton 
                  value="Entrar com Twitter" 
                  social="twitter" 
                  link={twitterLoginRedirect}>
                </SocialButton>

                <SocialButton 
                  value="Entrar com E-mail" 
                  social="inbox" 
                  link={() => navigation.navigate('login_email')}>
                </SocialButton>
            </View>
            </ImageBackground>
        </View>
    )
}