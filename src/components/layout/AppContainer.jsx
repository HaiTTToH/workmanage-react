import { lazy, Suspense } from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import ErrorBoundary from 'components/error/ErrorBoundary';
import LoadingSpinner from 'components/shared/LoadingSpinner';
import Login from '../../pages/login/Login';
import { useEffect } from 'react';
import MenuLayout from './MenuLayout';
import { Menu, Row, Col } from 'antd';
import LeftMenuLayout from './LeftMenuLayout';
import Registration from 'pages/registation/Registration';

const Home = lazy(() => import('components/home/Home'));
const CustomHome = lazy(() => import('components/home/CustomHome'));

function AppContainer() {
    useEffect(() => {
        let userJSON = window.localStorage.getItem('user');

        if (userJSON && userJSON != '') {
            //   let userData = JSON.parse(userJSON);
            //   if (moment(userData.Data.ExpiredDate) < moment()) {
            //     window.location.href = '/user/login';
            //   }
            //window.location.href = '/';
        } else {
            if (!window.localStorage.getItem('isSignUp')) {
                window.location.href = '/login';
            }
            window.localStorage.removeItem('iSignUp')
        }
    }, [])

    return (
        <Router>
            <ErrorBoundary>
                <Switch>
                    <Route path="/registration">
                        <Registration />
                    </Route>
                    <Row>
                        <Col span={4}>
                            <LeftMenuLayout />
                        </Col>
                        <Col span={20}>
                            <MenuLayout />
                            <Suspense fallback={<LoadingSpinner />}>
                                <Route path="/custom-home">
                                    <CustomHome />
                                </Route>
                                <Route exact path="/home">
                                    <Home />
                                </Route>

                            </Suspense>
                        </Col>
                    </Row>
                </Switch>

            </ErrorBoundary>
        </Router>
    );
}

export default AppContainer;
