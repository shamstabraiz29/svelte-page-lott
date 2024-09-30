<script lang="ts">
  import CarCard from "$lib/component/cards/cars/CarCard.svelte";
  import Loader from "$lib/component/loader/index.svelte";
  import Header from "$lib/component/Header/HomeHeader.svelte";
  import Footer from "$lib/component/footer/index.svelte";
  import NavigationHeader from "$lib/component/Header/TabHeader.svelte";

  import {
    listMyAutoPaymentSubscriptions,
    type ListMyAutoPaymentSubscriptionsQuery,
  } from "../../graphql/generated";

  import NoContentCard from "$lib/component/cards/NoContentCard.svelte";
  import authStore, { ShowToastError } from "$lib/store";

  export let isLoading: boolean = false;
  let error: string = "";

  let listPaymentSubscriptions: ListMyAutoPaymentSubscriptionsQuery["listMyAutoPaymentSubscriptions"] =
    [];

  $: {
    if ($authStore.isLoggedIn) {
      listMyAutoPaymentSubscriptions({}).subscribe(
        ({ data, loading, errors }) => {
          if (data) {
            listPaymentSubscriptions = data.listMyAutoPaymentSubscriptions;
          } else if (errors) {
            ShowToastError.set({
              showToastError: true,
              text: "",
            });
            error = errors.map((e) => e.message).join(", ");
            console.log("Error in listMyAutoPaymentSubscriptions:", error);
          }
          isLoading = loading;
        }
      );
    }
  }

  $: sortedListPaymentSubscriptions = listPaymentSubscriptions
    ? [...listPaymentSubscriptions].sort((a, b) => {
        if (a.currentParkEntry !== null && b.currentParkEntry === null) {
          return -1;
        }
        if (b.currentParkEntry !== null && a.currentParkEntry === null) {
          return 1;
        }
        return 0;
      })
    : [];
</script>

<svelte:head>
  <title>My Lott | トップ</title>
</svelte:head>
<div class="app mx-auto backgroundImg" />
<div>
  <Header />
  <div class="container-class pt-20 px-4">
    <NavigationHeader />
    <div class="space-y-5 mt-6">
      {#if isLoading}
        <div class="w-full flex items-center justify-center h-[30svh]">
          <Loader color="#FFF" />
        </div>
      {:else if listPaymentSubscriptions && listPaymentSubscriptions.length !== 0}
        {#each sortedListPaymentSubscriptions as data (data.id)}
          <CarCard
            id={data.id}
            carImg={`${data.image.imageUrl}`}
            carName={data.name}
            currentParkEntry={data?.currentParkEntry}
            lastParkEntry={data.lastParkEntry}
            status={data.status}
            large={data.large}
            small={data.small}
            letter={data.letter}
            city={data.city}
          />
        {/each}
      {:else}
        <NoContentCard
          iconName="noCar"
          title="登録された車両はありません"
          subtitle="車両の登録は、Lott駐車場の精算機にて行なえます。"
        />
      {/if}
    </div>
  </div>
  <div class="py-10">
    <Footer />
  </div>
</div>
