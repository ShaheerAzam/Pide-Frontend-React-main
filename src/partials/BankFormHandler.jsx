import React, { useState, useEffect } from "react";
import axios from "axios";

import BankData from "./BankData";
import BankForm from "./BankForm";

function BankFormHandler() {
  const [bankData, setBankData] = useState("");

  useEffect(() => {
    const fetchBankDocs = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:3000/api/v1/pideReg/bank/docs/",
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
          setBankData(response.data.data.bankDocuments);
        } else {
          alert("Something went wrong");
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          alert("Session Expired! Please login again.");
          window.localStorage.clear();
          window.location.href = "./SignIn";
        } else if (error.response && error.response.status === 404) {
          setBankData("");
        } else {
          console.error("Error fetching bank docs:", error);
          alert("Something went wrong!");
        }
      }
    };
    fetchBankDocs();
  }, []);

  return bankData === "" ? <BankForm /> : <BankData bankData={bankData} />;
}

export default BankFormHandler;
