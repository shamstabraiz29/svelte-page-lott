<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  import { Navbar } from "flowbite-svelte";

  import { ReceiptModal } from "$lib/store";

  import Icon from "$lib/component/icons/index.svelte";
  import Typography from "$lib/component/typography/index.svelte";
  import ReceiptDownloadModal from "$lib/component/Modals/receiptModal.svelte";
  import DropdownMenu from "$lib/component/dropdownMenu/index.svelte";

  export let title: string;
  export let isActive: boolean = false;

  let pathname: any;
  let renderedIcon: any;
  let renderedTitle = "";
  let regex = /^\/car-details\/\[\w+\]$/;
  pathname = $page.route.id;

  $: {
    if (title === "車の詳細") {
      renderedTitle = "車の詳細";
      renderedIcon = "moreCircle";
    } else if (title === "支払い詳細") {
      renderedTitle = "支払い詳細";
      renderedIcon = "pdfDownload";
    } else {
      renderedTitle = title;
      renderedIcon = "defaultIcon";
    }
  }
  const openModal = () => {
    if (title === "支払い詳細") {
      ReceiptModal.set(true);
    }
  };

  const goBack = () => {
    if (regex.test(pathname)) {
      goto("/my-cars");
    } else {
      history.back();
    }
  };
</script>

<Navbar class="fixed bg p-4 z-20">
  <button class="cursor-pointer flex flex-row items-center" on:click={goBack}>
    <Icon name="chevronLeft" />
    {#if title === "車の詳細"}
      <Typography size="sm" color="dark" font="bold">一覧</Typography>
    {/if}
  </button>
  <div class={title === "車の詳細" ? "mr-5" : ""}>
    <Typography size="base" className="text-[#797979]" font="medium"
      >{renderedTitle}</Typography
    >
  </div>
  {#if title === "車の詳細"}
    <DropdownMenu {isActive} on:openEditModal on:openDeleteModal />
  {:else}
    <button class="cursor-pointer mr-1" on:click={openModal}>
      <Icon name={renderedIcon} color="#C5C5C5" width="26" height="26" />
    </button>
  {/if}
  {#if title === "支払い詳細"}
    <ReceiptDownloadModal />
  {/if}
</Navbar>
