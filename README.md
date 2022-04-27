# int3306.healthyfirst

## Development environment setup

1.  Windows<br>
    1.1. Runtime<br>

    - Install Node from <a href="https://nodejs.org/en/download/">here</a> (version >= 16)
    - Upgrade npm to newest version with `npm i -g npm`

    1.2. Project<br>

    - Install NestJS CLI with `npm i -g @nestjs/cli`
    - Install project dependencies with `npm i` from project root

2.  Ubuntu (pretty similar with other distro)<br>
    2.1. Runtime<br>

    - Install Node with `sudo apt install nodejs`
    - Install `n` package from `npm` with `sudo npm i -g n`
    - Node package will always be older version than stable release, remove old version with `sudo apt remove nodejs` then install newest lts version with `sudo n lts`
    - Upgrade npm to newest version with `npm i -g npm`

      2.2. Project<br>

    - Install NestJS CLI with `sudo npm i -g @nestjs/cli`
    - Install project dependencies with `npm i` from project root

3.  Editor<br>
    - Use Visual Studio Code
    - Your VSCode must install <a href="https://marketplace.visualstudio.com/items?itemName=jebbs.plantuml">PlantUML</a>, <a href="https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint">ESLint</a>, <a href="https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode">Prettier</a>, <a href="https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next">JavaScript and TypeScript Nightly</a>
    - Your VSCode should install <a href="https://marketplace.visualstudio.com/items?itemName=VisualStudioExptTeam.vscodeintellicode">IntelliCode</a>, <a href="https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag">Auto Close Tag</a>, <a href="https://marketplace.visualstudio.com/items?itemName=steoates.autoimport">Auto Import</a>, <a href="https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-rename-tag">Auto Rename Tag</a>, <a href="https://marketplace.visualstudio.com/items?itemName=GitHub.copilot">Copilot</a>

## Development

1. Start backend development server with `npm run start:dev`
2. Building frontend bundle requires a little more work. You have to define which target environment your code will run on, in this case `production` or `development`. To specify target environment, use `$env:NODE_ENV=<env>` on Windows or `export NODE_ENV=<env>` on Unix. Run `npm run build:view` to bundle frontend code. The build script on `production` will compile frontend code and optimize them one time but on 'development' will start a dev server for hot reload.
