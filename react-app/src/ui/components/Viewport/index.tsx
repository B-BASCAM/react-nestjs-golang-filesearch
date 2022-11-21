import React, { memo, ReactNode } from 'react'
type Props = {
    isConnected: boolean;
    children?: ReactNode;
};
export const Viewport = memo(function Viewport({ children, isConnected }: Props) {
    return (
        <>
            {
                children
            }
        </>
    );
});

