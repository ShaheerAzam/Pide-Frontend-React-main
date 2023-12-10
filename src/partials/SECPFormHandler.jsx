import React, { useState, useEffect } from "react";
import axios from "axios";

import SECPData from "./SECPData";
import SECPForm from "./SECPForm";

function SECPFormHandler() {
  const [secpData, setSecpData] = useState("");

  useEffect(() => {
    const fetchSECPDocs = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:3000/api/v1/pideReg/secp/docs/",
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
          setSecpData(response.data.data.secpDocuments);
        } else {
          alert("Something went wrong");
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          alert("Session Expired! Please login again.");
          window.localStorage.clear();
          window.location.href = "./SignIn";
        } else if (error.response && error.response.status === 404) {
          setSecpData("");
        } else {
          console.error("Error fetching SECP docs:", error);
          alert("Something went wrong!");
        }
      }
    };
    fetchSECPDocs();
  }, []);

  return secpData === "" ? <SECPForm /> : <SECPData secpData={secpData} />;
}

export default SECPFormHandler;
