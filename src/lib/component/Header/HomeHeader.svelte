<script lang="ts">
  import { userSettingModal } from "$lib/store";

  import Icon from "$lib/component/icons/index.svelte";
  import UserSettingModal from "$lib/component/Modals/userSettingModal.svelte";
  import UserAccountDelete from "$lib/component/Modals/userAccountDelete.svelte";
  import backgroundImage from "$lib/images/bg.png";

  const openModal = () => {
    userSettingModal.set(true);
  };
</script>

<div
  class="fixed w-full z-50 bg-cover bg-no-repeat py-6 px-10 grid grid-cols-8"
  style="background-image: url('{backgroundImage}')"
>
  <div />
  <div class="col-span-6 m-auto">
    <Icon name="logo" />
  </div>
  <div class="col-span-1">
    <button on:click={openModal}>
      <Icon name="userOutline" />
    </button>
  </div>
  <UserSettingModal />
  <UserAccountDelete />
</div>
