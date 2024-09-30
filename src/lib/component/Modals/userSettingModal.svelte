<script lang="ts">
  import { afterUpdate, onDestroy } from "svelte";
  import { Input, Modal } from "flowbite-svelte";
  import { goto } from "$app/navigation";

  import {
    UserDelete,
    userSettingModal,
    authStore,
    ShowToastError,
  } from "$lib/store";
  import Typography from "$lib/component/typography/index.svelte";
  import Button from "$lib/component/button/index.svelte";
  import Icon from "$lib/component/icons/index.svelte";
  import { logoutUser } from "$lib/utils/auth/logout";
  import { changeUserAttributes } from "../../../graphql/generated";

  let localModal = false;
  let editMode = false;
  let unsubscribe: () => void;
  let currentUser: any;
  let loading: boolean = false;
  let errorMessage: string = "";
  let tempDisplayName: string = "";

  $: localModal = $userSettingModal;
  $: {
    unsubscribe = userSettingModal.subscribe((value) => {
      localModal = value;
    });
  }

  $: unsubscribe = authStore.subscribe(({ user }) => {
    currentUser = user;
  });

  afterUpdate(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow =
        $userSettingModal || $UserDelete ? "hidden" : "auto";
    }
  });

  onDestroy(() => {
    unsubscribe();
    if (typeof document !== "undefined") {
      document.body.style.overflow = "auto";
    }
  });

  async function handleLogout() {
    $userSettingModal = false;
    try {
      await logoutUser();
      goto("/auth");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  }

  const toggleEditMode = () => {
    if (!editMode) {
      tempDisplayName = currentUser.displayName;
    } else {
      tempDisplayName = currentUser.displayName;
    }
    editMode = !editMode;
    errorMessage = "";
  };

  const handleUserDelete = () => {
    UserDelete.set(true);
    userSettingModal.set(false);
  };

  function validateDisplayName(value: string) {
    if (value.length < 3 || value.length > 30) {
      errorMessage = "3-30文字の間で入力してください";
    } else {
      errorMessage = "";
    }
  }
  const handleUpdateUserName = async () => {
    try {
      loading = true;
      await changeUserAttributes({
        variables: {
          data: {
            displayName: tempDisplayName,
          },
        },
      });
      currentUser.displayName = tempDisplayName;
      toggleEditMode();
      loading = false;
    } catch (error) {
      ShowToastError.set({
        showToastError: true,
        text: "",
      });
      loading = false;
      console.error(error);
    }
  };
  const handleCloseModel = () => {
    editMode = false;
    tempDisplayName = currentUser.displayName;
    errorMessage = "";
  };
</script>

<Modal
  bind:open={$userSettingModal}
  size="xs"
  class="modal-container rounded-[15px] max-w-[360px] shadow-xl"
  bodyClass="border-none "
  autoclose={false}
  on:close={handleCloseModel}
>
  <div class="flex flex-col items-center gap-2.5 pt-6">
    <div>
      <Icon name="user" />
    </div>
    {#if editMode}
      <div class="space-y-4 w-full mt-5">
        <Typography className="text-[#424242]" font="semibold" size="lg"
          >名前</Typography
        >
        <div class="">
          <Input
            bind:value={tempDisplayName}
            on:input={() => validateDisplayName(tempDisplayName)}
            on:change={() => validateDisplayName(tempDisplayName)}
            type="text"
            id="last_name"
            placeholder={currentUser.displayName !== null
              ? currentUser.displayName
              : "ユーザー 名"}
            required
            class="bg-[#F0F0F0] text-[#424242] p-[15px] border-none rounded-lg text-lg font-medium leading-normal w-full tracking-[0.18px]"
            maxlength="30"
          />
          {#if errorMessage}
            <div class="text-red-500">{errorMessage}</div>
          {/if}
        </div>

        <div class="flex flex-row gap-4">
          <Button
            outline={true}
            block={true}
            size="sm"
            rounded="lg"
            onClick={toggleEditMode}>キャンセル</Button
          >
          <Button
            variant="primary"
            block={true}
            size="sm"
            rounded="lg"
            {loading}
            onClick={handleUpdateUserName}
          >
            保存</Button
          >
        </div>
      </div>
    {:else}
      <div class="mt-2.5 mb-2.5 self-center">
        <Typography size="2xl" className="text-[#424242]" font="bold">
          {currentUser && currentUser.displayName !== null
            ? currentUser.displayName
            : "ユーザー 名"}
        </Typography>
      </div>
      <div
        role="button"
        aria-label="Toggle Receipt Modal"
        tabindex="0"
        on:keydown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            toggleEditMode();
          }
        }}
        class="p-2.5 self-center"
        on:click={toggleEditMode}
      >
        <Icon name="edit" />
      </div>
    {/if}
  </div>

  <div class="bg-[#E1E1E1] border"></div>
  <div class="flex flex-col gap-6 items-center">
    <Button
      outline={true}
      block={true}
      size="sm"
      rounded="lg"
      className="py-2.5"
      onClick={handleLogout}>ログアウト</Button
    >

    <Button
      outline={true}
      block={true}
      size="sm"
      rounded="lg"
      className="border-none"
      variant="danger"
      onClick={handleUserDelete}
    >
      アカウントを削除する</Button
    >
  </div>
  <div class="flex flex-col gap-5 w-full border-t border-dark-300 pt-6">
    <div class="flex flex-row gap-5 justify-between items-center w-full">
      <div>
        <Typography size="xs" font="medium" color="light"
          >プライバシーポリシー</Typography
        >
      </div>
      <div>
        <span class="border border-dark-300 h-5 w-px"></span>
      </div>
      <div>
        <Typography size="xs" font="medium" color="light"
          >Lottサービス利用規約</Typography
        >
      </div>
    </div>
    <a
      href="mailto:support@pragtech.com?subject=My Lottからのお問い合わせ&body=※円滑なサポートのためにご利用の駐車場、入庫時間とナンバープレートを必ずお書き下さい"
      class="flex flex-row justify-center items-center w-full gap-2"
    >
      <div>
        <Icon name="mail" />
      </div>
      <div>
        <Typography size="sm" font="medium" color="light"
          >お問い合わせ</Typography
        >
      </div>
    </a>
  </div>
</Modal>
