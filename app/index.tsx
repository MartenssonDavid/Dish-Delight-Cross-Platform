import {  Text, View, StyleSheet } from 'react-native'
import { Link } from 'expo-router'
import { AuthForm } from '@/components/AuthForm'
import { AuthContext } from '@/context/authContext'
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth'
import { useContext, useState, useEffect } from 'react'
import { useRouter,useNavigation } from 'expo-router'
import { ErrorMessage } from "@/components/ErrorMessage"
import { SignOutButton } from '@/components/SignOutButton'
import Header from '@/components/Header'


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


    return (
        <View style = {styles.container}>
            <AuthForm title="Sign up" action={createAccount} actionText="Sign up" />
            <View style = {styles.message}>
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
        flex: 1,
        backgroundColor: "#9DC183",
    },
    message:{
        flexDirection: "row",
        justifyContent: "center",

    },
    link:{
        color: "red",
    }
})
