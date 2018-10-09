import React, { Component } from 'react'
import { StyleSheet, View ,ScrollView , Image , Text,Button  } from 'react-native'


export default class DetailsScreen extends Component {
  constructor(props) {
    super(props);
  }
    state = {  }
    render() { 
        const { navigation } = this.props;
        const itemId = navigation.getParam('bookTitle', ' ');
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Details Screen</Text>
            <Text>itemId: {JSON.stringify(itemId)}</Text>       
            <Button
              title="Go to Home"
              onPress={() => this.props.navigation.navigate('Home')}
            />
            <Button
              title="Go back"
              onPress={() => this.props.navigation.goBack()}
            />
          </View>
        );
    }
}
 
