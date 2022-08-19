import Config from 'react-native-config';
import Get from './Get';
import Post from './Post';
// import Put from './Put';
// import Delete from './Delete';
// GET

const categories = (token) => Get('/api/close/customer/categories', false, token)
const tickets = (id, token) => Get(Config.REACT_APP_TICKET + id, false, token)
const ctms = (id, token) => Get(Config.REACT_APP_CTM + id, false, token)
const ctmpay = (id, token) => Get(Config.REACT_APP_CTM_PAY + id, false, token)
const ctmuse = (id, token) => Get(Config.REACT_APP_CTM_USE + id, false, token)
const ctmcustomer = (id, token) => Get(Config.REACT_APP_CTM_CUSTOMER + id, false, token)
const logout = (token) => Get('/api/open/customer/logout/', false, token) ;


//POST
const login = (data) => Post('/api/open/customer/login', false, data);
const registerCustomerPublic =(data) => Post(Config.REACT_APP_REGISTER_PUBLIC, false, data);
const tikcetStore = (data, token) => Post(Config.REACT_APP_TICKET_STORE, false, data, token);
const OTP = (data) =>Post(Config.REACT_APP_OTP, false, data);
const scanCode = (data) =>Post('/api/open/customer/code', false, data);
const reset = (data) => Post('/api/open/customer/reset', false, data);
const register = (data) => Post('/api/open/customer/register-upd', false, data);
// PUT

const API = {
      registerCustomerPublic,
      categories,
      tikcetStore,
      tickets,
      login,
      OTP, 
      logout,
      scanCode,
      ctms,
      ctmpay,
      ctmcustomer,
      reset,
      ctmuse,
      register,
}

export default API;