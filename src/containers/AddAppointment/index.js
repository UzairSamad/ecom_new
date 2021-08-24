import React, { Component, useContext, useState } from 'react'
import { Text, View, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { vw, vh } from '../../Dimensions'
import Ionicons from "react-native-vector-icons/Ionicons"
import { BackButton, Heading } from '../../components'
import { AppContext } from '../../AppContext'
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from "react-native-simple-toast"

export default function AddAppointment({ navigation, route }) {
    const { user } = route.params
    console.log(user, "SISSSSDASDASD");
    const context = useContext(AppContext)
    const { createAppoitment, userToken } = context

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')
    const [date, setDate] = useState(new Date())
    const [show, setShow] = useState(false)

    const handleCreateAppoitment = async () => {
        console.log(user, 'USRRRRRRRRRRRRRRRRRRRRRRRR');
        // alert(JSON.stringify(user))
        // alert('called')
        if (name == "") {
            Toast.showWithGravity("Name is Required", Toast.LONG, Toast.BOTTOM)
            return;
        }
        if (message == "") {
            Toast.showWithGravity("Message is Required", Toast.LONG, Toast.BOTTOM)
            return;
        }
        if (email == "") {
            Toast.showWithGravity("Email is Required", Toast.LONG, Toast.BOTTOM)
            return;
        }
        let data = {
            name,
            email,
            message,
            date: `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`,
            status: 0,
            image: user.userDetails.image

        }
        try {
            createAppoitment(data, user.token, navigation)
        } catch (error) {

        }
        // navigation.goBack()
    }

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        setShow(false)
    };
    console.log(date, 'dateeee')

    const renderInput = (label, placeHolder, value, stateFunc) => {
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
                        color: "#404040",
                    }}
                    onChangeText={text => stateFunc(text)}


                />
            </View>
        )
    }
    return (
        <ScrollView style={styles.container}>
            <View style={{ marginHorizontal: 15 }}>
                <BackButton navigation={navigation} />
                <Heading heading="Create Appointment" />
            </View>
            <View style={{ marginHorizontal: 15 }}>
                {renderInput('Name', 'Enter Your Name', name, setName)}

                <View style={{ marginTop: vh * 0.04 }}>
                    <Text style={{ color: "#A6A6A6", fontSize: 16 }} onPress={_ => setShow(true)} >{'Date'}</Text>
                    <Text onPress={_ => setShow(true)} style={{
                        borderBottomWidth: 1,
                        borderColor: '#A6A6A6',
                        marginTop: 5,
                        color: "#404040",
                    }}>{`${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`}</Text>

                </View>
                {show && <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    is24Hour={true}
                    display="default"
                    onChange={onChangeDate}
                    minimumDate={new Date()}
                />}

                {renderInput('Email', 'Enter Your City', email, setEmail)}
                {renderInput('Message', 'Enter Postal Code', message, setMessage)}
            </View>

            <TouchableOpacity style={styles.buyNow} onPress={() => handleCreateAppoitment()}>
                <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Create Appointment</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FEFBEA",
    },

    buyNow: {
        backgroundColor: '#ADD8E6',
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: vh * 0.06,
        width: '90%',
        borderRadius: 8,
        elevation: 4,
        alignSelf: 'center'
    }

})

