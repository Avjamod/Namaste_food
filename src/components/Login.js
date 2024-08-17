import React, { useRef, useState } from "react";
import { checkValidData } from "../utils/validation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState([]);
  const dispatch = useDispatch((store) => store.user);

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleClickButton = () => {
    const emailValue = email.current.value;
    const passwordValue = password.current.value;
    // const nameValue = isSignIn ? null : name.current.value;

    const message = checkValidData(emailValue, passwordValue);
    console.log(message);
    setErrorMessage(message);
    if (message) return;

    if (!isSignIn) {
      createUserWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
          })
            .then(() => {
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      signInWithEmailAndPassword(auth, emailValue, passwordValue)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  const toggleSignIn = () => {
    setIsSignIn(!isSignIn);
  };
  return (
    <div className="pt-[3%] flex justify-center">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex justify-center items-center flex-col shadow-lg  "
      >
        <h1 className="mt-8 mb-2 font-bold text-2xl">
          {isSignIn ? "SignIn" : "SignUp"}
        </h1>
        {!isSignIn && (
          <input
            ref={name}
            type="text"
            placeholder="User Name"
            className="border border-black p-2 m-4 w-[150%]"
            required
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email address"
          className="border border-black p-2 m-4 w-[150%]"
          required
        />
        <input
          ref={password}
          type="password"
          placeholder="password"
          className="border border-black p-2 m-4 w-[150%]"
          required
        />
        <p className="text-red-500 font-bold text-lg">{errorMessage}</p>

        <button
          className="p-2 m-3 bg-green-100 rounded-md hover:bg-green-200"
          onClick={handleClickButton}
        >
          Submit
        </button>
        <p className="text-sm mb-2 cursor-pointer" onClick={toggleSignIn}>
          {isSignIn
            ? "New user? Register from here"
            : "already registered? Sign In"}
        </p>
      </form>
    </div>
  );
};

export default Login;
