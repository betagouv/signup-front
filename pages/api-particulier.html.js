import React from 'react'
import PropTypes from 'prop-types'
import Page from '../components/page'
import Form from '../components/form'
import ApiParticulierNav from '../components/api-particulier-nav'

import Redirect from '../components/redirect'
import {getQueryVariable} from '../lib/utils'
import ApiParticulierFormConfiguration from '../components/data/api-particulier.form'

const IntroDescription = () => (
  <div className='intro'>
    <p>
      Pour avoir accès à l&apos;API Particulier, diffusant des données personnelles, vous devez obtenir un agrément.
      L&apos;accès à cette API n&apos;est pour l&apos;instant disponible que si vous êtes:
    </p>
    <ul>
      <li>une administration</li>
      <li>une entreprise prestataire d&apos;une administration ou ayant une délégation de service public</li>
    </ul>
    <p>
      Pour utiliser API Particulier, vous devez vous engager à traiter la bonne donnée par le bon agent de votre
      administration et informer correctement l’usager.
    </p>
  </div>
)

const DemarcheDescription = () => (
  <div className='information-text'>
    <p>
      C&apos;est la raison pour laquelle vous collectez des données personnelles, l&apos;objectif qui est poursuivi par
      le fichier que vous mettez en place. Par exemple, « télé-procédure permettant aux usagers de demander une aide au
      paiement de la cantine des collégiens » ou « télé-procédure de demande de bourses de lycée ».
    </p>
  </div>
)

const CadreJuridiqueDescription = () => (
  <div className='information-text'>
    <p>
      Pour pouvoir bénéficier du raccordement à l&lsquo;API Particulier, le cadre légal
      et réglementaire des fournisseurs de service doit permettre à la DINSIC de transmettre des données fiscales à votre
      entité administrative.
    </p>
    <p>
      Il vous est donc demandé de préciser les références du fondement légal de votre droit à
      demander ces informations (délibération du conseil municipal, décret …).
    </p>
  </div>
)

const CguDescription = () => (<React.Fragment />)

const ApiParticulier = ({url}) => {
  const id = getQueryVariable('id')

  return (
    <div>
      <Redirect redirect pathName={url.asPath} />
      <Page requireUser>
        <div className='documentation'>
          <ApiParticulierNav />
          <div className='main-pane'>
            <Form
              id={id}
              form={ApiParticulierFormConfiguration}
              IntroDescription={IntroDescription}
              DemarcheDescription={DemarcheDescription}
              CguDescription={CguDescription}
              CadreJuridiqueDescription={CadreJuridiqueDescription}
            />
          </div>
        </div>
      </Page>
    </div>
  )
}

ApiParticulier.propTypes = {
  url: PropTypes.object.isRequired
}

export default ApiParticulier
