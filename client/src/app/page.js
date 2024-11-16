"use client";

import AuthComponent from "@/components/Auth";
import Navbar from "@/components/Navbar";
import { Suspense } from "react";
import Cookies from "js-cookie";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const HomePage = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyComponent />
    </Suspense>
  );
};

const MyComponent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    if (Cookies.get("token") && Cookies.get("user")) {
      router.push("/dashboard/home");
    }
    const user = searchParams.get("user");
    const token = searchParams.get("token");
    if (token && user) {
      Cookies.set("token", token);
      Cookies.set("user", user);
      console.log("Token set:", token);
      setTimeout(() => {
        router.push("/dashboard/home");
      }, 500);
    }
  }, [searchParams, router]);
  return (
    <div className="h-[100vh] bg-base-300">
      <Navbar />
      <AuthComponent />
    </div>
  );
};

export default HomePage;
