import { useEffect } from "react";
import { useState } from "react";
export default function LogoutPage() {
  useEffect(() => {
    const Logout = async () => {
      try {
        await fetch("http://localhost:8080/logout", {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });
        localStorage.removeItem("token");
      } catch (error) {
        setMessage("Failed to log out, Error " + error);
      }
    };
    Logout();
  }, []);
  const [message, setMessage] = useState("Successfully logged out");
  return (
    <div className="logout-message">
      <h1>{message}</h1>
    </div>
  );
}
