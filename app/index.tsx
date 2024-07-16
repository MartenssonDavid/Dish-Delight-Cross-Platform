import { SafeAreaView, Text, Pressable, View, StyleSheet, StatusBar, TextInput} from 'react-native'
import { Link } from 'expo-router'
import { AuthForm } from '@/components/AuthForm'
import { AuthContext } from '@/context/authContext'
import { createUserWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth'
import { useContext, useState } from 'react'
import { useRouter } from 'expo-router'
import { ErrorMessage } from "@/components/ErrorMessage"


// Sign up/home
export default function SignUp( props : any){
    // Get auth context 
    const auth = useContext(AuthContext)
    const router = useRouter()
    const [error, setError] = useState(' ')

    // Create account then redirect to home
    const createAccount = (email: string, password: string ) => {
        createUserWithEmailAndPassword( auth, email, password)
        .then( (userCredential) => {
            router.replace('/home')
        })
        .catch( (error) => {        
            setError(error.code)
        })

        // If user already logged in, redirect to home
        onAuthStateChanged( auth, ( user ) => {
            if( user ) {

                router.replace('/home')
            }
            else {
            }
        })
    
    }
    return(
        <View>
            <AuthForm title = "Sign up" action = { createAccount } actionText="Sign up" />
            <Link href= {'/login'}>
                <Text style = {styles.text}> Already have an account? Go to Login</Text>
            </Link>
            <ErrorMessage error = {error}/>
        </View>
    )
}

const styles = StyleSheet.create({
    text:{
        textAlign: "center"
    }
})

