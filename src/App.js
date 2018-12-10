import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Spinner from './components/icons/spinner';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import OauthCallback from './pages/OauthCallback';
import EnrollmentList from './pages/EnrollmentList';
import ApiParticulier from './pages/ApiParticulier';
import Dgfip from './pages/Dgfip';
import FranceConnect from './pages/FranceConnect';
import ApiDroitsCnam from './pages/ApiDroitsCnam';
import { UserStore, UserContext } from './components/UserContext';
import { createBrowserHistory } from 'history';
import PiwikReactRouter from 'piwik-react-router';

const history = createBrowserHistory();

const piwik = PiwikReactRouter({
  url: process.env.REACT_APP_PIWIK_URL,
  siteId: process.env.REACT_APP_PIWIK_SITE_ID,
});

class App extends Component {
  render() {
    return (
      <Router history={piwik.connectToHistory(history)}>
        <UserStore>
          <div className="page">
            <Header />

            <UserContext.Consumer>
              {({ isLoading }) => (
                <main>
                  {isLoading && (
                    <section className="section-grey loader">
                      <Spinner />
                    </section>
                  )}
                  {!isLoading && (
                    <React.Fragment>
                      <Route path="/login" component={Login} />
                      <Route path="/oauth-callback" component={OauthCallback} />
                      <PrivateRoute exact path="/" component={EnrollmentList} />
                      <PrivateRoute
                        exact
                        path="/archive"
                        component={props => (
                          <EnrollmentList {...props} showArchived />
                        )}
                      />
                      <PrivateRoute
                        path="/api-particulier/:enrollmentId?"
                        component={ApiParticulier}
                      />
                      <PrivateRoute
                        path="/dgfip/:enrollmentId?"
                        component={Dgfip}
                      />
                      <PrivateRoute
                        path="/franceconnect/:enrollmentId?"
                        component={FranceConnect}
                      />
                      <PrivateRoute
                        path="/api-droits-cnam/:enrollmentId?"
                        component={ApiDroitsCnam}
                      />
                    </React.Fragment>
                  )}
                </main>
              )}
            </UserContext.Consumer>

            <Footer />
          </div>
        </UserStore>
      </Router>
    );
  }
}

export default App;
