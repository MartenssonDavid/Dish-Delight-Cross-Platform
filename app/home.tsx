import { View, Text, StyleSheet, Pressable, FlatList, Image } from "react-native";
import { AuthContext } from "@/context/authContext";
import { useContext, useEffect, useState } from "react";
import { Link, router, useNavigation } from "expo-router";
import { SignOutButton } from "@/components/SignOutButton";
import { DBContext } from "@/context/DBcontext";

import { collection, getDocs, where, onSnapshot, query } from "firebase/firestore";




export default function Home(props: any) {

    const auth = useContext(AuthContext)
    const db = useContext(DBContext)
    const navigation = useNavigation()

    // Array of data items
    const [data,setData] = useState([])

    // Set if data is loaded or not
    const [loaded, setLoaded] = useState(false)

    // Load data on start, check state, if false, fetchData
    useEffect(() =>{
        if (loaded == false){
            fetchData()
            setLoaded(true)
        }
    },[data, auth])

    // Header
    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerRight: () => <SignOutButton />
        })
    }, [navigation])

    // Function to get data
    const fetchData = async () =>{
        // Get docuemens from current signed in user
        const  path = `user/${ auth.currentUser.uid}/recipes`
        const q = query(collection (db, path))
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let recipes: any = []
            querySnapshot.forEach((doc)=>{
                const item = doc.data()
                item.id = doc.id
                recipes.push(item)
            })
            setData(recipes)
            console.log(data)
        })

    }

    // List items
    const ListItem = (props:any) => {
        return(
            <View style={styles.listItem}>
                <Image style={styles.image}></Image>
                <Text>{props.recipeName}</Text>
            </View>
        )
    }

    // Separator between items
    const Separator = () => {
        return(
            <View style={styles.separator}></View>
        )
    }

    // Items 
    const renderItem = ({item}: any) =>{
        return(
            <ListItem recipeName={item.recipeName} id={item.id}/>
        )
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.logo}>Home</Text>
            <FlatList 
            data={data}
            renderItem={renderItem}
            ItemSeparatorComponent={Separator}
            keyExtractor={(item: any) => item.id}
            style={styles.list}
            >
            </FlatList>
            <Pressable style={styles.addButton}>
                <Link href={'/new'}>
                    <Text style={styles.addButtonText}>+</Text>
                </Link>
            </Pressable>
        </View>
    )


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "#f7efd7",
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
    },
    list:{
        flex: 1
    },
    listItem:{
        flexDirection: "row",
        backgroundColor: "#CCCCCC"
    },
    separator:{
        height: 3
    },
    image:{
        width: 50,
        borderStyle: "solid",
        height: 50,
        borderWidth: 2,
        borderColor: "grey",
        margin: 5
    }
})