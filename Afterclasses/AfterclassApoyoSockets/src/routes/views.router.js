import { Router } from "express";
import MeetingsManager from "../managers/MeetingsManager";

const router = Router();

router.get('/',(req,res)=>{
    res.render('home');
})

router.get('/meetings',async (req,res)=>{

    res.render('realTimeMeetings');
})

export default router;