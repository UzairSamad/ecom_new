import React, { useEffect, useContext } from "react"
import { View, Text, TextInput, ScrollView, Image, TouchableOpacity, FlatList } from "react-native"
import {
    Header
} from "../../components"
import EvilIcons from "react-native-vector-icons/EvilIcons"
import { AppContext } from '../../AppContext'
import { SpinnerLoader } from '../../components'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Modal from 'react-native-modal';
import { vh } from "../../Dimensions"
import Toast from 'react-native-simple-toast';
const Featured = [
    {
        name: "Small Wig 1",
        price: "55.00",
        image: require("../../assets/images/wig1.jpeg")
    },
    {
        name: "Small Wig 2",
        price: "55.00",
        image: require("../../assets/images/wig2.jpeg")
    },
    {
        name: "Small Wig 3",
        price: "55.00",
        image: require("../../assets/images/wig3.jpeg")
    },
    {
        name: "Small Wig 4",
        price: "55.00",
        image: require("../../assets/images/wig3.jpeg")
    },
]

const BestSell1 = [
    {
        name: "Small Wig 1",
        price: "55.00",
        image: require("../../assets/images/wig1.jpeg")
    },
    {
        name: "Small Wig 2",
        price: "55.00",
        image: require("../../assets/images/wig2.jpeg")
    },
    {
        name: "Small Wig 3",
        price: "55.00",
        image: require("../../assets/images/wig3.jpeg")
    },
    {
        name: "Small Wig 4",
        price: "55.00",
        image: require("../../assets/images/wig3.jpeg")
    },
]



