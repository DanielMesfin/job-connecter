import React from "react";
import { Outlet } from "react-router-dom";
export default function Layout() {
  return (
    <div>
      <Header />
      <NavBar />
      <div>{<Outlet/>}</div>
    </div>
  );
}
