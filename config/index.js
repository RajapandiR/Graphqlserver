export const {
	DB,
	SECRET,
	NODE_ENV,
	PORT,
	SESSION_SECRET,
} = process.env;

export const IN_PORD = NODE_ENV === "production";