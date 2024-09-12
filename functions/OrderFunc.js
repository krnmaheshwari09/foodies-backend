import Order from "../models/Order.js";

const addOrUpdateOrderData = async (req, res) => {
    let data = req.body.order_data;
    await data.splice(0, 0, {Order_date: req.body.order_date})
    let eID = await Order.findOne({'email': req.body.email})
    if(eID === null){
        try{
            await Order.create({
                email: req.body.email,
                order_data: [data]
            }).then(() => {
                res.status(200).json({success: true, message: "Order Placed."})
            })
        }catch(error){
            res.status(400).json({success: false, message: "Error in creating order."})
        }
    }else{
        try{
            await Order.findOneAndUpdate({email: req.body.email},{$push: {order_data: data}}).then(() => {
                res.status(200).json({success: true, message: "Order Placed."})
            })
        }catch(error){
            res.status(400).json({success: false, message: "Error in creating order."})
        }
    }
}

const displayData = async (req, res) => {
    try{
        let myData = await Order.findOne({'email': req.body.email})
        res.status(200).json({orderData: myData.order_data});
    }catch(error){
        res.status(400).json({message: "Server Error."});
    }
}

export {
    addOrUpdateOrderData,
    displayData,
}