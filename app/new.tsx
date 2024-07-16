import { NewEditShow } from "@/components/NewEditShow"
import { View, Text, StyleSheet, Pressable } from "react-native"

export default function New(props : any){

    //const addRecipe()
    
    return(
        <View style = {styles.container}>
            <NewEditShow recipeName=" Recipe name" ingredients = " Ingredients" steps = " Steps" />
            <Pressable style={ styles.addButton}  >
                <Text style={ styles.addButtonText}> + </Text>
            </Pressable>
        </View>
    )
    
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: "#f7efd7",
        padding: 20,
    },
    addButton:{
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
    addButtonText:{
        textAlign: "center",
        fontSize: 15,
        fontWeight: "bold",
    }
})