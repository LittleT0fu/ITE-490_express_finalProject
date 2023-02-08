const passport = require('passport');
const config = require('../config/index');
//import user model
const User = require('../models/userModel');
const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken(); //get token
opts.secretOrKey = config.SECRET_KEY;
//ไม่ได้ใใช้งาน 2 บรรทัดล่าง
// opts.issuer = 'accounts.examplesoft.com';
// opts.audience = 'yoursite.net';
passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {

    try {
        const user = await User.findById(jwt_payload.id)
        if (!user) {
            //ส่งค่า error ไมเพราะไม่พบผู้ใช้งานและส่งค่าว่างออกไป
            return done(new Error("ไม่พบผู้ใช้งาน"), null)
        }
        // มี user ส่ง error เป็น null และส่ง User ออกไป
        return done(null, user);
    } catch (error) {
        done(error);
    }

    // User.findOne({id: jwt_payload.sub}, function(err, user) {
    //     if (err) {
    //         return done(err, false);
    //     }
    //     if (user) {
    //         return done(null, user);
    //     } else {
    //         return done(null, false);
    //         // or you could create a new account
    //     }
    // });
}));

// การใช้งาน ถ้าไม่มีการ login ให้ session เป็น false
module.exports.isLogin = passport.authenticate('jwt', { session: false })