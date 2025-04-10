import React, { useRef, useState } from "react";
import Header from "./Header";
import { validateFormData } from "../utils/validate";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOnBtnClick = () => {
    // validate the data
    const message = validateFormData(
      emailRef.current.value,
      passwordRef.current.value
    );
    setErrMsg(message);
    // if message == null we need to sign in / sign up
    if (message) return;
    // sign in / sign up logic

    if (!isSignInForm) {
      // signup logic

      createUserWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: nameRef.current.value,
            photoURL:
              "https://avatars.githubusercontent.com/u/94546020?s=400&v=4",
          })
            .then(() => {
              // Profile updated!
              // here i am i trying to get the updated values of the user -> we will get it from the auth.current user (updated user means what ever we have updated here that will not be there in the user )
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              navigate("/browse");
            })
            .catch((error) => {
              const errorMessage = error.message;
              setErrMsg(errorMessage);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMsg(errorMessage);
        });
    } else {
      // signin logic
      signInWithEmailAndPassword(
        auth,
        emailRef.current.value,
        passwordRef.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          //   once the user is signed in will push the userinfo onto the redux store for using it everwhere we need
          console.log("sign in", user);
          navigate("/browse");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrMsg(errorMessage);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="logo"
        />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="w-3/12 p-5 m-5 bg-black absolute my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="text-3xl font-bold">
          {isSignInForm ? "Sign IN" : "Sign UP"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            className="p-2 my-4 w-full bg-gray-700"
            placeholder="Enter Full Name"
            ref={nameRef}
          />
        )}
        <input
          type="text"
          className="p-2 my-4 w-full bg-gray-700"
          placeholder="Enter Email"
          ref={emailRef}
        />
        <input
          type="password"
          className="p-2 my-4 w-full bg-gray-700"
          placeholder="Enter Password"
          ref={passwordRef}
        />
        <button
          className="p-4 my-6 bg-red-800 w-full"
          onClick={handleOnBtnClick}
        >
          {isSignInForm ? "Sign IN" : "Sign UP"}
        </button>
        <p className="font-bold py-2  text-red-600 ">{errMsg}</p>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign Up Now"
            : "Already registered? Sign In Now."}
        </p>
      </form>
    </div>
  );
};

export default Login;
