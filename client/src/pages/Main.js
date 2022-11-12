import React, { useEffect, useState } from "react";
import Axios from "axios";

import Standard from "../components/Standard";
import Admin from "../components/Admin";

export default function Main() {
  const [role, setRole] = useState("");

  Axios.defaults.withCredentials = true;
  useEffect(() => {
    Axios.get("http://localhost:8000/login").then((response) => {
      if (response.data.loggedIn == true) {
        setRole(response.data.user[0].role);
      }
    });
  }, []);

  return (
    <div>
      {role == "1" && <Standard />}
      {role == "2" && <Admin />}
    </div>
  );
}