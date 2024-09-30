<script lang="ts">
  import { page } from "$app/stores";
  import { Card, Toast } from "flowbite-svelte";
  import { afterUpdate } from "svelte";

  import Icon from "$lib/component/icons/index.svelte";
  import Button from "$lib/component/button/index.svelte";
  import Typography from "$lib/component/typography/index.svelte";

  export let title: string = "";
  export let subtitle: string = "";
  export let placeholder: string = "";
  export let ButtonLabel: string = "";
  export let iconName: any = "";
  export let value: string;
  export let errorMessage: string = "";
  export let isLoading: boolean = false;
  export let isResendOTP: boolean = false;
  export let handleSubmit: () => void;
  export let handleResendCode: (() => void) | undefined = undefined;

  let pathname: any;
  let canResend: boolean = false;
  let timeLeft = 0;
  let showAlert: boolean = false;
  let error: string = "";

  afterUpdate(() => {
    pathname = $page.route.id;
  });

  const setResendTimer = () => {
    canResend = false;
    timeLeft = 30;
    const interval = setInterval(() => {
      timeLeft -= 1;
      if (timeLeft <= 0) {
        clearInterval(interval);
        canResend = true;
        showAlert = false;
      }
    }, 1000);
  };

  $: setResendTimer();
  $: error = errorMessage;
</script>

{#if showAlert && iconName !== "phone"}
  <Toast
    color="blue"
    position="top-right"
    dismissable
    on:close={() => (showAlert = false)}
  >
    <span class="flex items-center gap-2">
      <Icon name="info" color="#545FFF" />
      <p class="text-sm font-medium text-primary">
        30秒以上待ってからお試し下さい。
      </p>
    </span>
  </Toast>
{/if}

<Card
  class="loginBg px-8  py-12 rounded-[25px] overflow-hidden bg-no-repeat bg-cover 
      border-none shadow-2xl"
>
  <form
    class="flex flex-col gap-[78px]"
    on:submit|preventDefault={handleSubmit}
  >
    <div class="space-y-5">
      <div class="flex gap-2 items-center">
        <Icon color="#89DAB8" height="35" width="35" name={iconName} />
        {#if isResendOTP === true}
          <Icon color="#89DAB8" height="35" width="35" name="resend" />
        {/if}
      </div>
      <div class="space-y-3">
        <div>
          <Typography
            as="h1"
            size="2xl"
            font="bold"
            color="white"
            className={`${iconName === "phone" ? "w-64" : "w-44"}`}
          >
            {title}
          </Typography>
        </div>
        <div>
          <Typography
            as="p"
            size="base"
            font="medium"
            className={`opacity-[0.7] tracking-[0.16px] ${
              iconName === "phone" ? "" : "w-48"
            }`}
            color="white"
          >
            {subtitle}
          </Typography>
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-6">
      <div class="space-y-4">
        {#if error}
          <div class="flex items-center gap-3">
            <Icon name="alert" />
            <Typography
              as="p"
              size="sm"
              font="medium"
              className="text-[#F99088]"
            >
              {error}
            </Typography>
          </div>
        {/if}
        {#if iconName === "phone"}
          <input
            bind:value
            type="tel"
            maxlength="13"
            class="w-full pt-4 pb-2.5 rounded-lg bg-transparent text-white outline-none border font-fractul
                 focus:border-white placeholder-white placeholder-opacity-50 text-[25px] {errorMessage
              ? 'border-[#F99088] focus:border-none transition-all duration-300 ease-in-out focus:ring focus:ring-[#F99088]'
              : 'border-[#A0A7FF]'}"
            {placeholder}
            on:input
          />
        {:else}
          <input
            bind:value
            type="tel"
            maxlength="6"
            class="w-full pt-4 pb-2.5 rounded-lg bg-transparent text-white outline-none border font-fractul
               focus:border-white placeholder-white placeholder-opacity-50 text-[25px] {errorMessage
              ? 'border-[#F99088] focus:border-none transition-all duration-300 ease-in-out focus:ring focus:ring-[#F99088]'
              : 'border-[#A0A7FF]'}"
            {placeholder}
          />
        {/if}
      </div>
      <div>
        <Button
          variant="secondary"
          block={true}
          size="md"
          rounded="lg"
          type="submit"
          disabled={!value}
          className="custom-button"
          loading={isLoading}
        >
          {ButtonLabel}
        </Button>
      </div>
      <div class="flex items-center justify-between">
        {#if pathname === "/auth/login-with-phone"}
          <a href="/auth" class="flex items-center gap-2">
            <Icon name="leftArrow" />
            <Typography as="span" font="medium" size="sm" color="white">
              トップに戻る
            </Typography>
          </a>
        {:else}
          <a href="/auth/login-with-phone" class="flex items-center gap-2">
            <Icon name="leftArrow" />
            <Typography as="span" font="medium" size="sm" color="white">
              携帯番号を入力
            </Typography>
          </a>
        {/if}
        {#if pathname !== "/auth/login-with-phone"}
          <button
            on:click={() => {
              if (canResend) {
                handleResendCode?.();
                setResendTimer();
              } else {
                showAlert = true;
              }
            }}
            type="button"
          >
            <Typography as="span" font="medium" size="sm" color="white"
              >コードの再送信</Typography
            >
          </button>
        {/if}
      </div>
    </div>
  </form>
</Card>
