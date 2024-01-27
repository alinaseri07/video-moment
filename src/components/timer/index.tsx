import formatTime from "../../utils/formatTime";
import styles from "./styles.module.scss";

type TimerProps = {
  currentTime: number;
  duration: number;
};

const Timer: React.FC<TimerProps> = ({ currentTime, duration }) => {
  const formattedCurrentTime = formatTime(currentTime);
  const formattedDuration = formatTime(duration);
  return (
    <div className={styles["timer-wrapper"]}>
      {formattedCurrentTime} / {formattedDuration}
    </div>
  );
};

export default Timer;
