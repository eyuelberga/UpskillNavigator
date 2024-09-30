'use client'
import React, { useContext } from "react";
import Onboarding from "./Onboarding";
import Dashboard from "./Dashboard";
import { AppContext } from "./AppContext";

export default function App() {
  const app = useContext(AppContext);
  return (
    <>
    {app.data.learning_path?.title ? <Dashboard /> : <Onboarding />}
    </>
  );
};
