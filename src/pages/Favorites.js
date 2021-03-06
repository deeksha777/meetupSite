import { useContext } from "react";
import FavoritesContext from "../store/favorites-context";
import MeetupList from "../components/meetups/MeetupList";
import { Helmet } from "react-helmet";

function FavoritesPage() {
  const favoritesCtx = useContext(FavoritesContext);

  let content;

  if (favoritesCtx.totalFavorites === 0) {
    content = <p> You got no favorites yet. Start adding some?</p>;
  } else {
    content = <MeetupList meetups={favoritesCtx.favorites} />;
  }

  console.log("content::", content);

  return (
    <section>
      <Helmet>
        <title>Favorite Meetup Places</title>
        <meta name="description" content="Favorite your Meetups" />
      </Helmet>
      {content}
    </section>
  );
}

export default FavoritesPage;
