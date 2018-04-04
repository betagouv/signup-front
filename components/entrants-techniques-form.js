import React from 'react'
import Router from 'next/router'
import Utils from '../lib/utils'
import Services from '../lib/services'

class EntrantsTecniquesForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      enrollment: {
        ips_de_production: ''
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
    const {enrollment} = this.props
    Object.assign(enrollment, componentState.enrollment)
    console.log(enrollment)

    Services.triggerUserEnrollment('send_technical_inputs', enrollment, token).then(response => {
        Router.push('/demandes')
    }).catch((error) => {
      if (error.response.status === 422) {
        alert('Formulaire incomplet' + response.request.response)
      } else if (error.response.status === 401) {
        alert('Vous n\'êtes pas autorisé' + response)
      } else {
        alert('Erreur inconnue' + response)
      }
    })
    event.preventDefault()
  }

  render() {
    return (
      <div className='main-pane'>
        <form onSubmit={this.handleSubmit}>
          <h1 id='legal'>Entrants techniques</h1>
          <section className='information-text'>
            <p>Afin de mettre en production votre application et la connexion à API Impôts Particulier veuillez remplir les entrants techniques suivants</p>
          </section>
          <div className='form__group'>
            <label htmlFor='ips_de_production'>IPs de production <i>(séparés par un espace)</i></label>
            <input type='text' onChange={this.handleChange} name='enrollment.ips_de_production' id='ips_de_production'/>
          </div>
          <div className='button-list'>
            <button className='button' type='submit' name='subscribe' id='submit'>Envoyer les entrants techniques</button>
          </div>
        </form>
      </div>
    )
  }
}

export default EntrantsTecniquesForm
