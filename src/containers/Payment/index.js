import React, { Component, useState } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { vw, vh } from '../../Dimensions'
import Ionicons from "react-native-vector-icons/Ionicons"
import { BackButton, Heading } from '../../components'


export default function Payment({ navigation }) {

    const renderCArd = () => {
        return (
            <View style={{ backgroundColor: '#004ea4', height: vh * 0.25, marginRight: 10, borderRadius: 10 }}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 22, alignSelf: 'flex-end', paddingHorizontal: 15 }} >VISA</Text>
                <View style={{
                    position: "absolute",
                    paddingHorizontal: 28,
                    paddingVertical: 25,
                    backgroundColor: '#e0b531',
                    marginTop: vh * 0.06,
                    borderRadius: 10,
                    marginHorizontal: vw * 0.08
                }}>
                </View>
                <View style={{ position: "absolute", marginTop: vh * 0.13, marginHorizontal: vw * 0.08 }}>
                    <Text style={{ color: 'white', fontSize: 22 }}>1000 2345 6000 7890</Text>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Text style={{ color: 'white', fontSize: 8, marginRight: 10 }}>From Date</Text>
                            <Text style={{ color: 'white', fontSize: 8 }}>TO Date</Text>
                        </View>
                        <Text style={{ color: 'white', fontSize: 14 }}>00/00-00/00</Text>
                    </View>
                    <Text style={{ color: 'white', fontSize: 18 }}>Lorem Ipsum</Text>
                </View>

            </View>



        )
    }


    return (
        <View style={styles.container}>
            <View style={{ marginHorizontal: 15, marginVertical:8  }}>
                <BackButton navigation={navigation} />
                <Heading heading="Payment" />
            </View>
            <View style={{marginBottom:35}}>
                {renderCArd()}
            </View>

            <View>
                <View style={{ flexDirection: 'row', paddingVertical: 5, justifyContent: 'space-between', borderColor: "#00000029", borderTopWidth: 1, }}>
                    <Text style={{ color: "#919191" }}>Subtotal</Text>
                    <Text>$160.00</Text>
                </View>
                <View style={{ flexDirection: 'row', paddingVertical: 5, justifyContent: 'space-between' }}>
                    <Text style={{ color: "#919191" }}>Discount</Text>
                    <Text>5%</Text>
                </View>
                <View style={{ flexDirection: 'row', paddingTop: 5, paddingBottom: 10, justifyContent: 'space-between' }}>
                    <Text style={{ color: "#919191" }} >Shipping</Text>
                    <Text>$10.00</Text>
                </View>
                <View style={{ borderColor: "#00000029", borderTopWidth: 1, paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text >Total</Text>
                    <Text>$162.00</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.addCard}>
                <Text style={{ color: '#667EEA', fontSize: 18, fontWeight: 'bold' }} onPress={navigation.navigate('AddCreditCard')} >Add Card</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buyNow} onPress={navigation.navigate('Checkout')}>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Checkout</Text>
            </TouchableOpacity>
        </View>
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
        marginTop: vh * 0.02,
        width: '90%',
        borderRadius: 8,
        elevation: 4,
        alignSelf: 'center',
        marginBottom: 20,
    },
    addCard: {
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: vh * 0.06,
        width: '90%',
        borderRadius: 1,
        alignSelf: 'center',
        borderWidth: 1,
        borderStyle: 'dashed'
    }

})

