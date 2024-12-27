import express, { Router } from "express"
const app = express()
import appConfig from "./config/appConfig.js"
const PORT = 8080
import router from "./router/router.js"
import cors from "cors"


app.use(cors())
app.use(express.json())





app.use("/", router)


app.listen(PORT, ()=>{
    console.info(`server is listening ${PORT}`)
})