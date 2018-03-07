import React from 'react'
import Page from '../components/page'

const Index = () => (
  <Page>
    <div>
      <div className='documentation'>
        <nav className='side-pane'>
          <ul className='side-pane__menu'>
            <li className='side-pane__title'>
              <h3>Lorem Ipsum</h3>
            </li>
            <li><a className='side-pane__link' href='#legal'>Fondement légal</a></li>
            <li><a className='side-pane__link' href='#donnees'>Choix des données</a></li>
            <li><a className='side-pane__link' href='#volumetrie'>Volumétrie</a></li>
            <li><a className='side-pane__link' href='#securite'>Engagement de sécurité</a></li>
            <li><a className='side-pane__link' href='#homologation'>Homologation</a></li>
            <li><a className='side-pane__link' href='#contrat'>Documents contractuels</a></li>
            <li><a className='side-pane__link' href='#cnil'>Obligation CNIL</a></li>
            <li><a className='side-pane__link' href='#recette'>Recette fonctionnelle</a></li>
            <li><a className='side-pane__link' href='#production'>Entrants techniques de production</a></li>
          </ul>
        </nav>
        <div className='main-pane'>
          <form action='' method='post' name='form' target='_blank' noValidate>
            <h1 className='hero__white-background'>CONTRACTUALISATION</h1>
            <div>
              <h2 id='legal'>Fondement légal</h2>
              <p>
                Pour pouvoir bénéficier du raccordement à l&lsquo;API « impôt particulier », le cadre légal et réglementaire des fournisseurs de service doit permettre à la DGFiP de transmettre des données fiscales  à votre entité administrative.
              </p>
              <p>
                Il vous est donc demandé de préciser les références du fondement légal de votre droit à demander des informations fiscales auprès de la DGFIP (délibération du conseil municipal, décret …) ainsi que les informations relatives à votre téléservice.
              </p>
              <div>
                <label htmlFor='email'>Pour être informé des nouveautés, inscrivez-vous à notre newsletter :</label>
                <input type='email' value='' name='email' id='email' />
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
            <button className='button' type='submit' name='subscribe' id='submit'>Valider</button>
          </form>
        </div>
      </div>

    </div>
  </Page>
)

export default Index
