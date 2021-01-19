import React from 'react';
import { Router, Route } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { createBrowserHistory } from 'history';
import PiwikReactRouter from 'piwik-react-router';

import './App.css';

import Footer from './components/Footer';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import { UserStore, UserContext } from './components/UserContext';

import AdminEnrollmentList from './pages/AdminEnrollmentList';
import UserEnrollmentList from './pages/UserEnrollmentList';
import PublicEnrollmentList from './pages/PublicEnrollmentList';
import Stats from './pages/Stats';
import ApiParticulier from './pages/ApiParticulier';
import FranceConnect from './pages/FranceConnect';
import ApiDroitsCnam from './pages/ApiDroitsCnam';
import ApiEntreprise from './pages/ApiEntreprise';
import PreuveCovoiturage from './pages/PreuveCovoiturage';
import LeTaxiClients from './pages/LeTaxiClients';
import LeTaxiChauffeurs from './pages/LeTaxiChauffeurs';
import CartoBio from './pages/CartoBio';
import ApiImpotParticulierFcSandbox from './pages/DgfipPages/ApiImpotParticulierFcSandbox';
import ApiImpotParticulierFcProduction from './pages/DgfipPages/ApiImpotParticulierFcProduction';
import ApiImpotParticulierSandbox from './pages/DgfipPages/ApiImpotParticulierSandbox';
import ApiR2PSandbox from './pages/DgfipPages/ApiR2PSandbox';
import ApiR2PProduction from './pages/DgfipPages/ApiR2PProduction';
import AidantsConnect from './pages/AidantsConnect';
import CopyEnrollment from './pages/CopyEnrollment';
import Enrollment from './pages/Enrollment';
import Accessibilite from './pages/Accessibilite';
import ApiImpotParticulierProduction from './pages/DgfipPages/ApiImpotParticulierProduction';
import ApiFicobaProduction from './pages/DgfipPages/ApiFicobaProduction';
import ApiFicobaSandbox from './pages/DgfipPages/ApiFicobaSandbox';
import AgenceBio from './pages/AgenceBio';
import UserList from './pages/AdminPages/UserList';
import Loader from './components/atoms/Loader';
import ApiDsnj from './pages/ApiDsnj';
import FranceRelanceFc from './pages/FranceRelanceFc';
import RgpdUpdate from './pages/AdminPages/RgpdUpdate';
import FranceRelanceApiRestreinte from './pages/FranceRelanceApiRestreinte';
import FranceRelanceApiOuverte from './pages/FranceRelanceApiOuverte';

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
          {({ user, isLoading, connectionError }) => (
            <main>
              {isLoading && (
                <section className="section-grey layout-full-page">
                  <Loader />
                </section>
              )}
              {!isLoading && connectionError && (
                <section className="section-grey layout-full-page layout-center">
                  <div className="notification error">{connectionError}</div>
                </section>
              )}
              {!isLoading && !connectionError && (
                <>
                  <Route
                    path="/public/:targetApi?"
                    component={PublicEnrollmentList}
                  />

                  <Route path="/stats/:targetApi?" component={Stats} />

                  <Route path="/accessibilite" component={Accessibilite} />

                  <PrivateRoute
                    exact
                    path="/"
                    component={
                      user &&
                      isEmpty(user.roles) &&
                      user.organizations.length < 5
                        ? UserEnrollmentList
                        : AdminEnrollmentList
                    }
                  />

                  <PrivateRoute
                    path="/api-particulier/:enrollmentId?"
                    component={ApiParticulier}
                  />

                  <PrivateRoute
                    path="/api-impot-particulier-sandbox/:enrollmentId?"
                    component={ApiImpotParticulierSandbox}
                  />

                  <PrivateRoute
                    path="/api-impot-particulier-production/:enrollmentId?"
                    component={ApiImpotParticulierProduction}
                  />

                  <PrivateRoute
                    path="/api-impot-particulier-fc-sandbox/:enrollmentId?"
                    component={ApiImpotParticulierFcSandbox}
                  />

                  <PrivateRoute
                    path="/api-impot-particulier-fc-production/:enrollmentId?"
                    component={ApiImpotParticulierFcProduction}
                  />

                  <PrivateRoute
                    path="/api-r2p-sandbox/:enrollmentId?"
                    component={ApiR2PSandbox}
                  />

                  <PrivateRoute
                    path="/api-r2p-production/:enrollmentId?"
                    component={ApiR2PProduction}
                  />

                  <PrivateRoute
                    path="/api-ficoba-sandbox/:enrollmentId?"
                    component={ApiFicobaSandbox}
                  />

                  <PrivateRoute
                    path="/api-ficoba-production/:enrollmentId?"
                    component={ApiFicobaProduction}
                  />

                  <PrivateRoute
                    path="/franceconnect/:enrollmentId?"
                    component={FranceConnect}
                  />

                  <PrivateRoute
                    path="/francerelance-fc/:enrollmentId?"
                    component={FranceRelanceFc}
                  />

                  <PrivateRoute
                    path="/francerelance-api-restreinte/:enrollmentId?"
                    component={FranceRelanceApiRestreinte}
                  />

                  <PrivateRoute
                    path="/francerelance-api-ouverte/:enrollmentId?"
                    component={FranceRelanceApiOuverte}
                  />

                  <PrivateRoute
                    path="/aidants-connect/:enrollmentId?"
                    component={AidantsConnect}
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
                    path="/le-taxi-clients/:enrollmentId?"
                    component={LeTaxiClients}
                  />

                  <PrivateRoute
                    path="/le-taxi-chauffeurs/:enrollmentId?"
                    component={LeTaxiChauffeurs}
                  />

                  <PrivateRoute
                    path="/preuve-covoiturage/:enrollmentId?"
                    component={PreuveCovoiturage}
                  />

                  <PrivateRoute
                    path="/cartobio/:enrollmentId?"
                    component={CartoBio}
                  />

                  <PrivateRoute
                    path="/agence-bio/:enrollmentId?"
                    component={AgenceBio}
                  />

                  <PrivateRoute
                    path="/api-dsnj/:enrollmentId?"
                    component={ApiDsnj}
                  />

                  <PrivateRoute
                    path="/copy-authorization-request/:enrollmentId"
                    component={CopyEnrollment}
                  />

                  <PrivateRoute
                    path="/authorization-request/:enrollmentId"
                    component={Enrollment}
                  />

                  <PrivateRoute path="/admin/users" component={UserList} />

                  <PrivateRoute
                    path="/admin/rgpd-update"
                    component={RgpdUpdate}
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
