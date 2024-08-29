import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonButton } from '@ionic/react';

interface MovieDetails {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios.get(`http://movies-api.julienpoirier-webdev.com/infos/movies/${id}`)
      .then(response => {
        setMovie(response.data);
      })
      .catch(error => {
        console.error("Erreur lors de la récupération des détails du film", error);
        setError("Erreur lors de la récupération des détails du film.");
      });
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!movie) {
    return <p>Chargement...</p>;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Détails du Film</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt={movie.title} />
          <IonCardHeader>
            <IonCardTitle>{movie.title}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p><strong>Date de sortie:</strong> {movie.release_date}</p>
            <p><strong>Synopsis:</strong> {movie.overview}</p>
            <p><strong>Durée:</strong> N/A</p>
            <p><strong>Genres:</strong> {movie.genre_ids}</p>
            <p><strong>Titre original:</strong> {movie.original_title}</p>
            <p><strong>Langue originale:</strong> {movie.original_language}</p>
            <p><strong>Popularité:</strong> {movie.popularity}</p>
            <p><strong>Note:</strong> {movie.vote_average} ({movie.vote_count} votes)</p>
            <p><strong>Vidéo:</strong> {movie.video ? 'Oui' : 'Non'}</p>
          </IonCardContent>
        </IonCard>
        <IonButton routerLink="/movies" expand="full">Retour à la liste des films</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default MovieDetails;
