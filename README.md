# int3306.healthyfirst

## Development environment setup

1.  Windows<br>
    1.1. Nginx<br>

    - Download Nginx from <a href="http://nginx.org/en/download.html">here</a>
    - Extract everything to %PROJECT%/bin/nginx
    - Edit Nginx config file at %PROJECT%/bin/nginx/conf/nginx.conf to anything you like but http block should at least has these things:

            http {
                include       mime.types;
                default_type  application/octet-stream;
                sendfile        on;
                gzip  on;

                include ./../../config/win/nginx/site.conf;
            }

    1.2. Runtime<br>

    - Install Node from <a href="https://nodejs.org/en/download/">here</a> (version >= 16)
    - Upgrade npm to newest version with `npm i -g npm`

    1.3. Project<br>

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

## Development

1. Start backend development server with `npm run start:dev`
2. Building frontend bundle requires a little more work. You have to define which target environment your code will run on, in this case 'production' or 'development'. To specify target environment, use `$env:NODE_ENV=<env>` on Windows or `export NODE_ENV=<env>` on Unix. Run `npm run build:view` to bundle frontend code
3. To start serving both backend server and frontend resources, you have to start nginx which was stated in the first section
