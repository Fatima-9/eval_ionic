import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { fileTrayStackedSharp, filmOutline } from 'ionicons/icons';
import PokemonList from './pages/PokemonsList';
import PokemonDetails from './pages/PokemonDetails';
import MoviesList from './pages/MoviesList';
import MovieDetails from './pages/MovieDetails';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Ionic Dark Mode */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          {/* Define routes for your pages */}
          <Route path="/pokemon-list" component={PokemonList} exact />
          <Route path="/pokemon/:id" component={PokemonDetails} />
          <Route path="/movies" component={MoviesList} exact />
          <Route path="/movies/:id" component={MovieDetails} />
          {/* Redirect to default tab if no match */}
          <Redirect exact from="/" to="/pokemon-list" />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="pokemon-list" href="/pokemon-list">
            <IonIcon aria-hidden="true" icon={fileTrayStackedSharp} />
            <IonLabel>Pokémons</IonLabel>
          </IonTabButton>
          <IonTabButton tab="movies" href="/movies">
            <IonIcon icon={filmOutline} />
            <IonLabel>Films</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
