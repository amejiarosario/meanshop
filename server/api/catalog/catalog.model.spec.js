var Catalog = require('./catalog.model');
var Product = require('../product/product.model');

describe('Product+Catalog', function() {
  var root, books, food, furniture;
  var createCatalog = function (done){
    Catalog
      .find({})
      .remove()
      .then(function () {
        return Product.find({}).remove();
      })
      .then(function () {
        return Catalog.create({name: 'Navigation'})
      })
      .then(function (rootElement) {
        root = rootElement;
        return root.addChild({name: 'Books'});
      })
      .then(function (child) {
        books = child;
        return root.addChild({name: 'Food'});
      })
      .then(function (child) {
        food = child;
        return root.addChild({name: 'Furniture'});
      })
      .then(function (child) {
        furniture = child;
        done();
      })
      .then(null, done);
  }

  beforeEach(function (done) {
    return createCatalog(done);
  });

  it('should create a product with book catetory', function(done) {
    Product.create({title: 'Broccoli', price: 123, categories: [books._id]})
      .then(function () {
        return Product.findOne({}).populate(['categories', 'categories.parent']);
      })
      .then(function (newBook) {
        var category = newBook.categories[0];
        category.name.should.be.equal('Books');
        category.slug.should.be.equal('books');
        done();
      })
      .then(null, done);
  });
});

describe('Finding products by category', function () {
  var mainCatalog, electronics, books, clothing, vehicle, pantry, appliances;

  var createProductsCatalog = function (callback) {
    Catalog
      .find({})
      .remove()
      .then(function () {
        return Catalog.create({ name: 'All'});
      })
      .then(function (catalog) {
        mainCatalog = catalog;
        return mainCatalog.addChild({name: 'Electronics'});
      })
      .then(function (category) {
        electronics = category._id;
        return mainCatalog.addChild({name: 'Books'});
      })
      .then(function (category) {
        books = category._id;
        return mainCatalog.addChild({name: 'Clothing'});
      })
      .then(function (category) {
        clothing = category._id;
        return mainCatalog.addChild({name: 'Vehicle'});
      })
      .then(function (category) {
        vehicle = category._id;
        return mainCatalog.addChild({name: 'Pantry'});
      })
      .then(function (category) {
        pantry = category._id;
        return mainCatalog.addChild({name: 'Appliances'});
      })
      .then(function (category) {
        appliances = category._id;
        return Product.find({}).remove({});
      })
      .then(function() {
        return Product.create({
          title : 'GoPro HERO4 SILVER',
          price : 399.99,
          stock : 200,
          categories : [electronics],
          description : 'GoPro’s high-end camera model that features a new design with an integrated LCD, significantly increasing ease of use.'
        }, {
          title : 'Building an E-Commerce Application with MEAN',
          price : 23.99,
          stock : 950,
          categories : [books],
          description : 'Build an state-of-the-art using the MEAN stack (MongoDB, ExpressJS, AngularJS and NodeJS)'
        }, {
          title : 'Ray-Ban RB2132 Sunglasses',
          price : 146.99,
          stock : 10,
          categories : [clothing],
          description : 'Plastic imported Ray-Ban RB2132 New Wayfarer Sunglasses'
        }, {
          title : 'PlayStation 4 Console',
          price : 399.95,
          stock : 100,
          categories : [electronics],
          description : 'The PlayStation 4 system opens the door to an incredible journey through immersive new gaming worlds and a deeply connected gaming community. PS4 puts gamers first with an astounding launch lineup and over 180 games in development. Play amazing top-tier blockbusters and innovative indie hits on PS4. Developer Inspired, Gamer Focused.'
        }, {
          title : 'Toyota Corolla 2014',
          price : 16493,
          stock : 1,
          categories : [vehicle],
          description : 'ECO 38 MPG , CLEAN CARFAX , ONE OWNERS LOW MILEGE , LE POWER PACK , BACK UP CAMERA , BLUETOOTH , AUTOMATIC CLIMATE CONTROL , NONSMOKER , VERY CLEAN IN AND OUT , COMES WITH 2 KEYS , BOOKS , SERVICE RECORDS , 3YR / 36K FULL TOYOTA WARRANTY & FREE OIL CHANGES'
        }, {
          title : 'iPad Air 2 Wi-Fi 16GB - Silver',
          price : 499,
          stock : 15,
          categories : [electronics],
          description : 'The power and portability of iPad unlock possibilities that will change the way you do the things you love. '
        });
      })
      .then(function () {
        callback(null);
      })
      .then(null, callback);
  }

  beforeEach(function (done) {
    return createProductsCatalog(done);
  });

  it('should find 3 electronic products', function(done) {
    Product
      .find({'categories': electronics })
      .populate('categories')
      .exec()
      .then(function (products) {
        products.length.should.be.equal(3);
        done()
      })
      .then(null, done);
  });

  it('should find one vehicle and one clothing products', function (done) {
    Product
      .find({'categories': { $in: [vehicle, clothing]} })
      .populate('categories')
      .exec()
      .then(function (products) {
        products.length.should.be.equal(2);
        done()
      })
      .then(null, done);
  });


  it('should find _all_ products', function (done) {
    Product
      .find({'categories': { $in: mainCatalog.children } })
      .populate('categories')
      .exec()
      .then(function (products) {
        expect(mainCatalog.children).to.contain(vehicle);
        expect(mainCatalog.children).to.contain(clothing);
        expect(mainCatalog.children).to.contain(electronics);
        expect(mainCatalog.children).to.contain(books);
        expect(mainCatalog.children).to.contain(pantry);
        products.length.should.be.equal(6);
        done()
      })
      .then(null, done);
  });
});
