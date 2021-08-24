import React from "react"
import { View, Image, Text, TouchableOpacity } from "react-native"


const Confirmation = ({ navigation }) => {
    return (
        <View style={{ backgroundColor: "#FEFBEA", flex: 1 }}>
            <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
                <View style={{ padding: 50, borderRadius: 500, backgroundColor: "#F8F8F8" }}>
                    <View style={{ padding: 50, borderRadius: 500, backgroundColor: "#EEEEEE" }}>
                        <Image source={require("../../assets/images/thumb-up.png")} style={{ height: 30, width: 30 }} />
                    </View>
                </View>
                <View style={{
                    marginTop: 20
                }}>
                    <Text style={{ fontSize: 30, color: "#434343", fontWeight: "bold" }}>Confirmation</Text>
                </View>
                <View style={{
                    marginTop: 20
                }}>
                    <Text style={{ fontSize: 14, color: "#656565", textAlign: "center" }}>You have successfully completed your payment procedure</Text>
                </View>
            </View>
            <View>
                <TouchableOpacity onPress={_ => navigation.navigate("Home")}
                    style={{
                        borderRadius: 5,
                        padding: 10, position: "absolute",
                        bottom: 10, alignSelf: "center",
                        backgroundColor: "#ADD8E6",
                        width: "80%"
                    }}>
                    <Text style={{ textAlign: "center", fontSize: 16, color: "white" }}>Back to Home</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}

export default Confirmation