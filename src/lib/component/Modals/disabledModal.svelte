<script lang="ts" m>
  import { page } from "$app/stores";
  import { onDestroy } from "svelte";
  import { Modal } from "flowbite-svelte";

  import Icon from "$lib/component/icons/index.svelte";
  import Typography from "$lib/component/typography/index.svelte";
  import Button from "$lib/component/button/index.svelte";
  import { DisabledModal, ShowToastError } from "$lib/store";
  import {
    AutoPaymentSubscriptionStatus,
    UpdateAutoPaymentSubscription,
  } from "../../../graphql/generated";

  let localModal;
  let isLoading = false;
  const unsubscribe = DisabledModal.subscribe((value) => {
    localModal = value;
  });

  $: document.body.style.overflow = $DisabledModal ? "hidden" : "auto";

  onDestroy(unsubscribe);

  const closeModal = () => {
    DisabledModal.set(true);
  };

  onDestroy(() => {
    unsubscribe();
    document.body.style.overflow = "auto";
  });

  const handleDisableAutoPayment = async () => {
    try {
      await UpdateAutoPaymentSubscription({
        variables: {
          id: $page.params.id,
          status: AutoPaymentSubscriptionStatus.Inactive,
        },
        refetchQueries: ["getMyAutoPaymentSubscription"],
      });
      isLoading = false;
    } catch (error) {
      ShowToastError.set({
        showToastError: true,
        text: "",
      });
      console.error(error);
    }
  };
</script>

<Modal
  bind:open={$DisabledModal}
  size="xs"
  autoclose
  bodyClass="border-none"
  class="modal-container max-w-[360px] shadow-xl"
>
  <div class=" flex flex-col items-center gap-5 text-center pt-6">
    <Icon name="off" />
    <Typography size="2xl" font="bold" color="dark" className="px-8">
      顔パス駐車を <span class="text-[#797979]">無効</span> に 変更しますか？
    </Typography>
    <Typography size="base" color={"light"} font="medium" className="pb-3.5 ">
      顔パス駐車は、このアプリケーションを通じて、または次回Lott駐車場をご利用の際に再び有効化することができます。
    </Typography>
    <Button
      block
      size="sm"
      variant={"primary"}
      onClick={handleDisableAutoPayment}>はい</Button
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
