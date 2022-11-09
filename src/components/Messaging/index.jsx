import React from "react";
import Sidebar from "./Sidebar";
import Chat from "./Chat";

const Messaging = () => {
  return (
    <div className="home">
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Messaging;
