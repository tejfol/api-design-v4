"use strict";
exports.__esModule = true;
var express_1 = require("express");
var router = (0, express_1.Router)();
/**
 * Create
 */
router.get("/product/:id", function () { });
router.get("/product", function (req, res) {
    res.json({ "/product": "route initialized", customData: res.sdfg });
});
router.put("/product/:id", function () { });
router.post("/product", function () { });
router["delete"]("/product/:id", function () { });
/**
 * Update
 */
router.get("/update/:id", function () { });
router.get("/update", function () { });
router.put("/update/:id", function () { });
router.post("/update", function () { });
router["delete"]("/update/:id", function () { });
/**
 * Update Points
 */
router.get("/updatepoint/:id", function () { });
router.get("/updatepoint", function () { });
router.put("/updatepoint/:id", function () { });
router.post("/updatepoint", function () { });
router["delete"]("/updatepoint/:id", function () { });
exports["default"] = router;
//# sourceMappingURL=router.js.map