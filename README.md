# Meanshop [![Build Status](https://travis-ci.org/amejiarosario/meanshop.svg?branch=master)](https://travis-ci.org/amejiarosario/meanshop)

E-commerce Application built with the MEAN stack

This e-commerce platform is built step-by-step on my book "Building an e-Commerce Application with MEAN" available on:

  - [Amazon](http://www.amazon.com/Building-e-Commerce-Application-Adrian-Mejia/dp/1785286552/)
  - [Packt Publishing](https://www.packtpub.com/web-development/building-e-commerce-application-mean)
  - [Safari Online](https://www.safaribooksonline.com/library/view/building-an-e-commerce/9781785286551/)
  - [O'Reilly Books](http://shop.oreilly.com/product/9781785286551.do)

![Building an e-Commerce Application with MEAN](https://raw.githubusercontent.com/amejiarosario/meanshop/master/e2e/fixtures/meanshop-book.png "Building an e-Commerce Application with MEAN")

# Installation

## Node v0.12.x

You need Node 0.12 in your system. Verify if you already have it with `node -v`. If not or a different version, you can use Node Version Manager (nvm) to install it:
```bash
curl https://raw.githubusercontent.com/creationix/nvm/v0.24.1/install.sh | bash
source ~/.nvm/nvm.sh
nvm install 0.12
nvm use 0.12
```

## NPM global dependencies
```bash
# Yeaoman
npm install -g yo

# Angular fullstack generators
npm install -g generator-angular-fullstack@3.0.0-rc4

# Grunt CLI
npm install -g grunt-cli

# Bower
npm install -g bower
```

## Sass dependencies
You need to have ruby in your system. Mac OS X and Linux ship with Ruby, verify by typing `ruby -v`. Then install the sass gem (library).
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

## Troubleshooting
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

## Getting a chapter's code
By default when you checkout, you get the `master` branch which is the latests version of the app. For your convenience, you can also checkout chapter's code with the following commands (inside the project directory):
```bash
# checking out chapter 1
git checkout ch1

# checking out chapter 7
git checkout ch1

# checking out the latest
git checkout master
```

# Usage
  - run server (dev mode): `grunt serve`
  - run server (production mode): `grunt serve:dist`
  - run tests: `grunt test`
  - run e2e tests: `grunt test:e2e`
  - compile assets: `grunt build`

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

# Contact
Find my contact info at [http://adrianmejia.com](http://adrianmejia.com).
