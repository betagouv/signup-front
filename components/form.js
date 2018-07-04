import {FRANCE_CONNECT_AUTHORIZE_URI, BACK_HOST} from '@env'
import React from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import Router from 'next/router'
import {merge, throttle, zipObjectDeep} from 'lodash'
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
      enrollment: {
        fournisseur_de_donnees: form.provider,
        scopes: {},
        documents: [],
        acl: {
          send_application: true
        },
        contacts: form.contacts,
        siren: '',
        demarche: {
          intitule: '',
          description: '',
          fondement_juridique: ''
        },
        donnees: {
          conservation: '',
          destinataires: {}
        },
        validation_de_convention: false,
        validation_delegue_a_la_protection_des_données: false
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
        this.setState({enrollment})
        this.getSiren(enrollment.siren)
      })
    }

    user.getServiceProviders(tokenFc).then(serviceProviders => {
      this.setState({serviceProviders})
    })
  }

  handleChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    const stateCopy = merge({}, this.state, zipObjectDeep([`enrollment.${name}`], [value]))

    this.setState(stateCopy)
  }

  handlePeopleChange(person) {
    return event => {
      const {enrollment} = this.state
      const target = event.target
      const value = target.value
      const name = target.name
      const enrollmentWithUpdatedContact = Object.assign({}, enrollment)
      enrollmentWithUpdatedContact.contacts = enrollment.contacts.map(contact => {
        if (contact.id === person.id) {
          contact[name] = value
          return contact
        }
        return contact
      })
      this.setState({enrollmentWithUpdatedContact})
    }
  }

  upload(event) {
    const {enrollment} = this.state
    const files = [...event.target.files]
    const type = event.target.name

    const documents_attributes = files.map(file => ({
      attachment: file,
      type
    }), [])

    this.setState(merge({}, {enrollment}, {enrollment: {documents_attributes}}))
  }

  handleSubmit(event) {
    const {enrollment} = this.state

    event.preventDefault()

    if (enrollment.id) {
      Services.updateUserEnrollment({enrollment}).then(response => {
        if (response.status === 200) {
          Router.push('/')
        }
      }).catch(error => this.setState({errors: getErrorMessage(error)}))
    } else {
      Services.createUserEnrollment({enrollment}).then(response => {
        if (response.status === 201) {
          Router.push('/')
        }
      }).catch(error => this.setState({errors: getErrorMessage(error)}))
    }
  }

  getSiren(siren) {
    const sirenWithoutSpaces = siren.replace(/ /g, '')

    Services.getSirenInformation(sirenWithoutSpaces).then(({
      data: {
        siege_social: {nom_raison_sociale, nom, prenom, activite_principale, l2_normalisee, l3_normalisee, l4_normalisee, l5_normalisee, l6_normalisee, l7_normalisee}
      }
    }) => {
      const responsable = `${nom}  ${prenom}`
      const adresse = [l2_normalisee, l3_normalisee, l4_normalisee, l5_normalisee, l6_normalisee, l7_normalisee].filter(e => e).join(', ')
      // Enrollment assignation in promise resolution because we need to have the current state, not modified during the remote call
      const {enrollment} = this.state
      this.setState({
        enrollment: Object.assign({}, enrollment, {nom_raison_sociale, adresse, responsable, activite_principale}),
        sirenNotFound: false
      })
    }).catch(() => {
      // Enrollment assignation in promise resolution because we need to have the current state, not modified during the remote call
      const {enrollment} = this.state
      this.setState({
        enrollment: Object.assign({}, enrollment, {nom_raison_sociale: '', adresse: '', responsable: '', activite_principale: ''}),
        sirenNotFound: true
      })
    })
  }

  throttleGetSiren = throttle(event => this.getSiren(event.target.value), 500)

  handleSirenChange(event) {
    this.handleChange(event)
    this.throttleGetSiren(event)
  }

  render() {
    let token
    if (typeof localStorage !== 'undefined') { // eslint-disable-line no-constant-condition
      token = localStorage.getItem('token')
    }
    const {
      enrollment: {
        fournisseur_de_service,
        acl,
        documents,
        siren,
        nom_raison_sociale,
        adresse,
        activite_principale,
        contacts,
        demarche,
        scopes,
        donnees,
        validation_de_convention,
        id
      },
      serviceProviders,
      sirenNotFound,
      errors
    } = this.state

    const {form} = this.props
    const disabled = !acl.send_application
    const legalBasis = documents.filter(({type}) => type === 'Document::LegalBasis')[0]

    const personForm = person => (
      <div key={person.id} className='card'>
        <div className='card__content'>
          <h3>{person.heading}</h3>
          {person.link &&
            <a className='card__meta' href={person.link}>{person.link}</a>
          }
          <div className='form__group'>
            <label htmlFor={'person_' + person.id + '_nom'}>Nom et Prénom</label>
            <input type='text' onChange={this.handlePeopleChange(person)} name='nom' id={'person_' + person.id + '_nom'} disabled={disabled} value={person.nom} />
          </div>
          <div className='form__group'>
            <label htmlFor={'person_' + person.id + '_email'}>Email</label>
            <input type='text' onChange={this.handlePeopleChange(person)} name='email' id={'person_' + person.id + '_email'} disabled={disabled} value={person.email} />
          </div>
        </div>
      </div>
    )

    /* eslint-disable react/no-danger */
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>{form.text.title}</h1>
        <div dangerouslySetInnerHTML={{__html: form.text.intro}} className='intro' />

        { form.franceConnected && (
          <div className='form__group'>
            <h2 id='france-connect'>Partenaire FranceConnect</h2>
            <p><Link href={FRANCE_CONNECT_AUTHORIZE_URI}><a className='button'>Se connecter auprès de France Connect afin de récupérer mes démarches</a></Link></p>
            <label htmlFor='fournisseur_de_service'>Intitulé de la démarche</label>
            <select onChange={this.handleChange} name='enrollment.fournisseur_de_service'>
              {
                serviceProviders.map(serviceProvider => {
                  return <option key={serviceProvider.name} selected={fournisseur_de_service === serviceProvider.name} value={serviceProvider.name}>{serviceProvider.name}</option>
                })
              }
            </select>
          </div>
        )
        }
        <h2 id='identite'>Identité</h2>

        <div className='form__group'>
          <label htmlFor='search-siren'>Rechercher votre organisme avec son SIREN</label>
          <div className='search__group'>
            <input type='text' value={siren} name='siren' id='search-siren' onChange={this.handleSirenChange} />
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
          <input type='text' onChange={this.handleChange} name='nom_raison_sociale' id='nom_raison_sociale' disabled value={nom_raison_sociale} />
        </div>
        <div className='form__group'>
          <label htmlFor='adresse'>Adresse</label>
          <input type='text' onChange={this.handleChange} name='adresse' id='adresse' disabled value={adresse} />
        </div>
        <div className='form__group'>
          <label htmlFor='activite_principale'>Code NAF</label>
          <input type='text' onChange={this.handleChange} name='activite_principale' id='activite_principale' disabled value={activite_principale} />
        </div>

        <h3>Contacts</h3>
        <div className='row card-row'>
          {contacts.map(person => personForm(person))}
        </div>

        <h2 id='demarche'>Démarche</h2>
        <section dangerouslySetInnerHTML={{__html: form.description.demarche}} className='information-text' />
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
        { form.description.fondementJuridique &&
          <section dangerouslySetInnerHTML={{__html: form.description.fondementJuridique}} className='information-text' />
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
                {
                  form.scopes.map(scope => {
                    return (
                      <div key={scope.id}>
                        <input className='scope__checkbox' onChange={this.handleChange} type='checkbox' name={`scopes.${scope.name}`} id={`checkbox-scope_api_entreprise${scope.name}`} disabled={disabled} checked={scopes[scope.name] ? 'checked' : false} />
                        <label htmlFor={`checkbox-scope_api_entreprise${scope.name}`} className='label-inline'>{scope.humanName}</label>
                        <div className='scope__destinataire'>
                          <div className='form__group'>
                            <label htmlFor={`destinataire_${scope.name}`}>Destinataires <a href='https://www.cnil.fr/fr/definition/destinataire' target='_blank' rel='noopener noreferrer'>(plus d&acute;infos)</a></label>
                            <input type='text' onChange={this.handleChange} name={`donnees.destinataires.${scope.name}`} id={`desinataire_${scope.name}`} disabled={disabled} value={donnees.destinataires[scope.name]} />
                          </div>
                        </div>
                      </div>
                    )
                  })
                }
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
          <section dangerouslySetInnerHTML={{__html: form.description.cgu}} className='information-text' />
        }

        <iframe src={form.cguLink} width='100%' height='800px' />

        <div className='form__group'>
          <input onChange={this.handleChange} disabled={disabled ? 'disabled' : false} checked={validation_de_convention} type='checkbox' name='validation_de_convention' id='validation_de_convention' />
          <label htmlFor='validation_de_convention' className='label-inline'>Je valide les présentes conditions d&apos;utilisation et confirme que le DPO de mon organisme est informé de ma demande</label>
        </div>

        {!disabled &&
          <div className='button-list'>
            {id &&
              <button className='button' type='submit' name='subscribe' id='submit'>Modifier la demande</button>
            }
            {!id &&
              <button className='button' type='submit' name='subscribe' id='submit'>Soumettre la demande</button>
            }
          </div>
        }

        {errors.map(error => (
          <div key={error} className='notification error'>
            {error}
          </div>
        ))}
      </form>
    )
    /* eslint-enable react/no-danger */
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
    },
    contacts: []
  }
}

export default Form
/* eslint-enable camelcase */
