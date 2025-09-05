import express from 'express';
import {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
  applyToJob,
  getJobApplicants,
  saveJob,
  getSavedJobs,
} from '../controllers/jobController.js';

import { protect } from '../middleware/authMiddleware.js';
import authorizeRoles from '../middleware/roleMiddleware.js';

const jobrouter = express.Router();

// -------------------- PUBLIC ROUTES -------------------- //
jobrouter.get('/', getJobs);                // Get all jobs
jobrouter.get('/:id', getJobById);          // Get job by ID

// -------------------- JOBSEEKER / ADMIN -------------------- //
jobrouter.post(
  '/:id/apply',
  protect,
  authorizeRoles('jobseeker', 'admin'),
  applyToJob
);

// -------------------- RECRUITER / ADMIN -------------------- //
jobrouter.get(
  '/:id/applicants',
  protect,
  authorizeRoles('recruiter', 'admin'),
  getJobApplicants
);

jobrouter.post(
  '/',
  protect,
  authorizeRoles('recruiter', 'admin'),
  createJob
);

jobrouter.put(
  '/:id',
  protect,
  authorizeRoles('recruiter', 'admin'),
  updateJob
);

jobrouter.delete(
  '/:id',
  protect,
  authorizeRoles('recruiter', 'admin'),
  deleteJob
);


// Save a job
jobrouter.post('/:id/save', protect, saveJob);

// Get saved jobs for current user
jobrouter.get('/saved', protect, getSavedJobs);

export default jobrouter;
