import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getRouteList } from '../../service/routeService';
import { getMenuList } from '../../service/menuService';
import AppComponent from './AppComponent';
import { IState } from '../../store/reducers';
import { addTask } from '../../store/actions/taskActions';

function App() {
    const routes = getRouteList();
    const menus = getMenuList();

    return (


        <AppComponent
            routes={routes}
            menus={menus}
        />


    )
}

export default App

