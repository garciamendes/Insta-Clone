// React
import React from 'react'

// React Native
import { StatusBar } from 'react-native'

// Local
import Routes from './router'

export default function App() {
  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor='#f5f5f5'/>
      <Routes />
    </>
  )
}