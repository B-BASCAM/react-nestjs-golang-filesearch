import React from "react";
import { RouteComponentProps } from "react-router-dom";


export type RouteDefinition = {
    routerLink?: string;
    exact?: boolean;
    element?: React.ReactNode | null;
    layout?: React.ReactNode | null;
    component?: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
};