import React, { useState, useEffect } from "react";
import axios from "axios";
import Signedin_Header from "../partials/signedin_header";
import Sidebar from "../partials/Sidebar";
import Footer from "../partials/Footer";
import MainContent from "../partials/MainContent";

function Signedin_Home() {
  const [mainContent, setMainContent] = useState("Home");
  const [userData, setUserData] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:3000/api/v1/users/userData",
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
          setUserData(response.data.data.user);
        } else {
          alert("Something went wrong");
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          alert("Session Expired! Please login again.");
          window.localStorage.clear();
          window.location.href = "./SignIn";
        } else {
          console.error("Error fetching user data:", error);
          alert("Something went wrong");
        }
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Signedin_Header userData={userData} />
      <div className="flex flex-1">
        <Sidebar setMainContent={setMainContent} />
        <MainContent content={mainContent} />
      </div>
      <Footer />
    </div>
  );
}

export default Signedin_Home;
