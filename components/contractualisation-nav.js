import React from 'react'

class ContractualisationNav extends React.Component {
  render() {
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
      </nav>
    )
  }
}

export default ContractualisationNav
