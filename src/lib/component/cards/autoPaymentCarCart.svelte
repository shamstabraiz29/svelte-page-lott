<script lang="ts">
  import AutoPaymentDetailItem from "$lib/component/cards/autoPaymentDetail.svelte";
  import Typography from "$lib/component/typography/index.svelte";
  export let getAutoPaymentApplicationData: any;

  let paymentDetails = [
    {
      title: "ナンバープレート",
      iconName: "numPlateCar",
      plateValue: getAutoPaymentApplicationData,
    },
    {
      title: "携帯電話番号",
      iconName: "autoPhone",
      subtitle: getAutoPaymentApplicationData.phoneNumber,
    },
    {
      title: "支払い方法",
      iconName: "creditCard",
      subtitle: `**** ${getAutoPaymentApplicationData.cardLast4Digits}`,
      visa: true,
    },
  ];
</script>

<div
  class="w-[350px] border-2 border-[#E1E1E1] p-[25px] m-auto bg-[#FFF] rounded-[25px] overflow-hidden"
>
  <div class="flex flex-col gap-5">
    <div class="text-center pb-[5px]">
      <Typography color="dark" as="h2" font="bold" size="lg"
        >お客様の情報</Typography
      >
    </div>
    <div>
      <img
        class="w-full rounded-[15px] border border-light"
        src={getAutoPaymentApplicationData?.image.imageUrl}
        alt="car"
      />
    </div>
    <div class="px-[25px] py-[30px] bg-[#F8F8F8] rounded-[15px]">
      {#each paymentDetails as detail, i (detail.subtitle)}
        {#if i !== 0}
          <hr class="mb-5 mt-4" />
        {/if}
        <AutoPaymentDetailItem
          subtitle={detail.subtitle}
          title={detail.title}
          iconName={detail.iconName}
          visa={detail.visa}
          plateValue={detail.plateValue}
        />
      {/each}
    </div>
  </div>
</div>
