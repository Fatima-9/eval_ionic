import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PokemonsList.css'

import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonChip,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonItem,
  IonLabel
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { text } from 'ionicons/icons';


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
    pre: {
      pokedex_id: number;
      name: string;
      condition: string;
    }[] | null;
    next: {
      pokedex_id: number;
      name: string;
      condition: string;
    }[] | null;
    mega: {
      orbe: string;
      sprites: {
        regular: string;
        shiny: string;
      };
    }[] | null;
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

const PokemonList: React.FC = () => {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  useEffect(() => {
    axios.get('https://tyradex.vercel.app/api/v1/pokemon')
      .then(response => {
        const data = response.data;
        // Exclure les Pokémon avec un pokedex_id de 0
        const filteredData = data.filter((pokemon: Pokemon) => pokemon.pokedex_id !== 0);
        setPokemons(filteredData);
        setFilteredPokemons(filteredData);

        // Extraire les types uniques
        const allTypes = Array.from(new Set(filteredData.flatMap((pokemon: Pokemon) => pokemon.types.map(type => type.name))));
        setTypes(allTypes);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des données", error);
        setError("Erreur lors de la récupération des données.");
      });
  }, []);

  useEffect(() => {
    if (selectedType) {
      // Filtrer les Pokémon en fonction du type sélectionné
      const filtered = pokemons.filter(pokemon => pokemon.types.some(type => type.name === selectedType));
      setFilteredPokemons(filtered);
    } else {
      // Afficher tous les Pokémon si aucun type n'est sélectionné
      setFilteredPokemons(pokemons);
    }
  }, [selectedType, pokemons]);

  const handlePokemonClick = (id: number) => {
    history.push(`/pokemon/${id}`);
  };

  const handleTypeChange = (event: CustomEvent) => {
    setSelectedType(event.detail.value as string);
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <IonPage >
      <IonHeader >
        <IonToolbar>
          
		<IonTitle style ={{color:'red' , textAlign:'center',fontWeight:'bold'}}>
  Liste des Pokémon
</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent >
	  
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <IonItem>
                <IonLabel>Choisissez un type:</IonLabel>
                <IonSelect
                  value={selectedType}
                  placeholder="Sélectionner un type"
                  onIonChange={handleTypeChange}
                >
                  <IonSelectOption value="">Tous les Types</IonSelectOption>
                  {types.map((type, index) => (
                    <IonSelectOption key={index} value={type}>
                      {type}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            </IonCol>
          </IonRow>

          <IonRow >
            {/* Liste des Pokémon */}
            {filteredPokemons.map(pokemon => (
              <IonCol size="2" key={pokemon.pokedex_id}>
                <IonCard button onClick={() => handlePokemonClick(pokemon.pokedex_id)}>
                  <img src={pokemon.sprites.shiny} alt={pokemon.name.fr} />
                  <IonCardHeader>
                    <IonCardTitle>{pokemon.name.fr}</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <p>Types:</p>
                    {pokemon.types.map((type, index) => (
                      <IonChip key={index}>
                        {type.name}
                      </IonChip>
                    ))}
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default PokemonList;
