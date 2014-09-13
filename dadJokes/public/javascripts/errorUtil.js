module.exports = {
   renderError : function (res, msg)
   {
      res.render('helloworld', { title: msg })
   }

};

