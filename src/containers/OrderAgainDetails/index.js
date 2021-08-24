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
import {
    create_order
} from '../../WebApiServices/WebServices';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"

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

    const [data, setData] = useState([])

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
                <Heading heading="Order Again" />
                <ScrollView style={{ flex: 0.9 }}>
                    <View style={{ flexDirection: "row", justifyContent: 'space-between', marginTop: 15, marginBottom: 10 }} >
                        <Text style={{ fontSize: 22, lineHeight: 22, }}>
                            Delivered
                       </Text>

                        <FontAwesome5 name="check-circle" size={28} style={{ marginTop: -5 }} color="green" />

                    </View>
                    {data?.map((data, index) => {
                        return (
                            <View key={data.name} style={{
                                height: 130,
                                backgroundColor: "white",
                                marginTop: 10
                            }}
                            >
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ justifyContent: "center", marginLeft: 10 }}>
                                        <Image
                                            source={{ uri: data?.image }}
                                            style={{ height: 85, width: 80, marginRight: 10 }}
                                            resizeMode="cover"
                                        />
                                    </View>
                                    <View style={{ marginTop: 10 }}>
                                        <Text style={{ fontSize: 16 }}>{data.name}</Text>
                                        <Text style={{ fontSize: 16 }}>{data.subname}</Text>
                                        <Text style={{ color: "#374ABE", fontSize: 16 }}>{`$${data.price * data.count}`}</Text>
                                        <View style={{ marginTop: 2, justifyContent: "space-around", width: 150, height: 40, backgroundColor: "#F6F6F6", flexDirection: "row", alignItems: "center" }}>
                                            <TouchableOpacity onPress={() => { DecreaseCount(index) }}

                                            >
                                                <AntDesign name="minus" size={18} color="#565656" />
                                            </TouchableOpacity>

                                            <Text>{data.count}</Text>

                                            <TouchableOpacity onPress={() => { IncreaseCount(index) }}
                                            >
                                                <AntDesign name="plus" size={18} color="#565656" />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    <TouchableOpacity onPress={_ => handleDeleteItem(index)} style={{ alignItems: "flex-end", flex: 1, marginRight: 5, marginTop: 2 }}>
                                        <Entypo name="cross" size={24} color="#979797" />
                                    </TouchableOpacity>

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
                        {/* <View style={{ flexDirection: 'row', paddingVertical: 5, justifyContent: 'space-between' }}>
                            <Text style={{ color: "#919191" }}>Discount</Text>
                            <Text>5%</Text>
                        </View> */}
                        <View style={{ flexDirection: 'row', paddingTop: 5, paddingBottom: 10, justifyContent: 'space-between' }}>
                            <Text style={{ color: "#919191" }} >Shipping</Text>
                            <Text>$10.00</Text>
                        </View>
                        <View style={{ borderColor: "#00000029", borderTopWidth: 1, paddingVertical: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text >Total</Text>
                            <Text>{`$${totalPrice + 10}`}</Text>
                        </View>
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
