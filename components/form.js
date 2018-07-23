import {BACK_HOST} from '@env'
import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import {merge, zipObjectDeep} from 'lodash'
import Services from '../lib/services'
import {getErrorMessage} from '../lib/utils'
import FranceConnectServiceProvider from './form/france-connect-service-provider'
import Siren from './form/siren'

class Form extends React.Component {
  constructor(props) {
    super(props)

    const {form} = props

    this.state = {
      errors: [],
      isUserEnrollmentLoading: true,
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
          fondement_juridique: '',
          url_fondement_juridique: ''
        },
        documents: [],
        donnees: {
          conservation: '',
          destinataires: {}
        },
        fournisseur_de_donnees: form.provider,
        fournisseur_de_service: '',
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
    this.upload = this.upload.bind(this)
    this.handleSirenChange = this.handleSirenChange.bind(this)
    this.handleServiceProviderChange = this.handleServiceProviderChange.bind(this)
  }

  componentDidMount() {
    const {id} = this.props

    if (id) {
      Services.getUserEnrollment(id).then(enrollment => {
        this.setState(({enrollment: prevEnrollment}) => ({
          isUserEnrollmentLoading: false,
          enrollment: merge({}, prevEnrollment, enrollment)
        }))
      }).catch(this.setState({isUserEnrollmentLoading: false}))
    } else {
      this.setState({isUserEnrollmentLoading: false})
    }
  }

  handleChange({target: {type, checked, value: inputValue, name}}) {
    const value = type === 'checkbox' ? checked : inputValue

    this.setState(({enrollment: prevEnrollment}) => ({
      enrollment: merge({}, prevEnrollment, zipObjectDeep([`${name}`], [value]))
    }))
  }

  handleServiceProviderChange({intitule, description, fournisseur_de_service}) {
    this.setState(({enrollment: prevEnrollment}) => ({
      enrollment: merge({}, prevEnrollment, {
        demarche: {
          intitule,
          description
        },
        fournisseur_de_service
      })
    }))
  }

  handleSirenChange({siren}) {
    this.setState(({enrollment: prevEnrollment}) => ({
      enrollment: merge({}, prevEnrollment, {siren})
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

  render() {
    let token
    if (typeof localStorage !== 'undefined') { // eslint-disable-line no-constant-condition
      token = localStorage.getItem('token')
    }
    const {
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
      errors,
      isUserEnrollmentLoading
    } = this.state

    const {
      form,
      IntroDescription,
      DemarcheDescription,
      CguDescription,
      CadreJuridiqueDescription
    } = this.props
    // Enable edition if user can send application or if it's a new enrollment (ie. enrollment has no id)
    const disabled = !(acl.send_application || !id)
    const legalBasis = documents.filter(({type}) => type === 'Document::LegalBasis')[0]

    return (
      <form>
        <h1>{form.text.title}</h1>
        <IntroDescription />

        <h2 id='identite'>Identité</h2>

        {!isUserEnrollmentLoading &&
          <Siren disabled={disabled} siren={siren} handleSirenChange={this.handleSirenChange} />
        }

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
        <DemarcheDescription />

        {!isUserEnrollmentLoading && !disabled && form.franceConnected && (
          <FranceConnectServiceProvider onServiceProviderChange={this.handleServiceProviderChange} fournisseur_de_service={fournisseur_de_service} />
        )}

        <div className='form__group'>
          <label htmlFor='intitule_demarche'>Intitulé</label>
          <input type='text' onChange={this.handleChange} name='demarche.intitule' id='intitule_demarche' disabled={form.franceConnected || disabled} value={demarche.intitule} />
        </div>

        <div className='form__group'>
          <label htmlFor='description_service'>Décrivez brièvement votre service ainsi que l&lsquo;utilisation prévue des données transmises</label>
          <textarea rows='10' onChange={this.handleChange} name='demarche.description' id='description_service' disabled={form.franceConnected || disabled} value={demarche.description} />
        </div>

        {form.franceConnected &&
          <div className='form__group'>
            <label>Clé fournisseur de service</label>
            <input type='text' disabled value={fournisseur_de_service} />
          </div>
        }

        <h2>Cadre juridique</h2>
        <CadreJuridiqueDescription />
        <div className='form__group'>
          <label htmlFor='fondement_juridique'>Référence du texte vous autorisant à récolter ces données</label>
          <input type='text' onChange={this.handleChange} name='demarche.fondement_juridique' id='fondement_juridique' disabled={disabled} value={demarche.fondement_juridique} />
        </div>
        <div className='form__group'>
          <h3>Document associé</h3>
          {demarche.url_fondement_juridique ? (
            <label htmlFor='url_fondement_juridique'><a href={demarche.url_fondement_juridique}>URL du texte</a></label>
          ) : (
            <label htmlFor='url_fondement_juridique'>URL du texte</label>
          )}
          <input type='text' onChange={this.handleChange} name='demarche.url_fondement_juridique' id='url_fondement_juridique' disabled={disabled} value={demarche.url_fondement_juridique} />
          <div style={{padding: '1em', fontWeight: 'bold'}}>ou</div>
          {legalBasis ? (
            <label htmlFor='Document::LegalBasis'><a href={`${BACK_HOST + legalBasis.attachment.url}?token=${token}`}>Pièce jointe</a></label>
          ) : (
            <label htmlFor='Document::LegalBasis'>Pièce jointe</label>
          )}
          <input type='file' onChange={this.upload} disabled={disabled} name='Document::LegalBasis' id='document_legal_basis' />
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
          <input type='number' min='0' onChange={this.handleChange} name='donnees.conservation' id='donnees_conservation' disabled={disabled} value={donnees.conservation} />
        </div>

        <h1 id='cgu'>Conditions d&acute;utilisation</h1>
        <CguDescription />

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
  form: PropTypes.object,
  IntroDescription: PropTypes.node.isRequired,
  DemarcheDescription: PropTypes.node.isRequired,
  CguDescription: PropTypes.node.isRequired,
  CadreJuridiqueDescription: PropTypes.node.isRequired
}

Form.defaultProps = {
  id: '',
  form: {
    provider: '',
    scopes: [],
    cguLink: '',
    text: {
      title: ''
    }
  }
}

export default Form
