import { Route, Routes as Switch } from 'react-router-dom';
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
                    routes.map(
                        (route, index) => {
                            return <Route key={index} path={route.routerLink} element={route.element} />
                        },
                    )
                }

                <Route path='*' element={<NotFound404 />} />

            </Switch>

            {/* Footer */}

        </div >

    )
}

export default AppComponent