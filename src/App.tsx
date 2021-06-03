import { Router, Route } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { createBrowserHistory } from 'history';
import PiwikReactRouter from 'piwik-react-router';

import './App.css';

import Footer from './components/organisms/Footer';
import Header from './components/organisms/Header';
import PrivateRoute from './components/organisms/PrivateRoute';
import { UserStore, UserContext } from './components/organisms/UserContext';

import AdminEnrollmentList from './components/templates/AdminEnrollmentList';
import UserEnrollmentList from './components/templates/UserEnrollmentList';
import PublicEnrollmentList from './components/templates/PublicEnrollmentList';
import Stats from './components/templates/Stats';
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
import CopyEnrollment from './components/templates/CopyEnrollment';
import Enrollment from './components/templates/Enrollment';
import Accessibilite from './components/templates/Accessibilite';
import ApiImpotParticulierProduction from './pages/DgfipPages/ApiImpotParticulierProduction';
import ApiFicobaProduction from './pages/DgfipPages/ApiFicobaProduction';
import ApiFicobaSandbox from './pages/DgfipPages/ApiFicobaSandbox';
import AgenceBio from './pages/AgenceBio';
import Loader from './components/atoms/Loader';
import ApiServiceNational from './pages/ApiServiceNational';
import FranceRelanceFc from './pages/FranceRelanceFc';
import ApiStatutEtudiant from './pages/ApiStatutEtudiant';
import ApiHermesSandbox from './pages/DgfipPages/ApiHermesSandbox';
import ApiHermesProduction from './pages/DgfipPages/ApiHermesProduction';
import ApiHomePlus from './pages/ApiHomePlus';
import Admin from './components/templates/Admin';
import Hubee from './pages/Hubee';
import ApiProSanteConnect from './pages/ApiProSanteConnect';

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
                    path="/api-service-national/:enrollmentId?"
                    component={ApiServiceNational}
                  />

                  <PrivateRoute
                    path="/api-statut-etudiant/:enrollmentId?"
                    component={ApiStatutEtudiant}
                  />

                  <PrivateRoute
                    path="/api-hermes-sandbox/:enrollmentId?"
                    component={ApiHermesSandbox}
                  />

                  <PrivateRoute
                    path="/api-hermes-production/:enrollmentId?"
                    component={ApiHermesProduction}
                  />

                  <PrivateRoute
                    path="/api-home-plus/:enrollmentId?"
                    component={ApiHomePlus}
                  />

                  <PrivateRoute
                    path="/hubee/:enrollmentId?"
                    component={Hubee}
                  />

                  <PrivateRoute
                    path="/api-pro-sante-connect/:enrollmentId?"
                    component={ApiProSanteConnect}
                  />

                  <PrivateRoute
                    path="/copy-authorization-request/:enrollmentId"
                    component={CopyEnrollment}
                  />

                  <PrivateRoute
                    path="/authorization-request/:enrollmentId"
                    component={Enrollment}
                  />

                  <PrivateRoute path="/admin" component={Admin} />
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
