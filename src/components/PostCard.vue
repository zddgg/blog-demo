<script setup>
</script>

<template>
  <a-card hoverable :body-style="{padding: 0}">
    <div style="display: flex; height: 235px">
      <div style="width: 40%; height: 100%">
        <a-image
            :preview-visible="false"
            width="100%"
            height="100%"
            :fit="'cover'"
            src="https://jsd.012700.xyz/gh/jerryc127/CDN/img/butterfly-docs-01-cover.png"
        />
      </div>
      <div style="width: 60%; height: 100%; display: flex; align-items: center">
        <a-card :bordered="false">
          <div style="display: flex; width: 100%">
            <div>
              <div class="title"
                   style="font-size: 1rem; line-height: 1.5rem; word-wrap: break-word; word-break: break-all">
                <label style="font-weight: bold;">📖 如何成功</label>
              </div>
              <div class="content" style="margin-top: 1rem">
                <n-ellipsis line-clamp="4" :tooltip="false"
                            style="font-size: 1rem; line-height: 1.5rem; word-wrap: break-word; word-break: break-all">
                  如果你年轻的时候不 996，你什么时候可以 996？你一辈子没有如果你年轻的时候不 996，你什么时候可以
                  996？你一辈子没有如果你年轻的时候不
                  996，你什么时候可以 996？你一辈子没有
                  996，你觉得你就很骄傲了？这个世界上，我们每一个人都希望成功，都希望美好生活，都希望被尊重，我请问大家，你不付出超越别人的努力和时间，你怎么能够实现你想要的成功？
                </n-ellipsis>
              </div>
              <div class="footer" style="margin-top: 1rem">
                <div style="display: flex;justify-content: space-between">
                  <div style="display: flex; align-items: center; font-size: 1rem; line-height: 1.5rem; color: #606060">
                    <a-space>
                      <a-tag color="arcoblue" :default-checked="true"><label>Lark</label></a-tag>
                      <a-tag color="arcoblue" :default-checked="true"><label>Lark</label></a-tag>
                      <a-tag color="arcoblue" :default-checked="true"><label>Lark</label></a-tag>
                    </a-space>
                  </div>
                  <div style="font-size: 0.8rem; line-height: 1.5rem; color: #606060; display: flex; align-items: center">
                    <icon-calendar-clock :size="16"/>
                    <span style="margin-left: 0.1rem">2023-11-03</span>
                    <a-divider direction="vertical"></a-divider>
                    <icon-eye :size="16"/>
                    <span style="margin-left: 0.1rem">173</span>
                    <a-divider direction="vertical"></a-divider>
                    <icon-message :size="16"/>
                    <span style="margin-left: 0.1rem">173</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a-card>
      </div>
    </div>
  </a-card>
</template>

<style scoped>
</style>