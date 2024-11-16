"use client";

import React, { useMemo, useState } from "react";

import SignIn from "./SignIn";
import SignUp from "./SignUp";

export const actives = {
  SIGNIN: "SIGNIN",
  SIGNUP: "SIGNUP",
};

const AuthComponent = () => {
  const [active, setActive] = useState(actives.SIGNIN);

  const ComponentObj = useMemo(() => {
    return {
      SIGNUP: <SignUp setActive={setActive} />,
      SIGNIN: <SignIn setActive={setActive} />,
    };
  }, [active]);
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="flex justify-center h-screen">
        <div
          className="hidden bg-cover lg:block lg:w-2/3"
          style={{
            backgroundImage:
              "url(https://imgcdn.zigwheels.us/medium/gallery/exterior/13/234/audi-s4-sedan-91068.jpg)",
          }}
        >
          <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
            <div>
              <h2 className="text-2xl font-bold text-white sm:text-3xl">
                CARYANAMS
              </h2>

              <p className="max-w-2xl mt-3 text-gray-200">
                "The Fastest Way to Find, Buy, and Manage Your Car Products:
                We’ve made it simple for you to add, update, or sell your car
                products, all from one user-friendly platform. Start today and
                make managing your ride a breeze."
              </p>
            </div>
          </div>
        </div>
        {ComponentObj[active]}
      </div>
    </div>
  );
};

export default AuthComponent;
