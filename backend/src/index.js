import app from "./app.js"
import dotenv from "dotenv"
import connectDB from "./config/database.js"

dotenv.config({
    path: './.env'
})

const PORT = process.env.PORT || 8000

const startServer = async () => {
    try{
        await connectDB()

        app.on("error", (error) => {
            console.log("error", error)
            throw error
        })
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`) 
        })
    }
    catch(error){
        console.log("failed ", error)
    }
}

startServer()
