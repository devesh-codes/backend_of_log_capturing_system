import { ZodError } from "zod"
import { enquirySchema} from "../helper/validator.js"
import {sheets} from "../service/googleSheet.js"
import appConfig from "../config/appConfig.js"
import dayjs from "dayjs"
const {GOOGLE_SHEET_ID} = appConfig


export const enquiryController = (req,res)=>{
    try {
        // validation
        const body = enquirySchema.parse(req.body)
        const {name,emailAddress,category, message} = body
        console.log(name,emailAddress,category, message)
        
        //Google sheet entry
        const currentDate = dayjs().format('DD-MM-YY HH:mm:ss')
        sheets.spreadsheets.values.append({
            spreadsheetId:GOOGLE_SHEET_ID,
            range:"enquiry!A:E",
            insertDataOption: "INSERT_ROWS",
            valueInputOption: "RAW",
            requestBody:{
                values:[[name,emailAddress,category,message, currentDate  ]]
            }
        })
        .catch(()=>{
            console.error(err.response.data.error)
        })
       

        res.status(201).json({
            success: true,
            message: "Done"
        })
    } catch (err) {
        

        if(err instanceof ZodError){
            return res.status(422).json({
                success: false,
                message: err.errors
            })
        }
        res.sendStatus(500)
    }
}