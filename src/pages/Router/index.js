import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from'../SplashScreen'
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
import AddMeter from '../Meter/add'
import Profile from '../Profile'
import Scan from '../Login/Scan'
import ShowComplaint from '../Complaint/show'
import DetailMeter from '../Meter/detail'
import ChangePhone from '../ChangePhone'
import BillScan from '../Bill/Scan'
import PhoneScan from '../ChangePhone/Scan'
import FareList from '../Fare/FareList'
import FareScan from '../Fare/Scan'
import ResetPassword from '../ResetPassword'
import Register from '../Login/register'


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
                name="AddMeter"
                component={AddMeter}
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
             <Stack.Screen
                name="ShowComplaint"
                component={ShowComplaint}
                options={{headerShown:false}}
            />
             <Stack.Screen
                name="DetailMeter"
                component={DetailMeter}
                options={{headerShown:false}}
            />
            <Stack.Screen
                name="ChangePhone"
                component={ChangePhone}
                options={{headerShown:false}}
            />
            <Stack.Screen
                name="BillScan"
                component={BillScan}
                options={{headerShown:false}}
            />
            <Stack.Screen
                name="PhoneScan"
                component={PhoneScan}
                options={{headerShown:false}}
            />
             <Stack.Screen
                name="FareList"
                component={FareList}
                options={{headerShown:false}}
            />
            <Stack.Screen
                name="FareScan"
                component={FareScan}
                options={{headerShown:false}}
            />
             <Stack.Screen
                name="ResetPassword"
                component={ResetPassword}
                options={{headerShown:false}}
            />
            <Stack.Screen
                name="Register"
                component={Register}
                options={{headerShown:false}}
            />
        </Stack.Navigator>
    )
}
export default Router