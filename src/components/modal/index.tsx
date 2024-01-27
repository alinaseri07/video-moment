import styles from "./styles.module.scss";

type ModalProps = {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Modal: React.FC<ModalProps> = ({ show, onClose, children }) => {
  if (!show) {
    return null;
  }

  return (
    <div className={styles["modal"]}>
      <div className={styles["modal-container"]}>
        <button className={styles["modal-close"]} onClick={onClose}>
          X
        </button>
        <div className={styles["modal-content"]}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
