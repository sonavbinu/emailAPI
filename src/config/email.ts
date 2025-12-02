import nodemailer from 'nodemailer';
import { getEnvVariable } from '../utils/helpers';

const EMAIL_HOST = getEnvVariable('EMAIL_HOST');
const EMAIL_PORT = parseInt(getEnvVariable('EMAIL_PORT'));
const EMAIL_USER = getEnvVariable('EMAIL_USER');
const EMAIL_PASSWORD = getEnvVariable('EMAIL_PASSWORD');
const EMAIL_FROM = getEnvVariable('EMAIL_FROM');

export const transporter = nodemailer.createTransport({
  host: EMAIL_HOST,
  port: EMAIL_PORT,
  secure: false,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASSWORD,
  },
});

export const emailConfig = {
  from: EMAIL_FROM,
};

export const verifyEmailConnection = async () => {
  try {
    await transporter.verify();
    console.log('Email service is ready to send emails');
  } catch (error: any) {
    console.log('Email service connection failed:', error.message);
  }
};
