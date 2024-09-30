<script lang="ts">
  import { afterUpdate, onDestroy } from "svelte";
  import { Modal } from "flowbite-svelte";
  import { goto } from "$app/navigation";
  import {
    UserDelete,
    authStore,
    userSettingModal,
    ShowToastError,
  } from "$lib/store";

  import Icon from "$lib/component/icons/index.svelte";
  import Typography from "$lib/component/typography/index.svelte";
  import Button from "../button/index.svelte";
  import {
    DeleteUser,
    listMyAutoPaymentSubscriptions,
    type ListMyAutoPaymentSubscriptionsQuery,
  } from "../../../graphql/generated";

  let carsList: ListMyAutoPaymentSubscriptionsQuery["listMyAutoPaymentSubscriptions"] =
    [];
  let confrimDelete = false;
  let localModal = false;
  let unsubscribe: () => void;
  let userUid: string | undefined = "";

  $: localModal = $UserDelete;
  $: {
    unsubscribe = UserDelete.subscribe((value) => {
      localModal = value;
    });
    unsubscribe = authStore.subscribe(({ user }) => {
      userUid = user?.uid;
    });
  }

  afterUpdate(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = $UserDelete ? "hidden" : "auto";
    }
  });

  $: {
    if ($authStore.isLoggedIn) {
      listMyAutoPaymentSubscriptions({}).subscribe(({ data, errors }) => {
        if (data) {
          carsList = data.listMyAutoPaymentSubscriptions;
        } else if (errors) {
          ShowToastError.set({
            showToastError: true,
            text: "",
          });
        }
      });
    }
  }

  $: sortedcarsList = carsList
    ? [...carsList].sort((a, b) => {
        if (a.currentParkEntry !== null && b.currentParkEntry === null) {
          return -1;
        }
        if (b.currentParkEntry !== null && a.currentParkEntry === null) {
          return 1;
        }
        return 0;
      })
    : [];

  onDestroy(() => {
    unsubscribe();
    if (typeof document !== "undefined") {
      document.body.style.overflow = "auto";
    }
  });

  const handleCancel = () => {
    $UserDelete = false;
    confrimDelete = false;
    userSettingModal.set(true);
  };

  const handleConfrim = () => {
    confrimDelete = true;
  };
  const handleConfrimDeleteUser = async () => {
    try {
      await DeleteUser({
        refetchQueries: [
          "listMyAutoPaymentSubscriptions",
          "listMyPaidParkEntries",
        ],
      });
      goto("/auth");
      $UserDelete = false;
    } catch (error) {
      ShowToastError.set({
        showToastError: true,
        text: "",
      });
      console.error(error);
    }
  };
  const handleCloseModel = () => {
    $UserDelete = false;
    confrimDelete = false;
  };
</script>

<Modal
  bind:open={$UserDelete}
  size="xs"
  bodyClass="border-none"
  class="modal-container rounded-[15px] max-w-[360px] shadow-xl"
  on:close={handleCloseModel}
>
  <div class="flex flex-col items-center gap-5 pt-6">
    <Icon name="warning" />
    {#if confrimDelete}
      <div class="text-center">
        <Typography size="2xl" color="dark" font="bold" as="h1" className="px-2"
          >アカウントを削除すると、以下の車も削除されます。よろしいですか？</Typography
        >
      </div>
      <div class="flex flex-col w-full gap-2">
        {#each sortedcarsList as item, index}
          {#if index < 2}
            <Typography
              size="lg"
              color="dark"
              font="medium"
              className="rounded-lg border border-solid border-[#E1E1E1] bg-[#F8F8F8] w-full text-center p-3"
            >
              {item.name}
            </Typography>
          {/if}
        {/each}

        {#if sortedcarsList.length > 2}
          <Typography className="text-center font-fractul">
            と {carsList.length - 2} 台 の車両
          </Typography>
        {/if}
      </div>

      <div class="text-center">
        <Typography size="base" color="light" font="medium" as="p"
          >再登録は、Lott駐車場の精算機にて 行なえます。</Typography
        >
      </div>
      <Button block size="sm" variant="danger" onClick={handleConfrimDeleteUser}
        >削除する</Button
      >
    {:else}
      <div class="text-center">
        <Typography size="2xl" color="dark" font="bold" as="h1"
          >アカウントを</Typography
        >
        <Typography size="2xl" color="dark" font="bold" as="h1"
          >削除しますか？</Typography
        >
      </div>

      <div class="text-center">
        <Typography
          size="base"
          color="light"
          font="medium"
          as="p"
          className="px-3"
          >アカウントを削除すると、マイページと
          顔パス駐車がご利用できなくなります。再登録は、Lott駐車場の精算機にて
          行なえます。</Typography
        >
      </div>
      <Button block size="sm" variant="primary" onClick={handleConfrim}
        >削除する</Button
      >
    {/if}
    <Button block size="sm" outline onClick={handleCancel}>キャンセル</Button>
  </div>
</Modal>
