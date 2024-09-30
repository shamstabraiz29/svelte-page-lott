<script lang="ts">
  import { onDestroy } from "svelte";
  import { Modal } from "flowbite-svelte";

  import Icon from "$lib/component/icons/index.svelte";
  import Typography from "$lib/component/typography/index.svelte";
  import Button from "$lib/component/button/index.svelte";
  import { DisableOnlyTimeModal, ShowToastError } from "$lib/store";
  import { UpdateParkEntry } from "../../../graphql/generated";

  export let id: string = "";

  let localModal;

  const unsubscribe = DisableOnlyTimeModal.subscribe((value) => {
    localModal = value;
  });

  $: document.body.style.overflow = $DisableOnlyTimeModal ? "hidden" : "auto";

  onDestroy(unsubscribe);

  const closeModal = () => {
    DisableOnlyTimeModal.set(false);
  };

  onDestroy(() => {
    unsubscribe();
    document.body.style.overflow = "auto";
  });

  const handleDisableAutoPaymentOnlyTime = async () => {
    try {
      await UpdateParkEntry({
        variables: {
          id: id,
          disableAutoPayment: true,
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
</script>

<Modal
  bind:open={$DisableOnlyTimeModal}
  size="xs"
  autoclose
  bodyClass="border-none"
  class="modal-container max-w-[360px] shadow-xl"
>
  <div class=" flex flex-col items-center gap-5 text-center pt-6">
    <Icon name="pause" />
    <Typography size="2xl" font="bold" color="dark" className="px-4">
      顔パス駐車を <span class="text-[#EBBA29]">無効 (今回のみ)</span> に 変更しますか？
    </Typography>
    <Typography size="base" color={"light"} font="medium" className="pb-3.5">
      顔パス駐車は、次回ご利用時に 再び有効化されます。
    </Typography>
    <Button
      block
      size="sm"
      variant={"primary"}
      onClick={handleDisableAutoPaymentOnlyTime}>はい</Button
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
