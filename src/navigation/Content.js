import 'react-native-gesture-handler';

import * as React from 'react';
import { View, TouchableOpacity, Image, useWindowDimensions, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './Drawer'
import { Confirmation } from "../components"
import { AppContext } from '../AppContext'
import {
  Profile, ContactUs, AboutUs, Privacy, FAQS, ShareApp, Promotions, Home,
  ProductDetail, SearchFilters, Login, Services, Register, Address, Payment,
  PaymentMethod, Cart, Checkout, AddCreditCard, CreditCards, Review,NewPassword,ForgetPassword
} from "../containers"
import { HomeTabNavigation, CartTabNavigator, PaymentTabNavigator } from "./Bottom"
import { OrderStack, PromotionStack, OrderStatus } from './Stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { CartStack, AppointmentStack, NotiticationStack, PaymentStack } from "./Stack"
import AntDesign from "react-native-vector-icons/AntDesign"
import Ionicons from "react-native-vector-icons/Ionicons"
import { CreateAddress } from '../containers';
const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();
const Tab = createMaterialBottomTabNavigator();
const DrawerNavigation = () => {
  const dimensions = useWindowDimensions();
  const isLargeScreen = dimensions.width >= 768;

  return (
    <Drawer.Navigator
      // drawerType={isLargeScreen ? 'permanent' : 'back'}
      drawerStyle={isLargeScreen ? null : { width: '70%' }}
      drawerContent={props => <CustomDrawerContent {...props} />}
      initialRouteName="Home"
    >
      <Drawer.Screen
        name="Home"
        component={AuthStack}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Services"
        component={Services}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Profile"
        component={Profile}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Promotions / Deals"
        component={Promotions}
      ></Drawer.Screen>
      <Drawer.Screen
        name="My Cart"
        component={CartStack}
      ></Drawer.Screen>
      <Drawer.Screen
        name="My Order"
        component={OrderStack}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Contact Us"
        component={ContactUs}
      ></Drawer.Screen>
      <Drawer.Screen
        name="About Us"
        component={AboutUs}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Privacy"
        component={Privacy}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Faqs"
        component={FAQS}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Share App"
        component={ShareApp}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Payment Method"
        component={PaymentStack}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Status"
        component={OrderStatus}
      ></Drawer.Screen>
      <Drawer.Screen
        name="HomeTabs"
        component={Home}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Login"
        component={Login}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Register"
        component={Register}
      ></Drawer.Screen>
      <Drawer.Screen
        name="ForgetPassword"
        component={ForgetPassword}
        options={{
          headerShown: false
        }}
      />
      <Drawer.Screen
        name="NewPassword"
        component={NewPassword}
        options={{
          headerShown: false
        }}
      />
      <Drawer.Screen
        name="Address"
        component={Address}
      ></Drawer.Screen>
      <Drawer.Screen
        name="Payment"
        component={Payment}
      />

      <Drawer.Screen
        name="PaymentDetails"
        component={PaymentMethod}

      />
      <Drawer.Screen
        name="CreditCards"
        component={CreditCards}

      />
      <Drawer.Screen
        name="Review"
        component={Review}

      />
      <Drawer.Screen
        name="AddCreditCard"
        component={AddCreditCard}

      />
      {/* <Drawer.Screen
            name="Address"
            component={Address}
            options={{
                headerShown: false
            }}
        /> */}
      <Drawer.Screen
        name="CreateAddress"
        component={CreateAddress}

      />
      <Drawer.Screen
        name="Checkout"
        component={Checkout}

      />
      <Drawer.Screen
        name="Confirmation"
        component={Confirmation}
      />


      {/* <Drawer.Screen
          name="Appointment"
          component={AppointmentStack}
        ></Drawer.Screen>
        <Drawer.Screen
          name="My Cart"
          component={HomeTabNavigation}
        ></Drawer.Screen>
        <Drawer.Screen
          name="My Order"
          component={OrderStack}
        ></Drawer.Screen>
        <Drawer.Screen
          name="Profile"
          component={Profile}
        ></Drawer.Screen>
        <Drawer.Screen
          name="About Us"
          component={AboutUs}
        ></Drawer.Screen>
        <Drawer.Screen
          name="Promotions / Deals"
          component={PromotionStack}
        ></Drawer.Screen>
        <Drawer.Screen
          name="Privacy"
          component={Confirmation}
        ></Drawer.Screen>
        <Drawer.Screen
          name="Faqs"
          component={FAQS}
        ></Drawer.Screen> */}
    </Drawer.Navigator>
  )
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

const HomeScreen = ({ navigation }) => {
  return <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={DrawerNavigation}
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


function ContentForDrawer({ navigation }) {

  const context = React.useContext(AppContext)
  const { user, setUser, cartData } = context

  React.useEffect(() => {
    getUserDetails()
  }, [])

  const getUserDetails = async () => {
    let item = await AsyncStorage.getItem("user")
    item = JSON.parse(item)
    setUser(item)
  }

  console.log(user, "SSSSSSSSSSSSSSSSSSSSs");

  return (
    <NavigationContainer>
      {/* {HomeTabNavigation()} */}
      <Tab.Navigator
        barStyle={{
          backgroundColor: "#ADD8E6",
        }}
        activeColor="#FEFBEA"
      >
        <Tab.Screen name="Home" component={DrawerNavigation}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              navigation.navigate("HomeTabs"); // Here!!!!!!!!!!!!!!!!!!!!!!!!!!!!
            },
          })}
          options={{
            tabBarIcon: ({ color }) => {
              return (
                <AntDesign name="home" size={24} color="white" />
              )
            },
          }}
        />
        <Tab.Screen name="Cart" component={CartStack}
          options={{
            tabBarIcon: ({ color }) => {
              return (
                <AntDesign name="shoppingcart" size={24} color="white" />
              )
            },
            tabBarBadge: cartData.length,
            tabBarBadgeStyle: { backgroundColor: 'blue' }
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
    </NavigationContainer>
  );
}

export default ContentForDrawer;