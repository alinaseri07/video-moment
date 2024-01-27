import { useRef, useState } from "react";
import { useAppContext } from "../../context";
import Modal from "../modal";
import styles from "./styles.module.scss";
import formatTime from "../../utils/formatTime";

const Comments: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const playerCurrentTime = useRef(0);
  const {
    state: { activeComment, playerRef },
    dispatch,
  } = useAppContext();

  const handleShowModal = () => {
    dispatch({ type: "SET_PLAYER_STATE", payload: "paused" });
    playerCurrentTime.current = Math.floor(playerRef?.currentTime || 0);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    dispatch({ type: "SET_PLAYER_STATE", payload: "playing" });
    setShowModal(false);
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
      {activeComment?.map((comment) => (
        <div key={comment.id}>
          {formatTime(comment.timestamp)} - {comment.text}
        </div>
      ))}

      <button onClick={handleShowModal}>add comment</button>

      <Modal onClose={handleCloseModal} show={showModal}>
        <form
          onSubmit={handleSubmitComment}
          className={styles["form-container"]}
        >
          <input name="comment" type="text" placeholder="Enter your comment" />
          <button type="submit">Submit</button>
        </form>
      </Modal>
    </div>
  );
};

export default Comments;
