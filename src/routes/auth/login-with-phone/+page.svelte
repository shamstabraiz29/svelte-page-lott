<script lang="ts">
  import { goto } from "$app/navigation";
  import LoginCard from "$lib/component/cards/loginCard.svelte";
  import Icon from "$lib/component/icons/index.svelte";
  import { logInConfirmationResult } from "$lib/store";
  import { sendOTP } from "$lib/utils/auth/login";
  import {
    validateJapaneseMobileNumber,
    convertToInternationalFormat,
    formatPhoneNumber,
  } from "$lib/helpers";
  import { logInPhoneNumber } from "$lib/store";
  import { CheckUserExists } from "../../../graphql/generated";

  let phoneNumber = "";
  let formattedPhoneNumber = "";
  let isSendingOTP = false;
  let errorMessage = "";
  let isUserExists = false;

  function handleInput(event: any) {
    phoneNumber = event.target.value.replace(/\D/g, "");
    formattedPhoneNumber = formatPhoneNumber(phoneNumber);
  }

  const checkUser = () => {
    isSendingOTP = true;
    errorMessage = "";
    try {
      if (!validateJapaneseMobileNumber(phoneNumber)) {
        errorMessage = "不正な携帯番号です。";
        isSendingOTP = false;
        return;
      }
      const internationalNumber = convertToInternationalFormat(phoneNumber);
      CheckUserExists({
        variables: {
          data: {
            phone: internationalNumber,
          },
        },
      }).subscribe(async ({ data, errors }) => {
        if (data) {
          errorMessage = "";

          if (data.checkUserExists?.exists === true) {
            isUserExists = true;
            handleSendOTP();
          } else if (data.checkUserExists?.exists === false) {
            errorMessage = "携帯番号が登録されていません。";
            isUserExists = false;
            isSendingOTP = false;
          }
        } else if (errors) {
          errorMessage = errors.map((e) => e.message).join(", ");
          isSendingOTP = false;
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  async function handleSendOTP() {
    isSendingOTP = true;
    errorMessage = "";
    try {
      const internationalNumber = convertToInternationalFormat(phoneNumber);
      logInPhoneNumber.set(internationalNumber);

      const confirmationResult = await sendOTP(
        internationalNumber,
        "recaptcha-container"
      );
      logInConfirmationResult.set(confirmationResult);
      goto("/auth/auth-code");
    } catch (error: any) {
      if (error.message.includes("auth/invalid-phone-number")) {
        errorMessage = "不正な携帯番号です。";
      } else if (error.message.includes("auth/user-not-found")) {
        errorMessage = "携帯番号が登録されていません。";
      } else if (error.message.includes("auth/too-many-requests")) {
        errorMessage = "試行回数が多すぎますので、後でもう一度お試しください。";
      } else {
        errorMessage =
          "ログインに問題が発生しました。継続する場合は時間をおいてお試し下さい。";
      }
    } finally {
      isSendingOTP = false;
    }
  }
</script>

<svelte:head>
  <title>My Lott | ログイン</title>
</svelte:head>

<div class="flex flex-col pt-16 px-4">
  <div class="flex flex-col gap-10 items-center">
    <div>
      <Icon name="logo" />
    </div>
    <LoginCard
      iconName="phone"
      ButtonLabel="次へ進む"
      title="登録された携帯番号を ご入力ください"
      subtitle="携帯番号に認証コードを送信します。"
      handleSubmit={checkUser}
      bind:value={formattedPhoneNumber}
      on:input={handleInput}
      placeholder="090-0000-0000"
      {errorMessage}
      isLoading={isSendingOTP}
    />
  </div>
</div>
