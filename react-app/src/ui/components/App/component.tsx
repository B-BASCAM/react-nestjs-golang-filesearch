import { matchPath, Route, Routes as Switch, useLocation } from 'react-router-dom';
import React from 'react'
import { RouteDefinition } from '../../../types/routedefinition'
import { NotFound404 } from '../NotFound404';
import _App from './_App'
type Props = {
    routes: RouteDefinition[];
};
function AppComponent(props: Props): JSX.Element {
    const {
        routes
    } = props;


    return (
        <div>
            {/* Header */}
            {/* SideBar */}
            <Switch>
                {
                    routes.filter(route => route.routerLink).map(
                        route => (
                            <Route path='/deneme/' element={<_App />} />
                            // <Route path={route.routerLink} element={React.Fragment(route.component)} />
                        ),
                    )
                }


                <Route path='*' element={<NotFound404 />} />
            </Switch>

            {/* Footer */}

        </div >
    )
}

export default AppComponent