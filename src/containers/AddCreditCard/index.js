import React, { Component, useState, useContext } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet, ScrollView ,    ToastAndroid,} from 'react-native'
import { vw, vh } from '../../Dimensions'
import Ionicons from "react-native-vector-icons/Ionicons"
import stripe from "tipsi-stripe"
import { SpinnerLoader } from '../../components'
import axios from 'axios'
import { createResource, } from '../../WebApiServices/SimpleApiCalls';
import { create_creditCard, } from '../../WebApiServices/WebServices';
import { AppContext } from '../../AppContext'

stripe.setOptions({
    publishableKey: 'pk_test_51J4uScB0aMhLIiI7zp7jtgxjW9ndWxAP03CoWfbqvEGTvZE8ngINP5Msh1yuuqeUcgSo2yJSrJpLL4Su6euYDIsT00mdzqrEbH'
})
export default function AddCreditCard({ navigation }) {
    const contextData = useContext(AppContext)
    const { adressDummyData, setAddressDummyData, createUserAddress, userToken, getUserAddress, user } = contextData

    const [isLoading, setIsLoading] = useState(false)
    const [token, setToken] = useState("")
    const [loading, setLoading] = useState(false)
    const [addressData, setAddressData] = useState({
        name: '',
        number: '',
        expDate: '',
    })
    const handleChange = (value, stateName) => {
        let obj = { ...addressData }
        obj[stateName] = value
        setAddressData(obj)

    }


    const handleAdd = async () => {
        setIsLoading(true)
        if(addressData.number.length < 16){
            ToastAndroid.showWithGravity("Invalid Card Number", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50)
        }else{
        try {
            let res = await createResource(create_creditCard, addressData, user.token);
            setIsLoading(false)
            getUserAddress()
            navigation.navigate('CreditCards')
        } catch (error) {
            alert('err', JSON.stringify(error))
            console.log(error, '***************/////////')
            setIsLoading(false)

        }
    }

    }


    const renderInput = (label, placeHolder, value, stateName) => {
        return (
            <View style={{ marginBottom: vh * 0.03 }}>
                <Text style={{ color: "#A6A6A6", fontSize: 16 }}>{label}</Text>
                <TextInput
                    value={value}
                    placeholder={placeHolder}
                    style={{
                        borderBottomWidth: 1,
                        borderColor: '#A6A6A6',
                        marginTop: -12,
                        color: "#404040"
                    }}
                    type={'number'}
                    onChangeText={text => handleChange(text, stateName)}
                    // keyboardType="phone-pad"

                />
            </View>
        )
    }

    const renderInputNumber = (label, placeHolder, value, stateName) => {
        return (
            <View style={{ marginBottom: vh * 0.03 }}>
                <Text style={{ color: "#A6A6A6", fontSize: 16 }}>{label}</Text>
                <TextInput
                    value={value}
                    placeholder={placeHolder}
                    style={{
                        borderBottomWidth: 1,
                        borderColor: '#A6A6A6',
                        marginTop: -12,
                        color: "#404040"
                    }}
                    type={'number'}
                    onChangeText={text => handleChange(text, stateName)}
                    keyboardType="phone-pad"

                />
            </View>
        )
    }

    const creatCreditCard = async () => {

        console.log(addressData, 'stateName')
        if (addressData.expDate.length != 5) {
            alert('Please enter valid date')
        } else if (addressData.expDate.charAt(2) != '/') {
            alert('Date should be in this format month/year')
        } else {
            let month = addressData.expDate.split('/')[0]
            let year = addressData.expDate.split('/')[1]
            console.log(month, 'yeaaaa')
            console.log(year, 'yeaaaa')
            handleAdd()
            // try {
            //     const token = await stripe.createTokenWithCard({
            //         number: addressData.cardNumber,
            //         expMonth: parseInt(month),
            //         expYear: parseInt(year)
            //     })
            //     console.log(token, "TTTTTTTTTTTTTTTTTTTT");
            //     if (token) {
            //         let data = {
            //             number: addressData.cardNumber,
            //             expMonth: parseInt(month),
            //             expYear: parseInt(year),
            //             token: token.tokenId
            //         }
            //         axios.post("http://192.168.3.218:5000/api/payment", {
            //             data
            //         })
            //             .then(res => {
            //                 console.log(res, "RRRRRRRRRRRRRRRRRRRR");
            //             })
            //             .catch(err => {
            //                 alert("err")
            //             })
            //     }

            // } catch (error) {
            //     console.log(error, "EEEEEEEEEEEEEEEEEEEEEEEE");
            // }
        }


    }
    return (
        <>
            <SpinnerLoader isLoading={loading} />
            <ScrollView style={styles.container}>
                <View style={{ flex: 0.8 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: vh * 0.04 }}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{ marginTop: 20 }}>
                            <Ionicons name="arrow-back" size={30} color="#C5CCD6" />
                        </TouchableOpacity>
                    </View>
                    <Text style={{ marginBottom: vh * 0.06, fontSize: 26 }}>Add Credit Card</Text>
                    {renderInput('Name', 'Enter Your Name', addressData.name, 'name')}
                    {renderInputNumber('Credit Card Number', 'Credit Card Numer', addressData.number, 'number')}
                    {renderInputNumber('Expiry Date', 'Month/year', addressData.expDate, 'expDate')}
                    {/* {renderInput('CVV', '##-####-#####', addressData.cvv, 'cvv')} */}
                </View>
                <View style={{ flex: 0.4, justifyContent: 'flex-end', marginTop: vh * 0.06 }}>
                    <TouchableOpacity style={styles.buyNow} onPress={creatCreditCard}>
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Create</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FEFBEA",
        paddingHorizontal: vw * 0.04
    },

    buyNow: {
        backgroundColor: '#ADD8E6',
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: vh * 0.03,
        width: '90%',
        borderRadius: 8,
        elevation: 4,
        alignSelf: 'center'
    }

})

