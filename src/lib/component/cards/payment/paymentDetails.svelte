<script lang="ts">
  import { Card } from "flowbite-svelte";
  import PaymentDetailItem from "./paymentDetailItem.svelte";
  import { format } from "date-fns";
  import { formatDuration } from "$lib/helpers";

  export let transactionDate: string = "";
  export let useTime: any = "";
  export let paymentMethod: any = "";

  let paymentDetails = [
    {
      title: "精算完了日",
      iconName: "calendarCheck",
      subtitle: format(new Date(transactionDate), "yyyy/MM/dd HH:mm"),
    },
    {
      title: "利用時間",
      iconName: "stopWatch",
      subtitle: formatDuration(useTime),
    },
    {
      title: "支払い方法",
      iconName: "creditCard",
      subtitle: `***${paymentMethod}`,
      visa: true,
    },
  ];
</script>

<Card
  class="border-1 border border-light rounded-[15px] py-[30px] px-[25px] m-auto shadow-none"
>
  {#each paymentDetails as detail, i (detail.title)}
    {#if i !== 0}
      <hr class="mb-4 mt-3" />
    {/if}
    <PaymentDetailItem
      subtitle={detail.subtitle}
      title={detail.title}
      iconName={detail.iconName}
      visa={detail.visa}
    />
  {/each}
</Card>
