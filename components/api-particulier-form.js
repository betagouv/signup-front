import React from 'react'
import Router from 'next/router'
import Utils from '../lib/utils'
import Services from '../lib/services'
import Convention from './convention'

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
        information_DPO_confirmee: false, // eslint-disable-line camelcase
        scope_dgfip_avis_imposition: '', // eslint-disable-line camelcase
        scope_cnaf_attestation_droits: '', // eslint-disable-line camelcase
        scope_cnaf_quotient_familial: '', // eslint-disable-line camelcase
        duree_conservation_donnees: '', // eslint-disable-line camelcase
        DPO_de_convention: false, // eslint-disable-line camelcase
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

          <div className='form__group'>
            <fieldset className='vertical'>
              <legend>Sélectionnez vos jeux de données souhaités</legend>
              <div>
                <input onChange={this.handleChange} checked={enrollment.scope_dgfip_avis_imposition ? 'checked' : false} type='checkbox' name='enrollment.scope_dgfip_avis_imposition' id='checkbox-scope_dgfip_avis_imposition' value='true' />
                <label htmlFor='checkbox-scope_dgfip_avis_imposition' className='label-inline'>DGFiP - Avis Imposition</label>
              </div>
              <div>
                <input onChange={this.handleChange} checked={enrollment.scope_cnaf_attestation_droits ? 'checked' : false} type='checkbox' name='enrollment.scope_cnaf_attestation_droits' id='checkbox-scope_cnaf_attestation_droits' value='scope_cnaf_attestation_droits' />
                <label htmlFor='checkbox-scope_cnaf_attestation_droits' className='label-inline'>CNAF - Attestation de droits</label>
              </div>
              <div>
                <input onChange={this.handleChange} checked={enrollment.scope_cnaf_quotient_familial ? 'checked' : false} type='checkbox' name='enrollment.scope_cnaf_quotient_familial' id='checkbox-scope_cnaf_quotient_familial' value='true' />
                <label htmlFor='checkbox-scope_cnaf_quotient_familial' className='label-inline'>CNAF - Quotient Familial</label>
              </div>
            </fieldset>
          </div>
          <div className='form__group'>
            <label htmlFor='duree_conservation_donnees'>Durée de conservation des données (en mois, années ??)</label>
            <input type='text' onChange={this.handleChange} name='enrollment.duree_conservation_donnees' id='duree_conservation_donnees' value={enrollment.url_fondement_juridique} />
          </div>
          <div className='form__group'>
            <label htmlFor='texte_fondement_juridique'>Destinataires des données</label>
            <textarea onChange={this.handleChange} name='enrollment.texte_fondement_juridique' id='texte_fondement_juridique' value={enrollment.texte_fondement_juridique} />
          </div>
          <section className='information-text'>Pour mémoire, seuls les agents dûment habilités pour traiter une démarches doivent accéder aux données transmises.</section>
          <Convention />
          <div className='form__group'>
            <input onChange={this.handleChange} checked={enrollment.validation_de_convention} type='checkbox' name='enrollment.validation_de_convention' id='validation_de_convention' />
            <label htmlFor='validation_de_convention' className='label-inline'>J&lsquo;ai compris et j&lsquo;accepte <a href='/static/docs/convention.pdf'>la convention d’adhésion à API Particulier</a></label>
          </div>
          <div className='form__group'>
            <input onChange={this.handleChange} checked={enrollment.information_DPO_confirmee} type='checkbox' name='enrollment.information_DPO_confirmee' id='information_DPO_confirmee' />
            <label htmlFor='information_DPO_confirmee' className='label-inline'> Je confirme que le DPO de mon organisme est informé de la présente demande</label>
          </div>
        </form>

      </div>
    )
  }
}

export default ApiParticulierForm
