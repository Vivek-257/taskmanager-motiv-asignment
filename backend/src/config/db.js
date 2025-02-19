import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const connetDB=async ()=>{

try {
    await mongoose.connect(process.env.MONGO_URI)
} catch (error) {
    console.log(error)
}

}

export default connetDB