import React, { useRef } from "react";
import styles from "./styles.module.scss";
import { useAppContext } from "../../context";

type SeekbarProps = {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
};

const Seekbar: React.FC<SeekbarProps> = ({ currentTime, duration, onSeek }) => {
  const seekBarRef = useRef<HTMLInputElement>(null);
  const {
    state: { comments },
  } = useAppContext();

  const calculateMarkerPosition = (timestamp: number) => {
    if (seekBarRef.current) {
      const value = (timestamp / duration) * 100;
      return `${value}%`;
    }
    return "0%";
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onSeek(Number(event.target.value));
  };

  return (
    <div className={styles["seekbar-container"]}>
      <div className={styles["markers-wrapper"]}>
        {comments.map((comment) => (
          <button
            key={comment.id}
            className={styles["marker"]}
            onClick={() => onSeek(comment.timestamp)}
            style={{
              left: calculateMarkerPosition(comment.timestamp),
            }}
            data-comment={comment.text}
          />
        ))}
      </div>
      <input
        ref={seekBarRef}
        className={styles["slider"]}
        type="range"
        min="0"
        max={Math.floor(duration)}
        value={currentTime}
        onChange={handleChange}
      />
    </div>
  );
};

export default Seekbar;
