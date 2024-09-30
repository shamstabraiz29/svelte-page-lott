<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";

  import { auth } from "$lib/utils/auth/init";
  import { updateClientWithIdToken } from "$lib/graphql/apollo";
  import Toast from "$lib/component/toaster/index.svelte";

  import authStore from "$lib/store";
  import "./app.css";

  updateClientWithIdToken();

  onMount(() => {
    authStore.subscribe(async ({ isLoggedIn }) => {
      const path = $page.url.pathname;
      const isAuthLinkRoute = path.startsWith("/authlink/");
      const publicPaths = path.startsWith("/auto-payment-applications/");
      if (isLoggedIn === false && !publicPaths && !isAuthLinkRoute) {
        await goto("/auth");
      }
    });
    auth.onAuthStateChanged(async (user) => {
      if (!!user) {
        const idToken = await user.getIdToken();
        updateClientWithIdToken(idToken);
        authStore.set({
          isLoggedIn: true,
          user: {
            uid: user.uid,
            displayName: user.displayName as string,
            photoUrl: user.photoURL as string,
            providerId: user.providerId,
          },
          idToken,
        });
      } else {
        authStore.set({
          isLoggedIn: false,
          user: null,
          idToken: null,
        });
      }
    });
  });
</script>

<div class="app mx-auto">
  <main>
    <slot />
  </main>
  <div id="recaptcha-container"></div>
  <div>
    <Toast
      type="error"
      message={"申し訳ありませんが、失敗しました。少し時間をおいて再度お試し下さい。"}
    />
  </div>
</div>
