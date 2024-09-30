<script lang="ts">
  import { format } from "date-fns";

  import { formatPrice, formatTime } from "$lib/helpers";
  import Typography from "$lib/component/typography/index.svelte";

  export let ReceiptTime: string | number = "";
  export let UtilizationTime: any;
  export let currentAmount: any;
</script>

<div class=" text-black">
  <div class="box mb-2 rounded-t-xl">
    <Typography size="sm" color="light" font="medium">入場時刻</Typography>
    <Typography
      size="2xl"
      color="secondary"
      font="normal"
      className="font-fractul"
    >
      {ReceiptTime ? format(new Date(ReceiptTime), "yyyy/MM/dd HH:mm") : "N/A"}
    </Typography>
  </div>
  <div class="w-full flex gap-2">
    <div class="box rounded-bl-xl">
      <Typography size="sm" color="light" font="medium">利用時間</Typography>
      <Typography
        size="2xl"
        font="normal"
        color="secondary"
        className="font-fractul">{@html formatTime(UtilizationTime)}</Typography
      >
    </div>
    <div class="box rounded-br-xl">
      <Typography size="sm" color="light" font="medium">現在の金額</Typography>
      <Typography
        size="2xl"
        font="normal"
        color="secondary"
        className="font-fractul">{formatPrice(currentAmount)}</Typography
      >
    </div>
  </div>
</div>

<style>
  .box {
    @apply flex flex-col w-full items-center p-4 gap-2 bg-white;
  }
</style>
