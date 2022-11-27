import React, { memo, ReactNode } from 'react'
import {AppFooter} from '../Footer/AppFooter'

type Props = {
    children?: ReactNode;
    layoutColorMode?:string;
};
export const Viewport = memo(function Viewport(props: Props) {
    return (

        <div className="layout-main-container">
        <div className="layout-main">

        {
                props.children
            }



        </div>

        <AppFooter layoutColorMode={props.layoutColorMode} />
    </div>
     
    );
});

