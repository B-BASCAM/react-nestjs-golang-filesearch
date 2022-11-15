import React from 'react';
import { ReactNode } from 'react';
import { RouteDefinition } from '../types/routedefinition';
import _App from '../ui/components/App/_App';

export const getRouteList = (): RouteDefinition[] => [
    {

        routerLink: '/deneme',
        exact: true,
        element: React.createElement(_App),

    },
    {
        routerLink: '/deneme2',
        exact: true,
        element: React.createElement(_App),
    },
];