<script>
  import { goto } from "$app/navigation";

  import autoPayment from "$lib/images/autoPayment.png";
  import Icon from "$lib/component/icons/index.svelte";
  import Typography from "$lib/component/typography/index.svelte";
  import Button from "$lib/component/button/index.svelte";
  import Lottie from "$lib/component/lottie/index.svelte";
  import Completion from "$lib/static/animations/Completion.json";
</script>

<svelte:head>
  <title>My Lott | 登録完了</title>
</svelte:head>

<div
  class="bg-cover min-h-[100svh] px-4 py-8"
  style="background-image: url('{autoPayment}')"
>
  <div class="flex flex-col items-center gap-5">
    <div>
      <Icon name="logo" />
    </div>
    <div class="flex flex-col gap-y-12">
      <div class="flex flex-col items-center">
        <div>
          <Lottie src={Completion} width={180} height={180} loop={false} />
        </div>
        <div>
          <Typography
            as="p"
            size="2xl"
            font="bold"
            color="white"
            className="text-center tracking-[0.24px] leading-normal"
          >
            ご登録が完了しました。<br /> 次回から、顔パス駐車を<br /> ご利用いただけます。
          </Typography>
        </div>
        <div class="px-4 pt-7">
          <Typography
            as="p"
            size="base"
            font="medium"
            color="white"
            className="text-center"
          >
            Lott対応の駐車場をご利用いただくと、<br />
            ご登録の携帯電話にメッセージが届きます。
          </Typography>
        </div>
      </div>
      <div>
        <Button
          variant="secondary"
          className="font-medium custom-button"
          size="md"
          block
          onClick={() => goto("/")}>マイページにすすむ</Button
        >
      </div>
    </div>
  </div>
</div>
