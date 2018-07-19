import {FRANCE_CONNECT_AUTHORIZE_URI, BACK_HOST} from '@env'
import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import Router from 'next/router'
import {merge, debounce, zipObjectDeep} from 'lodash'
import Services from '../lib/services'
import {getErrorMessage, getQueryVariable} from '../lib/utils'
import User from '../lib/user'
import SearchIcon from './icons/search'

class Form extends React.Component {
  constructor(props) {
    super(props)

    const {form} = props

    this.state = {
      errors: [],
      serviceProviders: [],
      nom_raison_sociale: '',
      adresse: '',
      activite_principale: '',
      enrollment: {
        acl: {},
        contacts: [
          {
            id: 'dpo',
            heading: 'Délégué à la protection des données',
            link: 'https://www.cnil.fr/fr/designation-dpo',
            nom: '',
            email: ''
          },
          {
            id: 'responsable_traitement',
            heading: 'Responsable de traitement',
            link: 'https://www.cnil.fr/fr/definition/responsable-de-traitement',
            nom: '',
            email: ''
          },
          {
            id: 'technique',
            heading: 'Responsable technique',
            nom: '',
            email: ''
          }
        ],
        demarche: {
          intitule: '',
          description: '',
          fondement_juridique: ''
        },
        documents: [],
        donnees: {
          conservation: '',
          destinataires: {}
        },
        fournisseur_de_donnees: form.provider,
        id: null,
        scopes: {},
        siren: '',
        validation_de_convention: false,
        validation_delegue_a_la_protection_des_données: false
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSaveDraft = this.handleSaveDraft.bind(this)
    this.getSiren = this.getSiren.bind(this)
    this.upload = this.upload.bind(this)
    this.handleSirenChange = this.handleSirenChange.bind(this)
  }

  componentDidMount() {
    const tokenFc = getQueryVariable('token')
    const {id} = this.props
    const user = new User()

    if (id) {
      Services.getUserEnrollment(id).then(enrollment => {
        this.setState(({enrollment: prevEnrollment}) => ({
          enrollment: merge({}, prevEnrollment, enrollment)
        }))
        this.getSiren(enrollment.siren)
      })
    }

    user.getServiceProviders(tokenFc).then(serviceProviders => {
      this.setState({serviceProviders})
    })
  }

  handleChange({target: {type, checked, value: inputValue, name}}) {
    const value = type === 'checkbox' ? checked : inputValue

    this.setState(({enrollment: prevEnrollment}) => ({
      enrollment: merge({}, prevEnrollment, zipObjectDeep([`${name}`], [value]))
    }))
  }

  upload({target: {files, name}}) {
    const documents_attributes = [...files].map(file => ({
      attachment: file,
      type: name
    }), [])

    this.setState(({enrollment: prevEnrollment}) => ({
      enrollment: merge({}, prevEnrollment, {documents_attributes})
    }))
  }

  handleSubmit(event, doSendEnrollment = true) {
    event.preventDefault()

    const {enrollment} = this.state

    Services.createOrUpdateUserEnrollment({enrollment})
      .then(enrollment => {
        if (!doSendEnrollment) {
          return null
        }

        return Services.triggerUserEnrollment('send_application', enrollment)
      })
      .then(() => Router.push('/'))
      .catch(error => this.setState({errors: getErrorMessage(error)}))
  }

  handleSaveDraft(event) {
    this.handleSubmit(event, false)
  }

  getSiren(siren) {
    const sirenWithoutSpaces = siren.replace(/ /g, '')

    Services.getSirenInformation(sirenWithoutSpaces).then(({nom_raison_sociale, adresse, activite_principale}) => {
      this.setState(({nom_raison_sociale, adresse, activite_principale, sirenNotFound: false}))
    }).catch(() => {
      this.setState(({nom_raison_sociale: '', adresse: '', activite_principale: '', sirenNotFound: true}))
    })
  }

  debouncedGetSiren = debounce(this.getSiren, 1000)

  handleSirenChange(event) {
    const siren = event.target.value

    this.handleChange(event)
    this.debouncedGetSiren(siren)
  }

  render() {
    let token
    if (typeof localStorage !== 'undefined') { // eslint-disable-line no-constant-condition
      token = localStorage.getItem('token')
    }
    const {
      nom_raison_sociale,
      adresse,
      activite_principale,
      enrollment: {
        acl,
        contacts,
        demarche,
        documents,
        donnees,
        fournisseur_de_service,
        id,
        scopes,
        siren,
        validation_de_convention
      },
      serviceProviders,
      sirenNotFound,
      errors
    } = this.state

    const {form} = this.props
    // Enable edition if user can send application or if it's a new enrollment (ie. enrollment has no id)
    const disabled = !(acl.send_application || !id)
    const legalBasis = documents.filter(({type}) => type === 'Document::LegalBasis')[0]

    return (
      <form>
        <h1>{form.text.title}</h1>
        {
          // eslint-disable-next-line react/no-danger
        }<div dangerouslySetInnerHTML={{__html: form.text.intro}} className='intro' />

        { form.franceConnected && (
          <div className='form__group'>
            <h2 id='france-connect'>Partenaire FranceConnect</h2>
            <p><Link href={FRANCE_CONNECT_AUTHORIZE_URI}><a className='button'>Se connecter auprès de France Connect afin de récupérer mes démarches</a></Link></p>
            <label htmlFor='fournisseur_de_service'>Intitulé de la démarche</label>
            <select onChange={this.handleChange} name='fournisseur_de_service'>
              {serviceProviders.map(({name}) => (
                <option key={name} selected={fournisseur_de_service === name} value={name}>{name}</option>
              ))}
            </select>
          </div>
        )}
        <h2 id='identite'>Identité</h2>

        <div className='form__group'>
          <label htmlFor='search-siren'>Rechercher votre organisme avec son SIREN</label>
          <div className='search__group'>
            <input type='text' value={siren} name='siren' id='search-siren' disabled={disabled} onChange={this.handleSirenChange} />
            <button className='overlay-button' type='button' aria-label='Recherche' onClick={this.getSiren}>
              <SearchIcon id='icon-search' title='Rechercher' />
            </button>
          </div>
        </div>

        {sirenNotFound &&
          <div className='form__group'>
            <div className='notification error'>Notre service ne parvient pas à trouver votre SIREN</div>
          </div>
        }

        <div className='form__group'>
          <label htmlFor='nom_raison_sociale'>Raison sociale</label>
          <input type='text' id='nom_raison_sociale' disabled value={nom_raison_sociale} />
        </div>
        <div className='form__group'>
          <label htmlFor='adresse'>Adresse</label>
          <input type='text' id='adresse' disabled value={adresse} />
        </div>
        <div className='form__group'>
          <label htmlFor='activite_principale'>Code NAF</label>
          <input type='text' id='activite_principale' disabled value={activite_principale} />
        </div>

        <h3>Contacts</h3>
        <div className='row card-row'>
          {contacts.map(({id, heading, link, nom, email}, index) => (
            <div key={id} className='card'>
              <div className='card__content'>
                <h3>{heading}</h3>
                {link && <a className='card__meta' href={link}>{link}</a>}
                <div className='form__group'>
                  <label htmlFor={`person_${id}_nom`}>Nom et Prénom</label>
                  <input type='text' onChange={this.handleChange} name={`contacts[${index}].nom`} id={`person_${id}_nom`} disabled={disabled} value={nom} />
                </div>
                <div className='form__group'>
                  <label htmlFor={`person_${id}_email`}>Email</label>
                  <input type='text' onChange={this.handleChange} name={`contacts[${index}].email`} id={`person_${id}_email`} disabled={disabled} value={email} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2 id='demarche'>Démarche</h2>
        {
          // eslint-disable-next-line react/no-danger
        }<section dangerouslySetInnerHTML={{__html: form.description.demarche}} className='information-text' />
        {!form.franceConnected && (
          <div className='form__group'>
            <label htmlFor='intitule_demarche'>Intitulé</label>
            <input type='text' onChange={this.handleChange} name='demarche.intitule' id='intitule_demarche' disabled={disabled} value={demarche.intitule} />
          </div>
        )}

        <div className='form__group'>
          <label htmlFor='description_service'>Décrivez brièvement votre service ainsi que l&lsquo;utilisation prévue des données transmises</label>
          <textarea rows='10' onChange={this.handleChange} name='demarche.description' id='description_service' disabled={disabled} value={demarche.description} />
        </div>

        <h2>Cadre juridique</h2>
        {form.description.fondementJuridique &&
          <section dangerouslySetInnerHTML={{__html: form.description.fondementJuridique}} className='information-text' /> // eslint-disable-line react/no-danger
        }
        <div className='form__group'>
          {legalBasis ? (
            <label><a href={`${BACK_HOST + legalBasis.attachment.url}?token=${token}`}>Pièce jointe</a></label>
          ) : (
            <label htmlFor='Document::LegalBasis'>Pièce jointe</label>
          )}
          <input type='file' onChange={this.upload} disabled={disabled} name='Document::LegalBasis' id='document_legal_basis' />
        </div>
        <div className='form__group'>
          <label htmlFor='fondement_juridique'>Cadre juridique <i>(indiquez la référence ou l&apos;URL du texte vous autorisant à récolter ces données)</i></label>
          <input type='text' onChange={this.handleChange} name='demarche.fondement_juridique' id='fondement_juridique_demarche' disabled={disabled} value={demarche.fondement_juridique} />
        </div>

        <h2 id='donnees'>Données</h2>
        <div className='form__group'>
          <fieldset className='vertical'>
            <label>Sélectionnez vos jeux de données souhaités</label>
            <div className='row'>
              <div className='column' style={{flex: 1}}>
                {form.scopes.map(({name, humanName}) => (
                  <div key={name}>
                    <input className='scope__checkbox' onChange={this.handleChange} type='checkbox' name={`scopes.${name}`} id={`checkbox-scope_api_entreprise${name}`} disabled={disabled} checked={scopes[name] ? 'checked' : false} />
                    <label htmlFor={`checkbox-scope_api_entreprise${name}`} className='label-inline'>{humanName}</label>
                    {scopes[name] &&
                      <div className='scope__destinataire'>
                        <div className='form__group'>
                          <label htmlFor={`destinataire_${name}`}>Destinataires <a href='https://www.cnil.fr/fr/definition/destinataire' target='_blank' rel='noopener noreferrer'>(plus d&acute;infos)</a></label>
                          <input type='text' onChange={this.handleChange} name={`donnees.destinataires.${name}`} id={`destinataire_${name}`} disabled={disabled} value={donnees.destinataires[name]} />
                        </div>
                      </div>
                    }
                  </div>
                ))}
              </div>
            </div>
          </fieldset>
        </div>

        <div className='form__group'>
          <label htmlFor='donnees_conservation'>Conservation des données <i>(en mois)</i></label>
          <input type='number' onChange={this.handleChange} name='donnees.conservation' id='donnees_conservation' disabled={disabled} value={donnees.conservation} />
        </div>

        <h1 id='cgu'>Conditions d&acute;utilisation</h1>
        { form.description.cgu &&
          <section dangerouslySetInnerHTML={{__html: form.description.cgu}} className='information-text' /> // eslint-disable-line react/no-danger
        }

        <iframe src={form.cguLink} width='100%' height='800px' />

        <div className='form__group'>
          <input onChange={this.handleChange} disabled={disabled ? 'disabled' : false} checked={validation_de_convention} type='checkbox' name='validation_de_convention' id='validation_de_convention' />
          <label htmlFor='validation_de_convention' className='label-inline'>Je valide les présentes conditions d&apos;utilisation et confirme que le DPO de mon organisme est informé de ma demande</label>
        </div>

        {!disabled &&
          <div className='button-list'>
            <button className='button secondary' onClick={this.handleSaveDraft}>Enregistrer le brouillon</button>
            <button className='button' onClick={this.handleSubmit}>Soumettre la demande</button>
          </div>
        }

        {errors.map(error => (
          <div key={error} className='notification error'>
            {error}
          </div>
        ))}
      </form>
    )
  }
}

Form.propTypes = {
  id: PropTypes.string,
  form: PropTypes.object
}
Form.defaultProps = {
  id: '',
  form: {
    provider: '',
    scopes: [],
    cguLink: '',
    text: {
      title: '',
      intro: ''
    },
    description: {
      demarche: ''
    }
  }
}

export default Form
