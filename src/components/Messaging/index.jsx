import React from "react";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import style from "../../style.scss";

const Messaging = () => {
  return (
    <div className="home">
      <div className="containerchat">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Messaging;
