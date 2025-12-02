import { useWindowDimensions } from 'react-native'
import React from 'react'
import CUIAbsoluteBox from '../My-EasyUI-Template/CommonUI/CUIAbsoluteBox'
import { Rectangle } from '../My-EasyUI-Template/geometry'
import CUITextField from '../My-EasyUI-Template/CommonUI/CUITextField'
import CUIButton from '../My-EasyUI-Template/CommonUI/CUITextButton'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../App'
import { confirmSignUpMiddleware } from '../middleware/auth'

type Props = NativeStackScreenProps<RootStackParamList, 'ConfirmSignUp'>;

const ConfirmSignUpPage: React.FC<Props> = ( navigation ) => {
    const [code, setCode] = React.useState('');
    const window = useWindowDimensions()
    const root = Rectangle.create({
        pos: { x: 0, y: 0 },
        size: { width: window.width, height: window.height }
    }, 'root')

    const confirmSignUpBox = Rectangle.create({
        refCorner: 'center',
        rectCorners: [[root, 'center']],
        size: { width: 350, height: 130 }
    }, 'confirmSignUpBox')
    return (
        <CUIAbsoluteBox rect={confirmSignUpBox} padding={10} style={{ borderColor: 'black', borderWidth: 1, borderRadius: 10 }}>
            <CUITextField placeholder="Enter Code" onChangeText={(text) => setCode(text)} />
            <CUIButton text="Confirm Sign Up" onPress={async () => {
                    let result = await confirmSignUpMiddleware(navigation.route.params?.username ?? '', code);
                    if (result.success) {
                        navigation.navigation.navigate('Login', { username: navigation.route.params?.username ?? '' });
                    }
                }} />
        </CUIAbsoluteBox>
    )
}

export default ConfirmSignUpPage