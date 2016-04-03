/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

var bcrypt = require('bcrypt');
module.exports = {

  attributes: {
  	name:{
  		type:'string',
  		required:true
  	},
  	lastname:{
  		type:'string',
  		required:true
  	},
  	email:{
  		type:'email',
  		required:true,
  		unique:true
  	},
  	types:{
  		type:'integer',
  		required:true
  	},
  	password:{
  		type:'string',
  		required:true
  	},
  	password_confirmation:{
  		type:'string',
  		required:true

  	},
  	password_hash:{
  		type:'string'
  	}
  },

    beforeCreate: function (values, next) {
    var password = values.password;
    var password_confirmation = values.password_confirmation;
    if(!password || !password_confirmation || password != password_confirmation){
      var passDoesntMatch=[{
        name:'passDoesntMatch',
        message:'password does not match \nLas contraseñas deben coincidir'
      }]
      return next({
        err: passDoesntMatch
      });
    }
    bcrypt.hash(values.password, 10, function(err, password_hash){
      values.password_hash = password_hash;
      values.password = null;
      values.password_confirmation = null;
      next();
    });
  }
};

