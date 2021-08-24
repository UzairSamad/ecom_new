import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import { BackButton, Heading } from '../../components/index'
import Ionicons from "react-native-vector-icons/Ionicons"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { vw, vh } from '../../Dimensions'


export default function NotificationDetail({ navigation }) {

    return (
        <ScrollView style={styles.container}>
            <View style={{ paddingHorizontal: 10 }}>
                <BackButton navigation={navigation} />
                <Heading heading="Notification" />
            </View>
            <View style={styles.imageContainer}>
                <Image source={require("../../assets/images/harilong.jpeg")} style={{ height: 190, width: 160, alignSelf: 'center', marginVertical: 10 }} />
                <Text style={styles.productName}>Long Wig 1</Text>
                <View style={{ paddingHorizontal: 15, alignSelf: 'flex-start', marginBottom: 10 }}>
                    <Text style={styles.productPrice}>$42.00</Text>
                    <Text style={{ marginTop: 10, fontSize: 18, color: '#434343' }}>Order<Text style={{ color: '#667EEA' }}>  #1982984</Text> </Text>
                </View>
            </View>
            <View>
                <ScrollView style={{ paddingHorizontal: 15 }}>
                    <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 15 }} >
                        <Text style={{ fontSize: 16 ,fontWeight:'bold'}}>
                            Order is placed
                       </Text>
                        <FontAwesome5 name="check-circle" size={24} color="green" />
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 15 }} >
                        <Text style={{ fontSize: 16  ,fontWeight:'bold'}}>
                            Order is ready
                       </Text>
                        <FontAwesome5 name="check-circle" size={24} color="green" />
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 15 }} >
                        <Text style={{ fontSize: 16  ,fontWeight:'bold'}}>
                            Order is on way
                       </Text>
                       <FontAwesome5 name="check-circle" size={24} color="green" />
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: 'space-between', marginVertical: 15 }} >
                        <Text style={{ fontSize: 16 ,fontWeight:'bold' }}>
                            Order delivered
                                </Text>
                        <MaterialIcons name="cancel" size={28} color="red" />
                    </View>
                </ScrollView>
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FEFBEA",
        
    },
    imageContainer: {
        // flex: 0.5,
        marginTop: 15
    },
    bodyContainer: {
        flex: 0.6,

    },
    productName: {
        fontSize: 22,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        paddingHorizontal: vw * 0.04,
        marginBottom: 8,
        marginTop: 15
    },
    productPrice: {
        color: '#667EEA',
        fontSize: 18,
        marginTop: 8
    },
    ratingContainer: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#707070',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: vw * 0.04
    },
    ratingButtonView: {
        backgroundColor: '#ADD8E6', height: 35,
        width: 65,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8
    },
    ratingButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 8,
        flex: 0.7
    },
    buyNow: {
        backgroundColor: '#ADD8E6',
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
    }

})
