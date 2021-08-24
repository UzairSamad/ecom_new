import React, { Component, useState, useEffect } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet, ScrollView, ImagePickerIOS, Image } from 'react-native'
import { vw, vh } from '../../Dimensions'
import Ionicons from "react-native-vector-icons/Ionicons"
import { BackButton, Heading } from '../../components'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';

const Privacy = ({ navigation }) => {

    const [aboutUs, getAboutUs] = useState("")

    useEffect(() => {
        axios.get("https://minisolution-backend.herokuapp.com/api/getPrivacy")
            .then(res => {
                console.log(res, "RESSSSSSSSSSSSSSSSSSSSS");
                getAboutUs(res.data.data[0].policy)
            })
            .catch(err => {
                console.log(err, "ERRRRRRRRRRRRRRRRRRR");
            })
    }, [])

    return (
        <View style={{
            flex: 1,
            backgroundColor: "#FEFBEA",
        }}>
            <View style={{ marginHorizontal: 15 }}>
                <BackButton navigation={navigation} />
                <Heading heading="Privacy" />
            </View>
            <ScrollView>
                <View style={{
                    marginVertical: 20,
                    marginHorizontal: 20
                }}>
                    <Text style={{
                        lineHeight: 20
                    }}>
                        {aboutUs}
                    </Text>
                </View>
            </ScrollView>
        </View>
    )
}

export default Privacy
