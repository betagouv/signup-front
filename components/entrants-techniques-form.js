import React from 'react'
import Router from 'next/router'
import Utils from '../lib/utils'
import Services from '../lib/services'
import {BACK_HOST} from '@env'
const axios = require('axios')

class EntrantsTecniquesForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      enrollment: {
        documents: [],
        ips_de_production: '',
        autorite_certification: ''
      }
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.upload = this.upload.bind(this)
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({enrollment: this.props.enrollment})
    }, 3000)
  }

  upload(event) {
    const {enrollment} = this.props

    const data = new FormData()
    data.append('enrollment[documents_attributes][][attachment]', event.target.files[0])
    data.append('enrollment[documents_attributes][][type]', 'Document::ProductionCertificatePublicKey')


    let token
    if (typeof localStorage) token = localStorage.getItem('token')
    axios.patch(BACK_HOST + '/api/enrollments/' + enrollment.id, data, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    }).then((response) => this.setState({enrollment: response.data}))

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
    let token
    if (typeof localStorage) token = localStorage.getItem('token')
    const {enrollment} = this.state

    Services.triggerUserEnrollment('send_technical_inputs', enrollment, token).then(response => {
        if (response.status == 200) Router.push('/demandes')
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
    let token
    if (typeof localStorage !== 'undefined') token = localStorage.getItem('token')
    const {enrollment} = this.state

    const productionCertificate = enrollment.documents.filter((e) => e.type == 'Document::ProductionCertificatePublicKey')[0]
    return (
      <div className='main-pane'>
        <form onSubmit={this.handleSubmit}>
          <h1 id='legal'>Entrants techniques</h1>
          <section className='information-text'>
            <p>Afin de mettre en production votre application et la connexion à API Impôts Particulier veuillez remplir les entrants techniques suivants</p>
          </section>
          <div className='form__group'>
            <label htmlFor='production_certificate'>Certificat de production</label>
            {productionCertificate &&
              <a href={BACK_HOST + productionCertificate.attachment.url + '?token=' + token}>certificat</a>
            }
            <input type='file' onChange={this.upload} name='enrollment.production_certificate' id='production_certificate'/>
          </div>
          <div className='form__group'>
            <label htmlFor='autorite_certification'>Autorité de certification</label>
            <input type='text' onChange={this.handleChange} name='enrollment.autorite_certification' id='autorite_certification' value={enrollment.autorite_certification} />
          </div>
          <div className='form__group'>
            <label htmlFor='ips_de_production'>IPs de production</label>
            <input type='text' onChange={this.handleChange} name='enrollment.ips_de_production' id='ips_de_production' value={enrollment.ips_de_production} />
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
