import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { vh, vw } from '../../Dimensions'
import Ionicons from "react-native-vector-icons/Ionicons"



const Favourite = () => {

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
                    // onPress={_ => alert('called')}
                    style={{ backgroundColor: 'white', elevation: 4, width: 140, height: 160, justifyContent: 'center', alignItems: 'center', borderRadius: 5 }}>
                    <Image
                        source={{
                            uri: 'https://reactjs.org/logo-og.png',
                        }}
                        style={{ width: 60, height: 60 }}
                    />
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', marginTop: 5 }}>
                    <Text style={{ textDecorationLine: 'line-through', marginRight: 2 }} >{item.previousCost}</Text>
                    <Text >{item.newCost}</Text>
                </View>
                <Text>{item.title}</Text>
            </View>
        )
    }


    return (
        <View style={{ flex: 1, backgroundColor: "#FEFBEA", paddingHorizontal: 15 }}>
            <View style={{ flex: 0.2 }}></View>
            <View style={{ flex: 0.1, justifyContent: 'flex-end', flexDirection: 'row' }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ marginTop: 20 }}>
                    <Ionicons name="arrow-back" size={30} color="#C5CCD6" />
                </TouchableOpacity>
                <EvilIcons
                    name="search"
                    onPress={_ => alert('search')}
                    color="black"
                    size={24}
                    style={{ fontWeight: 'bolder' }}
                />
            </View>
            <View style={{ flex: 2 }}>
                <Text style={{ fontSize: 22, fontWeight: 'bold', marginVertical: 15 }}>Favourite</Text>
                <View style={{ flex: 1, width: vw * 0.9, marginLeft: 5 }} >
                    <FlatList
                        data={ProductsData}
                        renderItem={renderproducts}
                        keyExtractor={item => item.id}
                        numColumns={2}
                    />
                </View>
            </View>
        </View>

    );
}


export default Favourite;