import { Request, Response, NextFunction } from 'express';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmailRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { to, subject, text, html } = req.body;

  if (!to) {
    res.status(400).json({
      success: false,
      message: 'Receipient email (to) is required',
    });
    return;
  }
  if (!emailRegex.test(to)) {
    res.status(400).json({
      success: false,
      message: 'Invalid email format',
    });
    return;
  }

  if (!subject) {
    res.status(400).json({
      success: false,
      message: 'Email subject is required',
    });
    return;
  }
  if (!text && !html) {
    res.status(400).json({
      success: false,
      message: 'Email body is required (text ot html)',
    });
    return;
  }
  if (subject.length > 200) {
    res.status(400).json({
      success: false,
      message: 'Subject is too long (max 200 characters)',
    });
    return;
  }

  next();
};
