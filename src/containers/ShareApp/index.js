import React, { useState, useRef } from 'react'
import { Text, View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { vw, vh } from '../../Dimensions'
import { SocialIcon } from 'react-native-elements'
import { Heading, BackButton } from '../../components'
import AntDesign from "react-native-vector-icons/AntDesign"
import Share from 'react-native-share';


export default function FAQS({ navigation }) {
    const FBSubmit = async (SharePlateform) => {
        const shareOption = {
            message: 'Try this Amazing App! From Facebook',
            social: SharePlateform,
            url: 'https://www.google.com',

        };
        try {
            const shareResponse = await Share.shareSingle(shareOption);
            console.log(JSON.stringify(shareResponse));
        } catch (error) {
            console.log(error);
        }
    };




    return (
        <View style={styles.container}>
            <BackButton navigation={navigation} />
            <Heading heading="Share App" />
            <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-evenly', marginTop: 20 }}>
                <TouchableOpacity
                    style={{ backgroundColor: '#00acee', width: '100%', marginVertical: 15, flexDirection: 'row', borderRadius: 25, alignItems: 'center', height: 55, paddingHorizontal: 90 }}
                    onPress={_ => FBSubmit(Share.Social.TWITTER)}>
                    <SocialIcon
                        type='twitter'
                        style={{ height: 30, width: 30, backgroundColor: '#00acee', elevation: 0 }}
                    />
                    <Text style={{ fontSize: 22, color: '#fff' }}>Twitter</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={_=>FBSubmit(Share.Social.INSTAGRAM)}>
                    <SocialIcon
                        raised={false}
                        type='gitlab'
                        style={{ height: 60, width: 60 }}

                    />
                </TouchableOpacity> */}
                {/* <TouchableOpacity onPress={_=>FBSubmit(Share.Social.)}>
                    <SocialIcon
                        light
                        type='medium'
                        style={{ height: 60, width: 60 }}

                    />
                </TouchableOpacity> */}
                <TouchableOpacity
                    style={{ backgroundColor: '#fff', width: '100%', marginVertical: 15, flexDirection: 'row', borderRadius: 25, alignItems: 'center', height: 55, paddingHorizontal: 90 }}
                    onPress={_ => FBSubmit(Share.Social.INSTAGRAM)}>
                    <SocialIcon
                        light
                        type='instagram'
                        style={{ height: 30, width: 30, backgroundColor: '#fff', elevation: 0, }}

                    />
                    <Text style={{ fontSize: 22, color:'#6e9ab7'  }}>Instagram</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ backgroundColor: '#3b5998', width: '100%', marginVertical: 15, flexDirection: 'row', borderRadius: 25, alignItems: 'center', height: 55, paddingHorizontal: 90 }}
                    onPress={_ => FBSubmit(Share.Social.FACEBOOK)}>
                    <SocialIcon
                        type='facebook'
                        style={{ height: 30, width: 30, backgroundColor: '#3b5998', elevation: 0 }}
                    />
                    <Text style={{ fontSize: 22, color: '#fff' }}>facebook</Text>

                </TouchableOpacity>
                <TouchableOpacity
                    style={{ backgroundColor: '#128C7E', width: '100%', marginVertical: 15, flexDirection: 'row', borderRadius: 25, alignItems: 'center', height: 55, paddingHorizontal: 90 }}
                    onPress={_ => FBSubmit(Share.Social.WHATSAPP)}>
                    <SocialIcon
                        type='whatsapp'
                        style={{ height: 30, width: 30, backgroundColor: '#128C7E', elevation: 0 }}

                    />
                    <Text style={{ fontSize: 22, color: '#fff' }}>Whatsapp</Text>

                </TouchableOpacity>
                <TouchableOpacity
                    style={{ backgroundColor: '#c8232c', width: '100%', marginVertical: 15, flexDirection: 'row', borderRadius: 25, alignItems: 'center', height: 55, paddingHorizontal: 90 }}
                    onPress={_ => FBSubmit(Share.Social.PINTEREST)}>
                    <SocialIcon
                        type='pinterest'
                        style={{ height: 30, width: 30, backgroundColor: '#c8232c', elevation: 0 }}

                    />
                    <Text style={{ fontSize: 22, color: '#fff' }}>Pinterest</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ backgroundColor: '#0e76a8', width: '100%', marginVertical: 15, flexDirection: 'row', borderRadius: 25, alignItems: 'center', height: 55, paddingHorizontal: 90 }}
                    onPress={_ => FBSubmit(Share.Social.LINKEDIN)}>
                    <SocialIcon
                        type='linkedin'
                        style={{ height: 30, width: 30, backgroundColor: '#0e76a8', elevation: 0 }}

                    />
                    <Text style={{ fontSize: 22, color: '#fff' }}>Linkedin</Text>
                </TouchableOpacity>
            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FEFBEA",
        paddingHorizontal: vw * 0.05

    }

})

