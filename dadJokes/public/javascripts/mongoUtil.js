var ObjectID = require('mongodb').ObjectID;


module.exports = {
   validateId : function (id, callback)
   {
      callback(ObjectID.isValid(id));
   }

};

