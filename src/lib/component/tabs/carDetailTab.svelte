<script lang="ts">
  import { Tabs, TabItem } from "flowbite-svelte";

  import FacePassParking from "$lib/component/cards/cars/facePassParking.svelte";
  import CarInfo from "../cards/cars/carInfo.svelte";
  import PaymentHistory from "$lib/component/cards/payment/paymentHistory.svelte";
  import Button from "$lib/component/button/index.svelte";

  export let paymentSubscription: any;
  export let paymentApparatuses: any;
  export let openDeleteModal: () => void;
</script>

<div>
  <Tabs
    class="grid grid-cols-2 p-[5px] items-center rounded-[15px]  bg-[#F0F0F0]"
    style="pill"
    contentClass="bg-none py-5 m-0 "
  >
    <TabItem
      activeClasses="bg-[#FFF] text-[#545FFF] rounded-[10px] border border-[#E1E1E1] px-4 py-4 h-[40px] shadow-md"
      defaultClass=" w-full p-0 flex justify-center items-center  "
      inactiveClasses=" text-[#797979]"
      open={true}
    >
      <span
        slot="title"
        class="capitalize text-sm font-medium leading-normal tracking-tighter"
        >詳細</span
      >
      <div class="space-y-10">
        {#if paymentSubscription}
            <CarInfo
              letter={paymentSubscription.letter}
              city={paymentSubscription.city}
              small={paymentSubscription.small}
              large={paymentSubscription.large}
              carImg={paymentSubscription?.image.imageUrl}
            />
          <div class="flex flex-col gap-5">
            <FacePassParking {paymentApparatuses} {paymentSubscription} />
            {#if paymentSubscription.currentParkEntry === null}
              <div class="px-1">
                <Button
                  onClick={openDeleteModal}
                  variant="danger"
                  size="sm"
                  block>この車を削除します</Button
                >
              </div>
            {/if}
          </div>
        {/if}
      </div>
    </TabItem>
    <TabItem
      activeClasses="bg-[#FFF] text-[#545FFF] rounded-[10px] border border-[#E1E1E1] px-4 py-4 h-[40px] shadow-md"
      defaultClass=" w-full p-0 flex justify-center items-center"
      inactiveClasses="text-[#797979]"
    >
      <span
        slot="title"
        class="capitalize text-sm font-medium leading-normal tracking-tighter"
        >支払い履歴</span
      >
      <PaymentHistory {paymentSubscription} />
    </TabItem>
  </Tabs>
</div>
