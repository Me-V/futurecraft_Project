import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import Dashboard from "./components/Dashboard";

export default async function page() {
  const user = await currentUser();

  if (!user) console.log("No user detected");

  return <Dashboard name={user?.fullName} />
}
