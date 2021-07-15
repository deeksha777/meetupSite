import { createContext, useState } from "react";
import { useHistory } from "react-router-dom";

const UpdateMeetupContext = createContext({
  updates: [],
  updateMeetup: (updateItem) => {},
  prevUserData: (prevData) => {},
});

export function UpdateMeetupContextProvider(props) {
  const [userUpdate, setUserUpdate] = useState([]);
  const history = useHistory();

  function prevUserDataHandler(prevData) {
    setUserUpdate(prevData);
  }

  function updateMeetupHandler(updateItem) {
    const result = {};
    for (const key in updateItem) {
      if (userUpdate[key] !== updateItem[key]) result[key] = updateItem[key];
    }

    let jsonBody = "";
    for (const key in result) {
      jsonBody +=
        '"' + userUpdate.id + "/" + key + '":' + '"' + result[key] + '"' + ",";
    }
    jsonBody = jsonBody.slice(0, -1);
    const finalJsonBody = "{" + jsonBody + "}";

    fetch(
      "https://react-getting-started-bb553-default-rtdb.firebaseio.com/meetups.json",
      {
        method: "PATCH",
        body: finalJsonBody,
        headers: {
          "Content-type": "application/json",
        },
      }
    ).then(() => {
      history.replace("/");
    });
  }

  const context = {
    updates: userUpdate,
    prevUserData: prevUserDataHandler,
    updateMeetup: updateMeetupHandler,
  };

  return (
    <UpdateMeetupContext.Provider value={context}>
      {props.children}
    </UpdateMeetupContext.Provider>
  );
}

export default UpdateMeetupContext;
