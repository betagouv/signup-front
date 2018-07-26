import React from 'react'

const DgfipNav = () => (
  <nav className='side-pane'>
    <ul className='side-pane__menu'>
      <li className='text-center'><a className='side-pane__link' href='http://dgfip.com'><img src='/static/images/logo-dgfip.png' style={{mixBlendMode: 'multiply'}} /></a></li>
      <li className='side-pane__title'>
        <h3>Votre demande</h3>
      </li>
      <li><a className='side-pane__link' href='#legal'>Fondement juridique</a></li>
      <li><a className='side-pane__link' href='#donnees'>Choix des données</a></li>
      <li><a className='side-pane__link' href='#volumetrie'>Volumétrie</a></li>
      <li><a className='side-pane__link' href='#cnil'>Obligation CNIL</a></li>
      <li><a className='side-pane__link' href='#convention'>Convention</a></li>
    </ul>
    <ul className='side-pane__menu'>
      <li className='side-pane__title'>
        <h3>Données de productions</h3>
      </li>
      <li><a className='side-pane__link' href='#entrants-techniques'>Entrants techniques</a></li>
      <li><a className='side-pane__link' href='#homologation-securite'>Homologation de sécurité</a></li>
      <li><a className='side-pane__link' href='#recette-fonctionnelle'>Recette fonctionnelle</a></li>
    </ul>
  </nav>
)

export default DgfipNav
