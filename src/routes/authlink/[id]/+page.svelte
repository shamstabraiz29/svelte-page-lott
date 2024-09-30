<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { signInWithCustomToken } from "firebase/auth";
  import Loader from "$lib/component/loader/index.svelte";

  import {
    getAuthenticatedUrl,
    type GetAuthenticatedUrlQuery,
  } from "../../../graphql/generated";
  import { auth } from "$lib/utils/auth/init";

  let id = $page.params.id;
  let AuthenticatedUrlData: GetAuthenticatedUrlQuery["getAuthenticatedUrl"];

  onMount(() => {
    if (id) {
      fetchAuthDetails(id);
    } else {
      console.error("No ID found in URL");
    }
  });

  async function fetchAuthDetails(id: string) {
    await getAuthenticatedUrl({ variables: { data: { id } } }).subscribe(
      ({ data, error }) => {
        AuthenticatedUrlData = data.getAuthenticatedUrl;

        if (AuthenticatedUrlData) {
          authenticateUser(
            AuthenticatedUrlData.customToken,
            AuthenticatedUrlData.url
          );
        }

        if (error) {
          console.error("Error fetching auth details:", error);
          alert("有効期限が過ぎたリンクです。");
        }
      }
    );
  }

  function authenticateUser(token: string, redirectUrl: string) {
    signInWithCustomToken(auth, token)
      .then(() => {
        goto(redirectUrl);
      })
      .catch((error) => {
        console.error("Authentication failed:", error);
        alert("有効期限が過ぎたリンクです。");
      });
  }
</script>

<svelte:head>
  <title>認証中・・・</title>
</svelte:head>

<div class="py-8 px-4 h-screen text-center">
  <Loader />
</div>
