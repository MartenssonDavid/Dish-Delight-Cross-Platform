import { AuthContext } from "@/context/authContext"
import { useRouter } from "expo-router"
import { useContext } from "react"
import { signOut } from "firebase/auth"
import { View, Pressable } from "react-native"
import  FontAwesome  from "@expo/vector-icons/FontAwesome"

export function SignOutButton(props : any){
    const auth = useContext(AuthContext)
    const router = useRouter()

    const SignOutUser = () => {
        signOut(auth)
            .then(() => {
                router.replace('/')
            })
            .catch((error) => {
                console.log(error.code, error.message)
            })
    }

    return (
        <View> 
            <Pressable onPress={ () => SignOutUser()}>
                <FontAwesome name="sign-out" size={24}></FontAwesome>
            </Pressable>
        </View>
    )
}

