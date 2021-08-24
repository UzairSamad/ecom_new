import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import React from "react"
import { AuthStack, CartStack, AppointmentStack, NotiticationStack, PaymentStack } from "./Stack"
import AntDesign from "react-native-vector-icons/AntDesign"
import Ionicons from "react-native-vector-icons/Ionicons"

const Tab = createMaterialBottomTabNavigator();

function HomeTabNavigation() {

    return <Tab.Navigator
        barStyle={{
            backgroundColor: "#ADD8E6",
        }}
        activeColor="#FEFBEA"
    >
        <Tab.Screen name="Home" component={AuthStack}
            options={{
                tabBarIcon: ({ color }) => {
                    return (
                        <AntDesign name="home" size={24} color="white" />
                    )
                }
            }}
        />
        <Tab.Screen name="Cart" component={CartStack}
            options={{
                tabBarIcon: ({ color }) => {
                    return (
                        <AntDesign name="shoppingcart" size={24} color="white" />
                    )
                }
            }}
        />
        <Tab.Screen name="Appointment" component={AppointmentStack}
            options={{
                tabBarIcon: ({ color }) => {
                    return (
                        <AntDesign name="calendar" size={24} color="white" />
                    )
                }
            }}
        />
        <Tab.Screen name="Notification" component={NotiticationStack}
            options={{
                tabBarIcon: ({ color }) => {
                    return (
                        <Ionicons name="notifications-outline" size={24} color="white" />
                    )
                }
            }}
        />
    </Tab.Navigator>
}

function CartTabNavigator() {

    return <Tab.Navigator
        barStyle={{
            backgroundColor: "#ADD8E6",
        }}
        activeColor="#FEFBEA"
        initialRouteName="Cart"
    >
        <Tab.Screen name="Home" component={AuthStack}
            options={{
                tabBarIcon: ({ color }) => {
                    return (
                        <AntDesign name="home" size={24} color="white" />
                    )
                }
            }}
        />
        <Tab.Screen name="Cart" component={CartStack}
            options={{
                tabBarIcon: ({ color }) => {
                    return (
                        <AntDesign name="shoppingcart" size={24} color="white" />
                    )
                }
            }}
        />
        <Tab.Screen name="Appointment" component={AppointmentStack}
            options={{
                tabBarIcon: ({ color }) => {
                    return (
                        <AntDesign name="calendar" size={24} color="white" />
                    )
                }
            }}
        />
        <Tab.Screen name="Notification" component={NotiticationStack}
            options={{
                tabBarIcon: ({ color }) => {
                    return (
                        <Ionicons name="notifications-outline" size={24} color="white" />
                    )
                }
            }}
        />
    </Tab.Navigator>
}

function PaymentTabNavigator() {

    return <Tab.Navigator
        barStyle={{
            backgroundColor: "#ADD8E6",
        }}
        activeColor="#FEFBEA"
        initialRouteName="Home"
    >
        <Tab.Screen name="Home" component={PaymentStack}
            options={{
                tabBarIcon: ({ color }) => {
                    return (
                        <AntDesign name="home" size={24} color="white" />
                    )
                }
            }}
        />
        <Tab.Screen name="Cart" component={CartStack}
            options={{
                tabBarIcon: ({ color }) => {
                    return (
                        <AntDesign name="shoppingcart" size={24} color="white" />
                    )
                }
            }}
        />
        <Tab.Screen name="Appointment" component={AppointmentStack}
            options={{
                tabBarIcon: ({ color }) => {
                    return (
                        <AntDesign name="calendar" size={24} color="white" />
                    )
                }
            }}
        />
        <Tab.Screen name="Notification" component={NotiticationStack}
            options={{
                tabBarIcon: ({ color }) => {
                    return (
                        <Ionicons name="notifications-outline" size={24} color="white" />
                    )
                }
            }}
        />
    </Tab.Navigator>
}

export {
    HomeTabNavigation,
    CartTabNavigator,
    PaymentTabNavigator
}