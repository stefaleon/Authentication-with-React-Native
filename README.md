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
## 006 Add a *TextInput*
* Import the *TextInput* component and add it inside the first *CardSection*. Add a styling property in order to make it visible.
```
import { TextInput } from 'react-native';
```
```
<CardSection>
    <TextInput style={{ height: 20, width: 100 }}/>
</CardSection>
```
* Initialize the state object to have a single property of *text*. The initial value will be an empty string.
```
state = { text: '' };
```
* Add the *onChangeText* prop and pass a function to it. The function is called with the *text* parameter and sets this value to the *text* piece of state.
```
onChangeText={text => this.setState({ text })}
```
* Add the *value* prop and set its value to *this.state.text*. Now the state maintains the input value, the value of the input is controlled by the current state, we have a *state-controlled-component*.
```
<TextInput
    value={this.state.text}
    onChangeText={text => this.setState({ text })}
    style={{ height: 20, width: 100 }}
/>
```

## 007 Make a reusable input component
* In *src/components/common*, create *Input.js*.

```
import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({ label, value, onChangeText }) => {
    return (
        <View>
            <Text>{label}</Text>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                style={{ height: 20, width: 100 }}
            />
        </View>
    );
};

export { Input };
```
* Add the relative helper inside *index.js*.
```
export * from './Input';
```
* In *LoginForm.js* refactor the imports and replace *TextInput* with *Input*. Also pass the value *"Email"* to the *label* prop.
```
import { Button, Card, CardSection, Input } from './common';
```
```
<Input
    label="Email"
    value={this.state.text}
    onChangeText={text => this.setState({ text })}
/>
```

## 008 Style the *Input* component
* Add the *styles* object. Style an *inputStyle*, a *labelStyle* and a *containerStyle*.
```
const styles = {
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 2
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        align: 'center'
    }
};
```
* Pull the styles inside *Input* with destructuring and use them.
```
const { inputStyle, labelStyle, containerStyle } = styles;
```
```
<View style={containerStyle}>
    <Text style={labelStyle}>{label}</Text>
    <TextInput
        placeholder={placeholder}
        autoCorrect={false}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}        
    />
</View>
```
* An additional prop of `autoCorrect={false}` has been passed in order to avoid autocorrecting attempts on users' email strings.
* The *placeholder* prop has been added to the *Input* definition in order to keep the component reusable.
```
const Input = ({ label, value, onChangeText, placeholder }) => {
```

## 009 Edit *LoginForm*
* In the *Input* call inside *LoginForm.js*, pass an email example value to the *placeholder* prop.
```
placeholder="user@example.com"
```
* Rename the state property *text* to *email* and edit the relevant calls accordingly.
```
state = { email: '' };
```
```
value={this.state.email}
onChangeText={email => this.setState({ email })}
```

## 010 Add another *Input* for password
* Initialize another piece of state for the password.
```
state = { email: '', password: '' };
```
* Add the *Input* for the password in the second *CardSection*.
```
<CardSection>
    <Input
        secureTextEntry
        placeholder="password"
        label="Password"
        value={this.state.password}
        onChangeText={password => this.setState({ password })}
    />
</CardSection>
```
* The *secureTextEntry* prop is being passed with a value of *true* in the password section input above.
* Inside *src/components/common/Input.js*, an additional prop of `secureTextEntry` has been added  to the *Input* definition in order be able to enable it or disable it per case of use.
```
const Input = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
```
```
secureTextEntry={secureTextEntry}
```
* The *secureTextEntry* property for the *email* section has not been set, so it is undefined and handled as false.   
