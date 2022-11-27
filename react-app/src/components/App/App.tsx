import React from 'react'
import { getRouteList } from '../../service/routeService';
import { getMenuList } from '../../service/menuService';
import AppComponent from './AppComponent';

function App() {
    const routes = getRouteList();
    const menus=getMenuList();
    console.log(routes)
    return (


        <AppComponent
            routes={routes}
            menus={menus}
        />


    )
}

export default App

