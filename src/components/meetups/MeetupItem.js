import { useContext, useState } from "react";
import classes from "./MeetupItem.module.css";
import Card from "../ui/Card";
import FavoritesContext from "../../store/favorites-context";
import DeleteContext from "../../store/deleteItem-context";
import UpdateMeetupContext from "../../store/updateMeetup-context";
import { useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faPenSquare,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

import { IconButton } from "@material-ui/core";

function MeetupItem(props) {
  const favoritesCtx = useContext(FavoritesContext);
  const itemIsFavaorite = favoritesCtx.itemIsFavaorite(props.id);
  const deleteCtx = useContext(DeleteContext);
  const updateCtx = useContext(UpdateMeetupContext);
  const history = useHistory();
  const [show, setShow] = useState(false);

  function toggleFavoriteStatusHandler() {
    if (itemIsFavaorite) {
      favoritesCtx.removeFavorite(props.id);
    } else {
      favoritesCtx.addFavorite({
        id: props.id,
        title: props.title,
        description: props.description,
        image: props.image,
        address: props.address,
      });
    }
    console.log("content::", favoritesCtx.favorites);
  }

  function deleteHandler() {
    const newData = deleteCtx.deleteItem(props.id);
    deleteCtx.updatePageAfterDelete(newData);
  }

  function handleUpdateLink() {
    updateCtx.prevUserData({
      id: props.id,
      title: props.title,
      description: props.description,
      image: props.image,
      address: props.address,
    });
    history.push("/update-meetup/" + props.id);
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} onClick={handleShow}></img>
        </div>

        <Modal
          show={show}
          onHide={handleClose}
          dialogClassName="modal-90w"
          aria-labelledby="modal-styling"
          centered
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Title id="modal-styling"></Modal.Title>
          <Modal.Body style={{ backgroundColor: "#b5e2b0" }}>
            <div className={classes.image}>
              <img src={props.image} alt={props.title}></img>
            </div>
            <div className={classes.content}>
              <h3> {props.title} </h3>
              <address>{props.address}</address>
              <p>{props.description}</p>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItem: "center",
              }}
            >
              <IconButton
                aria-label="favorite"
                onClick={toggleFavoriteStatusHandler}
              >
                {itemIsFavaorite ? (
                  <FontAwesomeIcon
                    icon={faHeart}
                    style={{
                      fontSize: "20px",
                      color: "red",
                    }}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faHeart}
                    style={{
                      fontSize: "20px",
                      color: "white",
                    }}
                  />
                )}
              </IconButton>
              <IconButton aria-label="edit" onClick={handleUpdateLink}>
                <FontAwesomeIcon
                  icon={faPenSquare}
                  style={{ fontSize: "25px", color: "blue" }}
                />
              </IconButton>

              <IconButton aria-label="delete" onClick={deleteHandler}>
                <FontAwesomeIcon
                  icon={faTrash}
                  style={{ fontSize: "25px", color: "black" }}
                />
              </IconButton>
            </div>
          </Modal.Body>
        </Modal>

        <div className={classes.content}>
          <h3> {props.title} </h3>
          <address>{props.address}</address>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItem: "center",
          }}
        >
          <IconButton
            aria-label="favorite"
            onClick={toggleFavoriteStatusHandler}
          >
            {itemIsFavaorite ? (
              <FontAwesomeIcon
                icon={faHeart}
                style={{ fontSize: "20px", color: "red" }}
              />
            ) : (
              <FontAwesomeIcon
                icon={faHeart}
                style={{
                  fontSize: "20px",
                  color: "white",
                }}
              />
            )}
          </IconButton>
          <IconButton aria-label="edit" onClick={handleUpdateLink}>
            <FontAwesomeIcon
              icon={faPenSquare}
              style={{ fontSize: "25px", color: "blue" }}
            />
          </IconButton>

          <IconButton aria-label="delete" onClick={deleteHandler}>
            <FontAwesomeIcon
              icon={faTrash}
              style={{ fontSize: "25px", color: "black" }}
            />
          </IconButton>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
