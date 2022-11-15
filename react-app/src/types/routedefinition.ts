import React from "react";


export type RouteDefinition = {
    routerLink?: string;
    exact?: boolean;
    element?: React.ReactNode | null;
    layout?: React.ReactNode | null;
};