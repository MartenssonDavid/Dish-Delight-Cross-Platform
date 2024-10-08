import { Link,Stack } from 'expo-router'
import { SafeAreaView, Text, Pressable, View, StyleSheet, StatusBar, TextInput } from 'react-native'
import { AuthForm } from '@/components/AuthForm'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useContext, useState, useEffect, useLayoutEffect } from 'react'
import { AuthContext } from '@/context/authContext'
import { useRouter,useNavigation} from 'expo-router'
import { ErrorMessage } from '@/components/ErrorMessage'
import Header from '@/components/Header'

// Home page/ login
export default function Login(props: any) {

    const auth = useContext(AuthContext)
    const router = useRouter()
    const [error, setError] = useState('')
    const navigation = useNavigation()
    // Sign in user then redirect to home
    const SignIn = (email: string, password: string) => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                router.push('/home')
            })
            .catch((error) => {
                setError(error.code)
            })
    }

    // Header
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: () => <Header/>,
            headerBackTitleVisible: false,
            headerStyle:{
                backgroundColor: "#4F7942",
                }
            
        })
    }, [navigation])

    return (
        <View style = {styles.container}>
            <AuthForm title="Sign in using account details" actionText="Login" action={SignIn} />
            <View style = {styles.form}>
                <Text>Don't have an account? </Text>
                <Link href={'/'}>
                    <Text style={styles.link}>Go to sign up </Text>
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
    form:{
        flexDirection: "row",
        justifyContent: "center",
    },
    link:{
        color: "red",
    }
})
