import {  Text, View, StyleSheet } from 'react-native'
import { Link } from 'expo-router'
import { AuthForm } from '@/components/AuthForm'
import { AuthContext } from '@/context/authContext'
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { useContext, useState, useEffect } from 'react'
import { useRouter,useNavigation } from 'expo-router'
import { ErrorMessage } from "@/components/ErrorMessage"
import { SignOutButton } from '@/components/SignOutButton'


// Sign up/home
export default function SignUp(props: any) {
    // Get auth context 
    const auth = useContext(AuthContext)
    const router = useRouter()
    const navigation = useNavigation()
    const [error, setError] = useState(' ')

    // Create account then redirect to home
    // If error, display message
    const createAccount = (email: string, password: string) => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                router.replace('/home')
            })
            .catch((error) => {
                setError(error.code)
            })

        // If user already logged in, redirect to home
        onAuthStateChanged(auth, (user) => {
            if (user) {
                router.replace('/home')
            }
            else {
            }
        })

    }

        // Header
        useEffect(() => {
            navigation.setOptions({
                headerShown: true,
                headerRight: () => <SignOutButton />
            })
        }, [navigation])
    return (
        <View>
            <AuthForm title="Sign up" action={createAccount} actionText="Sign up" />
            <View style = {styles.container}>
            <Text> Already have an account? </Text>
                <Link href={'/login'}>
                    <Text style={styles.link}>Go to Login</Text>
                </Link>
            </View>
            <ErrorMessage error={error} />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        justifyContent: "center",
    },
    link:{
        color: "red",
    }
})
