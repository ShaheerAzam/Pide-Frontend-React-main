import React, { useState, useEffect } from "react";
import axios from "axios";

import PSEBData from "./PSEBData";
import PSEBForm from "./PSEBForm";

function PSEBFormHandler() {
  const [psebData, setPsebData] = useState("");

  useEffect(() => {
    const fetchPSEBDocs = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:3000/api/v1/pideReg/pseb/docs/",
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              "Access-Control-Allow-Origin": "*",
              Authorization: `Bearer ${JSON.parse(
                window.localStorage.getItem("token")
              )}`,
            },
          }
        );

        if (response.status === 200) {
          setPsebData(response.data.data.psebDocuments);
        } else {
          alert("Something went wrong");
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          alert("Session Expired! Please login again.");
          window.localStorage.clear();
          window.location.href = "./SignIn";
        } else if (error.response && error.response.status === 404) {
          setPsebData("");
        } else {
          console.error("Error fetching PSEB docs:", error);
          alert("Something went wrong!");
        }
      }
    };
    fetchPSEBDocs();
  }, []);

  return psebData === "" ? <PSEBForm /> : <PSEBData psebData={psebData} />;
}

export default PSEBFormHandler;
