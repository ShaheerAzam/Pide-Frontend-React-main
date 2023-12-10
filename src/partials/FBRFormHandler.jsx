import React, { useState, useEffect } from "react";
import axios from "axios";

import FBRData from "./FBRData";
import FBRForm from "./FBRForm";

function FBRFormHandler() {
  const [fbrData, setFbrData] = useState("");

  useEffect(() => {
    const fetchFBRDocs = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:3000/api/v1/pideReg/fbr/docs/",
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
          setFbrData(response.data.data.fbrDocuments);
        } else {
          alert("Something went wrong");
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          alert("Session Expired! Please login again.");
          window.localStorage.clear();
          window.location.href = "./SignIn";
        } else if (error.response && error.response.status === 404) {
          setFbrData("");
        } else {
          console.error("Error fetching FBR docs:", error);
          alert("Something went wrong!");
        }
      }
    };
    fetchFBRDocs();
  }, []);

  return fbrData === "" ? <FBRForm /> : <FBRData fbrData={fbrData} />;
}

export default FBRFormHandler;
