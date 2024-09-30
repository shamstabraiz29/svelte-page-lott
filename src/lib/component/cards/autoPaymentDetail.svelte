<script lang="ts">
  import Icon from "$lib/component/icons/index.svelte";
  import Typography from "$lib/component/typography/index.svelte";

  export let title: string;
  export let subtitle: string;
  export let iconName: any;
  export let visa: any;
  export let plateValue: any;
</script>

<div class="flex flex-col gap-4">
  <div class="flex flex-row items-center gap-2.5">
    <Icon name={iconName} color="#797979" height="20px" width="20px" />
    <Typography
      as="p"
      size="sm"
      font="medium"
      color="dark"
      className="tracking-[0.14px]">{title}</Typography
    >
  </div>
  <div class="flex flex-row justify-between">
    {#if plateValue}
      <div class="flex gap-5">
        <div class="flex gap-2.5">
          <Typography
            size="base"
            color="light"
            font="medium"
            className="tracking-[0.16px]">{plateValue.city}</Typography
          >
          <Typography
            size="xl"
            color="light"
            font="normal"
            className="tracking-[0.4px] font-fractul"
            >{plateValue.small}</Typography
          >
        </div>
        <div>
          <Typography
            size="base"
            color="light"
            font="medium"
            className="tracking-[0.16px]">{plateValue.letter}</Typography
          >
        </div>
        <div>
          <Typography
            size="xl"
            color="light"
            font="normal"
            className="tracking-[0.4px] font-fractul"
            >{plateValue.large}</Typography
          >
        </div>
      </div>
    {:else if subtitle}
      <Typography
        size="xl"
        font="normal"
        color="light"
        className="font-fractul tracking-[0.6px]">{@html subtitle}</Typography
      >
    {/if}

    {#if visa}
      <Icon name="visa" />
    {/if}
  </div>
</div>
