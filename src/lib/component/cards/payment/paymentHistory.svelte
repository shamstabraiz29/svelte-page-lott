<script lang="ts">
  import { Card } from "flowbite-svelte";
  import Typography from "$lib/component/typography/index.svelte";
  import PaymentItem from "$lib/component/cards/payment/paymenItem.svelte";
  import Icon from "$lib/component/icons/index.svelte";
  import { hr } from "date-fns/locale";

  export let paymentSubscription: any;

  const mergedSuccessfulPaymentRequests =
    paymentSubscription?.parkEntries.reduce(
      (accumulator: any, current: any) => {
        return accumulator.concat(
          current.successfulPaymentRequests.map((request: any) => ({
            ...request,
            park: current.park,
          }))
        );
      },
      []
    );
</script>

{#if mergedSuccessfulPaymentRequests.length !== 0}
  <Card
    class="p-[25px] border-[1px] border-light rounded-[25px] m-auto shadow-none"
  >
    <div class="flex flex-col gap-[30px]">
      <div
        class="flex items-center justify-center gap-2 bg-[#F8F8F8] py-2.5 px-3.5 rounded-lg text-center"
      >
        <Icon name="info" color="#B4B4B4" />
        <Typography color="light" font="medium" size="xs"
          >顔パス駐車の支払いのみ表示されます</Typography
        >
      </div>
      <div>
        {#each mergedSuccessfulPaymentRequests as payment, i}
          {#if i !== 0}
            <hr class="mb-4 mt-3" />
          {/if}
          <PaymentItem
            id={payment.id}
            name={payment.park.name}
            date={payment.transactionDate}
            amount={payment.amount}
            useTime={payment.parkEntry.elapsedSeconds}
            allPayment={false}
          />
        {/each}
      </div>
    </div>
  </Card>
{/if}
