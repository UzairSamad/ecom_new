import React, { useState, useContext, useEffect } from "react"
import { View, Text, ScrollView, Image, TouchableOpacity, ToastAndroid } from "react-native"
import {
    Heading,
    BackButton
} from "../../components"
import AntDesign from "react-native-vector-icons/AntDesign"
import { AppContext } from '../../AppContext'
import { SpinnerLoader } from '../../components'
const Appointment = ({ navigation }) => {
    const [appointmentData, setAppointmentData] = useState([])
    const context = useContext(AppContext)
    const { userAppointments, getUserAppointment, user, isLoading, _retrieveData } = context
    const [userDAta, setUserData] = useState({})

    useEffect(() => {
        console.log(user, "USSSSSSSSSSS");
    }, [])


    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            if (user !== null) {

                getUserAppointment(user?.userDetails?._id)
            }
            else {
                // alert("ele")
                ToastAndroid.showWithGravity("Please Login First ", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50)
            }
        })
        return unsubscribe;

    }, [])


    const checkUser = () => {
        if (user) {
            navigation.navigate("AddAppointment", {
                user
            })
        }
        else {
            ToastAndroid.showWithGravity("Please Login  To Create Appointment", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50)
        }
    }

    return (
        <>
            <SpinnerLoader isLoading={isLoading} />
            <View style={{
                backgroundColor: "#FEFBEA",
                flex: 1
            }}>
                <View style={{ marginHorizontal: 15 }}>
                    <BackButton navigation={navigation} />
                    <Heading heading="Appointment" />
                </View>
                <ScrollView>


                    {userAppointments.length > 0 ? (
                        userAppointments.map((data, index) => {
                            return (
                                <View key={index} style={{ marginHorizontal: 30, marginTop: 20, flexDirection: "row" }}>
                                    <View style={{ height: 50, width: 50, borderRadius: 50 }}>
                                        <Image source={{ uri: data.image }}
                                            style={{ height: 50, width: 50, borderRadius: 50 }}
                                        />
                                    </View>
                                    <View style={{ marginLeft: 10, justifyContent: "center" }}>
                                        <Text style={{ color: "#434343", fontSize: 16 }}>{data.name}</Text>
                                        <Text style={{ color: "#434343", fontSize: 14 }}>{data.date}</Text>
                                        <Text>Status:  {data.status == 0 ? "Pending" : data.status == 1 ? "Accepted" : "Rejected"}</Text>
                                    </View>
                                </View>
                            )
                        })
                    ) : (
                        <View style={{ justifyContent: "center", alignItems: "center", flex: 1, alignSelf: "center", marginTop: 100 }}>
                            <Text style={{ fontSize: 20, fontWeight: "bold" }}>No Appointments Yet</Text></View>
                    )
                    }
                </ScrollView>

                <View style={{ justifyContent: "center", alignItems: "center", height: 45, width: 45, borderRadius: 100, backgroundColor: "#ADD8E6", position: "absolute", bottom: 50, right: 50 }}>
                    <TouchableOpacity onPress={checkUser}
                    >
                        <AntDesign
                            name="plus"
                            size={24}
                            color="white"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

export default Appointment