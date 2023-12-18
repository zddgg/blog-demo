<template>
  <div class="menu-demo" style="display: flex; justify-content: space-between; align-items: center">
    <div>
      <a-menu mode="horizontal" :default-selected-keys="['1']">
        <a-menu-item key="0" :style="{ padding: 0, marginRight: '38px' }" disabled>
          <div
              :style="{
            width: '80px',
            height: '30px',
            background: 'var(--color-fill-3)',
            cursor: 'text',
          }"
          />
        </a-menu-item>
        <a-menu-item key="1">Home</a-menu-item>
        <a-menu-item key="2">Solution</a-menu-item>
        <a-menu-item key="3">Cloud Service</a-menu-item>
        <a-menu-item key="4">Cooperation</a-menu-item>
        <a-sub-menu key="5">
          <template #title>Navigation 1</template>
          <a-menu-item key="0_0">Menu 1</a-menu-item>
          <a-menu-item key="0_1">Menu 2</a-menu-item>
          <a-menu-item key="0_2" disabled>Menu 3</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </div>
    <div>
      <a-space>
        <a-input-search :style="{width:'320px'}" placeholder="Please enter something"/>
        <a-avatar :size="32">Arco</a-avatar>
      </a-space>
    </div>
  </div>
</template>
<style scoped>
.menu-demo {
  box-sizing: border-box;
  width: 70%;
}
</style>
<script setup>
</script>