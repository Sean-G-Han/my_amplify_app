import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { Amplify } from 'aws-amplify';
import amplify_outputs from './amplify_outputs.json';
import ConfirmSignUpPage from './pages/ConfirmSignUpPage';

Amplify.configure(amplify_outputs)

export type RootStackParamList = {
    Login: { username?: string };
    Register: { username?: string };
    ConfirmSignUp: { username?: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={LoginPage} />
                <Stack.Screen name="Register" component={RegisterPage} />
                <Stack.Screen name="ConfirmSignUp" component={ConfirmSignUpPage} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
