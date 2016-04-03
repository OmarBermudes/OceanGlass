/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt = require('bcrypt');
module.exports = {

	new:function(req,res) {
		res.view();
	},
	create:function(req, res, next){
		var email = req.param('email');
		var password = req.param('password');
		if(!email || !password){
			var noEmailOrPass = [{
				message:'No ingresó email o contraseña'
			}];
			req.session.flash={
				err:noEmailOrPass
			}
			return res.redirect('/session/new');
		}
		User.findOneByEmail(email,function userFounded(err, user){
			if(err){
				req.session.flash={
					err:err
				}
				return res.redirect('/session/new');
			}
			if(!user){
				var noEmailFounded=[{message:'El email no se encuentra'}];
				req.session.flash={
					err:noEmailFounded
				}
				return res.redirect('/session/new');
			}
			bcrypt.compare(password, user.password_hash, function passwordMatch(err, valid) {
				if(err){
					req.session.flash={
					err:err
					}
					return res.redirect('/session/new');
				}
				if(!valid){
					var passDontMatch=[{message:'La combinación de email y contraseña no es valida'}];
					req.session.flash={
						err:passDontMatch
					}
					return res.redirect('/session/new');
				}
				req.session.authenticated = true;
				req.session.User = user;
				return res.redirect('/user/show/'+ user.id);
			});
		});
	},
	destroy:function(req,res,next){
		req.session.destroy();
		res.redirect('/session/new')
	}
	
};
