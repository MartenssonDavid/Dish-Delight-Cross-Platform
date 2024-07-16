import { View, Text, TextInput, StyleSheet, Image, Pressable} from 'react-native'
import { useState, useEffect } from 'react'

export function NewEditShow(props:any){
    return(
        <View style = {styles.container}>
            <Text style={styles.title}> Recipe Name {props.title}</Text>
            <Image style={styles.image}/>
            <Text style={styles.title}> Ingredients {props.title}</Text>
            <TextInput style = {styles.textBox} multiline></TextInput>
            <Text style={styles.title}> Steps {props.title}</Text>
            <TextInput style = {styles.textBox} multiline></TextInput>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 20

    },
    title:{
        fontWeight: "bold",
        fontSize: 14,
        textAlign: "center",
        marginVertical: 10,
    },
    textBox:{
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 10,
        height: 200,
        width: 200,
        marginHorizontal: 20
    },
    image:{
        width: 150,
        height: 150,
        borderStyle: "solid",
        borderColor: "black",
        borderWidth: 2,


    }
})