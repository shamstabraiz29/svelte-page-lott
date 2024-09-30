<script lang="ts">
  import { Card } from "flowbite-svelte";

  import Loader from "$lib/component/loader/index.svelte";
  import Header from "$lib/component/Header/HomeHeader.svelte";
  import Footer from "$lib/component/footer/index.svelte";
  import Icon from "$lib/component/icons/index.svelte";
  import Typography from "$lib/component/typography/index.svelte";
  import PaymentItem from "$lib/component/cards/payment/paymenItem.svelte";
  import NavigationHeader from "$lib/component/Header/TabHeader.svelte";
  import {
    listMyPaidParkEntries,
    type ListMyPaidParkEntriesQuery,
  } from "../../graphql/generated";
  import NoContentCard from "$lib/component/cards/NoContentCard.svelte";
  import authStore, { ShowToastError } from "$lib/store";

  let error: string = "";
  let isLoading: boolean = false;
  let mergedAllSuccessfulPaymentRequests: any;

  let listPaidParkEntries: ListMyPaidParkEntriesQuery["listMyPaidParkEntries"];

  $: {
    if ($authStore.isLoggedIn) {
      listMyPaidParkEntries({}).subscribe(({ data, errors, loading }) => {
        if (data) {
          listPaidParkEntries = data.listMyPaidParkEntries;
        } else if (errors) {
          ShowToastError.set({
            showToastError: true,
            text: "",
          });
          error = errors.map((e) => e.message).join(", ");
          console.log("Error in listMyPaidParkEntries:", error);
        }
        isLoading = loading;
      });
    }
  }

  $: {
    mergedAllSuccessfulPaymentRequests = listPaidParkEntries?.reduce(
      (accumulator: any, current: any) => {
        return accumulator.concat(current.successfulPaymentRequests);
      },
      []
    );
  }
</script>

<svelte:head>
  <title>My Lott | トップ</title>
</svelte:head>
<div class="app mx-auto backgroundImg" />
<div>
  <Header />
  <div class="container-class pt-20 px-4">
    <NavigationHeader />
    <div class="mt-6">
      {#if isLoading}
        <div class="w-full flex items-center justify-center h-[50svh]">
          <Loader color="#FFF" />
        </div>
      {:else if mergedAllSuccessfulPaymentRequests && mergedAllSuccessfulPaymentRequests?.length !== 0}
        <Card class="space-y-5 p-6 border-2 border-light rounded-[25px] m-auto">
          <div
            class="flex items-center justify-center gap-2 bg-[#F8F8F8] py-2.5 px-3.5 rounded-lg text-center"
          >
            <Icon name="info" color="#B4B4B4" />
            <Typography color="light" font="medium" size="xs"
              >顔パス駐車の支払いのみ表示されます</Typography
            >
          </div>
          <div>
            {#each mergedAllSuccessfulPaymentRequests as payment, i}
              {#if i !== 0}
                <hr class="mb-4 mt-3" />
              {/if}
              <PaymentItem
                id={payment.id}
                parkName={payment.parkEntry.park.name}
                name={payment.parkEntry.plateValue}
                date={payment.transactionDate}
                amount={payment.amount}
                useTime={payment.parkEntry.city}
                allPayment={true}
              />
            {/each}
          </div>
        </Card>
      {:else}
        <NoContentCard
          iconName="noPayment"
          title="支払い履歴はありません"
          subtitle="顔パス駐車の支払い履歴が表示されます。"
        />
      {/if}
    </div>
  </div>
  <div class="py-10">
    <Footer />
  </div>
</div>
