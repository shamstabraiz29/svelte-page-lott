<script lang="ts">
  import { Badge } from "flowbite-svelte";

  export let text: string = "駐車中";
  export let rounded: boolean = true;
  export let border: boolean = false;
  export let variant: "success" | "warning" | "default" = "default";
  export let customClass: string = "";

  const variantClasses = {
    default: ` bg-[#C5C5C5] ${border ? "text-[#606060]" : "text-[#606060]"} ${
      border && "bg-opacity-10 border border-[#C5C5C5]"
    }`,
    warning: `bg-[#EBBA29]  ${border ? "text-[#EBBA29]" : "text-[#FFF]"} ${
      border && "bg-opacity-10 border border-[#EBBA29]"
    }`,
    success: `bg-[#89DAB8]  ${border ? "text-[#1AA96D]" : "text-[#FFF]"} ${
      border && "bg-opacity-10 border border-[#89DAB8]"
    }`,
  };
  $: badgeClass = `${variantClasses[variant]} ${customClass}`;
</script>

<Badge
  rounded={rounded ? true : false}
  border={border ? true : false}
  class={`gap-2 px-4 py-1.5 ${badgeClass} text-base font-bold`}
>
  <span
    class={`${
      variant === "success" && !border
        ? "dot"
        : variant === "success"
          ? "bg-success"
          : variant === "warning"
            ? "bg-[#EBBA29]"
            : "bg-[#C5C5C5]"
    } w-2 h-2 rounded-full `}
  ></span>
  {text}</Badge
>

<style>
  @keyframes colorChange {
    0% {
      background-color: white;
    }
    50% {
      background-color: #89dab8;
    }
    100% {
      background-color: white;
    }
  }
  .dot {
    animation: colorChange 2s infinite;
  }
</style>
