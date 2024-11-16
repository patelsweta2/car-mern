"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const page = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/dashboard/home");
  }, []);
  return <div>Loading...</div>;
};

export default page;
