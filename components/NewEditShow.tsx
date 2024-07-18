import { View, Text, TextInput, StyleSheet, Image, Pressable } from 'react-native'
import { useState, useEffect } from 'react'

export function NewEditShow(props: any) {

    return (
        <View style={styles.container}>
            <TextInput style={styles.name} placeholder='Recipe Name'></TextInput> 
            <Image style={styles.image} />
            <Text style={styles.title}>{props.ingredients}</Text>
            <TextInput style={styles.textBox} multiline></TextInput>
            <Text style={styles.title}>{props.steps}</Text>
            <TextInput style={styles.textBox} multiline></TextInput>
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
        width: '80%'

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