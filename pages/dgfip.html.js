import React from 'react'
import PropTypes from 'prop-types'
import Page from '../components/page'
import DgfipForm from '../components/form'
import DgfipNav from '../components/dgfip-nav'
import EntrantsTechniquesForm from '../components/entrants-techniques-form'
import Services from '../lib/services'

const INTRO = (
  <div>
    <p>Dans le cadre du programme « Dites-le nous une fois - Particuliers», visant à simplifier les démarches administratives des usagers, l&apos;API « Impôt Particulier » permet de récupérer des informations fiscales des usagers de façon à leur éviter la transmission de leur avis d&apos;imposition papier.</p>

    <p>Ce portail permet de faciliter le raccordement du téléservice des fournisseurs de service à l&apos;API « Impôt Particulier ».</p>

    <p>Pour cela, il vous sera demandé de compléter le plus précisément possible les informations sur :</p>
    <ul>
      <li>le fondement juridique</li>
      <li>les données nécessaires à la démarche administrative</li>
      <li>la volumétrie de sollicitation de l&apos;API</li>
      <li>la protection des données personnelles.</li>
    </ul>
    <p>Un outil, conçu par la DGFiP et la DINSIC, est par ailleurs mis à votre disposition pour pouvoir tester l&apos;authentification SSL et concevoir vos bouchons .</p>
    <p>Ce portail permet de faciliter le raccordement du téléservice des fournisseurs de service à l&apos;API « Impôt Particulier ».</p>
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

  getQueryVariable(variable) {
    if (typeof window === 'undefined') {
      return null
    }

    const query = window.location.search.substring(1)
    const vars = query.split('&')

    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split('=')
      if (decodeURIComponent(pair[0]) === variable) {
        return decodeURIComponent(pair[1])
      }
    }

    console.log('Query variable %s not found', variable)
  }

  componentDidMount() {
    const tokenFc = this.getQueryVariable('token')
    let token

    if (typeof localStorage !== 'undefined' && tokenFc) {
      localStorage.setItem('token-fc', tokenFc)
    }

    if (typeof localStorage !== 'undefined') {
      token = localStorage.getItem('token')
    }

    const id = this.getQueryVariable('id')
    if (id) {
      Services.getUserEnrollment(id, token).then(enrollment => {
        this.setState({enrollment})
      })
    }
  }

  render() {
    const {url} = this.props
    const {enrollment} = this.state
    const formText = {
      title: 'Demande d\'accès à l\'API Impôts Particulier',
      intro: INTRO
    }

    return (
      <Page>
        <div className='documentation'>
          <DgfipNav id={url.query.id} />
          <div className='main-pane'>
            <DgfipForm id={url.query.id} fournisseur='dgfip' formText={formText} />
            { enrollment.acl.show_technical_inputs &&
              <EntrantsTechniquesForm id={url.query.id} />
            }
          </div>
        </div>
      </Page>
    )
  }
}

Dgfip.propTypes = {
  url: PropTypes.object.isRequired
}

export default Dgfip
