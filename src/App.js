import React from 'react';
import { Router, Route } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Spinner from './components/icons/spinner';
import PrivateRoute from './components/PrivateRoute';
import EnrollmentList from './pages/EnrollmentList';
import PublicEnrollmentList from './pages/PublicEnrollmentList';
import Stats from './pages/Stats';
import ApiParticulier from './pages/ApiParticulier';
import ApiImpotParticulierStep2 from './pages/ApiImpotParticulierStep2';
import Dgfip from './pages/Dgfip';
import FranceConnect from './pages/FranceConnect';
import ApiDroitsCnam from './pages/ApiDroitsCnam';
import ApiEntreprise from './pages/ApiEntreprise';
import PreuveCovoiturage from './pages/PreuveCovoiturage';
import ApiImpotParticulier from './pages/ApiImpotParticulier';
import { UserStore, UserContext } from './components/UserContext';
import { createBrowserHistory } from 'history';
import PiwikReactRouter from 'piwik-react-router';

const history = createBrowserHistory();

const piwik = PiwikReactRouter({
  url: process.env.REACT_APP_PIWIK_URL,
  siteId: process.env.REACT_APP_PIWIK_SITE_ID,
});

const App = () => (
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
                <>
                  <Route
                    path="/public/:targetApi?"
                    component={PublicEnrollmentList}
                  />
                  <Route path="/stats/:targetApi?" component={Stats} />
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
                    path="/api-impot-particulier/:enrollmentId?"
                    component={ApiImpotParticulier}
                  />
                  <PrivateRoute
                    path="/api-impot-particulier-step2/:enrollmentId?"
                    component={ApiImpotParticulierStep2}
                  />
                  <PrivateRoute
                    path="/franceconnect/:enrollmentId?"
                    component={FranceConnect}
                  />
                  <PrivateRoute
                    path="/api-droits-cnam/:enrollmentId?"
                    component={ApiDroitsCnam}
                  />
                  <PrivateRoute
                    path="/api-entreprise/:enrollmentId?"
                    component={ApiEntreprise}
                  />
                  <PrivateRoute
                    path="/preuve-covoiturage/:enrollmentId?"
                    component={PreuveCovoiturage}
                  />
                </>
              )}
            </main>
          )}
        </UserContext.Consumer>

        <Footer />
      </div>
    </UserStore>
  </Router>
);

export default App;
