import React, { Component, useState, useContext } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet, ScrollView, ImagePickerIOS, Image } from 'react-native'
import { vw, vh } from '../../Dimensions'
import Ionicons from "react-native-vector-icons/Ionicons"
import { BackButton, Heading } from '../../components'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../../AppContext'
import Toast from "react-native-simple-toast"
export default function Profile({ navigation }) {

    const content = useContext(AppContext)
    const { user, setUser } = content

    const [addressData, setAddressData] = useState({
        name: '',
        addressLane: '',
        city: '',
        postalCode: '',
        phoneNumber: ''
    })

    const [image, setImage] = useState(null)
    React.useEffect(() => {
        if (user) {
            setAddressData({
                name: user.userDetails.name,
                addressLane: '',
                city: '',
                postalCode: '',
                phoneNumber: user.userDetails.phoneNumber,
                image: user.userDetails.image
            })
        }
        else {
            Toast.showWithGravity("Please Login In  First", Toast.LONG, Toast.BOTTOM)
        }
    }, [])



    var options = {
        title: 'Select Image',
        customButtons: [
            {
                name: 'customOptionKey',
                title: 'Choose Photo from Custom Option'
            },
        ],
        storageOptions: {
            skipBackup: true,
            path: 'images',
        },
    };




    const renderInput = (label, placeHolder, value, keypadType) => {
        return (
            <View style={{ marginTop: vh * 0.04 }}>
                <Text style={{ color: "#A6A6A6", fontSize: 16 }}>{label}</Text>
                <TextInput
                    value={value}
                    placeHolder={placeHolder}
                    style={{
                        borderBottomWidth: 1,
                        borderColor: '#A6A6A6',
                        marginTop: -12,
                        color: "#404040"
                    }}
                    keyboardType={keypadType}
                    editable={false}
                />
            </View>
        )
    }
    const LaunchImagePicker = () => {
        launchImageLibrary(options, response => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log(
                    'User tapped custom button: ',
                    response.customButton
                );
                alert(response.customButton);
            } else {
                setFilePath(response);
            }
        })
    }
    return (
        <ScrollView style={styles.container}>
            <View style={{ marginHorizontal: 15 }}>
                <BackButton navigation={navigation} />
                <Heading heading="Profile" />
            </View>
            {user ?
                <View style={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
                    <Image
                        style={{ height: 100, width: 100, borderRadius: 100 }}
                        source={{ uri: user.userDetails.image }}
                    />

                    <View style={{ position: "absolute", bottom: -20, right: 0, width: "50%" }}>
                        <TouchableOpacity onPress={LaunchImagePicker} >
                            <Image source={require("../../assets/images/edit.png")} style={{ height: 45, width: 45 }} />
                        </TouchableOpacity>
                    </View>
                </View>
                : null}
            {renderInput('Name', 'Enter Your Name', addressData.name)}
            {/* {renderInput('Address Lane', 'Enter Address Lane', addressData.addressLane)}
            {renderInput('City', 'Enter Your City', addressData.city)}
            {renderInput('Postal Code', 'Enter Postal Code', addressData.postalCode)} */}
            {renderInput('Phone Number', '##-####-#####', addressData.phoneNumber, "numeric")}

            {/* <TouchableOpacity style={styles.buyNow} onPress={()=>navigation.goBack()}>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Save Changes</Text>
            </TouchableOpacity> */}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FEFBEA",
        paddingHorizontal: vw * 0.04
    },

    buyNow: {
        backgroundColor: '#ADD8E6',
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: vh * 0.02,
        width: '90%',
        borderRadius: 8,
        elevation: 4,
        alignSelf: 'center'
    }

})

