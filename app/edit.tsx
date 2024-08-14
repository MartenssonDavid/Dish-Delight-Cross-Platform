import { SignOutButton } from "@/components/SignOutButton" 
import { NewEditShow } from "@/components/NewEditShow"
import { View, Text, StyleSheet, Pressable } from "react-native"
import { AuthContext } from "@/context/authContext"
import { DBContext } from "@/context/DBcontext"
import { useContext, useEffect, useState } from "react"
import { collection, addDoc, doc, setDoc, deleteDoc, getDoc} from "firebase/firestore"
import { useRouter, useNavigation, useLocalSearchParams } from "expo-router"
import Header from "@/components/Header"
// Image import
import * as ImagePicker from "expo-image-picker"
import {ref, uploadBytesResumable, getDownloadURL} from 'firebase/storage'
import { imageDBContext } from "@/context/imageDbContext"



export default function New(props: any) {
    const router = useRouter()
    // Auth context, get current user
    const auth = useContext(AuthContext)
    // Databse
    const db = useContext(DBContext)
    const params = useLocalSearchParams()
    const imgdb = useContext(imageDBContext)
    if (!imgdb){
        console.log("No imgdb")
    }else{
        console.log("ImageDb working")
    }
    // Navigation
    const navigation = useNavigation()




    // States for input of data
    const [recipeName, setRecipeName] = useState<string[]>([])
    const [ingredients, setIngredients] = useState<string[]>([])
    const [steps, setSteps] = useState<string[]>([])
    const [tags, setTags] = useState<string[]>([])
    const { id } = params
    // Default to display default image
    const [image,setImage] = useState('')
    // Default to upload default image
    const [imageLink, setImageLink] = useState('')

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
            setImage(data.imageLink)
        } else {
            console.log("No document found")
        }


    }

    const deleteDocument = async ( documentId: string ) => {
        const docRef = doc(db, `user/${auth.currentUser.uid}/recipes`, documentId)
        const delDoc = await deleteDoc( docRef )
        router.push('/home')
    }
    // Image picker from library on phone or files on desktop
    const imagePick = async ()=>{
        // Access image library on device
        let result = await ImagePicker.launchImageLibraryAsync({
            // Images
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [3,4],
            quality: .5
        })
        // If not cancled, create URI
        if(!result.canceled){
            setImage(result.assets[0].uri)
            // When image set, run upload function
            await uploadImage(result.assets[0].uri)

        }
    }

    // Upload image to storage using URI
    const uploadImage = async (uri: any) =>{
        // Set response as creted Uri
        const result = await fetch (uri)
        // Convert uri to BLOB for upload
        const blob = await result.blob()
        // Reference, save using name of recipe
        const storageRef = ref(imgdb, "recipeImages/"+ recipeName)
        const uploadOperation = uploadBytesResumable(storageRef, blob)
        // listen for changes
        uploadOperation.on("state_changed",
            // Just for checking progress
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                console.log(progress)
            },
            (error)=>{
                console.log("error", error)
            },
        // On complete, get url to store in actual recipe
            ()=>{
                getDownloadURL(uploadOperation.snapshot.ref).then(async (downloadURL) => {
                    console.log("FileURL:", downloadURL)
                    setImageLink(downloadURL)
                })
            }
        )
    }

    // Update, move to edit
    const addRecipe = async (recipeName: string[], ingredients: string[], steps: string[],imageLink: string) =>{
        console.log("add")
        const data ={
            recipeName: recipeName,
            ingredients: ingredients,
            steps: steps,
            imageLink: imageLink
        }
        const docRef = doc(db,`user/${ auth.currentUser.uid}/recipes`,id as string)
        await setDoc( docRef,data, {merge:true})
        console.log(docRef.id)
        console.log(data)
        router.replace('/home')
    }

    // Header
    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerBackTitleVisible: false,
            headerTitle: () => <Header/>,
            headerRight: () => <SignOutButton />,
            
            headerStyle:{
                backgroundColor: "#4F7942",
            }

        })
    }, [navigation])

    

    return (
        <View style={styles.container}>
            <NewEditShow 
                recipeName={recipeName} 
                setRecipeName={setRecipeName} 
                ingredients={ingredients} 
                setIngredients={setIngredients} 
                steps={steps} 
                setSteps={setSteps}
                image={image}
                setImage={setImage}
                imagePick = {imagePick}
            />
            <Pressable style={styles.deleteButton} onPress={()=> deleteDocument(id as string)}>
                <Text>Delete</Text>
            </Pressable>
            <Pressable style={styles.addButton} onPress={ () => addRecipe(recipeName,ingredients,steps,imageLink)}  >
                <Text style={styles.addButtonText}>+</Text>
            </Pressable>
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
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderColor: "#4b5320",
        borderBottomWidth: 5,
        borderRadius: 40,
        width: 44,
        height: 44,
    },
    addButton: {
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 10,
        right: 10,
        backgroundColor: "#4F7942",
        padding: 15,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderColor: "#4b5320",
        borderBottomWidth: 5,
        borderRadius: 40,
        width: 44,
        height: 44,
    },
    addButtonText: {
        textAlign: "center",
        fontSize: 15,
        fontWeight: "bold",
    },
})
