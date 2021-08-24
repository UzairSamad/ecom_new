import React, { useEffect, useState } from "react"
import { View, Text } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import Octicons from "react-native-vector-icons/Octicons"
import AntDesign from "react-native-vector-icons/AntDesign"

const Header = ({ navigation, filter }) => {

    const [selectedLanguage, setSelectedLanguage] = useState();
    return (
        <>
          
            <View style={{ marginHorizontal: 20, marginTop: 20, flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                <TouchableOpacity onPress={() => navigation.openDrawer()}>
                    <Octicons name="three-bars" size={24} />
                </TouchableOpacity>
        

                <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => navigation.navigate("SearchFilters")}>
                    {/* <View >
                    <AntDesign name="shoppingcart" size={28} style={{ marginRight: 10 }} />
                    <View style={{position:"absolute",right:10,height:12,width:12,backgroundColor:"orange",borderRadius:1000,justifyContent:"center",alignSelf:"center",alignItems:"center"}}>
                        <Text style={{color:"white",fontSize:8}}>1</Text>
                    </View>
                </View> */}
                    {
                        filter ? <AntDesign name="filter" size={28} /> : null
                    }
                </TouchableOpacity>
            </View>
        </>
    )
}

export default Header