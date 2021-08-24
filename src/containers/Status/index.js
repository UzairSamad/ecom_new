import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import { BackButton, Heading } from '../../components/index'
import Ionicons from "react-native-vector-icons/Ionicons"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { vw, vh } from '../../Dimensions'


export default function Status({ navigation }) {

    return (
        <ScrollView style={styles.container}>
            <View style={{paddingHorizontal:10}}> 
                <BackButton navigation={navigation} />
                <Heading heading="Status" />
            </View>
            <View style={styles.imageContainer}>
                <Image source={require("../../assets/images/harilong.jpeg")} style={{ height: 155, width: 155, alignSelf: 'center' }} />
                <Text style={styles.productName}>Long Wig 1</Text>
                <View style={{ paddingHorizontal: 15, alignSelf: 'flex-start', marginBottom: 10 }}>
                    <Text style={styles.productPrice}>$42   <Text style={{ color: 'black', fontSize: 16, textDecorationLine: 'line-through' }}>$52</Text></Text>
                </View>
            </View>
            <View>
                <View style={styles.ratingContainer}>
                    <View style={styles.ratingButtonContainer}>
                        <View style={styles.ratingButtonView}>
                            <Text style={{ color: 'white' }} >4.5</Text>
                        </View>
                        <Text style={{ fontSize: 18 }}>Very Good</Text>
                    </View>
                    <Text style={{ fontSize: 18, color: '#ADD8E6', fontWeight: 'bold' }}>49 Reviews</Text>
                </View>
                <ScrollView style={{ paddingHorizontal: 15,marginBottom:10 }}>
                    <Text style={{ fontSize: 18, marginVertical: 15 }}>Description</Text>
                    <View >
                        <Text style={{ fontSize: 16, lineHeight: 22 }}>
                            A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot, which was created for the bliss of souls like mine
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 8 }} >
                        <Text style={{ fontSize: 16, lineHeight: 22 }}>
                            Order Accepted
                       </Text>
                        <FontAwesome5 name="check-circle" size={24} color="green" />
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 10 }} >
                        <Text style={{ fontSize: 16, lineHeight: 22 }}>
                            Pending
                       </Text>
                        <FontAwesome5 name="check-circle" size={24} color="green" />
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 10 }} >
                        <Text style={{ fontSize: 16, lineHeight: 22 }}>
                            Completed
                       </Text>
                        <MaterialIcons name="cancel" size={30} color="red" />
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 10 }} >
                        <Text style={{ fontSize: 16, lineHeight: 22 }}>
                            Rejected
                       </Text>
                        <MaterialIcons name="cancel" size={30} color="red" />
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
    },
    bodyContainer: {
        flex: 0.6,

    },
    productName: {
        fontSize: 22,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        paddingHorizontal: vw * 0.04,
        marginBottom: 8
    },
    productPrice: {
        color: '#667EEA',
        fontSize: 18,
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
