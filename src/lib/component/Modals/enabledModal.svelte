<script lang="ts">
  import { onDestroy } from "svelte";
  import { page } from "$app/stores";
  import { Modal } from "flowbite-svelte";

  import { EnableModal, ShowToastError } from "$lib/store";

  import Icon from "$lib/component/icons/index.svelte";
  import Typography from "$lib/component/typography/index.svelte";
  import Button from "$lib/component/button/index.svelte";
  import {
    AutoPaymentSubscriptionStatus,
    UpdateAutoPaymentSubscription,
    UpdateParkEntry,
  } from "../../../graphql/generated";

  export let paymentSubscription: any;

  let localModal;

  const unsubscribe = EnableModal.subscribe((value) => {
    localModal = value;
  });

  $: document.body.style.overflow = $EnableModal ? "hidden" : "auto";

  onDestroy(unsubscribe);

  const closeModal = () => {
    EnableModal.set(false);
  };

  onDestroy(() => {
    unsubscribe();
    document.body.style.overflow = "auto";
  });

  const handleUpdateAutoPaymentSubscription = async () => {
    try {
      await UpdateAutoPaymentSubscription({
        variables: {
          id: $page.params.id,
          status: AutoPaymentSubscriptionStatus.Active,
        },
        refetchQueries: ["getMyAutoPaymentSubscription"],
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handleUpdateParkEntry = async () => {
    try {
      await UpdateParkEntry({
        variables: {
          id: paymentSubscription.currentParkEntry.id,
          disableAutoPayment: false,
        },
        refetchQueries: ["getMyAutoPaymentSubscription"],
      });
    } catch (error) {
      ShowToastError.set({
        showToastError: true,
        text: "",
      });
      console.error(error);
    }
  };

  const handleEnableAutoPayment = () => {
    if (paymentSubscription.currentParkEntry !== null) {
      handleUpdateAutoPaymentSubscription();
      handleUpdateParkEntry();
    } else {
      handleUpdateAutoPaymentSubscription();
    }
  };
</script>

<Modal
  bind:open={$EnableModal}
  size="xs"
  autoclose
  bodyClass="border-none"
  class="modal-container max-w-[360px] shadow-xl"
>
  <div class=" flex flex-col items-center gap-5 text-center pt-6">
    <Icon name="on" />
    <Typography size="2xl" font="bold" color="dark" className="px-8">
      顔パス駐車を <span class="text-[#1AA96D]">有効</span> に 変更しますか？
    </Typography>
    <Typography
      size="base"
      color={"light"}
      font="medium"
      className="pb-3.5 px-8"
    >
      今回の駐車より、顔パス駐車が 適用されます。
    </Typography>
    <Button
      block
      size="sm"
      variant={"primary"}
      onClick={handleEnableAutoPayment}>はい</Button
    >
    <Button
      block
      size="sm"
      variant={"primary"}
      outline={true}
      onClick={closeModal}>いいえ</Button
    >
  </div>
</Modal>
