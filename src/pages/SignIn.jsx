import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../partials/Header";
import Banner from "../partials/Banner";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(email, password);
      const userData = {
        email: email,
        password: password,
      };
      const response = await axios.post(
        "http://127.0.0.1:3000/api/v1/users/login",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      if (response.status === 200) {
        window.localStorage.setItem(
          "token",
          JSON.stringify(response.data.data.token)
        );
        if (keepLoggedIn) {
          window.localStorage.setItem("loggedIn", true);
        }
        window.location.href = "./Signedin_home";
      } else {
        alert("Something went wrong during signin!");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("Invalid email or password!");
      } else {
        console.error("Error during signin:", error);
        alert("Something went wrong");
      }
    }
  };
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Site header */}
      <Header />

      {/* Page content */}
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl px-4 mx-auto sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* Page header */}
              <div className="max-w-3xl pb-12 mx-auto text-center md:pb-20">
                <h1 className="h1">Welcome back!</h1>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-wrap mb-4 -mx-3">
                    <div className="w-full px-3">
                      <label
                        className="block mb-1 text-sm font-medium text-gray-800"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="w-full text-gray-800 form-input"
                        placeholder="Enter your email address"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap mb-4 -mx-3">
                    <div className="w-full px-3">
                      <label
                        className="block mb-1 text-sm font-medium text-gray-800"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <input
                        id="password"
                        type="password"
                        className="w-full text-gray-800 form-input"
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap mb-4 -mx-3">
                    <div className="w-full px-3">
                      <div className="flex justify-between">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            className="form-checkbox"
                            checked={keepLoggedIn}
                            onChange={(e) => setKeepLoggedIn(e.target.checked)}
                          />
                          <span className="ml-2 text-gray-600">
                            Keep me signed in
                          </span>
                        </label>
                        <Link
                          to="/reset-password"
                          className="text-sm font-medium text-blue-600 hover:underline"
                        >
                          Forgot Password?
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap mt-6 -mx-3">
                    <div className="w-full px-3">
                      <Link to="/signup"></Link>
                      <button
                        className="w-full text-white bg-blue-600 btn hover:bg-blue-700"
                        type="submit"
                      >
                        Sign in
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default SignIn;
