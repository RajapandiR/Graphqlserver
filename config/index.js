export const {
	DB,
	SECRET,
	NODE_ENV,
	PORT,
	SESSION_SECRET,
	SUPER_ADMIN_USERNAME,
	SUPER_ADMIN_EMAIL,
	SUPER_ADMIN_PASSWORD
} = process.env;

export const IN_PORD = NODE_ENV === "production";