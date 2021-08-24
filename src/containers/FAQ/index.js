import React, { useState, useRef } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { vw, vh } from '../../Dimensions'
import { Heading, BackButton } from '../../components'
import AntDesign from "react-native-vector-icons/AntDesign"

export default function FAQS({ navigation }) {
    const [showdetail, setShowDetail] = useState([false, false, false, false, false])




    const handleExpand = (index) => {
        let newArr = [...showdetail]
        if (showdetail[index] === true) {
            newArr[index] = false
        } else {
            newArr[index] = true
        }
        setShowDetail(newArr)
    }
    const renderFaq = (index, question, description) => {

        return (
            <View style={{ marginVertical: 20 }}>

                <View style={{ flexDirection: 'row' }}>
                    <View style={{
                        paddingHorizontal: 6,
                        backgroundColor: '#ADD8E6',
                        borderRadius: 50,
                        borderWidth: 1,
                    }}>
                        <Text >{index + 1}</Text>

                    </View>

                    <Text style={{ marginLeft: 6 }}>{question}</Text>
                    <TouchableOpacity onPress={_ => handleExpand(index)} style={{ alignSelf: 'flex-end', marginLeft: vw * 0.2 }}>
                        {
                            showdetail[index] ?
                                <AntDesign name='minuscircle' size={20} color='#ADD8E6' /> :

                                <AntDesign name='pluscircle' size={20} color='#ADD8E6' />
                        }

                    </TouchableOpacity>

                </View>

                {showdetail[index] ? <View style={{ marginHorizontal: 10, borderLeftWidth: 1, height: 100, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ paddingLeft: 14, top: -15 }}>{description}</Text>
                </View> :
                    <View style={{ position: 'absolute', marginTop: 20, paddingVertical: 20, marginHorizontal: 10, borderLeftWidth: index == 4 ? 0 : 1 }}></View>
                }
            </View>

        )
    }


    return (
        <View style={styles.container}>
            <BackButton navigation={navigation} />
            <Heading heading="FAQ" />
            <ScrollView style={{ marginTop: 15 }}>

                {renderFaq(0, 'How can you redeem coupon ?',
                    'Lorem Ipsum Dolor amit sed tu es conor,Lorem Ipsum Dolor amit sed tu es conor Lorem Ipsum Dolor amit sed tu es conor Lorem Ipsum Dolor amit sed tu es conor...')}
                <View style={{ marginTop: showdetail[0] ? -45 : -2 }}>
                    {renderFaq(1, 'How can you redeem coupon ?',
                        'Lorem Ipsum Dolor amit sed tu es conor,Lorem Ipsum Dolor amit sed tu es conor Lorem Ipsum Dolor amit sed tu es conor Lorem Ipsum Dolor amit sed tu es conor...')}
                </View>
                <View style={{ marginTop: showdetail[1] ? -45 : -2 }}>
                    {renderFaq(2, 'How can you redeem coupon ?',
                        'Lorem Ipsum Dolor amit sed tu es conor,Lorem Ipsum Dolor amit sed tu es conor Lorem Ipsum Dolor amit sed tu es conor Lorem Ipsum Dolor amit sed tu es conor...')}
                </View>
                <View style={{ marginTop: showdetail[2] ? -45 : -2 }}>
                    {renderFaq(3, 'How can you redeem coupon ?',
                        'Lorem Ipsum Dolor amit sed tu es conor,Lorem Ipsum Dolor amit sed tu es conor Lorem Ipsum Dolor amit sed tu es conor Lorem Ipsum Dolor amit sed tu es conor...')}
                </View>
                <View style={{ marginTop: showdetail[3] ? -45 : -2 }}>
                    {renderFaq(4, 'How can you redeem coupon ?',
                        'Lorem Ipsum Dolor amit sed tu es conor,Lorem Ipsum Dolor amit sed tu es conor Lorem Ipsum Dolor amit sed tu es conor Lorem Ipsum Dolor amit sed tu es conor...')}
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FEFBEA",
        paddingHorizontal: vw * 0.05

    },

    buyNow: {
        backgroundColor: '#ADD8E6',
        paddingVertical: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: vh * 0.02,
        width: '90%',
        borderRadius: 8,
        elevation: 4,
        alignSelf: 'center'
    }

})

