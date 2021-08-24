import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../AppContext'
class DrawerItem extends React.Component {


    async removeItemValue(key) {
        try {
            await AsyncStorage.removeItem(key);
            return true;
        }
        catch (exception) {
            return false;
        }
    }

    clearDataAndNavigate = () => {
        alert("faed")
        // navigation.navigate("Login")
    }
    render() {
        const { focused, title, navigation, props } = this.props;
        const { setUser } = this.context
        const handleLogOut = () => {
            this.removeItemValue('user')
            setUser(null)
            navigation.navigate("Login")
        }
        return (
            <TouchableOpacity
                style={{ height: 35 }}
                onPress={() => {
                    title == "Log Out" ? handleLogOut() :
                        title == "Log In" ? navigation.navigate("Login") :
                            title == "Register" ? navigation.navigate("Register") :
                                title == "Home" ? navigation.navigate("Home")
                                    : navigation.navigate(title)
                    // title == "Log Out" && this.removeItemValue('user')
                }
                }
            >
                <View style={{ marginLeft: 20 }}>
                    <View >
                        <Text
                            style={{
                                color: "black",
                                fontSize: 18,
                                fontWeight: "bold"
                            }}
                        >
                            {title}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    inactive: {
        color: 'white',
        marginTop: 2,
        marginLeft: 10
    },

    activeIcon: {
        color: "#009C84",
        height: 15,
        width: 15
    },
    inActiveIcon: {
        color: "white",
        height: 15,
        width: 15
    },

    activeStyle: {
        borderRadius: 30,
        marginTop: 2,
        color: "#009C84",
        marginLeft: 10
    },
    viewActive: {
        flexDirection: 'row',
        alignContent: 'stretch',
        backgroundColor: 'white',
        flex: 1,
        height: 40,
        alignItems: 'center',
        borderRadius: 20,
        paddingLeft: 15,
        marginHorizontal: 10
    },
    viewInActive: {
        flexDirection: 'row',
        alignContent: 'stretch',
        flex: 1,
        height: 40,
        alignItems: 'center',

        paddingLeft: 15,
        marginHorizontal: 10
    }

});

DrawerItem.contextType = AppContext
export default DrawerItem;