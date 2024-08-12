import { View, Text, StyleSheet, Pressable, FlatList, Image, TextInput } from "react-native";
import { AuthContext } from "@/context/authContext";
import { useContext, useEffect, useState } from "react";
import { Link, router, useNavigation } from "expo-router";
import { SignOutButton } from "@/components/SignOutButton";
import { DBContext } from "@/context/DBcontext";
import  Header  from "@/components/Header"

import { collection, getDocs, where, onSnapshot, query } from "firebase/firestore";
import { ScreenStackHeaderLeftView } from "react-native-screens";





export default function Home(props: any) {

    const auth = useContext(AuthContext)
    const db = useContext(DBContext)
    const navigation = useNavigation()

    // Array of data items
    const [data,setData] = useState([])

    // Set if data is loaded or not
    const [loaded, setLoaded] = useState(false)

    // Search
    const [search, setSearch] = useState("")

    // Load data on start, check state, if false, fetchData
    useEffect(() =>{
        if (loaded == false){
            fetchData()
            setLoaded(true)
        }   
    },[data, auth, search])



    // Header
    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            ScreenStackHeaderLeftView : false,
            headerRight: () => <SignOutButton />,
            headerTitle: () => <Header/>,

            headerStyle:{
            backgroundColor: "#4F7942",
            }
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

        })
        console.log(data)

    }

    // Seacrch 
        const searchData = async () => {
            const  path = `user/${ auth.currentUser.uid}/recipes`
            const q = query(collection (db, path), where("recipeName", "==" ,search) )
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                let recipes: any = []
                querySnapshot.forEach((doc)=>{
                    const item = doc.data()
                    item.id = doc.id
                    recipes.push(item)
                })
                setData(recipes)
                console.log(data)
                console.log("Search Term" + search)
            })
        }

    // List items
    const ListItem = (props:any) => {
        return(                
        
            <View style={styles.listItem}>
                <Image source = {{uri: props.imageLink}} style={styles.image}></Image>
                <View style={styles.name}>
                <Link href = {{ pathname :"/detailedView", params: {id: props.id} }} style={styles.link}>
                <Text style={styles.listText}>{props.recipeName}</Text>            
                </Link>  
                </View>
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
            <ListItem style={styles.listText} recipeName={item.recipeName} id={item.id} imageLink={item.imageLink}/>
        )
    }

    
    return (
        <View style={styles.container}>
            <TextInput onChangeText={setSearch}></TextInput>
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
        backgroundColor: "#9DC183",
        padding: 20,
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
        width: 75,
        height: 75,
    },
    addButtonText: {
        textAlign: "center",
        fontSize: 15,
        fontWeight: "bold",
    },
    list:{
        flex: 1,

    },
    listItem:{
        flexDirection: "row",
        backgroundColor: "#8A9A5B",
        borderBottomWidth: 3,
        borderColor: "#4b5320",
        borderRadius: 10,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        padding: 10,
        justifyContent: "space-between",

    },
    link: {
        flex: 1
    },
    listText:{
        flex: 1,
        paddingHorizontal: 10,
        paddingTop: 5,
        fontWeight: "bold",
        fontFamily: "Verdana",
        color: "#1D2E28",

    },
    separator:{
        height: 5
    },
    image:{
        width: 70,
        borderStyle: "solid",
        height: 70,
        margin: 5,
        borderRadius: 5,
        borderColor: "#4b5320",
        borderBottomWidth: 3,
        borderRightWidth: 1,
        borderLeftWidth: 1,
    },
    searchBar:{
        fontSize: 14,
        textAlign: "center",
        marginVertical: 10,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 5
    },
    name:{
        flex:1,
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",

    },

})