"use client";
import { actives } from "./Auth";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, SignInAction } from "@/store/slices/userSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

const SignIn = ({ setActive }) => {
  const user = useSelector((state) => state.user.value);
  const userNameRef = useRef(null);
  const passRef = useRef(null);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/dashboard/home");
  }, [user]);
  //handleSignIn
  const handleSignIn = (e) => {
    e.preventDefault();
    if (Cookies.get("token") && Cookies.get("user")) {
      toast.success("Login Successfully");
      return router.push("/dashboard");
    } else {
      const userName = userNameRef.current.value;
      const password = passRef.current.value;
      if (!userName) return window.alert("Please Enter userName To SignIn");
      else if (!password)
        return window.alert("Please Enter Password To SignIn");
      dispatch(SignInAction({ userName, password }));
    }
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
            Sign in to access your account
          </p>
        </div>

        <div className="mt-8">
          <form>
            <div>
              <label
                htmlFor="userName"
                className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
              >
                User Name
              </label>
              <input
                type="text"
                ref={userNameRef}
                name="userName"
                id="userName"
                placeholder="User@123"
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-red-400 dark:focus:border-red-400 focus:ring-red-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mt-6">
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
                name="password"
                id="password"
                placeholder="Your Password"
                className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-red-400 dark:focus:border-red-400 focus:ring-red-400 focus:outline-none focus:ring focus:ring-opacity-40"
              />
            </div>

            <div className="mt-6">
              <button
                onClick={handleSignIn}
                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-red-500 rounded-lg hover:bg-red-400 focus:outline-none focus:bg-red-400 focus:ring focus:ring-red-300 focus:ring-opacity-50"
              >
                Sign in
              </button>
            </div>
          </form>

          <div className="mt-6 text-sm text-center text-gray-400">
            Don&#x27;t have an account yet?{" "}
            <p
              onClick={() => setActive(actives.SIGNUP)}
              className="text-blue-500 focus:outline-none focus:underline hover:underline cursor-pointer"
            >
              Sign up
            </p>
            .
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
