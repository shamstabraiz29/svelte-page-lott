<script lang="ts">
  import { goto } from "$app/navigation";

  import { verifyOTP } from "$lib/utils/auth/login";
  import { sendOTP } from "$lib/utils/auth/login";
  import { logInPhoneNumber } from "$lib/store";
  import { logInConfirmationResult } from "$lib/store";
  import { isValidVerificationCode } from "$lib/helpers";
  import LoginCard from "$lib/component/cards/loginCard.svelte";
  import Icon from "$lib/component/icons/index.svelte";

  let verificationCode = "";
  let isVerifyingOTP = false;
  let isResendOTP = false;
  let errorMessage = "";

  let confirmationResult: any;
  let phoneNumber: any = "";

  logInPhoneNumber.subscribe(($phoneNumber) => {
    phoneNumber = $phoneNumber;
  });

  logInConfirmationResult.subscribe(($confirmationResult) => {
    confirmationResult = $confirmationResult;
  });

  async function handleVerifyOTP() {
    try {
      isVerifyingOTP = true;
      errorMessage = "";

      if (!isValidVerificationCode(verificationCode)) {
        errorMessage = "認証コードは6桁の数字でなければなりません。";
        return;
      }

      await verifyOTP(confirmationResult, verificationCode);
      goto("/");
    } catch (error: any) {
      console.log("Error sending OTP:", { error });

      if (error.message.includes("auth/user-not-found")) {
        errorMessage = "携帯番号が登録されていません。";
      } else if (error.message.includes("auth/invalid-verification-code")) {
        errorMessage = "認証コードが正しくありません。";
      } else if (error.message.includes("auth/too-many-requests")) {
        errorMessage = "試行回数が多すぎますので、後でもう一度お試しください。";
      } else {
        errorMessage =
          "ログインに問題が発生しました。継続する場合は時間をおいてお試し下さい。";
      }
    } finally {
      isVerifyingOTP = false;
    }
  }

  const handleResendCode = async () => {
    isResendOTP = true;
    try {
      errorMessage = "";
      const confirmationResult = await sendOTP(
        phoneNumber,
        "recaptcha-container"
      );
      logInConfirmationResult.set(confirmationResult);
    } catch (error: any) {
      errorMessage = error;
    }
  };
</script>

<svelte:head>
  <title>My Lott | ログイン</title>
</svelte:head>

<div class="flex flex-col pt-16 px-4">
  <div class="flex flex-col gap-10 items-center">
    <div>
      <Icon name="logo" />
    </div>
    <div>
      <LoginCard
        iconName="send"
        ButtonLabel="ログイン"
        title={isResendOTP === true
          ? "認証コードが 再送信されました。"
          : "認証コードが 送信されました。"}
        subtitle={isResendOTP === true
          ? "コードをご入力ください。 "
          : "ログインするにはコードを ご入力ください。"}
        handleSubmit={handleVerifyOTP}
        bind:value={verificationCode}
        placeholder="123456"
        {errorMessage}
        isLoading={isVerifyingOTP}
        {handleResendCode}
        {isResendOTP}
      />
    </div>
  </div>
</div>
