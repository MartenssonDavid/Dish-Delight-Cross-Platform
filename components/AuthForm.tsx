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
            <View style={styles.form}>
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

    form: {
        marginTop: 100,
        marginHorizontal: 20,
        padding: 20,
        borderRadius: 10,
        backgroundColor: "#8A9A5B",
        borderBottomWidth: 3,
        borderColor: "#4b5320",
        borderRightWidth: 1,
        borderLeftWidth: 1,
    },
    input: {
        padding: 6,
        marginBottom: 20,
        backgroundColor: "#fff8dc",
        borderRadius: 10,
        borderBottomWidth: 3,
        borderColor: "#4b5320",
        borderRightWidth: 1,
        borderLeftWidth: 1,
    },
    title: {
        fontSize: 18,
        textAlign: "center",
        fontWeight: "bold",
        fontFamily: "Verdana",
        color: "#1D2E28"
    },
    label: {
        fontSize: 14,
        fontWeight: "bold",
        fontFamily: "Verdana",
        color: "#1D2E28"
    },
    button: {
        borderRadius: 4,
        borderBottomColor: "#4b5320",
        borderBottomWidth: 3,
        backgroundColor: "#4F7942",
    },
    buttonText: {
        textAlign: "center",
        padding: 8,
        fontWeight: "bold",
        fontFamily: "Verdana",
        color: "#1D2E28"
    }
})