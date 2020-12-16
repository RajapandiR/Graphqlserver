import Product from '../../models/product';
import Attribute from '../../models/attributes';
import  message from '../../config/message';
import waterfall from 'async-waterfall';
import jwt from '../../utils/jwt';

export default {
	Query: {
		// products: async (root, args,{ req }, info ) => {
		// 	let product = await Product.find()
		// 	return product;
		// },
		products: async (root, args,{ req, res }, info ) => {
			
			if(req.session.isValid !== true){
				return res.status(401).send({ "statusCode": 401, message: 'Please Login' });
			}
			else {
				const header = req.headers.authorization;
				if (header == req.session.token) {
					// const token = header.replace("Bearer ", "");
					const token = jwt.verifyToken(header);
					if(token){
						let product = await Product.find();
						if (!product) {
							throw new AuthenticationError("Invalid product.");
						}
						return product;
					}
				}
				let requireAuth = true
				if (requireAuth) {
					return res.status(401).send({ auth: false, message: 'No Authorization header provided.' });
				// throw new AuthenticationError("You must be logged in.");
				}
				return null;
			}
		},
		product: async (root, args,{ req }, info ) => {
			let product = await Product.findById(args.id)
			return product;
		},

	},
	Mutation: {
		// hello: ( root) => {
        //     return helloMessage;
        // },
		// addProduct: async (root, args,{ req }, info ) => {
		// 	let product = new Product({
		// 		name: args.name,
		// 		sku: args.sku,
		// 		category: args.category,
		// 		price: args.price,
		// 		weight: args.weight,
		// 		quantity: args.quantity,
		// 		description: args.description,
		// 		attributes: {
		// 			brand: args.brand,
		// 			dimension: args.dimension,
		// 			color: args.color,
		// 			material: args.material,
		// 			hardware: args.hardware
		// 		}
		//       });
		// 	  product.save();
		// 	  const response = {
		// 		"statusCode": 200,
		// 		"message": message.CREATE_SUCCESS,
		// 	}
		// 	return response;
		// },
		addProduct: async (root, args,{ req }, info ) => {
			waterfall([
				function(done){
					// let attribute = new Attribute({
					// 	brand: args.brand,
					// 	dimension: args.dimension,
					// 	color: args.color,
					// 	material: args.material,
					// 	hardware: args.hardware
					// })
					Attribute.create(args,  function(err, result) {
						done(null, result);
					})
					// attribute.save()
				  	
					
  
				},
				function(attribute, done){
					let attribute_id = attribute._id
					let product = new Product({
						name: args.name,
						sku: args.sku,
						category: args.category,
						price: args.price,
						weight: args.weight,
						quantity: args.quantity,
						description: args.description,
						attributes: attribute_id
						});
						product.save();
					done(null, product);
				},
	
			  ], function (err, result) {
					if(err)
						console.log("Error", err)
				
			  });
		
			  const response = {
				"statusCode": 200,
				"message": message.CREATE_SUCCESS,
			}
			return response;
		},	  
		
		editProduct: async (root, args,{ req }, info ) => {
			// let body = {}
					
			// // body.attributes = {}
			// body.id = id;
			// if (name !== undefined) {
			// 	body.name = name; 
			// }
			// if (sku !== undefined) {
			// 	body.sku = sku; 
			// }
			// if (category !== undefined) {
			// 	body.category = category; 
			// }
			// if (price !== undefined) {
			// 	body.price = price; 
			// 	}
			// if (weight !== undefined) {
			// 	body.weight = weight; 
			// }
			// if (quantity !== undefined) {
			// 	body.quantity = quantity; 
			// }
			// if (description !== undefined) {
			// 	body.description = description; 
			// }
			try {
				let c = await Product.findByIdAndUpdate(args.id ,args, function(err, result1) {	
					if(err)
						console.log("Error", err)		
				})
			// }catch(err){
			// 	// console.log(err)
			// 	const response = {
			// 		"statusCode": 403,
			// 		// "message": message.UPDATE_ERROR,
			// 		"message": message.SERVER_ERROR
			// 	}
			// 	return response;	
			// } 
			
				Product.find({_id:args.id}, function(err, data){
					// console.log("Data", data)
					const atid = data[0].attributes
					console.log(atid);
					let d = Attribute.findByIdAndUpdate(atid ,args,function(err, result1) {

					})
				})
				
			const response = {
				"statusCode": 200,
				"message": message.UPDATE_SUCCESS,
			}
			return response;
			}catch(err){
				console.log("EE",err);
				const response = {
					"statusCode": 403,
					"message": message.SERVER_ERROR,
				}
				return response;
			}
		 	
		},
	
		deleteProduct: async (root, args,{ req }, info ) => {
			let product = await Product.findByIdAndRemove(args.id)
			return product;
		},
		
	},
}