<template>
  <a-card>
    <div>
      <h1 style="color: black">开源啦！！！轻量级工作流引擎管理系统</h1>
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
    <div>
      <!--      <Editor :locale="zh" :upload-images="handleUploadFile" :value="value" :plugins="plugins" @change="handleChange"/>-->
      <Viewer ref="markDownRef" :locale="zh" :value="value" :plugins="plugins"/>
    </div>
  </a-card>
  <a-card style="margin-top: 20px">
    <div style="font-size:18px; font-weight: bold; color: black">
      评论 1
    </div>
  </a-card>
</template>
<script setup>
import {markRaw, nextTick, onMounted, onUnmounted, reactive, toRefs} from 'vue'
import {Viewer} from '@bytemd/vue-next'
import {getProcessor} from 'bytemd'
import gfm from '@bytemd/plugin-gfm'
import gemoji from '@bytemd/plugin-gemoji'
import highlight from '@bytemd/plugin-highlight' // 代码高亮
import frontmatter from '@bytemd/plugin-frontmatter' // 解析前题
import mediumZoom from '@bytemd/plugin-medium-zoom' // 缩放图片
import breaks from '@bytemd/plugin-breaks'
import zhHans from 'bytemd/locales/zh_Hans.json'
import 'bytemd/dist/index.css'
import 'juejin-markdown-themes/dist/juejin.min.css' // 掘金同款样式
import {findIndex} from 'lodash'

const pluginsList = [gfm(), gemoji(), highlight(), frontmatter(), mediumZoom(), breaks()]
/*
 *@Description: 状态初始化
 *@MethodAuthor: peak1024
 *@Date: 2023-10-25 15:46:36
 */
const state = reactive({
  value: '',
  plugins: markRaw(pluginsList),
  zh: zhHans,
  cateList: [], // 目录内容
  offsetTopList: [], //文档流中锚点距离顶部距离集合
  anchor: 0,
})
const {anchor, value, plugins, zh, markDownRef, cateList} = toRefs(state)

onMounted(() => {
  state.value = '# Aurora---前后端分离博客\n' +
      '\n' +
      '### 轻量版后端: https://github.com/zhouyqxy/aurora_Lite\n' +
      '\n' +
      '## 前言\n' +
      '\n' +
      '- 开源不易，希望大家star支持一下\n' +
      '- 由于本人还在上学，主语言并不是Java，所以项目更新频率较慢，但是本项目会长期维护，有问题可以提issue，\n' +
      '  同时也欢迎大家来共建此项目，包括但不限于：bug 修复、代码优化、功能开发等等\n' +
      '\n' +
      '## 在线地址\n' +
      '\n' +
      '- 前台链接：[www.linhaojun.top](https://www.linhaojun.top)\n' +
      '- 后台链接：[admin.linhaojun.top](https://admin.linhaojun.top)\n' +
      '- 演示账号：test@163.com，密码：123456\n' +
      '\n' +
      '## 效果图\n' +
      '\n' +
      '### 图片1：\n' +
      '![图片1](https://s3.bmp.ovh/imgs/2023/06/25/8a6ad38dfb27bb3a.png)\n' +
      '\n' +
      '### 图片2：\n' +
      '![图片2](https://s3.bmp.ovh/imgs/2023/06/25/7036a13dc0a0488a.png)\n' +
      '\n' +
      '## 相关技术\n' +
      '\n' +
      '### 前端：\n' +
      '\n' +
      '- 样式来自于：[hexo的aurora主题](https://github.com/auroral-ui/hexo-theme-aurora)\n' +
      '- 基础框架：vue3(前台) vue2(后台)\n' +
      '- 状态管理：pinia(前台) vuex(后台)\n' +
      '- 路由组件：vue-router\n' +
      '- 网络请求：axios\n' +
      '- 其他技术：详见前端项目的package.json\n' +
      '\n' +
      '### 后端：\n' +
      '\n' +
      '- 基础框架：springboot\n' +
      '- ORM框架：mybatisplus\n' +
      '- 权限框架：springsecurity\n' +
      '- 缓存中间件：redis\n' +
      '- 消息中间件：rabbitmq\n' +
      '- 搜索引擎：elasticsearch\n' +
      '- 对象存储：minio\n' +
      '- 定时任务：quartz\n' +
      '- 其他技术：详见后端项目的pom.xml\n' +
      '\n' +
      '## 后续计划\n' +
      '\n' +
      '- [ ] 前台代码优化\n' +
      '- [ ] 后台vue3重构\n' +
      '- [ ] 后端提供轻量化选择\n' +
      '\n' +
      '## 部署\n' +
      '\n' +
      '- 详见项目部署文档\n' +
      '\n' +
      '## 交流群\n' +
      '\n' +
      '- QQ群：338371628\n' +
      '\n' +
      '## 鸣谢\n' +
      '\n' +
      '- 感谢[jetbrains](https://www.jetbrains.com/)提供的开源开发许可证\n'
  getCataLogData()
  nextTick(() => {
    transformToId()
    // 获取内容的所有锚点距离顶部的距离
    getCalcLateTop()
    // 监听页面滚动获取当前第几个锚点
    window.addEventListener('scroll', scrollHandle)
    window.onresize = () => {
      getCalcLateTop()
    }
  })
})

