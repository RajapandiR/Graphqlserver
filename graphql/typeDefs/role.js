import { gql } from "apollo-server-express";

export default gql`
	
	extend type Query {
		roles: [Role!]
		role(id: ID): Role
		
	}

	extend type Mutation {
		addRole(
			role: String!
		): Role!
		editRole(
			id: ID!
			role: String
		): Role!
		deleteRole(id:ID): Role
		}
	type Role {
		id: ID!
		role: String
		statusCode: String
		message: String
		createAt: String!
		updateAt: String!
	}
`;



