import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import { vh, vw } from '../../Dimensions'
import { BackButton, Heading } from '../../components'
import Ionicons from "react-native-vector-icons/Ionicons"
import { AppContext } from "../../AppContext"
import Toast from "react-native-simple-toast"


const Notification = ({ navigation }) => {
    const context = useContext(AppContext)
    const { user, getNotification, notification } = context
    console.log(user, "USERRRRRRRRRRRRRRRRRR");
    
    useEffect(() => {
        if (user) {
            getNotification(user.userDetails._id)
        }
        else {
            Toast.showWithGravity("Please Login First", Toast.LONG, Toast.BOTTOM)
        }
    }, [])

    console.log(notification, "NOTIFAAAAAAAAAAA");

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
            // onPress={() => navigation.navigate("NotificationDetails")}
            >
                <View>
                    <Text style={{ fontWeight: 'bold' }}>{item.title}</Text>
                    <Text style={{ color: '#374ABE', top: 2 }}>{item.message}</Text>

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
                <Heading heading="Notification" />
                <View style={{ flex: 1 }} >
                    {notification.length > 0 ?
                        <FlatList
                            data={notification}
                            renderItem={renderproducts}
                            keyExtractor={item => item.id}
                        />
                        : <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ fontSize: 25, fontWeight: "bold" }}> No Notifications</Text>
                        </View>
                    }
                </View>
            </View>
        </View>

    );
}


export default Notification;