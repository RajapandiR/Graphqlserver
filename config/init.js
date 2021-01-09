import { SUPER_ADMIN_EMAIL, SUPER_ADMIN_PASSWORD,SUPER_ADMIN_USERNAME } from './index';
import User from '../models/user';
import Role from '../models/role';
const initadmin = function(app, db) {
    return new Promise(function(resolve) {
        // var User = db.model('User');
        User.findOne({ email: SUPER_ADMIN_EMAIL}, function(err, user) {
            if (err) console.log("Error",err);
            Role.findOne({role: "superadmin"}, (err, roleData) => {
                if (err) console.log("Error",err);
                if (!user) {
                    var superAdmin = new User({
                        username: SUPER_ADMIN_USERNAME,
                        email: SUPER_ADMIN_EMAIL,
                        password: SUPER_ADMIN_PASSWORD,
                        // role: '5ff9423325300a5f3160e071'
                        role: roleData._id
                    });
                    superAdmin.save(function(err) {
                        if (err) throw err;
                        resolve();
                    })
                } else {
                    resolve();
                }
            })
        })
    })
};

export default initadmin;