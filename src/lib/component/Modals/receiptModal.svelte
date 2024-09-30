<script lang="ts">
  import { afterUpdate, onDestroy } from "svelte";
  import { format } from "date-fns";
  import { Card, Modal } from "flowbite-svelte";

  import { formatPrice } from "$lib/helpers";
  import { ReceiptModal, paymentReceiptDetails } from "$lib/store";

  import Icon from "$lib/component/icons/index.svelte";
  import Button from "$lib/component/button/index.svelte";
  import Typography from "$lib/component/typography/index.svelte";

  let localModal = false;
  let unsubscribe: () => void;
  let paymentDetailData: any;

  $: localModal = $ReceiptModal;

  $: {
    unsubscribe = ReceiptModal.subscribe((value) => {
      localModal = value;
    });
  }

  afterUpdate(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = $ReceiptModal ? "hidden" : "auto";
    }
  });

  onDestroy(() => {
    unsubscribe();
  });

  paymentReceiptDetails.subscribe((value) => {
    paymentDetailData = value;
  });

  const handleDownloadPDF = async () => {
    try {
      const response = await fetch(paymentDetailData?.receiptUrl);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "receipt.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };
</script>

<Modal
  bind:open={$ReceiptModal}
  size="xs"
  autoclose
  class="modal-container rounded-[15px] max-w-[360px] shadow-xl"
  bodyClass="border-none"
>
  <div class="flex flex-col gap-5 items-center pt-6">
    <div>
      <Icon name="pdfDownload" width="30" height="30" />
    </div>
    <div class="text-center">
      <Typography size="2xl" color="dark" font="bold" as="h1">
        以下の領収書を <br /> ダウンロードしますか？
      </Typography>
    </div>

    <Card
      class="w-full items-center gap-2.5 bg-[#F8F8F8] border-[#E1E1E1] shadow-none"
    >
      <Typography color="dark" size="lg"
        >{paymentDetailData.parkEntry.plateValue}</Typography
      >
      <Typography color="light" size="sm"
        >{paymentDetailData.parkEntry.park.name}</Typography
      >
      <Typography color="light" size="sm" className="font-fractul"
        >{format(
          new Date(paymentDetailData.transactionDate),
          "yyyy/MM/dd HH:mm"
        )}</Typography
      >
      <Typography color="dark" size="xl" className="font-fractul"
        >{formatPrice(paymentDetailData.amount)}</Typography
      >
    </Card>
    <Typography color="light" size="base">
      PDFファイルがダウンロードされます。
    </Typography>
    <Button block size="sm" onClick={handleDownloadPDF}>ダウンロード</Button>
    <Button block outline size="sm">キャンセル</Button>
  </div>
</Modal>
