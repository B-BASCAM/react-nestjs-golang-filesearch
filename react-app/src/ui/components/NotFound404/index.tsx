import React, { memo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

//import './index.scss';


export const NotFound404 = memo(function NotFound404() {

    const location = useLocation();


    return (
        <>
            <div className='not-found-404'>
                <span className='text'>{'SORRY__PAGE_YOU_ARE_LOOKING_FOR_COULD_NOT_BE_FOUND'}</span>
            </div>
        </>
    );
});
