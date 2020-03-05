import React, { useContext } from 'react';
import { ScrollablePanel } from '../../Scrollable';
import { FormContext } from '../../Form';

const RecetteFonctionnelleSection = () => {
  const {
    disabled,
    onChange,
    enrollment: {
      additional_content: { recette_fonctionnelle = '' },
    },
  } = useContext(FormContext);

  return (
    <ScrollablePanel scrollableId="recette-fonctionnelle">
      <h2>Recette fonctionnelle</h2>
      <div className="text-quote">
        <p>
          La qualification de votre téléservice est obligatoire tant pour votre
          homologation de sécurité ou vos obligations RGPD que pour demander
          l'entrée en production auprès de la DGFiP.
        </p>
        <p>
          Pour vous accompagner dans vos travaux, un environnement de test est
          mis à votre disposition sur le portail des API de la DGFiP.
        </p>
        <p>
          Le périmètre des réponses de cet environnement de test est
          fonctionnellement identique à l'environnement de production.
        </p>
        <p>
          Un jeu de données fictives avec plusieurs cas nominaux vous permet de
          valider l'intégration de quelques cas fonctionnels dans votre
          téléservice. L'environnement de test proposé par la DGFiP n'a donc pas
          vocation à recetter toutes les fonctionnalités du téléservice, qui
          doivent faire l'objet d'une recette interne.
        </p>
        <p>
          A l'issue de vos travaux, veuillez attester de la qualification de
          votre téléservice.
        </p>
      </div>
      <br />
      <div className="form__group">
        <input
          onChange={onChange}
          checked={recette_fonctionnelle}
          type="checkbox"
          name="additional_content.recette_fonctionnelle"
          id="checkbox-recette_fonctionnelle"
          disabled={disabled}
        />
        <label
          htmlFor="checkbox-recette_fonctionnelle"
          className="label-inline"
        >
          J’atteste avoir réalisé une recette fonctionnelle et qualifié mon
          téléservice.
        </label>
      </div>
    </ScrollablePanel>
  );
};

export default RecetteFonctionnelleSection;
