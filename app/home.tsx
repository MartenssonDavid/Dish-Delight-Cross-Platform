import { View, Text, StyleSheet, Pressable } from "react-native";
import { signOut } from "firebase/auth";
import { AuthContext } from "@/context/authContext";
import { useContext } from "react";
import { Link, router } from "expo-router";



export default function Home(props: any) {
    // Return list of items here
    const auth = useContext(AuthContext)

    // Function to sign out user and redirect to index
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
        <View style={styles.container}>
            <Text style={styles.logo}>Home</Text>
            <Pressable onPress={SignOutUser}>
                <Text>Sign out</Text>
            </Pressable>
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