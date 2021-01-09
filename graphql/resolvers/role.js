import createError from 'http-errors';
import Role from '../../models/role';
import  message from '../../config/message';
import JsonSchemaValidator from '../../utils/jsonSchemaValidator';

export default {
	Query: {
		roles: async (root, args,{ req }, info ) => {
			let role = await Role.find()
			return role;
		},
		role: async (root, args,{ req }, info ) => {
			let role = await Role.findById(args.id)
			return role;
		},
	},
	Mutation: {
		addRole: async (root, args,{ req }, info ) => {
			try{
				// const validate = await JsonSchemaValidator.validate(args, RoleSchema.addRole());
				// if (!validate.valid) {
				// 	console.log("sss")
				// 	throw createError(400, JsonSchemaValidator.errorFormatter(validate.errors));
                // }
                const role = await Role.findOne({role: args.role})
				// console.log(user);
				if(role){
					let msg = "Role already taken"
					const response = {
						"statusCode": 403,
						"message": msg
					}
					return response
				}
                await Role.create( args, function(err, result1) {
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
			
        },
        
		editRole: async (root, args,{ req }, info ) => {
			try{
				// const validate = await JsonSchemaValidator.validate(args, RoleSchema.editRole());
				// if (!validate.valid) {
				// 	console.log("sss")
				// 	const e = JsonSchemaValidator.errorFormatter(validate.errors);
				// 	console.log("e",e)
				// }
				let c = await Role.findByIdAndUpdate(args.id ,args, function(err, result1) {	
					console.log(args);
					if(err){
						console.log("Error", err);
					}				
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
		deleteRole: async (root, args,{ req }, info ) => {
			await Role.findByIdAndRemove(args.id)
			const response = {
				"statusCode": 200,
				"message": message.DELETE_SUCCESS,
			}
			return response;
			
		},
		
	},
}