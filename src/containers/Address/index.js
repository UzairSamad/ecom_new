import React, { Component, useContext, useEffect } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { RadioButton } from 'react-native-paper';
import { vh, vw } from '../../Dimensions'
import Ionicons from "react-native-vector-icons/Ionicons"
import { AppContext } from '../../AppContext'
import { SpinnerLoader } from '../../components'
import { ToastAndroid } from 'react-native';

export default function Address({ navigation }) {
    const [checked, setChecked] = React.useState();
    const contextData = useContext(AppContext)
    const { adressDummyData, setSelectedAddress,
        createUserAddress,
        getUserAddress,
        userAddress,
        isLoading,
        user,
        selecteAdress
    } = contextData
    console.log(user, "RESSSSSSSSSSSSSSSSSSSS");
    useEffect(() => {
        // alert(JSON.stringify(userAddress))
        getUserAddress(user.userDetails._id)
    }, [])

    const renderAddress = (text, val) => {
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: vh * 0.03 }}>
                <View>
                    <Text >{`${text.name},${text.addressLine},${text.city}`}</Text>
                    <Text >{`Postal Code # ${text.postalCode}`}</Text>
                    <Text >{`Phone No # ${text.phoneNumber}`}</Text>
                </View>
                <RadioButton
                    style={{ flex: 0.8 }}
                    value={val}
                    status={checked === val ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setSelectedAddress(`${text.name},${text.addressLine},${text.city},${text.postalCode},${text.phoneNumber}`)
                        setChecked(val)
                    }
                    }
                />
            </View>
        )
    }
    return (
        <>
            <SpinnerLoader isLoading={isLoading} />

            <View style={{ flex: 1, paddingHorizontal: 15, backgroundColor: '#FEFBEA' }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: vh * 0.04 }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ marginTop: 20 }}>
                        <Ionicons name="arrow-back" size={30} color="#C5CCD6" />
                    </TouchableOpacity>
                </View>
                <Text style={{ marginBottom: vh * 0.01, fontSize: 26, fontWeight: 'bold' }}>Address</Text>
                <ScrollView style={{flex:1}}>
                    {
                        userAddress?.map((val, ind) => {
                            return renderAddress(val, ind)
                        })
                    }
                    {/* {renderAddress('second')} */}
                </ScrollView>
                <View style={{ flex: 0.4, justifyContent: "flex-end", marginBottom: 20 }} >
                    <TouchableOpacity style={styles.addAdress}
                        onPress={_ => navigation.navigate('CreateAddress')}
                    >
                        <Text style={{ color: '#667EEA', fontSize: 18, fontWeight: 'bold' }}>Add Address</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buyNow} onPress={() =>{
                        if(selecteAdress == ''){
                            ToastAndroid.showWithGravity("Please Select Address", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50)
                        }else{
                            navigation.navigate("PaymentDetails")
                        }
                        }}>
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Continue To Payment</Text>
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
