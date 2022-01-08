import React, { useContext } from "react";
import TopNavbar from "../../components/TopNavbar";
import { Context } from "../../context/Context";
import AdminDashboard from "./AdminDashboard";

function Admin() {
  const { user } = useContext(Context);
  let permission = false;
  if (user.user) {
    if (user.user.name === "admin") {
      permission = true;
    }
  }

  return (
    <>
      <TopNavbar />
      {permission ? (
        <div>
          <AdminDashboard />
        </div>
      ) : (
        <div className="d-flex justify-content-center align-items-center">
          <h2>Only Admin view this page</h2>
        </div>
      )}
    </>
  );
}

export default Admin;
