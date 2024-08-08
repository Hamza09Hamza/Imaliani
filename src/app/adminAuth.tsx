"use client";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { auth } from "../Firebase/Initialisation";
import { getUserRole } from "@/Firebase/Utils";

const TIMEOUT_DURATION = 5000; // Timeout duration in milliseconds (5 seconds)

export default function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const [loading, setLoading] = useState(true);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
      let timeoutId: NodeJS.Timeout;
      
      const checkAuthState = () => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
          if (user) {
            if(await getUserRole(user.uid)=="admin"){
              setAuthorized(true);
            }else{
            setAuthorized(false);
            }
          } else {
            // User is not signed in
            setAuthorized(false);
          }
          setLoading(false); // Stop loading state after auth check
        });

        // Set up a timeout to handle cases where auth state might not resolve
        timeoutId = setTimeout(() => {
          if (loading) {
            console.warn('Authentication check timed out.');
            setLoading(false); // Stop loading state if timeout occurs
          }
        }, TIMEOUT_DURATION);

        // Clean up the listener and timeout on component unmount
        return () => {
          clearTimeout(timeoutId);
          unsubscribe();
        };
      };

      checkAuthState();

    }, []);

    if (loading) {
      // Show a loading state or spinner while Firebase Auth is determining the state
      return <div>Loading...</div>;
    }

    if (!authorized) {
      // Redirect if the user is not authorized
      redirect("/");
      return null; // Return null to prevent rendering the protected component
    }

    // Render the protected component if the user is authorized
    return <Component {...props} />;
  };
}
