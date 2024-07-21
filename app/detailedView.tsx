import { View, Text, TextInput, StyleSheet, Image, Pressable } from 'react-native'
import { useState, useEffect, useContext } from 'react'
import { useNavigation, useLocalSearchParams, useRouter } from 'expo-router'
import { NewEditShow } from '@/components/NewEditShow'
import Header from '@/components/Header'
import { SignOutButton } from '@/components/SignOutButton'
import { DBContext } from '@/context/DBcontext'
import { AuthContext } from '@/context/authContext'
import { doc, getDoc, deleteDoc, setDoc, collection, documentId } from 'firebase/firestore'

export default function detailedView(props: any) {

    const [recipeName, setRecipeName] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [steps, setSteps] = useState('')
    const router = useRouter()
    const navigation = useNavigation()
    const params = useLocalSearchParams()
    const db = useContext(DBContext)
    const auth = useContext(AuthContext)
    const { id } = params

    // Header
    useEffect(() => {
        getDocument(id as string)
        navigation.setOptions({
            headerShown: true,
            headerRight: () => <SignOutButton />,
            headerTitle: () => <Header />,
            headerStyle: {
                backgroundColor: "#4F7942",
            }
        })
    }, [navigation])

    const getDocument = async (documentId: string) => {
        const docRef = doc(db, `user/${auth.currentUser.uid}/recipes`, documentId)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            const data = docSnap.data()
            setRecipeName(data.recipeName)
            setIngredients(data.ingredients)
            setSteps(data.steps)
        } else {
            console.log("No document found")
        }


    }

    const deleteDocument = async ( documentId: string ) => {
        const docRef = doc(db, `user/${auth.currentUser.uid}/recipes`, documentId)
        const delDoc = await deleteDoc( docRef )
        navigation.goBack()
    }

    const addRecipe = async (recipeName: string, ingredients: string, steps: string) =>{
        console.log("add")
        const data ={
            recipeName: recipeName,
            ingredients: ingredients,
            steps: steps,
        }
        const docRef = doc(db,`user/${ auth.currentUser.uid}/recipes`,id as string)
        await setDoc( docRef,data, {merge:true})
        console.log(docRef.id)
        console.log(data)
        router.replace('/home')
    }
    return (
        <View style={styles.container}>
            <NewEditShow
                recipeName={recipeName}
                setRecipeName={setRecipeName}
                ingredients={ingredients}
                setIngredients={setIngredients}
                steps={steps}
                setSteps={setSteps}>
            </NewEditShow>
            <View>
            <Pressable style={styles.deleteButton} onPress={()=> deleteDocument(id as string)}>
                <Text>Delete</Text>
            </Pressable>
            <Pressable style = {styles.addButton}  onPress={ () => addRecipe(recipeName,ingredients,steps)}>Edit</Pressable>
            </View>
        </View>


    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#9DC183",
    },
    deleteButton:{
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 10,
        left: 10,
        backgroundColor: "#4F7942",
        padding: 15,
        borderBottomColor: "#4b5320",
        borderBottomWidth: 3,
        borderRadius: 40,
        width: 75,
        height: 75,
    },
    addButton: {
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 10,
        right: 10,
        backgroundColor: "#4F7942",
        padding: 15,
        borderBottomColor: "#4b5320",
        borderBottomWidth: 3,
        borderRadius: 40,
        width: 75,
        height: 75,
    },

})