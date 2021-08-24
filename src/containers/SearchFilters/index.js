import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Picker } from '@react-native-community/picker';
import { vh, vw } from '../../Dimensions'
import {
    BackButton,
    Heading
} from "../../components"


const SearchFilter = ({ navigation }) => {

    const [state, setState] = useState({
        price: '',
        productName: '',
        rating: '',
        productTerm: '',
        productTag: ''
    })
    const [payRole, setPayRole] = React.useState('Hourly');


    const handleChange = () => {

    }
    const renderInput = (val, label, placeHolder, state) => {
        return (
            <View style={{ marginVertical: 15 }} >
                <Text style={{ paddingHorizontal: 5, fontSize: 16, fontWeight: 'bold', color: '#bdbdbd' }}>{label}</Text>
                <TextInput style={{ backgroundColor: 'transparent', height: 30 }} placeholder={placeHolder} value={val} onChange={handleChange(state)} />
            </View>
        )

    }

    const renderCategories = () => {
        return (
            <View style={{
                borderColor: '#bdbdbd',
                borderBottomWidth: 1,
                marginVertical: 10
            }} >
                <Text style={{ paddingHorizontal: 5, fontSize: 16, fontWeight: 'bold', color: '#bdbdbd' }}>Category</Text>

                <Picker
                    selectedValue={payRole}
                    style={{ height: 40, width: null, color: 'black',marginLeft:10 }}
                    onValueChange={(itemValue, itemIndex) =>
                        setPayRole(itemValue)
                    }
                    // mode="d"
                    itemStyle={{ backgroundColor: "pink" }}
                
                >
                    <Picker.Item label="Womens's" value="full" />
                    <Picker.Item label="Men" value="part" />
                    <Picker.Item label="Old" value="old" />
                </Picker>
            </View>
        )
    }

    return (
        <ScrollView style={{ flex: 1, backgroundColor: "#FEFBEA" }}>
            <View style={{ marginHorizontal: 15 }}>
                <BackButton navigation={navigation} />
                <Heading heading="Search Filter" />
            </View>
            <View style={{ marginHorizontal: 15, marginVertical: 15 }}>
                {renderCategories()}

                {renderInput(state.price, 'Price', '$0 -$10', state)}
                {renderInput(state.productName, 'Product Name', 'Enter Product Name', state)}
                {renderInput(state.rating, 'Rating', 'Product rating', state)}
                {renderInput(state.productTerm, 'Product Term', 'Product Term', state)}
                {renderInput(state.productTag, 'Product Tag', 'Product Tag', state)}

                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ backgroundColor: '#ADD8E6', justifyContent: 'center', alignItems: 'center', paddingVertical: 10, width: '100%', alignSelf: 'center' }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Apply Filters</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>

    );
}


export default SearchFilter;