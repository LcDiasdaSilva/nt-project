<style lang="scss">
  .top-bar {
    border-bottom: solid 1px #ccc;
    &__content {
      width: 100%;
      max-width: 1000px;
      margin: 0 auto;
      height: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &__brand{
        img{
            width: 40px;
        }

    }
  }
</style>
<template>
  <nav class="top-bar">
    <div class="top-bar__content">
      <div class="top-bar__brand">
        <img src="/images/logo.svg"/>
        <span>OTEIS</span>
      </div>
      <div class="top-bar__nav">
        <ul>
            <li>
                Inicio
            </li>
        </ul>
        <ul>
            <li>
                Minhas reservas
            </li>
        </ul>
      </div>
      <div class="top-bar__alerts"></div>
    </div>
  </nav>
</template>
