import Config from 'react-native-config';
import Get from './Get';
import Post from './Post';
// import Put from './Put';
// import Delete from './Delete';
// GET
const categories = (token) => Get('/api/close/customer/categories', false, token)
const tickets = (id, token) => Get(`/api/close/customer/tickets/${id}`, false, token)

//POST
const registerCustomerPublic =(data) => Post(Config.REACT_APP_REGISTER_PUBLIC, false, data);
const tikcetStore = (data, token) => Post('/api/close/customer/ticket/store', false, data, token);
// PUT

const API = {
      registerCustomerPublic,
      categories,
      tikcetStore,
      tickets
}

export default API;