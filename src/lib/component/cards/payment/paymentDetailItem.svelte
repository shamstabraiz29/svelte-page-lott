<script lang="ts">
  import Icon from "$lib/component/icons/index.svelte";
  import Typography from "$lib/component/typography/index.svelte";

  export let title: string;
  export let subtitle: string;
  export let iconName: any;
  export let visa: any;
  export let width: string = "";
  export let height: string = "";
  export let color: string = "";
</script>

<div class="flex flex-col gap-3">
  <div class="flex flex-row items-center gap-3">
    <Icon name={iconName} {color} {height} {width} />
    <Typography as="p" size="base" font="medium" color="dark"
      >{title}</Typography
    >
  </div>
  <div class="flex flex-row justify-between">
    <Typography size="xl" font="normal" color="light" className="font-fractul"
      >{@html subtitle}</Typography
    >
    {#if visa}
      <Icon name="visa" />
    {/if}
  </div>
</div>
