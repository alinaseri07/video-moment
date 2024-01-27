import { useRef, useState } from "react";
import { useAppContext } from "../../context";
import Modal from "../modal";
import formatTime from "../../utils/formatTime";
import styles from "./styles.module.scss";

const Comments: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const playerCurrentTime = useRef(0);
  const {
    state: { activeComment, playerRef },
    dispatch,
  } = useAppContext();

  const play = () => dispatch({ type: "SET_PLAYER_STATE", payload: "playing" });
  const pause = () => dispatch({ type: "SET_PLAYER_STATE", payload: "paused" });

  const handleShowModal = () => {
    pause();
    playerCurrentTime.current = Math.floor(playerRef?.currentTime || 0);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    play();
  };

  const handleSubmitComment = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      timestamp: playerCurrentTime.current,
      text: formData.get("comment") as string,
    };
    dispatch({ type: "ADD_COMMENT", payload: data });
    handleCloseModal();
  };

  return (
    <div>
      <div className={styles["comments-wrapper"]}>
        <p className={styles["title"]}>Moment Quotes</p>
        {activeComment?.map((comment) => (
          <div key={comment.id} className={styles["comment"]}>
            {formatTime(comment.timestamp)} - {comment.text}
          </div>
        ))}
      </div>

      <button
        className={styles["add-comment-button"]}
        onClick={handleShowModal}
      >
        Add Your Quote
      </button>

      <Modal onClose={handleCloseModal} show={showModal}>
        <form
          onSubmit={handleSubmitComment}
          className={styles["form-container"]}
        >
          <input name="comment" type="text" placeholder="Enter your quote" />
          <button type="submit">Submit</button>
        </form>
      </Modal>
    </div>
  );
};

export default Comments;