onUnmounted(() => {
  window.removeEventListener('scroll', scrollHandle)
})

/*
 *@Description: 获取目录
 *@MethodAuthor: peak1024
 *@Date: 2023-10-25 15:46:49
 */
const getCataLogData = () => {
  getProcessor({
    plugins: [
      {
        rehype: p =>
            p.use(() => tree => {
              if (tree && tree.children.length) {
                console.log(tree)
                createCataLog(tree)
              }
            }),
      },
    ],
  }).processSync(state.value)
}

const createCataLog = tree => {
  const items = []
  tree.children
      .filter(v => v.type == 'element')
      .forEach(node => {
        if (node.tagName === 'h2' && node.children.length > 0) {
          items.push({
            tagName: node.tagName,
            text: stringifyHeading(node),
          })
        }
      })
  state.cateList = items
}

const stringifyHeading = node => {
  let result = ''
  node.children.forEach(item => {
    if (item.type === 'text') {
      result += item.value
    }
  })
  return result
}
/*
 *@Description: 设置锚点ID
 *@MethodAuthor: peak1024
 *@Date: 2023-10-25 17:03:21
 */
const transformToId = () => {
  const dom = document.querySelector('.markdown-body')
  let children = Array.from(dom.children)
  if (children.length > 0) {
    for (let i = 0; i < children.length; i += 1) {
      const tagName = children[i].tagName
      if (tagName === 'H1' || tagName === 'H2' || tagName === 'H3') {
        const index = findIndex(state.cateList, v => v.text === children[i].textContent)
        if (index >= 0) {
          children[i].setAttribute('id', `head-${index}`)
        }
      }
    }
  }
}
/**
 * 目录与标题联动问题
 * 1:点击目录滚动到锚点
 * 2:监听滚动-获取滚动位置最近的标签-做目录联动
 *
 */
const scrollToSection = (sectionId, index) => {
  state.anchor = index
  const section = document.getElementById(sectionId)
  if (section) {
    section.scrollIntoView({behavior: 'smooth'})
  }
}
const getCalcLateTop = () => {
  const mainEl = document.querySelector('#main')
  state.offsetTopList = state.cateList.map((item, index) => {
    const element = document.querySelector(`#head-${index}`)
    return {
      offsetTop: index === 0 ? mainEl.offsetTop : element.offsetTop,
      anchor: index,
    }
  })
}
const scrollHandle = () => {
  const curScrollTop = document.documentElement.scrollTop
      || window.pageYOffset
      || document.body.scrollTop

  let flag = true
  const len = state.offsetTopList.length
  const min = state.offsetTopList[0].offsetTop
  // 滚动的距离 小于 第一个锚点距离顶部的距离
  if (curScrollTop < min) {
    state.anchor = 0
    return
  }
  // 滚动的距离 与 全部锚点距离顶部距离的集合 比较 获取最近的锚点标识
  for (let i = len - 1; i >= 0; i--) {
    const curReference = state.offsetTopList[i].offsetTop // 当前参考值
    if (flag && curScrollTop >= curReference - 100) {
      flag = false
      state.anchor = state.offsetTopList[i].anchor
    }
  }
}
console.log('cateList', cateList.value)

</script>
<style lang="scss" scoped>
.markdow-page {
  width: 100%;
  height: 100vh;

  :deep() {
    .bytemd {
      height: calc(100vh - 200px);
    }
  }
}
</style>
<style lang="scss" scoped>
.grid-wapper {
  display: flex;
  justify-content: center;
  align-items: flex-start;

  .grid-view {
    width: 1200px;
  }

  .marker-card {
    width: 200px;
    background-color: antiquewhite;
    padding: 10px;
    position: fixed;
    right: 20px;

    .marker-item {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      height: 30px;
      line-height: 30px;
      cursor: pointer;
      display: block;

      &:hover {
        color: rebeccapurple;
      }

      &.h3-class {
        padding-left: 15px;
      }

      &.active {
        color: red !important;
      }
    }
  }
}
</style>