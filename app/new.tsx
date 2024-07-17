import { NewEditShow } from "@/components/NewEditShow"
import { View, Text, StyleSheet, Pressable } from "react-native"
import { AuthContext } from "@/context/authContext"
import { DBContext } from "@/context/DBcontext"
import { useContext } from "react"
import { collection, addDoc} from "firebase/firestore"
import { useRouter } from "expo-router"

export default function New(props: any) {
    const router = useRouter()
    // Auth context, get current user
    const auth = useContext(AuthContext)
    // Databse
    const db = useContext(DBContext)
    // Add data to db, async since await
    const addRecipe = async () =>{
        console.log("add")
        const data ={
        }
        const path = `recipes/${ auth.currentUser.uid} /items`
        const docRef = await addDoc( collection(db, path),data)
        console.log(docRef.id)
        router.replace('/home')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.logo}>Dish Delight</Text>
            <NewEditShow recipeName=" Recipe name" ingredients=" Ingredients" steps=" Steps" />
            <Pressable style={styles.addButton} onPress={ () => addRecipe()}  >
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