import { View, Text, StyleSheet } from "react-native"

export default function Header(props:any){
    return(
        <View style={styles.header}>
            <View>
                <Text style = {styles.headerText}> Dish Delight</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText:{
        fontWeight: 'bold',
        fontSize: 20,    
        fontFamily: "Verdana",
        color: "#1D2E28"
    }
})