import Config from 'react-native-config';
import Get from './Get';
import Post from './Post';
// import Put from './Put';
// import Delete from './Delete';
// GET
const categories = (token) => Get('/api/close/customer/categories', false, token)

//POST
const registerCustomerPublic =(data) => Post(Config.REACT_APP_REGISTER_PUBLIC, false, data);

// PUT

const API = {
      registerCustomerPublic,
      categories
}

export default API;