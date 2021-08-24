import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { vh, vw } from '../../Dimensions'
import { BackButton, Heading } from '../../components'
import Ionicons from "react-native-vector-icons/Ionicons"


const StatusList = ({ navigation }) => {

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
            <TouchableOpacity style={{
                flex: 1,
                paddingHorizontal: 15,
                padding: 8,
                marginVertical: 10,
                width: '100%',
                borderColor: "#707070",
                borderWidth: 1,
                borderRadius: 20,
                justifyContent: 'space-between',
                flexDirection: 'row'
            }} 
            onPress={()=>navigation.navigate("OrderStatus")}
            >
                <View>
                    <Text style={{ fontWeight: 'bold' }}>Long Wig 1</Text>
                    <Text style={{ color: '#374ABE', top: 2 }}>$34.00</Text>
                    <Text style={{ color: '#707070', top: 2 }}>Order ID : 14abcf</Text>

                </View>
                <View>
                    <Image style={{ height: 50, width: 50 }} source={require('../../assets/images/wig1.jpeg')} />
                </View>
            </TouchableOpacity>
        )
    }


    return (
        <View style={{ flex: 1, backgroundColor: "#FEFBEA", paddingHorizontal: 15 }}>
            <View style={{ flex: 0.2, flexDirection: 'row', justifyContent: 'space-between', marginTop: 15 }}>
                <BackButton navigation={navigation} />
            </View>

            <View style={{ flex: 2, top: -10 }}>
                <Heading heading="Order Status" />
                <View style={{ flex: 1 }} >
                    <FlatList
                        data={ProductsData}
                        renderItem={renderproducts}
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
        </View>

    );
}


export default StatusList;