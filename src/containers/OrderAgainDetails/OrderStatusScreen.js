import React, { Component, useState, useContext, useEffect } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { RadioButton } from 'react-native-paper';
import { vh, vw } from '../../Dimensions'
import { ScrollView } from 'react-native-gesture-handler';
import Ionicons from "react-native-vector-icons/Ionicons"
import AntDesign from "react-native-vector-icons/AntDesign"
import Entypo from "react-native-vector-icons/Entypo"
import { BackButton, Heading, SpinnerLoader } from '../../components';
import { AppContext } from '../../AppContext'
import { createResource, } from '../../WebApiServices/SimpleApiCalls';
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"

import {
    create_order
} from '../../WebApiServices/WebServices';
export default function Checkout({ navigation, route }) {
    const context = useContext(AppContext)
    const { userOrders } = route.params
    const [totalPrice, setTotalPrice] = useState('')
    const [userToken, setUsertoken] = useState(null)
    const [isLoading, setIsloading] = useState(false)
    const [orderStatus, setOrderStatus] = useState('')
    const [orderAddress, setOrderAddress] = useState('false')
    const { getUserOrders, user, selecteAdress } = context

    useEffect(() => {
        getUserOrders()
    }, [])

    const [checked, setChecked] = React.useState('first');

    const [data, setData] = useState([
        {
            name: "Small Wig 1",
            price: "34.00",
            subname: "Lotto.LTD",
            img: require("../../assets/images/wig1.jpeg"),
            count: 1
        },
        {
            name: "Small Wig 2",
            price: "34.00",
            subname: "Lotto.LTD",
            img: require("../../assets/images/wig2.jpeg"),
            count: 1
        },

    ])

    React.useEffect(() => {
        setData(userOrders.order)
        setOrderAddress(userOrders.address)
        setOrderStatus(userOrders.status)
        // _retrieveData()
    }, [userOrders])
    React.useEffect(() => {
        // alert(JSON.stringify(user.token))

        _retrieveData()
    }, [])

    React.useEffect(() => {
        // alert(JSON.stringify(user.token))
        let totalPrice = 0
        data.map(val => {
            if (val.afterPrice) {
                totalPrice = totalPrice + (val.afterPrice * val.count)
            }
            else {
                totalPrice = totalPrice + (val.price * val.count)
            }
        })
        setTotalPrice(totalPrice)

    }, [userOrders, data])

    const _retrieveData = async () => {
        // alert('caledd')
        try {
            const userToken = await AsyncStorage.getItem('token');
            // alert('caleddd....')
            if (value !== null) {
                // We have data!!
                // alert(value)
                console.log(JSON.parse(value), 'valueeeee in drawer');
                setUsertoken(userToken)
            }
        } catch (error) {
            // Error retrieving data
        }
    };

    const DecreaseCount = (index) => {
        let OriginalState = [...data];
        let temp_Item = { ...OriginalState[index] }
        if (temp_Item.count == 1) {
            alert("cannot go less than zero")
        }
        else {
            temp_Item.count = temp_Item.count - 1
            OriginalState[index] = temp_Item
            setData([...OriginalState])
            // setCartData([...OriginalState])

        }
    }

    const IncreaseCount = (index) => {
        let temp_state = [...data];
        let temp_element = { ...temp_state[index] }
        console.log(temp_element, "TEMPPPPPPPPPPPP");
        temp_element.count = temp_element.count + 1
        temp_state[index] = temp_element
        setData([...temp_state])
        // setCartData(temp_state)

    }
    const handleDeleteItem = (ind) => {
        let tempArr = [...data]
        tempArr.splice(ind, 1)
        setData(tempArr)
        // setCartData(tempArr)
    }
    const handleSubmit = async (ind) => {
        console.log(user, 'useruser')
        let totalPrice = 0
        data.map(val => {
            if (val.afterPrice) {
                totalPrice = totalPrice + (val.afterPrice * val.count)
            }
            else {
                totalPrice = totalPrice + (val.price * val.count)
            }
        })
        // setTotalPrice(totalPrice)
        let payload = {
            totalBill: totalPrice,
            order: [...data],
            status: 'Pending',
            Date: new Date(Date.now()),
            address: selecteAdress,
            paymentType: "COD"
        }
        // setTotalPrice(totalPrice)

        if (user) {
            try {
                let res = await createResource(create_order, payload, user.token);
                // alert(res,'ressssssss')
                setIsloading(true)
                navigation.navigate('Confirmation')
                setCartData([])
            } catch (error) {
                setIsloading(false)
                console.log(error)
            }
        } else {
            navigation.navigate('Login')
        }
    }
    console.log(data, orderStatus, orderAddress, 'dataaaa')

    return (
        <>
            <SpinnerLoader isloading={isLoading} />
            <View style={{ flex: 1, paddingHorizontal: 15, backgroundColor: '#FEFBEA' }}>
                <BackButton navigation={navigation} />
                <Heading heading="Order Status" />
                <ScrollView style={{ flex: 0.9 }}>
                    {data?.map((data, index) => {
                        return (
                            <View key={data.name} style={{
                                height: 130,
                                backgroundColor: "white",
                                marginTop: 10
                            }}
                            >
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ justifyContent: "center", marginLeft: 10, marginTop: 20 }}>
                                        <Image
                                            source={{ uri: data?.image }}
                                            style={{ height: 85, width: 80, marginRight: 10 }}
                                            resizeMode="cover"
                                        />
                                    </View>
                                    <View style={{ marginTop: 25 }}>
                                        <Text style={{ fontSize: 16 }}>{data.name}</Text>
                                        <Text style={{ color: "#374ABE", fontSize: 16 }}>{`Price: $${data.price}`}</Text>
                                        <Text style={{ color: "#374ABE", fontSize: 16 }}>{`Quantity: ${data.count}`}</Text>

                                    </View>
                                    {/* <TouchableOpacity onPress={_ => handleDeleteItem(index)} style={{ alignItems: "flex-end", flex: 1, marginRight: 5, marginTop: 2 }}>
                                        <Entypo name="cross" size={24} color="#979797" />
                                    </TouchableOpacity> */}

                                </View>
                            </View>
                        )
                    })
                    }
                    <View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: vh * 0.04, paddingTop: 5 }}>
                            <Text style={{ flex: 0.8, fontSize: 16 }}>{orderAddress}</Text>
                            <RadioButton
                                style={{ flex: 0.8 }}
                                value='first'
                                status={checked === 'first' ? 'checked' : 'unchecked'}
                                onPress={() => setChecked('first')}
                            />

                        </View>

                        <View style={{ flexDirection: 'row', paddingVertical: 5, justifyContent: 'space-between', borderColor: "#00000029", borderTopWidth: 1, }}>
                            <Text style={{ color: "#919191" }}>Subtotal</Text>
                            <Text>{`$${totalPrice}`}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', paddingTop: 5, paddingBottom: 10, justifyContent: 'space-between' }}>
                            <Text style={{ color: "#919191" }} >Shipping</Text>
                            <Text>$10.00</Text>
                        </View>
                        <View style={{ borderColor: "#00000029", borderBottomWidth: 1, paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text  >Total</Text>
                            <Text>{`$${totalPrice + 10}`}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 20 }} >
                        <Text style={{ fontSize: 16, lineHeight: 22 }}>
                            Pending
                       </Text>
                        {
                            orderStatus == 'Pending' ?
                                <FontAwesome5 name="check-circle" size={24} color="green" />
                                :
                                <MaterialIcons name="cancel" size={30} color="red" />
                        }
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 8 }} >
                        <Text style={{ fontSize: 16, lineHeight: 22 }}>
                            Accepted
                       </Text>
                        {
                            orderStatus == 'Accepted' ?
                                <FontAwesome5 name="check-circle" size={24} color="green" />
                                :
                                <MaterialIcons name="cancel" size={30} color="red" />
                        }
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 10 }} >
                        <Text style={{ fontSize: 16, lineHeight: 22 }}>
                            Delivered
                       </Text>
                        {
                            orderStatus == 'Delivered' ?
                                <FontAwesome5 name="check-circle" size={24} color="green" />
                                :
                                <MaterialIcons name="cancel" size={30} color="red" />
                        }
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 10 }} >
                        <Text style={{ fontSize: 16, lineHeight: 22 }}>
                            Rejected
                       </Text>
                        {
                            orderStatus == 'Rejected' ?
                                <FontAwesome5 name="check-circle" size={24} color="green" />
                                :
                                <MaterialIcons name="cancel" size={30} color="red" />
                        }
                    </View>
                </ScrollView>
                {orderStatus == 'Delivered' ? <View style={{ paddingVertical: 15 }}>
                    <TouchableOpacity style={styles.buyNow} onPress={() => handleSubmit()}>
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Order Again</Text>
                    </TouchableOpacity>
                </View> : null}


            </View>
        </>
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
