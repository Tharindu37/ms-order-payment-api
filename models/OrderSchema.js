const mongose = require('mongoose')
const OrderSchema = new Mongoose.Schema({
    date:{type:Date, required:true},
    cost:{type:Number, required:true},
    customer:{type:Object, required:true},
    products:{type:Array, required:true},
    paymentData:{type:Object, require:true},
    status:{type:Boolean, required:true}
})

module.exports=mongose.model("Order", OrderSchema);