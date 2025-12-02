import { useWindowDimensions } from 'react-native'
import React from 'react'
import CUIAbsoluteBox from '../My-EasyUI-Template/CommonUI/CUIAbsoluteBox'
import { Rectangle } from '../My-EasyUI-Template/geometry'
import CUITextField from '../My-EasyUI-Template/CommonUI/CUITextField'
import CUIButton from '../My-EasyUI-Template/CommonUI/CUITextButton'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import { loginMiddleware } from '../middleware/auth'
import { UserCred } from '../type/userCred'

type User = {
    username: string;
    password: string;
}

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const LoginPage: React.FC<Props> = ( navigation ) => {
    const [user, setUser] = React.useState<User>({ username: navigation.route.params?.username ?? '', password: '' });
    const window = useWindowDimensions()
    const root = Rectangle.create({
        pos: { x: 0, y: 0 },
        size: { width: window.width, height: window.height }
    }, 'root')

    const loginBox = Rectangle.create({
        refCorner: 'center',
        rectCorners: [[root, 'center']],
        size: { width: 350, height: 250 }
    }, 'loginBox')

    return (
        <CUIAbsoluteBox rect={loginBox} padding={10} style={{ borderColor: 'black', borderWidth: 1, borderRadius: 10 }}>
            <CUITextField placeholder="Username" value={user.username} onChangeText={(text) => setUser({ ...user, username: text })} />
            <CUITextField placeholder="Password" type='password' onChangeText={(text) => setUser({ ...user, password: text })} />
            <CUIButton text="Login" onPress={async () => {
                    let result = await loginMiddleware(user.username, user.password);
                    if (result.success) {   
                        navigation.navigation.replace('Home', { userCred: UserCred.fromSignInSession(result.value, user.username) });
                    }
                }} />
            <CUIButton text="No Account? (Register)" onPress={() => {
                    navigation.navigation.navigate('Register', { username: user.username }) 
                }} type='secondary'/>
        </CUIAbsoluteBox>
    )
}

export default LoginPage