const Home = ({ navigation }) => {
    const appData = useContext(AppContext)
    const { getProduct, products, isLoading, cartData } = appData
    const [isAddedCArt, setIsAddedCart] = React.useState([])
    const [isVisible, setIsVisible] = React.useState(false)
    useEffect(() => {
        getProduct()
        // let appUser = AsyncStorage.getItem('user')
        // console.log(JSON.parse(appUser),'appUserappUser');
        _retrieveData()
        let arr = []
        cartData.map(val => {
            console.log(val, 'vallll')
            // arr.push(val._id)
        })

    }, [])
    useEffect(() => {
        let arr = [...cartData]
        cartData.map(val => {
            arr.push(val._id)
        })
        setIsAddedCart(arr)
    }, [cartData])

    _retrieveData = async () => {
        try {
            const value = await AsyncStorage.getItem('user');
            if (value !== null) {
                // We have data!!
                console.log(JSON.parse(value), 'valueeeee');
            }
        } catch (error) {
            // Error retrieving data
        }
    };

    const renderproducts = ({ item }) => {
        console.log(item, "itemitemitem");
        return (
            <View style={{ flex: 1, padding: 8, alignSelf: 'center' }}>
                <TouchableOpacity
                    onPress={() => {
                        let inc = isAddedCArt.includes(item._id)
                        if (inc) {
                            // alert('Already Booked')
                            Toast.showWithGravity("Product Already added to Cart", Toast.LONG, Toast.BOTTOM)
                            // setIsVisible(true)
                        } else {
                            navigation.navigate("ProductDetail", {
                                data: item
                            })
                        }

                    }}
                    style={{
                        backgroundColor: 'white',
                        elevation: 4,
                        width: "90%",
                        height: 160,
                        borderRadius: 5
                    }}
                >
                    {/* {renderNew(item)} */}
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        flex: 1
                    }}>
                        <Image
                            source={{ uri: item.image }}
                            style={{ height: 100, width: 80 }}
                        />
                    </View>

                </TouchableOpacity>
                <Text style={{ marginLeft: 5 }}>{item.name}</Text>
                <View style={{ flexDirection: 'row', marginTop: 2, marginLeft: 5 }}>
                    <Text style={{ marginRight: 2 }} >{`$${item.price}`}</Text>
                </View>
            </View>
        )
    }


    return (
        <View style={{
            backgroundColor: "#FEFBEA",
            flex: 1
        }}>
            <View>
                <Header navigation={navigation} filter="true" />
            </View>
            <View style={{
                marginTop: 20,
                flexDirection: "row",
                marginHorizontal: 20,
                backgroundColor: "white",
                height: 50,
                alignItems: "center",
                elevation: 5,
                borderRadius: 10
            }}>
                {/* <Modal isVisible={isVisible}>
                    <View style={{ backgroundColor: "white", height: vh * 0.3 }}>
                        <View style={{ alignItems: "center", flex: 1, height: vh * 0.3 }}>
                            <Text style={{ color: "black", fontSize: 18, fontStyle: "italic" }}>Product Has Already Been Added!</Text>
                        </View>
                        <View style={{ justifyContent: "flex-end", alignItems: "flex-end", flex: 1 }}>
                            <TouchableOpacity>
                                <Text>OK</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </Modal> */}
                {/* <Modal isVisible={isVisible} Message={'Product is already added in cart'} /> */}

                <EvilIcons name="search" size={30} color="#818181" style={{ marginLeft: 10 }} />
                <TextInput
                    placeholder="Search Your Product"
                    placeholderTextColor="#818181"
                    style={{ color: "black", marginLeft: 20 }}
                />
            </View>
            {products.length > 0 ? (
                <FlatList
                    data={products}
                    renderItem={renderproducts}
                    keyExtractor={item => item._id}
                    numColumns={2}
                />
            )
                :
                <SpinnerLoader isLoading={isLoading} />
            }

            {/* {products.length > 0 ? (
                    <View style={{
                        marginHorizontal: 15,
                        flexDirection: "row",
                        marginTop: 10,
                        flexWrap: "wrap",
                        justifyContent: "space-around",
                    }}>

                        {products.map((data, index) => {
                            console.log(data, "DAAAAAAAAAAAAAAAAAAAAA");
                            return (
                                <>
                                    {
                                        <TouchableOpacity
                                            style={{
                                                height: 200,
                                                borderColor: "white",
                                                elevation: 10,
                                                width: "48%",
                                                borderWidth: 1,
                                                borderRadius: 1,
                                                backgroundColor: "white",
                                                // backgroundColor: "silver",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                padding: 5,
                                                marginVertical: 3
                                            }}
                                            onPress={() => {
                                                let inc = isAddedCArt.includes(data._id)
                                                if (inc) {
                                                    // alert('Already Booked')
                                                    Toast.showWithGravity("Product Already added to Cart", Toast.LONG, Toast.BOTTOM)
                                                    // setIsVisible(true)
                                                } else {
                                                    navigation.navigate("ProductDetail", {
                                                        data
                                                    })
                                                }

                                            }}
                                        >
                                            <Image
                                                source={{ uri: data.image }}
                                                style={{ height: 100, width: 80 }}
                                            />

                                        </TouchableOpacity>
                                        //        <Text
                                        //        style={{ fontSize: 16, fontWeight: "200", color: "black" }}
                                        //    >
                                        //        {data.name}
                                        //    </Text>
                                    }
                                </>

                            )
                        })
                        }
                    </View>
                )
                    :
                    <SpinnerLoader isLoading={isLoading} />

                } */}

            {/* <ScrollView> */}
            {/* <Loader isLoading={isLoading} /> */}


            {/* 
                <View style={{ marginHorizontal: 22, marginTop: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{
                        color: "#434343",
                        fontSize: 20,
                    }}>Featured</Text>
                    <TouchableOpacity>
                        <Text style={{ color: "#656565" }}>See all</Text>
                    </TouchableOpacity>
                </View> */}
            {/* <View style={{ flexDirection: 'row' }}>

                    <ScrollView style={{ marginTop: 20, flexDirection: 'row', backgroundColor: 'red' }} >

                        {
                            products.map(data => {
                                return (
                                    <TouchableOpacity onPress={_ => navigation.navigate('ProductDetail')} key={data.name} style={{ marginHorizontal: 20, }}>
                                        <Image source={{ uri: data.image }} style={{ height: 100, width: 100 }} />
                                        <View style={{ marginLeft: 5 }}>
                                            <Text style={{ marginTop: 5, color: "#2A2A2A", fontSize: 16 }}>{`$${data.price}`}</Text>
                                            <Text style={{ marginTop: 5, color: "#2A2A2A", fontSize: 16 }}>{data.name}</Text>
                                        </View>
                                    </TouchableOpacity>
                                )
                            })
                        }

                    </ScrollView>
                </View> */}


            {/* <View style={{7
                    marginHorizontal: 22,
                    marginTop: 30,
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}>
                    <Text style={{
                        color: "#434343",
                        fontSize: 20,
                    }}>Best Sell</Text>
                    <TouchableOpacity>
                        <Text style={{ color: "#656565" }}>See all</Text>
                    </TouchableOpacity>

                </View> */}
            {/* <ScrollView horizontal style={{ marginTop: 20 }} >
                    {
                        Featured.map(data => {
                            return (
                                <TouchableOpacity key={data.name} style={{ marginHorizontal: 20 }}>
                                    <Image source={data.image} style={{ height: 100, width: 100 }} />
                                    <View style={{ marginLeft: 5 }}>
                                        <Text style={{ marginTop: 5, color: "#2A2A2A", fontSize: 16 }}>{`$${data.price}`}</Text>
                                        <Text style={{ marginTop: 5, color: "#2A2A2A", fontSize: 16 }}>{data.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView> */}

            {/* <ScrollView horizontal style={{ marginVertical: 30 }} >
                    {
                        Featured.map(data => {
                            return (
                                <TouchableOpacity key={data.name} style={{ marginHorizontal: 20 }}>
                                    <Image source={data.image} style={{ height: 100, width: 100 }} />
                                    <View style={{ marginLeft: 5 }}>
                                        <Text style={{ marginTop: 5, color: "#2A2A2A", fontSize: 16 }}>{`$${data.price}`}</Text>
                                        <Text style={{ marginTop: 5, color: "#2A2A2A", fontSize: 16 }}>{data.name}</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        })
                    }
                </ScrollView> */}
            {/* </ScrollView> */}
        </View >
    )
}


export default Home