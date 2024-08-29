import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle, IonSearchbar, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';

interface Movie {
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

const MoviesList: React.FC = () => {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [totalPages, setTotalPages] = useState<number>(1);
    const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
    const history = useHistory();
    const fetchMovies = (searchQuery: string, pageNumber: number) => {
  
        axios.get(`http://movies-api.julienpoirier-webdev.com/search/movies/${searchQuery}/${pageNumber}`)
          .then(response => {
            setMovies(response.data.results);
            setTotalPages(response.data.total_pages);
          })
          .catch(error => {
            console.error("Erreur lors de la récupération des films", error);
            setError("Erreur lors de la récupération des films.");
          });
      };
    
      useEffect(() => {
        fetchMovies(query, page);
      }, [query, page]);
  const handleMovieClick = (id: number) => {
    history.push(`/movies/${id}`);
  };
  const handleSearch = (e: CustomEvent) => {
   setQuery(e.detail.value as string);
    fetchMovies(query.toLowerCase(), page);
      //setFilteredMovies(movies.filter(movie => movie.title.toLowerCase().includes(query.toLowerCase())));
    
  };
  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  const handleFirstPage = () => {
    setPage(1);
  };

  const handleLastPage = () => {
    setPage(totalPages);
  };
  if (error) {
    return <p>{error}</p>;
  };
 
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Liste des Films</IonTitle>
          <IonSearchbar
            value={query}
            onIonInput={handleSearch}
            debounce={0}
            placeholder="Rechercher un film..."
          />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            {movies.map(movie => (
              <IonCol size="6" key={movie.id}>
                <IonCard button onClick={() => handleMovieClick( movie.id)}>
                  <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
                  <IonCardHeader>
                    <IonCardTitle>{movie.title}</IonCardTitle>
                    <IonCardSubtitle>{movie.overview.substring(0, 100)}...</IonCardSubtitle>
                  </IonCardHeader>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
        <div className="pagination-buttons">
        <IonButton onClick={handleFirstPage} disabled={page === 1}>Première Page</IonButton>
          <IonButton onClick={handlePreviousPage} disabled={page === 1}>Précédent</IonButton>
          <IonButton onClick={handleNextPage} disabled={page === totalPages}>Suivant</IonButton>
          <IonButton onClick={handleLastPage} disabled={page === totalPages}>Dernière Page</IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default MoviesList;
