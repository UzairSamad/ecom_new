const baseUrl = 'https://minisolution-backend.herokuapp.com'
// const baseUrl = 'http://192.168.3.218:5000'
// clientAuthenticationbeforelogin
export const authenticateClientBeforeLogin = `${baseUrl}/authenticate`;

// AUTH API
export const user_register = `${baseUrl}/api/registermobileUser`;
export const user_login = `${baseUrl}/api/loginmobileUser`;
export const forget_password = `${baseUrl}/api/forgotPasswordmobile`;
export const reset_password = `${baseUrl}/api/reset-password`;




// product apis
export const get_products = `${baseUrl}/api/getAllProduct`


// promotions api
export const get_promotions = `${baseUrl}/api/getAllPromotions`

// user order
export const get_user_order = `${baseUrl}/api/allOrderById`

// category apis
export const get_categories = `${baseUrl}/api/getAllCategory`

// services apis
export const get_services = `${baseUrl}/api/getAllService`


// appoitment
export const create_appoitment = `${baseUrl}/api/createAppointment`
export const get_user_appointments = `${baseUrl}/api/getAllAppointment`

// order /cart
export const create_order = `${baseUrl}/api/createOrder`

// contact Us 

export const contact_us = `${baseUrl}/api/contactUs`


// address
export const create_address = `${baseUrl}/api/createUserAddress`
export const get_user_address = `${baseUrl}/api/getAddressById`
export const delete_address = `${baseUrl}/api/deteleUserAddress`


// notification

export const get_notification = `${baseUrl}/api/getNotifications`

// create credit card
export const create_creditCard = `${baseUrl}/api/createCreditCard`
export const getAllCards = `${baseUrl}/api/getAllCards`


