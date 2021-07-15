import classes from "./UpdateMeetupForm.module.css";
import Card from "../ui/Card";
import { useRef } from "react";

function UpdateMeetupForm(props) {
  const titleInputRef = useRef(props.meetups.title);
  const imageInputRef = useRef(props.meetups.image);
  const addressInputRef = useRef(props.meetups.address);
  const descriptionInputRef = useRef(props.meetups.description);

  //console.log(`titleInputRef:: ${titleInputRef.current}`);

  function submitHandler(event) {
    event.preventDefault();
    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredAddress = addressInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const meetupData = {
      title: enteredTitle,
      image: enteredImage,
      address: enteredAddress,
      description: enteredDescription,
    };
    props.onUpdateMeetup(meetupData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor="title">Meetup Title</label>
          <input
            type="text"
            required
            id="title"
            ref={titleInputRef}
            defaultValue={titleInputRef.current}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="image">Meetup Image</label>
          <input
            type="url"
            required
            id="image"
            ref={imageInputRef}
            defaultValue={imageInputRef.current}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            required
            id="address"
            ref={addressInputRef}
            defaultValue={addressInputRef.current}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            required
            rows="5"
            ref={descriptionInputRef}
            defaultValue={descriptionInputRef.current}
          />
        </div>
        <div className={classes.actions}>
          <button>Update Meetup</button>
        </div>
      </form>
    </Card>
  );
}

export default UpdateMeetupForm;
