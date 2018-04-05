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
        scope_dgfip_RFR: true,
        scope_dgfip_adresse_fiscale_taxation: false,
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
    Services.postFormToBack(componentState, token).then(response => {
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
            <p>Pour pouvoir bénéficier du raccordement à l&lsquo;API Impôts Particulier, le cadre légal et réglementaire des fournisseurs de service doit permettre à la DGFIP de transmettre des données fiscales  à votre entité administrative.</p>
            <p>Il vous est donc demandé de préciser les références du fondement légal de votre droit à demander ces informations (délibération du conseil municipal, décret …) ainsi que les informations relatives à votre téléservice.</p>
          </section>
          <div className='form__group'>
            <label htmlFor='fournisseur_de_service-fc'>Sélectionnez le Fournisseur de Service FranceConnect pour lequel vous souhaitez un raccordement</label>
            <select onChange={this.handleChange} name='enrollment.fournisseur_de_service' id='fournisseur_de_service'>
              <option value='fournisseur_de_service-fc-1'>Calcul du quotient familial</option>
              <option value='fournisseur_de_service-fc-2'>Inscription à la cantine scolaire</option>
            </select>
          </div>
          <div className='form__group'>
            <label htmlFor='description_service'>Décrivez brièvement votre service ainsi que l&lsquo;utilisation prévue des données transmises</label>
            <textarea onChange={this.handleChange} name='enrollment.description_service' id='description_service' value={value} />
          </div>
          <div className='form__group'>
            <label htmlFor='fondement_juridique'>Veuillez transmettre le fondement juridique sur lequel s’appuie votre demande</label>
            <textarea onChange={this.handleChange} name='enrollment.fondement_juridique' id='fondement_juridique' value={value} />
          </div>

          <h1 id='donnees'>Choix des données</h1>
          <section className='information-text'>
            <p>La loi informatique et libertés définit les principes à respecter lors de la collecte, du traitement et de la conservation de données personnelles.</p>
            <p>L’article 6 précise :</p>
            <ul>
              <li>3° [les données] sont adéquates, pertinentes et non excessives au regard des finalités pour lesquelles
                elles sont collectées et de leurs traitements ultérieurs ;</li>
              <li>4° Elles sont exactes, complètes et, si nécessaire, mises à jour ; les mesures appropriées doivent être
                prises pour que les données inexactes ou incomplètes au regard des finalités pour lesquelles elles sont
                collectées ou traitées soient effacées ou rectifiées ;</li>
            </ul>
            <p>Nous vous remercions de sélectionner uniquement les données strictement nécessaires à votre téléservice.
              Le non-respect du principe de proportionnalité vous expose vis à vis de la CNIL.</p>
          </section>
          <div className='form__group'>
            <fieldset className='vertical'>
              <legend>Sélectionnez vos jeux de données souhaités</legend>
              <div>
                <input onChange={this.handleChange} checked={this.state.scope_dgfip_avis_imposition} type='checkbox' name='enrollment.scope_dgfip_RFR' id='checkbox-scope_dgfip_RFR' value='true' />
                <label htmlFor='checkbox-scope_dgfip_RFR' className='label-inline'>DGFiP - Revenu Fiscal de Référence (RFR) et nombre de parts fiscales du foyer</label>
              </div>
              <div>
                <input onChange={this.handleChange} checked={this.state.scope_dgfip_adresse_fiscale_taxation} type='checkbox' name='enrollment.scope_dgfip_adresse_fiscale_taxation' id='checkbox-scope_dgfip_adresse_fiscale_taxation' value='scope_dgfip_adresse_fiscale_taxation' />
                <label htmlFor='checkbox-scope_dgfip_adresse_fiscale_taxation' className='label-inline'>DGFiP - Adresse fiscale de taxation au 1er janvier</label>
              </div>
            </fieldset>
          </div>

          <h1 id='volumetrie'>Volumétrie</h1>
          <section className='information-text'>
            <p>Connaitre les données relatives à la volumétrie et à la saisonnalité de votre téléservice nous
            permettra de vous offrir la meilleure qualité de service possible. En effet, cela permettra de prévenir les pics de charges et de transmettre ces informations aux fournisseurs de vos données.</p>
            <p>Conformément à notre charte, nous nous réservons le droit de réduire ou couper les appels autorisés au fournisseur de service.</p>
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
            <label>Connaissez-vous la répartition de la charge des demandes mensuelles (0 si le service est fermé)&nbsp;?</label>
            <div className='form__group'>
              <div className='date_input_row'>
                <div className='date_input_col'>
                  <label htmlFor='nombre_de_demandes_mensuelles_jan'>Janvier</label>
                  <input type='text' onChange={this.handleChange} name='enrollment.nombre_de_demandes_mensuelles_jan' id='nombre_de_demandes_mensuelles_jan' value={value} />
                </div>
                <div className='date_input_col'>
                  <label htmlFor='nombre_de_demandes_mensuelles_fev'>Février</label>
                  <input type='text' onChange={this.handleChange} name='enrollment.nombre_de_demandes_mensuelles_fev' id='nombre_de_demandes_mensuelles_fev' value={value} />
                </div>
                <div className='date_input_col'>
                  <label htmlFor='nombre_de_demandes_mensuelles_mar'>Mars</label>
                  <input type='text' onChange={this.handleChange} name='enrollment.nombre_de_demandes_mensuelles_mar' id='nombre_de_demandes_mensuelles_mar' value={value} />
                </div>
                <div className='date_input_col'>
                  <label htmlFor='nombre_de_demandes_mensuelles_avr'>Avril</label>
                  <input type='text' onChange={this.handleChange} name='enrollment.nombre_de_demandes_mensuelles_avr' id='nombre_de_demandes_mensuelles_avr' value={value} />
                </div>
                <div className='date_input_col'>
                  <label htmlFor='nombre_de_demandes_mensuelles_mai'>Mai</label>
                  <input type='text' onChange={this.handleChange} name='enrollment.nombre_de_demandes_mensuelles_mai' id='nombre_de_demandes_mensuelles_mai' value={value} />
                </div>
                <div className='date_input_col'>
                  <label htmlFor='nombre_de_demandes_mensuelles_juin'>Juin</label>
                  <input type='text' onChange={this.handleChange} name='enrollment.nombre_de_demandes_mensuelles_juin' id='nombre_de_demandes_mensuelles_juin' value={value} />
                </div>
                <div className='date_input_col'>
                  <label htmlFor='nombre_de_demandes_mensuelles_jui'>Juillet</label>
                  <input type='text' onChange={this.handleChange} name='enrollment.nombre_de_demandes_mensuelles_jui' id='nombre_de_demandes_mensuelles_jui' value={value} />
                </div>
                <div className='date_input_col'>
                  <label htmlFor='nombre_de_demandes_mensuelles_aou'>Août</label>
                  <input type='text' onChange={this.handleChange} name='enrollment.nombre_de_demandes_mensuelles_aou' id='nombre_de_demandes_mensuelles_aou' value={value} />
                </div>
                <div className='date_input_col'>
                  <label htmlFor='nombre_de_demandes_mensuelles_sep'>Septembre</label>
                  <input type='text' onChange={this.handleChange} name='enrollment.nombre_de_demandes_mensuelles_sep' id='nombre_de_demandes_mensuelles_sep' value={value} />
                </div>
                <div className='date_input_col'>
                  <label htmlFor='nombre_de_demandes_mensuelles_oct'>Octobre</label>
                  <input type='text' onChange={this.handleChange} name='enrollment.nombre_de_demandes_mensuelles_oct' id='nombre_de_demandes_mensuelles_oct' value={value} />
                </div>
                <div className='date_input_col'>
                  <label htmlFor='nombre_de_demandes_mensuelles_nov'>Novembre</label>
                  <input type='text' onChange={this.handleChange} name='enrollment.nombre_de_demandes_mensuelles_nov' id='nombre_de_demandes_mensuelles_nov' value={value} />
                </div>
                <div className='date_input_col'>
                  <label htmlFor='nombre_de_demandes_mensuelles_dec'>Décembre</label>
                  <input type='text' onChange={this.handleChange} name='enrollment.nombre_de_demandes_mensuelles_dec' id='nombre_de_demandes_mensuelles_dec' value={value} />
                </div>
              </div>
            </div>
          </div>

          <h1 id='cnil'>Obligation CNIL</h1>
          <section className='information-text'>
            <p>L’entrée en vigueur le 25 mai 2018 du règlement européen sur la protection des données supprime totalement le régime déclaratif.</p>
            <p>Les fournisseurs de services ont en particulier l’obligation de tenir un registre de leurs activités de traitement, d’encadrer les opérations sous-traitées dans les contrats de prestation de services, de formaliser des politiques de confidentialité des données et des procédures relatives à la gestion des demandes d’exercice des droits.</p>
            <p>La désignation d’un délégué à la protection des données - successeur du correspondant informatique et libertés (CIL) dont la désignation est aujourd’hui facultative - devient obligatoire pour les organismes et autorités publics, et donc pour les fournisseurs de services.</p>
          </section>

          <div className='form__group'>
            <label htmlFor='delegue_protection_donnees'>Délégué·e à la protection des données</label>
            <input type='text' onChange={this.handleChange} name='enrollment.delegue_protection_donnees' id='delegue_protection_donnees' value={value} />
          </div>

          <div className='form__group'>
            <input type='checkbox' name='enrollment.checkbox-cnil' id='checkbox-cnil' value='fraise' />
            <label htmlFor='checkbox-cnil' className='label-inline'>Je déclare avoir accompli mes démarches CNIL en accord avec le règlement général de protection des données</label>
          </div>

          <h1 id='convention'>Convention</h1>
          <section className='information-text'>
          <p>Votre raccordement à l'API « Impôt Particulier » nécessite l'acceptation de la convention d'adhésion fixant vos engagements et ceux de la DGFIP et la DINSIC. <br /> Les liens ci-dessous vous permettront de visualiser la convention type ainsi que ses annexes. <br /> La convention générée à l'issue de votre demande de raccordement contiendra l'ensemble des éléments propres à votre situation. <br /> Cette convention sera publiée sur api.gouv.fr et sera accessible via vos identifiants FranceConnect.</p>
          </section>

          <iframe src='static/docs/charte-fc.pdf' width='100%' height='800px' />

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
