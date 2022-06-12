这个项目是用腾讯云静态网站托管的一个项目，然后用的是他们的vue模板，后端的话是直接用云函数开发的，**可以先去腾讯云注册一个账号，然后开通静态网站托管** 然后可以先看看代码，后边要改的地方很多，后边有时间我可以视频教你，或者你把你账号给我，我到时候帮你部署这样，**最好的话可以申请一个公众号，虽然这是可以直接网页访问的，但是有些东西用到的是微信浏览器的接口，所以最好申请一个公众号，后边部署上去之后用公众号访问**。



下边这个是默认的模板README，可以看看先

<a href="https://github.com/TencentCloudBase/cloudbase-templates"><img src="https://main.qcloudimg.com/raw/9892a3212a49bdd65ba499f2da62ac23.png"></a>

# Vue 全栈应用示例

这个目录是基于云开发的一个 [Vue](https://cn.vuejs.org/) 全栈应用示例，包含 Vue + 云函数 + 静态网站部署，可以基于 **[CloudBase Framework](https://github.com/TencentCloudBase/cloudbase-framework)** 框架将项目一键部署到云开发环境

## 线上演示地址

[https://framework-1258016615.tcloudbaseapp.com/vue/](https://framework-1258016615.tcloudbaseapp.com/vue/)

点击下方按钮使用 [CloudBase Framework](https://github.com/TencentCloudBase/cloudbase-framework) 可以在云端一键部署本项目到自己的云开发账号上。

[![](https://main.qcloudimg.com/raw/67f5a389f1ac6f3b4d04c7256438e44f.svg)](https://console.cloud.tencent.com/tcb/env/index?action=CreateAndDeployCloudBaseProject&tdl_anchor=github&tdl_site=0&appUrl=https%3A%2F%2Fgithub.com%2FTencentCloudBase%2Fcloudbase-templates&workDir=vue&appName=vue)

## 部署一个 Vue 全栈应用

### 步骤一. 准备工作

具体步骤请参照 [准备云开发环境和 CloudBase CLI 命令工具](https://github.com/TencentCloudBase/cloudbase-framework/blob/master/CLI_GUIDE.md)

### 步骤二. 初始化应用示例

在命令行执行

```bash
tcb new vue-app vue
```

### 步骤三. 一键部署

进入到项目目录，在命令行执行

```bash
tcb framework deploy
```

## 开发命令及配置

### 本地开发

```
npm run dev
```

### 上线部署

```
npm run deploy
```

### Lint

```
npm run lint
```

### CloudBase Framework 相关开发配置

查看 [CloudBase Framework 配置](https://github.com/TencentCloudBase/cloudbase-framework).

### Vue 相关开发配置

查看 [Configuration Reference](https://cli.vuejs.org/config/).
