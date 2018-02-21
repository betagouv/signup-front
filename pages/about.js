import React from 'react'
import Link from 'next/link'
import Page from '../components/page'
import Section from '../components/section'

const About = () => (
  <Page>
    <Section title='Ne plus demander de pièces justificatives inutiles' imageSrc='../static/images/illustrations/dossiers.jpg' altText='Une pile de dossiers papier'>
      <p>Limiter les demandes des pièces justificatives ou informations lorsqu’elles sont détenues par d’autres administrations ( CAF, DGFIP, Pôle Emploi…).</p>
      <p>Limiter le risque de fraude documentaire en récupérant des informations certifiées à la source dans un point d&lsquo;accès unique.</p>
    </Section>
    <Section title='Accéder aux données de façon sécurisée' imageSrc='../static/images/illustrations/environmental-protection.jpg' altText='Arbre dans un vase en forme de planète terre'>
      <p>L&lsquo;accès aux données est réalisé au travers de protocoles de communications sécurisés et seuls les opérateurs agréés peuvent se connecter à l&lsquo;API.</p>
      <p>Pour obtenir un agrément, vous devez justifier d&lsquo;une simplification pour les citoyens, et vous engager à n&lsquo;accéder aux données personnelles qu&lsquo;avec l&lsquo;accord explicite de l&lsquo;usager.</p>
      <button className='button'><Link href='../static/docs/charte.pdf'><a>Consultez la charte</a></Link></button>
    </Section>
    <Section title='Comprendre la différence avec FranceConnect' imageSrc='../static/images/illustrations/logo-fc.png' altText='Logo du service FranceConnect'>
      <p>
        API Particulier et FranceConnect sont deux systèmes
        indépendants mais complémentaires.
      </p>
      <table className='table'>
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
            Fournisseur d’Identité et tiers de confiance                        </td>
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
      <p className='lead'>
        API Particulier et FranceConnect peuvent être utilisés
        seul ou conjointement.
      </p>
    </Section>
  </Page>
)

export default About
