import React, { useState } from "react"
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import AntDesign from "react-native-vector-icons/AntDesign"
import Entypo from "react-native-vector-icons/Entypo"

const BackButton = ({navigation}) => {
    return (
        <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginTop: 20 }}>
            <Ionicons name="arrow-back" size={30} color="#C5CCD6" />
        </TouchableOpacity>
    )
}

export default BackButton

