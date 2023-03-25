import mongoose from 'mongoose';

export const connectDB = async ()=> {
    await mongoose.connect("mongodb+srv://louis78100:eCiijOiZJh8Tl9um@cluster0.kfpfpci.mongodb.net/?retryWrites=true&w=majority");
    console.log('MongoDb Connected');   
}


export default connectDB;