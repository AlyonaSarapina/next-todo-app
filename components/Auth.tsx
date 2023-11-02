import React from "react";
import { Box, Button, Heading } from "@chakra-ui/react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { FaGoogle } from "react-icons/fa";
import { auth } from "../firebase";
import useAuth from "../hooks/useAuth";

const Auth = () => {
  const { isLoggedIn, user } = useAuth();

  const handleAuth = async () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        GoogleAuthProvider.credentialFromResult(result);
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  return (
    <Box display="flex" justifyContent="space-between">
      {isLoggedIn && (
        <>
          <Button leftIcon={<FaGoogle />}>{user?.email}</Button>
          <Button onClick={() => auth.signOut()}>Logout</Button>
        </>
      )}
      {!isLoggedIn && (
        <Box
          display="flex"
          flexDirection="column"
          height="100vh"
          width="full"
          justifyContent="center"
          alignItems="center"
        >
          <Heading mb="4" color="yellowgreen">
            Welcome to TodoApp
          </Heading>
          <Button
            boxShadow="dark-lg"
            leftIcon={<FaGoogle />}
            onClick={() => handleAuth()}
          >
            Login with Google
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Auth;
