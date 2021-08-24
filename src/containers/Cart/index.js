import React, { useState, useContext } from "react"
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import AntDesign from "react-native-vector-icons/AntDesign"
import Entypo from "react-native-vector-icons/Entypo"
import { AppContext } from '../../AppContext'
import { vh } from "../../Dimensions"
import { ToastAndroid } from "react-native"
// const data = [

// ]
const Cart = ({ navigation }) => {
    const [data, setData] = useState([])

    const context = useContext(AppContext)
    const { cartData, setCartData, createOrder, user, selecteAdress } = context
    React.useEffect(() => {
        setData(cartData)
    }, [cartData])
    console.log(user, 'useruseruser')
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
        // temp_element.price = parseInt(temp_element.price)+ temp_element.price
        // alert(temp_element.price)
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
    const handleSubmit = (ind) => {
        let totalPrice = 0
        data.map(val => {
            if (val.discount != null || val.discount != 0) {

                totalPrice = totalPrice + (val.discount * val.count)
            } else {
                totalPrice = totalPrice + (val.price * val.count)
            }
        })
        let payload = {
            totalbill: totalPrice,
            order: [...data]
        }
        if (user && cartData.length > 0) {
            navigation.navigate('Address')

        } else if (user == null) {
            navigation.navigate('Login')
        } else {
            ToastAndroid.showWithGravity("Please select products first to procced", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50)
        }

    }
    return (
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
                    marginTop: 20
                }}>
                    <Text style={{
                        color: "#434343",
                        fontSize: 20,
                    }}>Cart</Text>
                </View>
                <ScrollView>
                    {data.length > 0 ? (
                        data?.map((data, index) => {
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
                                                style={{ height: 80, width: 80, marginRight: 8 }}
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
                    ) : (
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", alignSelf: "center", marginTop: vh * 0.3 }}>
                            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Cart Is Empty</Text>
                            <TouchableOpacity onPress={_ => navigation.navigate("Home")} style={{
                                borderRadius: 5,
                                paddingVertical: 10,
                                paddingHorizontal: 20,
                                marginTop: 10,
                                backgroundColor: "#ADD8E6",
                            }}>
                                <Text style={{ textAlign: "center", fontSize: 16, color: "white" }}>Buy Something</Text>
                            </TouchableOpacity>
                        </View>
                    )

                    }
                </ScrollView>
            </View>
            <TouchableOpacity onPress={_ => handleSubmit()} style={{ borderRadius: 5, padding: 10, position: "absolute", bottom: 10, alignSelf: "center", backgroundColor: "#ADD8E6", width: "80%" }}>
                <Text style={{ textAlign: "center", fontSize: 16, color: "white" }}>Continue</Text>
            </TouchableOpacity>
        </View >
    )
}

export default Cart