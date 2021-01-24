// React
import React from 'react';

// React Native
import {Image} from 'react-native';

// Third party
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

// Local
import Logo from './assets/instagram.png';
import Feed from './pages/Feed';

const AppStack = createStackNavigator();

export default function Routes() {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        screenOptions={{
          headerTitle: <Image source={Logo} />,
          headerTitleStyle: {alignSelf: 'center'},
          headerStyle: { backgroundColor: '#f5f5f5'}
        }}>
        <AppStack.Screen name="Feed" component={Feed} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
}
