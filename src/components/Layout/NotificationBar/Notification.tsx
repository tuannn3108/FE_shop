import style from "./style.module.scss";

const Notification = () => {
  return (
    <div className={style.NotificationBar}>
      <p>30% off storewide — Limited time! </p>
        <span>Shop now</span>
    </div>
  );
};

export default Notification;
