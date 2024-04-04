import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import useUser from "./hook/useUser";
import Sidebar from "./components/Sidebar/Sidebar";
import Content from "./components/Content/Content";
function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await useUser();
        setUser(userData);
      } catch (error) {
        console.error("Error while fetching user:", error);
      }
    };

    fetchUser();
  }, []);
  return (
    <div>
      <Navbar user={user} />
      <div className="flex mt-16">
        <div className="w-1/6 bg-red-900">
          <Sidebar />
        </div>
        <div className="w-5/6 bg-slate-900">
          <Content />
        </div>
      </div>
    </div>
  );
}

export default App;
