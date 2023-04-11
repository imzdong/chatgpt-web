#### 项目目的

构建本地的chatgpt

#### 项目架构

前后端分离，前端使用vue，[后端](https://github.com/imzdong/chatgpt)使用go

#### 项目目录

```text
├── node_modules
├── public
├── src/
│   │── assets
│   │── components
│   │── App.vue
│   └── main.js
│── babel.config.js
├── package.json
```

```text
node_modules 目录：存储项目所依赖的 Node 模块和插件。
public 目录：存储静态资源，例如 HTML、图像、字体等。在开发过程中，该目录中的文件不会被打包到最终的构建文件中。
src 目录：存储项目的源代码，包括 Vue 组件、样式、JavaScript 文件等。
assets 目录：存储项目的静态资源，例如图像、字体等。
components 目录：存储项目的 Vue 组件。每个组件通常包括一个 .vue 文件，该文件包含了组件的模板、脚本和样式。
App.vue 文件：Vue 项目的根组件，通常包含了整个应用程序的布局和基本逻辑。
main.js 文件：Vue 项目的入口文件，包含了创建 Vue 实例和挂载应用程序的逻辑。
router 目录：存储 Vue Router 的路由配置文件，用于管理前端路由。
store 目录：存储 Vuex 的状态管理配置文件，用于管理全局状态。
babel.config.js 文件：Babel 的配置文件，用于将 ES6+ 的 JavaScript 代码转换为浏览器可以理解的 JavaScript 代码。
package.json 文件：项目的配置文件，包括项目的名称、版本、依赖、脚本等信息。
README.md 文件：项目的说明文档。
```

#### 项目构建
* nvm管理node版本
  ```shell
  nvm install 19.8.1
  nvm list
  nvm use 19.8.1  # admin 切换
  ```
* 安装vue并且构建项目
  ```shell
  npm uninstall -g vue-cli
  npm install -g @vue/cli
  vue create chatgpt-web
  ```
* 构建go模块
    ```shell
    go mod init chatgpt
    ```
* 运行go项目
  ```shell
    go run main.go
  ```

  ```text
  Babel：Babel 是一个 JavaScript 编译器，可以将最新的 JavaScript 语法转换成可在各种浏览器中运行的旧版本 JavaScript 语法。如果您计划使用最新的 JavaScript 语法，那么需要启用该选项。
  TypeScript：TypeScript 是一个类型安全的 JavaScript 超集，它可以帮助您在编码时捕获一些错误，并提供更好的代码提示和重构。如果您希望使用 TypeScript 来编写 Vue 应用程序，则需要启用该选项。
  ESLint：ESLint 是一个 JavaScript 代码检查工具，可以帮助您发现一些常见的错误和潜在问题。如果您想要使用 ESLint 来检查您的代码，需要启用该选项。
  Vuex：Vuex 是一个状态管理工具，可以帮助您管理应用程序中的共享状态。如果您希望在 Vue 应用程序中使用 Vuex，则需要启用该选项。
  Vue Router：Vue Router 是一个用于构建单页应用程序的路由管理器。如果您希望在 Vue 应用程序中使用 Vue Router，则需要启用该选项。
  ```


  #### 其他
  ```text
  具体来说，package.json 文件可以包含以下一些属性：
name：项目名称，需要是一个字符串类型，不能含有空格和特殊字符。
version：项目的版本号，需要遵循 Semantic Versioning 规范。
description：项目的描述信息，用于简单描述项目的功能和特点。
main：项目的入口文件，一般是一个 JavaScript 文件，用于启动项目或提供基本的函数和类定义。
dependencies：项目所依赖的第三方包列表，以及它们的版本号。当项目启动时，这些依赖包会自动被下载并安装。
devDependencies：项目开发时所依赖的第三方包列表，以及它们的版本号。这些包通常是一些开发工具、测试框架等。
scripts：用于定义一些自定义脚本命令，例如启动项目、打包代码、运行测试等。
repository：项目的源代码仓库信息，包括类型（如 git）、URL 等。
author：项目的作者信息，包括名称、邮箱地址等。
license：项目的许可证信息，表示项目的使用条款和限制。
  ```

```text
package-lock.json 文件是 Node.js 项目中的一个自动生成的文件，它用于记录项目中的依赖包精确的版本信息和依赖关系。当项目中的依赖包被安装、升级或删除时，package-lock.json 文件会自动更新，以确保项目的依赖包版本和依赖关系的精确一致性。
具体来说，package-lock.json 文件记录了以下信息：
项目中所有依赖包的名称、版本号、下载地址等详细信息。
所有依赖包之间的依赖关系和版本范围，以及在满足这些版本范围的前提下，实际使用的版本号。
依赖包的完整安装路径和文件结构，以及依赖包的所有子依赖关系和版本信息。
由于 package-lock.json 文件记录了项目的依赖包精确的版本和依赖关系，可以避免开发人员在不同环境中出现版本不一致或依赖关系不正确的问题。在多人协作开发或在不同环境中部署项目时，使用 package-lock.json 文件可以确保项目的依赖包版本和依赖关系的一致性，提高项目的可移植性和可维护性。
需要注意的是，package-lock.json 文件一般不需要手动编辑或修改，而是由 npm 自动维护和更新。当项目中的依赖包需要更新或修复漏洞时，可以直接使用 npm 命令来安装或升级依赖包，package-lock.json 文件会自动更新，确保项目的依赖关系和版本一致。
```


#### 使用的组件
* npm install axios@latest
* npm install element-plus --save
* npm install vue-router@4
