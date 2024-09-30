<script lang="ts">
  import { onDestroy } from "svelte";
  import { Card } from "flowbite-svelte";

  import type { EditCarModalState } from "$lib/store";
  import { EditCarModal, ShowToastError } from "$lib/store";
  import { updateMyAutoPaymentSubscription } from "../../../graphql/generated";
  import Button from "../button/index.svelte";

  export let id: string;
  export let carName: string = "";
  export let className: string = "";
  export let isScroll: boolean = false;

  let originalCarName: string = "";
  let localModal: EditCarModalState = { isOpen: false, carId: "" };
  let errorMessage: string = "";

  const unsubscribe = EditCarModal.subscribe((value) => {
    localModal = value;
    if (value.isOpen && value.carId === id) {
      originalCarName = carName;
    }
  });

  onDestroy(unsubscribe);

  $: {
    if (localModal.isOpen && isScroll) {
      document.body.style.overflow = "hidden";
      window.scrollTo({ top: 10 });
    } else {
      document.body.style.overflow = "auto";
    }
  }

  const closeModal = () => {
    EditCarModal.set({ isOpen: false, carId: "" });
    errorMessage = "";
    carName = originalCarName;
  };

  const validateCarName = () => {
    return carName.length >= 3 && carName.length <= 30;
  };
  $: {
    if (carName.length < 3 || carName.length > 30) {
      errorMessage = "3-30文字の間で入力してください";
    } else {
      errorMessage = "";
    }
  }

  const handleUpdateCarName = async () => {
    if (!validateCarName()) {
      errorMessage = "3-30文字の間で入力してください";
      return;
    }
    try {
      await updateMyAutoPaymentSubscription({
        variables: {
          id: id,
          name: carName,
        },
        refetchQueries: ["listMyAutoPaymentSubscriptions"],
      });
      closeModal();
    } catch (error) {
      ShowToastError.set({
        showToastError: true,
        text: "更新に失敗しました",
      });
      console.error(error);
    }
  };
</script>

{#if localModal.isOpen && id === localModal.carId}
  <Card
    class={`h-full w-full max-w-full bg-transparent border-none shadow-none bg-white bg-opacity-[0.7] z-40  rounded-3xl absolute top-0 left-0`}
  >
    <div
      class={`flex flex-col gap-4 justify-center items-stretch ${className} w-[350px]`}
    >
      <div class="w-full">
        <input
          bind:value={carName}
          type="text"
          class="bg-[#F0F0F0] text-[#424242] p-[15px] border-none rounded-lg text-lg font-medium leading-normal w-full tracking-[0.18px]"
          maxlength="30"
        />
        {#if errorMessage}
          <p class="text-red-500 text-sm mt-1.5">{errorMessage}</p>
        {/if}
      </div>
      <div class="flex gap-5">
        <Button
          variant="primary"
          outline={true}
          block={true}
          size="sm"
          onClick={closeModal}
          className="bg-[#FFF]">キャンセル</Button
        >
        <Button
          variant="primary"
          block={true}
          size="sm"
          onClick={handleUpdateCarName}>保存</Button
        >
      </div>
    </div>
  </Card>
{/if}
