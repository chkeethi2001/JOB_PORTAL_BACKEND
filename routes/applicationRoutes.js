
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import uploadToGridFS from "../middleware/gridfsUpload.js";
import { createApplication, getMyApplications, downloadResume } from "../controllers/applicationController.js";
import multer from "multer";
import Application from "../models/Application.js";

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

router.get("/job/:jobId", protect, async (req, res) => {
  try {
    const { jobId } = req.params;

    const applications = await Application.find({ job: jobId })
      .populate("user", "name email") // use `user` instead of `applicant`
      .populate("job", "title company location");

    res.status(200).json({ applications });
  } catch (error) {
    console.error("❌ Error fetching applications for job:", error);
    res.status(500).json({ message: "Server error while fetching applications." });
  }
});

router.patch("/:appId/status", protect, async (req, res) => {
  try {
    const { appId } = req.params;
    const { status } = req.body;

    // Validate status
    const allowedStatuses = ["accepted", "rejected"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const application = await Application.findByIdAndUpdate(
      appId,
      { status },
      { new: true }
    )
      .populate("user", "name email")
      .populate("job", "title company location");

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({ message: "Status updated", application });
  } catch (error) {
    console.error("❌ Error updating application status:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
