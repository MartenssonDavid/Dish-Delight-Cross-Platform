import { SignOutButton } from "@/components/SignOutButton" 
import { NewEditShow } from "@/components/NewEditShow"
import { View, Text, StyleSheet, Pressable } from "react-native"
import { AuthContext } from "@/context/authContext"
import { DBContext } from "@/context/DBcontext"
import { useContext, useEffect, useState } from "react"
import { collection, addDoc} from "firebase/firestore"
import { useRouter, useNavigation } from "expo-router"

export default function New(props: any) {
    const router = useRouter()
    // Auth context, get current user
    const auth = useContext(AuthContext)
    // Databse
    const db = useContext(DBContext)
    // Navigation
    const navigation = useNavigation()

    // States for input of data
    const [recipeName, setRecipeName] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [steps, setSteps] = useState('')

    // Add data to db
    const addRecipe = async (recipeName: string, ingredients: string, steps: string) =>{
        console.log("add")
        const data ={
            recipeName: recipeName,
            ingredients: ingredients,
            steps: steps,
        }
        const path = `user/${ auth.currentUser.uid}/recipes`
        const docRef = await addDoc( collection(db, path),data)
        console.log(docRef.id)
        console.log(data)
        router.replace('/home')
    }

    // Header
    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerRight: () => <SignOutButton />
        })
    }, [navigation])

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>Dish Delight</Text>
            <NewEditShow 
                recipeName={recipeName} 
                setRecipeName={setRecipeName} 
                ingredients={ingredients} 
                setIngredients={setIngredients} 
                steps={steps} 
                setSteps={setSteps}
            />
            <Pressable style={styles.addButton} onPress={ () => addRecipe(recipeName,ingredients,steps)}  >
                <Text style={styles.addButtonText}> + </Text>
            </Pressable>
        </View>
    )

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    addButton: {
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 10,
        right: 10,
        backgroundColor: "grey",
        padding: 15,
        borderColor: "black",
        borderStyle: "solid",
        borderWidth: 2,
        borderRadius: 40,
        width: 75,
        height: 75,
    },
    addButtonText: {
        textAlign: "center",
        fontSize: 15,
        fontWeight: "bold",
    },
    logo: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 20
    }
})