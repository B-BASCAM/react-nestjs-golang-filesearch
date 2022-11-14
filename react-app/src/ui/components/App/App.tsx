
import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { getRouteList } from '../../../service/routes';
import { NotFound404 } from '../NotFound404';
import AppComponent from './component';
import _App from './_App'
function App() {

    const routes = getRouteList();
    console.log(routes)
    return (
        <AppComponent

            routes={routes}

        />
        // <Routes>

        //     <Route path='/deneme/' element={<_App />} />
        //     <Route path='*' element={<NotFound404 />} />



        // </Routes>
    )
}

export default App