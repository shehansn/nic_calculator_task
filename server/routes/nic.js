const { Nic } = require('../models/nic');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { auth } = require('../auth/errorHandler');

//router.use(auth);


router.get(`/`, async (req, res) => {

    res.send('initial nic toute');
})

router.post(`/convertNic`, async (req, res) => {
    console.log(req.body.nic)
    const NICNo = req.body.nic;

    var year = "";
    var dayDigit = "";
    var month = "";
    var day = "";
    var gender = "";


    function isNumeric(str) {
        return /^\d+$/.test(str);
    }

    if (NICNo.length != 10 && NICNo.length != 12) {
        var msg = 'Invalid NIC Number! NIC Length is too short'
        return res.status(400).send({ message: msg })
    } else if (NICNo.length == 10 && !isNumeric(NICNo.substr(0, 9))) {
        var msg = 'Invalid NIC Number! NIC Should Numeric'
        return res.status(400).send({ message: msg })
    }
    else {
        //Calculate Year
        if (NICNo.length == 10) {
            year = "19" + NICNo.substr(0, 2);
            dayDigit = parseInt(NICNo.substr(2, 3));
        } else {
            year = NICNo.substr(0, 4);
            dayDigit = parseInt(NICNo.substr(4, 3));
        }

        //Calculate Gender
        if (dayDigit > 500) {
            gender = "Female";
            dayDigit = dayDigit - 500;
        } else {
            gender = "Male";
        }

        // Day Digit Validation
        if (dayDigit < 1 && dayDigit > 366) {
            return res.status(400).send('Invalid NIC Number!')
        } else {
            //Month
            if (dayDigit > 335) {
                day = dayDigit - 335;
                month = "December";
            }
            else if (dayDigit > 305) {
                day = dayDigit - 305;
                month = "November";
            }
            else if (dayDigit > 274) {
                day = dayDigit - 274;
                month = "October";
            }
            else if (dayDigit > 244) {
                day = dayDigit - 244;
                month = "September";
            }
            else if (dayDigit > 213) {
                day = dayDigit - 213;
                month = "Auguest";
            }
            else if (dayDigit > 182) {
                day = dayDigit - 182;
                month = "July";
            }
            else if (dayDigit > 152) {
                day = dayDigit - 152;
                month = "June";
            }
            else if (dayDigit > 121) {
                day = dayDigit - 121;
                month = "May";
            }
            else if (dayDigit > 91) {
                day = dayDigit - 91;
                month = "April";
            }
            else if (dayDigit > 60) {
                day = dayDigit - 60;
                month = "March";
            }
            else if (dayDigit < 32) {
                month = "January";
                day = dayDigit;
            }
            else if (dayDigit > 31) {
                day = dayDigit - 31;
                month = "Febuary";
            }
            var Dob = "";
            Dob = (year + "-" + month + "-" + day);

            // Age
            var today = new Date();
            var birthday = new Date(Dob);
            var YearsOld = Number(today.getTime() - birthday.getTime()) / (365 * 24 * 3600 * 1000);
            var x = Math.trunc(YearsOld);
            var age = x;

            res.status(200).send({ Dob: Dob, age: age, gender: gender })

        }

    }

})

module.exports = router;