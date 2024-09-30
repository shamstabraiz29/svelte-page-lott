import { signOut } from "firebase/auth";
import { auth } from "$lib/utils/auth/init";
import client from "$lib/graphql/apollo";

export const logoutUser = async () => {
  try {
    await signOut(auth);
    client.clearStore();
  } catch (error) {
    console.error("Logout failed", error);
  }
};
