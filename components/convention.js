import React from 'react'

const Convention = () => (
  <div>
    <div className='row'>
      <div className='col-md-4'>
        <ul className='list-group'>
          <li href='' className='list-group-item list-group-item-success'>
            <h3>Vous pouvez :</h3>
          </li>
          <li className='list-group-item'>
            <h4 className='list-group-item-heading'>Récupérer les données nécessaires à vos démarches</h4>
            <p className='list-group-item-text'>
              Vous récupérez des données fiables que vous pouvez facilement intégrer
              dans vos procesus d&lsquo;instruction.
            </p>
          </li>
          <li className='list-group-item'>
            <h4 className='list-group-item-heading'>Afficher des données à l’usager</h4>
            <p className='list-group-item-text'>
              Il est possible d&lsquo;afficher des données à l’usager si elles ne
              menacent pas sa vie privée. Par exemple, les tarifs de la cantine
              après avoir été calculés à partir du quotient familial récupéré
              auprès de la CAF.
            </p>
          </li>
        </ul>
      </div>
      <div className='col-md-4'>
        <ul className='list-group'>
          <li href='' className='list-group-item list-group-item-info'>
            <h3>Vous devez :</h3>
          </li>
          <li className='list-group-item'>
            <h4 className='list-group-item-heading'>Accepter la charte</h4>
            <p className='list-group-item-text'>
              Cette charte vous donne droit à un jeton d&lsquo;accès à l&lsquo;API
              Particulier pour récupérer des données fiables utiles à
              vos démarches.
            </p>
          </li>
          <li className='list-group-item'>
            <h4 className='list-group-item-heading'>Traiter la bonne donnée par le bon agent de la collectivité</h4>
            <p className='list-group-item-text'>L&lsquo;agent habilité du service
              instructeur peut accéder aux données personnelles.
            </p>
          </li>
          <li className='list-group-item'>
            <h4 className='list-group-item-heading'>Informer correctement l’usager</h4>
            <p className='list-group-item-text'>Explicitement demander l&lsquo;accord de
              l&lsquo;usager pour récupérer ses données auprès d&lsquo;un fournisseur.
            </p>
          </li>
        </ul>
      </div>
      <div className='col-md-4'>
        <ul className='list-group'>
          <li href='' className='list-group-item list-group-item-danger'>
            <h3>Vous ne pouvez pas :</h3>
          </li>
          <li className='list-group-item'>
            <h4 className='list-group-item-heading'>Afficher des données confidentielles à l’usager</h4>
            <p className='list-group-item-text'>
              L’usager n’étant pas authentifié, aucune garantie ne vous permet
              d’afficher des données brutes récupérées auprès de l&lsquo;API sans prendre le
              risque de les dévoiler à un tiers.
            </p>
          </li>
          <li className='list-group-item'>
            <h4 className='list-group-item-heading'>Recupérer les informations par lot</h4>
            <p className='list-group-item-text'>
              L’API Particulier propose du point à point, vous ne pouvez lancer
              des récupérations de données en masse.
            </p>
          </li>
        </ul>
      </div>
    </div>
  </div>
)

export default Convention
