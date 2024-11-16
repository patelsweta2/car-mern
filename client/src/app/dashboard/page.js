"use client";

import { useRouter } from "next/router";
import { useEffect } from "react";

const page = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/dashboard/home");
  }, []);
  return <div>This is dashboard page</div>;
};

export default page;
