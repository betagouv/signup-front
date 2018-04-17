import React from 'react'
import Router from 'next/router'
import Utils from '../lib/utils'
import Services from '../lib/services'

class ApiParticulierForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      enrollment: {
        fournisseur_de_service: '', // eslint-disable-line camelcase
        description_service: '', // eslint-disable-line camelcase
        texte_fondement_juridique: '', // eslint-disable-line camelcase
        url_fondement_juridique: '', // eslint-disable-line camelcase
        validation_de_convention: false, // eslint-disable-line camelcase
        fournisseur_de_donnees: 'api-particulier' // eslint-disable-line camelcase
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
    const token = localStorage.getItem('token')
    const componentState = this.state
    Services.createUserEnrollment(componentState, token).then(response => {
      if (response.status === 201) {
        Router.push('/')
      } else if (response.status === 422) {
        alert('Formulaire incomplet' + response.request.response) // eslint-disable-line no-alert
      } else if (response.status === 401) {
        alert('Vous n\'êtes pas autorisé' + response) // eslint-disable-line no-alert
      } else {
        alert('Erreur inconnue' + response) // eslint-disable-line no-alert
      }
    })
    event.preventDefault()
  }

  render() {
    const {enrollment} = this.state

    return (
      <div className='main-pane'>
        <h1>Introdution</h1>
        <section className='information-text'>
          <p>Pour avoir accès à l&lsquo;API Particulier, diffusant des données personnelles, vous devez obtenir un agrément.</p>
          <p> L&lsquo;accès à cette API n&lsquo;est pour l&lsquo;instant disponible que si vous êtes :</p>
          <ul>
            <li>une administration</li>
            <li>une entreprise prestataire d&lsquo;une administration ou ayant une délégation de service public</li>
          </ul>
          <p>Vous devez justifier d&lsquo;une simplification pour les citoyens, et vous engager à n&lsquo;accéder aux données personnelles qu&lsquo;avec l&lsquo;accord explicite de l&lsquo;usager.</p>
        </section>
        <form onSubmit={this.handleSubmit}>

          <h1 id='identite'>Identité</h1>
          <section className='information-text'>texte descriptif</section>
          {/* <Search />
          <div className='form__group'>
            <label htmlFor='nombre_demandes_annuelle'>Connaissez-vous le volume global annuel des demandes de votre téléservice&nbsp;?</label>
            <input type='text' onChange={this.handleChange} name='enrollment.nombre_demandes_annuelle' id='nombre_demandes_annuelle' value={value} />
          </div> */}

          <h1 id='demarches'>Démarches</h1>
          <section className='information-text'>C&lsquo;est la raison pour laquelle vous collectez des données personnelles, l&lsquo;objectif qui est poursuivi par le fichier que vous mettez en place. Par exemple, « télé-procédure permettant aux usagers de demander une aide au paiement de la cantine des collégiens » ou « télé-procédure de demande de bourses de lycée ».</section>
          <div className='form__group'>
            <label htmlFor='fournisseur_de_service'>Titre de la démarche</label>
            <input type='text' onChange={this.handleChange} name='enrollment.fournisseur_de_service' id='fournisseur_de_service' value={enrollment.fournisseur_de_service} />
          </div>
          <div className='form__group'>
            <label htmlFor='description_service'>Décrivez succintement votre démarche en indiquant les finalités au sens CNIL</label>
            <textarea rows='10' onChange={this.handleChange} name='enrollment.description_service' id='description_service' value={enrollment.description_service} />
          </div>
          <h2>Cadre juridique</h2>
          <section className='information-text'>Veuillez transmettre le fondement juridique sur lequel s’appuie votre demande</section>
          <div className='form__group'>
            <label htmlFor='texte_fondement_juridique'>Indiquez la référence du texte</label>
            <textarea onChange={this.handleChange} name='enrollment.texte_fondement_juridique' id='texte_fondement_juridique' value={enrollment.texte_fondement_juridique} />
          </div>
          <div className='form__group'>
            <label htmlFor='url_fondement_juridique'>Indiquez l&lsquo;url du texte</label>
            <input type='text' onChange={this.handleChange} name='enrollment.url_fondement_juridique' id='url_fondement_juridique' value={enrollment.url_fondement_juridique} />
          </div>

          <h1 id='donnees'>Données</h1>
          <section className='information-text'>texte descriptif</section>

        </form>

      </div>
    )
  }
}

export default ApiParticulierForm
