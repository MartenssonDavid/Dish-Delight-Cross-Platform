import { Stack } from 'expo-router';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';

// Firebase imports
import { firebaseConfig } from '@/config/config';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Context import for passing data
import { AuthContext } from '@/context/authContext';

// Firebase connection initialization 
const  app = initializeApp(firebaseConfig)

// Authentication using firebase connection
const auth = getAuth(app)


// This is the layout of our pages, if a style is applied here, it will be applied for other pages as well so general styles in here, page specific goes in page
export default function RootLayout() {
  return (
    <AuthContext.Provider value = {auth}>
      <SafeAreaView style={ styles.container }>
        <Stack screenOptions={{headerShown: false}}/>
      </SafeAreaView>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingTop: StatusBar.currentHeight,

  }
})
