import React from 'react'
import { getRouteList } from '../../service/routes';
import AppComponent from './AppComponent';

function App() {
    const routes = getRouteList();
    console.log(routes)
    return (


        <AppComponent
            routes={routes}
        />


    )
}

export default App