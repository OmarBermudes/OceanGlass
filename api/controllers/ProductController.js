/**
 * ProductController
 *
 * @description :: Server-side logic for managing products
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	new:function (req, res) {
		res.view();
	},
	create:function (req, res) {
		var productObj={
			name : req.param('name'),
			types: req.param('types'),
			quantity : req.param('quantity'),
		}
		Product.create(productObj,function(err, product){
			if(err){
				console.log(err);
				req.session.flash={
					err:err
				};
				return res.redirect('product/new');
			}
			res.redirect('product/show/'+ product.id)
		})
	},

	show:function(req ,res, next){
		Product.findOne(req.param('id'),function productFounded(err, product){
			if(err){
				// redireccionamos a la vista de error
				return next(err);
			}
			res.view({
				product:product
			});
		});
	},

	edit:function(req, res, next){
		Product.findOne(req.param('id'), function productFounded(err, product){
			if (err){
				return next(err);
			}
			if (!product){
				return next(err);
			}
			res.view({
				product:product
			});
		});
	},

	update:function(req, res, next){
		var productObj={
			name : req.param('name'),
			types : req.param('types'),
			quantity : req.param('quantity')
		}
		Product.update(req.param('id'), productObj, function productUpdated(err, product){
			if(err){
				req.session.flash = {
					err:err
				}
				return res.redirect('/product/edit/'+req.param('id'));
			}
			return res.redirect('/product/show/'+req.param('id'));
		})
	},
	index:function(req,res,next){
		Product.find(function productFounded(err, products){
			if(err){
				req.session.flash={
					err:err
				}
				return next(err);
			}
			res.view({
				products:products
			});
		});
	}, 
	destroy:function(req,res,next){
		Product.destroy(req.param('id'),function productDestroyed(err){
			if (err){
				req.session.flash={
					err:err
				}
				return next(err);
			}
			res.redirect('/product')
		});
	}
	
};

