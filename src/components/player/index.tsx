import { useState, useRef, useEffect } from "react";
import { useAppContext } from "../../context";
import Seekbar from "../seekbar";
import Button from "../button";
import Timer from "../timer";
import styles from "./styles.module.scss";

const Player: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const {
    state: { comments, activeComment, playerRef, playerState },
    dispatch,
  } = useAppContext();

  const handleLoadedMetaData = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const videoCurrentTime = Math.floor(videoRef.current.currentTime);
      setCurrentTime(videoCurrentTime);

      const foundComment = comments.filter(
        (comment) => comment.timestamp === videoCurrentTime
      );
      if (foundComment.length) {
        dispatch({ type: "SET_ACTIVE_COMMENT", payload: foundComment });
      } else if (!foundComment.length && activeComment) {
        dispatch({ type: "SET_ACTIVE_COMMENT", payload: null });
      }
    }
  };

  const handleSeek = (time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const handleEndVideo = () => {
    dispatch({ type: "SET_PLAYER_STATE", payload: "paused" });
  };

  useEffect(() => {
    if (!playerRef) {
      dispatch({ type: "SET_PLAYER_REF", payload: videoRef.current });
    }
  }, []);

  useEffect(() => {
    if (playerRef) {
      playerState === "playing" ? playerRef.play() : playerRef.pause();
    }
  }, [dispatch, playerRef, playerState, videoRef]);

  return (
    <div className={styles["player-wrapper"]}>
      <video
        ref={videoRef}
        onLoadedMetadata={handleLoadedMetaData}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEndVideo}
      >
        <source src="/file.mp4" type="video/mp4" />
      </video>

      <div className={styles["controls-section"]}>
        <div className={styles["button-wrapper"]}>
          <Button />
        </div>
        <Seekbar
          currentTime={currentTime}
          duration={duration}
          onSeek={handleSeek}
        />
        <Timer currentTime={currentTime} duration={duration} />
      </div>
    </div>
  );
};

export default Player;
