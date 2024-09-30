<script lang="ts">
  import { Card } from "flowbite-svelte";
  import Icon from "$lib/component/icons/index.svelte";
  import Typography from "$lib/component/typography/index.svelte";
  export let title: string = "";
  export let subtitle: string = "";
  export let iconName: any;
</script>

<Card
  class="flex justify-center items-center rounded-3xl w-[350px] m-auto border-[#E1E1E1] border-2 "
>
  <div
    class=" flex flex-col items-center text-center px-4 pt-[60px] pb-[60px] gap-2.5"
  >
    <Icon name={iconName} />
    <Typography size="lg" font="bold" color="dark">{title}</Typography>
    <Typography size="sm" font="medium" color="light">{subtitle}</Typography>
  </div>
</Card>
