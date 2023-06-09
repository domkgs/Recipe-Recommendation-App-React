These packages are required to be installed first before we can start the frontend server
- git
sudo apt-get install git-all

- npm
sudo apt-get install nodejs npm

- cURL
sudo apt-get install curl

- Yarn
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add –echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list

sudo apt update

sudo apt install yarn

To initialise the react scripts after a fresh clone we run the following commands in the path /capstone-project-3900-f10a-jaids/frontend/my-app:

npm install

npm i --legacy-peer-deps

To run the server we run the command in the path /capstone-project-3900-f10a-jaids/frontend/my-app:

yarn start
OR WE CAN RUN
npm start

