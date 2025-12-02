import React from 'react';
import MainLayout from './layout/MainLayout';
import { View, Text } from 'react-native';

const HomePage = () => {
  return (
    <MainLayout>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home Page Content</Text>
        </View>
    </MainLayout>
  );
};

export default HomePage;
