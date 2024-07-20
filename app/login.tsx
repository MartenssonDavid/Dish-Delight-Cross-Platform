import { Link } from 'expo-router'
import { SafeAreaView, Text, Pressable, View, StyleSheet, StatusBar, TextInput } from 'react-native'
import { AuthForm } from '@/components/AuthForm'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useContext, useState, useEffect } from 'react'
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
                router.replace('/home')
            })
            .catch((error) => {
                setError(error.code)
            })
    }

    // Header
    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTitle: () => <Header/>
        })
    }, [navigation])
    return (
        <View>
            <AuthForm title="Sign in using account details" actionText="Login" action={SignIn} />
            <View style = {styles.container}>
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
        flexDirection: "row",
        justifyContent: "center",
    },
    link:{
        color: "red",
    }
})
