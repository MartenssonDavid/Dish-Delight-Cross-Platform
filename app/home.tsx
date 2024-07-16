import { View, Text, StyleSheet } from "react-native";
import { NewEditShow } from "@/components/NewEditShow";


export default function Home(props:any){
    // Return list of items here
    return(
        <View>
            <Text>Home</Text>
            <NewEditShow/>
        </View>
    )

}