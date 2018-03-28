import React from 'react'
import Utils from '../lib/utils'
import Services from '../lib/services'

class ContractualisationForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      enrollment: { }
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
    Services.postFormToBack(componentState, token)
    event.preventDefault()
  }

  render() {
    return (
      <div className='main-pane'>
        <form onSubmit={this.handleSubmit}>
          <h1 id='legal'>Fondement légal</h1>
          <section className='information-text'>
            <p>Pour pouvoir bénéficier du raccordement à l&lsquo;API « impôt particulier », le cadre légal et réglementaire des fournisseurs de service doit permettre à la DGFiP de transmettre des données fiscales  à votre entité administrative.</p>
            <p>Il vous est donc demandé de préciser les références du fondement légal de votre droit à demander des informations fiscales auprès de la DGFIP (délibération du conseil municipal, décret …) ainsi que les informations relatives à votre téléservice.</p>
          </section>
          <div className='form__group'>
            <label htmlFor='description_service'>Décrivez brièvement votre service ainsi que l&lsquo;utilisation prévue des données transmises</label>
            <textarea onChange={this.handleChange} name='description_service' id='description_service' value={this.state.value} />
          </div>
          <div className='form__group'>
            <label htmlFor='fondement_juridique'>Veuillez transmettre le fondement juridique sur lequel s’appuie votre demande</label>
            <textarea onChange={this.handleChange} name='fondement_juridique' id='fondement_juridique' value={this.state.value} />
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
            <fieldset class='vertical'>
              <legend>Sélectionnez vos jeux de données souhaités</legend>
              <div>
                <input type='checkbox' name='checkbox-scope' id='checkbox-scope_dgfip_avis_imposition' value='true' />
                <label for='checkbox-scope_dgfip_avis_imposition' class='label-inline'>DGFIP - Avis Imposition</label>
              </div>
              <div>
                <input type='checkbox' name='checkbox-scope' id='checkbox-scope_cnaf_attestation_droits' value='scope_cnaf_attestation_droits' />
                <label for='checkbox-scope_cnaf_attestation_droits' class='label-inline'>CNAF - Attestation de droits</label>
              </div>
              <div>
                <input type='checkbox' name='checkbox-scope' id='checkbox-scope_cnaf_quotient_familial' value='true' />
                <label for='checkbox-scope_cnaf_quotient_familial' class='label-inline'>CNAF - Quotient Familial</label>
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
            <input type='text' onChange={this.handleChange} name='nombre_demandes_annuelle' id='nombre_demandes_annuelle' value={this.state.value} />
          </div>

          <div className='form__group'>
            <label htmlFor='pic_demandes_par_heure'>Connaissez-vous le pic de charge (en nombre de demandes horaires)&nbsp;?</label>
            <input type='text' onChange={this.handleChange} name='pic_demandes_par_heure' id='pic_demandes_par_heure' value={this.state.value} />
          </div>

          <div className='form__group'>
            <label htmlFor='pic_demandes_par_heure'>Connaissez-vous la répartition de la charge des demandes mensuelles (0 si le service est fermé)&nbsp;?</label>
            <pre>
              <code>
                'nombre_demandes_mensuelles_jan': 45,
                'nombre_demandes_mensuelles_fev': 45,
                'nombre_demandes_mensuelles_mar': 45,
                'nombre_demandes_mensuelles_avr': 45,
                'nombre_demandes_mensuelles_mai': 45,
                'nombre_demandes_mensuelles_jui': 45,
                'nombre_demandes_mensuelles_jul': 45,
                'nombre_demandes_mensuelles_aou': 45,
                'nombre_demandes_mensuelles_sep': 45,
                'nombre_demandes_mensuelles_oct': 45,
                'nombre_demandes_mensuelles_nov': 45,
                'nombre_demandes_mensuelles_dec': 45,
              </code>
            </pre>
          </div>

          <h1 id='securite'>Homologation de sécurité</h1>
          <section className='information-text'>
            <p>Le Référentiel Général de Sécurité (RGS 2.0) rend la démarche d’homologation obligatoire pour les SI relatifs aux échanges entre une autorité administrative et les usagers ou entre autorités administratives.</p>
            <p>Si vous l’avez déjà fait, complétez les informations relatives à l’homologation et déposez la décision formelle d’homologation (également appelée attestation formelle).</p>
            <p>Si vous ne l’avez pas encore fait, envoyez-nous tout de même votre demande et nous vous aiderons à entamer cette démarche.</p>
          </section>

          <div className='form__group'>
            <label htmlFor='autorite_certification_nom'>Nom de l’autorité de certification</label>
            <input type='text' onChange={this.handleChange} name='autorite_certification_nom' id='autorite_certification_nom' value={this.state.value} />
          </div>

          <div className='form__group'>
            <label htmlFor='autorite_certification_fonction'>Fonction de l’autorité de certification</label>
            <input type='text' onChange={this.handleChange} name='autorite_certification_fonction' id='autorite_certification_fonction' value={this.state.value} />
          </div>

          <div className='form__group'>
            <label htmlFor='date_homologation'>Date de début l’homologation</label>
            <input type='date' onChange={this.handleChange} name='date_homologation' id='date_homologation' value={this.state.value} />
          </div>

          <div className='form__group'>
            <label htmlFor='date_fin_homologation'>Date de fin de l’homologation</label>
            <input type='date' onChange={this.handleChange} name='date_fin_homologation' id='date_fin_homologation' value={this.state.value} />
          </div>

          <h1 id='cnil'>Obligation CNIL</h1>
          <section className='information-text'>
            <p>L’entrée en vigueur le 25 mai 2018 du règlement européen sur la protection des données supprime totalement le régime déclaratif.</p>
            <p>Les fournisseurs de services ont en particulier l’obligation de tenir un registre de leurs activités de traitement, d’encadrer les opérations sous-traitées dans les contrats de prestation de services, de formaliser des politiques de confidentialité des données et des procédures relatives à la gestion des demandes d’exercice des droits.</p>
            <p>La désignation d’un délégué à la protection des données - successeur du correspondant informatique et libertés (CIL) dont la désignation est aujourd’hui facultative - devient obligatoire pour les organismes et autorités publics, et donc pour les fournisseurs de services.</p>
          </section>

          <div className='form__group'>
            <label htmlFor='delegue_protection_donnees'>Délégué·e à la protection des données</label>
            <input type='text' onChange={this.handleChange} name='delegue_protection_donnees' id='delegue_protection_donnees' value={this.state.value} />
          </div>

          <div className='form__group'>
            <input type='checkbox' name='checkbox-cnil' id='checkbox-cnil' value='fraise' />
            <label for='checkbox-cnil' class='label-inline'>Je déclare avoir accompli mes démarches CNIL en accord avec le règlement général de protection des données</label>
          </div>

          <h1 id='convention'>Convention</h1>
          <section className='information-text'>
            <p>Merci de prendre connaissance de la convention d'adhésion d'API Particulier afin de demander un jeton d’accès en décrivant votre projet.</p>
          </section>

          <iframe src='static/docs/charte.pdf' width='100%' height='800px'></iframe>

          <div className='button-list'>
            <button className='button button-secondary'>Sauvegarder</button>
            <button className='button' type='submit' name='subscribe' id='submit'>Soumettre la demande</button>
          </div>
        </form>
      </div>
    )
  }
}

export default ContractualisationForm
