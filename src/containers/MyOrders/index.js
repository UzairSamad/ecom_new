import React, { useState, useContext, useEffect } from "react"
import { View, Text, TouchableOpacity, ScrollView, Image, ToastAndroid } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import AntDesign from "react-native-vector-icons/AntDesign"
import Entypo from "react-native-vector-icons/Entypo"
import { Heading } from "../../components"
import { SpinnerLoader } from '../../components'
import { AppContext } from '../../AppContext'

// const data = [

// ]
const MyOrders = ({ navigation }) => {
    const appData = useContext(AppContext)
    const { getUserOrders, userOrders, isLoading, _retrieveData, user } = appData

    // useEffect(() => {
    //     _retrieveData()
    //     // getUserOrders()
    // }, [])

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            if (user !== null) {
                getUserOrders()
            }
            else {
                // alert("ele")
                ToastAndroid.showWithGravity("Please Login First ", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50)
            }
        })
        return unsubscribe;

    }, [])
    useEffect(() => {
        // _retrieveData()
        getUserOrders()
    }, [])

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
        {
            name: "Long Wig 1",
            price: "34.00",
            subname: "Lotto.LTD",
            img: require("../../assets/images/smalldark.jpeg"),
            count: 1
        },

    ])
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
        }
    }

    const IncreaseCount = (index) => {
        let temp_state = [...data];
        let temp_element = { ...temp_state[index] }
        console.log(temp_element, "TEMPPPPPPPPPPPP");
        temp_element.count = temp_element.count + 1
        temp_state[index] = temp_element
        setData([...temp_state])
    }

    return (
        <>
            <SpinnerLoader isLoading={isLoading} />

            <View style={{
                backgroundColor: "#FEFBEA",
                flex: 1
            }}>
                <View style={{ marginHorizontal: 15 }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ marginTop: 20 }}>
                        <Ionicons name="arrow-back" size={30} color="#C5CCD6" />
                    </TouchableOpacity>
                    <View style={{
                        marginTop: 10
                    }}>
                        <Heading heading="My Orders" />
                    </View>
                    <ScrollView style={{ marginTop: 10 }}>
                        {userOrders?.map((data, index) => {
                            return (
                                <View key={data.name} style={{
                                    // height: 130,
                                    backgroundColor: "white",
                                    marginTop: 10
                                }}
                                >
                                    <View style={{ flexDirection: "row" }}>
                                        {/* <View style={{ justifyContent: "center", height: 130, marginLeft: 20 }}>
                                            <TouchableOpacity>
                                                <Image source={
                                                    data.img
                                                }
                                                    style={{ height: 80, width: 80 }}
                                                    resizeMode="contain"
                                                />
                                            </TouchableOpacity>
                                        </View> */}
                                        <View style={{ marginTop: 20, marginLeft: 20 }}>
                                            {/* <Text style={{ fontSize: 16 }}>{data.name}</Text> */}
                                            <Text style={{ color: "#374ABE", fontSize: 12 }}>{`Price: $${data.totalBill}`}</Text>
                                            <Text style={{ color: "#374ABE", fontSize: 12 }}>{`Date:${new Date(data.Date).getDate()}/${new Date(data.Date).getMonth()}/${new Date(data.Date).getFullYear()}`}</Text>
                                            <Text style={{ fontSize: 12, color: "#374ABE", }}>{`Status: ${data.status}`}</Text>
                                            <View style={{ flexDirection: 'row' }}>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        if (data.status == 'Delivered') {
                                                            navigation.navigate("OrdersDetails", { userOrders: data })
                                                        } else {
                                                            navigation.navigate("OrderStatus", { userOrders: data })
                                                        }
                                                    }}
                                                    style={{ marginTop: 10, backgroundColor: "#ADD8E6", width: 100, paddingVertical: 10, borderRadius: 5 }}>
                                                    <Text style={{ textAlign: "center", color: "white", fontSize: 16 }}>View Order</Text>
                                                </TouchableOpacity>
                                                {data.status == "Delivered" ?
                                                    <TouchableOpacity
                                                        onPress={() => navigation.navigate("Review", { userOrders: data })}
                                                        style={{ marginLeft: 20, marginTop: 10, backgroundColor: "#ADD8E6", width: 130, paddingVertical: 10, borderRadius: 5 }}>
                                                        <Text style={{ textAlign: "center", color: "white", fontSize: 16 }}>Give Review</Text>
                                                    </TouchableOpacity>
                                                    :
                                                    null
                                                }
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )
                        })

                        }
                    </ScrollView>
                </View>

            </View>
        </>

    )
}

export default MyOrders