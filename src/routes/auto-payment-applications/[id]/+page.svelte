<script lang="ts">
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { signInWithCustomToken } from "firebase/auth";
  import { auth } from "$lib/utils/auth/init";

  import {
    ActivateAutoPaymentApplication,
    GetAutoPaymentApplication,
    type GetAutoPaymentApplicationQuery,
  } from "../../../graphql/generated";

  import Button from "$lib/component/button/index.svelte";
  import Lottie from "$lib/component/lottie/index.svelte";
  import Completion from "$lib/static/animations/IsometricParkingLott.json";
  import AutoPaymentCarCart from "$lib/component/cards/autoPaymentCarCart.svelte";
  import Typography from "$lib/component/typography/index.svelte";
  import Icon from "$lib/component/icons/index.svelte";
  import Loader from "$lib/component/loader/index.svelte";
  import { ShowToastError } from "$lib/store";

  let error: string = "";
  let accessToken: any;
  let checked = false;
  let isError = false;
  let activating: boolean = false;
  let isLoading: boolean = false;

  let getAutoPaymentApplicationData: GetAutoPaymentApplicationQuery["getAutoPaymentApplication"];

  GetAutoPaymentApplication({
    variables: {
      data: {
        id: $page.params.id,
      },
    },
  }).subscribe(({ data, loading, errors }) => {
    if (data) {
      getAutoPaymentApplicationData = data.getAutoPaymentApplication;
      ShowToastError.set({
        showToastError: false,
        text: "",
      });
    } else if (errors) {
      isError = true;
      error = errors.map((e) => e.message).join(", ");
      if (error && error === "NOT_FOUND") {
        ShowToastError.set({
          showToastError: true,
          text: "データが見つかりませんでした。正しいURLであることを確認してください。",
        });
      } else if (error === "ALREADY_ACTIVATED") {
        ShowToastError.set({
          showToastError: true,
          text: "すでに顔パス駐車の登録は完了しています。",
        });
      }
      console.error("Error in GetAutoPaymentApplication:", error);
    }
    isLoading = loading;
  });

  const onActivateApplication = async () => {
    try {
      activating = true;
      const result = await ActivateAutoPaymentApplication({
        variables: {
          data: {
            id: $page.params.id,
          },
        },
        fetchPolicy: "network-only",
      });
      accessToken = result.data?.activateAutoPaymentApplication.customToken;
      signInWithCustomToken(auth, accessToken)
        .then(() => {
          goto("/auto-payment-success");
        })
        .catch((error) => {
          console.error("Authentication failed:", error);
          alert("有効期限が過ぎたリンクです。");
        });
    } catch (errors) {
      ShowToastError.set({
        showToastError: true,
        text: "なんらかの理由で登録を完了させることができませんでした",
      });
      checked = false;
      activating = false;
    }
  };
</script>

<svelte:head>
  <title>My Lott | 登録の確認</title>
</svelte:head>

<div>
  <div
    class="flex flex-col mx-auto main-container backgroundImg overflow-hidden"
  >
    <div class="flex-grow content-scroll px-4 py-8">
      <div class="flex justify-center">
        <Icon name="logo" />
      </div>
      <div class="flex my-4 relative h-72 w-[350px] m-auto">
        <div class="flex flex-col justify-end mb-5 px-5">
          <Typography
            as="h3"
            size="2xl"
            font="bold"
            className="text-[#FFF] leading-normal whitespace-nowrap"
          >
            ナンバー、<br /> クレカの登録で、<br /> 顔パス駐車が <br /> 有効化されます
          </Typography>
        </div>
        <div class="absolute right-[-9.5rem] bottom-[0.2rem] flip-horizontal">
          <Lottie height={300} width={350} src={Completion} />
        </div>
      </div>

      {#if isLoading}
        <div class="w-full flex items-center justify-center h-[30svh]">
          <Loader />
        </div>
      {:else if getAutoPaymentApplicationData}
        <div class="paymentDetail">
          <AutoPaymentCarCart {getAutoPaymentApplicationData} />
        </div>
      {/if}
    </div>
  </div>
  <div
    class="fixed footer-container bottom-0 w-full px-5 py-6 space-y-4 text-center bg-white border-white border-2"
  >
    <div class="flex flex-col gap-5 mt-5 px-1">
      <div class="flex justify-center items-center gap-[15px] cursor-pointer">
        <input
          type="checkbox"
          name="agree"
          id="agree"
          class="checkbox"
          bind:checked
          disabled={isError}
        />
        <label for="agree" class="font-medium text-base text-secondary">
          <a
            href="https://pragtech.jp/terms"
            target="_blank"
            class="text-[#545FFF]"
          >
            利用規約</a
          > に同意
        </label>
      </div>
      <div>
        <Button
          block
          size="md"
          rounded="md"
          variant="primary"
          disabled={!checked || activating}
          className="shadow"
          isDisableGray={true}
          onClick={() => onActivateApplication()}
        >
          {#if activating === true}
            <Loader size="sm" color="#FFF" />
          {:else}
            顔パス駐車を利用開始する
          {/if}
        </Button>
      </div>
    </div>
  </div>
</div>

<style>
  .flip-horizontal {
    transform: scaleX(-1);
  }
  .main-container {
    height: calc(80vh);
  }
  .footer-container {
    height: calc(20vh);
    box-shadow: 0px -5px 25px 0px rgba(0, 0, 0, 0.15);
  }
  .content-scroll {
    overflow-y: auto;
    overflow-x: hidden;
    flex-grow: 1;
  }

  .footer-container:before {
    content: "登録を完了させましょう";
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffda6b;
    width: 250px;
    padding: 12px 25px;
    border-radius: 99px;
    border: 3px solid #fff;
    font-size: 14px;
    font-weight: 500;
    color: #424242;
  }

  @media screen and (max-height: 736px) {
    .main-container {
      height: calc(75vh);
    }
    .footer-container {
      height: calc(25vh);
    }
  }
  @media screen and (max-height: 830px) {
    .paymentDetail {
      padding-bottom: 8rem;
    }
  }
  @media screen and (max-height: 568px) {
    .main-container {
      height: calc(70vh);
    }
    .footer-container {
      height: calc(30vh);
    }
  }
  .shadow {
    box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.15);
  }
</style>
