import { Link } from 'expo-router'
import { SafeAreaView, Text, Pressable, View, StyleSheet, StatusBar, TextInput} from 'react-native'
import { AuthForm } from '@/components/AuthForm'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useContext, useState } from 'react'
import { AuthContext } from '@/context/authContext'
import { useRouter } from 'expo-router'
import { ErrorMessage } from '@/components/ErrorMessage'

// Home page/ login
export default function Login( props : any ){

    const auth = useContext(AuthContext)
    const router = useRouter()
    const [error, setError] = useState('')
    // Sign in user then redirect to home
    const SignIn = ( email: string, password: string ) =>{
        signInWithEmailAndPassword (auth, email, password)
        .then( (userCredential) => {
            router.replace('/home')
        })
        .catch( (error) => {
            setError(error.code)
        })
    }
    return(
        <View>
            <AuthForm title="Sign in using account details" actionText="Login" action={SignIn}/>
                <Link href={'/'}>
                    <Text> Go to sign up </Text>
                </Link>
                <ErrorMessage error = {error}/>
        </View>
    )
}   
