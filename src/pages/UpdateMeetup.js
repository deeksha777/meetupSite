import { useContext } from "react";
import UpdateMeetupForm from "../components/meetups/UpdateMeetupForm";
import UpdateMeetupContext from "../store/updateMeetup-context";

function UpdateMeetupPage(props) {
  const updateCtx = useContext(UpdateMeetupContext);
  let content;

  content = (
    <UpdateMeetupForm
      meetups={updateCtx.updates}
      onUpdateMeetup={updateCtx.updateMeetup}
    />
  );

  return (
    <section>
      <h1> Update Meetup </h1>
      {content}
    </section>
  );
}

export default UpdateMeetupPage;
