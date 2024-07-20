import { View, Text, TextInput, StyleSheet, Image, Pressable } from 'react-native'
import { useState } from 'react'

// Interface for props, since setter is function, declare as function that returns nothing
interface NewEditProps {
    recipeName: string,
    setRecipeName: (recipeName: string) => void
    ingredients: string,
    setIngredients: (ingredients: string) => void
    steps: string,
    setSteps: (steps: string) => void
}

// When text is changed, use text to setState
export function NewEditShow({ recipeName, setRecipeName, ingredients, setIngredients, steps, setSteps }: NewEditProps) {
    return (
        <View style={styles.container}>
            <TextInput style={styles.name} placeholder='Recipe Name' onChangeText={(text) => { setRecipeName(text) }} value={recipeName}></TextInput>
            <Image style={styles.image} />
            <Text style={styles.title}>Ingredients</Text>
            <TextInput style={styles.textBox} multiline onChangeText={(text) => { setIngredients(text) }} value={ingredients}></TextInput>
            <Text style={styles.title}>Steps</Text>
            <TextInput style={styles.textBox} multiline onChangeText={(text) => { setSteps(text) }} value={steps}></TextInput>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
        marginVertical: 20,
        borderRadius: 10,
        paddingVertical: 20,
        backgroundColor: "#8A9A5B",
        borderBottomWidth: 3,
        borderBottomColor: "#4b5320",

    },
    title: {
        fontSize: 14,
        textAlign: "center",
        marginVertical: 10,
        fontWeight: "bold",
        fontFamily: "Verdana",
        color: "#1D2E28"
    },
    textBox: {
        flex: 1,
        borderStyle: "solid",
        borderRadius: 10,
        height: '20%',
        width: '80%',
        padding: 10,
        borderBottomWidth: 3,
        borderBottomColor: "#4b5320",
        backgroundColor: "#fff8dc"

    },
    image: {
        width: 150,
        height: 150,
        borderBottomWidth: 3,
        borderBottomColor: "#4b5320",
        backgroundColor: "#fff8dc",
        borderRadius: 10,
    },
    name: {
        fontSize: 14,
        textAlign: "center",
        marginVertical: 10,
        padding: 2,
        borderBottomWidth: 3,
        borderBottomColor: "#4b5320",
        backgroundColor: "#fff8dc",
        borderRadius: 10,
    }

})