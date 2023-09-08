/// <reference types="react" />
import type { NativeGesture } from 'react-native-gesture-handler';
export declare const ZoomListContext: import("react").Context<{
    onZoomBegin: () => void;
    onZoomEnd: () => void;
    simultaneousPanGestureRef: NativeGesture;
} | null>;
