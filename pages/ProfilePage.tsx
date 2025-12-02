import React from 'react';
import MainLayout from './layout/MainLayout';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import ProfilePageContent from './ProfilePageContent';

type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

const ProfilePage: React.FC<Props> = ({ route }) => {
    if (!route.params) {
        throw new Error("ProfilePage requires route parameters");
    }
    const { userCred } = route.params;
    return (
        <MainLayout userCred={userCred}>
            <ProfilePageContent userCred={userCred}/>
        </MainLayout>
    );
};

export default ProfilePage;
