import { View, Text, StyleSheet, Pressable } from "react-native";
import { AuthContext } from "@/context/authContext";
import { useContext, useEffect, useState } from "react";
import { Link, router, useNavigation } from "expo-router";
import { SignOutButton } from "@/components/SignOutButton";

import { collection, getDocs, where, onSnapshot } from "firebase/firestore";



export default function Home(props: any) {

    const auth = useContext(AuthContext)
    const navigation = useNavigation()

    // Header
    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerRight: () => <SignOutButton />
        })
    }, [navigation])

    // Function to get data
    const fethData = async () =>{
        
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.logo}>Home</Text>
            <Link href={'/new'} style={styles.addButton}>
                <Text style={styles.addButtonText}> + </Text>
            </Link>
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
    }
})