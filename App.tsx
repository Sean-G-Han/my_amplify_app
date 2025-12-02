import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { Amplify } from 'aws-amplify';
import amplify_outputs from './amplify_outputs.json';
import ConfirmSignUpPage from './pages/ConfirmSignUpPage';
import HomePage from './pages/HomePage';
import { UserCred } from './type/userCred';
import ProfilePage from './pages/ProfilePage';

Amplify.configure(amplify_outputs)

export type RootStackParamList = {
    Login: { username?: string };
    Register: { username?: string };
    ConfirmSignUp: { username?: string };
    Home: {userCred: UserCred};
    Profile: {userCred: UserCred};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={LoginPage} />
                <Stack.Screen name="Register" component={RegisterPage} />
                <Stack.Screen name="ConfirmSignUp" component={ConfirmSignUpPage} />
                <Stack.Screen name="Home" component={HomePage} />
                <Stack.Screen name="Profile" component={ProfilePage} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
