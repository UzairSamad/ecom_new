import Spinner from 'react-native-loading-spinner-overlay';
import React from "react"
import { ActivityIndicator } from "react-native"

const Loader = ({ isLoading }) => {
    console.log(isLoading,"isLoadingisLoadingisLoadingisLoading");
    return (
        <Spinner
            //visibility of Overlay Loading Spinner
            visible={isLoading}
            customIndicator={<ActivityIndicator color="#ADD8E6" size="large" />}
        />
    )
}

export default Loader