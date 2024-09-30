<script lang="ts">
  import Typography from "$lib/component/typography/index.svelte";

  export let color: string = "dark-10";

  const currentYear = new Date().getFullYear();
</script>

<div class="flex justify-center">
  <Typography as="p" size="xs" font="medium" {color}>
    <span class="font-fractul">©{currentYear}</span>, Pragtech
  </Typography>
</div>
