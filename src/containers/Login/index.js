import React, {
    useState,
    useContext,
    useEffect
} from "react"
import {
    View,
    TouchableOpacity,
    SafeAreaView,
    Text,
    StyleSheet,
    ToastAndroid,
    TextInput,
    // ActivityIndicator
} from "react-native"
import { AppContext } from "../../AppContext"
import Ionicons from "react-native-vector-icons/Ionicons"
import AntDesign from "react-native-vector-icons/AntDesign"
import Entypo from "react-native-vector-icons/Entypo"
import { createResource } from "../../WebApiServices/SimpleApiCalls";
import { user_login } from "../../WebApiServices/WebServices";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CustomModal, SpinnerLoader } from '../../components'
import messaging from '@react-native-firebase/messaging';
const Login = ({ navigation }) => {
    const [fcm, setFcm] = useState("")
    useEffect(() => {
        let enabled = messaging().hasPermission()
        console.log(enabled, "ENABLEDDDDDD");
        if (enabled) {
            getToken()
        }

    })

    const getToken = async () => {
        let token = await messaging().getToken()
        setFcm(token)
        console.log(token, "TOKEEEEEEEEEEEEEEEEEE");
    }
    console.log(fcm,"FCMMMMMMMMMMMMMMMMMMMM");
    const context = useContext(AppContext)
    const { setUser, user ,cartData} = context
    console.log(cartData,'cartDatacartDatacartData')
    console.log(setUser, user);
    const [secure, setSecure] = useState(true)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showError, setShowError] = useState(false)
    const [showSucces, setShowSuccess] = useState(false)
    const [isLoading, setIsloading] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [modalMessage, setModalMessage] = useState('')

    const handleLogin = async () => {
        let data = {
            email,
            password,
            fcm
        }
        const _storeData = async (user) => {
            try {
                await AsyncStorage.setItem(
                    'user',
                    user
                );
            } catch (error) {
                // Error saving data
            }
        };
        const _storeDataToken = async (token) => {
            // alert('caleddd token')
            try {
                await AsyncStorage.setItem(
                    'token',
                    token
                );
            } catch (error) {
                // Error saving data
            }
        };

        if (email == '' || password.length == '') {
            ToastAndroid.showWithGravity("Password and Email is required", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50)
        } else {
            try {
                setIsloading(true)
                let res = await createResource(user_login, data)
                console.log(res, "RESSSSSSSSSSSSSSSSSSSS");
                setUser(res.data.data)
                setIsloading(false)
                setEmail('')
                setPassword('')
                let user = await JSON.stringify(res.data.data)
                // let token = await res.data.data.token
                ToastAndroid.showWithGravity("Logged In Succesfully", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50)
                await _storeData(user)
                if(cartData.length > 0){
                    navigation.navigate("Cart")
                }else{
                    navigation.navigate("Home")
                }
                // await _storeDataToken(token)
                // navigation.goBack()
            }
            catch (error) {
                setIsloading(false)
                // console.log(error.response.data.error,'ressss')
                ToastAndroid.showWithGravity("Failed to login", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50)
            }


            // }).catch(err => {
            //     console.log(err);
            // })

        }

    }
    // let user = AsyncStorage.getItem('user')
    // console.log(user, 'userrrrrrr')
    // console.log(JSON.parse(user), 'userrrrrrr')
    return (
        <>
            <SpinnerLoader isLoading={isLoading} />

            <SafeAreaView style={{ backgroundColor: "#FEFBEA", flex: 1, }}>
                <CustomModal isVisible={showModal} Message={modalMessage} />

                <View style={{ marginHorizontal: 10 }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ marginTop: 20 }}>
                        <Ionicons name="arrow-back" size={30} color="#C5CCD6" />
                    </TouchableOpacity>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ color: "#323232", fontSize: 30 }}>Login</Text>
                    </View>
                    <View style={{ marginTop: 30 }}>
                        <View>
                            <Text style={{ color: "#A6A6A6", fontSize: 16 }}>Email</Text>
                            <TextInput
                                style={{
                                    borderBottomWidth: 1,
                                    marginTop: -15,
                                    borderColor: '#A6A6A6',
                                    color: "#404040"
                                }}
                                value={email}
                                onChangeText={text => setEmail(text)}
                            />
                        </View>
                        <View style={{ marginTop: 30 }}>
                            <Text style={{ color: "#A6A6A6", fontSize: 16 }}>Password</Text>
                            <TextInput
                                style={{
                                    borderBottomWidth: 1,
                                    marginTop: -15,
                                    borderColor: '#A6A6A6',
                                    color: "#404040",
                                }}
                                secureTextEntry={secure}
                                value={password}
                                onChangeText={text => setPassword(text)}

                            />
                            <TouchableOpacity style={{
                                position: "absolute",
                                right: 0,
                                top: 30,
                            }}
                                onPress={() => setSecure(!secure)}
                            >
                                {secure ?
                                    <AntDesign name="eye"
                                        color="#C6CBD4"
                                        size={24}
                                    />
                                    :
                                    <Entypo name="eye-with-line"
                                        color="#C6CBD4"
                                        size={24}
                                    />
                                }
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ justifyContent: "center", alignItems: "center", marginTop: 50 }}>

                        <TouchableOpacity style={{
                            backgroundColor: "#ADD8E6",
                            width: "80%",
                            paddingVertical: 10,
                            borderRadius: 5,
                            elevation: 20
                        }}
                            onPress={() => handleLogin()}
                        >
                            <Text style={{ textAlign: "center", color: "white", fontSize: 16 }}>Log in</Text>
                        </TouchableOpacity>

                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("ForgetPassword")}
                        style={{ marginTop: 20, justifyContent: "flex-end", alignItems: "flex-end", marginHorizontal: 30 }}>
                        <Text style={{
                            fontStyle: "italic",
                            color: '#3FA9F5',
                            fontWeight: 'bold'
                        }}>Forgot Password?</Text>
                    </TouchableOpacity>
                    <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "center", marginTop: 20 }}>
                        <Text>
                            Don't have an account ?
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                            <Text style={{ color: "#404040", fontWeight: "bold" }}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </>
    )
}

export default Login