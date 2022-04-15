export interface SocialLink {
  /**
   * The title of your link
   */
  name: string
  link: string
  /**
   * 图标名称
   * https://icones.js.org/
   */
  icon: string
  color: string
}

/**
 * Theme Config
 */
export interface ThemeConfig {
  author: {
    status: {
      emoji?: string
    }
  }
  nav: {
    url?: string
    subtitle?: string
  }
  social: SocialLink[]
  colors: {
    /**
     * primary color
     * @default '#0078E7'
     */
    primary: string
  }

  /**
   * 首页标语
   */
  banner: {
    enable: boolean
    /**
     * 标题
     */
  }

  bg_image: {
    enable: boolean
    url: string
    dark?: string
    opacity: number
  }

  /**
   * say something
   * https://say.elpsy.cn
   */
  say: {
    enable: boolean
    api: string
    hitokoto: {
      enable: boolean
      api: string
    }
  }

  pages: {
    name: string
    url: string
    icon: string
    color: string
  }[]

  /**
   * footer
   */
  footer: {
    /**
     * 建站于
     */
    since: number

    /**
     * Icon between year and copyright info.
     */
    icon: {
      /**
       * icon name, i-xxx
       */
      name: string
      animated: boolean
      color: string
      url: string
      title: string
    }

    /**
     * Powered by valaxy & valaxy-theme-${name}, default is yun
     */
    powered: boolean

    /**
     * Chinese Users | 中国用户
     * 备案 ICP
     * 国内用户需要在网站页脚展示备案 ICP 号
     * https://beian.miit.gov.cn/
     */
    beian: {
      enable: boolean
      /**
       * 苏ICP备xxxxxxxx号
       */
      icp: string
    }
  }

  /**
   * post card types
   */
  types: Record<
    string,
    {
      color: string
      icon: string
    }
  >

  /**
   * 菜单栏
   */
  menu: {
    custom: {
      title: string
      url: string
      icon: string
    }
  }
}

export type ThemeUserConfig = Partial<ThemeConfig>
