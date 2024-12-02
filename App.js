import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Admin from '~/pages/Admin';
import { Fragment } from 'react';
// import Advertisment from '~/pages/Advertisment';
import { privateRoutes, publicRoutes } from '~/routes';
import { DefaultLayout } from '~/components/Layout';
import RoleBasedRoute from '~/components/RoleBasedRoute';
function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    {publicRoutes.map((route, index) => {
                        const Page = route.component;

                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={`public-${index}`}
                                path={route.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            />
                        );
                    })}
                    {privateRoutes.map((route, index) => {
                        const Page = route.component;

                        let Layout = DefaultLayout;

                        if (route.layout) {
                            Layout = route.layout;
                        } else if (route.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={`private-${index}`}
                                path={route.path}
                                element={
                                    <RoleBasedRoute allowedRoles={route.role}>
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    </RoleBasedRoute>
                                }
                            />
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
