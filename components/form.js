import React from 'react'
import PropTypes from 'prop-types'
import Router from 'next/router'
import Services from '../lib/services'
import Utils from '../lib/utils'

const axios = require('axios')

class Form extends React.Component {
  constructor(props) {
    super(props)

    const {form} = props

    this.state = {
      errors: [],
      enrollment: {
        fournisseur_de_donnees: form.provider, // eslint-disable-line camelcase
        scopes: {},
        acl: {
          send_application: true // eslint-disable-line camelcase
        },
        contacts: form.contacts,
        siren: '',
        demarche: {
          intitule: '',
          description: '',
          fondement_juridique: '' // eslint-disable-line camelcase
        },
        donnees: {
          conservation: '',
          destinataires: {}
        },
        validation_de_convention: false, // eslint-disable-line camelcase
        validation_delegue_a_la_protection_des_données: false // eslint-disable-line camelcase
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getSiren = this.getSiren.bind(this)
    this.handleSiren = this.handleSiren.bind(this)
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
        this.getSiren()
      })
    }
  }

  handleChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    const stateCopy = Object.assign({}, this.state)

    Utils.deepSetInState(name, value, stateCopy)

    this.setState(stateCopy)
  }

  handlePeopleChange(person) {
    return event => {
      let {enrollment} = this.state
      const target = event.target
      const value = target.value
      const name = target.name
      enrollment = Object.assign({}, enrollment)
      enrollment.contacts = enrollment.contacts.map(contact => {
        if (contact.id === person.id) {
          contact[name] = value
          return contact
        }
        return contact
      })
      this.setState({enrollment})
    }
  }

  handleSubmit(event) {
    const componentState = this.state
    const token = localStorage.getItem('token')
    if (componentState.enrollment.id) {
      Services.updateUserEnrollment(componentState, token).then(response => {
        if (response.status === 200) {
          Router.push('/')
        }
      }).catch(error => {
        if (error.response.status === 422) {
          let errors = []
          let enrollmentError
          for (enrollmentError in error.response.data) {
            if (Object.prototype.hasOwnProperty.call(error.response.data, enrollmentError)) {
              errors = errors.concat(error.response.data[enrollmentError])
            }
          }
          this.setState({errors})
        }
      })
    } else {
      Services.createUserEnrollment(componentState, token).then(response => {
        if (response.status === 201) {
          Router.push('/')
        }
      }).catch(error => {
        if (error.response.status === 422) {
          let errors = []
          let enrollmentError
          for (enrollmentError in error.response.data) {
            if (Object.prototype.hasOwnProperty.call(error.response.data, enrollmentError)) {
              errors = errors.concat(error.response.data[enrollmentError])
            }
          }
          this.setState({errors})
        }
      })
    }
    event.preventDefault()
  }

  handleSiren(e) {
    this.handleChange(e)
    this.getSiren()
  }

  getSiren() {
    const {enrollment} = this.state
    const sirenWithoutSpaces = enrollment.siren.replace(/ /g, '')

    axios.get(`https://sirene.entreprise.api.gouv.fr/v1/siren/${sirenWithoutSpaces}`).then(response => {
      const siegeSocial = response.data.siege_social
      const raison_sociale = siegeSocial.nom_raison_sociale // eslint-disable-line camelcase
      const responsable = siegeSocial.nom + ' ' + siegeSocial.prenom
      const code_naf = siegeSocial.activite_principale // eslint-disable-line camelcase
      const adresse = [siegeSocial.l2_normalisee, siegeSocial.l3_normalisee, siegeSocial.l4_normalisee, siegeSocial.l5_normalisee, siegeSocial.l6_normalisee, siegeSocial.l7_normalisee].filter(e => e).join(', ')
      this.setState({sirenNotFound: false})
      this.setState({enrollment: Object.assign(enrollment, {raison_sociale, adresse, responsable, code_naf})}) // eslint-disable-line camelcase
    }).catch(() => this.setState({
      enrollment: Object.assign(enrollment, {raison_sociale: '', adresse: '', responsable: '', code_naf: ''}), // eslint-disable-line camelcase
      sirenNotFound: true
    }))
  }

  render() {
    const {enrollment, sirenNotFound, errors} = this.state
    const {form} = this.props
    const readOnly = enrollment.acl.send_application ? false : 'disabled'

    let personId = 0
    const personForm = person => {
      person.id = person.id || 'person_' + personId++
      return (
        <div key={person.id} className='card'>
          <div className='card__content'>
            <h3>{person.heading}</h3>
            {person.description &&
              <a className='card__meta' href={person.description}>{person.description}</a>
            }
            <div className='form__group'>
              <label htmlFor={'person_' + person.id + '_nom'}>Nom et Prénom</label>
              <input type='text' onChange={this.handlePeopleChange(person)} name='nom' id={'person_' + person.id + '_nom'} disabled={readOnly} value={person.nom} />
            </div>
            <div className='form__group'>
              <label htmlFor={'person_' + person.id + '_email'}>Email</label>
              <input type='text' onChange={this.handlePeopleChange(person)} name='email' id={'person_' + person.id + '_email'} disabled={readOnly} value={person.email} />
            </div>
          </div>
        </div>
      )
    }

    /* eslint-disable react/no-danger */
    return (
      <form onSubmit={this.handleSubmit}>
        <h1>{form.text.title}</h1>
        <div dangerouslySetInnerHTML={{__html: form.text.intro}} className='intro' />

        <h2 id='identite'>Identité</h2>

        <div className='form__group'>
          <label htmlFor='search-siren'>Rechercher votre organisme avec son SIREN</label>
          <div className='search__group'>
            <input type='text' value={enrollment.siren} name='enrollment.siren' id='search-siren' onChange={this.handleSiren} />
            <button className='overlay-button' type='button' aria-label='Recherche' onClick={this.getSiren}>
              <svg className='icon icon-search' id='icon-search' width='100%' height='100%'>
                <title>Rechercher</title>
                <path d='M15.504 13.616l-3.79-3.223c-0.392-0.353-0.811-0.514-1.149-0.499 0.895-1.048 1.435-2.407 1.435-3.893 0-3.314-2.686-6-6-6s-6 2.686-6 6 2.686 6 6 6c1.486 0 2.845-0.54 3.893-1.435-0.016 0.338 0.146 0.757 0.499 1.149l3.223 3.79c0.552 0.613 1.453 0.665 2.003 0.115s0.498-1.452-0.115-2.003zM6 10c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4z' />
              </svg>
            </button>
          </div>
        </div>

        {sirenNotFound &&
          <div className='form__group'>
            <div className='notification error'>Notre service ne parvient pas à trouver votre SIREN</div>
          </div>
        }

        <div className='form__group'>
          <label htmlFor='raison_sociale'>Raison sociale</label>
          <input type='text' onChange={this.handleChange} name='enrollment.raison_sociale' id='raison_sociale' disabled value={enrollment.raison_sociale} />
        </div>
        <div className='form__group'>
          <label htmlFor='adresse'>Adresse</label>
          <input type='text' onChange={this.handleChange} name='enrollment.adresse' id='adresse' disabled value={enrollment.adresse} />
        </div>
        <div className='form__group'>
          <label htmlFor='code_naf'>Code NAF</label>
          <input type='text' onChange={this.handleChange} name='enrollment.code_naf' id='code_naf' disabled value={enrollment.code_naf} />
        </div>

        <h3>Contacts</h3>
        <div className='row card-row'>
          {enrollment.contacts.map(person => personForm(person))}
        </div>

        <h2 id='demarche'>Démarche</h2>
        <section dangerouslySetInnerHTML={{__html: form.description.demarche}} className='information-text' />
        <div className='form__group'>
          <label htmlFor='intitule_demarche'>Intitulé</label>
          <input type='text' onChange={this.handleChange} name='enrollment.demarche.intitule' id='intitule_demarche' disabled={readOnly} value={enrollment.demarche.intitule} />
        </div>
        <div className='form__group'>
          <label htmlFor='description_service'>Décrivez brièvement votre service ainsi que l&lsquo;utilisation prévue des données transmises</label>
          <textarea rows='10' onChange={this.handleChange} name='enrollment.demarche.description' id='description_service' disabled={readOnly} value={enrollment.demarche.description} />
        </div>

        <div className='form__group'>
          <label htmlFor='fondement_juridique'>Cadre juridique <i>(indiquez la référence ou l&apos;URL du texte vous autorisant à récolter ces données)</i></label>

          <input type='text' onChange={this.handleChange} name='enrollment.demarche.fondement_juridique' id='fondement_juridique_demarche' disabled={readOnly} value={enrollment.demarche.fondement_juridique} />
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
                        <input className='scope__checkbox' onChange={this.handleChange} type='checkbox' name={`enrollment.scopes.${scope.name}`} id={`checkbox-scope_api_entreprise${scope.name}`} disabled={readOnly} checked={enrollment.scopes[scope.name] ? 'checked' : false} />
                        <label htmlFor={`checkbox-scope_api_entreprise${scope.name}`} className='label-inline'>{scope.humanName}</label>
                        <div className='scope__destinataire'>
                          <div className='form__group'>
                            <label htmlFor={`destinataire_${scope.name}`}>Destinataires <a href='https://www.cnil.fr/fr/definition/destinataire' target='_blank' rel='noopener noreferrer'>(plus d&acute;infos)</a></label>
                            <input type='text' onChange={this.handleChange} name={`enrollment.donnees.destinataires.${scope.name}`} id={`desinataire_${scope.name}`} disabled={readOnly} value={enrollment.donnees.destinataires[scope.name]} />
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
          <input type='number' onChange={this.handleChange} name='enrollment.donnees.conservation' id='donnees_conservation' disabled={readOnly} value={enrollment.donnees.conservation} />
        </div>

        <h1 id='cgu'>Conditions d&acute;utilisation</h1>
        { form.description.cgu &&
          <section dangerouslySetInnerHTML={{__html: form.description.cgu}} className='information-text' />
        }

        <iframe src={form.cguLink} width='100%' height='800px' />

        <div className='form__group'>
          <input onChange={this.handleChange} disabled={readOnly} checked={enrollment.validation_de_convention} type='checkbox' name='enrollment.validation_de_convention' id='validation_de_convention' />
          <label htmlFor='validation_de_convention' className='label-inline'>Je valide les présentes conditions d&apos;utilisation et confirme que le DPO de mon organisme est informé de ma demande</label>
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

        {errors.map(error => {
          let i = 0
          return (
            <div key={i++} className='notification error'>
              {error}
            </div>
          )
        })}
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
