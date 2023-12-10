import React, { useState } from "react";
import Header from "../partials/Header";
import Banner from "../partials/Banner";
import axios from "axios";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false); // State to track sending status

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsSending(true); // Set sending status to true when form is submitted

      const userData = {
        email: email,
      };
      const response = await axios.post(
        "http://127.0.0.1:3000/api/v1/users/forgotPassword",
        userData,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );

      if (response.status === 200 && response.data.status === "success") {
        window.location.href = "./SignIn";
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Something went wrong");
    } finally {
      setIsSending(false); // Reset sending status regardless of success/failure
    }
  };

  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {/* Site header */}
      <Header />

      {/* Page content */}
      <main className="flex-grow">
        <section className="bg-gradient-to-b from-gray-100 to-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="pt-32 pb-12 md:pt-40 md:pb-20">
              {/* Page header */}
              <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
                <h1 className="h1 mb-4">Let’s get you back up on your feet</h1>
                <p className="text-xl text-gray-600">
                  Enter the email address you used when you signed up for your
                  account, and we’ll email you a link to reset your password.
                </p>
              </div>

              {/* Form */}
              <div className="max-w-sm mx-auto">
                <form onSubmit={handleSubmit}>
                  <div className="flex flex-wrap -mx-3 mb-4">
                    <div className="w-full px-3">
                      <label
                        className="block text-gray-800 text-sm font-medium mb-1"
                        htmlFor="email"
                      >
                        Email <span className="text-red-600">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="form-input w-full text-gray-800"
                        placeholder="Enter your email address"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                      <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">
                        {isSending ? "Sending reset link..." : "Send reset link"}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Banner />
    </div>
  );
}

export default ResetPassword;
