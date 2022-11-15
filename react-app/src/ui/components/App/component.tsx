import { ReactNode } from 'react';
import { Route, Routes as Switch } from 'react-router-dom';
import { RouteDefinition } from '../../../types/routedefinition'
import { Footer } from '../Footer';
import { Header } from '../Header';
import { NotFound404 } from '../NotFound404';
import { SideBar } from '../SideBar';
import { Viewport } from '../Viewport';
import _App from './_App'

type Props = {
    routes: RouteDefinition[];
};

type ReactNodeOrRenderer = (() => React.ReactNode | null);





function AppComponent(props: Props): JSX.Element {

    const {
        routes
    } = props;

    const locked = true;
    return (

        <div>
            <Header />

            <SideBar />
            <Viewport isConnected={true}>
                {
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

                }

            </Viewport>

            {/* <Switch>

                {
                    routes.map(
                        (route, index) => {
                            return <Route key={index} path={route.routerLink} element={route.element} />
                        },
                    )
                }

                <Route path='*' element={<NotFound404 />} />

            </Switch> */}

            <Footer />

        </div >

    )
}

export default AppComponent