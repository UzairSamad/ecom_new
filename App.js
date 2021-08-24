import React, { useContext } from "react"
import ContentForDrawer from "./src/navigation/Content"
import { FAQS } from "./src/containers"
import SplashScreen from 'react-native-splash-screen'
import { useEffect } from "react"
import AppProvider, { AppContext } from './src/AppContext'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native"
const App = (props) => {

  // const navigation = useNavigation()
  console.log(props, "PRRRRRRRRRR");
  useEffect(() => {
    SplashScreen.hide()

  }, [])






  GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;
  return (
    <>
      <AppProvider>
        <ContentForDrawer />
      </AppProvider>
    </>
  )
}

export default App
