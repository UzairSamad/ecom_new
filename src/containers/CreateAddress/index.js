import React, { Component, useState, useContext } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { vw, vh } from '../../Dimensions'
import Ionicons from "react-native-vector-icons/Ionicons"
import { AppContext } from '../../AppContext'
import { createResource, } from '../../WebApiServices/SimpleApiCalls';
import { create_address, } from '../../WebApiServices/WebServices';
import { SpinnerLoader } from '../../components'



export default function CreateAddress({ navigation }) {
    const contextData = useContext(AppContext)
    const { adressDummyData, setAddressDummyData, createUserAddress, userToken,getUserAddress ,user} = contextData

    const [name, setName] = useState('')
    const [addressLane, setAddressLane] = useState('')
    const [city, setCity] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const renderInput = (label, placeHolder, value, state, type) => {
        return (
            <View style={{ marginBottom: vh * 0.04 }}>
                <Text style={{ color: "#A6A6A6", fontSize: 16 }}>{label}</Text>
                <TextInput
                    value={value}
                    placeHolder={placeHolder}
                    style={{
                        borderBottomWidth: 1,
                        borderColor: '#A6A6A6',
                        marginTop: -12,
                        color: "#404040"
                    }}
                    keyboardType={type}
                    onChangeText={val => state(val)}
                />
            </View>
        )
    }
    const handleAdd = async () => {
        setIsLoading(true)
        let data = {
            name,
            addressLine: addressLane,
            city,
            postalCode,
            phoneNumber
        }
        try {
            let res = await createResource(create_address, data, user.token);
            setIsLoading(false)
            getUserAddress()
            navigation.navigate('Address')
        } catch (error) {
            alert('err',JSON.stringify(error))
            console.log(error,'***************/////////')
            setIsLoading(false)

        }
    }

    return (
        <>
            <SpinnerLoader isLoading={isLoading} />

            <ScrollView style={styles.container}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: vh * 0.04 }}>
                    <TouchableOpacity onPress={_ => navigation.goBack()} >
                        <Ionicons name="arrow-back" size={24} color="#404040" />
                    </TouchableOpacity>
                </View>
                <Text style={{ marginBottom: vh * 0.06, fontSize: 26, fontWeight: 'bold' }}>Create Address</Text>
                {renderInput('Name', 'Enter Your Name', name, setName, "default")}
                {renderInput('Address Lane', 'Enter Address Lane', addressLane, setAddressLane,"default")}
                {renderInput('City', 'Enter Your City', city, setCity,"default")}
                {renderInput('Postal Code', 'Enter Postal Code', postalCode, setPostalCode,"number-pad")}
                {renderInput('Phone Number', '##-####-#####', phoneNumber, setPhoneNumber,"number-pad")}
                <TouchableOpacity style={styles.buyNow} onPress={() => handleAdd()}>
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Add Address</Text>
                </TouchableOpacity>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FEFBEA",
        paddingHorizontal: vw * 0.04,

    },

    buyNow: {
        backgroundColor: '#ADD8E6',
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        borderRadius: 8,
        elevation: 4,
        alignSelf: 'center',
        marginBottom: 10
    }

})

