import createError from 'http-errors';
import User from '../../models/user';
import Role from '../../models/role';
// import { issueToken, getAuthUser } from '../../jwt/auth';
import  message from '../../config/message';
import bcrypt from 'bcryptjs';
import jwt from '../../utils/jwt';
import JsonSchemaValidator from '../../utils/jsonSchemaValidator';
import getAuthUser from '../../auth/auth';

function save_session (req, data, token) {
	req.session.isValid = true;
	req.session.username = data.username;
	req.session.token = token;
	req.session.userId = data.id;
	req.session.role = data.role.role;
	req.user = data;
}
export default {
	Query: {
		// users: async (root, args,{ req, res }, info ) => {
		// 	// console.log("Req", req)
		// 	let authUser = await jwt.verifyToken(req, true, res);
		// 	return authUser;
		// },
		users: async (root, args,{ req, res }, info ) => {
			if(req.session.isValid !== true){
				return res.status(401).send({ "statusCode": 401, message: 'Please Login' });
			}
			else{
				const header = req.headers.authorization;
				if (header == req.session.token) {
				// const token1 = header.replace("Bearer ", "");
				const token = jwt.verifyToken(header);
				let user = await User.find({_id:token.userId});
				if (!user) {
					throw new AuthenticationError("Invalid user.");
				}
				return user;
				}
				let requireAuth = true
				if (requireAuth) {
					return res.status(401).send({ auth: false, message: 'No Authorization header provided.' });
				// throw new AuthenticationError("You must be logged in.");
				}
				return null;
			}
			
		},
		user: async (root, args,{ req }, info ) => {
			let user = await User.findById(args.id)
			return user;
		},
		logout: async (root, args,{ req }, info ) => {
			req.session.destroy((err) => {
				if (err){ 
				  console.log("logout Error", err);
				}
				req.user = null;
			  });
			  const response = {
				"statusCode": 200,
				"message": "Logout Success"
			}
			return response
		},
		login: async (root, args,{ req }, info ) => {
			try {
				const role = await Role.findOne({role: args.role})
				if(!role){
					const response = {
						"statusCode": 401,
						"message": message.ROLE_INVALID
					}
					return response
				}
				const user = await User.findOne({username: args.username}).populate('role');
				// save_session(req, user);
				if(!user){
					const response = {
						"statusCode": 401,
						"message": message.ACCOUNT_INVALID
					}
					return response
				}
				let getPass = await bcrypt.compare(args.password, user.password)
				if(!getPass) {
					const response = {
						"statusCode": 401,
						"message": PASSWORD_WRONG
					}
					return response
				}
				const payload = {
					userId: user.id,
					role: user.role.role
				};
				const token = await jwt.issueToken(payload)
				save_session(req, user, token);
				// console.log("token",token);
				const response = {
					"statusCode": 200,
					"message": message.LOGIN_SUCCESS,
					"token": token
				}
				return response
			}catch(err){
				console.log("Error", err);
			}
		},
	},
	Mutation: {
		// hello: ( root) => {
        //     return helloMessage;
        // },
		addUser: async (root, args,{ req }, info ) => {
			try{
				// const validate = await JsonSchemaValidator.validate(args, UserSchema.addUser());
				// if (!validate.valid) {
				// 	console.log("sss")
				// 	throw createError(400, JsonSchemaValidator.errorFormatter(validate.errors));
                // }
                let user = await User.findOne({username: args.username})
                if(user){
					const msg = "Username already taken"
					const response = {
						"statusCode": 400,
						"message": msg
					}
					return response	
                }
                user = await User.findOne({email: args.email})
                if(user){
                    const msg = "Email already taken"
					const response = {
						"statusCode": 400,
						"message": msg
					}
					return response
                }
                // args.password = await bcrypt.hash(args.password, 10);
                User.create( args, function(err, result1) {
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
			
			// let newUser = await User.create(args)
			// // return args;
			// // // console.log(args)
			// return {
			// 	args,
			// }
        },
        
		editUser: async (root, args,{ req }, info ) => {
			try{
				// const validate = await JsonSchemaValidator.validate(args, UserSchema.editUser());
				// if (!validate.valid) {
				// 	console.log("sss")
				// 	const e = JsonSchemaValidator.errorFormatter(validate.errors);
				// 	console.log("e",e);

				// }
				await User.findByIdAndUpdate(args.id ,args, function(err, result1) {	
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
		deleteUser: async (root, args,{ req }, info ) => {
			await User.findByIdAndRemove(args.id)
			const response = {
				"statusCode": 200,
				"message": message.DELETE_SUCCESS,
			}
			return response;
			
		},
		
	},
}