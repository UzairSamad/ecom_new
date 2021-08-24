import React, { createContext, useState, memo, useEffect } from 'react';
import {
    get_products,
    get_services,
    get_user_appointments,
    create_appoitment,
    create_order,
    get_user_order,
    get_user_address,
    delete_address,
    create_address,
    contact_us,
    get_promotions,
    create_creditCard,
    get_notification,
    getAllCards
} from './WebApiServices/WebServices';
import { createResource, getResource, } from './WebApiServices/SimpleApiCalls';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from "react-native-simple-toast"

export const AppContext = createContext();
const AppProvider = props => {

    const [isLoading, setIsloading] = useState(false);
    const [image, setImage] = useState('');
    const [products, setProducts] = useState([])
    const [promotions, setPromotions] = useState([])
    const [categories, setCategories] = useState([])
    const [services, setServices] = useState([])
    const [userAppointments, setUserAppointments] = useState([])
    const [user, setUser] = React.useState(null)
    const [userOrders, setUserOrders] = React.useState([])
    const [userAddress, setUserAddress] = React.useState([])
    const [userToken, setUsertoken] = React.useState(null)
    const [cartData, setCartData] = React.useState([])
    const [userCreditCards, setUserCreditCards] = React.useState([])
    const [selectedUserCard, setSelectedUserCard] = React.useState(null)
    const [paymentType,setPaymentType] = useState(null)
    const [adressDummyData, setAddressDummyData] = React.useState([
        'Shewrapara, Mirpur, Dhaka-1216 House no: 938 Road no: 9',
    ])
    const [selecteAdress, setSelectedAddress] = useState('')
    const [notification, setNotification] = useState("")

    React.useEffect(() => {
        // alert('calledd')

        _retrieveData()
    }, [])


    const _retrieveData = async () => {
        try {

            const value = await AsyncStorage.getItem('user');
            const userToken = await AsyncStorage.getItem('token');
            if (value !== null) {
                // We have data!!
                console.log(JSON.parse(value), 'valueeeee in drawer');
                setUser(JSON.parse(value))
                setUsertoken(userToken)
            }
        } catch (error) {
            // Error retrieving data
        }
    };


    const getProduct = async () => {
        setIsloading(true)
        try {
            let res = await getResource(get_products);
            setIsloading(false);
            setProducts(res.data.data)
        } catch (error) {
            alert(error)
            setIsloading(false);
        }
    }

    const getNotification = async (id) => {
        setIsloading(true)
        try {
            let res = await getResource(`${get_notification}/${id}`);
            setIsloading(false);
            setNotification(res.data.data)
        } catch (error) {
            alert(error)
            setIsloading(false);
        }
    }

    const getUserOrders = async () => {
        setIsloading(true)
        try {
            let res = await getResource(`${get_user_order}/${user?.userDetails._id}`);
            setIsloading(false);
            setUserOrders(res.data.data)
        } catch (error) {
            alert(error)
            setIsloading(false);
        }
    }
    const getUserAddress = async (id) => {
        setIsloading(true)
        try {
            let res = await getResource(`${get_user_address}/${user.userDetails._id}`);
            setIsloading(false);
            setUserAddress(res.data.data)
        } catch (error) {
            alert(error)
            setIsloading(false);
        }
    }
    const getUserCards = async (id) => {
        setIsloading(true)
        try {
            let res = await getResource(`${getAllCards}/${user.userDetails._id}`);
            setIsloading(false);
            setUserCreditCards(res.data.data)
        } catch (error) {
            alert(error)
            setIsloading(false);
        }
    }
    const getPromotions = async () => {
        setIsloading(true)
        try {
            let res = await getResource(get_promotions);
            setIsloading(false);
            setPromotions(res.data.data)
        } catch (error) {
            alert(error)
            setIsloading(false);
        }
    }
    const getServices = async () => {
        setIsloading(true)
        try {
            let res = await getResource(get_services);
            setServices(res.data.data)
            setIsloading(false);
        } catch (error) {
            alert(error)
            setIsloading(false);
        }
    }
    const getUserAppointment = async (id) => {
        setIsloading(true)
        try {
            let res = await getResource(`${get_user_appointments}/${id}`);
            setUserAppointments(res.data.data)
            setIsloading(false);
        } catch (error) {
            alert(error)
            setIsloading(false);
        }
    }

    const createAppoitment = async (data, token, navigation) => {
        setIsloading(true)

        try {
            let res = await createResource(create_appoitment, data, token);
            setIsloading(false)
            Toast.showWithGravity("Appointment Created Successfully", Toast.LONG, Toast.BOTTOM)
            console.log(res, 'appointment create')
            navigation.navigate("Home")
        } catch (error) {
            alert('err')
            setIsloading(false)

        }
    }
    const createUserAddress = async (data) => {
        setIsloading(true)
        try {
            let res = await createResource(create_address, data, user?.token);
            setIsloading(false)
            console.log(res, 'appointment create')
            getUserAddress()
        } catch (error) {
            alert('err')
            setIsloading(false)

        }
    }
    const createCreditCard = async (data) => {
        setIsloading(true)
        try {
            let res = await createResource(create_creditCard, data, user?.token);
            setIsloading(false)
            console.log(res, 'appointment create')
            getUserAddress()
        } catch (error) {
            alert('err')
            setIsloading(false)

        }
    }
    const createOrder = async (data) => {
        // alert(userToken)
        // alert(userToken)
        setIsloading(true)
        try {
            let res = await createResource(create_order, data, JSON.parse(userToken));
            // alert('ressssss')
            setIsloading(true)
        } catch (error) {
            setIsloading(false)
        }
    }
    const createContactUs = async (data) => {
        // alert(userToken)
        // alert(userToken)
        setIsloading(true)
        try {
            let res = await createResource(contact_us, data, JSON.parse(userToken));
            // alert('ressssss')
            setIsloading(true)
        } catch (error) {
            setIsloading(false)
        }
    }




    return (
        <>
            <AppContext.Provider
                value={{
                    getProduct,
                    products,
                    categories,
                    services,
                    getServices,
                    isLoading,
                    createAppoitment,
                    getUserAppointment,
                    userAppointments,
                    user,
                    setUser,
                    setUsertoken,
                    userToken,
                    cartData,
                    setCartData,
                    createOrder,
                    adressDummyData,
                    setAddressDummyData,
                    setSelectedAddress,
                    selecteAdress,
                    getPromotions,
                    promotions,
                    getUserOrders,
                    userOrders,
                    createUserAddress,
                    getUserAddress,
                    userAddress,
                    createContactUs,
                    _retrieveData,
                    getNotification,
                    notification,
                    setIsloading,
                    createCreditCard,
                    getUserCards,
                    userCreditCards,
                    setSelectedUserCard,
                    selectedUserCard,
                    setPaymentType,
                    paymentType
                }}
            >
                {props.children}
            </AppContext.Provider>
        </>
    );
};

export default memo(AppProvider);
