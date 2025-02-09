import React, { forwardRef, useRef, useState, useMemo } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { useAnimatedProps, useSharedValue } from 'react-native-reanimated';
import { ZoomListContext } from './zoom-list-context';
export function createZoomListComponent(ScrollComponent) {
    const ListComponent = forwardRef((props, ref) => {
        const [scrollEnabled, setScrollEnabled] = useState(true);
        const listRef = useRef(Gesture.Native());
        const contextValues = useMemo(() => ({
            onZoomBegin: () => setScrollEnabled(false),
            onZoomEnd: () => setScrollEnabled(true),
            simultaneousPanGestureRef: listRef.current,
        }), []);
        return (React.createElement(ZoomListContext.Provider, { value: contextValues },
            React.createElement(GestureDetector, { gesture: listRef.current },
                React.createElement(ScrollComponent, { ...props, scrollEnabled: scrollEnabled, ref: ref }))));
    });
    return ListComponent;
}
export function createZoomListWithReanimatedComponent(ScrollComponent) {
    const ListComponent = forwardRef((props, ref) => {
        const scrollEnabled = useSharedValue(true);
        const listRef = useRef(Gesture.Native());
        const contextValues = useMemo(() => ({
            onZoomBegin: () => {
                scrollEnabled.value = false;
            },
            onZoomEnd: () => {
                scrollEnabled.value = true;
            },
            simultaneousPanGestureRef: listRef.current,
        }), [scrollEnabled]);
        const animatedProps = useAnimatedProps(() => {
            return {
                scrollEnabled: scrollEnabled.value,
            };
        });
        return (React.createElement(ZoomListContext.Provider, { value: contextValues },
            React.createElement(GestureDetector, { gesture: listRef.current },
                React.createElement(ScrollComponent, { ...props, animatedProps: animatedProps, ref: ref }))));
    });
    return ListComponent;
}
