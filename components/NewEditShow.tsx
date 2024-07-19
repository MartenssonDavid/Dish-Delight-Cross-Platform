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
export function NewEditShow({ recipeName, setRecipeName, ingredients, setIngredients, steps, setSteps} : NewEditProps) {
    return (
        <View style={styles.container}>
            <TextInput style={styles.name} placeholder='Recipe Name' onChangeText={ (text) => {setRecipeName(text)}}></TextInput> 
            <Image style={styles.image} />
            <Text style={styles.title}>Ingredients</Text>
            <TextInput style={styles.textBox} multiline onChangeText={ (text) => {setIngredients(text)}}></TextInput>
            <Text style={styles.title}>Steps</Text>
            <TextInput style={styles.textBox} multiline onChangeText={ (text) => {setSteps(text)}}></TextInput>
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
        borderStyle: "solid",
        borderColor: "grey",
        borderWidth: 2,
    },
    title: {
        fontSize: 14,
        textAlign: "center",
        marginVertical: 10,
        fontWeight: "bold"
    },
    textBox: {
        flex: 1,
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "grey",
        borderRadius: 10,
        height: '20%',
        width: '80%',
        padding: 10

    },
    image: {
        width: 150,
        height: 150,
        borderStyle: "solid",
        borderColor: "grey",
        borderWidth: 2,
    },
    name:{
        fontSize: 14,
        textAlign: "center",
        marginVertical: 10,
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "grey",
        borderRadius: 5
    }

})