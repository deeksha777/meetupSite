import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { FavoritesContextProvider } from "./store/favorites-context";
import { DeleteContextProvider } from "./store/deleteItem-context";
import { UpdateMeetupContextProvider } from "./store/updateMeetup-context";
import "bootstrap/dist/css/bootstrap.css";

ReactDOM.render(
  <BrowserRouter>
    <UpdateMeetupContextProvider>
      <DeleteContextProvider>
        <FavoritesContextProvider>
          <App />
        </FavoritesContextProvider>
      </DeleteContextProvider>
    </UpdateMeetupContextProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
