'use strict';

module.exports = function (mongoose, callback) {
  mongoose.connection.db.collections(function (_, collections) {
    collections.forEach(function (collection) {
      var count = collections.length;
      if (count < 1) { return callback.apply(); }

      collection.drop(function(){
        if (--count <= 0 && callback) {
          callback.apply();
        }
      });
    });
  });
};
