<script lang="ts">
  import Typography from "$lib/component/typography/index.svelte";

  export let carImg: string;
  export let city: string | null | undefined;
  export let small: string | null | undefined;
  export let letter: string | null | undefined;
  export let large: string | null | undefined;
</script>

<div class="relative w-full">
  <img
    alt="img"
    class="w-full rounded-2xl border shadow-sm object-cover"
    src={carImg}
  />
  <div
    class="absolute inset-x-0 -bottom-5
     flex justify-center gap-5 left-1/2 transform -translate-x-1/2 bg-white
     rounded-[10px] pt-2.5 pb-2 px-5 w-[245px] border border-light"
  >
    <div class="flex gap-2.5">
      <Typography
        size="base"
        color="light"
        font="medium"
        className="tracking-[0.16px]">{city}</Typography
      >
      <Typography
        size="xl"
        color="light"
        font="normal"
        className="tracking-[0.4px] font-fractul">{small}</Typography
      >
    </div>
    <div>
      <Typography
        size="base"
        color="light"
        font="medium"
        className="tracking-[0.16px]">{letter}</Typography
      >
    </div>
    <div>
      <Typography
        size="xl"
        color="light"
        font="normal"
        className="tracking-[0.4px] font-fractul">{large}</Typography
      >
    </div>
  </div>
</div>
