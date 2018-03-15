import React from 'react'
import {deepSetInState} from '../lib/utils'

class ContractualisationForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      legal: {
        legal1: 'example 1',
        legal2: 'example 2'
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    console.log('name', name)
    console.log('value', value)

    const stateCopy = Object.assign({}, this.state)

    deepSetInState(name, value, stateCopy)

    this.setState(stateCopy)
  }

  handleSubmit(event) {
    // Alert('A name was submitted: ' + this.state) // eslint-disable-line no-alert
    event.preventDefault()
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <h1 className='hero__white-background'>CONTRACTUALISATION</h1>
        <div>
          <div className='information-text'>
            <h2 id='legal'>Fondement légal</h2>
            <p>Pour pouvoir bénéficier du raccordement à l&lsquo;API « impôt particulier », le cadre légal et réglementaire des fournisseurs de service doit permettre à la DGFiP de transmettre des données fiscales  à votre entité administrative.</p>
            <p>Il vous est donc demandé de préciser les références du fondement légal de votre droit à demander des informations fiscales auprès de la DGFIP (délibération du conseil municipal, décret …) ainsi que les informations relatives à votre téléservice.</p>
          </div>
          <div className='form__group'>
            <label htmlFor='text'>Décrivez brièvement votre service ainsi que l&lsquo;utilisation prévue des données transmises: </label>
            <textarea onChange={this.handleChange} name='legal.legal1' value={this.state.value} />
          </div>
          <div className='form__group'>
            <label htmlFor='text'>Veuillez transmettre le fondement juridique sur lequel s&lsquo;appuie votre demande: </label>
            <textarea onChange={this.handleChange} name='legal34' value={this.state.value} />
          </div>
        </div>
        <div>
          <h2 id='donnees'>Choix des données</h2>
        </div>
        <div>
          <h2 id='volumetrie'>Volumétrie</h2>
        </div>
        <div>
          <h2 id='securite'>Engagement de sécurité</h2>
        </div>
        <div>
          <h2 id='homologation'>Homologation</h2>
        </div>
        <div>
          <h2 id='contrat'>Documents contractuels</h2>
        </div>
        <div>
          <h2 id='cnil'>Obligation CNIL</h2>
        </div>
        <div>
          <h2 id='recette'>Recette fonctionnelle</h2>
        </div>
        <div>
          <h2 id='production'>Entrants techniques de production</h2>
        </div>
        <button className='button'>Sauvegarder</button>
        <button className='button' type='submit' name='subscribe' id='submit'>Soumettre la demande</button>
      </form>
    )
  }
}

export default ContractualisationForm
