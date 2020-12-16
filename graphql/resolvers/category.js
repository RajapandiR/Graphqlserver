import createError from 'http-errors';
import Category from '../../models/category';
import CategorySchema from '../../schemas/category';
import SubCategory from '../../models/subcategory';
// import { issueToken, getAuthUser } from '../../jwt/auth';
import waterfall from 'async-waterfall';
import  message from '../../config/message';
import JsonSchemaValidator from '../../utils/jsonSchemaValidator';
import jwt from '../../utils/jwt';

function createCategories(categories, parentId = null){
	const categoryList = [];
	let category;
	if(parentId == null){
		category = categories.filter(cat => cat.parentId == undefined);
	}else {
		category = categories.filter(cat => cat.parentId == parentId);
	}
	for(let cate of category){
		categoryList.push({
			id: cate.id,
			name: cate.name,
			description: cate.description,
			children: createCategories(categories, cate._id)
		})
	}
	// console.log("categoryList",categoryList);
	return categoryList;
}
export default {
	
	Query: {
		// categories: async (root, args,{ req }, info ) => {
		// 	let category = await Category.find()
		// 	return category;
		// },
		categories: async (root, args,{ req, res }, info ) => {
			if(req.session.isValid !== true){
				return res.status(401).send({ "statusCode": 401, message: 'Please Login' });
			}
			else {
				const header = req.headers.authorization;
				if (header == req.session.token) {
					// const token = header.replace("Bearer ", "");
					const token = jwt.verifyToken(header);
					
						if(token){
							let category = await Category.find() 
							const c = createCategories(category);
							// console.log("CL", c);
									
							// if (!category) {
							// 	throw new AuthenticationError("Invalid Category.");
							// }
							return c;	
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
		category: async (root, args,{ req }, info ) => {
			let category = await Category.findById(args.id)
			return category;
		},
	},
	Mutation: {
		// hello: ( root) => {
        //     return helloMessage;
        // },
		addcategory: async (root, args,{ req }, info ) => {
			try{
				const validate = await JsonSchemaValidator.validate(args, CategorySchema.addCategory());
				if (!validate.valid) {
					console.log("sss")
					throw createError(400, JsonSchemaValidator.errorFormatter(validate.errors));
				}
			await Category.create( args, function(err, result1) {
				if(err)
					console.log(Error, err)
			})
			const response = {
				"statusCode": 200,
				"message": message.CREATE_SUCCESS,
			}
			return response			
			}catch(err){
				console.log("Error", err);
			}
			
			// let newUser = await Category.create(args)
			// // return args;
			// // // console.log(args)
			// return {
			// 	args,
			// }
        },
        
		editcategory: async (root, args,{ req }, info ) => {
			try{
				const validate = await JsonSchemaValidator.validate(args, CategorySchema.editCategory());
				if (!validate.valid) {
					console.log("sss")
					const e = JsonSchemaValidator.errorFormatter(validate.errors);
					console.log("e",e);

				}
				let c = await Category.findByIdAndUpdate(args.id ,args, function(err, result1) {	
					if(err){
						console.log("Error", err);
					}
					console.log(args);
				
				})
			}catch(err){
				console.log(err)
				const response = {
					"statusCode": 403,
					// "message": message.UPDATE_ERROR,
					"message": message.SERVER_ERROR
				}
				return response;	
			} 
			const response = {
				"statusCode": 200,
				"message": message.UPDATE_SUCCESS,
			}
			return response;
		},
		deletecategory: async (root, args,{ req }, info ) => {
			await Category.findByIdAndRemove(args.id)
			const response = {
				"statusCode": 200,
				"message": message.DELETE_SUCCESS,
			}
			return response;
			
		},
		
	},
}