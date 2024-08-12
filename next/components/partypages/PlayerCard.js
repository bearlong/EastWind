import styles from "@/styles/gw/_PlayerCard.module.scss";

export default function PlayerCard() {
  const [playerName, playerImage] = ["Vic Chen", "/images/gw/img/user/周杰倫.jpeg"];
  return (
    <div className={styles.playerCard}>
      <div className={styles.playerImg}>
        <img alt={`${playerName}'s profile`} className="img-fluid" src={playerImage} />
      </div>
      <div className={styles.cardBody}>
        <div className={styles.playerName}>{playerName}</div>
        <div className={styles.playerType}>桌主</div>
      </div>
    </div>
  );
}
