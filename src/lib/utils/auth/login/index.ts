import { auth } from "../init";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithCredential,
  PhoneAuthProvider,
} from "firebase/auth";

let recaptchaVerifier: RecaptchaVerifier;

export async function sendOTP(
  phoneNumber: string,
  recaptchaContainerId: string
) {
  if (!recaptchaVerifier) {
    recaptchaVerifier = new RecaptchaVerifier(auth, recaptchaContainerId, {
      size: "invisible",
      callback: (response: any) => {
        console.log(`recapcha callback`);
      },
    });
  }
  const confirmationResult = await signInWithPhoneNumber(
    auth,
    phoneNumber,
    recaptchaVerifier
  );
  return confirmationResult;
}
export async function verifyOTP(
  confirmationResult: any,
  verificationCode: string
) {
  const credential = PhoneAuthProvider.credential(
    confirmationResult.verificationId,
    verificationCode
  );
  const userCredential = await signInWithCredential(auth, credential);
  return userCredential.user;
}
