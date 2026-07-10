import mongoose from "mongoose"
const connectionDB=async()=>{
  try {
    const connection=await mongoose.connect(process.env.MONGO_URI)
    console.log(`mongodb connected:${connection.connection.host}`)
  } catch (error) {
    console.log("database connection failed")
    console.error(error.message)
    process.exit(1);
  }
}
export default connectionDB;