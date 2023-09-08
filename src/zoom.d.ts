import React from 'react';
import type { ViewProps } from 'react-native';
import { GestureType } from 'react-native-gesture-handler';
declare type Props = {
    children: React.ReactNode;
    minimumZoomScale?: number;
    maximumZoomScale?: number;
    defaultZoomScale?: number;
    simultaneousGesture?: GestureType;
    onZoomBegin?: () => void;
    onZoomEnd?: () => void;
} & ViewProps;
export declare function Zoom(props: Props): JSX.Element;
export {};
