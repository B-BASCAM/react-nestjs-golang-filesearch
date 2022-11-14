import { RouteDefinition } from '../types/routedefinition';
import _App from '../ui/components/App/_App';

export const getRouteList = (): RouteDefinition[] => [
    // {
    //     routerLink: '/',
    //     exact: true,
    //     component: App,
    // },
    // {
    //     routerLink: '/',
    //     exact: true,
    //     component: App,
    // },
    {
        routerLink: '/deneme',
        exact: true,
        component: _App,
    },
];