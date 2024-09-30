<script lang="ts">
  import { onDestroy } from "svelte";
  import { page } from "$app/stores";
  import { format } from "date-fns";

  import authStore, {
    DeleteCarModal,
    EditCarModal,
    ShowToastError,
  } from "$lib/store";
  import Header from "$lib/component/Header/index.svelte";
  import Typography from "$lib/component/typography/index.svelte";
  import Analytics from "$lib/component/cards/cars/Analytics.svelte";
  import CarDetailTab from "$lib/component/tabs/carDetailTab.svelte";
  import Badge from "$lib/component/badge/index.svelte";
  import {
    getMyAutoPaymentSubscription,
    type GetMyAutoPaymentSubscriptionQuery,
  } from "../../../graphql/generated";
  import EditMyCar from "$lib/component/Modals/editCar.svelte";
  import DeleteMyCarModal from "$lib/component/Modals/deleteCar.svelte";
  import Loader from "$lib/component/loader/index.svelte";
  import Footer from "$lib/component/footer/index.svelte";

  let error: string = "";
  let isLoading: boolean = false;
  let isEditModalOpen = false;
  let paymentSubscription: GetMyAutoPaymentSubscriptionQuery["getMyAutoPaymentSubscription"];
  let paymentApparatuses: GetMyAutoPaymentSubscriptionQuery["listMyPaymentApparatuses"] =
    [];
  [];

  const unsubscribe = EditCarModal.subscribe(($EditCarModal) => {
    isEditModalOpen =
      $EditCarModal.isOpen && $EditCarModal.carId === $page.params.id;
  });

  $: {
    if ($authStore.isLoggedIn) {
      getMyAutoPaymentSubscription({
        variables: {
          id: $page.params.id,
        },
      }).subscribe(({ data, loading, errors }) => {
        if (data) {
          paymentSubscription = data?.getMyAutoPaymentSubscription;
          paymentApparatuses = data?.listMyPaymentApparatuses || [];
        } else if (errors) {
          ShowToastError.set({
            showToastError: true,
            text: "",
          });
          error = errors.map((e) => e.message).join(", ");
          console.error("Error in getMyAutoPaymentSubscription:", error);
        }
        isLoading = loading;
      });
    }
  }

  const openEditCarModal = (id: string) => {
    EditCarModal.set({ isOpen: true, carId: id });
  };
  const openDeleteCarModal = (carId: string) => {
    DeleteCarModal.set({ isOpen: true, carId: carId, carName: "" });
  };
  onDestroy(unsubscribe);
</script>

<svelte:head>
  <title
    >My Lott | 車両詳細{paymentSubscription?.name
      ? ` - ${paymentSubscription?.name}`
      : ""}</title
  >
</svelte:head>

<div class="relative">
  <Header
    title="車の詳細"
    isActive={paymentSubscription?.currentParkEntry !== null ? true : false}
    on:openEditModal={() => openEditCarModal($page.params.id)}
    on:openDeleteModal={() => openDeleteCarModal($page.params.id)}
  />
  <div class="container-class flex flex-col gap-[35px] px-4 pt-24 min-h-screen">
    {#if isLoading}
      <div class="w-full flex items-center justify-center h-[30svh]">
        <Loader />
      </div>
    {:else if paymentSubscription}
      <div class="flex flex-col gap-[23px]">
        <div class="text-center space-y-2">
          {#if paymentSubscription.currentParkEntry}
            <div>
              <Badge
                rounded
                variant="success"
                text="駐車中"
                customClass="tracking-[3.2px]"
              />
            </div>
          {/if}
          <div class="flex flex-col gap-[23px]  w-[350px]">
            <div class={isEditModalOpen ? "my-16" : ""}>
              <EditMyCar
                id={$page.params.id}
                className="absolute left-1/2 transform -translate-x-1/2 top-24"
                carName={paymentSubscription.name}
                isScroll={true}
              />
            </div>
            {#if !isEditModalOpen}
              <div>
                <Typography as="h1" size="4xl" font="bold" color="dark">
                  {paymentSubscription.name}
                </Typography>
              </div>
            {/if}

            {#if paymentSubscription.currentParkEntry === null}
              {#if paymentSubscription.lastParkEntry}
                <div class="flex flex-col gap-[3px] my-3">
                  <Typography as="h4" size="sm" font="medium" color="light">
                    最後の駐車
                  </Typography>
                  <Typography
                    as="h2"
                    size="2xl"
                    font="normal"
                    color="light"
                    className="font-fractul"
                  >
                    {format(
                      new Date(paymentSubscription.lastParkEntry.enteredAt),
                      "yyyy/MM/dd HH:mm"
                    )}
                  </Typography>
                </div>
              {/if}
            {/if}
          </div>
        </div>
        {#if paymentSubscription.currentParkEntry}
          <div>
            <Analytics
              ReceiptTime={paymentSubscription.currentParkEntry.enteredAt}
              UtilizationTime={paymentSubscription.currentParkEntry
                .elapsedSeconds}
              currentAmount={paymentSubscription.currentParkEntry.currentFare}
            />
          </div>
        {/if}
      </div>
      <div>
        <CarDetailTab
          openDeleteModal={() => openDeleteCarModal($page.params.id)}
          {paymentSubscription}
          {paymentApparatuses}
        />
      </div>
      <DeleteMyCarModal
        id={$page.params.id}
        carName={paymentSubscription.name}
      />
    {/if}
  </div>
  <div class="py-10">
    <Footer />
  </div>
</div>
