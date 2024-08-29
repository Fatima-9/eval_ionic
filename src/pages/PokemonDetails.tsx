import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton, IonButtons } from '@ionic/react';
import axios from 'axios';

interface Pokemon {
    pokedex_id: number;
	generation: number;
	category: string;
	name: {
		fr: string;
		en: string;
		jp: string;
	};
	sprites: {
		regular: string;
		shiny: string;
		gmax: string | null;
	};
	types: {
		name: string;
		image: string;
	}[];
	talents: {
		name: string;
		tc: boolean;
	}[];
	stats: {
		hp: number;
		atk: number;
		def: number;
		spe_atk: number;
		spe_def: number;
		vit: number;
	};
	resistances: {
		name: string;
		multiplier: number;
	}[];
	evolution: {
		pre:
			| {
					pokedex_id: number;
					name: string;
					condition: string;
			  }[]
			| null;
		next:
			| {
					pokedex_id: number;
					name: string;
					condition: string;
			  }[]
			| null;
		mega:
			| {
					orbe: string;
					sprites: {
						regular: string;
						shiny: string;
					};
			  }[]
			| null;
	};
	height: string;
	weight: string;
	egg_groups: string[];
	sexe: {
		male: number;
		female: number;
	};
	catch_rate: number;
	level_100: number;
	formes: any;
}
const PokemonDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();  // Get the Pokémon ID from the URL
  const history = useHistory();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    axios.get(`https://tyradex.vercel.app/api/v1/pokemon/${id}`)
      .then(response => {
        setPokemon(response.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des détails du Pokémon", error);
      });
  }, [id]);

  if (!pokemon) {
    return <p>Chargement...</p>;
  }

  const handleNext = () => {
    const nextId = Number(id) + 1;
    history.push(`/pokemon/${nextId}`);
  };

  const handlePrevious = () => {
    const previousId = Number(id) - 1;
    history.push(`/pokemon/${previousId}`);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Détails de {pokemon.name.fr}</IonTitle>
          <IonButtons slot="start">
            <IonButton onClick={() => history.goBack()}>Retour à la liste</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <img src={pokemon.sprites.regular} alt={pokemon.name.fr} />
          <IonCardHeader>
            <IonCardTitle>{pokemon.name.fr}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p><strong>Types:</strong> {pokemon.types?.map(type => type.name).join(', ')}</p>
            <p><strong>Taille:</strong> {pokemon.height}</p>
            <p><strong>Poids:</strong> {pokemon.weight}</p>
            {pokemon.evolution && (
              <div>
                <p><strong>Évolution précédente:</strong> {pokemon.evolution.pre?.map(evo => evo.name).join(', ') || 'Aucune'}</p>
                <p><strong>Évolution suivante:</strong> {pokemon.evolution.next?.map(evo => evo.name).join(', ') || 'Aucune'}</p>
              </div>
            )}
          </IonCardContent>
        </IonCard>
        <IonButtons>
          <IonButton onClick={handlePrevious} disabled={Number(id) <= 1}>Précédent</IonButton>
          <IonButton onClick={handleNext}>Suivant</IonButton>
        </IonButtons>
      </IonContent>
    </IonPage>
  );
};

export default PokemonDetails;
