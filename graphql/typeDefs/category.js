import { gql } from "apollo-server-express";

export default gql`
	
	extend type Query {
		categories: [Category!]
		category(id: ID): Category
		
	}

	extend type Mutation {
		addcategory(
			name: String!
			description: String
			parentId: String
		): Category!
		editcategory(
			id: ID!
			name: String
			description: String
		): Category!
		deletecategory(id:ID): Category
		}
	type Child1 {
		id: ID!
		name: String
		description: String
	}
	type Child {
		id: ID!
		name: String
		description: String
		children: [Child1]
	}
	type Category {
		id: ID!
		name: String
		description: String
		parentId: String
		children: [Child]
		statusCode: String
		message: String
		data: String
		createAt: String!
		updateAt: String!
	}
`;



