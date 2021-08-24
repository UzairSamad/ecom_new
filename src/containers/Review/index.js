import React, { Component, useState, useContext, useEffect } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native'
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
import axios from 'axios';
import { TextInput } from 'react-native';
import Toast from 'react-native-simple-toast';


export default function Checkout({ navigation, route }) {
    const [selected, setSelected] = useState("")
    const [modalVisible, setModalVisible] = useState(false);
    const [review, setReview] = useState("")
    const appData = useContext(AppContext)
    const { products, user } = appData

    let data = route.params.userOrders
    console.log(products, "DDDDDDDDDDDDDDDDDDDD");

    const [arr, setArr] = useState([])
    useEffect(() => {
        let temp = []
        products.map(res => {
            temp.push(res)
        })
        setArr(temp)
    }, [])

    const reviewProduct = (id) => {
        console.log(id, user.userDetails._id, "THINGSSS");
        if (review != "") {
            axios({
                method: "put",
                url: `https://minisolution-backend.herokuapp.com/api/addReview/${id}`,
                data: {
                    review: "Hello good product",
                    userId: user.userDetails._id
                }
            })
                .then(res => {
                    setModalVisible(false)
                    Toast.showWithGravity("Review Submitted Successfully", Toast.LONG, Toast.BOTTOM)
                    navigation.navigate("Home")
                })
                .catch(err => {
                    console.log(err, "ERRRRRRRRRR");
                    alert("something went wrong")
                })
        }
        else {
            Toast.showWithGravity("Please enter review text", Toast.LONG, Toast.BOTTOM)
        }
    }

    const renderReview = (id, data) => {
        return (
            <View style={{ marginBottom: 10, borderRadius: 10, alignItems: "center", backgroundColor: "#ADD8E6", marginHorizontal: vw * 0.3, paddingVertical: vh * 0.01 }}>
                <TouchableOpacity onPress={() => {
                    // reviewProduct(id)
                    setSelected(data)
                    setModalVisible(true)
                }}>
                    <Text style={{ fontSize: 13, color: "white", fontWeight: 'bold' }}>Review Product</Text>
                </TouchableOpacity>
            </View>
        )
        //     return products.map(response => {
        //         let find = response.review.find(res => res.userid == user.userDetails._id && res.productId == id)
        //         console.log(find, "FINd");
        //         if (find) {
        //             return (
        //                 <View style={{ marginBottom: 10, borderRadius: 10, alignItems: "center", backgroundColor: "#ADD8E6", marginHorizontal: vw * 0.3, paddingVertical: vh * 0.01 }}>
        //                     <TouchableOpacity onPress={() => {
        //                         reviewProduct(id)
        //                     }}>
        //                         <Text style={{ fontSize: 13, color: "white", fontWeight: 'bold' }}>Review Product</Text>
        //                     </TouchableOpacity>
        //                 </View>
        //             )
        //         }
        //         else {
        //             return (
        //                 <View style={{ marginBottom: 10, borderRadius: 10, alignItems: "center", backgroundColor: "#ADD8E6", marginHorizontal: vw * 0.3, paddingVertical: vh * 0.01 }}>
        //                     <TouchableOpacity onPress={() => {
        //                         reviewProduct(id)
        //                     }}>
        //                         <Text style={{ fontSize: 13, color: "white", fontWeight: 'bold' }}>Already Reviewd</Text>
        //                     </TouchableOpacity>
        //                 </View>
        //             )
        //         }
        //     })
    }

    console.log(arr, "ARRRRRRRRRRRF");

    const submitReview = (value) => {
        console.log(value, "VAAAAAAAAAAAAAA");
        let data = {}
        if (value != "") {
            products.map(res => {
                if (res._id == value._id) {
                    data = res
                }
            })
            console.log(data, "DDDDDDDDDDDDDDD");
            const find = data?.review?.find(res => res.userid == user.userDetails._id && res.productId == value._id)
            console.log(find, "FINDDDDDDDDDDDDDDD");
            if (!find) {
                return (
                    <View style={{ marginBottom: 10, borderRadius: 10, alignItems: "center", backgroundColor: "#ADD8E6", paddingHorizontal: 10, marginTop: 20, paddingVertical: vh * 0.01 }}>
                        <TouchableOpacity onPress={() => {
                            reviewProduct(value._id)
                        }}>
                            <Text style={{ fontSize: 13, color: "white", fontWeight: 'bold' }}>Review Product</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
            else {
                return (
                    <View style={{ marginBottom: 10, borderRadius: 10, alignItems: "center", backgroundColor: "#ADD8E6", paddingHorizontal: 10, marginTop: 20, paddingVertical: vh * 0.01 }}>
                        <TouchableOpacity
                        >
                            <Text style={{ fontSize: 13, color: "white", fontWeight: 'bold' }}>Already Reviewed</Text>
                        </TouchableOpacity>
                    </View>
                )
            }
        }
    }
    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            style={{}}>
                            <Entypo name="cross" style={{ marginTop: 10 }} size={30} />
                        </TouchableOpacity>

                        <View style={{ marginTop: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Name : {selected?.name}</Text>
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ fontSize: 16, fontWeight: "bold" }}>Price : {selected?.price}</Text>
                        </View>
                        <View>
                            <TextInput
                                value={review}
                                onChangeText={(text) => setReview(text)}
                                placeholder="Input"
                                style={{ textAlignVertical: "top", width: vw * 0.6, height: vh * 0.2, borderRadius: 10, padding: 10, borderWidth: 1 }} />
                        </View>
                        {submitReview(selected)}
                    </View>

                </View>
            </Modal>

            <View style={{ flex: 1, paddingHorizontal: 15, backgroundColor: '#FEFBEA' }}>
                <BackButton navigation={navigation} />
                <Heading heading="Order Again" />
                <ScrollView style={{ flex: 0.9 }}>
                    {data.order.map(res => {
                        console.log(res, "RESSSSSSSSSSSSSSSSSS");
                        return (
                            <View key={res.name} style={{
                                backgroundColor: "white",
                                marginTop: 10
                            }}
                            >
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{ justifyContent: "center", marginLeft: 10 }}>
                                        <Image
                                            source={{ uri: res?.image }}
                                            style={{ height: 85, width: 80, marginRight: 10 }}
                                            resizeMode="cover"
                                        />
                                    </View>
                                    <View style={{ marginTop: 10 }}>
                                        <Text style={{ fontSize: 16 }}>{res.name}</Text>
                                        <Text style={{ fontSize: 16 }}>${res.price}</Text>
                                    </View>
                                </View>
                                {renderReview(res._id, res)}
                            </View>
                        )
                    })
                    }
                </ScrollView>
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
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        width: vw * 0.8,
        height: vh * 0.5,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }

})
