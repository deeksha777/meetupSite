import { useContext } from "react";
import UpdateMeetupForm from "../components/meetups/UpdateMeetupForm";
import UpdateMeetupContext from "../store/updateMeetup-context";
import { Helmet } from "react-helmet";

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
      <Helmet>
        <title>Edit Meetups</title>
        <meta name="description" content="Edit the details of Meetups." />
      </Helmet>
      <h1> Update Meetup </h1>
      {content}
    </section>
  );
}

export default UpdateMeetupPage;
