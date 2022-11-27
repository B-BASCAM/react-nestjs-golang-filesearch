import React from 'react';
import { ReactNode } from 'react';
import EmptyPage from '../pages/EmptyPage';
import { RouteDefinition } from '../types/routedefinition';


export const getRouteList = (): RouteDefinition[] => [
    {

        routerLink: '/deneme',
        exact: true,
        component: EmptyPage,

    },
    {
        routerLink: '/deneme2',
        exact: true,
        component: EmptyPage,
    },
];