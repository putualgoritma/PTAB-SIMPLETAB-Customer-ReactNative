import Config from 'react-native-config';
import Get from './Get';
import Post from './Post';
// import Put from './Put';
// import Delete from './Delete';
// GET


//POST
const registerCustomerPublic =(data) => Post(Config.REACT_APP_REGISTER_PUBLIC, false, data);

// PUT

const API = {
      registerCustomerPublic,
}

export default API;