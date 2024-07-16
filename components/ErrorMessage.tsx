import { View, Text, StyleSheet } from "react-native"
import { useEffect, useState } from "react"


export function ErrorMessage(props : any){

    const [errorMess, setErrorMess] = useState('')
    // Slice the message after / and replace -
    // Get first char of edited message, make uppercase
    useEffect ( () => {
        if(props.error){
            const message = props.error
            const lowerCase =  message.slice( props.error.indexOf('/') + 1, message.length).replaceAll('-', ' ')
            setErrorMess(lowerCase.charAt(0).toUpperCase() + lowerCase.slice(1))
            console.log(props.error)
        }else{
            setErrorMess(' ')
        }

    }, [props.error])

    // If there is an error, show message
    // Else, empty
    if( errorMess ){
        return(
            <View style = {styles.error}>
                <Text style = { styles.errorText}> {errorMess} </Text>
            </View>
        )
    }else{
        return null
    }
}

const styles = StyleSheet.create({
    error:{
        alignSelf: "center",
        padding: 5,
    },
    errorText:{
        textAlign: "center"
    }
})