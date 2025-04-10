import React, { useEffect } from "react";
import Login from "./Login";

import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import Browse from "./Browse";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { auth } from "../utils/firebase";

const Body = () => {
  const dispatch = useDispatch();

  const appRouter = createBrowserRouter([
    { path: "/", element: <Login /> },
    { path: "/Browse", element: <Browse /> },
  ]);

  useEffect(() => {
    //  we will setup this method once at root level - when ever user signin or sign out this methos will be called automatically
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        // navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        // navigate("/");
      }
    });
  }, []);

  return <RouterProvider router={appRouter}></RouterProvider>;
};

export default Body;
