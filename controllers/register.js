const router = require("express").Router();
const customerActivity = require("../services/customeractivity");
const messageActivity = require("../services/messageactivity");
const crypto = require("crypto");
const cron = require('node-cron');



router.post("/addCustomer", async (req, res) => {
  let attr_arr = [];
  let required = [];
  if (!req.body.name) required.push("name");
  if (!req.body.email) required.push("email");
  if (!req.body.phone) required.push("phone");
  if (!req.body.gender) required.push("gender");
  if (!req.body.custom) required.push("custom");
  if (required.length === 0) {
    for (let index = 1; index <= 10; index++) {
      if(req.body['attr_value_'+index] && req.body['attr_value_'+index] != ""){
        var attr_nm = "attr_"+index;
        var attr_vl = req.body['attr_value_'+index];
        if(attr_vl && attr_vl != "")
        {
          let attr = {
            attr_name: attr_nm,
            attr_value: attr_vl,
          }
          attr_arr.push(attr);
        }
      }
    }
      let customer = { 
        name: req.body.name, 
        phone: req.body.phone, 
        email: req.body.email, 
        custom: req.body.custom, 
        attribute : attr_arr,
        gender: req.body.gender 
      };
      let result = await customerActivity.addcustomer(customer);
      if (result !== null) {
        obj = {
          status: "success",
          message: "registration successfully",
          };
      } else {
        obj = {
          status: "fail",
          message: "Sorry! An unknown error occurred",
          };
      }
  } else {
    let message = required.map((item) => {
      return " " + item;
    });
     obj = {
          status: "fail",
          message: "Following fields are required for adding an customer -" + message,
          };
  }
  res.json(obj);
});

//=============== schedular ============
var task = cron.schedule('0 */1 * * *', async (req, res) => {
  console.log('running a task every hour');
  let obj;
  let result = await customerActivity.customerlist();
  if (result.status == "success") {
    let randNumber = crypto.randomInt(0, result.result.length-1);
    let message_obj = { 
      userId: result.result[randNumber]._id, 
      userEmail: result.result[randNumber].email, 
      userPhone: result.result[randNumber].phone, 
      message: 'Service message notification'
    };
    //============== send message functionlity will be added ===========
    let res = await messageActivity.addMessage(message_obj);
  }
});

task.start();
//============== schedular end ===========================


router.post("/sendNotificationCustomer", async (req, res) => {
  let obj;
  let result = await customerActivity.customerlist();
  if (result.status == "success") {
    if (result.message == "no_customers") {
      obj = {
        status: "fail",
        message: "No customer found",
        };
    } else {
      let randNumber = crypto.randomInt(0, result.result.length-1);
        // console.log(randNumber);
        // console.log(result.result[randNumber]);
        let message_obj = { 
          userId: result.result[randNumber]._id, 
          userEmail: result.result[randNumber].email, 
          userPhone: result.result[randNumber].phone, 
          message: 'Service message notification'
        };
        // console.log(message_obj);
        let res = await messageActivity.addMessage(message_obj);
          if (res !== null) {
            obj = {
              status: "success",
              message: "push message send successfully",
              };
          } else {
            obj = {
              status: "fail",
              message: "Sorry! An unknown error occurred",
              };
          }
    }
  } else {
    obj = {
      status: "fail",
      message: "No customer found",
      };
  }
  res.json(obj);
});

module.exports = router;
