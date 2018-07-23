import React from 'react'
import PropTypes from 'prop-types'
import {FRANCE_CONNECT_CREATE_SERVICE_PROVIDER_URI} from '@env'
import Redirect from '../components/redirect'
import Page from '../components/page'
import Form from '../components/form'
import DgfipNav from '../components/dgfip-nav'
import EntrantsTechniquesForm from '../components/entrants-techniques-form'
import Services from '../lib/services'
import {getQueryVariable} from '../lib/utils'
import DgfipFormConfiguration from '../components/data/dgfip.form'

const IntroDescription = () => (
  <div className='intro'>
    <p>
        Dans le cadre du programme « Dites-le nous une fois - Particuliers», visant à simplifier les démarches
      administratives des usagers, l&apos;API « Impôt Particulier » permet de récupérer des informations fiscales des
      usagers de façon à leur éviter la transmission de leur avis d&apos;imposition papier.
    </p>
    <p>
      Ce portail permet de faciliter le raccordement du téléservice des fournisseurs de service à l&apos;API « Impôt Particulier ».
    </p>
    <p>
      Pour cela, il vous sera demandé de compléter le plus précisément possible les informations sur :
    </p>
    <ul>
      <li>le fondement juridique</li>
      <li>les données nécessaires à la démarche administrative</li>
      <li>la volumétrie de sollicitation de l&apos;API</li>
      <li>la protection des données personnelles.</li>
    </ul>
    <p>
      Un outil, conçu par la DGFiP et la DINSIC, est par ailleurs mis à votre disposition pour pouvoir tester
      l&apos;authentification SSL et concevoir vos bouchons.
    </p>
    <p>
      Ce portail permet de faciliter le raccordement du téléservice des fournisseurs de service à l&apos;API « Impôt Particulier ».
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
    <p>
      Si vous n&apos;en avez pas encore, veuillez <a target='_blank' rel='noopener noreferrer' href={FRANCE_CONNECT_CREATE_SERVICE_PROVIDER_URI}>créer un fournisseur de service</a> qui implémentera cette démarche.
    </p>
  </div>
)

const CguDescription = () => (
  <div className='information-text'>
    <p>
      Votre raccordement à l&lsquo;API « Impôt Particulier » nécessite l&lsquo;acceptation de la convention
      d&lsquo;adhésion fixant vos engagements et ceux de la DGFIP et la DINSIC. <br /> Les liens ci-dessous vous
      permettront de visualiser la convention type ainsi que ses annexes. <br /> La convention générée à l&lsquo;issue de
      votre demande de raccordement contiendra l&lsquo;ensemble des éléments propres à votre situation. <br /> Cette
      convention sera publiée sur api.gouv.fr et sera accessible via vos identifiants FranceConnect.
    </p>
  </div>
)

const CadreJuridiqueDescription = () => (
  <div className='information-text'>
    <p>
      Pour pouvoir bénéficier du raccordement à l&lsquo;API Impôts Particulier, le cadre légal et réglementaire des
      fournisseurs de service doit permettre à la DGFIP de transmettre des données fiscales à votre entité
      administrative.
    </p>
    <p>
      Il vous est donc demandé de préciser les références du fondement légal de votre droit à
      demander ces informations (délibération du conseil municipal, décret …).
    </p>
  </div>
)

class Dgfip extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      enrollment: {
        acl: {}
      }
    }
  }

  componentDidMount() {
    let token

    if (typeof localStorage !== 'undefined') {
      token = localStorage.getItem('token')
    }

    const id = getQueryVariable('id')
    if (id) {
      Services.getUserEnrollment(id, token).then(enrollment => {
        this.setState({enrollment})
      })
    }
  }

  render() {
    const {url} = this.props
    const {enrollment} = this.state

    return (
      <div>
        <Redirect pathName={url.asPath} />
        <Page requireUser>
          <div className='documentation'>
            <DgfipNav id={url.query.id} />
            <div className='main-pane'>
              <Form
                id={url.query.id}
                form={DgfipFormConfiguration}
                IntroDescription={IntroDescription}
                DemarcheDescription={DemarcheDescription}
                CguDescription={CguDescription}
                CadreJuridiqueDescription={CadreJuridiqueDescription}
              />
              { enrollment.acl.show_technical_inputs &&
                <EntrantsTechniquesForm id={url.query.id} />
              }
            </div>
          </div>
        </Page>
      </div>
    )
  }
}

Dgfip.propTypes = {
  url: PropTypes.object.isRequired
}

export default Dgfip
