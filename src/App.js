import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Spinner from './components/icons/spinner';
import Login from './Login';
import PrivateRoute from './components/PrivateRoute';
import OauthCallback from './OauthCallback';
import EnrollmentList from './EnrollmentList';
import ApiParticulier from './ApiParticulier';
import Dgfip from './Dgfip';
import { UserStore, UserContext } from './components/UserContext';

const {
  REACT_APP_PIWIK_URL: PIWIK_URL,
  REACT_APP_PIWIK_SITE_ID: PIWIK_SITE_ID,
} = process.env;

class App extends Component {
  componentDidMount() {
    setTimeout(() => {
      if (window.Piwik) {
        const tracker = window.Piwik.getTracker(
          `${PIWIK_URL}/piwik.php`,
          PIWIK_SITE_ID
        );

        if (tracker) {
          tracker.trackPageView();
        }
      }
    }, 300);
  }

  render() {
    return (
      <div className="page">
        <Router>
          <UserStore>
            <React.Fragment>
              <Header />

              <UserContext.Consumer>
                {({ isLoading }) => (
                  <main>
                    {isLoading && (
                      <section className="section-grey">
                        <div className="container text-center">
                          <Spinner />
                        </div>
                      </section>
                    )}
                    {!isLoading && (
                      <React.Fragment>
                        <Route path="/login" component={Login} />
                        <Route
                          path="/oauth-callback"
                          component={OauthCallback}
                        />
                        <PrivateRoute
                          exact
                          path="/"
                          component={EnrollmentList}
                        />
                        <PrivateRoute
                          path="/api-particulier/:enrollmentId?"
                          component={ApiParticulier}
                        />
                        <PrivateRoute
                          path="/dgfip/:enrollmentId?"
                          component={Dgfip}
                        />
                      </React.Fragment>
                    )}
                  </main>
                )}
              </UserContext.Consumer>

              <Footer />
            </React.Fragment>
          </UserStore>
        </Router>
        {PIWIK_URL && <script src={`${PIWIK_URL}/piwik.js`} />}
      </div>
    );
  }
}

export default App;
