import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native'
import { useState, useEffect } from 'react'

// Export of Authform since will be same for login and sign up
export function AuthForm(props: any) {

    // Hold value of email when text is changed in input, init as empty string
    const [email, setEmail] = useState(' ')

    // Same as above but for password
    const [password, setPassword] = useState(' ')

    // Check if email and password is valid
    const [validEmail, setValidEmail] = useState(false)
    const [validPassword, setValidPassword] = useState(false)

    // Check for content in email
    useEffect(() => {
        // Simple check for valid email
        if (email.indexOf('@') > 0 && email.length >= 7) {
            setValidEmail(true)
        } else {
            setValidEmail(false)
        }
    }, [email])

    // Check for content in password
    useEffect(() => {
        // Check if password is valid
        if (password.length >= 5) {
            setValidPassword(true)
        } else {
            setValidPassword(false)
        }
    }, [password])

    return (
        <View style={styles.container}>
            <Text
                style={styles.title}>
                {props.title}
            </Text>

            <Text style={styles.label}> Email </Text>

            <TextInput
                style={styles.input}
                onChangeText={(text) => setEmail(text)}>
            </TextInput>

            <Text style={styles.label}> Password </Text>

            <TextInput
                style={styles.input}
                secureTextEntry={true}
                onChangeText={(text) => setPassword(text)}>
            </TextInput>

            <Pressable
                style={styles.button}
                onPress={() => props.action(email, password)}
            >
                <Text style={styles.buttonText}> {props.actionText} </Text>
            </Pressable>
        </View>
    )

}

// Styling of component, transfers to pages where component is imported
const styles = StyleSheet.create({
    container: {
        marginTop: 100,
        marginHorizontal: 20,
        backgroundColor: "#f7efd7",
        padding: 20,
        borderRadius: 10
    },
    input: {
        borderColor: "#c9c9c9",
        borderWidth: 2,
        borderStyle: "solid",
        padding: 6,
        marginBottom: 20,
        backgroundColor: "#efefef",
        borderRadius: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: "center",
    },
    label: {
        fontSize: 14,
    },
    button: {
        backgroundColor: "grey",
        borderRadius: 4,
    },
    buttonText: {
        textAlign: "center",
        padding: 8,
    }
})