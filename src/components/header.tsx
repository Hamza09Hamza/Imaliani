"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Imiliani from "@/images/imalian.png";
import SearchBar from "./searchbar";
import TableList from "./tablist";
import UserDrop from "./UserDrop";
import { auth } from "@/Firebase/Initialisation";
import { onAuthStateChanged } from "firebase/auth";
import { getUserRole } from "@/Firebase/Utils";

interface ChildComponentProps {
  status: boolean | any;
  categorie: string | null;
  customer: string | any;
  setCategorie: React.Dispatch<React.SetStateAction<string>> | null;
}

const Head: React.FC<ChildComponentProps> = ({
  customer,
  status,
  categorie,
  setCategorie,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);
        if ((await getUserRole(user.uid)) === "admin") {
          setAdmin(true);
        }
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false); // Ensure loading is false after auth state is checked
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Or a better loading indicator
  }

  return (
    <>
      <header
        className={`flex ${
          status ? "justify-around" : "justify-between"
        } flex-row bg-Main w-[100vw] font-roboto items-center py-2`}
      >
        <Image
          onClick={(e) => {
            e.preventDefault();
            window.location.assign("/");
          }}
          src={Imiliani}
          className="lg:max-w-[12rem] mid:max-w-[8rem] xss:max-w-[26%] lg:ml-3 object-contain"
          alt="Imiliani"
        />
        {status && <SearchBar />}
        <div className="flex flex-row w-[20%] items-center justify-around max-h-[90%] mr-5 ">
          <div
            onClick={() =>
              auth.currentUser
                ? window.location.assign("/me/chart")
                : window.location.assign("/signin")
            }
            className={`text-black mid:text-xs xxs:mr-4 xxs:w-full  mid:text-center cursor-pointer font-roboto font-light hover:text-gray-400 duration-500 transition-all  ${
              auth.currentUser ? " mid:hidden" : ""
            }`}
          >
            {auth.currentUser ? "My Chart" : "Sign In"}
          </div>
          <UserDrop admin={admin} user={isAuthenticated} />
        </div>
      </header>
      {status && (
        <div className="flex justify-center w-[100%] border-b-2">
          <TableList setCategorie={setCategorie} categorie={categorie} />
        </div>
      )}
    </>
  );
};

export default Head;
