import { gql } from "apollo-server-express";

export default gql`
	
	extend type Query {
		products: [Product!]!
		product(id: ID): Product
	}
	extend type Mutation {
		addProduct(
			name: String!
			sku : String!
			category : String!
			price: Int! 
			weight: String!
			quantity : String!
			description : String!
			brand: String!
			dimension: String!
			color: String!
			material: String!
			hardware: String!
		): Product!
		editProduct(
			id: ID!
			name: String
			sku : String
			category : String
			price: Int
			weight: String
			quantity : String
			description : String
			brand: String
			dimension: String
			color: String
			material: String
			hardware: String
		):Product!
		deleteProduct(
			id:ID!
		):Product!
	}
	
	type attribute{
		brand: String
		dimension: String
		color: String
		material: String
		hardware: String
	}
	type Product {
		id: ID!
		name: String
		sku : String
		category : String
		price: Int
		weight: String
		quantity : String
		description : String
		availability: String
		attributes: String
		stock: Boolean
		statusCode: String
		message: String
		createAt: String!
		updateAt: String!
	}
	
`;



