import React from 'react'
import Router from 'next/router'
import Utils from '../lib/utils'
import Services from '../lib/services'

class ContractualisationForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      enrollment: {
        fournisseur_de_service: '',
        description_service: '',
        fondement_juridique: '',
        scope_dgfip_avis_imposition: true,
        scope_cnaf_attestation_droits: false,
        scope_cnaf_quotient_familial: true,
        nombre_demandes_annuelle: '',
        pic_demandes_par_heure: '',
        nombre_demandes_mensuelles_jan: '',
        nombre_demandes_mensuelles_fev: '',
        nombre_demandes_mensuelles_mar: '',
        nombre_demandes_mensuelles_avr: '',
        nombre_demandes_mensuelles_mai: '',
        nombre_demandes_mensuelles_jui: '',
        nombre_demandes_mensuelles_jul: '',
        nombre_demandes_mensuelles_aou: '',
        nombre_demandes_mensuelles_sep: '',
        nombre_demandes_mensuelles_oct: '',
        nombre_demandes_mensuelles_nov: '',
        nombre_demandes_mensuelles_dec: '',
        autorite_certification_nom: '',
        autorite_certification_fonction: '',
        date_homologation: '',
        date_fin_homologation: '',
        delegue_protection_donnees: '',
        validation_de_convention: false,
        certificat_pub_production: '',
        autorite_certification: ''
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
        Router.push('/demandes')
      } else if (response.status === 422) {
        alert('Formulaire incomplet' + response.request.response)
      } else if (response.status === 401) {
        alert('Vous n\'êtes pas autorisé' + response)
      } else {
        alert('Erreur inconnue' + response)
      }
    })
    event.preventDefault()
  }

  render() {
    const {value} = this.state

    return (
      <div className='main-pane'>
        <form onSubmit={this.handleSubmit}>
          <h1 id='legal'>Fondement juridique</h1>
          <section className='information-text'>
            <p>Pour pouvoir bénéficier du raccordement à l&lsquo;API Particulier, le cadre légal et réglementaire des fournisseurs de service doit permettre à la DINSIC de leur transmettre des données à caractère personnel.</p>
          </section>
          <div className='form__group'>
            <label htmlFor='fournisseur_de_service'>Nom du fournisseur de service</label>
            <input type='text' onChange={this.handleChange} name='enrollment.fournisseur_de_service' id='fournisseur_de_service' value={value} />
          </div>
          <div className='form__group'>
            <label htmlFor='description_service'>Décrivez brièvement votre service ainsi que l&lsquo;utilisation prévue des données transmises</label>
            <textarea onChange={this.handleChange} name='enrollment.description_service' id='description_service' value={value} />
          </div>
          <div className='form__group'>
            <label htmlFor='fondement_juridique'>Veuillez transmettre le fondement juridique sur lequel s’appuie votre demande (décret, délibération …)</label>
            <textarea onChange={this.handleChange} name='enrollment.fondement_juridique' id='fondement_juridique' value={value} />
          </div>

          <h1 id='donnees'>Choix des données</h1>
          <section className='information-text'>
            <p>Les règles relatives à la protection de la vie privée fixent les principes à respecter lors de la collecte, du traitement et de la conservation de données personnelles. Les données ainsi récoltées doivent être adéquates, pertinentes et proportionnelles par rapport au traitement.</p>
            <p>Nous vous remercions de sélectionner uniquement les données strictement nécessaires à votre téléservice.
              Le non-respect de ces règles vous expose vis à vis de la CNIL.</p>
          </section>
          <div className='form__group'>
            <fieldset className='vertical'>
              <legend>Sélectionnez vos jeux de données souhaités</legend>
              <div>
                <input onChange={this.handleChange} checked={this.state.scope_dgfip_avis_imposition} type='checkbox' name='enrollment.scope_dgfip_avis_imposition' id='checkbox-scope_dgfip_avis_imposition' value='true' />
                <label htmlFor='checkbox-scope_dgfip_avis_imposition' className='label-inline'>DGFiP - Avis Imposition</label>
              </div>
              <div>
                <input onChange={this.handleChange} checked={this.state.scope_cnaf_attestation_droits} type='checkbox' name='enrollment.scope_cnaf_attestation_droits' id='checkbox-scope_cnaf_attestation_droits' value='scope_cnaf_attestation_droits' />
                <label htmlFor='checkbox-scope_cnaf_attestation_droits' className='label-inline'>CNAF - Attestation de droits</label>
              </div>
              <div>
                <input onChange={this.handleChange} checked={this.state.scope_cnaf_quotient_familial} type='checkbox' name='enrollment.scope_cnaf_quotient_familial' id='checkbox-scope_cnaf_quotient_familial' value='true' />
                <label htmlFor='checkbox-scope_cnaf_quotient_familial' className='label-inline'>CNAF - Quotient Familial</label>
              </div>
            </fieldset>
          </div>

          <h1 id='volumetrie'>Volumétrie</h1>
          <section className='information-text'>
            <p>Avoir une information de la volumétrie et, le cas échéant à la saisonnalité de votre démarche, nous
            permettra de vous offrir la meilleure qualité de service possible en lien avec les différents fournisseurs de vos données.</p>
            <p>Conformément à nos <a href='#convention'>conditions d’utilisation</a>, nous nous réservons le droit de réduire ou couper vos appels.</p>
          </section>

          <div className='form__group'>
            <label htmlFor='nombre_demandes_annuelle'>Connaissez-vous le volume global annuel des demandes de votre téléservice&nbsp;?</label>
            <input type='text' onChange={this.handleChange} name='enrollment.nombre_demandes_annuelle' id='nombre_demandes_annuelle' value={value} />
          </div>

          <div className='form__group'>
            <label htmlFor='pic_demandes_par_heure'>Connaissez-vous le pic de charge (en nombre de demandes horaires)&nbsp;?</label>
            <input type='text' onChange={this.handleChange} name='enrollment.pic_demandes_par_heure' id='pic_demandes_par_heure' value={value} />
          </div>

          <div className='form__group'>
            <label htmlFor='pic_demandes_par_heure'>Connaissez-vous la répartition de la charge des demandes mensuelles (0 si le service est fermé)&nbsp;?</label>
            <pre>
              <code>
                &lsquo;nombre_demandes_mensuelles_jan&lsquo;: 45,
                &lsquo;nombre_demandes_mensuelles_fev&lsquo;: 45,
                &lsquo;nombre_demandes_mensuelles_mar&lsquo;: 45,
                &lsquo;nombre_demandes_mensuelles_avr&lsquo;: 45,
                &lsquo;nombre_demandes_mensuelles_mai&lsquo;: 45,
                &lsquo;nombre_demandes_mensuelles_jui&lsquo;: 45,
                &lsquo;nombre_demandes_mensuelles_jul&lsquo;: 45,
                &lsquo;nombre_demandes_mensuelles_aou&lsquo;: 45,
                &lsquo;nombre_demandes_mensuelles_sep&lsquo;: 45,
                &lsquo;nombre_demandes_mensuelles_oct&lsquo;: 45,
                &lsquo;nombre_demandes_mensuelles_nov&lsquo;: 45,
                &lsquo;nombre_demandes_mensuelles_dec&lsquo;: 45,
              </code>
            </pre>
          </div>

          <h1 id='cnil'>Obligation CNIL</h1>
          <section className='information-text'>
            <p>L’entrée en vigueur le 25 mai 2018 du règlement européen sur la protection des données supprime totalement le régime déclaratif.</p>
            <p>Les fournisseurs de services ont en particulier l’obligation de tenir un registre de leurs activités de traitement, d’encadrer les opérations sous-traitées dans les contrats de prestation de services, de formaliser des politiques de confidentialité des données et des procédures relatives à la gestion des demandes d’exercice des droits.</p>
            <p>La désignation d’un délégué à la protection des données devient obligatoire pour les organismes et autorités publics, et donc pour les fournisseurs de services.</p>
          </section>

          <div className='form__group'>
            <label htmlFor='delegue_protection_donnees'>Délégué·e à la protection des données</label>
            <input type='text' onChange={this.handleChange} name='enrollment.delegue_protection_donnees' id='delegue_protection_donnees' value={value} />
          </div>

          <div className='form__group'>
            <input type='checkbox' name='enrollment.checkbox-cnil' id='checkbox-cnil'/>
            <label htmlFor='checkbox-cnil' className='label-inline'>Je déclare avoir accompli mes démarches CNIL en accord avec le règlement général de protection des données</label>
          </div>

          <h1 id='convention'>Convention</h1>
          <section className='information-text'>
            <p>Merci de prendre connaissance de la convention d’adhésion d’API Particulier afin de demander un jeton d’accès en décrivant votre projet.</p>
          </section>

          <iframe src='static/docs/charte.pdf' width='100%' height='800px' />

          <div className='form__group'>
            <input onChange={this.handleChange} checked={this.state.validation_de_convention} type='checkbox' name='enrollment.validation_de_convention' id='validation_de_convention' />
            <label htmlFor='validation_de_convention' className='label-inline'>Je valide la présente convention</label>
          </div>

          <div className='button-list'>
            <button className='button' type='submit' name='subscribe' id='submit'>Soumettre la demande</button>
          </div>
        </form>
      </div>
    )
  }
}

export default ContractualisationForm
