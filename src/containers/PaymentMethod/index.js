import React, { Component, useState,useContext } from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { vh, vw } from '../../Dimensions'
import Ionicons from "react-native-vector-icons/Ionicons"
import AntDesign from "react-native-vector-icons/AntDesign"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import { ScrollView } from 'react-native-gesture-handler';
import { AppContext } from '../../AppContext'


export default function PaymentMethod({ navigation }) {
    const contextData = useContext(AppContext)
    const {
        setPaymentType,
        paymentType
    } = contextData
    const [selectPaymentMethod, setSelectPaymentMethod] = useState(false)
    const handleProcced = () => {
        if (selectPaymentMethod) {
            navigation.navigate('Checkout')
        } else {
            alert('Please Select Payment Method First')
        }

    }
    return (

        <View style={{ flex: 1, paddingHorizontal: 15, backgroundColor: '#FEFBEA' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: vh * 0.04 }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ marginTop: 20 }}>
                    <Ionicons name="arrow-back" size={30} color="#C5CCD6" />
                </TouchableOpacity>
            </View>
            <Text style={{ marginBottom: vh * 0.01, fontSize: 26 }}>Payment Method</Text>
            <ScrollView style={{ flex: 0.7 }}>
                <TouchableOpacity
                    onPress={() => {
                        // alert('Cash on Delivery available for now ,this module is under development ')
                        navigation.navigate("CreditCards")
                        setPaymentType('CreditCard')

                    }}
                    style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: vh * 0.03, borderBottomWidth: 1, borderBottomColor: '#979797', paddingVertical: vh * 0.02 }}>
                    <Text style={{ flex: 0.8, color: '#979797' }}>Credit Card</Text>
                    <AntDesign name="creditcard" size={22} color="#979797" />
                </TouchableOpacity>
                {!selectPaymentMethod ? <TouchableOpacity
                    onPress={() => {
                        setPaymentType('Cash on Delivery')
                        setSelectPaymentMethod(true)
                    }
                    }
                    style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: vh * 0.03, borderBottomWidth: 1, borderBottomColor: '#979797', paddingVertical: vh * 0.02 }}>
                    <Text style={{ flex: 0.8, color: '#979797' }}>Cash on Delivery</Text>
                    <FontAwesome name="money" size={22} color="#979797" />
                </TouchableOpacity>
                    :
                    <TouchableOpacity
                        onPress={() => setPaymentType('COD')}
                        style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: vh * 0.03, paddingHorizontal: 5, paddingVertical: vh * 0.02, borderWidth: 2, borderColor: '#ADD8E6', borderRadius: 5 }}>
                        <Text style={{ flex: 0.8, color: '#979797' }}>Cash on Delivery</Text>
                        <FontAwesome name="money" size={22} color="#979797" />
                    </TouchableOpacity>}
            </ScrollView>
            <View style={{ flex: 0.3, justifyContent: 'flex-end', marginVertical: 10 }}>
                <TouchableOpacity
                    style={styles.buyNow}
                    onPress={() => handleProcced()}
                >
                    <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Proceed To Payment</Text>
                </TouchableOpacity>
            </View>


        </View>
    )
}


const styles = StyleSheet.create({

    buyNow: {
        backgroundColor: '#ADD8E6',
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        borderRadius: 8,
        elevation: 4,
        alignSelf: 'center'
    },
    addAdress: {
        paddingVertical: 10,
        marginBottom: 15,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: '90%',
        borderRadius: 1,
        borderStyle: 'dashed',
        borderWidth: 1,
        alignSelf: 'center'
    }

})
