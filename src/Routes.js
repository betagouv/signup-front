import React, { useLayoutEffect } from 'react';
import { Route, useLocation } from 'react-router-dom';
import PublicEnrollmentList from './components/templates/PublicEnrollmentList';
import Stats from './components/templates/Stats';
import Accessibilite from './components/templates/Accessibilite';
import PrivateRoute from './components/organisms/PrivateRoute';
import { isEmpty } from 'lodash';
import AdminEnrollmentList from './components/templates/AdminEnrollmentList';
import ApiImpotParticulierSandbox from './pages/DgfipPages/ApiImpotParticulierSandbox';
import ApiImpotParticulierProduction from './pages/DgfipPages/ApiImpotParticulierProduction';
import ApiImpotParticulierFcSandbox from './pages/DgfipPages/ApiImpotParticulierFcSandbox';
import ApiImpotParticulierFcProduction from './pages/DgfipPages/ApiImpotParticulierFcProduction';
import ApiR2PSandbox from './pages/DgfipPages/ApiR2PSandbox';
import ApiR2PProduction from './pages/DgfipPages/ApiR2PProduction';
import ApiFicobaSandbox from './pages/DgfipPages/ApiFicobaSandbox';
import ApiFicobaProduction from './pages/DgfipPages/ApiFicobaProduction';
import FranceConnect from './pages/FranceConnect';
import FranceRelanceFc from './pages/FranceRelanceFc';
import AidantsConnect from './pages/AidantsConnect';
import ApiDroitsCnam from './pages/ApiDroitsCnam';
import LeTaxiClients from './pages/LeTaxiClients';
import LeTaxiChauffeurs from './pages/LeTaxiChauffeurs';
import PreuveCovoiturage from './pages/PreuveCovoiturage';
import CartoBio from './pages/CartoBio';
import AgenceBio from './pages/AgenceBio';
import ApiHermesSandbox from './pages/DgfipPages/ApiHermesSandbox';
import ApiHermesProduction from './pages/DgfipPages/ApiHermesProduction';
import ApiProSanteConnect from './pages/ApiProSanteConnect';
import CopyEnrollment from './components/templates/CopyEnrollment';
import Enrollment from './components/templates/Enrollment';
import ApiParticulier from './pages/ApiParticulier';
import UserEnrollmentList from './components/templates/UserEnrollmentList';
import ApiEntreprise from './pages/ApiEntreprise';
import ApiServiceNational from './pages/ApiServiceNational';
import ApiStatutEtudiant from './pages/ApiStatutEtudiant';
import ApiHomePlus from './pages/ApiHomePlus';
import Hubee from './pages/Hubee';
import Admin from './components/templates/Admin';
import { withUser } from './components/organisms/UserContext';

export const Routes = ({ user }) => {
  const location = useLocation();

  useLayoutEffect(() => window.scrollTo(0, 0), [location.pathname]);

  return (
    <>
      <Route path="/public/:targetApi?" component={PublicEnrollmentList} />

      <Route path="/stats/:targetApi?" component={Stats} />

      <Route path="/accessibilite" component={Accessibilite} />

      <PrivateRoute
        exact
        path="/"
        component={
          user && isEmpty(user.roles) && user.organizations.length < 5
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

      <PrivateRoute path="/cartobio/:enrollmentId?" component={CartoBio} />

      <PrivateRoute path="/agence-bio/:enrollmentId?" component={AgenceBio} />

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

      <PrivateRoute path="/hubee/:enrollmentId?" component={Hubee} />

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
  );
};

export default withUser(Routes);
