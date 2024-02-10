import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
    res.render("index", { title: "My express app", message: "Hello" });
  });
  
export default router