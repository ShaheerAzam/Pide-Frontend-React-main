import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../partials/Header";
import Banner from "../partials/Banner";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(name, email, password);
      const userData = {
        name: name,
        email: email,
        password: password,
      };
      const response = await axios.post(
        "http://127.0.0.1:3000/api/v1/users/signup",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      if (response.status === 201) {
        window.location.href = "./SignIn";
      } else {
        alert("Something went wrong during registering user");
      }
    } catch (error) {
      if (error.response && error.response.status === 404) {
        alert("User already exists!");
      } else {
        console.error("Error during registration:", error);
        alert("Something went wrong");
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/*  Site header */}
      <Header />

      {/*  Page content */}
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl px-4 mx-auto sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* Page header */}
              <div className="max-w-3xl pb-12 mx-auto text-center md:pb-20">
                <h1 className="h1">
                  Welcome. We exist to make software house registeration easier.
                </h1>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-wrap mb-4 -mx-3">
                    <div className="w-full px-3">
                      <label
                        className="block mb-1 text-sm font-medium text-gray-800"
                        htmlFor="name"
                      >
                        Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        className="w-full text-gray-800 form-input"
                        placeholder="Enter your name"
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap mb-4 -mx-3">
                    <div className="w-full px-3">
                      <label
                        className="block mb-1 text-sm font-medium text-gray-800"
                        htmlFor="email"
                      >
                        Email <span className="text-red-600">*</span>
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
                        Password <span className="text-red-600">*</span>
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
                  <div className="flex flex-wrap mt-6 -mx-3">
                    <div className="w-full px-3">
                      <button className="w-full text-white bg-blue-600 btn hover:bg-blue-700">
                        Sign up
                      </button>
                    </div>
                  </div>
                  <div className="mt-3 text-sm text-center text-gray-500">
                    By creating an account, you agree to the{" "}
                    <a className="underline" href="#0">
                      terms & conditions
                    </a>
                    , and our{" "}
                    <a className="underline" href="#0">
                      privacy policy
                    </a>
                    .
                  </div>
                </form>
                <div className="flex items-center my-6">
                  <div
                    className="flex-grow mr-3 border-t border-gray-300"
                    aria-hidden="true"
                  ></div>
                  <div className="italic text-gray-600">Or</div>
                  <div
                    className="flex-grow ml-3 border-t border-gray-300"
                    aria-hidden="true"
                  ></div>
                </div>

                <div className="mt-6 text-center text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/signin"
                    className="text-blue-600 transition duration-150 ease-in-out hover:underline"
                  >
                    Sign in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default SignUp;
