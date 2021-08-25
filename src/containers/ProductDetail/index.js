import React, { Component, useContext } from 'react'
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import { Header } from '../../components/index'
import Ionicons from "react-native-vector-icons/Ionicons"
import { vw, vh } from '../../Dimensions'
import { AppContext } from '../../AppContext'
import Toast from 'react-native-simple-toast';

export default function ProductDetail({ navigation, route }) {
    console.log(route.params, "PARAMAAAAAAAAAAAAA");
    const { data, name } = route.params
    console.log(data, "PARAMAAAAAAAAAAAAA");
    const context = useContext(AppContext)
    const { setCartData, cartData } = context

    const handleBuy = (item) => {
        Toast.showWithGravity('Added To Cart Successfully', Toast.LONG, Toast.BOTTOM);
        let data = [...cartData]
        data.push({ ...item, count: 1 })
        setCartData(data)
        navigation.goBack()
    }
    return (
        <View style={styles.container}>
            <View>
                <View style={{
                    paddingVertical: vh * 0.04,
                    paddingHorizontal: vw * 0.04
                }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ marginTop: 5 }}>
                        <Ionicons name="arrow-back" size={30} color="#C5CCD6" />
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={_ => alert('search')} >
                        <Ionicons name="search" size={24} color="#404040" />
                    </TouchableOpacity> */}
                </View>
                <View>
                    <Image source={{ uri: data?.image }}
                        style={{ height: 155, width: 155, alignSelf: 'center' }} />
                    <Text style={styles.productName}>{data?.name}</Text>
                    <View style={{ paddingHorizontal: 15, alignSelf: 'flex-start', marginBottom: 10 }}>
                        <Text style={styles.productPrice}>{`$${data?.price}`}
                            {/* <Text style={{ color: 'black', fontSize: 16, textDecorationLine: 'line-through' }}>$52</Text> */}
                        </Text>
                    </View>
                </View>
            </View>

            <ScrollView style={{ paddingHorizontal: 15 }}>
                <Text style={{ fontSize: 20, marginVertical: 15, fontWeight: 'bold' }}>Description</Text>
                <View>
                    <Text style={{ fontSize: 16, }}>
                        {data.description}
                    </Text>
                </View>
                <View>

                    <Text style={{ fontSize: 20, marginVertical: 15, fontWeight: 'bold' }}>Reviews {data?.review?.length} </Text>
                    {data?.review?.map((res, index) => {
                        return (
                            <View>
                                <Text style={{ fontSize: 16 }}>
                                    {index + 1})  {res.review}
                                </Text>
                            </View>
                        )
                    })

                    }
                </View>
            </ScrollView>

            <View style={{ justifyContent: "flex-end", marginVertical: 10 }}>
                <TouchableOpacity style={styles.buyNow} onPress={_ => handleBuy(data)}>
                    <Text style={{ color: 'white', textAlign: "center", fontSize: 18, fontWeight: 'bold' }}>BUY NOW</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FEFBEA"
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
        marginBottom: 8,
        marginTop: 10
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
        paddingVertical: 10,
    }

})
