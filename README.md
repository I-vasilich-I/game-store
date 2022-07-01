# Game Store

[Video demonstration](https://www.youtube.com/watch?v=-31JNKAmdfQ)

![Screenshot from 2022-06-27 12-07-03](https://user-images.githubusercontent.com/67139199/176952041-c8115fac-b1f7-44f8-bbad-b1672ee8f7a0.png)


## How to run project

1. Open project in VSCode (for example)
2. Run command `npm i` in terminal (console) for installing all required packages (Node.js is required: <https://nodejs.org/en/>)
3. For builing project you can use the following commands:
   - `npm run build-prod` - building production version (minimized and optimized). The project will be builded into `build` folder. You can change destination in `webpack.common.js (line 19)`
   - `npm run build-dev` - building development version
   - `npm run serve` - building development hot-reloaded version with webpack-dev-server

## [Workspace template](https://github.com/Yegorich555/webpack-must-have)
