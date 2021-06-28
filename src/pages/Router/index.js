import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from'../SplashScreen'
import Home from'../Home'
import Menu from'../Menu'
import Login from'../Login'
import SMS from'../SMS'
import Public from '../Public'
import HistoryComplaint from '../Complaint'
import Complaint from '../Complaint/complaint'
import Proof from '../Complaint/proof'
import Heandling from '../Complaint/heandling'
import Action from '../Complaint/action'
import Bill from '../Bill'
import BillList from '../Bill/BillList'
import Fare from '../Fare'
import Meter from '../Meter'
import Profile from '../Profile'
import Scan from '../Login/Scan'
const Stack = createStackNavigator();
const Router = () =>{
    return(
        <Stack.Navigator initialRoutName="SplashScreen">
            <Stack.Screen
                name="SplashScreen"
                component={SplashScreen}
                options={{headerShown:false}}
            />
            <Stack.Screen
                name="Home"
                component={Home}
                options={{headerShown:false}}
            />
            <Stack.Screen
                name="Menu"
                component={Menu}
                options={{headerShown:false}}
            />
            <Stack.Screen
                name="Login"
                component={Login}
                options={{headerShown:false}}
            />
            <Stack.Screen
                name="SMS"
                component={SMS}
                options={{headerShown:false}}
            />
            <Stack.Screen
                name="Public"
                component={Public}
                options={{headerShown:false}}
            />
            <Stack.Screen
                name="HistoryComplaint"
                component={HistoryComplaint}
                options={{headerShown:false}}
            />
            <Stack.Screen
                name="Complaint"
                component={Complaint}
                options={{headerShown:false}}
            />
            <Stack.Screen
                name="Bill"
                component={Bill}
                options={{headerShown:false}}
            />
            <Stack.Screen
                name="Proof"
                component={Proof}
                options={{headerShown:false}}
            />
            <Stack.Screen
                name="Heandling"
                component={Heandling}
                options={{headerShown:false}}
            />
            <Stack.Screen
                name="Action"
                component={Action}
                options={{headerShown:false}}
            />
            <Stack.Screen
                name="BillList"
                component={BillList}
                options={{headerShown:false}}
            />
            <Stack.Screen
                name="Fare"
                component={Fare}
                options={{headerShown:false}}
            />
            <Stack.Screen
                name="Meter"
                component={Meter}
                options={{headerShown:false}}
            />
            <Stack.Screen
                name="Profile"
                component={Profile}
                options={{headerShown:false}}
            />
            <Stack.Screen
                name="Scan"
                component={Scan}
                options={{headerShown:false}}
            />
        </Stack.Navigator>
    )
}
export default Router