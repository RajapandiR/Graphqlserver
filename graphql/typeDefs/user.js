import { gql } from "apollo-server-express";

export default gql`
	
	extend type Query {
		users: [User!]!
		user(id: ID): User
		login(username: String!, password: String!, role: String!): User
		logout: User
	}
	extend type Mutation {
		addUser(
			firstname: String!
			lastname: String!
			username: String!
			role: String!
			email: String
			password: String
			addressLine: String
			city: String
			zipcode: String
			country: String
		): User!

		editUser(
			id: ID!
			firstname: String
			lastname: String
			username: String
			role: String
			email: String
			password: String
			addressLine: String
			city: String
			zipcode: String
			country: String
		): User!

		deleteUser(id:ID): User
	}
	
	type User {
		id: ID!
		firstname: String
		lastname: String
		username: String
		role: String
		email: String
		password: String
		addressLine: String
		city: String
		zipcode: String
        country: String
        statusCode: String
		message: String
		token: String
		user: User!
		createAt: String
		updateAt: String
	}
	type Auth {
		user: User
		token: String!
	}
	
	
`;



