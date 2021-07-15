import { Route, Switch } from "react-router-dom";

import AllMeetupsPage from "./pages/AllMeetup";
import NewMeetupPage from "./pages/NewMeetup";
import FavoritesPage from "./pages/Favorites";
import UpdateMeetupPage from "./pages/UpdateMeetup";
import Layout from "./components/layouts/Layout";

function App() {
  //localhost:3000/favorites
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <AllMeetupsPage />
        </Route>
        <Route path="/new-meetup">
          <NewMeetupPage />
        </Route>
        <Route path="/favorites">
          <FavoritesPage />
        </Route>
        <Route path="/update-meetup">
          <UpdateMeetupPage />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
