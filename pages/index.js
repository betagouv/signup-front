import React from 'react'
import Link from 'next/link'
import Page from '../components/page'
import Section from '../components/section'
import Search from '../components/search'

const Index = () => (
  <Page>
    <div className='hero__container'>
      <h1 className='hero__white-background'>API Particulier</h1>
      <h3 className='hero__white-background'>Simplifiez les démarches de vos usagers, ne demandez plus de justificatifs</h3>
    </div>
    <Search />
    <Section title='Catalogue des données fournies par API Particulier'>
      <div className='row'>
        <div className='col-md-6'>
          <ul>
            <li>
              <h3>Direction Générale des Finances Publiques</h3>
            </li>
            <li>
              <h4>Avis d&lsquo;imposition</h4>
              <p>
                Contient le revenu fiscal de référence, le nombre de part et
                les déclarants
              </p>
            </li>
            <li>
              <h4>Adresse fiscale</h4>
              <p>
                Contient l&lsquo;adresse fiscale ainsi que l&lsquo;adresse structurée et styles
                coordonnée GPS
              </p>
            </li>
          </ul>
        </div>
        <div className='col-md-6'>
          <ul>
            <li>
              <h3>Caisse d&lsquo;Allocation Familiales</h3>
            </li>
            <li>
              <h4>Quotient familial</h4>
              <p>
                Contient le quotient familial du mois précédent
              </p>

            </li>
            <li>
              <h4>Composition familiale</h4>
              <p>
                Contient les parents et les enfants de la familles déclaré à la
                <abbr title='Caisse d&lsquo;Allocation Familiale'>CAF</abbr>
              </p>
            </li>

            <li>
              <h4>Adresse</h4>
              <p>
                Contient l&lsquo;adresse déclarée à la
                <abbr title='Caisse d&lsquo;Allocation Familiale'>CAF</abbr>
              </p>
            </li>
          </ul>
        </div>
      </div>
    </Section>
    <Section>
      <button className='button'><Link href='/contractualisation'><a className='nav__link'>Demander un accès</a></Link></button>
    </Section>
  </Page>
)

export default Index
