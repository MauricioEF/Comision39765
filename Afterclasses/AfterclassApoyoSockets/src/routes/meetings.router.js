import { Router } from "express";
import MeetingsManager from "../managers/MeetingsManager.js";

const router = Router();
const meetingsService = new MeetingsManager();

router.get("/", async (req, res) => {
  try {
    const meetings = await meetingsService.getMeetings();
    res.send({ status: "success", payload: meetings });
  } catch (error) {
    res
      .status(500)
      .send({ status: "error", error: "Error al obtener Meetings" });
  }
});

router.post("/", async (req, res) => {
  // title, hour, status
  const { title, hour, status } = req.body;
  if (!title || !hour || !status) {
    return res
      .status(400)
      .send({ status: "error", error: "Valores incompletos" });
  }
  const meeting = {
    title,
    hour,
    status,
  };
  const result = await meetingsService.createMeeting(meeting);
  const meetings = await meetingsService.getMeetings();
  req.io.emit('meetings',meetings);
  res.status(201).send({ status: "success", payload: result });
});

router.delete('/:mid',async(req,res)=>{

  //primero lo eliminas en el archivo
  const meetings = await meetingsService.getMeetings();
  req.io.emit('meetings',meetings);
})
export default router;
