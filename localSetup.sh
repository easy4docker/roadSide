SCR_DIR=$(cd `dirname $0` && pwd)
rm -fr ${SCR_DIR}/code
mkdir -p ${SCR_DIR}/data
mkdir -p ${SCR_DIR}/code
mkdir -p ${SCR_DIR}/env

git clone https://github.com/easy4docker/easy_python_cloud.git .

docker container stop backendcloud-local-container
docker container rm backendcloud-local-container
docker container stop backendcloud-local-container_eng

docker image rm -f backendcloud-local-image
docker image rm -f backendcloud-local-image_eng

docker build -f ${SCR_DIR}/code/dockerSetting/dockerFile -t backendcloud-local-image .
docker build -f ${SCR_DIR}/code/dockerSetting/dockerFileCloudEngine -t backendcloud-local-image_eng .

docker run -d --restart=on-failure -v "${SCR_DIR}/code/mainServer":/var/_localApp -v "${SCR_DIR}/data":/var/_localAppData  \
--network network_easydocker --name backendcloud-local-container  backendcloud-local-image 
docker run -d --restart=on-failure -e ROOT_HOST="10.10.10.254" -e MAIN_PORT=""  -e ROOT_PASSWORD=FqId5mSyCpvhmP08eoyn4VaVfJZUc7uY  -p 9080:80 \
-v "${SCR_DIR}/code":/var/_localApp -v "${SCR_DIR}/data":/var/_localAppData -v "${SCR_DIR}/env":/var/_localAppEnv --network network_easydocker \
--name backendcloud-local-container_eng  backendcloud-local-image_eng

# cd /Users/johnxu/_easydocker_DATA/backendCloud/g20/code/dockerSetting
# docker container stop backendcloud-g20-container
# docker container rm backendcloud-g20-container
# docker container stop backendcloud-g20-container_eng

# docker container rm backendcloud-g20-container_eng

# docker image rm -f backendcloud-g20-image
# docker image rm -f backendcloud-g20-image_eng

# docker build -f /Users/johnxu/_easydocker_DATA/backendCloud/g20/code/dockerSetting/dockerFile -t backendcloud-g20-image .

# docker build -f /Users/johnxu/_easydocker_DATA/backendCloud/g20/code/dockerSetting/dockerFileCloudEngine -t backendcloud-g20-image_eng .

# docker run -d --restart=on-failure -v "/Users/johnxu/_easydocker_DATA/backendCloud/g20/code/mainServer":/var/_localApp -v "/Users/johnxu/_easydocker_DATA/backendCloud/g20/data":/var/_localAppData  --network network_easydocker --name backendcloud-g20-container  backendcloud-g20-image 

# docker run -d --restart=on-failure -e ROOT_HOST="10.10.10.254" -e MAIN_PORT=""  -e ROOT_PASSWORD=FqId5mSyCpvhmP08eoyn4VaVfJZUc7uY  -p 34080:80  -v "/Users/johnxu/_easydocker_DATA/backendCloud/g20/code":/var/_localApp -v "/Users/johnxu/_easydocker_DATA/backendCloud/g20/data":/var/_localAppData -v "/Users/johnxu/_easydocker_DATA/backendCloud/g20/env":/var/_localAppEnv --network network_easydocker --name backendcloud-g20-container_eng  backendcloud-g20-image_eng
