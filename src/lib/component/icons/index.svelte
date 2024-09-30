<script lang="ts">
  import PhoneIcon from "./phoneIcon.svelte";
  import SendIcon from "./sendIcon.svelte";
  import LeftArrowIcon from "./LeftArrowIcon.svelte";
  import Logo from "./logo.svelte";
  import ChevronLeftIcon from "./ChevronLeftIcon.svelte";
  import MoreCircleIcon from "./MoreCircleIcon.svelte";
  import UserIcon from "./UserIcon.svelte";
  import EditIcon from "./EditIcon.svelte";
  import ParkCar from "./parkCarIcon.svelte";
  import PaymentIcon from "./PaymentIcon.svelte";
  import CarIcon from "./carIcon.svelte";
  import UserOutlineIcon from "./userOutlineIcon.svelte";
  import VisaIcon from "./visaIcon.svelte";
  import KoapassIcon from "./KoapassIcon.svelte";
  import RightArrow from "./rightArrow.svelte";
  import Info from "./infoIcon.svelte";
  import PdfDownloadIcon from "./pdfDownloadIcon.svelte";
  import CalendarCheckIcon from "./calendarCheckIcon.svelte";
  import StopwatchIcon from "./stopwatchIcon.svelte";
  import CreditCardIcon from "./creditCardIcon.svelte";
  import DeleteIcon from "./DeleteIcon.svelte";
  import WarningIcon from "./warningIcon.svelte";
  import AlertIcon from "./alertIcon.svelte";
  import Ellipse from "./ellipse.svelte";
  import StopWatch from "./stopWatch.svelte";
  import CalendarIcon from "./calendarIcon.svelte";
  import OffIcon from "./offIcon.svelte";
  import OnIcon from "./onIcon.svelte";
  import PauseIcon from "./pauseIcon.svelte";
  import NoCarsIcon from "./noCarsIcon.svelte";
  import NoPaymentIcon from "./noPaymentIcon.svelte";
  import CreditCard from "./creditCard.svelte";
  import ResendIcon from "./resend.svelte";
  import MailIcon from "./mailIcon.svelte";
  import NumPlateCar from "./numPlateCarIcon.svelte";
  import AutoPhone from "./AutoPhoneIcon.svelte";

  type IconName =
    | "phone"
    | "send"
    | "leftArrow"
    | "logo"
    | "chevronLeft"
    | "moreCircle"
    | "user"
    | "parkCar"
    | "edit"
    | "payment"
    | "userOutline"
    | "visa"
    | "koapass"
    | "info"
    | "rightArrow"
    | "pdfDownload"
    | "calendarCheck"
    | "stopWatch"
    | "car"
    | "delete"
    | "creditCard"
    | "warning"
    | "alert"
    | "ellipse"
    | "watch"
    | "calendar"
    | "pause"
    | "on"
    | "off"
    | "noCar"
    | "noPayment"
    | "credit"
    | "mail"
    | "numPlateCar"
    | "autoPhone"
    | "resend";

  export let name: IconName;
  export let color: string = "";
  export let height = "";
  export let width = "";
</script>

<div>
  {#if name === "phone"}
    <PhoneIcon {color} {height} {width} />
  {:else if name === "send"}
    <SendIcon />
  {:else if name === "leftArrow"}
    <LeftArrowIcon />
  {:else if name === "logo"}
    <Logo />
  {:else if name === "chevronLeft"}
    <ChevronLeftIcon />
  {:else if name === "moreCircle"}
    <MoreCircleIcon {color} />
  {:else if name === "user"}
    <UserIcon />
  {:else if name === "edit"}
    <EditIcon />
  {:else if name === "parkCar"}
    <ParkCar />
  {:else if name === "car"}
    <CarIcon {color} />
  {:else if name === "payment"}
    <PaymentIcon />
  {:else if name === "userOutline"}
    <UserOutlineIcon />
  {:else if name === "visa"}
    <VisaIcon />
  {:else if name === "koapass"}
    <KoapassIcon />
  {:else if name === "rightArrow"}
    <RightArrow />
  {:else if name === "info"}
    <Info {color} />
  {:else if name === "pdfDownload"}
    <PdfDownloadIcon {height} {width} />
  {:else if name === "calendarCheck"}
    <CalendarCheckIcon />
  {:else if name === "stopWatch"}
    <StopwatchIcon />
  {:else if name === "creditCard"}
    <CreditCardIcon />
  {:else if name === "delete"}
    <DeleteIcon />
  {:else if name === "warning"}
    <WarningIcon />
  {:else if name === "alert"}
    <AlertIcon />
  {:else if name === "ellipse"}
    <Ellipse />
  {:else if name === "watch"}
    <StopWatch />
  {:else if name === "calendar"}
    <CalendarIcon />
  {:else if name === "pause"}
    <PauseIcon />
  {:else if name === "on"}
    <OnIcon />
  {:else if name === "off"}
    <OffIcon />
  {:else if name === "noCar"}
    <NoCarsIcon />
  {:else if name === "noPayment"}
    <NoPaymentIcon />
  {:else if name === "credit"}
    <CreditCard />
  {:else if name === "resend"}
    <ResendIcon />
  {:else if name === "numPlateCar"}
    <NumPlateCar />
  {:else if name === "mail"}
    <MailIcon />
  {:else if name === "autoPhone"}
    <AutoPhone />
  {:else}
    <LeftArrowIcon />
  {/if}
</div>
