
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import uploadToGridFS from "../middleware/gridfsUpload.js";
import { createApplication, getMyApplications, downloadResume } from "../controllers/applicationController.js";
import multer from "multer";


const router = express.Router();
const storage = multer.diskStorage({
  destination:"temp/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Apply to a job (form-data with 'resume' file and 'jobId', optional 'coverLetter')
router.post("/apply", protect, upload.single("resume"), createApplication);

// Get current user's applications
router.get("/my", protect, getMyApplications);

// Download resume for a specific application
router.get("/:id/resume", protect, downloadResume);

export default router;
