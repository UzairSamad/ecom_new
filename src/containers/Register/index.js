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
    ScrollView,
    Image,
    ActivityIndicator
} from "react-native"
import Ionicons from "react-native-vector-icons/Ionicons"
import AntDesign from "react-native-vector-icons/AntDesign"
import Entypo from "react-native-vector-icons/Entypo"
import { createResource } from "../../WebApiServices/SimpleApiCalls";
import { user_register } from "../../WebApiServices/WebServices";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { SpinnerLoader, CustomModal } from "../../components"
import axios from "axios"
import Toast from 'react-native-simple-toast';

var options = {
    title: 'Select Image',
    includeBase64: true,
    customButtons: [
        {
            name: 'customOptionKey',
            title: 'Choose Photo from Custom Option'
        },
    ],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

const Register = ({ navigation }) => {
    const [secure, setSecure] = useState(true)
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [addressLane, setAddresslane] = useState('')
    const [offcaddress, setoffcaddress] = useState('')
    const [phone, setphone] = useState('')
    const [imageurl, setImageUrl] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [modalMessage, setModalMessage] = useState('')


    const setFilePath = async (e) => {
        console.log(e, "EEEEEEEEE");
        let base64Img = `data:image/jpg;base64,${e.base64}`;
        let data = {
            "file": base64Img,
            "upload_preset": "gu8ylv22"
        }
        // const data = new FormData()
        // data.append('file', e)
        // data.append("upload_preset", "gu8ylv22")
        setLoading(true)
        try {
            const res = await axios.post("https://api.cloudinary.com/v1_1/dhtjlhqw1/image/upload", data)
            console.log(res, "RESSSSSSSSSSSSSSS");
            setImageUrl(res.data.secure_url)
            setLoading(false)
            // const file = await res.json()
        } catch (error) {
            console.log(error, "ERRRRRRRRRRRRRRRRRR");
            setLoading(false)
        }


        // if (file.error) {
        //     alert(file.error)
        //     setLoading(false)
        //     // this.setState({ loading: false })
        // }
        // else {
        //     // this.setState({ avatarSource: file.secure_url, loading: false })
        //     setLoading(false)
        //     setImageUrl(file.secure_url)
        // }
    }

    const LaunchImagePicker = () => {
        launchImageLibrary(options, response => {
            console.log('Response = ', response);
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else {
                setFilePath(response);
            }
        })
    }


    const handleRegister = () => {
        let data = {
            email,
            password,
            name,
            // addressline: addressLane,
            // officeAddress: offcaddress,
            phoneNumber: phone,
            image: imageurl,
            fcm: ""
        }
        if (email == "") {
            // <CustomAlert showAlert={true} message={'Email is required!!!'} type={'Error'} />
            Toast.showWithGravity("Please Enter Email", Toast.LONG, Toast.BOTTOM)
            return
        } else if (password == "" || password.length < 5) {
            // <CustomAlert showAlert={true} message={'Paswword is required!!!'} type={'Error'} />
            Toast.showWithGravity("Password Must be greater than 5 digits", Toast.LONG, Toast.BOTTOM)
            return
        } else if (name == "") {
            // <CustomAlert showAlert={true} message={'Name is required!!!'} type={'Error'} />
            Toast.showWithGravity("Please Enter Name", Toast.LONG, Toast.BOTTOM)
            return

        } else if (phone == "") {
            // <CustomAlert showAlert={true} message={'Phone number is required!!!'} type={'Error'} />
            Toast.showWithGravity("Please Enter Phone", Toast.LONG, Toast.BOTTOM)
            return
        }
        else if (imageurl == null) {
            Toast.showWithGravity("Please Upload Image", Toast.LONG, Toast.BOTTOM)
            return
        }
        else {
            setLoading(true)
            createResource(user_register, data).then(res => {
                Toast.showWithGravity('Registerd  Succesfully', Toast.LONG, Toast.BOTTOM)
                setLoading(false)
                navigation.navigate('Login')
                setEmail('')
                setPassword('')
                setphone('')
                setName('')
                setImageUrl('')

            }).catch(err => {
                // console.log(err.response.data.error, "ERRRRRRRRRRRRRRRRRR");
                setLoading(false)
                Toast.showWithGravity(err.response.data.error, Toast.LONG, Toast.BOTTOM)
            })
        }

    }
    return (
        <>
            <SpinnerLoader isLoading={loading} />
            <SafeAreaView style={{ backgroundColor: "#FEFBEA", flex: 1, }}>

                <ScrollView style={{ marginHorizontal: 10 }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ marginTop: 20 }}>
                        <Ionicons name="arrow-back" size={30} color="#C5CCD6" />
                    </TouchableOpacity>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ color: "#323232", fontSize: 30 }}>Register</Text>
                    </View>
                    <View style={{ justifyContent: "center", alignItems: "center", width: "100%" }}>
                        <Image
                            style={{ height: 100, width: 100, borderRadius: 100 }}
                            source={imageurl ? { uri: imageurl } : require("../../assets/images/avatar.jpg")} />
                        <View style={{ position: "absolute", bottom: -20, right: 0, width: "50%" }}>
                            <TouchableOpacity onPress={LaunchImagePicker} >
                                <Image source={require("../../assets/images/edit.png")} style={{ height: 45, width: 45 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginTop: 30 }}>
                        <View>
                            <Text style={{ color: "#A6A6A6", fontSize: 16 }}>Name</Text>
                            <TextInput
                                style={{
                                    borderBottomWidth: 1,
                                    borderColor: '#A6A6A6',
                                    marginTop: -15,
                                    color: "#404040"
                                }}
                                value={name}
                                onChangeText={text => setName(text)}
                            />
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ color: "#A6A6A6", fontSize: 16 }}>Email</Text>
                            <TextInput
                                style={{
                                    borderBottomWidth: 1,
                                    borderColor: '#A6A6A6',
                                    marginTop: -15,
                                    color: "#404040"
                                }}
                                value={email}
                                onChangeText={text => setEmail(text)}
                            />
                        </View>
                        <View style={{ marginTop: 10 }}>
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
                        {/* <View style={{ marginTop: 10 }}>
                            <Text style={{ color: "#A6A6A6", fontSize: 16 }}>Address lane</Text>
                            <TextInput
                                style={{
                                    borderBottomWidth: 1,
                                    borderColor: '#A6A6A6',
                                    marginTop: -15,
                                    color: "#404040"
                                }}
                                value={addressLane}
                                onChangeText={text => setAddresslane(text)}
                            />
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ color: "#A6A6A6", fontSize: 16 }}>Office Address</Text>
                            <TextInput
                                style={{
                                    borderBottomWidth: 1,
                                    borderColor: '#A6A6A6',
                                    marginTop: -15,
                                    color: "#404040"
                                }}
                                value={offcaddress}
                                onChangeText={text => setoffcaddress(text)}
                            />
                        </View> */}
                        <View style={{ marginTop: 10 }}>
                            <Text style={{ color: "#A6A6A6", fontSize: 16 }}>Phone Number</Text>
                            <TextInput
                                style={{
                                    borderBottomWidth: 1,
                                    borderColor: '#A6A6A6',
                                    marginTop: -15,
                                    color: "#404040"
                                }}
                                value={phone}
                                onChangeText={text => setphone(text)}
                            />
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
                            onPress={_ => handleRegister()}
                        >
                            <Text style={{ textAlign: "center", color: "white", fontSize: 16 }}>Register</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "center", marginVertical: 20 }}>
                        <Text>
                            Already have an account ?
                        </Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Login")}
                        >
                            <Text style={{ color: "#404040", fontWeight: "bold" }}>  Log in</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    )
}

export default Register