import defaultSettings from './defaultSettings'; // https://umijs.org/config/

import slash from 'slash2';
import webpackPlugin from './plugin.config';
const { pwa, primaryColor } = defaultSettings; // preview.pro.ant.design only do not use in your production ;
// preview.pro.ant.design 专用环境变量，请不要在你的项目中使用它。

const plugins = [
  [
    'umi-plugin-react',
    {
      antd: true,
      dva: {
        hmr: true,
      },
      locale: {
        // default false
        enable: true,
        // default zh-CN
        default: 'zh-CN',
        // default true, when it is true, will use `navigator.language` overwrite default
        baseNavigator: true,
      },
      // build 后拆分成多个静态资源文件
      dynamicImport: true,
      // dynamicImport: {
      //   loadingComponent: './components/PageLoading/index',
      //   webpackChunkName: true,
      //   level: 3,
      // },
      pwa: pwa
        ? {
            workboxPluginMode: 'InjectManifest',
            workboxOptions: {
              importWorkboxFrom: 'local',
            },
          }
        : false, // default close dll, because issue https://github.com/ant-design/ant-design-pro/issues/4665
      // dll features https://webpack.js.org/plugins/dll-plugin/
      // dll: {
      //   include: ['dva', 'dva/router', 'dva/saga', 'dva/fetch'],
      //   exclude: ['@babel/runtime', 'netlify-lambda'],
      // },
    },
  ],
  [
    'umi-plugin-pro-block',
    {
      moveMock: false,
      moveService: false,
      modifyRequest: true,
      autoAddMenu: true,
    },
  ],
]; // 针对 preview.pro.ant.design 的 GA 统计代码

plugins.push([
  'umi-plugin-ga',
  {
    code: 'UA-154979913-1',
    judge: () => true,
  },
]);

export default {
  plugins,
  block: {
    // 国内用户可以使用码云
    // defaultGitUrl: 'https://gitee.com/ant-design/pro-blocks',
    defaultGitUrl: 'https://github.com/ant-design/pro-blocks',
  },
  history: 'browser',
  hash: true,
  targets: {
    ie: 11,
  },
  devtool: false,
  // umi routes: https://umijs.org/zh/guide/router.html
  routes: [
    {
      path: '/proposal',
      component: '../layouts/BasicLayout',
      routes: [
        {
          path: '/proposal/list',
          name: '提案列表',
          component: './proposal/List',
        },
        {
          path: '/proposal/list/:id',
          name: '提案列表',
          component: './proposal/List',
        },
        {
          path: '/proposal/detail/:id',
          name: '提案详情',
          component: './proposal/Detail',
        },
        {
          path: '/proposal/update/:id',
          name: '编辑提案',
          component: './proposal/Update',
        },
        {
          path: '/proposal/create',
          name: '创建提案',
          component: './proposal/Create',
        },
        {
          path: '/proposal/zone/list',
          name: '提案专区列表',
          component: './proposal_zone/List',
        },
        {
          path: '/proposal/zone/detail/:id',
          name: '提案专区详情',
          component: './proposal_zone/Detail',
        },
        {
          path: '/proposal/zone/create',
          name: '创建提案专区',
          component: './proposal_zone/Create',
        },
        {
          path: '/proposal/zone/update/:id',
          name: '编辑提案专区',
          component: './proposal_zone/Update',
        },
        {
          component: './404',
        },
      ],
    },
    {
      path: '/user',
      component: '../layouts/BasicLayout',
      routes: [
        {
          name: '个人中心',
          path: '/user/:id',
          component: './user/AccountCenter',
        },
        {
          component: './404',
        },
      ],
    },
    {
      path: '/account',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            // {
            //   path: '/account/admin',
            //   name: 'admin',
            //   icon: 'crown',
            //   component: './Admin',
            //   authority: ['admin'],
            // },
            {
              name: '个人设置',
              path: '/account/settings',
              component: './user/AccountSettings',
            },
            {
              component: './404',
            },
          ],
        },
      ],
    },
    {
      path: '/',
      component: '../layouts/UserLayout',
      routes: [
        {
          path: '/',
          redirect: '/proposal/list',
        },
        {
          name: 'login',
          path: '/login',
          component: './user/Login',
        },
        {
          name: 'register',
          path: '/register',
          component: './user/Register',
        },
        {
          name: 'forget-pwd',
          path: '/forget-password',
          component: './user/ForgetPwd',
        },
        {
          name: 'reset-pwd',
          path: '/reset-password/:token',
          component: './user/ResetPwd',
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': primaryColor,
  },
  treeShaking: true,
  //gzip 后的尺寸能减少 10K
  ignoreMomentLocale: true,
  lessLoaderOptions: {
    javascriptEnabled: true,
  },
  disableRedirectHoist: true,
  cssLoaderOptions: {
    modules: true,
    getLocalIdent: (context, _, localName) => {
      if (
        context.resourcePath.includes('node_modules') ||
        context.resourcePath.includes('ant.design.pro.less') ||
        context.resourcePath.includes('global.less')
      ) {
        return localName;
      }

      const match = context.resourcePath.match(/src(.*)/);

      if (match && match[1]) {
        const antdProPath = match[1].replace('.less', '');
        const arr = slash(antdProPath)
          .split('/')
          .map(a => a.replace(/([A-Z])/g, '-$1'))
          .map(a => a.toLowerCase());
        return `antd-pro${arr.join('-')}-${localName}`.replace(/--/g, '-');
      }

      return localName;
    },
  },
  manifest: {
    basePath: '/',
  },
  chainWebpack: webpackPlugin,
  proxy: {
    '/server/': {
      // target: 'http://47.103.15.202:8000',
      target: 'http://127.0.0.1:5000',
      changeOrigin: true,
      pathRewrite: {
        '^/server': '',
      },
    },
  },
};
