import {BACK_HOST} from '@env'
import React from 'react'
import Router from 'next/router'
import PropTypes from 'prop-types'
import Utils from '../lib/utils'
import Services from '../lib/services'

const axios = require('axios')

// eslint-disable camelcase
class EntrantsTecniquesForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      enrollment: {
        documents: [],
        acl: {},
        ips_de_production: '', // eslint-disable-line camelcase
        autorite_certification: '', // eslint-disable-line camelcase
        autorite_certification_nom: '', // eslint-disable-line camelcase
        autorite_certification_fonction: '', // eslint-disable-line camelcase
        date_homologation: '', // eslint-disable-line camelcase
        date_fin_homologation: '', // eslint-disable-line camelcase
        recette_fonctionnelle: false // eslint-disable-line camelcase
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.upload = this.upload.bind(this)
  }

  componentDidMount() {
    const {id} = this.props

    let token
    if (typeof localStorage) token = localStorage.getItem('token')
    if (id) axios.get(BACK_HOST + '/api/enrollments/' + id, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    }).then(response => {
      this.setState({enrollment: response.data})
    })
  }

  upload(event) {
    const {id} = this.props

    const data = new FormData()
    data.append('enrollment[documents_attributes][][attachment]', event.target.files[0])
    data.append('enrollment[documents_attributes][][type]', 'Document::ProductionCertificatePublicKey')


    let token
    if (typeof localStorage) token = localStorage.getItem('token')
    axios.patch(BACK_HOST + '/api/enrollments/' + id, data, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    }).then((response) => this.setState({enrollment: response.data}))

  }

  handleChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    const stateCopy = Object.assign({}, this.state)

    Utils.deepSetInState(name, value, stateCopy)

    this.setState(stateCopy)
  }

  handleSubmit(event) {
    let token
    if (typeof localStorage) token = localStorage.getItem('token')
    const {enrollment} = this.state

    Services.triggerUserEnrollment('send_technical_inputs', enrollment, token).then(response => {
        if (response.status === 200) Router.push('/')
    }).catch(error => {
      if (error.response.status === 422) {
        alert('Formulaire incomplet' + response.request.response)
      } else if (error.response.status === 401) {
        alert('Vous n\'êtes pas autorisé' + response)
      } else {
        alert('Erreur inconnue' + response)
      }
    })
    event.preventDefault()
  }

  render() {
    let token
    if (typeof localStorage !== 'undefined') token = localStorage.getItem('token')
    const {enrollment, value} = this.state
    const readOnly = enrollment.acl.send_technical_inputs ? false : 'disabled'

    const productionCertificate = enrollment.documents.filter((e) => e.type == 'Document::ProductionCertificatePublicKey')[0]
    return (
      <form onSubmit={this.handleSubmit}>
        <h1 id='entrants-techniques'>Entrants techniques</h1>
        <section className='information-text'>
          <p>Afin de permettre la liaison technique entre votre SI et celui de la DGFiP, vous devez fournir les entrants techniques suivants : <br />
          adresse(s) IP du(-es) serveur(s) qui va(-ont) communiquer avec l'API « Impôt Particulier »<br />
          partie publique d’un certificat client RGS V2.0 en cours de validité avec son autorité de certification émettrice</p>
          <p>Afin de permettre votre mise en production dans les meilleures conditions possibles, veuillez vous assurer de la qualité de ces livrables techniques.</p>
        </section>
        <div className='form__group'>
          <label htmlFor='production_certificate'>Certificat de production</label>
          {productionCertificate &&
            <a href={BACK_HOST + productionCertificate.attachment.url + '?token=' + token}>certificat</a>
          }
          <input type='file' onChange={this.upload} disabled={readOnly} name='enrollment.production_certificate' id='production_certificate'/>
        </div>
        <div className='form__group'>
          <label htmlFor='autorite_certification'>Autorité de certification</label>
          <input type='text' onChange={this.handleChange} name='enrollment.autorite_certification' id='autorite_certification' disabled={readOnly} value={enrollment.autorite_certification} />
        </div>
        <div className='form__group'>
          <section className='information-text'>
            <p>La demande d'entrée en production revêt un caractère définitif et entraîne le transfert de vos entrants techniques vers les exploitants informatiques de la DGFiP. Merci de vous assurer de la bonne valorisation de l'ensemble des informations demandées avant de procéder à cette demande.</p>
            <p>Votre entrée en production se fera lors du premier créneau disponible à compter de l'envoi des entrants technique de production et conformément au calendrier accessible via le lien ci-dessous. </p>
          </section>
          <label htmlFor='ips_de_production'>IPs de production</label>
          <input type='text' onChange={this.handleChange} name='enrollment.ips_de_production' id='ips_de_production' disabled={readOnly} value={enrollment.ips_de_production} />
        </div>
        <h1 id='homologation-securite'>Homologation de sécurité</h1>
        <section className='information-text'>
          <p>Le Référentiel Général de Sécurité (RGS 2.0) rend la démarche d’homologation obligatoire pour les SI relatifs aux échanges entre une autorité administrative et les usagers ou entre autorités administratives.</p>
          <p>Si vous l’avez déjà fait, complétez les informations relatives à l’homologation et déposez la décision formelle d’homologation (également appelée attestation formelle).</p>
          <p>Si vous ne l’avez pas encore fait, envoyez-nous tout de même votre demande et nous vous aiderons à entamer cette démarche.</p>
        </section>

        <div className='form__group'>
          <label htmlFor='autorite_certification_nom'>Nom de l’autorité de certification</label>
          <input type='text' onChange={this.handleChange} name='enrollment.autorite_certification_nom' id='autorite_certification_nom' disabled={readOnly} value={enrollment.autorite_certification_nom} />
        </div>

        <div className='form__group'>
          <label htmlFor='autorite_certification_fonction'>Fonction de l’autorité de certification</label>
          <input type='text' onChange={this.handleChange} name='enrollment.autorite_certification_fonction' id='autorite_certification_fonction' disabled={readOnly} value={enrollment.autorite_certification_fonction} />
        </div>

        <div className='form__group'>
          <label htmlFor='date_homologation'>Date de début l’homologation</label>
          <input type='date' onChange={this.handleChange} name='enrollment.date_homologation' id='date_homologation' disabled={readOnly} value={enrollment.date_homologation} />
        </div>

        <div className='form__group'>
          <label htmlFor='date_fin_homologation'>Date de fin de l’homologation</label>
          <input type='date' onChange={this.handleChange} name='enrollment.date_fin_homologation' id='date_fin_homologation' disabled={readOnly} value={enrollment.date_fin_homologation} />
        </div>
        <h1 id='recette-fonctionnelle'>Recette fonctionnelle</h1>
        <section className='information-text'>
          <p>Afin d’assurer la qualification de votre applicatif, un générateur de bouchons est mis à votre disposition en suivant le lien ci-dessous. Il vous permettra de valoriser les données retournées par l’API « Impôt Particulier » en fonction de vos besoins métier ou d’utiliser le jeu de données natif. Cette qualification est obligatoire tant pour votre homologation de sécurité ou vos obligations CNIL que pour demander l’entrée en production auprès de la DGFiP.</p>
          <p><a href=''>Accèder aux générateurs de bouchons</a></p>
        </section>
        <div>
          <input onChange={this.handleChange} checked={enrollment.recette_fonctionnelle} type='checkbox' name='enrollment.recette_fonctionnelle' id='checkbox-recette_fonctionnelle' disabled={readOnly} />
          <label htmlFor='checkbox-recette_fonctionnelle' className='label-inline'>J'atteste avoir réalisé une recette fonctionnelle</label>
        </div>
        {!readOnly &&
          <div className='submit'>
            <section className='section'>
              <div className='notification'>
                <p>La demande d’entrée en production revêt un caractère définitif et entraîne le transfert de vos entrants techniques vers les exploitants informatiques de la DGFiP. Merci de vous assurer de la bonne valorisation de l’ensemble des informations demandées avant de procéder à cette demande.</p>
                <p>Votre entrée en production se fera lors du premier créneau disponible à compter de l’envoi des entrants technique de production et conformément au calendrier accessible via le lien ci-dessous. </p>

                <button className='button' type='submit' name='subscribe' id='submit'>Envoyer les entrants techniques</button>
              </div>
            </section>
          </div>
        }
      </form>
    )
  }
}

EntrantsTecniquesForm.propTypes = {
  id: PropTypes.string
}


export default EntrantsTecniquesForm
