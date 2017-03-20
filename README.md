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
## 002 Import reusable components
* Create the *src/components* and *src/components/common* folders.
* We will use the *Button*, *Card*, *CardSection* and *Header* reusable components, which were made in the *Albums* project. Copy and paste the respective *.js* files to the *common* folder.
* In order to reduce the amount of import statements when we make use of these components, we will import them into the *index.js* file which we will create inside *src/components/common*. Then we will be able to be importing the modules `from './components/common'`.
* We will use the `export * from` syntax, which is a short writing for importing and exporting the component of interest. Hence, *src/components/common/index.js* will have the following content:

```
export * from './Button';
export * from './Card';
export * from './CardSection';
export * from './Header';

```
* Because of the use of the `export * from` pass-through syntax, our components can not export defaults, but instead they need to export objects with the keys-values of the component. For instance the *Button* component can not `export default Button;` any more. It has to `export { Button: Button };` or, by using ES6 syntactic sugar, `export { Button };`. We will modify all the common components' exports in this manner.
```
export { Button };
```
```
export { Card };
```
```
export { CardSection };
```
```
export { Header };
```

## 003 Add the app *header*
* Now the reusable components are available. We will use the *Header* component.
* Inside *src/app.js* `import { Header } from './components/common';`.
* In the *App* return, nest a *Header* inside the *View* tag.
```
<View>
    <Header headerText="Authentication" />
    <Text>An App!</Text>
</View>
```

## 004 Setup a *Firebase* project
* Login to *Firebase*, create an authentication project and enable the *Email/Password* sign-in method.
* Install the *firebase* package and import the library inside *src/app.js*.
```
import firebase from 'firebase';
```
* We will initialize *firebase* by use of the lifecycle method *componentDidMount*. Copy the configuration object from the *Web Setup* menu in the Firebase project page and use it with the *initializeApp* Firebase method.
```
componentDidMount() {
    firebase.initializeApp({
        apiKey: 'AIzaSyBSTxh2St7k7b6AiVglK8oEXqwOqM6PjrU',
        authDomain: 'auth-61698.firebaseapp.com',
        databaseURL: 'https://auth-61698.firebaseio.com',
        storageBucket: 'auth-61698.appspot.com',
        messagingSenderId: '909061318914'
    });
}
```

## 005 Create the *LoginForm* component
* Inside *src/components* create the file *LoginForm.js*.
* The *LoginForm* component will contain three *CardSection* components. One for the email, one for the password and one for the login button. We will import and use the *Button*, *Card* and *CardSection* components.

```
import React, { Component } from 'react';
import { View } from 'react-native';
import { Button, Card, CardSection } from './common';

class LoginForm extends Component {
    render() {
        return (
            <Card>
                <CardSection />
                <CardSection />
                <CardSection>
                    <Button>
                        Log in                        
                    </Button>
                </CardSection>
            </Card>
        );
    }
}

export default LoginForm;
```
* Inside *components/app.js*, import *LoginForm* and show it instead of the *Text* tag.
```
import LoginForm from './components/LoginForm';
```
```
<View>
    <Header headerText="Authentication" />
    <LoginForm />
</View>
```
