import { Stack } from 'expo-router';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import { SignOutButton } from "@/components/SignOutButton";
import  Header  from "@/components/Header"
// Firebase imports
import { firebaseConfig } from '@/config/config';
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from 'firebase/storage';

// Import contextx
// Auth
import { AuthContext } from '@/context/authContext';
// DB
import { DBContext } from '@/context/DBcontext';

import {imageDBContext} from '@/context/imageDbContext';



// Firebase connection initialization 
const app = initializeApp(firebaseConfig)
// Authentication using firebase connection
const auth = getAuth(app)
// Firestore DB using firebase connection
const db = getFirestore(app)

const imageDB = getStorage(app)



// This is the layout of our pages, if a style is applied here, it will be applied for other pages as well so general styles in here, page specific goes in page
export default function RootLayout() {
  return (
    <AuthContext.Provider value={auth}>
      <DBContext.Provider value={db}>
        <imageDBContext.Provider value = {imageDB}>
          <SafeAreaView style={styles.container}>
            <Stack  screenOptions={{headerShown: true,
                          headerBackTitleVisible : false,
                          headerTitle: () => <Header/>,
                          headerStyle:{
                          backgroundColor: "#4F7942",
                          }
            }}/>
          </SafeAreaView>
        </imageDBContext.Provider>
      </DBContext.Provider>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,

  }
})
