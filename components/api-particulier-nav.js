import React from 'react'

class ApiParticulierNav extends React.Component {
  render() {
    return (
      <nav className='side-pane'>
        <ul className='side-pane__menu'>
          <li className='side-pane__title'>
            <h3>Votre demande</h3>
          </li>
          <li><a className='side-pane__link' href='#identite'>Identité</a></li>
          <li><a className='side-pane__link' href='#demarche'>Démarche</a></li>
          <li><a className='side-pane__link' href='#donnees'>Données</a></li>
        </ul>
      </nav>
    )
  }
}

export default ApiParticulierNav
