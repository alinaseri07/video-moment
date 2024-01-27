import Player from "../../components/player";
import Comments from "../../components/comments";
import styles from "./styles.module.scss";

function Home() {
  return (
    <div className={styles["container"]}>
      <Player />
      <Comments />
    </div>
  );
}

export default Home;
