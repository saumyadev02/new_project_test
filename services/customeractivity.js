const bcrypt = require("bcrypt"),
  Customers = require("../models/customers");

const addcustomer = async (formData) => {
  let user;
  const customer = new Customers({
    name: formData.name,
    email: formData.email,
    phone: formData.phone,
    custom: formData.custom,
    gender: formData.gender,
    createOn: Date.now(),
  });
  try {
    user = await customer.save();
  } catch (error) {
    user = null;
  }
  return user;
};

const customerlist = async () => {
  userCustomer = await Customers.find().sort({ _id: -1 });
  if (userCustomer.length > 0) {
    try {
      var obj = { status: "success", message: "customer_list", result: userCustomer };
    } catch (error) {
      var obj = { status: "fail", message: error.message };
    }
  } else {
    var obj = { status: "fail", message: "no_customers" };
  }
  return obj;
};


exports.addcustomer = addcustomer;
exports.customerlist = customerlist;
