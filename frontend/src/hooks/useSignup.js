import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { singup } from "../lib/api";

const useSignup = () => {
  const queryClient = useQueryClient();
  const {
    mutate: signUpMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: singup,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });
  return {
    signUpMutation,
    isPending,
    error,
  };
};

export default useSignup;
