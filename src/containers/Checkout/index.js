import React, { Component, useState, useContext, useCallback } from 'react'
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
import axios from 'axios';

import {
    create_order
} from '../../WebApiServices/WebServices';
import stripe from "tipsi-stripe"

import { VirtualizedList } from 'react-native';
stripe.setOptions({
    publishableKey: 'pk_live_51J0F9xC2n4McSYxwNoZQm1RheEoWuUvUzSyX0oZ3byYVJ0uc0wppZqIejUxkHgBbYjWSVABZgKZI9UYOnidTa09o00VpwSkBbs'
})
export default function Checkout({ navigation, route }) {
    console.log(route, 'routeroute')
    const context = useContext(AppContext)
    const [totalPrice, setTotalPrice] = useState('')
    const [isLoading, setIsloading] = useState(false)
    const { cartData, setCartData, user, selecteAdress, userToken, selectedUserCard, paymentType } = context

    const [checked, setChecked] = React.useState('first');

    const [data, setData] = useState([{}])

    React.useEffect(() => {
        setData(cartData)
        // _retrieveData()
        // _retrieveData()

    }, [cartData])
    React.useEffect(() => {
        // _retrieveData()
        _retrieveData()

    }, [])
    console.log(data, 'in checkouttt')
    React.useEffect(() => {
        // alert(JSON.stringify(user.token))
        let totalPrice = 0
        console
        cartData.map(val => {
            if (val.afterPrice) {
                totalPrice = totalPrice + (val.afterPrice * val.count)
            }
            else {
                totalPrice = totalPrice + (val.price * val.count)
            }
        })
        setTotalPrice(totalPrice)
        console.log(totalPrice, 'totalPricetotalPrice')

    }, [cartData])

    const _retrieveData = async () => {
        // alert('caledd')
        try {
            const userToken = await AsyncStorage.getItem('token');
            console.log(JSON.parse(userToken), 'valueeeee in drawer*************');
            if (value !== null) {
                // We have data!!
                // alert(value)
                console.log(JSON.parse(value), 'valueeeee in drawer');
                // setUsertoken(userToken)
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
            setCartData([...OriginalState])

        }
    }

    const IncreaseCount = (index) => {
        let temp_state = [...data];
        let temp_element = { ...temp_state[index] }
        console.log(temp_element, "TEMPPPPPPPPPPPP");
        temp_element.count = temp_element.count + 1
        temp_state[index] = temp_element
        setData([...temp_state])
        setCartData(temp_state)

    }
    const handleDeleteItem = (ind) => {
        let tempArr = [...data]
        tempArr.splice(ind, 1)
        setData(tempArr)
        setCartData(tempArr)
    }
    const handleSubmit = async (ind) => {
        setIsloading(true)
        let totalPrice = 0
        data.map(val => {
            if (val.afterPrice) {
                totalPrice = totalPrice + (val.afterPrice * val.count)
            }
            else {
                totalPrice = totalPrice + (val.price * val.count)
            }
        })
        if (paymentType == 'CreditCard') {
            let month = selectedUserCard.expDate.split('/')[0]
            let year = selectedUserCard.expDate.split('/')[1]
            if (user) {
                try {
                    const token = await stripe.createTokenWithCard({
                        number: selectedUserCard.number,
                        expMonth: parseInt(month),
                        expYear: parseInt(year)
                    })
                    if (token) {
                        let params = {
                            totalBill: totalPrice,
                            order: [...data],
                            status: 'Pending',
                            Date: new Date(Date.now()),
                            address: selecteAdress,
                            paymentType: "Credit Card",
                            data: { "token": token.tokenId },
                            number: selectedUserCard.number,
                            expMonth: parseInt(month),
                            expYear: parseInt(year),
                        }
                        axios.post("https://minisolution-backend.herokuapp.com/api/payment", {
                            ...params
                        }, { headers: { "token": user.token } })
                            .then(res => {
                                setIsloading(true)
                                navigation.navigate('Confirmation')
                                setCartData([])
                            })
                            .catch(err => {
                                alert('Something went wrong')
                                setIsloading(false)
                            })
                    }

                } catch (error) {
                    alert(error)
                    setIsloading(false)
                }
            } else {
                navigation.navigate('Login')
            }
        } else {
            let payload = {
                totalBill: totalPrice,
                order: [...data],
                status: 'Pending',
                Date: new Date(Date.now()),
                address: selecteAdress,
                paymentType: "COD"
            }
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
        // setTotalPrice(totalPrice)

    }



    return (
        <>
            <SpinnerLoader isLoading={isLoading} />
            <View style={{ flex: 1, paddingHorizontal: 15, backgroundColor: '#FEFBEA' }}>
                <BackButton navigation={navigation} />
                <Heading heading="Checkout" />
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
                                    <View style={{ justifyContent: "center", marginLeft: 10 }}>
                                        <Image
                                            source={{ uri: data?.image }}
                                            style={{ height: 85, width: 80, marginRight: 10 }}
                                            resizeMode="cover"
                                        />
                                    </View>
                                    <View style={{ marginTop: 10 }}>
                                        <Text style={{ fontSize: 16 }}>{data.name}</Text>
                                        {data.afterPrice ?
                                            (<>
                                                <Text style={{ fontSize: 10 }}>{`Promotion Item`}</Text>
                                                <Text style={{ color: "#374ABE", fontSize: 16 }}>{`$${data.afterPrice}`}</Text>
                                            </>)
                                            :
                                            <>
                                                <Text style={{ fontSize: 16 }}>{data.subname}</Text>
                                                <Text style={{ color: "#374ABE", fontSize: 16 }}>{`$${data.price * data.count}`}</Text>
                                            </>
                                        }
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
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: vh * 0.04 }}>
                            <Text style={{ flex: 0.8, fontSize: 16 }}>{selecteAdress}</Text>
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
                <View style={{ paddingVertical: 15 }}>
                    <TouchableOpacity style={styles.buyNow} onPress={() => handleSubmit()}>
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Buy</Text>
                    </TouchableOpacity>
                </View>


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
