<script lang="ts">
  import { format } from "date-fns";

  import { formatDuration, formatPrice } from "$lib/helpers";

  import Icon from "$lib/component/icons/index.svelte";
  import Typography from "$lib/component/typography/index.svelte";

  export let id: string;
  export let name: string;
  export let date: string;
  export let amount: number;
  export let useTime: number;
  export let allPayment: boolean;
  export let parkName: string = "";
</script>

<a
  href={`/payment-detail/${id}`}
  class="flex justify-between items-start cursor-pointer"
>
  <div class="flex gap-3">
    <div
      class=" h-8 p-1.5 rounded-lg bg-gradient-to-b from-[#D8E8FB] to-[#F8EDEC]"
    >
      <Icon name="koapass" />
    </div>
    <div class="space-y-1">
      <Typography
        as="h1"
        size="base"
        color="dark"
        font="bold"
        className="tracking-[0.16px]">{name}</Typography
      >
      <div>
        {#if allPayment === true}
          <Typography as="h3" size="sm" color="light" font="medium"
            >{parkName}</Typography
          >
        {:else}
          <Typography
            as="p"
            size="sm"
            color="light"
            font="normal"
            className="font-fractul"
          >
            {date ? format(new Date(date), "yyyy/MM/dd") : "N/A"}
          </Typography>
        {/if}

        {#if allPayment === false}
          <Typography
            as="h3"
            size="sm"
            color="light"
            font="medium"
            className="tracking-widest"
            >{@html formatDuration(useTime)}</Typography
          >
        {:else}
          <Typography
            as="p"
            size="sm"
            color="light"
            font="normal"
            className="font-fractul"
          >
            {date ? format(new Date(date), "yyyy/MM/dd") : "N/A"}
          </Typography>
        {/if}
      </div>
    </div>
  </div>
  <div>
    <div class="flex gap-3 items-center">
      <Typography
        as="h1"
        className="text-[17px] font-fractul"
        color="dark"
        font="normal">{formatPrice(amount)}</Typography
      >
      <Icon name="rightArrow" />
    </div>
  </div>
</a>
