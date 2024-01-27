import { useAppContext } from "../../context";
import styles from "./styles.module.scss";

const Button: React.FC = () => {
  const {
    state: { playerState },
    dispatch,
  } = useAppContext();

  const renderIcon = () => {
    if (playerState === "paused") {
      return <div className={styles["play-icon"]} />;
    }
    return <div className={styles["pause-icon"]} />;
  };

  const play = () => dispatch({ type: "SET_PLAYER_STATE", payload: "playing" });
  const pause = () => dispatch({ type: "SET_PLAYER_STATE", payload: "paused" });

  const handleChangePlayerState = () =>
    playerState === "paused" ? play() : pause();

  return (
    <button className={styles["button"]} onClick={handleChangePlayerState}>
      {renderIcon()}
    </button>
  );
};

export default Button;
