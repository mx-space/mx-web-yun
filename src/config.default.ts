import type { ThemeConfig } from './types/config'

export const defaultThemeConfig: ThemeConfig = {
  author: {
    status: {
      emoji: '😊',
    },
  },

  nav: {
    url: 'https://valaxy.yyj.moe/',
    subtitle: '',
  },

  social: [
    {
      name: 'RSS',
      link: '/atom.xml',
      icon: 'i-ri-rss-line',
      color: 'orange',
    },
    {
      name: 'QQ 群 1050458482',
      link: 'https://qm.qq.com/cgi-bin/qm/qr?k=kZJzggTTCf4SpvEQ8lXWoi5ZjhAx0ILZ&jump_from=webapi',
      icon: 'i-ri-qq-line',
      color: '#12B7F5',
    },
    {
      name: 'GitHub',
      link: 'https://github.com/YunYouJun',
      icon: 'i-ri-github-line',
      color: '#6e5494',
    },
    {
      name: '微博',
      link: 'https://weibo.com/jizhideyunyoujun',
      icon: 'i-ri-weibo-line',
      color: '#E6162D',
    },
    {
      name: '豆瓣',
      link: 'https://www.douban.com/people/yunyoujun/',
      icon: 'i-ri-douban-line',
      color: '#007722',
    },
    {
      name: '网易云音乐',
      link: 'https://music.163.com/#/user/home?id=247102977',
      icon: 'i-ri-netease-cloud-music-line',
      color: '#C20C0C',
    },
    {
      name: '知乎',
      link: 'https://www.zhihu.com/people/yunyoujun/',
      icon: 'i-ri-zhihu-line',
      color: '#0084FF',
    },
    {
      name: '哔哩哔哩',
      link: 'https://space.bilibili.com/1579790',
      icon: 'i-ri-bilibili-line',
      color: '#FF8EB3',
    },
    {
      name: '微信公众号',
      link: 'https://cdn.jsdelivr.net/gh/YunYouJun/cdn/img/about/white-qrcode-and-search.jpg',
      icon: 'i-ri-wechat-2-line',
      color: '#1AAD19',
    },
    {
      name: 'Twitter',
      link: 'https://twitter.com/YunYouJun',
      icon: 'i-ri-twitter-line',
      color: '#1da1f2',
    },
    {
      name: 'Telegram Channel',
      link: 'https://t.me/elpsycn',
      icon: 'i-ri-telegram-line',
      color: '#0088CC',
    },
    {
      name: 'E-Mail',
      link: 'mailto:me@yunyoujun.cn',
      icon: 'i-ri-mail-line',
      color: '#8E71C1',
    },
    {
      name: 'Travelling',
      link: 'https://travellings.link',
      icon: 'i-ri-train-line',
      color: '#333',
    },
  ],

  colors: {
    primary: '#0078E7',
  },
  banner: {
    enable: true,
  },

  bg_image: {
    enable: true,
    url: 'https://cdn.jsdelivr.net/gh/YunYouJun/cdn/img/bg/stars-timing-0-blur-30px.jpg',
    dark: 'https://cdn.jsdelivr.net/gh/YunYouJun/cdn/img/bg/galaxy.jpg',
    opacity: 1,
  },

  say: {
    enable: true,
    api: 'https://el-bot-api.vercel.app/api/words/young',
    hitokoto: {
      enable: false,
      api: 'https://v1.hitokoto.cn',
    },
  },

  pages: [],

  footer: {
    since: 2022,
    icon: {
      name: 'i-ri-cloud-line',
      animated: true,
      color: 'var(--yun-c-primary)',
      url: 'https://sponsors.yunyoujun.cn',
      title: 'Sponsor YunYouJun',
    },

    powered: true,

    beian: {
      enable: false,
      icp: '',
    },
  },

  types: {
    'link': {
      color: 'var(--yun-c-primary)',
      icon: 'i-ri-external-link-line',
    },
    'bilibili': {
      color: '#FF8EB3',
      icon: 'i-ri-bilibili-line',
    },
    'douban': {
      color: '#007722',
      icon: 'i-ri-douban-line',
    },
    'github': {
      color: 'var(--yun-c-text)',
      icon: 'i-ri-github-line',
    },
    'netease-cloud-music': {
      color: '#C10D0C',
      icon: 'i-ri-netease-cloud-music-line',
    },
    'notion': {
      color: 'var(--yun-c-text)',
      icon: 'i-simple-icons-notion',
    },
    'twitter': {
      color: '#1da1f2',
      icon: 'i-ri-twitter-line',
    },
    'wechat': {
      color: '#1AAD19',
      icon: 'i-ri-wechat-2-line',
    },
    'weibo': {
      color: '#E6162D',
      icon: 'i-ri-weibo-line',
    },
    'yuque': {
      color: '#25b864',
      icon: 'i-ant-design-yuque-outlined',
    },
    'zhihu': {
      color: '#0084FF',
      icon: 'i-ri-zhihu-line',
    },
  },

  menu: {
    custom: {
      title: 'button.about',
      icon: 'i-ri-clipboard-line',
      url: '/about',
    },
  },
}
