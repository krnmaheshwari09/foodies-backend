import mongoose from "mongoose";

const connectMongo = async(url) => {
    try{
        await mongoose.connect(url).then(console.log("MongoDB Connected"))
        try{
            const fetched_data = await mongoose.connection.db.collection("fooddata")
            global.food_items = await fetched_data.find({}).toArray()
            // console.log(global.food_items);
            const cat_data = await mongoose.connection.db.collection("foodcategories")
            global.food_categories = await cat_data.find({}).toArray()
        }catch(err){
            console.log(err)
        }
    }catch(err){
        console.log(err)
    }
}

export default connectMongo;