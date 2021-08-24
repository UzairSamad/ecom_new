import React, {
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
import { vh, vw } from '../../Dimensions'
import { createResource } from "../../WebApiServices/SimpleApiCalls";
import { forget_password } from "../../WebApiServices/WebServices";
import { SpinnerLoader } from '../../components'


const ForgetPassword = ({ navigation }) => {
    const [secure, setSecure] = useState(true)
    const [email, setEmail] = useState('')
    const [isLoading, setIsloading] = useState(false)

    const handleForgotPass = async () => {
        try {
            if (email !== '') {
                setIsloading(true)

                let res = await createResource(forget_password, { email })
                console.log(res, "RESSSSSSSSSSSSSSSSSSSS");
                setIsloading(false)
                ToastAndroid.showWithGravity(res?.data?.message, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50)

                setTimeout(() => {
                    navigation.navigate("NewPassword", { email })
                }, 2000);

            } else {
                ToastAndroid.showWithGravity("Email is required", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50)

            }

        } catch (err) {
            console.log(err.response.data.message, 'errerrerr')
            setIsloading(false)

            ToastAndroid.showWithGravity(err?.response?.data?.message, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50)

        }
    }
    return (<>
        <SpinnerLoader isLoading={isLoading} />

        <SafeAreaView style={{ backgroundColor: "#FEFBEA", flex: 1 }}>
            <View style={{ marginHorizontal: 10 }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ marginTop: 20 }}>
                    <Ionicons name="arrow-back" size={30} color="#C5CCD6" />
                </TouchableOpacity>
                <View style={{ marginTop: 10 }}>
                    <Text style={{ color: "#323232", fontSize: 30 }}>Forget Password</Text>
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
                </View>

                <View style={{ justifyContent: "center", alignItems: "center", marginTop: vh * 0.2, paddingVertical: 25 }}>
                    <TouchableOpacity style={{
                        backgroundColor: "#ADD8E6",
                        width: "80%",
                        paddingVertical: 10,
                        borderRadius: 5,
                        elevation: 20
                    }}
                        onPress={_ => handleForgotPass()}
                    >
                        <Text style={{ textAlign: "center", color: "white", fontSize: 16 }}>Next</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </SafeAreaView>
    </>
    )
}

export default ForgetPassword