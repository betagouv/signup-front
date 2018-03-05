import React from 'react'
import Page from '../components/page'
import Section from '../components/section'
import LinkButton from '../components/link-button'

const About = () => (
  <Page>
    <Section>
      <div className='container'>
        <div className='row'>
          <div className='column'>
            <h2 className='section__title'>Ne plus demander de pièces justificatives inutiles</h2>
            <p>Limiter les demandes des pièces justificatives ou informations lorsqu’elles sont détenues par d’autres administrations ( CAF, DGFIP, Pôle Emploi…).</p>
            <p>Limiter le risque de fraude documentaire en récupérant des informations certifiées à la source dans un point d&lsquo;accès unique.</p>
          </div>
          <div className='column'>
            <h2 className='section__title'>Accéder aux données de façon sécurisée</h2>
            <p>L&lsquo;accès aux données est réalisé au travers de protocoles de communications sécurisés et seuls les opérateurs agréés peuvent se connecter à l&lsquo;API.</p>
            <p>Pour obtenir un agrément, vous devez justifier d&lsquo;une simplification pour les citoyens, et vous engager à n&lsquo;accéder aux données personnelles qu&lsquo;avec l&lsquo;accord explicite de l&lsquo;usager.</p>
            <LinkButton url='../static/docs/charte.pdf' text='Consultez la charte' />
          </div>
        </div>
      </div>
    </Section>
    <Section title='Comprendre la différence avec FranceConnect'>
      <div className='container'>
        <div className='row'>
          <div className='column'>
            <p>
            API Particulier et FranceConnect sont deux systèmes
          indépendants mais complémentaires.
            </p>
            <table className='table-fc'>
              <tr>
                <th />
                <th>
                  FranceConnect
                </th>
                <th>
                  API Particulier
                </th>
              </tr>
              <tr>
                <th>
                    Nature
                </th>
                <td>
                  Fournisseur d’Identité et tiers de confiance
                </td>
                <td>
                  Fournisseur de Données
                </td>
              </tr>
              <tr>
                <th>
                  Identification
                </th>
                <td>
                  Citoyen et Fournisseur de Service
                </td>
                <td>
                Fournisseur de Service
                </td>
              </tr>
              <tr>
                <th>
                  Type de donnée
                </th>
                <td>
                  liée à la personne
                </td>
                <td>
                liée à la personne, au foyer familial, aux parents et aux enfants
                </td>
              </tr>
            </table>
            <p>
            API Particulier et FranceConnect peuvent être utilisés
            seul ou conjointement.
            </p>
          </div>
          <div className='column'>
            <img src='../static/images/illustrations/logo-fc.png' alt='Logo du service FranceConnect' />
          </div>
        </div>
      </div>
    </Section>
  </Page>
)

export default About
