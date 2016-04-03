/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
module.exports = {
	new:function (req, res) {
		res.view();
	},
	create:function (req, res) {
		var userObj={
			name : req.param('name'),
			lastname : req.param('lastname'),
			types: req.param('types'),
			email : req.param('email'),
			password: req.param('password'),
			password_confirmation: req.param('password_confirmation')
		}
		User.create(userObj,function(err, user){
			if(err){
				console.log(err);
				req.session.flash={
					err:err
				};
				return res.redirect('user/new');
			}
			res.redirect('user/show/'+ user.id)
		})
	},

	show:function(req ,res, next){
		User.findOne(req.param('id'),function userFounded(err, user){
			if(err){
				// redireccionamos a la vista de error
				return next(err);
			}
			res.view({
				user:user
			});
		});
	},

	edit:function(req, res, next){
		User.findOne(req.param('id'), function userFounded(err, user){
			// si hay un error mandar a esta pag
			if (err){
				return next(err);
			}
			// si no hay usuario redirecciona a esta pag err
			if (!user){
				return next(err);
			}
			res.view({
				user:user
			});
		});
	},

	update:function(req, res, next){
		var userObj={
			name : req.param('name'),
			lastname : req.param('lastname'),
			types : req.param('types'),
			email : req.param('email')
		}
		User.update(req.param('id'), userObj, function userUpdated(err, user){
			if(err){
				req.session.flash = {
					err:err
				}
				return res.redirect('/user/edit/'+req.param('id'));
			}
			return res.redirect('/user/show/'+req.param('id'));
		})
	},
	index:function(req,res,next){
		User.find(function userFounded(err, users){
			if(err){
				req.session.flash={
					err:err
				}
				return next(err);
			}
			res.view({
				users:users
			});
		});
	}, 
	destroy:function(req,res,next){
		User.destroy(req.param('id'),function userDestroyed(err){
			if (err){
				req.session.flash={
					err:err
				}
				return next(err);
			}
			res.redirect('/user')
		});
	}	
	
};

