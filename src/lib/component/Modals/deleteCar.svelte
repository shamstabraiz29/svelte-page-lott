<script lang="ts">
  import { onDestroy } from "svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import { Modal } from "flowbite-svelte";

  import { DeleteCarModal, ShowToastError } from "$lib/store";
  import type { DeleteCarModalState } from "$lib/store";

  import Icon from "$lib/component/icons/index.svelte";
  import Typography from "$lib/component/typography/index.svelte";
  import Button from "../button/index.svelte";
  import { DeleteMyAutoPaymentSubscription } from "../../../graphql/generated";

  export let carName: string;
  export let id: string;
  let pathname: any;
  pathname = $page.route.id;
  let regex = /^\/car-details\//;

  let localModal: DeleteCarModalState = {
    isOpen: false,
    carId: "",
    carName: "",
  };

  $: document.body.style.overflow = $DeleteCarModal.isOpen ? "hidden" : "auto";

  const unsubscribe = DeleteCarModal.subscribe((value) => {
    localModal = value;
    document.body.style.overflow = "auto";
  });

  const handleClose = () => {
    DeleteCarModal.set({ isOpen: false, carId: "", carName: "" });
  };

  onDestroy(() => {
    unsubscribe();
    document.body.style.overflow = "auto";
  });

  const handleDeleteCar = async () => {
    try {
      await DeleteMyAutoPaymentSubscription({
        variables: {
          data: {
            id: localModal.carId,
          },
        },
        refetchQueries: ["listMyAutoPaymentSubscriptions"],
      });
      if (regex.test(pathname)) {
        goto("/");
      }
    } catch (error) {
      ShowToastError.set({
        showToastError: true,
        text: "",
      });
      console.error(error);
    }
  };
</script>

{#if localModal.isOpen && id === localModal.carId}
  <Modal
    bind:open={$DeleteCarModal.isOpen}
    size="xs"
    autoclose
    bodyClass="border-none"
    class="modal-container shadow-xl rounded-[15px] max-w-[360px]"
  >
    <div class="flex flex-col items-center gap-5 pt-6">
      <Icon name="delete" />
      <div class="text-center">
        <Typography size="2xl" color="dark" font="bold" as="h1"
          >以下の車を</Typography
        >
        <Typography size="2xl" color="dark" font="bold" as="h1"
          >削除しますか？</Typography
        >
      </div>
      <Typography
        size="xl"
        color="dark"
        font="bold"
        as="span"
        className={"rounded-lg border border-solid border-[#E1E1E1] bg-[#F8F8F8] w-full text-center p-3"}
        >{localModal.carName || carName}</Typography
      >
      <div class="text-center leading-4">
        <Typography size="base" color="light" font="medium" as="h1"
          >車を削除すると、顔パス駐車が無効になります。再登録は、Lott駐車場の精算機にて行なえます。</Typography
        >
      </div>
      <div class="w-full flex flex-col gap-5 mt-[15px]">
        <Button block size="sm" variant="danger" onClick={handleDeleteCar}
          >削除する</Button
        >
        <Button block size="sm" outline onClick={handleClose}>キャンセル</Button
        >
      </div>
    </div>
  </Modal>
{/if}
