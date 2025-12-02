import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import RectContext from '../My-EasyUI-Template/RectContext'
import CUIAbsoluteBox from '../My-EasyUI-Template/CommonUI/CUIAbsoluteBox'
import { UserCred } from '../type/userCred'

type Props = {
    userCred: UserCred;
}

const HomePageContent: React.FC<Props> = ({ userCred }) => {
    const parent = useContext(RectContext)

    if (!parent || !parent.parent) {
        throw new Error("HomePageContent must be used within a RectContext provider");
    }

    const root = parent.parent

    return (
        <CUIAbsoluteBox rect={root} style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text>Welcome {userCred.id}</Text>
        </CUIAbsoluteBox>
    )
}

export default HomePageContent

const styles = StyleSheet.create({})