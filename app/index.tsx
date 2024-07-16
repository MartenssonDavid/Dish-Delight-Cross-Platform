import { SafeAreaView, Text, Pressable, View, StyleSheet, StatusBar, TextInput} from 'react-native'
import { Link } from 'expo-router'
import { AuthForm } from '@/components/AuthForm'
import { AuthContext } from '@/context/authContext'
import { createUserWithEmailAndPassword, Auth} from 'firebase/auth'
import { useContext, useState } from 'react'
import { useRouter } from 'expo-router'

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
    }
    return(
        <View>
            <AuthForm title = "Sign up" action = { createAccount } actionText="Sign up" />
            <Link href= '/login'>
                <Text> Already have an account? Go to Login</Text>
            </Link>
        </View>
    )
}

