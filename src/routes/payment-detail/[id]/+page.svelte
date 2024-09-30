<script lang="ts">
  import { page } from "$app/stores";

  import authStore, { paymentReceiptDetails, ShowToastError } from "$lib/store";
  import { formatPrice } from "$lib/helpers";

  import Header from "$lib/component/Header/index.svelte";
  import Icon from "$lib/component/icons/index.svelte";
  import Typography from "$lib/component/typography/index.svelte";
  import CarInfo from "$lib/component/cards/cars/carInfo.svelte";
  import PaymentDetails from "$lib/component/cards/payment/paymentDetails.svelte";
  import Loader from "$lib/component/loader/index.svelte";
  import Footer from "$lib/component/footer/index.svelte";

  import {
    getMyPaymentRequest,
    type GetMyPaymentRequestQuery,
  } from "../../../graphql/generated";

  let error: string = "";
  let isLoading = false;
  let isError: boolean = false;
  let getMyPaymentRequestData: GetMyPaymentRequestQuery["getMyPaymentRequest"];

  $: {
    if ($authStore.isLoggedIn) {
      getMyPaymentRequest({
        variables: {
          id: $page.params.id,
        },
      }).subscribe(({ data, loading, errors }) => {
        if (data) {
          getMyPaymentRequestData = data?.getMyPaymentRequest;
        } else if (errors) {
          ShowToastError.set({
            showToastError: true,
            text: "",
          });
          error = errors.map((e) => e.message).join(", ");
          console.error("Error in getMyPaymentRequest:", error);
        }
        isLoading = loading;
      });
    }
  }
  $: paymentReceiptDetails.set(getMyPaymentRequestData);
</script>

<svelte:head>
  <title>My Lott | 支払詳細</title>
</svelte:head>

<div>
  <Header title="支払い詳細" />
  <div class="container-class flex flex-col px-4 gap-10 pt-24 min-h-screen">
    {#if isLoading}
      <div class="w-full flex items-center justify-center h-[30svh]">
        <Loader />
      </div>
    {:else if getMyPaymentRequestData}
      <div class="space-y-6">
        <div
          class="flex items-center p-2.5 m-auto w-[131px] rounded-lg bg-gradient-to-r from-[#F8EDEC] to-[#D8E8FB] text-[#545FFF] gap-2"
        >
          <Icon name="koapass" />
          <Typography as="p"
            >{getMyPaymentRequestData?.parkEntry.park.name}</Typography
          >
        </div>
        <div class="flex flex-col items-center">
          {#if getMyPaymentRequestData.parkEntry.autoPaymentSubscription?.name !== undefined}
            <Typography as="h3" size="lg" font="bold" color="dark">
              {getMyPaymentRequestData.parkEntry.plateValue}
            </Typography>
          {/if}
          <Typography
            as="h1"
            size="5xl"
            font="normal"
            color="dark"
            className="font-fractul"
            >{formatPrice(getMyPaymentRequestData?.amount)}</Typography
          >
          <Typography as="p" size="base" font="medium" color="light"
            >{getMyPaymentRequestData?.parkEntry.park.name}</Typography
          >
        </div>
        <div>
          {#each [getMyPaymentRequestData.parkEntry.images[0]] as image, i}
            <CarInfo
              carImg={image.imageUrl}
              letter={getMyPaymentRequestData?.parkEntry.letter}
              small={getMyPaymentRequestData?.parkEntry.small}
              city={getMyPaymentRequestData?.parkEntry.city}
              large={getMyPaymentRequestData?.parkEntry.large}
            />
          {/each}
        </div>
        <div class="pt-5">
          <PaymentDetails
            transactionDate={getMyPaymentRequestData.transactionDate}
            useTime={getMyPaymentRequestData.parkEntry.elapsedSeconds}
            paymentMethod={getMyPaymentRequestData.cardLast4Digits}
          />
        </div>
      </div>
    {:else if isError}
      <div class="text-center">
        <Typography size="sm" font="medium" className="text-red-600">
          申し訳ありませんが、失敗しました。少し時間をおいて再度お試し下さい。
        </Typography>
      </div>
    {/if}
  </div>
  <div class="py-10">
    <Footer />
  </div>
</div>
