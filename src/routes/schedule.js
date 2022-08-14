const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/schedule.js');
const { authenticate, authorizeAdmin } = require('../middlewares/security.js');

router.use(authenticate);

router.get('/fetch/one/:scheduleId', scheduleController.fetchScheduleById);

router.get('/fetch/self', scheduleController.fetchScheduleByUserIdSelf);

router.get('/fetch/all', scheduleController.fetchAllSchedules);

router.get('/fetch/:userId', scheduleController.fetchScheduleByUserId);

router.post('/create', authorizeAdmin, scheduleController.createSchedule);

router.delete(
  '/delete/:scheduleId',
  authorizeAdmin,
  scheduleController.deleteScheduleById,
);

router.delete(
  '/delete/all/:userId',
  authorizeAdmin,
  scheduleController.deleteAllSchedulesByUserId,
);

router.put('/update', authorizeAdmin, scheduleController.updateSchedule);

module.exports = router;
