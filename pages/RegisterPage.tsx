import { useWindowDimensions } from 'react-native'
import React from 'react'
import CUIAbsoluteBox from '../My-EasyUI-Template/CommonUI/CUIAbsoluteBox'
import { Rectangle } from '../My-EasyUI-Template/geometry'
import CUITextField from '../My-EasyUI-Template/CommonUI/CUITextField'
import CUIButton from '../My-EasyUI-Template/CommonUI/CUITextButton'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App'
import { signUpMiddleware } from '../middleware/auth'

type User = {
    username: string;
    password: string;
    confirmPassword: string;
}

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const RegisterPage: React.FC<Props> = (navigation) => {
    const [user, setUser] = React.useState<User>({ username: navigation.route.params?.username ?? '', password: '', confirmPassword: '' });
    const window = useWindowDimensions()
    const root = Rectangle.create({
        pos: { x: 0, y: 0 },
        size: { width: window.width, height: window.height }
    }, 'root')

    const registerBox = Rectangle.create({
        refCorner: 'center',
        rectCorners: [[root, 'center']],
        size: { width: 350, height: 320 }
    }, 'registerBox')

    return (
        <CUIAbsoluteBox rect={registerBox} padding={10} style={{ borderColor: 'black', borderWidth: 1, borderRadius: 10 }}>
            <CUITextField placeholder="Email" value={user.username} onChangeText={(text) => setUser({ ...user, username: text })} />
            <CUITextField placeholder="Password" type='password' onChangeText={(text) => setUser({ ...user, password: text })} />
            <CUITextField placeholder="Confirm Password" type='password' onChangeText={(text) => setUser({ ...user, confirmPassword: text })} />
            <CUIButton text="Register" onPress={async () => {
                let result = await signUpMiddleware(user.username, user.password, user.confirmPassword);
                if (result.success && result.value === 'CONFIRM_SIGN_UP') {
                    navigation.navigation.navigate('ConfirmSignUp', { username: user.username });
                }
            }} />
            <CUIButton text="Already have an account? (Login)" onPress={() => {
                    navigation.navigation.navigate('Login', { username: user.username })
                }} type='secondary'/>
        </CUIAbsoluteBox>
    )
}

export default RegisterPage