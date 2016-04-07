# Meanshop [![Build Status](https://travis-ci.org/amejiarosario/meanshop.svg?branch=master)](https://travis-ci.org/amejiarosario/meanshop)

E-commerce Application built with the MEAN stack

This e-commerce platform is built step-by-step on my book "Building an e-Commerce Application with MEAN" available on:

  - [Amazon](http://www.amazon.com/Building-e-Commerce-Application-Adrian-Mejia/dp/1785286552/)
  - [Packt Publishing](https://www.packtpub.com/web-development/building-e-commerce-application-mean)
  - [Safari Online](https://www.safaribooksonline.com/library/view/building-an-e-commerce/9781785286551/)
  - [O'Reilly Books](http://shop.oreilly.com/product/9781785286551.do)

![Building an e-Commerce Application with MEAN](https://raw.githubusercontent.com/amejiarosario/meanshop/master/e2e/fixtures/meanshop-book.png "Building an e-Commerce Application with MEAN")

# Requirements

Node v0.12
```bash
curl https://raw.githubusercontent.com/creationix/nvm/v0.24.1/install.sh | bash
source ~/.nvm/nvm.sh
nvm install 0.12
nvm use 0.12
```

Angular Generator
```
npm install -g generator-angular-fullstack@3.0.0-rc4
```

MongoDB v3.x

- Mac: `brew install mongodb 3.0.2`
- Ubuntu: `sudo apt-get -y install mongodb=3.0.2`

# Install

```bash
git clone https://github.com/amejiarosario/meanshop.git
cd meanshop
npm install
bower install
```

# Command lines
  - run server (dev mode): `grunt serve`
  - run server (production mode): `grunt serve:dist`
  - run tests: `grunt test`
  - run e2e tests: `grunt test:e2e`
