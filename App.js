import React, { Component } from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import { Provider as StoreProvider } from 'react-redux';
import LoginScreen from './screens/LoginScreen';
import MapScreen from './screens/MapScreen';
import ChartScreen from './screens/ChartScreen';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import store from './store';

const theme = {
  ...DefaultTheme,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0084ff',
    accent: '#f1c40f',
    background: '#f9f9f9',
    paper: 'white'
  }
}

export default class App extends React.Component {

  render() {

    const RootNavigation = createBottomTabNavigator({
      login: LoginScreen,
      map: MapScreen,
      data: ChartScreen
    }, 
    {
      navigationOptions: {
        tabBarVisible: false
      },
      lazy: true,
      initialRouteName: 'login'
    })

    return (

      <StoreProvider
        store={store}
      >
        <PaperProvider
          theme={theme}
        >
          <RootNavigation />
        </PaperProvider>
      </StoreProvider>

    );
  }
}
