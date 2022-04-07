const OrderModel = require('../models/orderModel');

async function getOrders(req, res) {
  const userId = req.user._id;

  try {
    const OrderByUser = await OrderModel.find({ userId });
    return res.json(OrderByUser);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

async function CreateOrder(req, res) {
  const { lunch, dinner, orderDate } = req.body;
  const userId = req.body._id;

  console.log(lunch, dinner, orderDate);
  let newOrder = {};
  try {
    newOrder = new OrderModel({
      lunch: lunch === 'true' ? true : false,
      dinner: dinner == 'true' ? true : false,
      orderDate: new Date(orderDate),
      userId,
    });

    console.log(newOrder);

    const savedOrder = await newOrder.save();
    return res.json({ message: 'new order created', order: savedOrder });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

function timeDiff(time1, time2) {
  return (time1.getTime() - time2.getTime()) / 1000;
}
module.exports = { getOrders, CreateOrder };
