"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.protectThis = exports.createJWT = exports.hashPassword = exports.comparePasswords = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcrypt_1 = __importDefault(require("bcrypt"));
// For sign-in.
var comparePasswords = function (password, hash) {
    return bcrypt_1["default"].comparePasswords(password, hash);
};
exports.comparePasswords = comparePasswords;
// For sign-up.
var hashPassword = function (password) {
    return bcrypt_1["default"].hash(password, 5);
};
exports.hashPassword = hashPassword;
// Function to create a JWT token and send back to him on sign-up.
// After that the frontend should keep this token in the localStorage.
var createJWT = function (user) {
    var token = jsonwebtoken_1["default"].sign({
        id: user.id,
        username: user.username
    }, process.env.JWT_SECRET);
    return token;
};
exports.createJWT = createJWT;
// Protection middleware. (for middleware always use "next")
var protectThis = function (req, res, next) {
    var bearer = req.headers.authorization;
    // If no token, send back an error message.
    if (!bearer) {
        res.status(401);
        res.json({ message: "not authorized" });
        return;
    }
    // We split the userSent bearer token into pieces, we need only the token part.
    var _a = bearer.split(" "), token = _a[1];
    // If no token, send back an error message.
    if (!token) {
        res.status(401);
        res.json({ message: "not authorized" });
        return;
    }
    // Using try-catch because without it on error the server would die.
    try {
        var user = jsonwebtoken_1["default"].verify(token, process.env.JWT_SECRET);
        req.user = user;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(401);
        res.json({ message: "not a valid token" });
        return;
    }
};
exports.protectThis = protectThis;
//# sourceMappingURL=auth.js.map