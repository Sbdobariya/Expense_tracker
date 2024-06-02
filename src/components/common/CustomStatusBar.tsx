import {StatusBar, StatusBarStyle} from 'react-native';
import React from 'react';

interface CustomStatusBarProps {
  backgroundColor?: string;
  barStyle?: StatusBarStyle;
}

const CustomStatusBar: React.FC<CustomStatusBarProps> = ({
  backgroundColor,
  barStyle,
}) => {
  return <StatusBar backgroundColor={backgroundColor} barStyle={barStyle} />;
};

export default CustomStatusBar;
