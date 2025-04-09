// import { Label, TextInput } from "flowbite-react";
import style from "./style.module.scss"
// import { useSelector } from "react-redux";
// import { RootState } from "@/redux/store";
const InfoAccount = () => {

  return (
    <div className={style.infoAccount}>
      <h1>Account Detail</h1>
      {/* <div>
        <div className="mb-2 block">
          <Label htmlFor="email1" value="Your email" />
        </div>
        <TextInput
          id="email1"
          type="email"
          placeholder="name@flowbite.com"
          value={user?.email}
          required
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="username" value="User Name" />
        </div>
        <TextInput
          id="username"
          type="username"
          disabled
          value={user?.username}

          placeholder="name@flowbite.com"
          required
        />
      </div> */}
    </div>
  );
};

export default InfoAccount;
