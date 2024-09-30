<script lang="ts">
  import { afterUpdate } from "svelte";
  import { page } from "$app/stores";

  import BgCar from "$lib/images/background.png";
  import BgAuth from "$lib/images/bg.png";

  import Footer from "$lib/component/footer/index.svelte";

  let pathname: any;

  afterUpdate(() => {
    pathname = $page.route.id;
  });
</script>

<div
  class=" flex flex-col bg-cover bg-center overflow-auto"
  style="background-image: url('{pathname === '/auth' ? BgCar : BgAuth}')"
>
  <div class="min-h-[90svh]">
    <slot />
  </div>
  <div class="min-h-[10svh] py-6">
    <Footer color="white" />
  </div>
</div>
