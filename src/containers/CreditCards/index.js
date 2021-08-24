import React, { Component, useContext, useEffect } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { RadioButton } from 'react-native-paper';
import { vh, vw } from '../../Dimensions'
import Ionicons from "react-native-vector-icons/Ionicons"
import { AppContext } from '../../AppContext'
import { SpinnerLoader } from '../../components'
import { ToastAndroid } from 'react-native';
import Fontisto from "react-native-vector-icons/Fontisto"
import { ScaleFromCenterAndroid } from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets';

export default function CreditCards({ navigation }) {
    const [checked, setChecked] = React.useState(0);
    const contextData = useContext(AppContext)
    const { adressDummyData, setSelectedUserCard,
        userCreditCards,
        isLoading,
        user,
        selectedUserCard,
        getUserCards
    } = contextData
    console.log(userCreditCards, "RESSSSSSSSSSSSSSSSSSSS");
    // useEffect(() => {
    //     // alert(JSON.stringify(userAddress))
    //     getUserCards(user.userDetails._id)
    //     alert('clll')
    // }, [])
    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          // do something
          getUserCards(user.userDetails._id)

        });
    
        return unsubscribe;
      }, [navigation]);

    const renderCArd = (data, indx) => {
        // let number  = data.number.slice(0,4)
        return (
            <TouchableOpacity style={{ backgroundColor: 'black', height: vh * 0.25, marginRight: 10, borderRadius: 10, width: vw * 0.84 }} onPress={_ => setSelectedUserCard(data)} >
                {/* <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 22, alignSelf: 'flex-end', paddingHorizontal: 15 }} >VISA</Text> */}
                <View style={{
                    position: "absolute",
                    paddingHorizontal: 28,
                    paddingVertical: 25,
                    // backgroundColor: '#e0b531',
                    marginTop: vh * 0.02,
                    borderRadius: 10,
                    marginHorizontal: vw * 0.02
                }}>
                    <Fontisto name="mastercard" size={36} color="white" />

                </View>
                <View style={{ position: "absolute", marginTop: vh * 0.11, }}>
                    <View style={{ alignSelf: 'stretch', width: '100%', flex: 1 }}>
                        <Text style={{ color: 'white', fontSize: 22, marginLeft: vw * 0.1 }}>{`${data.number.slice(0, 4)} ${data.number.slice(4, 8)} ${data.number.slice(8, 12)} ${data.number.slice(12, 16)}`}</Text>
                    </View>
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: vw * 0.11 }}>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Text style={{ color: 'white', fontSize: 12, marginRight: 10 }}>Expiry Date</Text>
                            {/* <Text style={{ color: 'white', fontSize: 8 }}>TO Date</Text> */}
                        </View>
                        <Text style={{ color: 'white', fontSize: 14 }}>{data.expDate}</Text>
                        <Text style={{ color: 'white', fontSize: 18, marginLeft: vw * -0.1 }}>{data.name}</Text>

                    </View>
                </View>
                {data?._id == selectedUserCard?._id &&
                    <View style={{ borderBottomWidth: 3, borderColor: '#ADD8E6', marginTop: vh * 0.26, width: '90%', alignSelf: 'center' }}>
                    </View>}

            </TouchableOpacity >



        )
    }


    // const renderAddress = (text, val) => {
    //     return (
    //         <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: vh * 0.03 }}>
    //             <View>
    //                 <Text >{`${text.name},${text.addressLine},${text.city}`}</Text>
    //                 <Text >{`Postal Code # ${text.postalCode}`}</Text>
    //                 <Text >{`Phone No # ${text.phoneNumber}`}</Text>
    //             </View>
    //             <RadioButton
    //                 style={{ flex: 0.8 }}
    //                 value={val}
    //                 status={checked === val ? 'checked' : 'unchecked'}
    //                 onPress={() => {
    //                     setSelectedUserCard(`${text.name},${text.addressLine},${text.city},${text.postalCode},${text.phoneNumber}`)
    //                     setChecked(val)
    //                 }
    //                 }
    //             />
    //         </View>
    //     )
    // }
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
                <Text style={{ marginBottom: vh * 0.01, fontSize: 26, fontWeight: 'bold' }}>Credit Cards</Text>
                <ScrollView style={{ flex: 1 }} horizontal={true}>
                    {
                        userCreditCards?.map((val, ind) => {
                            return renderCArd(val, ind)
                        })
                    }
                    {/* {renderCArd()} */}

                    {/* {renderAddress('second')} */}
                </ScrollView>
                <View style={{ flex: 0.4, justifyContent: "flex-end", marginBottom: 20 }} >
                    <TouchableOpacity style={styles.buyNow} onPress={() => {
                        if (selectedUserCard == '' || selectedUserCard == null ) {
                            ToastAndroid.showWithGravity("Please Select Credit Card", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50)
                        } else {
                            navigation.navigate("Checkout",{data:selectedUserCard})
                        }
                    }}>
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Continue</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buyNow} onPress={() => {
                        navigation.navigate("AddCreditCard")
                    }}>
                        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Add New Card</Text>
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
        alignSelf: 'center',
        marginBottom:10
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
