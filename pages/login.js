import React, { useContext, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { auth } from "@/firebase/FirebaseConfig";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";

import { useAuthUserContext } from "@/context/AuthUserContext";
import { useRouter } from "next/router";
import Loader from "@/componnets/Loader";
import Link from "next/link";

const provider = new GoogleAuthProvider();

const LoginForm = () => {
  const { authUser, isLoading, setIsLoading } = useAuthUserContext();

  const [loginform, setLoginform] = useState({
    email: "",
    password: "",
  });

  const formInputChange = (e) => {
    setLoginform((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const signInHandler = async () => {
    setIsLoading(true);

    if (loginform.email == "" || loginform.password == "") return;

    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginform.email,
        loginform.password
      );

      console.log("login page", authUser);
    } catch (error) {
      console.log("An error occured", error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const user = await signInWithRedirect(auth, provider);
    } catch (error) {
      console.log("An error occured", error);
    }
  };

  const router = useRouter();
  useEffect(() => {
    if (!isLoading && authUser) {
      router.push("/");
    }
  }, [isLoading, authUser]);

  return isLoading || (!isLoading && authUser) ? (
    <Loader />
  ) : (
    <main className="flex lg:h-[100vh]">
      <div className="w-full lg:w-[60%] p-8 md:p-14 flex items-center justify-center lg:justify-start">
        <div className="p-8 w-[600px]">
          <h1 className="text-6xl font-semibold">Login</h1>
          <p className="mt-6 ml-1">
            Don't have an account ?{" "}
            <Link
              href="/register"
              className="underline hover:text-blue-400 cursor-pointer"
            >
              Sign Up
            </Link>
          </p>

          <div
            onClick={signInWithGoogle}
            className="bg-black/[0.05] text-white w-full py-4 mt-10 rounded-full transition-transform hover:bg-black/[0.8] active:scale-90 flex justify-center items-center gap-4 cursor-pointer group"
          >
            <FcGoogle size={22} />
            <span className="font-medium text-black group-hover:text-white">
              Login with Google
            </span>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mt-10 pl-1 flex flex-col">
              <label>Email</label>
              <input
                type="text"
                name="email"
                onChange={formInputChange}
                className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                required
              />
            </div>
            <div className="mt-10 pl-1 flex flex-col">
              <label>Password</label>
              <input
                type="password"
                name="password"
                onChange={formInputChange}
                className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                required
              />
            </div>
            <button
              onClick={signInHandler}
              className="bg-black text-white w-44 py-4 mt-10 rounded-full transition-transform hover:bg-black/[0.8] active:scale-90"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
      <div
        className="w-[40%] bg-slate-400 bg-cover bg-right-top hidden lg:block"
        style={{
          backgroundImage: "url('/login-banner.jpg')",
        }}
      ></div>
    </main>
  );
};

export default LoginForm;
