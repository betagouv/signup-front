import {FRANCE_CONNECT_AUTHORIZE_URI} from '@env'
import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import Utils from '../lib/utils'
import User from '../lib/user'
import Services from '../lib/services'

class ContractualisationForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      enrollment: {
        acl: {
          send_application: true // eslint-disable-line camelcase
        },
        fournisseur_de_service: '', // eslint-disable-line camelcase
        description_service: '', // eslint-disable-line camelcase
        fondement_juridique: '', // eslint-disable-line camelcase
        scope_dgfip_RFR: false, // eslint-disable-line camelcase
        scope_dgfip_adresse_fiscale_taxation: false, // eslint-disable-line camelcase
        nombre_demandes_annuelle: '', // eslint-disable-line camelcase
        pic_demandes_par_heure: '', // eslint-disable-line camelcase
        nombre_demandes_mensuelles_jan: '', // eslint-disable-line camelcase
        nombre_demandes_mensuelles_fev: '', // eslint-disable-line camelcase
        nombre_demandes_mensuelles_mar: '', // eslint-disable-line camelcase
        nombre_demandes_mensuelles_avr: '', // eslint-disable-line camelcase
        nombre_demandes_mensuelles_mai: '', // eslint-disable-line camelcase
        nombre_demandes_mensuelles_jui: '', // eslint-disable-line camelcase
        nombre_demandes_mensuelles_jul: '', // eslint-disable-line camelcase
        nombre_demandes_mensuelles_aou: '', // eslint-disable-line camelcase
        nombre_demandes_mensuelles_sep: '', // eslint-disable-line camelcase
        nombre_demandes_mensuelles_oct: '', // eslint-disable-line camelcase
        nombre_demandes_mensuelles_nov: '', // eslint-disable-line camelcase
        nombre_demandes_mensuelles_dec: '', // eslint-disable-line camelcase
        autorite_certification_nom: '', // eslint-disable-line camelcase
        autorite_certification_fonction: '', // eslint-disable-line camelcase
        date_homologation: '', // eslint-disable-line camelcase
        date_fin_homologation: '', // eslint-disable-line camelcase
        delegue_protection_donnees: '', // eslint-disable-line camelcase
        validation_de_convention: false, // eslint-disable-line camelcase
        certificat_pub_production: '', // eslint-disable-line camelcase
        autorite_certification: '', // eslint-disable-line camelcase
        fournisseur_de_donnees: 'dgfip' // eslint-disable-line camelcase
      },
      serviceProviders: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    const {id} = this.props
    let token
    if (typeof localStorage !== 'undefined') {
      token = localStorage.getItem('token')
    }
    if (id) {
      Services.getUserEnrollment(id, token).then(enrollment => {
        this.setState({enrollment})
      })
    }
    setTimeout(() => {
      const user = new User()
      user.getServiceProviders().then(serviceProviders => {
        this.setState({serviceProviders})
      })
    }, 1000)
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
    const componentState = this.state
    const token = localStorage.getItem('token')
    if (componentState.enrollment.id) {
      Services.updateUserEnrollment(componentState, token).then(response => {
        if (response.status === 200) {
          Router.push('/')
        } else if (response.status === 422) {
          alert('Formulaire incomplet' + response.request.response) // eslint-disable-line no-alert
        } else if (response.status === 401) {
          alert('Vous n\'êtes pas autorisé' + response) // eslint-disable-line no-alert
        } else {
          alert('Erreur inconnue' + response) // eslint-disable-line no-alert
        }
      })
    } else {
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
    }
    event.preventDefault()
  }

  render() {
    const {enrollment, serviceProviders} = this.state
    const readOnly = enrollment.acl.send_application ? false : 'disabled'

    let i = 0
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>Demande d&apos;accès à l&apos;API Impôts Particulier</h1>
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
        <div>
          <input onChange={this.handleChange} type='checkbox' name='enrollment.administration' id='checkbox-administration' disabled={readOnly} checked={enrollment.administration ? 'checked' : false} />
          <label htmlFor='checkbox-administration' className='label-inline'>Êtes-vous ou représentez-vous une administration publique (État, collectivités territoriales...) ?</label>
        </div>
        <div>
          <input onChange={this.handleChange} type='checkbox' name='enrollment.france_connect' id='checkbox-france_connect' disabled={readOnly} checked={enrollment.france_connect ? 'checked' : false} />
          <label htmlFor='checkbox-france_connect' className='label-inline'>Avez-vous intégré le bouton FranceConnect ou êtes-vous éligible à son intégration ?</label>
        </div>
        <div>
          <input onChange={this.handleChange} type='checkbox' name='enrollment.autorisation_legale' id='checkbox-autorisation_legale' disabled={readOnly} checked={enrollment.autorisation_legale ? 'checked' : false} />
          <label htmlFor='checkbox-autorisation_legale' className='label-inline'>Possédez-vous un cadre légal permettant de solliciter des données fiscales auprès de la DGFiP ?</label>
        </div>
        <h1 id='legal'>Fondement juridique</h1>
        <section className='information-text'>
          <p>Pour pouvoir bénéficier du raccordement à l&lsquo;API Impôts Particulier, le cadre légal et réglementaire des fournisseurs de service doit permettre à la DGFIP de transmettre des données fiscales  à votre entité administrative.</p>
          <p>Il vous est donc demandé de préciser les références du fondement légal de votre droit à demander ces informations (délibération du conseil municipal, décret …) ainsi que les informations relatives à votre téléservice.</p>
        </section>
        <div className='form__group'>
          <label htmlFor='fournisseur_de_service'>Sélectionnez le Fournisseur de Service FranceConnect pour lequel vous souhaitez un raccordement</label>
          <p><a className='button' href={FRANCE_CONNECT_AUTHORIZE_URI}>Se connecter auprès de France Connect afin de récupérer mes démarches</a></p>
          <select onChange={this.handleChange} name='enrollment.fournisseur_de_service'>
            <option>-- sélectionnez une démarche --</option>
            {enrollment.fournisseur_de_service &&
            <option selected='selected' value={enrollment.fournisseur_de_service}>{enrollment.fournisseur_de_service}</option>
            }
            <option value='Une démarche de test'>Une démarche de test</option>
            {
              serviceProviders.map(serviceProvider => {
                return <option key={i++} value={serviceProvider.name}>{serviceProvider.name}</option>
              })
            }
          </select>
        </div>
        <div className='form__group'>
          <label htmlFor='description_service'>Décrivez brièvement votre service ainsi que l&lsquo;utilisation prévue des données transmises</label>
          <textarea rows='10' onChange={this.handleChange} name='enrollment.description_service' id='description_service' disabled={readOnly} value={enrollment.description_service} />
        </div>
        <div className='form__group'>
          <label htmlFor='fondement_juridique'>Veuillez transmettre le fondement juridique sur lequel s’appuie votre demande</label>
          <textarea rows='10' onChange={this.handleChange} name='enrollment.fondement_juridique' id='fondement_juridique' disabled={readOnly} value={enrollment.fondement_juridique} />
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
          <p>Vous pouvez consulter le <a href='/static/docs/cst-dgfip.pdf' target='_blank'>Contrat de Service Technique (CST)</a> pour voir le détail des données disponibles.</p>
        </section>
        <div className='form__group'>
          <fieldset className='vertical'>
            <legend>Sélectionnez vos jeux de données souhaités</legend>
            <div>
              <input onChange={this.handleChange} type='checkbox' name='enrollment.scope_dgfip_RFR' id='checkbox-scope_dgfip_RFR' disabled={readOnly} checked={enrollment.scope_dgfip_RFR ? 'checked' : false} />
              <label htmlFor='checkbox-scope_dgfip_RFR' className='label-inline'>DGFiP - Revenu Fiscal de Référence (RFR) et nombre de parts fiscales du foyer</label>
            </div>
            <div>
              <input onChange={this.handleChange} checked={enrollment.scope_dgfip_adresse_fiscale_taxation ? 'checked' : false} type='checkbox' name='enrollment.scope_dgfip_adresse_fiscale_taxation' id='checkbox-scope_dgfip_adresse_fiscale_taxation' disabled={readOnly} />
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
          <input type='text' onChange={this.handleChange} name='enrollment.nombre_demandes_annuelle' id='nombre_demandes_annuelle' disabled={readOnly} value={enrollment.nombre_demandes_annuelle} />
        </div>

        <div className='form__group'>
          <label htmlFor='pic_demandes_par_heure'>Connaissez-vous le pic de charge (en nombre de demandes horaires)&nbsp;?</label>
          <input type='text' onChange={this.handleChange} name='enrollment.pic_demandes_par_heure' id='pic_demandes_par_heure' disabled={readOnly} value={enrollment.pic_demandes_par_heure} />
        </div>

        <div className='form__group'>
          <label>Connaissez-vous la répartition de la charge des demandes mensuelles (0 si le service est fermé)&nbsp;?</label>
          <div className='form__group'>
            <div className='date_input_row'>
              <div className='date_input_col'>
                <label htmlFor='nombre_demandes_mensuelles_jan'>Janvier</label>
                <input type='text' onChange={this.handleChange} name='enrollment.nombre_demandes_mensuelles_jan' id='nombre_demandes_mensuelles_jan' disabled={readOnly} value={enrollment.nombre_demandes_mensuelles_jan} />
              </div>
              <div className='date_input_col'>
                <label htmlFor='nombre_demandes_mensuelles_fev'>Février</label>
                <input type='text' onChange={this.handleChange} name='enrollment.nombre_demandes_mensuelles_fev' id='nombre_demandes_mensuelles_fev' disabled={readOnly} value={enrollment.nombre_demandes_mensuelles_fev} />
              </div>
              <div className='date_input_col'>
                <label htmlFor='nombre_demandes_mensuelles_mar'>Mars</label>
                <input type='text' onChange={this.handleChange} name='enrollment.nombre_demandes_mensuelles_mar' id='nombre_demandes_mensuelles_mar' disabled={readOnly} value={enrollment.nombre_demandes_mensuelles_mar} />
              </div>
              <div className='date_input_col'>
                <label htmlFor='nombre_demandes_mensuelles_avr'>Avril</label>
                <input type='text' onChange={this.handleChange} name='enrollment.nombre_demandes_mensuelles_avr' id='nombre_demandes_mensuelles_avr' disabled={readOnly} value={enrollment.nombre_demandes_mensuelles_avr} />
              </div>
              <div className='date_input_col'>
                <label htmlFor='nombre_demandes_mensuelles_mai'>Mai</label>
                <input type='text' onChange={this.handleChange} name='enrollment.nombre_demandes_mensuelles_mai' id='nombre_demandes_mensuelles_mai' disabled={readOnly} value={enrollment.nombre_demandes_mensuelles_mai} />
              </div>
              <div className='date_input_col'>
                <label htmlFor='nombre_demandes_mensuelles_juin'>Juin</label>
                <input type='text' onChange={this.handleChange} name='enrollment.nombre_demandes_mensuelles_juin' id='nombre_demandes_mensuelles_juin' disabled={readOnly} value={enrollment.nombrde_e_demandes_mensuelles_juin} />
              </div>
              <div className='date_input_col'>
                <label htmlFor='nombre_demandes_mensuelles_jui'>Juillet</label>
                <input type='text' onChange={this.handleChange} name='enrollment.nombre_demandes_mensuelles_jui' id='nombre_demandes_mensuelles_jui' disabled={readOnly} value={enrollment.nombre_demandes_mensuelles_jui} />
              </div>
              <div className='date_input_col'>
                <label htmlFor='nombre_demandes_mensuelles_aou'>Août</label>
                <input type='text' onChange={this.handleChange} name='enrollment.nombre_demandes_mensuelles_aou' id='nombre_demandes_mensuelles_aou' disabled={readOnly} value={enrollment.nombre_demandes_mensuelles_aou} />
              </div>
              <div className='date_input_col'>
                <label htmlFor='nombre_demandes_mensuelles_sep'>Septembre</label>
                <input type='text' onChange={this.handleChange} name='enrollment.nombre_demandes_mensuelles_sep' id='nombre_demandes_mensuelles_sep' disabled={readOnly} value={enrollment.nombre_demandes_mensuelles_sep} />
              </div>
              <div className='date_input_col'>
                <label htmlFor='nombre_demandes_mensuelles_oct'>Octobre</label>
                <input type='text' onChange={this.handleChange} name='enrollment.nombre_demandes_mensuelles_oct' id='nombre_demandes_mensuelles_oct' disabled={readOnly} value={enrollment.nombre_demandes_mensuelles_oct} />
              </div>
              <div className='date_input_col'>
                <label htmlFor='nombre_demandes_mensuelles_nov'>Novembre</label>
                <input type='text' onChange={this.handleChange} name='enrollment.nombre_demandes_mensuelles_nov' id='nombre_demandes_mensuelles_nov' disabled={readOnly} value={enrollment.nombre_demandes_mensuelles_nov} />
              </div>
              <div className='date_input_col'>
                <label htmlFor='nombre_demandes_mensuelles_dec'>Décembre</label>
                <input type='text' onChange={this.handleChange} name='enrollment.nombre_demandes_mensuelles_dec' id='nombre_demandes_mensuelles_dec' disabled={readOnly} value={enrollment.nombre_demandes_mensuelles_dec} />
              </div>
            </div>
          </div>
        </div>

        <h1 id='cnil'>Obligation RGPD</h1>
        <section className='information-text'>
          <p>L’entrée en vigueur le 25 mai 2018 du règlement européen sur la protection des données supprime totalement le régime déclaratif.</p>
          <p>Les fournisseurs de services ont en particulier l’obligation de tenir un registre de leurs activités de traitement, d’encadrer les opérations sous-traitées dans les contrats de prestation de services, de formaliser des politiques de confidentialité des données et des procédures relatives à la gestion des demandes d’exercice des droits.</p>
          <p>La désignation d’un délégué à la protection des données - successeur du correspondant informatique et libertés (CIL) dont la désignation est aujourd’hui facultative - devient obligatoire pour les organismes et autorités publics, et donc pour les fournisseurs de services.</p>
        </section>

        <div className='form__group'>
          <label htmlFor='delegue_protection_donnees'>Délégué·e à la protection des données</label>
          <input type='text' onChange={this.handleChange} name='enrollment.delegue_protection_donnees' id='delegue_protection_donnees' disabled={readOnly} value={enrollment.delegue_protection_donnees} />
        </div>

        <div className='form__group'>
          <input type='checkbox' onChange={this.handleChange} name='enrollment.demarche_cnil' id='demarche_cnil' checked={enrollment.demarche_cnil ? 'checked' : false} />
          <label htmlFor='demarche_cnil' className='label-inline'>Je déclare avoir accompli mes démarches CNIL en accord avec le règlement général de protection des données</label>
        </div>

        <h1 id='convention'>Convention</h1>
        <section className='information-text'>
          <p>Votre raccordement à l&lsquo;API « Impôt Particulier » nécessite l&lsquo;acceptation de la convention d&lsquo;adhésion fixant vos engagements et ceux de la DGFIP et la DINSIC. <br /> Les liens ci-dessous vous permettront de visualiser la convention type ainsi que ses annexes. <br /> La convention générée à l&lsquo;issue de votre demande de raccordement contiendra l&lsquo;ensemble des éléments propres à votre situation. <br /> Cette convention sera publiée sur api.gouv.fr et sera accessible via vos identifiants FranceConnect.</p>
        </section>

        <iframe src='/static/docs/charte-fc.pdf' width='100%' height='800px' />

        <div className='form__group'>
          <input onChange={this.handleChange} disabled={readOnly} checked={enrollment.validation_de_convention} type='checkbox' name='enrollment.validation_de_convention' id='validation_de_convention' />
          <label htmlFor='validation_de_convention' className='label-inline'>Je valide la présente convention</label>
        </div>

        {!readOnly &&
          <div className='button-list'>
            {enrollment.id &&
              <button className='button' type='submit' name='subscribe' id='submit'>Modifier la demande</button>
            }
            {!enrollment.id &&
              <button className='button' type='submit' name='subscribe' id='submit'>Soumettre la demande</button>
            }
          </div>
        }
      </form>
    )
  }
}

ContractualisationForm.propTypes = {
  id: PropTypes.string
}
ContractualisationForm.defaultProps = {
  id: ''
}

export default ContractualisationForm
