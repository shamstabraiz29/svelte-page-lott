<script>
  import { goto } from "$app/navigation";

  import Button from "$lib/component/button/index.svelte";
  import Icon from "$lib/component/icons/index.svelte";
  import Typography from "$lib/component/typography/index.svelte";
  import Car from "$lib/images/carSvg.png";

  const handleNavigation = () => {
    goto("/auth/login-with-phone");
  };
</script>

<svelte:head>
  <title>My Lott | ログイン</title>
</svelte:head>

<div
  class="container-class flex flex-col justify-between items-center overflow-hidden pt-10 px-4 h-[90svh]"
>
  <div class="flex flex-col justify-center items-center gap-8">
    <Icon name="logo" />
    <Typography
      as="h1"
      size="4xl"
      font="bold"
      color="white"
      className="leading-normal text-center tracking-[0.32px]"
    >
      今日から駐車は､ <br /> お財布いらず｡
    </Typography>
  </div>
  <div>
    <img src={Car} alt="car" class="h-[267px] w-[193px]" />
  </div>
  <div class="space-y-4 w-full">
    <Button
      variant="secondary"
      size="md"
      onClick={handleNavigation}
      block
      className="custom-button">携帯番号でログイン</Button
    >
    <div class="px-8 text-center">
      <Typography
        as="p"
        size="xs"
        font="medium"
        color="white"
        className="tracking-[0.6px]"
      >
        ログインするにはご登録が必要です。
      </Typography>
      <Typography
        as="p"
        size="xs"
        font="medium"
        color="white"
        className="tracking-[0.6px]"
      >
        ご登録はLott駐車場にてのみ可能です。
      </Typography>
    </div>
  </div>
</div>