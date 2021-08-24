import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { vh, vw } from '../../Dimensions'
import Ionicons from "react-native-vector-icons/Ionicons"
import { Heading, SpinnerLoader } from '../../components';
import { AppContext } from '../../AppContext'


const Services = ({ navigation }) => {
    const context = useContext(AppContext)
    const { getServices, isLoading, services } = context
    useEffect(() => {
        getServices()
    }, [])
    const [state, setState] = useState({
        price: '',
        productName: '',
        rating: '',
        productTerm: '',
        productTag: ''
    })
    const ProductsData = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'Small Wig 1',
            previousCost: '$555.00 ',
            newCost: '$50.00'
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Small Wig 2',
            previousCost: '$34.00 ',
            newCost: '$30.00'
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Small Wig 3',
            previousCost: '$555.00 ',
            newCost: '$50.00'
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d46',
            title: 'Small Wig 4',
            previousCost: '$555.00 ',
            newCost: '$50.00'
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e297t2',
            title: 'Small Wig 5',
            previousCost: '$555.00 ',
            newCost: '$50.00'
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29dyy2',
            title: 'Small Wig 6',
            previousCost: '$555.00 ',
            newCost: '$50.00'
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29dyt2',
            title: 'Small Wig 7',
            previousCost: '$555.00 ',
            newCost: '$50.00'
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29dy2',
            title: 'Small Wig 8',
            previousCost: '$555.00 ',
            newCost: '$50.00'
        },
    ];

    const renderproducts = ({ item }) => {
        return (
            <View style={{ flex: 1, padding: 8, alignSelf: 'center' }} >
                <TouchableOpacity
                    onPress={() => navigation.navigate("ProductDetail", {
                        data: item ,
                        name:'service'
                    })}
                    style={{ backgroundColor: 'white', elevation: 4, width: 140, height: 160, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                    <Image
                        source={{ uri: item.image }}
                        style={{ width: 60, height: 60 }}
                    />
                </TouchableOpacity>
                <Text>{item.name}</Text>
                <View style={{ flexDirection: 'row', marginTop: 2 }}>
                    {item.discount != null && <Text style={{ textDecorationLine: 'line-through', marginRight: 5 }} >{`$${item.price}`}</Text>}
                    { <Text >{`$${item.price - item.discount}`}</Text>}
                </View>
            </View>
        )
    }


    return (
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
                <Heading heading="Services" />
                <SpinnerLoader isLoading={isLoading} />
                <View style={{ flex: 1, width: vw * 0.9, marginLeft: 5 }} >
                    <FlatList
                        data={services}
                        renderItem={renderproducts}
                        keyExtractor={item => item.id}
                        numColumns={2}
                    />
                </View>
            </View>
        </View>

    );
}


export default Services;