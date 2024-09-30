<script lang="ts">
  import Icon from "$lib/component/icons/index.svelte";
  import Typography from "$lib/component/typography/index.svelte";
  import { createEventDispatcher } from "svelte";

  export let isActive: boolean = false;
  let isDropdownOpen = false;
  type IconName = "edit" | "delete";

  const dispatch = createEventDispatcher();

  type DropdownItemConfig = {
    icon: IconName;
    label: string;
    onClick: () => void;
  };

  const handleOpenDeleteModal = () => {
    dispatch("openDeleteModal");
    isDropdownOpen = false;
  };

  const handleOpenEditModal = () => {
    dispatch("openEditModal");
    isDropdownOpen = false;
  };

  const dropdownItems: DropdownItemConfig[] = [
    { icon: "edit", label: "名前を変更", onClick: handleOpenEditModal },
    { icon: "delete", label: "車を削除", onClick: handleOpenDeleteModal },
  ];

  const toggleDropdown = () => {
    if (!isActive) {
      isDropdownOpen = !isDropdownOpen;
    }
  };

  function clickOutside(node: HTMLDivElement) {
    const handleClick = (event: any) => {
      if (node && !node.contains(event.target) && !event.defaultPrevented) {
        isDropdownOpen = false;
      }
    };

    document.addEventListener("click", handleClick);

    return {
      destroy() {
        document.removeEventListener("click", handleClick);
      },
    };
  }
</script>

<div class="z-0 relative">
  <button on:click|stopPropagation={toggleDropdown} type="button">
    <div id="menu-button">
      <Icon name="moreCircle" color={`${isActive ? "#C5C5C5" : "#545FFF"}`} />
    </div>
  </button>
  {#if isDropdownOpen}
    <div
      use:clickOutside
      class="z-10 block w-44 divide-y border-2 border-gray-100 px-2.5 rounded-lg absolute right-3 bg-[#FFF] shadow-lg"
      data-popper-placement="bottom"
    >
      <ul
        class="py-1 text-sm text-gray-700 dark:text-gray-200"
        aria-labelledby="dropdownDefault"
      >
        {#each dropdownItems as { icon, label, onClick }, i}
          <button
            on:click={onClick}
            class={`flex flex-row items-center w-full p-3 space-x-3 cursor-pointer ${
              i === 0 ? "" : "border-t"
            }`}
          >
            <Icon name={icon} />
            <Typography as="span" size="base" color="light" font="medium"
              >{label}</Typography
            >
          </button>
        {/each}
      </ul>
    </div>
  {/if}
</div>
