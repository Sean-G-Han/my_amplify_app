import React from 'react';
import { useWindowDimensions } from 'react-native';
import { Rectangle } from '../../My-EasyUI-Template/geometry';
import CUIAbsoluteBox from '../../My-EasyUI-Template/CommonUI/CUIAbsoluteBox';

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
    const window = useWindowDimensions();

    const root = Rectangle.create({ 
        pos: { x: 0, y: 0 }, 
        size: { width: window.width, height: window.height } 
    }, 'root');

    const sidebar = Rectangle.create({ 
        rectCorners: [[root, 'top-left'], [root, 'bottom-left']], 
        growDirection: 'right', 
        growSize: 100 
    }, 'sidebar');

    const body = Rectangle.create({
        rectCorners: [[sidebar, 'bottom-right'], [root, 'top-right']],
    }, 'body');
    console.log(body.getXYWH());

    return (
        <CUIAbsoluteBox rect={root}>
            <CUIAbsoluteBox rect={sidebar} style={{ backgroundColor: 'black' }} />
            <CUIAbsoluteBox rect={body}>
                {children}
            </CUIAbsoluteBox>
        </CUIAbsoluteBox>
    );
};

export default MainLayout;
