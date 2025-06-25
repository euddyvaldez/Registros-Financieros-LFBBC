
import React from 'react';
import { Svg, Path, Circle, Line, Polyline } from 'react-native-svg';

interface IconProps {
  color?: string;
  size?: number;
  strokeWidth?: number;
}

export const HomeIcon = ({ color = "currentColor", size = 24, strokeWidth = 2 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></Path>
    <Polyline points="9 22 9 12 15 12 15 22"></Polyline>
  </Svg>
);

export const PeopleIcon = ({ color = "currentColor", size = 24, strokeWidth = 2 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></Path>
    <Circle cx="9" cy="7" r="4"></Circle>
    <Path d="M23 21v-2a4 4 0 0 0-3-3.87"></Path>
    <Path d="M16 3.13a4 4 0 0 1 0 7.75"></Path>
  </Svg>
);

export const ListIcon = ({ color = "currentColor", size = 24, strokeWidth = 2 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Line x1="8" y1="6" x2="21" y2="6"></Line>
    <Line x1="8" y1="12" x2="21" y2="12"></Line>
    <Line x1="8" y1="18" x2="21" y2="18"></Line>
    <Line x1="3" y1="6" x2="3.01" y2="6"></Line>
    <Line x1="3" y1="12" x2="3.01" y2="12"></Line>
    <Line x1="3" y1="18" x2="3.01" y2="18"></Line>
  </Svg>
);

export const ChartIcon = ({ color = "currentColor", size = 24, strokeWidth = 2 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M3 3v18h18"/>
    <Path d="m18 9-5 5-4-4-3 3"/>
  </Svg>
);

export const MoonIcon = ({ color = "currentColor", size = 20, strokeWidth = 2 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></Path>
  </Svg>
);

export const SunIcon = ({ color = "currentColor", size = 20, strokeWidth = 2 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="5"></Circle>
    <Line x1="12" y1="1" x2="12" y2="3"></Line>
    <Line x1="12" y1="21" x2="12" y2="23"></Line>
    <Line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></Line>
    <Line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></Line>
    <Line x1="1" y1="12" x2="3" y2="12"></Line>
    <Line x1="21" y1="12" x2="23" y2="12"></Line>
    <Line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></Line>
    <Line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></Line>
  </Svg>
);

export const EditIcon = ({ color = "currentColor", size = 16, fill = "currentColor" }: IconProps & {fill?: string}) => (
 <Svg width={size} height={size} fill={fill} viewBox="0 0 16 16">
    <Path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.754.754V13.5h.793l.754-.754zm2.122-2.122L1.5 12.172v-.293l1.854-1.854 2.122 2.122z"/>
  </Svg>
);

export const DeleteIcon = ({ color = "currentColor", size = 16, fill = "currentColor" }: IconProps & {fill?: string}) => (
  <Svg width={size} height={size} fill={fill} viewBox="0 0 16 16">
    <Path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
    <Path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
  </Svg>
);

// Add other icons as needed, converting their SVG strings to react-native-svg components.
// For example: EyeIcon, EyeSlashIcon for balance toggle
export const EyeIcon = ({ color = "currentColor", size = 24, strokeWidth = 2 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></Path>
    <Circle cx="12" cy="12" r="3"></Circle>
  </Svg>
);

export const EyeSlashIcon = ({ color = "currentColor", size = 24, strokeWidth = 2 }: IconProps) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
    <Path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></Path>
    <Line x1="1" y1="1" x2="23" y2="23"></Line>
  </Svg>
);
