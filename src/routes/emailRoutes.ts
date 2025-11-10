import express from 'express';
import {
  sendEmailController,
  getEmailHistory,
  getEmailById,
} from '../controllers/emailController';
import { validateEmailRequest } from '../middleware/validation';

const router = express.Router();

/**
 * @swagger
 * /api/email/send:
 *   post:
 *     summary: Send an email
 *     tags: [Email]
 *     description: Send an email to a recipient with subject and message body
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - to
 *               - subject
 *             properties:
 *               to:
 *                 type: string
 *                 format: email
 *                 description: Recipient email address
 *                 example: sonavbinu567@gmail.com
 *               subject:
 *                 type: string
 *                 description: Email subject line
 *                 example: Welcome to our service
 *               text:
 *                 type: string
 *                 description: Plain text email body
 *                 example: Thank you for signing up!
 *               html:
 *                 type: string
 *                 description: HTML formatted email body
 *                 example: <h1>Welcome!</h1><p>Thank you for signing up!</p>
 *     responses:
 *       200:
 *         description: Email sent successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Email sent successfully
 *                 emailId:
 *                   type: string
 *                   example: 507f1f77bcf86cd799439011
 *                 messageId:
 *                   type: string
 *                   example: <abc123@gmail.com>
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post('/send', validateEmailRequest, sendEmailController);

/**
 * @swagger
 * /api/email/history:
 *   get:
 *     summary: Get email history
 *     tags: [Email]
 *     description: Retrieve paginated list of all sent emails
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Email history retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       to:
 *                         type: string
 *                       subject:
 *                         type: string
 *                       status:
 *                         type: string
 *                         enum: [sent, failed]
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     total:
 *                       type: integer
 *                     pages:
 *                       type: integer
 *       500:
 *         description: Server error
 */
router.get('/history', getEmailHistory);

/**
 * @swagger
 * /api/email/{id}:
 *   get:
 *     summary: Get email by ID
 *     tags: [Email]
 *     description: Retrieve details of a specific email by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Email document ID
 *     responses:
 *       200:
 *         description: Email details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     to:
 *                       type: string
 *                     subject:
 *                       type: string
 *                     text:
 *                       type: string
 *                     html:
 *                       type: string
 *                     status:
 *                       type: string
 *                     messageId:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *       404:
 *         description: Email not found
 *       500:
 *         description: Server error
 */
router.get('/:id', getEmailById);

export default router;
