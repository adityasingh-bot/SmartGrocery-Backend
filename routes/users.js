const express = require("express");
const app = express();
require("dotenv").config();
const router = express.Router()
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var jsonParser = bodyParser.json()

const db = require("../schemaBin/db.js");
const selectSQLExecution = require("../schemaBin/selectQueryExecution.js");

router.post("/signup", jsonParser, async (req, res) => {
    const connParam = db.connection;
    const dupquery = process.env.CHECK_UNIQUE;
    const dupParamQuery = {
        phone: req.body.phone
    }
    const userExists = await selectSQLExecution.putQuery(
        dupquery,
        connParam,
        dupParamQuery
    )

    if (userExists.length > 0) {
        res.status(401).json({ statusText: "Duplicate User Present with Phone number" });
    } else {
        try {
            const query = process.env.ADD_USER;
            const queryParam = {
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: req.body.password
            };
            const result = await selectSQLExecution.insertQuery(
                query,
                connParam,
                queryParam
            );
            if (result > 0) res.status(201).json({ statusText: "Success" });
        } catch (error) {
            res.status(500).json({ statusText: "Failed" });
        }

    }


});

router.post("/signin", jsonParser, async (req, res) => {
    try {
        const connParam = db.connection;
        const query = process.env.SIGNIN_USER_QUERY;
        const queryParam = {
            phone: req.body.phone,
            password: req.body.password
        }
        const { phone, password } = queryParam;
        const result = await selectSQLExecution.putQuery(query, connParam, [phone, password]);
        if (result.length > 0) res.status(200).json({ statusText: "User Login", userdata: result });
        else res.status(401).json({ statusText: "Authentication failed" });
    } catch (error) {
        res.status(500).json({ statusText: "Internal server error" });
    }
})

router.get('/user', jsonParser, async (req, res) => {
    try {
        const connParam = db.connection;
        const query = process.env.FIND_USER;
        const phone = req.body.phone;
        const result = await selectSQLExecution.putQuery(query, connParam, phone);
        if (result.length > 0) res.status(200).json({ userdata: result });
        else res.status(404).json({ statusText: "User Details Not Found" });
    } catch (error) {
        res.status(500).json({ statusText: "Internal server error" });

    }
});


router.put('/edituser', jsonParser, async (req, res) => {
    try {
        const connParam = db.connection;
        const query = process.env.EDIT_USER;
        const queryParam = {
            "name": req.body.name,
            "email": req.body.email,
            "profileImage": req.body.profileImage,
            "address": req.body.address,
            "password": req.body.password
        }
        const phone = req.body.phone;
        const result = await selectSQLExecution.putQuery(query, connParam, [queryParam, phone]);
        console.log(result)
        if (result.affectedRows > 0) res.status(201).json({ statusText: "User Details Update", Response: result });
        else res.status(404).json({ statusText: "User Details Not Found" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ statusText: "Internal server error" });

    }
});

module.exports = router;