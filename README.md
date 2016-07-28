# Meanshop [![Build Status](https://travis-ci.org/amejiarosario/meanshop.svg?branch=master)](https://travis-ci.org/amejiarosario/meanshop)

E-commerce Application built with the MEAN stack

This e-commerce platform is built step-by-step on my book "Building an e-Commerce Application with MEAN" available on:

  - [Amazon](http://www.amazon.com/Building-e-Commerce-Application-Adrian-Mejia/dp/1785286552/)
  - [Packt Publishing](https://www.packtpub.com/web-development/building-e-commerce-application-mean)
  - [Safari Online](https://www.safaribooksonline.com/library/view/building-an-e-commerce/9781785286551/)
  - [O'Reilly Books](http://shop.oreilly.com/product/9781785286551.do)

![Building an e-Commerce Application with MEAN](https://raw.githubusercontent.com/amejiarosario/meanshop/master/e2e/fixtures/meanshop-book.png "Building an e-Commerce Application with MEAN")

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
**Table of Contents**

- [Installation](#installation)
  - [Node v0.12.x](#node-v012x)
  - [NPM global dependencies](#npm-global-dependencies)
  - [Sass dependencies](#sass-dependencies)
  - [MongoDB v3.x](#mongodb-v3x)
  - [Source code](#source-code)
  - [Getting a chapter's code](#getting-a-chapters-code)
- [Usage](#usage)
- [Setting up 3rd party Integrations](#setting-up-3rd-party-integrations)
  - [Optional for social Login](#optional-for-social-login)
- [Issues](#issues)
- [Contributing](#contributing)
- [Deploying to Heroku](#deploying-to-heroku)
- [Troubleshooting](#troubleshooting)
- [Docker](#docker)
- [Contact](#contact)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Installation

The following instructions are the most common to get the development environment up and running. If you run into issues, check out the [troubleshooting](#troubleshooting) section and alternative OS-independent installations using [Docker](#docker).

## Node v0.12.x
This installation covers *nix like systems (OS X and Ubuntu/Linux). Windows? check out https://github.com/coreybutler/nvm-windows

You need Node 0.12 in your system. Verify if you already have it with `node -v`. If not or a different version, you can use Node Version Manager (nvm) to install it:
```bash
curl https://raw.githubusercontent.com/creationix/nvm/v0.24.1/install.sh | bash
source ~/.nvm/nvm.sh
nvm install 0.12
nvm use 0.12
```

## NPM global dependencies
```bash
# Bower
npm install -g bower

# Grunt CLI
npm install -g grunt-cli

# Yeaoman
npm install -g yo

# Angular fullstack generators
npm install -g generator-angular-fullstack@3.0.0-rc4
```

## Sass dependencies
You need to have ruby in your system. Mac OS X and Linux ship with Ruby, verify by typing `ruby -v`.
**Windows**: if you are using windows install Ruby with [http://rubyinstaller.org/downloads/](http://rubyinstaller.org/downloads/)

Then, install the sass gem (library):
```
gem install sass
```

## MongoDB v3.x

- Mac: `brew install mongodb 3.0.2`
- Ubuntu: `sudo apt-get -y install mongodb=3.0.2`


## Source code
You can either build the project from scratch following the instructions on the book's chapter 1 or get the source code.
```bash
git clone https://github.com/amejiarosario/meanshop.git
cd meanshop
npm install
bower install
```

## Getting a chapter's code
By default when you checkout, you get the `master` branch which is the latests version of the app. For your convenience, you can also checkout chapter's code with the following commands (inside the project directory):
```bash
# checking out chapter 1
git checkout ch1

# checking out chapter 7
git checkout ch7

# checking out the latest
git checkout master
```

# Usage
  - run server (dev mode): `grunt serve`
  - run server (production mode): `grunt serve:dist`
  - run tests: `grunt test`
  - run e2e tests: `grunt test:e2e`
  - compile assets: `grunt build`

# Setting up 3rd party Integrations

You need 3rd party API credentials to be able to use the application. They are stored in the `local.env.js`, but since it will contain sensitive information you need to create it yourself. Use the sample file `local.env.sample.js` to make a copy of a real one:

```bash
cp server/config/local.env.sample.js server/config/local.env.js
```

Get Braintree keys from:  https:// www.braintreepayments.com/get-started. Check book chapter 7 for more details.
```bash
  BRAINTREE_ID: 'public key',
  BRAINTREE_SECRET: 'private key',
  BRAINTREE_MERCHANT: 'merchant ID',
```

Note: Everytime a keys is added you need to stop `grunt serve` and start it again.

**Using the Braintree sandbox account**

We can test the workflow of order creation by running the application:

1. Add multiple products to the shopping cart.
2. Checkout the products using some valid credit card numbers for testing such as 4111 1111 1111 1111 or 4242 4242 4242 4242.
3. Any expiration date in the future will do.

## Optional for social Login 

In the chapter 6 you can find more detailed information. Here's a summary of what you need:

Go to Facebook Developers and register your app: https://developers.facebook.com
```bash
  FACEBOOK_ID:      'app-id',
  FACEBOOK_SECRET:  'secret',
```

Go to Twitter Apps and get your app registred: https://apps.twitter.com
```bash
  TWITTER_ID:       'app-id',
  TWITTER_SECRET:   'secret',
```

Go to Google Developers and get the credentials:  https://console.developers.google.com/project
```bash
  GOOGLE_ID:        'app-id',
  GOOGLE_SECRET:    'secret',
```


# Issues
For any question, ideas for improvement use [click here](https://github.com/amejiarosario/meanshop/issues/new).

# Contributing
If you have ideas to make this app better (and you should! 😉) you can contribute your features using the following instructions:

1. Fork it clicking the fork button on the top right corner of this page.
2. Create your feature branch: `git checkout -b my-new-feature`.
3. Commit your changes: `git add . && git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin my-new-feature`
5. Come to this page and it will show up "create pull request" option.
6. Submit your pull request and add some info about your changes. Include screenshots and animated GIFs in your pull request whenever possible.

When you are contributing for a 2nd time or further, sync your fork to make sure you have the latest code. More instructions in [setting upstream](https://help.github.com/articles/configuring-a-remote-for-a-fork/) and [syncing a fork](https://help.github.com/articles/syncing-a-fork/).

# Deploying to Heroku

Heroku requires installing a command-line program called heroku-toolbelt. Follow the instructions on [https://toolbelt.heroku.com](https://toolbelt.heroku.com) to install it. Also, create an account in Heroku if haven't yet.

Deploy commands:
```bash
# Build for production
grunt build

# Use angular generator to deploy
yo angular-fullstack:heroku

# Add MongoDB to heroku deployment
cd dist && heroku addons:create mongolab:sandbox

# Set environment to production
heroku config:set NODE_ENV=production

# Add all 3rd party credentials .e.g.:
$ heroku config:set FACEBOOK_ID=appId FACEBOOK_SECRET=secret

# See deployed app
heroku open
```

You can visualize all the set variables with
`heroku config`.

Any other update can be refreshed on Heroku by typing the following command:
`grunt buildcontrol:heroku`.

# Troubleshooting

Depending on the OS, there are some subtle differences.

If you don't have enough permissions consider using: `sudo npm install` vs `npm install`

Allows running commands as root: `bower install --allow-root`

Detailed MongoDB installation on Ubuntu:
```bash
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org=3.0.2 mongodb-org-server=3.0.2 mongodb-org-shell=3.0.2 mongodb-org-mongos=3.0.2 mongodb-org-tools=3.0.2
```

# Docker

Docker allows to run app independently from OS. It works for Windows, Mac, Linux and most cloud providers (AWS, Digital Ocean, ...).  Just need to install docker from [https://www.docker.com/](https://www.docker.com/).

After installing docker programs, go to the terminal:

```bash
# make sure you have them available
docker --version
docker-compose --version

# start docker daemons
docker-machine ls
docker-machine start default
eval "$(docker-machine env default)"

# create VMs (might take a while the first time since installs all NPM packages)
docker-compose build

# run the app
docker-compose up -d

# get ip of the VM
docker-machine ip

# open browser with running app on http://192.168.99.100:7000
open http://$(docker-machine ip):7000 # only OS X

# List containers
docker-compose ps

#      Name               Command          State            Ports
#      -------------------------------------------------------------------------
#      meanshop_db_1    /entrypoint.sh mongod   Up      0.0.0.0:27017->27017/tcp
#      meanshop_web_1   npm start               Up      0.0.0.0:7000->7000/tcp

# Run commands in containers (e.g. database container)
docker exec -it meanshop_db_1 bash

#=>     root@834d77cc6b36:/# mongo
#=>     MongoDB shell version: 3.2.6
#=>     connecting to: test
#=>     Welcome to the MongoDB shell.
#=>     
#=>     > show dbs
#=>     local         0.000GB
#=>     meanshop      0.000GB
#=>     meanshop-dev  0.000GB
#=>     
#=>     > use meanshop-dev
#=>     switched to db meanshop-dev
#=>     
#=>     > show collections
#=>     catalogs
#=>     products
#=>     sessions
#=>     users
#=>
#=>     > db.products.find({})
#=>     { "_id" : ObjectId("573204ad48b9ba0c001eea3b"), "title" : "MEAN eCommerce Book", "imageUrl" : "/assets/uploads/meanbook.jpg", "price" : 25, "description" : "Build a powerful e-commerce application quickly with MEAN, a leading full-JavaScript stack. It takes you step-by-step from creating a real-world store to managing details such as authentication, shopping carts, payment, scalability and more.", "categories" : [ ObjectId("573204ad48b9ba0c001eea39") ], "stock" : 250, "__v" : 0 }
#=>     { "_id" : ObjectId("573204ad48b9ba0c001eea3c"), "title" : "T-shirt", "imageUrl" : "/assets/uploads/meantshirt.jpg", "price" : 15, "description" : "T-shirt with the MEAN stack logo", "categories" : [ ObjectId("573204ad48b9ba0c001eea3a") ], "stock" : 100, "__v" : 0 }
#=>     { "_id" : ObjectId("573204ad48b9ba0c001eea3d"), "title" : "Coffee Mug", "imageUrl" : "/assets/uploads/meanmug.jpg", "price" : 8, "description" : "Convert coffee into MEAN code", "categories" : [ ObjectId("573204ad48b9ba0c001eea38") ], "stock" : 50, "__v" : 0 }


# View logs
docker-compose logs # or docker-compose logs web # or docker-compose logs db

# Stop services
docker-compose stop

# Remove stopped containers
docker-compose rm
```

# Contact
Find my contact info at [http://adrianmejia.com](http://adrianmejia.com).
