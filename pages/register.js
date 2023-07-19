import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
} from "firebase/auth";
import { auth } from "@/firebase/FirebaseConfig";
import { useAuthUserContext } from "@/context/AuthUserContext";
import { useRouter } from "next/router";
import Loader from "@/componnets/Loader";
import Link from "next/link";

const provider = new GoogleAuthProvider();

const RegisterForm = () => {
  const { authUser, isLoading, setAuthUser, setIsLoading } =
    useAuthUserContext();

  const [regform, setRegform] = useState({
    name: "",
    email: "",
    password: "",
  });

  const formInputChange = (e) => {
    setRegform((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const signupHandler = async () => {
    setIsLoading(true);
    if (regform.name == "" || regform.email == "" || regform.password == "")
      return;

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        regform.email,
        regform.password
      );

      await updateProfile(auth.currentUser, {
        displayName: regform.name,
      });

      setAuthUser({
        uid: user.uid,
        email: user.email,
        username: regform.name,
      });
    } catch (error) {
      console.log("An Error occured", error);
    }
  };

  const signInWithGoogle = async () => {
    try {
      const user = await signInWithRedirect(auth, provider);
      console.log(user);
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
          <h1 className="text-6xl font-semibold">Sign Up</h1>
          <p className="mt-6 ml-1">
            Already have an account ?{" "}
            <Link
              href="/login"
              className="underline hover:text-blue-400 cursor-pointer"
            >
              Login
            </Link>
          </p>

          <div
            className="bg-black/[0.05] text-white w-full py-4 mt-10 rounded-full transition-transform hover:bg-black/[0.8] active:scale-90 flex justify-center items-center gap-4 cursor-pointer group"
            onClick={() => signInWithGoogle()}
          >
            <FcGoogle size={22} />
            <span className="font-medium text-black group-hover:text-white">
              Login with Google
            </span>
          </div>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mt-10 pl-1 flex flex-col">
              <label>Name</label>
              <input
                type="text"
                name="name"
                className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                onChange={formInputChange}
                required
              />
            </div>
            <div className="mt-10 pl-1 flex flex-col">
              <label>Email</label>
              <input
                type="text"
                name="email"
                className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                onChange={formInputChange}
                required
              />
            </div>
            <div className="mt-10 pl-1 flex flex-col">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="font-medium border-b border-black p-4 outline-0 focus-within:border-blue-400"
                onChange={formInputChange}
                required
              />
            </div>
            <button
              onClick={() => {
                signupHandler();
              }}
              className="bg-black text-white w-44 py-4 mt-10 rounded-full transition-transform hover:bg-black/[0.8] active:scale-90"
            >
              Sign Up
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

export default RegisterForm;
