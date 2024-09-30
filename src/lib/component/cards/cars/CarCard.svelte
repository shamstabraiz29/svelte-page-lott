<script lang="ts">
  import { onDestroy } from "svelte";
  import { goto } from "$app/navigation";
  import { format } from "date-fns";

  import { DeleteCarModal, EditCarModal } from "$lib/store";
  import { formatPrice, formatTime } from "$lib/helpers";

  import Typography from "$lib/component/typography/index.svelte";
  import Button from "$lib/component/button/index.svelte";
  import TimeAmount from "./timeAmount.svelte";
  import CarInfo from "./carInfo.svelte";
  import Icon from "$lib/component/icons/index.svelte";
  import DropdownMenu from "$lib/component/dropdownMenu/index.svelte";
  import DeleteMyCarModal from "$lib/component/Modals/deleteCar.svelte";
  import Badge from "$lib/component/badge/index.svelte";
  import EditMyCar from "$lib/component/Modals/editCar.svelte";

  export let city: string;
  export let large: string;
  export let small: string;
  export let letter: string;
  export let carName: string;
  export let status: string;
  export let carImg: string;
  export let currentParkEntry: any;
  export let lastParkEntry: any;
  export let id: string;

  let isModalOpen = false;

  const unsubscribe = EditCarModal.subscribe(($EditCarModal) => {
    isModalOpen = $EditCarModal.isOpen && $EditCarModal.carId === id;
  });

  const openEditCarModal = (carId: string) => {
    EditCarModal.set({ isOpen: true, carId: carId });
  };
  const openDeleteCarModal = (carId: string, carName: string) => {
    DeleteCarModal.set({ isOpen: true, carId: carId, carName: carName });
  };
  onDestroy(unsubscribe);
</script>

<div
  class={`p-[25px] rounded-[25px] relative m-auto w-[350px] carCardshadow bg-white ${
    currentParkEntry !== null
      ? " border-[#89DAB8] border-[5px]"
      : " border-2 border-[#E1E1E1] "
  }`}
>
  <div class="flex flex-col gap-6">
    {#if currentParkEntry !== null}
      <div class="m-auto">
        <Badge
          rounded
          variant="success"
          text="駐車中"
          customClass="tracking-[3.2px]"
        />
      </div>
      <div class="grid grid-cols-2">
        <div class="border-r border-[#E1E1E1] px-5">
          <TimeAmount
            title="利用時間"
            subtitle={formatTime(currentParkEntry?.elapsedSeconds)}
          />
        </div>
        <div>
          <TimeAmount
            title="現在の金額"
            subtitle={formatPrice(currentParkEntry?.currentFare)}
          />
        </div>
      </div>
    {/if}
    <div>
      <CarInfo {large} {small} {letter} {city} {carImg} />
    </div>
    <div>
      <div class={isModalOpen ? "my-28" : ""}>
        <EditMyCar
          {id}
          {carName}
          className="absolute left-1/2 transform -translate-x-1/2 top-56 px-7"
        />
      </div>
      {#if !isModalOpen}
        <div class="flex justify-between items-center mt-4">
          <Typography size="2xl" font="bold" color="dark">{carName}</Typography>
          <DropdownMenu
            isActive={currentParkEntry !== null ? true : false}
            on:openEditModal={() => openEditCarModal(id)}
            on:openDeleteModal={() => openDeleteCarModal(id, carName)}
          />
        </div>
      {/if}
      <DeleteMyCarModal {id} {carName} />
    </div>
    <div class="space-y-2">
      {#if !currentParkEntry && lastParkEntry?.enteredAt}
        <div
          class="flex items-center flex-wrap justify-between bg-[#F8F8F8] py-4 px-5 rounded-[10px]"
        >
          <div class="flex items-center gap-2">
            <Icon name="calendar" />
            <Typography size="sm" font="medium" color="dark"
              >最後の駐車</Typography
            >
          </div>
          <div>
            <Typography
              size="md"
              font="normal"
              color="light"
              className="font-fractul leading-[0] mt-1"
            >
              {lastParkEntry?.enteredAt &&
                format(
                  new Date(lastParkEntry.enteredAt),
                  "yyyy/MM/dd"
                )}</Typography
            >
          </div>
        </div>
      {/if}
      <div
        class="flex items-center flex-wrap justify-between bg-[#F8F8F8] py-2.5 px-5 rounded-[10px]"
      >
        <div class="flex items-center gap-2">
          <Icon name="parkCar" />
          <Typography size="sm" font="medium" color="dark"
            >顔パス駐車</Typography
          >
        </div>
        <Badge
          rounded
          border
          customClass="tracking-[0.14px]"
          variant={currentParkEntry === null
            ? status === "ACTIVE"
              ? "success"
              : "default"
            : status === "ACTIVE"
              ? currentParkEntry.disableAutoPayment
                ? "warning"
                : "success"
              : "default"}
          text={currentParkEntry === null
            ? status === "ACTIVE"
              ? "有効"
              : "無効"
            : status === "ACTIVE"
              ? currentParkEntry.disableAutoPayment
                ? "無効 (今回のみ)"
                : "有効"
              : "無効"}
        />
      </div>
    </div>
    <div>
      <Button
        size="sm"
        variant="primary"
        onClick={() => goto(`/car-details/${id}`)}
        block>車の詳細</Button
      >
    </div>
  </div>
</div>
