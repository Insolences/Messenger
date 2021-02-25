import React from "react";
import ReactDOM from "react-dom";
import classes from "./Notification.module.scss";
const notification = document.getElementById("notification");

export const Notification = ({ message, handleClose }) => {
  const renderNotification = () => {
    return (
      <>
        <div className={classes.shadow} onClick={handleClose} />
        <div className={classes.modalWrapper}>
          <div className={classes.modal}>
            <div className={classes.content}>
              <button
                type="button"
                className={classes.closeButton}
                onClick={handleClose}
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <h4>Massage:</h4>
              <p>{message}</p>
            </div>
          </div>
        </div>
      </>
    );
  };

  return ReactDOM.createPortal(renderNotification(), notification);
};
