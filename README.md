# Authentication with React Native
* Basics of Android App Development with React Native
* Part of [The Complete React Native and Redux Course](https://www.udemy.com/the-complete-react-native-and-redux-course/)
by [Stephen Grider](https://github.com/stephengrider)

## 000 Initialize the *auth* app
* Initialize a new project for the *auth* application with the react-native cli.
```
$ react native init auth
```

## 001 Create the *App* component
* Create the *src* folder. Inside it create the file *app.js*. It will contain the class based component *App*.

```
import React, { Component } from 'react';
import { View, Text } from 'react-native';

class App extends Component {
    render() {
        return (
            <View>
                <Text>An App!</Text>
            </View>
        );
    }
}

export default App;
```
* Import *App* to the *index.android.js* file. Then register the component to *AppRegistry* for the *auth* application with *App*.

```
import { AppRegistry } from 'react-native';
import App from './src/app';

AppRegistry.registerComponent('auth', () => App);
```
