import 'react-native-gesture-handler';

import * as React from 'react';
import { View, TouchableOpacity, Image, useWindowDimensions, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {
    Login,
    Register,
    Home,
    Cart,
    NewPassword,
    ForgetPassword,
    Address,
    Payment,
    PaymentMethod,
    ProductDetail,
    CreateAddress,
    MyOrders,
    Checkout,
    Appointment,
    AddAppointment,
    Profile,
    AboutUs,
    Privacy,
    SearchFilters,
    Promotions,
    Notification,
    NotificationDetail,
    FAQS,
    AddCreditCard,
    OrderAgainDetails,
    OrderStatusScreen,

    StatusList,
    Status
} from "../containers"
import { Confirmation } from "../components"
import { HomeTabNavigation } from "./Bottom"
const Stack = createStackNavigator();

const NavigationDrawerStructure = (props) => {
    //Structure for the navigatin Drawer
    const toggleDrawer = () => {
        //Props to open/close the drawer
        props.navigationProps.toggleDrawer();
    };

    return (
        <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => toggleDrawer()}>
                {/*Donute Button Image */}
                <EvilIcons
                    name="navicon"
                    color="black"
                    size={24}
                />
            </TouchableOpacity>
        </View>
    );
}

const LoginStack = ({ navigation }) => {
    return <Stack.Navigator>
        <Stack.Screen
            name="LogIn"
            component={Login}
            options={{
                headerShown: false
            }}
        />
        <Stack.Screen
            name="Register"
            component={Register}
            options={{
                headerShown: false
            }}
        />
               <Stack.Screen
            name="ForgetPassword"
            component={ForgetPassword}
            options={{
                headerShown: false
            }}
        />
        <Stack.Screen
            name="NewPassword"
            component={NewPassword}
            options={{
                headerShown: false
            }}
        />

    </Stack.Navigator>
}

const AuthStack = ({ navigation }) => {
    return <Stack.Navigator>
        <Stack.Screen
            name="Home"
            component={Home}
            options={{
                headerShown: false
            }}
        />
        <Stack.Screen
            name="ProductDetail"
            component={ProductDetail}
            options={{
                headerShown: false
            }}
        />
        <Stack.Screen
            name="SearchFilters"
            component={SearchFilters}
            options={{
                headerShown: false
            }}
        />
    </Stack.Navigator>
}

const CartStack = ({ navigation }) => {
    return <Stack.Navigator initialRouteName='Cart'>
        <Stack.Screen
            name="Cart"
            component={Cart}
            options={{
                headerShown: false
            }}
        />
        <Stack.Screen
            name="Login"
            component={Login}
            options={{
                headerShown: false
            }}
        />
        <Stack.Screen
            name="ForgetPassword"
            component={ForgetPassword}
            options={{
                headerShown: false
            }}
        />
        <Stack.Screen
            name="NewPassword"
            component={NewPassword}
            options={{
                headerShown: false
            }}
        />
        <Stack.Screen
            name="Register"
            component={Register}
            options={{
                headerShown: false
            }}
        />

    </Stack.Navigator>
}

const OrderStack = ({ navigation }) => {
    return <Stack.Navigator>
        <Stack.Screen
            name="Orders"
            component={MyOrders}
            options={{
                headerShown: false
            }}
        />
        <Stack.Screen
            name="OrdersDetails"
            component={OrderAgainDetails}
            options={{
                headerShown: false
            }}
        />
        <Stack.Screen
            name="OrderStatus"
            component={OrderStatusScreen}
            options={{
                headerShown: false
            }}
        />

    </Stack.Navigator>
}
const OrderStatus = ({ navigation }) => {
    return <Stack.Navigator>
        <Stack.Screen
            name="OrderStatusList"
            component={StatusList}
            options={{
                headerShown: false
            }}
        />
        <Stack.Screen
            name="OrderStatus"
            component={Status}
            options={{
                headerShown: false
            }}
        />

    </Stack.Navigator>
}

const NotiticationStack = ({ }) => {
    return <Stack.Navigator>
        <Stack.Screen
            name="Notification"
            component={Notification}
            options={{
                headerShown: false
            }}
        />
        <Stack.Screen
            name="NotificationDetails"
            component={NotificationDetail}
            options={{
                headerShown: false
            }}
        />

    </Stack.Navigator>
}

const AppointmentStack = ({ navigation }) => {
    return <Stack.Navigator>
        <Stack.Screen
            name="Appointment"
            component={Appointment}
            options={{
                headerShown: false
            }}
        />

        <Stack.Screen
            name="AddAppointment"
            component={AddAppointment}
            options={{
                headerShown: false
            }}
        />

    </Stack.Navigator>
}

const PromotionStack = ({ navigation }) => {
    return <Stack.Navigator>
        <Stack.Screen
            name="Promotion"
            component={Promotions}
            options={{
                headerShown: false
            }}
        />

        <Stack.Screen
            name="ProductDetail"
            component={ProductDetail}
            options={{
                headerShown: false
            }}
        />

    </Stack.Navigator>
}

const PaymentStack = ({ navigation }) => {
    return <Stack.Navigator >
             <Stack.Screen
            name="Address"
            component={Address}
            options={{
                headerShown: false
            }}
        />
        <Stack.Screen
            name="Payment"
            component={Payment}
            options={{
                headerShown: false
            }}
        />

        <Stack.Screen
            name="PaymentDetails"
            component={PaymentMethod}
            options={{
                headerShown: false
            }}
        />
        <Stack.Screen
            name="AddCreditCard"
            component={AddCreditCard}
            options={{
                headerShown: false
            }}
        />
        {/* <Stack.Screen
            name="Address"
            component={Address}
            options={{
                headerShown: false
            }}
        /> */}
        <Stack.Screen
            name="CreateAddress"
            component={CreateAddress}
            options={{
                headerShown: false
            }}
        />
        <Stack.Screen
            name="Checkout"
            component={Checkout}
            options={{
                headerShown: false
            }}
        />
        <Stack.Screen
            name="Confirmation"
            component={Confirmation}
            options={{
                headerShown: false
            }}
        />

    </Stack.Navigator>
}

export {
    CartStack,
    AuthStack,
    PromotionStack,
    AppointmentStack,
    NotiticationStack,
    OrderStack,
    PaymentStack,
    OrderStatus,
    LoginStack
}
