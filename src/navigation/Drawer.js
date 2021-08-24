import React, { useContext } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import DrawerItems from './Custom'
import Ionicons from "react-native-vector-icons/Ionicons"
import { AppContext } from '../AppContext'
function DrawerContent(props) {
    const context = useContext(AppContext)
    const { user } = context
console.log(user,"USERRRRRRRRRRRRRRRRRRR");
    const renderNav = [
        "Home",
        "Profile",
        // "Services",
        "Promotions / Deals",
        "My Cart",
        "My Order",
        // "Status"
    ];

    const renderOtherNav = [
        "Share App",
        "Privacy",
        "About Us",
        "Contact Us",
        // "Faqs",
    ];

    return (
        <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
            <DrawerContentScrollView {...props} >
                <View style={styles.drawerContent}>
                    {user ?
                        <>
                            < View style={{ marginTop: 25, marginLeft: 10 }} >
                                <TouchableOpacity
                                    onPress={() => props.navigation.closeDrawer()}
                                    style={{ flex: 1, marginRight: 20, justifyContent: 'center' }}>
                                    <Ionicons name="arrow-back" size={30} color="#404040" />
                                </TouchableOpacity>
                            </View>
                            <View style={{
                                flexDirection: "row",
                                justifyContent: "space-around",
                                marginTop: 20,
                                alignItems: "center"
                            }}>
                                <View style={{ height: 80, width: 80, borderRadius: 200 }}>
                                    <Image
                                        source={{uri:user.userDetails.image}}
                                        style={{ height: 80, width: 80, borderRadius: 200 }}
                                    />
                                </View>
                                <View>
                                    <Text style={{ fontSize: 20, fontWeight: "bold" }}>{user.userDetails?.email}</Text>
                                    <Text style={{ fontSize: 14, fontWeight: "bold" }}>{user.userDetails?.name}</Text>
                                    <Text style={{ fontSize: 14, fontWeight: "bold" }}>{user.userDetails?.phoneNumber}</Text>
                                </View>
                            </View>

                            <View style={{
                                borderBottomWidth: 1,
                                marginTop: 30,
                                borderBottomColor: "#707070"
                            }} />
                        </>
                        : null
                    }
                    <View style={{ marginTop: 30 }}>
                        {renderNav.map((item, index) => {
                            return (
                                <DrawerItems
                                    title={item}
                                    key={index}
                                    navigation={props.navigation}
                                    focused={props.state.index === index ? true : false}
                                    props={props}
                                />
                            );
                        })}
                    </View>
                    <View style={{
                        borderBottomWidth: 1,
                        marginTop: 30,
                        borderBottomColor: "#707070"
                    }} />
                    <View style={{ marginTop: 30 }}>
                        {renderOtherNav.map((item, index) => {
                            return (
                                <DrawerItems
                                    title={item}
                                    key={index}
                                    navigation={props.navigation}
                                    focused={props.state.index === index ? true : false}
                                    props={props}
                                />
                            );
                        })}
                    </View>
                </View>
                <View
                    style={{ marginTop: 20, borderWidth: StyleSheet.hairlineWidth, marginHorizontal: 12, borderColor: "white" }}
                />

                <View style={{ marginTop: 2, marginBottom: 10 }}>
                    {user ? <DrawerItems title="Log Out" navigation={props.navigation} />
                        :
                        <>
                            <DrawerItems title="Log In" navigation={props.navigation} />
                            <DrawerItems title="Register" navigation={props.navigation} />
                        </>
                    }
                </View>
            </DrawerContentScrollView>


        </View >
    );
}

const styles = StyleSheet.create({
    drawerContent: {
        flex: 1
    },
    underline: {
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
        textDecorationColor: "white"
    },
    userInfoScreen: {
        alignItems: 'center',
        marginTop: 10
    },
    title: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold'
    },
    caption: {
        fontSize: 14,
        lineHeight: 14
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3,
    },
    drawerSection: {
        marginTop: 15,

    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    prefence: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16
    }
})

export default DrawerContent






