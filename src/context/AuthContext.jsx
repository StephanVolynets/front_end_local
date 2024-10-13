import React, { createContext, useState, useEffect, useContext } from "react";
import { supabase } from "@/lib/supabaseClient";
import axios from "axios";
import posthog from "posthog-js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuthState = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    checkAuthState();

    posthog.identify(user?.email, {
      email: user?.email,
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        try {
          if (event === "SIGNED_IN") {
            const user = session?.user;
            if (user) {
              const existingUser = await axios.get(
                `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/user-with-email?email=${user.email}`,
                {
                  headers: {
                    "Content-Type": "application/json",
                    "x-api-key": process.env.NEXT_PUBLIC_BACKEND_API_KEY,
                  },
                }
              );

              if (
                existingUser.status &&
                Math.floor(existingUser.status / 100) !== 2
              ) {
                console.error("Error checking existing user:", existingUser);
                return;
              }
              console.log("existingUser", existingUser);

              if (!existingUser.data) {
                const insertUserResponse = await axios.post(
                  `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/user-with-email`,
                  {
                    email: user.email,
                    username: user.user_metadata.full_name,
                    created_at: new Date().toISOString(),
                    googleId: user.id,
                  },
                  {
                    headers: {
                      "Content-Type": "application/json",
                      "x-api-key": process.env.NEXT_PUBLIC_BACKEND_API_KEY,
                    },
                  }
                );
                console.log("insertUserResponse", insertUserResponse);
                if (
                  insertUserResponse.status &&
                  Math.floor(insertUserResponse.status / 100) !== 2
                ) {
                  console.error(
                    "Error inserting new user:",
                    insertUserResponse
                  );
                } else {
                  console.log("New user added to the users table");
                }
              }
            }
            setUser(user);
          } else if (event === "SIGNED_OUT") {
            setUser(null);
          }
        } catch (error) {
          console.error("Error in auth state change:", error);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
