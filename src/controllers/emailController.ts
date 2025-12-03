import { Request, Response } from 'express';
import { sendEmail } from '../services/emailService';
import { Email } from '../models/Email';

export const sendEmailController = async (req: Request, res: Response) => {
  try {
    const { to, subject, text, html } = req.body;

    const result = await sendEmail({
      to,
      subject,
      html,
      text,
    });

    const emailRecord = new Email({
      to,
      subject,
      html,
      text,
      status: result.success ? 'sent' : 'failed',
      messageId: result.messageId,
      error: result.error,
    });

    await emailRecord.save();

    if (result.success) {
      res.status(200).json({
        success: true,
        message: 'Email sent successfully',
        emailId: emailRecord._id,
        messageId: result.messageId,
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to send email',
        error: result.error,
        emailId: emailRecord._id,
      });
    }
  } catch (error) {
    console.error('Error in sendEmailController:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getEmailHistory = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const emails = await Email.find()
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Email.countDocuments();

    res.status(200).json({
      success: true,
      data: emails,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    console.error('Error in getEmailHistory:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch email history',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};

export const getEmailById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const email = await Email.findById(id);

    if (!email) {
      res.status(404).json({
        success: false,
        message: 'Email not found',
      });
      return;
    }
    res.status(200).json({
      success: true,
      data: email,
    });
  } catch (error) {
    console.error('Error in getEmailById:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch email',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
