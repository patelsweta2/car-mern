"use client";

import { actives } from "./Auth";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { SignUpAction } from "@/store/slices/userSlice";

const SignUp = ({ setActive }) => {
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const userNameRef = useRef(null);
  const passRef = useRef(null);
  const dispatch = useDispatch();

  const handleSignUp = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passRef.current.value;
    const fullName = nameRef.current.value;
    const userName = userNameRef.current.value;
    if (!email) return window.alert("Please enter email to signup");
    else if (!password) return window.alert("Please enter password to signup");
    else if (!fullName) return window.alert("Please enter name to signup");
    else if (!userName) return window.alert("Please enter username to signup");
    dispatch(SignUpAction({ userName, fullName, email, password }));

    // After successful signup, clear all fields
    nameRef.current.value = "";
    emailRef.current.value = "";
    userNameRef.current.value = "";
    passRef.current.value = "";

    setActive(actives.SIGNIN);
  };

  return (
    <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
      <div className="flex-1">
        <div className="text-center">
          <div className="flex justify-center mx-auto">
            <img
              className="w-auto h-7 sm:h-8"
              src="https://caryanams.com/public/assets/images/logo.png"
              alt=""
            />
          </div>

          <p className="mt-3 text-gray-500 dark:text-gray-300">
            Create an account to get started
          </p>
        </div>

        <div className="mt-8">
          <div>
            <label
              htmlFor="fullName"
              className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
            >
              Full Name
            </label>
            <input
              ref={nameRef}
              id="fullName"
              placeholder="full name"
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-red-400 dark:focus:border-red-400 focus:ring-red-400 focus:outline-none focus:ring focus:ring-opacity-40"
              type="text"
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="userName"
              className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
            >
              User Name
            </label>
            <input
              type="text"
              ref={userNameRef}
              id="userName"
              placeholder="User@123"
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-red-400 dark:focus:border-red-400 focus:ring-red-400 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
            >
              Email Address
            </label>
            <input
              type="email"
              ref={emailRef}
              id="email"
              placeholder="example@example.com"
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-red-400 dark:focus:border-red-400 focus:ring-red-400 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="mt-4">
            <div className="flex justify-between mb-2">
              <label
                htmlFor="password"
                className="text-sm text-gray-600 dark:text-gray-200"
              >
                Password
              </label>
            </div>

            <input
              type="password"
              ref={passRef}
              id="password"
              placeholder="Your Password"
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-red-400 dark:focus:border-red-400 focus:ring-red-400 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>

          <div className="mt-6">
            <button
              onClick={handleSignUp}
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-red-500 rounded-lg hover:bg-red-400 focus:outline-none focus:bg-red-400 focus:ring focus:ring-red-300 focus:ring-opacity-50"
            >
              Sign up
            </button>
          </div>

          <div className="mt-6 text-sm text-center text-gray-400">
            Already have an account?{" "}
            <p
              onClick={() => setActive(actives.SIGNIN)}
              className="text-blue-500 focus:outline-none focus:underline hover:underline cursor-pointer"
            >
              Sign in
            </p>
            .
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
