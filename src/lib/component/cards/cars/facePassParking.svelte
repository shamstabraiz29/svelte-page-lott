<script lang="ts">
  import { Card } from "flowbite-svelte";

  import { DisabledModal, EnableModal, DisableOnlyTimeModal } from "$lib/store";

  import Typography from "$lib/component/typography/index.svelte";
  import Button from "$lib/component/button/index.svelte";
  import Icon from "$lib/component/icons/index.svelte";
  import Badge from "$lib/component/badge/index.svelte";
  import AutoDisabledModal from "$lib/component/Modals/disabledModal.svelte";
  import ThisTimeOnlyModal from "$lib/component/Modals/disableOnlyTimeModal.svelte";
  import EnabledModal from "$lib/component/Modals/enabledModal.svelte";

  export let paymentSubscription: any;
  export let paymentApparatuses: any;

  $: status = paymentSubscription.status;
  $: currentParkEntry = paymentSubscription?.currentParkEntry;
  $: disableAutoPayment =
    paymentSubscription?.currentParkEntry?.disableAutoPayment;

  const handleChangeDisable = () => {
    DisabledModal.set(true);
  };
  const handleDisableOnlyTime = () => {
    DisableOnlyTimeModal.set(true);
  };
  const handleChangeEnable = () => {
    EnableModal.set(true);
  };
</script>

<Card
  padding="none"
  size="sm"
  class="m-auto overflow-hidden shadow-none border border-[#E1E1E1] "
>
  <div
    class="flex items-center py-4 justify-center bg-gradient-to-r from-[#F8EDEC] to-[#D8E8FB] text-[#545FFF] gap-2"
  >
    <Icon name="koapass" />
    <Typography as="p">顔パス駐車</Typography>
  </div>
  <div class="p-6 max-w-sm w-full space-y-4">
    <span class="flex justify-between items-center py-1">
      <Typography as="p" size="sm" font="medium" className="text-secondary"
        >ステータス</Typography
      >
      <Badge
        rounded
        border
        customClass="tracking-[0.14px]"
        variant={currentParkEntry === null
          ? status === "ACTIVE"
            ? "success"
            : "default"
          : status === "ACTIVE"
            ? disableAutoPayment
              ? "warning"
              : "success"
            : "default"}
        text={currentParkEntry === null
          ? status === "ACTIVE"
            ? "有効"
            : "無効"
          : status === "ACTIVE"
            ? disableAutoPayment
              ? "無効 (今回のみ)"
              : "有効"
            : "無効"}
      />
    </span>
    <div>
      <Typography
        as="p"
        color="light"
        font="medium"
        size="xs"
        className=" bg-[#F8F8F8] px-[15px] py-2.5 rounded-md tracking-[0.6px]"
      >
        {currentParkEntry === null
          ? status === "ACTIVE"
            ? "顔パス駐車が有効になっています。出口のゲートは自動で開き、料金の決済も自動的に行われます。"
            : "顔パス駐車は無効となっており、クレジットカードへの請求は発生しません。駐車場の精算機にて料金の支払いをしてから出庫してください。"
          : status === "ACTIVE"
            ? disableAutoPayment
              ? "顔パス駐車は無効となっており、クレジットカードへの請求は発生しません。駐車場の精算機にて料金の支払いをしてから出庫してください。"
              : "顔パス駐車が有効になっています。出口のゲートは自動で開き、料金の決済も自動的に行われます。"
            : "顔パス駐車は無効となっており、クレジットカードへの請求は発生しません。駐車場の精算機にて料金の支払いをしてから出庫してください。"}
      </Typography>
    </div>
    <div class=" space-y-4">
      <div class="border-t py-4">
        <Typography color={"dark"} font="medium" size="sm"
          >支払い方法</Typography
        >
        {#if paymentApparatuses}
          {#each paymentApparatuses as item (item.id)}
            <div class="flex justify-between items-center mt-6">
              <Typography
                as="span"
                size="xl"
                color="light"
                className="font-fractul">**** {item.cardLast4Digits}</Typography
              >
              <Icon name="visa" />
            </div>
          {/each}
        {/if}
      </div>
      <div class="space-y-4">
        {#if currentParkEntry === null && status === "INACTIVE"}
          <Button
            size="sm"
            variant="primary"
            block={true}
            onClick={handleChangeEnable}
          >
            有効に変更
          </Button>
        {/if}
        {#if currentParkEntry === null && status === "ACTIVE"}
          <Button
            size="sm"
            variant="primary"
            block={true}
            outline={true}
            onClick={handleChangeDisable}
          >
            無効に変更
          </Button>
        {/if}
        {#if currentParkEntry !== null && status === "INACTIVE"}
          <Button
            size="sm"
            variant="primary"
            block={true}
            onClick={handleChangeEnable}
          >
            有効に変更
          </Button>
        {/if}
        {#if currentParkEntry !== null && status === "ACTIVE" && disableAutoPayment}
          <Button
            size="sm"
            variant="primary"
            block={true}
            onClick={handleChangeEnable}
          >
            有効に変更
          </Button>
          <Button
            size="sm"
            variant="primary"
            block={true}
            outline={true}
            onClick={handleChangeDisable}
          >
            無効に変更
          </Button>
        {/if}
        {#if currentParkEntry !== null && status === "ACTIVE" && !disableAutoPayment}
          <Button
            size="sm"
            variant="primary"
            block={true}
            onClick={handleDisableOnlyTime}
          >
            無効（今回のみ）に変更
          </Button>
          <Button
            size="sm"
            variant="primary"
            block={true}
            outline={true}
            onClick={handleChangeDisable}
          >
            無効に変更
          </Button>
        {/if}
      </div>
    </div>
  </div>
  <EnabledModal {paymentSubscription} />
  <AutoDisabledModal />
  {#if paymentSubscription?.currentParkEntry}
    <ThisTimeOnlyModal id={paymentSubscription?.currentParkEntry.id} />
  {/if}
</Card>
