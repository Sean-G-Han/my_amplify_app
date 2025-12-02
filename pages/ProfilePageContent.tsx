import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import RectContext from '../My-EasyUI-Template/RectContext'
import CUIAbsoluteBox from '../My-EasyUI-Template/CommonUI/CUIAbsoluteBox'
import { UserCred } from '../type/userCred'

type Props = {
    userCred: UserCred;
}

const ProfilePageContent: React.FC<Props> = ({ userCred }) => {
    const parent = useContext(RectContext)

    if (!parent || !parent.parent) {
        throw new Error("ProfilePageContent must be used within a RectContext provider");
    }

    const root = parent.parent

    return (
        <CUIAbsoluteBox rect={root} style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text>Welcome to Profile {userCred.id}</Text>
        </CUIAbsoluteBox>
    )
}

export default ProfilePageContent

const styles = StyleSheet.create({})