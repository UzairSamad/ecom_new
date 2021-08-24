import React, { useState } from "react"
import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import AntDesign from "react-native-vector-icons/AntDesign"
import Entypo from "react-native-vector-icons/Entypo"

const Heading = ({ heading }) => {
    return (
        <View style={{
            marginTop: 20
        }}>
            <Text style={{
                color: "#434343",
                fontSize: 30,
            }}>{heading}</Text>
        </View>
    )
}

export default Heading

