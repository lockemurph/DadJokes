module.exports = {
   renderError : function (res, msg)
   {
      res.render('error', { title: msg })
   }

};

