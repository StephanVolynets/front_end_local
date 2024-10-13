"use client";

import styles from "./GoogleButton.module.css";

import { useTranslation } from "react-i18next";
import { supabase } from "@/lib/supabaseClient";
import GoogleIcon from "@/components/icons/googleIcon";
import { useState, useEffect } from "react";
import posthog from "posthog-js";

const GoogleButton = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState(null);

  const authenticateWithOAuth = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Error logging out:", error);
    } else {
      console.log("User logged out successfully");
      setUser(null);
      window.location.reload();
    }
  };

  useEffect(() => {
    const checkAuthState = async () => {
      if (user) return;
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
              // Check if the user already exists in the database
              // const { data: existingUser, error: fetchError } = await supabase
              //   .from("users")
              //   .select()
              //   .eq("email", user.email)
              //   .single();

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

              // Only insert if the user doesn't exist
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
          }
        } catch (error) {
          console.error("Error in auth state change:", error);
        }
      }
    );

    // Cleanup function
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [user]);

  console.log("user", user);

  return (
    <button
      onClick={authenticateWithOAuth}
      className={styles.googleButton}
      type="button"
    >
      {user ? (
        <button onClick={handleLogout}>Logout</button>
      ) : (
        <>
          <GoogleIcon className={styles.googleIcon} aria-hidden="true" />
          <span>{t("login-google")}</span>
        </>
      )}
    </button>
  );
};

export default GoogleButton;
