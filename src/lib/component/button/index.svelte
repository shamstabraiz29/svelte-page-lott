<script lang="ts">
  import Loader from "$lib/component/loader/index.svelte";

  export let outline: boolean = false;
  export let loading: boolean = false;
  export let block: boolean = false;
  export let disabled: boolean = false;
  export let isDisableGray: boolean = false;
  export let size: "xs" | "sm" | "md" | "lg" = "md";
  export let rounded: "sm" | "md" | "lg" | "xl" | "full" = "md";
  export let type: "button" | "submit" = "button";
  export let className: string = "";
  export let onClick: () => void = () => null;
  export let variant: "primary" | "secondary" | "light" | "success" | "danger" =
    "primary";

  const baseClasses =
    "flex justify-center items-center transition-all duration-150 text-base font-medium leading-6 tracking-tighter";
  const blockClass = block ? "w-full" : "";
  const sizeClasses = {
    xs: "px-2 py-1 text-xs ",
    sm: "px-4 py-2.5 text-base leading-6",
    md: "px-6 py-4 text-base",
    lg: "px-5 py-2 text-lg",
  };
  const roundedClasses = {
    sm: "rounded",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    full: "rounded-full",
  };
  const varientClasses = {
    primary: "bg-primary  text-white border border-primary",
    secondary: "bg-white text-primary ",
    light: "bg-light  text-gray-800",
    success: "bg-green-500  border border-green-600 text-white",
    danger: "bg-danger  text-white border border-danger",
  };
  const outlineVarientClasses = {
    primary: "border border-primary text-primary ",
    secondary: "",
    light: "bg-light text-primary ",
    success: "border border-green-500 text-white ",
    danger: "border border-danger text-danger ",
  };
  const disabledClasses = "opacity-30 bg-[#C5C5C5] cursor-not-allowed";
  const loadingClasses = "cursor-wait";
  const disabledGrayClass = "bg text-white border-none";

  $: buttonClasses = `${baseClasses} ${blockClass} ${sizeClasses[size]} ${
    roundedClasses[rounded]
  } 
        ${outline ? outlineVarientClasses[variant] : varientClasses[variant]} 
        ${
          disabled === true
            ? isDisableGray
              ? disabledGrayClass
              : disabledClasses
            : ""
        } ${loading ? loadingClasses : ""} ${className}`;

  $: if (loading) {
    disabled = true;
  }
</script>

<button class={buttonClasses} {disabled} {type} on:click={onClick}>
  {#if loading}
    <Loader size="sm" color="#FFFF" />
  {:else}
    <slot />
  {/if}
</button>

<style>
  .custom-button {
    border: 1px solid #545fff;
    box-shadow: 0px 4px 6px -1px rgba(0, 0, 0, 0.15);
  }
  .bg {
    background-color: #c5c5c5;
  }
</style>
