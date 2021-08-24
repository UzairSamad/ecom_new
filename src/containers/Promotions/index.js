import React, { useEffect, useState, useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { vh, vw } from '../../Dimensions'
import Ionicons from "react-native-vector-icons/Ionicons"
import { Heading } from '../../components';
import { SpinnerLoader } from '../../components'
import { AppContext } from '../../AppContext'
import Toast from "react-native-simple-toast"
import axios from 'axios';


const Promotions = ({ navigation }) => {

    const appData = useContext(AppContext)
    const { getPromotions, promotions, isLoading, user, setIsloading } = appData
    const [state, setState] = useState({
        price: '',
        productName: '',
        rating: '',
        productTerm: '',
        productTag: ''
    })

    useEffect(() => {
        // getPromotions()
        const unsubscribe = navigation.addListener('focus', () => {
            getPromotions()
        })
        return unsubscribe;
    }, [])

    const renderNew = (item) => {
        // console.log(item.peopleSeen, user.userDetails._id, "ITEsdadsdM");

        let res = item?.peopleSeen.includes(user?.userDetails._id)
        console.log(res, "resresresresresresres");
        if (!res) {
            return (
                <View style={{ alignItems: "flex-end", marginHorizontal: 10 }}>
                    <Text style={{ color: "#ADD8E6", fontWeight: "bold", fontSize: 16 }}>new</Text>
                </View>
            )
        }
    }

    const navigate = async (item) => {
        if (user) {
            setIsloading(true)
            axios({
                url: "https://minisolution-backend.herokuapp.com/api/nonew",
                data: {
                    Promotionid: item._id,
                    userId: user.userDetails._id
                },
                method: "post"
            }).then(res => {
                setIsloading(false)
                navigation.navigate("ProductDetail", { data: item })
            })
                .catch(err => {
                    setIsloading(false)
                    alert("Some Error Has occured")
                })


        }
        else {
            Toast.showWithGravity("Please Login First", Toast.LONG, Toast.BOTTOM)
        }
    }

    const renderproducts = ({ item }) => {
        return (
            <View style={{ flex: 1, padding: 8, alignSelf: 'center' }}>

                <TouchableOpacity
                    onPress={() => navigate(item)}
                    style={{
                        backgroundColor: 'white',
                        elevation: 4,
                        width: 140,
                        height: 160,
                        borderRadius: 5
                    }}
                >
                    {renderNew(item)}
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
                <Text>{item.name}</Text>

                <View style={{ flexDirection: 'row', marginTop: 2 }}>
                    <Text style={{ textDecorationLine: 'line-through', marginRight: 2 }} >{`${item.price}$`}</Text>
                    <Text >{` $${item.afterPrice}`}</Text>
                </View>
            </View>
        )
    }


    return (
        <>
            <SpinnerLoader isLoading={isLoading} />
            <View style={{ flex: 1, backgroundColor: "#FEFBEA", paddingHorizontal: 15 }}>
                {/* <View style={{ flex: 0.2 }}></View> */}
                <View style={{ marginTop: 20, justifyContent: 'space-between', flexDirection: 'row', alignItems: "center" }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ marginTop: 20 }}>
                        <Ionicons name="arrow-back" size={30} color="#C5CCD6" />
                    </TouchableOpacity>
                    <EvilIcons
                        name="search"
                        // onPress={_ => alert('search')}
                        color="black"
                        size={24}
                        style={{ fontWeight: 'bolder' }}
                    />
                </View>
                <View style={{ flex: 2 }}>
                    <Heading heading="Promotion/Deals" />

                        <View style={{ flex: 1, width: vw * 0.9, marginLeft: 5 }} >
                            <FlatList
                                data={promotions}
                                renderItem={renderproducts}
                                keyExtractor={item => item.id}
                                numColumns={2}
                            />
                        </View>

                </View>
            </View>
        </>


    );
}


export default Promotions;