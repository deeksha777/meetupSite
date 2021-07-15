import { useState, useEffect } from "react";
import { createContext } from "react";

const DeleteContext = createContext({
  deleteItem: (meetupId) => {},
  updatePageAfterDelete: (meetupId) => {},
});

export function DeleteContextProvider(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [loadedMeetups, setLoadedMeetups] = useState([]);
  const [requestData, setRequestData] = useState([]);
  const [error, setError] = useState(null);

  function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }

  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://react-getting-started-bb553-default-rtdb.firebaseio.com/meetups.json"
    )
      .then(handleErrors)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const totalMeetups = [];
        for (const key in data) {
          const currentMeetup = {
            id: key,
            ...data[key],
          };
          totalMeetups.push(currentMeetup);
        }
        setIsLoading(false);
        setLoadedMeetups(totalMeetups);
      })
      .catch((error) => {
        console.log("Error fetching data ", error);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [requestData]);

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  if (error) {
    return "Error!";
  }

  function deleteItemHandler(meetupId) {
    return loadedMeetups.filter((item) => item.id !== meetupId);
  }

  function updatePageAfterDeleteHandler(meetupData) {
    const updatedMeetups = [];
    setIsLoading(true);
    for (const key in meetupData) {
      const itemId = meetupData[key].id;
      const jsonValue = {
        ...meetupData[key],
      };
      delete jsonValue.id;
      const currentMeetup =
        '"' + itemId + '"' + ":" + JSON.stringify(jsonValue);
      updatedMeetups.push(currentMeetup);
    }
    const finalMeetUps = "{" + updatedMeetups + "}";
    fetch(
      "https://react-getting-started-bb553-default-rtdb.firebaseio.com/meetups.json",
      {
        method: "PUT",
        body: finalMeetUps === "" ? "{}" : finalMeetUps,
        headers: {
          "Content-type": "application/json",
        },
      }
    )
      .then(handleErrors)
      .then((data) => {
        setIsLoading(true);
        setLoadedMeetups(data);
        setRequestData(data);
      })
      .catch((error) => {
        console.log("Error fetching data ", error);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }
  if (error) {
    return "Error!";
  }

  const context = {
    deleteItem: deleteItemHandler,
    updatePageAfterDelete: updatePageAfterDeleteHandler,
  };

  return (
    <DeleteContext.Provider value={context}>
      {props.children}
    </DeleteContext.Provider>
  );
}

export default DeleteContext;
