<script lang="ts">
  import type { TypographyProps } from "./types";

  export let as: TypographyProps["as"] = "p";
  export let className: string = "";
  export let size: string = "";
  export let color: string = "";
  export let font: string = "normal";

  const generateClassString = (className: string): string => {
    const fontSizeClass = size
      ? {
          xs: "text-xs",
          sm: "text-sm",
          base: "text-base",
          md: "text-[17px]",
          lg: "text-lg",
          xl: "text-xl",
          "2xl": "text-2xl",
          "3xl": "text-[28px]",
          "4xl": "text-[32px]",
          "5xl": "text-[50px]",
        }[size]
      : "text-base";

    const colorClass = color
      ? {
          primary: "text-primary",
          secondary: "text-secondary",
          light: "text-[#797979] ",
          white: "text-white",
          error: "text-red-600",
          success: "text-success",
          dark: "text-[#424242]",
          "dark-10": "text-[#8E8E8E]",
        }[color]
      : "";

    const fontWeightClass = font
      ? {
          light: "font-light",
          normal: "font-normal",
          medium: "font-medium",
          semibold: "font-semibold",
          bold: "font-bold",
        }[font]
      : "";

    return `typography ${fontSizeClass} ${colorClass} ${fontWeightClass} ${className}`;
  };

  $: classString = generateClassString(className);
</script>

<svelte:element this={as} class={classString}>
  <slot />
</svelte:element>
