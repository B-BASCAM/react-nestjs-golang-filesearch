import React from 'react';
import { ReactNode } from 'react';
import EmptyPage from '../pages/EmptyPage';
import TaskPage from '../components/Task/Task';
import TaskDetailPage from '../components/TaskDetail/TaskDetail';
import { RouteDefinition } from '../types/routeDefinition';


export const getRouteList = (): RouteDefinition[] => [
    {

        routerLink: '/deneme',
        exact: true,
        component: TaskPage,

    },
    {
        routerLink: '/deneme2',
        exact: true,
        component: TaskDetailPage,
    },
    {
        routerLink: '/deneme3',
        exact: true,
        component: EmptyPage,
    },
];