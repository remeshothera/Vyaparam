import React from 'react';
import {
  createStackNavigator,
} from 'react-navigation';
import LandingScreen from './containers/LandingScreen';
import HomeScreen from './containers/HomeScreen';
import DetailsScreen from './containers/DetailsScreen';
import AuthScreen from './containers/AuthScreen';


export default class App extends React.Component {
  render() {
    return <RootStack navigation={this.props.navigation} />;
  }
}

const RootStack = createStackNavigator(
  {
    Landing : LandingScreen,
    Home: HomeScreen,
    Details: DetailsScreen,
    Auth:AuthScreen,
  },
  {
    initialRouteName: 'Landing',
  }
);

