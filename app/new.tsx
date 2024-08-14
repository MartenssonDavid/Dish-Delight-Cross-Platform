import { SignOutButton } from "@/components/SignOutButton" 
import { NewEditShow } from "@/components/NewEditShow"
import { View, Text, StyleSheet, Pressable } from "react-native"
import { AuthContext } from "@/context/authContext"
import { DBContext } from "@/context/DBcontext"
import { useContext, useEffect, useState } from "react"
import { collection, addDoc} from "firebase/firestore"
import { useRouter, useNavigation } from "expo-router"
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
    // Default to display default image
    const [image,setImage] = useState('https://firebasestorage.googleapis.com/v0/b/dish-delight-cross-platform.appspot.com/o/recipeImages%2FDefaultImage?alt=media&token=4cf41c17-4d2b-4d54-9dfd-eb6859215d17')
    // Default to upload default image
    const [imageLink, setImageLink] = useState('https://firebasestorage.googleapis.com/v0/b/dish-delight-cross-platform.appspot.com/o/recipeImages%2FDefaultImage?alt=media&token=4cf41c17-4d2b-4d54-9dfd-eb6859215d17')


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

    // Add data to db, using URL from image
    const addRecipe = async (recipeName: string[], ingredients: string[], steps: string[], imageLink: string) =>{

        // Get resulring uri from 
        const data ={
            recipeName: recipeName,
            ingredients: ingredients,
            steps: steps,
            imageLink: imageLink
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
