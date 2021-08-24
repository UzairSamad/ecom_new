import React, {
    useEffect,
    useState
} from "react"
import {
    View,
    TouchableOpacity,
    SafeAreaView,
    Text,
    StyleSheet,
    TextInput,
    ToastAndroid
} from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import AntDesign from "react-native-vector-icons/AntDesign"
import Entypo from "react-native-vector-icons/Entypo"
import { vh, vw } from '../../Dimensions'
import { createResource } from "../../WebApiServices/SimpleApiCalls";
import { reset_password } from "../../WebApiServices/WebServices";
import { SpinnerLoader } from '../../components'

const NewPassword = ({ navigation, route }) => {
    const { email } = route.params

    const [secure, setSecure] = useState(true)
    const [secure2, setSecure2] = useState(true)
    const [password, setPassword] = useState('')
    const [code, setCode] = useState('')
    const [cnfrmPassWord, setConfirmPassword] = useState('')
    const [isLoading, setIsloading] = useState(false)


    const handleResetPassword = async () => {
        try {
            if (password === cnfrmPassWord) {
                setIsloading(true)
                let res = await createResource(reset_password, { email, code, password })
                setIsloading(false)
                ToastAndroid.showWithGravity(res?.data?.message, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50)
                setTimeout(() => {
                    navigation.navigate("Login")
                }, 2000);

            } else if (password === '') {
                ToastAndroid.showWithGravity("Password is required", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50)
            }
            else {
                ToastAndroid.showWithGravity("Confirm Password are doesn't match", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50)
            }

        } catch (err) {
            console.log(err.response.data.message, 'errerrerr')
            setIsloading(false)

            ToastAndroid.showWithGravity(err?.response?.data?.message, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50)
            x
        }
    }


    return (
        <>
            <SpinnerLoader isLoading={isLoading} />
            <SafeAreaView style={{ backgroundColor: "#FEFBEA", flex: 1, }}>
                <View style={{ marginHorizontal: 10 }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ marginTop: 20 }}>
                        <Ionicons name="arrow-back" size={30} color="#C5CCD6" />
                    </TouchableOpacity>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ color: "#323232", fontSize: 30 }}>New Password</Text>
                    </View>

                    <View style={{ marginTop: 30 }}>
                        <View style={{ marginTop: 30 }}>
                            <Text style={{ color: "#A6A6A6", fontSize: 16 }}>Verification Code</Text>
                            <TextInput
                                style={{
                                    borderBottomWidth: 1,
                                    borderColor: '#A6A6A6',
                                    marginTop: -15,
                                    color: "#404040",
                                }}
                                value={code}
                                onChangeText={text => setCode(text)}

                            />

                        </View>
                        <View style={{ marginTop: 30 }}>
                            <Text style={{ color: "#A6A6A6", fontSize: 16 }}>Password</Text>
                            <TextInput
                                style={{
                                    borderBottomWidth: 1,
                                    borderColor: '#A6A6A6',
                                    marginTop: -15,
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
                        <View style={{ marginTop: 30 }}>
                            <Text style={{ color: "#A6A6A6", fontSize: 16 }}>Confirm Password</Text>
                            <TextInput
                                style={{
                                    borderBottomWidth: 1,
                                    borderColor: '#A6A6A6',
                                    marginTop: -15,
                                    color: "#404040",
                                }}
                                secureTextEntry={secure2}
                                value={cnfrmPassWord}
                                onChangeText={text => setConfirmPassword(text)}

                            />
                            <TouchableOpacity style={{
                                position: "absolute",
                                right: 0,
                                top: 30,
                            }}
                                onPress={() => setSecure2(!secure2)}
                            >
                                {secure2 ?
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

                    <View style={{ justifyContent: "center", alignItems: "center", marginTop: vh * 0.1, paddingVertical: vh * 0.08 }}>
                        <TouchableOpacity style={{
                            backgroundColor: "#ADD8E6",
                            width: "80%",
                            paddingVertical: 10,
                            borderRadius: 5,
                            elevation: 20
                        }}
                            onPress={() => handleResetPassword()}
                        >
                            <Text style={{ textAlign: "center", color: "white", fontSize: 16 }}>Confirm</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </SafeAreaView>
        </>
    )
}

export default NewPassword