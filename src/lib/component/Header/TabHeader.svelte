<script lang="ts">
  import { page } from "$app/stores";
  import PaymentIcon from "$lib/component/icons/PaymentIcon.svelte";
  import CarIcon from "$lib/component/icons/carIcon.svelte";

  let currentRoute = $page;

  function isActiveRoute(route: any) {
    return currentRoute.url.pathname === route;
  }
</script>

<div class="flex items-center justify-center gap-10 py-4">
  {#each ["/my-cars", "/payments"] as route}
    <div class="flex flex-col justify-center items-center gap-y-1.5">
      <a
        href={`${route}`}
        class={`
          w-[70px] h-[70px] flex justify-center items-center rounded-full
          ${
            isActiveRoute(route)
              ? "bg-[#FFF] border-[3px] shadow-lg border-solid border-[#A0A7FF]"
              : "bg-white bg-opacity-10"
          }
          transition-colors duration-300 ease-in-out hover:bg-gray-200
        `}
      >
        {#if route === "/my-cars"}
          <CarIcon color={`${isActiveRoute(route) ? "#545FFF" : "#FFF"}`} />
        {:else if route === "/payments"}
          <PaymentIcon color={`${isActiveRoute(route) ? "#545FFF" : "#FFF"}`} />
        {/if}
      </a>
      <div>
        <p
          class={`
            text-base font-bold leading-normal
            ${
              isActiveRoute(route)
                ? "text-[#FFF]"
                : "text-[#FFF] text-opacity-[0.5]"
            }`}
        >
          {#if route === "/my-cars"}私の車
          {:else}支払い履歴{/if}
        </p>
      </div>
    </div>
  {/each}
</div>
