<script lang="ts">
  import Typography from "$lib/component/typography/index.svelte";

  export let title: string = "";
  export let subtitle: string = "";
</script>

<div class="space-y-1 text-center">
  <Typography size="sm" color="light" font="medium">{title}</Typography>
  <Typography size="3xl" font="normal" color="dark" className="font-fractul"
    >{@html subtitle}</Typography
  >
</div>
