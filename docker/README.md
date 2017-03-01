# docker-noflo-runtime-js
This is the source to build a docker container for [noflo-nodejs](https://github.com/noflo/noflo-nodejs).
There shall be an additional version for X86 in addition to the current ARM (Raspberry Pi) version.

## Very short: How do I use it?
Install docker engine on a Raspberry Pi and then run 
    
    docker run -d -e "SEJNUB_FLOWHUB_USERID=<user-id>" -e "SEJNUB_NOFLO_RUNTIME_HOST=<host>" -e "SEJNUB_NOFLO_RUNTIME_SECRET=<secret>" -e "SEJNUB_NOFLO_RUNTIME_LABEL=<label>" --name nojs -p 3569:3569 sejnub/noflo-runtime-js:rpi-latest 
    
and now the longer version:


## Status and rights
Seems to be working. 
Totally free to use by everyone.


## Tags
  * **``rpi-latest``**  Latest version for Raspberry Pi


## Clean up before build
    docker rm $(docker ps -a -f status=exited -q)
    docker rmi $(docker images -f dangling=true -q)
    docker volume rm $(docker volume ls -f dangling=true -q)
    

## Build
    
    cd ~; rm -rf docker-noflo-runtime-js; git clone https://github.com/sejnub/docker-noflo-runtime-js.git
    cd ~/docker-noflo-runtime-js; docker build --no-cache=false -t sejnub/noflo-runtime-js:rpi-latest .


## Push images to https://hub.docker.com

If you are not sejnub you have to retag the images to your username at dockerhub and use those new tags. The following commands use the authors tags.

Log into dockerhub and push the images with
    
    docker login
    docker push sejnub/noflo-runtime-js:rpi-latest


## Create env-file (optional)
You have to create an env-file `/usr/local/etc/sejnub-credentials.env` with the following content

    # noflo-runtime-js
    SEJNUB_FLOWHUB_USERID=<your-user-id-that-you-got-from-flowhub>
    SEJNUB_NOFLO_RUNTIME_HOST=<ip-or-hostname-which-can-be-used-to-access-the-runtime>
    SEJNUB_NOFLO_RUNTIME_SECRET=<freely-choosable-secret-string>
    SEJNUB_NOFLO_RUNTIME_LABEL=<freely-choosable-label>


## Run interactively

Depending on if you created the env-file you run one of the following commands

    docker rm -f nojs; docker run -it -e "SEJNUB_FLOWHUB_USERID=<user-id>" -e "SEJNUB_NOFLO_RUNTIME_HOST=<host>" -e "SEJNUB_NOFLO_RUNTIME_SECRET=<secret>" -e "SEJNUB_NOFLO_RUNTIME_LABEL=<label>" --name nojs -p 3569:3569 sejnub/noflo-runtime-js:rpi-latest /bin/bash
    docker rm -f nojs; docker run -it --env-file /usr/local/etc/sejnub-credentials.env --name nojs -p 3569:3569 sejnub/noflo-runtime-js:rpi-latest /bin/bash


## Run for production

Depending on if you created the env-file you run one of the following commands

    docker rm -f nojs; docker run -d -e "SEJNUB_FLOWHUB_USERID=<user-id>" -e "SEJNUB_NOFLO_RUNTIME_HOST=<host>" -e "SEJNUB_NOFLO_RUNTIME_SECRET=<secret>" -e "SEJNUB_NOFLO_RUNTIME_LABEL=<label>" --name nojs -p 3569:3569 sejnub/noflo-runtime-js:rpi-latest 
    docker rm -f nojs; docker run -d --env-file /usr/local/etc/sejnub-credentials.env --name nojs -p 3569:3569 sejnub/noflo-runtime-js:rpi-latest

or you can also use a mix like e.g.

    docker rm -f nojs; docker run -d --env-file /usr/local/etc/sejnub-credentials.env -e "SEJNUB_NOFLO_RUNTIME_LABEL=<label>" --name nojs -p 3569:3569 sejnub/noflo-runtime-js:rpi-latest



The specified port on the host $SEJNUB_NOFLO_RUNTIME_HOST must be accesible from the browser.


## Links
https://docs.flowhub.io/getting-started-node/

