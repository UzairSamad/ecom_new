import React, { Component, useContext, useEffect, useState } from 'react'
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { vw, vh } from '../../Dimensions'
import { BackButton, Heading } from '../../components'
import { AppContext } from "../../AppContext"
import Toast from "react-native-simple-toast"
import { createResource } from '../../WebApiServices/SimpleApiCalls'
import { contact_us } from '../../WebApiServices/WebServices'


export default function ContactUs({ navigation }) {

    const context = useContext(AppContext)
    const { user } = context

    useEffect(() => {

        console.log(user, "USRRRRRRRRRRRRRRRRRRRRRRRRRRRR");
        const unsubscribe = navigation.addListener('focus', () => {
            if (user !== null) {

            }
            else {
                // alert("ele")
                Toast.showWithGravity("Please Login First ", Toast.LONG, Toast.BOTTOM, 25, 50)
            }
        })
    }, [])


    const [addressData, setAddressData] = useState({
        messageTitle: '',
        customerMessage: ''
    })

    const onChangeValues = (value, type) => {
        console.log(value, type, "VALUE_AND_TYEEEEEEEE");
        setAddressData({
            ...addressData,
            [value]: type
        })
    }

    console.log(addressData, "DDDDDDDDDDDDDDDDDDd");

    const renderInput = (label, placeHolder, value, isDescription, valToChange) => {
        return (
            <View style={{ marginTop: vh * 0.04 }}>
                <Text style={{ color: "black", fontSize: 16 }}>{label}</Text>
                <TextInput
                    value={value}
                    placeholder={placeHolder}
                    style={{
                        borderBottomWidth: 1,
                        borderColor: '#A6A6A6',
                        color: "#404040"
                    }}
                    onChangeText={(text) => onChangeValues(valToChange, text)}
                    numberOfLines={isDescription ? 5 : 1}
                />
            </View>
        )
    }

    const submitContactForm = () => {
        console.log(user,"USRRRRRRRRRRRRRRRR");
        let data = {
            userName: user.name,
            date: new Date().toLocaleString(),
            title: addressData.messageTitle,
            question: addressData.customerMessage,
            image:user.image,
            email:user.email,
            phone:user.phoneNumber
        }

        if (user == null) {
            Toast.showWithGravity("Please Login First ", Toast.LONG, Toast.BOTTOM, 25, 50)
            return
        }

        if (addressData.messageTitle == "") {
            Toast.showWithGravity("Message Title Cannot be empty ", Toast.LONG, Toast.BOTTOM, 25, 50)
            return
        }

        if (addressData.customerMessage == "") {
            Toast.showWithGravity("Customer Message Cannot be empty ", Toast.LONG, Toast.BOTTOM, 25, 50)
            return
        }

        else {
            createResource(contact_us, data).then(res => {
                Toast.showWithGravity("Query Submitted Successfully", Toast.LONG, Toast.BOTTOM)
                navigation.navigate("Home")
            })
                .catch(err => {
                    console.log(err, "ERRRRRRRRRRRRRRR");
                    alert("ERRRRRRRRRRR")
                })
        }
    }

    return (
        <View style={styles.container}>
            <View >
                <BackButton navigation={navigation} />
                <Heading heading="Contact Us" />
            </View>
            {renderInput('Message Title', 'Message Title', addressData.messageTitle, false, "messageTitle")}
            <View
                style={{
                    borderWidth: 1,
                    borderColor: '#A6A6A6',
                    marginTop: 15,
                    color: "#404040",
                    borderRadius: 15,
                    paddingHorizontal: 5,
                    height: 160
                }}
            >
                <TextInput
                    value={addressData.customerMessage}
                    style={{ textAlignVertical: "top" }}
                    placeholder='Question or Comment'
                    placeholderTextColor="black"
                    numberOfLines={5}
                    onChangeText={(text) => onChangeValues("customerMessage", text)}
                />

            </View>
            <View style={{ flex: 1, justifyContent: "flex-end", marginVertical: 10 }}>
                <TouchableOpacity style={styles.buyNow} onPress={submitContactForm}>
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FEFBEA",
        paddingHorizontal: vw * 0.05

    },

    buyNow: {
        backgroundColor: '#ADD8E6',
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: vh * 0.02,
        width: '90%',
        borderRadius: 8,
        elevation: 4,
        alignSelf: 'center'
    }

})

