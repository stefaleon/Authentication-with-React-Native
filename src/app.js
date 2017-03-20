import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';

import { Header } from './components/common';
import LoginForm from './components/LoginForm';


class App extends Component {
    componentDidMount() {
        firebase.initializeApp({
            apiKey: 'AIzaSyBSTxh2St7k7b6AiVglK8oEXqwOqM6PjrU',
            authDomain: 'auth-61698.firebaseapp.com',
            databaseURL: 'https://auth-61698.firebaseio.com',
            storageBucket: 'auth-61698.appspot.com',
            messagingSenderId: '909061318914'
        });
    }

    render() {
        return (
            <View>
                <Header headerText="Authentication" />
                <LoginForm />
            </View>
        );
    }
}

export default App;
