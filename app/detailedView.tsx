import { View, Text, TextInput, StyleSheet, Image, Pressable } from 'react-native'
import { useState, useEffect, useContext } from 'react'
import { useNavigation, useLocalSearchParams } from 'expo-router'
import { NewEditShow } from '@/components/NewEditShow'
import Header from '@/components/Header'
import { SignOutButton } from '@/components/SignOutButton'
import { DBContext } from '@/context/DBcontext'
import { AuthContext } from '@/context/authContext'
import { doc, getDoc } from 'firebase/firestore'

export default function detailedView(props: any) {

    const [recipeName, setRecipeName] = useState('')
    const [ingredients, setIngredients] = useState('')
    const [steps, setSteps] = useState('')
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
    return (
        <View style={styles.container}>
            <Text>Details for {id}</Text>
            <NewEditShow
                recipeName={recipeName}
                setRecipeName={setRecipeName}
                ingredients={ingredients}
                setIngredients={setIngredients}
                steps={steps}
                setSteps={setSteps}>

            </NewEditShow>
        </View>


    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#9DC183",
    },

})