'use strict';

var bcrypt = require('bcrypt');




// var mongoose = require('mongoose');

// var userSchema = new mongoose.Schema({
//   firstName: String,
//   lastName: String,
//   email: { type: String, required: true, unique: true },
//   meta: {
//     age: Number,
//     website: String,
//     address: String,
//     country: String,
//   }
// });

// var User = mongoose.model('User', userSchema);

// // make this available to our other files
// module.exports = User;


module.exports = function(sequelize, DataTypes) {
    var user = sequelize.define('user', {
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: {
                    msg: 'Invalid email address'

                }
            }
        },
        password: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [8, 99],
                    msg: 'password must be between 8 and 99 charaters'
                }
            }
        },
        name: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [1, 99],
                    msg: 'name must be between 1 and 99 charaters'
                }
            }
        }
    }, {
        classMethods: {
            associate: function(models) {
                // associations can be defined here
                models.user.hasMany(models.session);
            }
        },
        instanceMethods: {
            validPassword: function(password) {
                return bcrypt.compareSync(password, this.password);
            },
            toJSON: function() {
                var jsonUser = this.get();
                delete jsonUser.password;

                return jsonUser;
            }
        },
        hooks: {
            beforeCreate: function(createdUser, options, cb) {
                //hash password and save hash to user
                var hash = bcrypt.hashSync(createdUser.password, 10);
                createdUser.password = hash;
                cb(null, createdUser);
            }

        }
    });
    return user;
};
