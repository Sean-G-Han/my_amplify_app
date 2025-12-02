import React from 'react';
import { TouchableOpacity, useWindowDimensions } from 'react-native';
import { Rectangle } from '../../My-EasyUI-Template/geometry';
import CUIAbsoluteBox from '../../My-EasyUI-Template/CommonUI/CUIAbsoluteBox';
import { MaterialIcons } from '@expo/vector-icons';
import { logoutMiddleware } from '../../middleware/auth';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { UserCred } from '../../type/userCred';

type MainLayoutProps = {
    children: React.ReactNode;
    userCred: UserCred
};

const MainLayout: React.FC<MainLayoutProps> = ({ children, userCred }) => {
    const iconSize = 80;

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const window = useWindowDimensions();

    const root = Rectangle.create({ 
        pos: { x: 0, y: 0 }, 
        size: { width: window.width, height: window.height } 
    }, 'root');

    const sidebar = Rectangle.create({ 
        rectCorners: [[root, 'top-left'], [root, 'bottom-left']], 
        growDirection: 'right', 
        growSize: iconSize 
    }, 'sidebar');

    const topBtn1 = Rectangle.create({
        rectCorners: [[sidebar, 'top-left'], [sidebar, 'top-right']],
        growDirection: 'bottom',
        growSize: iconSize,
    }, 'topBtn1');

    const topBtn2 = Rectangle.create({
        rectCorners: [[topBtn1, 'top-right'], [topBtn1, 'top-left']],
        growDirection: 'bottom',
        growSize: iconSize,
    }, 'topBtn2');

    const bottomBtn = Rectangle.create({
        rectCorners: [[sidebar, 'bottom-left'], [sidebar, 'bottom-right']],
        growDirection: 'top',
        growSize: iconSize,
    }, 'bottomBtn');

    const body = Rectangle.create({
        rectCorners: [[sidebar, 'bottom-right'], [root, 'top-right']],
    }, 'body');

    return (
        <CUIAbsoluteBox rect={root}>
            <CUIAbsoluteBox rect={sidebar} style={{ backgroundColor: 'black' }}>
                <CUIAbsoluteBox rect={topBtn1} padding={20}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('Home', {userCred: userCred});
                    }}>
                        <MaterialIcons name="home" size={iconSize/2} color="white" />
                    </TouchableOpacity>
                </CUIAbsoluteBox>
                <CUIAbsoluteBox rect={topBtn2} padding={20}>
                    <TouchableOpacity onPress={() => { 
                        navigation.navigate('Profile', {userCred: userCred});
                    }}>
                        <MaterialIcons name="person" size={iconSize/2} color="white" />
                    </TouchableOpacity>
                </CUIAbsoluteBox>
                <CUIAbsoluteBox rect={bottomBtn} padding={20}>
                    <TouchableOpacity onPress={async () => {
                        const result = await logoutMiddleware();
                        if (result.success) {
                            navigation.replace('Login', {});
                        }
                    }}>
                        <MaterialIcons name="logout" size={iconSize/2} color="white" />
                    </TouchableOpacity>
                </CUIAbsoluteBox>
            </CUIAbsoluteBox>
            <CUIAbsoluteBox rect={body}>
                {children}
            </CUIAbsoluteBox>
        </CUIAbsoluteBox>
    );
};

export default MainLayout;
