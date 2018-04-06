import React from 'react'
import {BACK_HOST} from '@env'
const axios = require('axios')

class ContractualisationNav extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      enrollment: {
        acl: {}
      }
    }
  }
  componentDidMount() {
    const {id} = this.props

    let token
    if (typeof localStorage) token = localStorage.getItem('token')
    if (id) axios.get(BACK_HOST + '/api/enrollments/' + id, {
      headers: {
        Authorization: 'Bearer ' + token,
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      this.setState({enrollment: response.data})
    })
  }

  render() {
    const {enrollment} = this.state

    return (
      <nav className='side-pane'>
        <ul className='side-pane__menu'>
          <li className='side-pane__title'>
            <h3>Contractualisation</h3>
          </li>
          <li><a className='side-pane__link' href='#legal'>Fondement juridique</a></li>
          <li><a className='side-pane__link' href='#donnees'>Choix des données</a></li>
          <li><a className='side-pane__link' href='#volumetrie'>Volumétrie</a></li>
          <li><a className='side-pane__link' href='#cnil'>Obligation CNIL</a></li>
          <li><a className='side-pane__link' href='#convention'>Convention</a></li>
        </ul>
          {enrollment.acl.show_technical_inputs &&
            <ul className='side-pane__menu'>
              <li className='side-pane__title'>
                <h3>Entrants Techniques</h3>
              </li>
              <li><a className='side-pane__link' href='#entrants-techniques'>Entrants tehniques</a></li>
              <li><a className='side-pane__link' href='#homologation-securite'>Homologation de sécurité</a></li>
              <li><a className='side-pane__link' href='#recette-fonctionnelle'>Recette fonctionnelle</a></li>
            </ul>
          }
      </nav>
    )
  }
}

export default ContractualisationNav
