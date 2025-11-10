"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEmailById = exports.getEmailHistory = exports.sendEmailController = void 0;
const emailService_1 = require("../services/emailService");
const Email_1 = require("../models/Email");
const sendEmailController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { to, subject, text, html } = req.body;
        const result = yield (0, emailService_1.sendEmail)({
            to,
            subject,
            html,
            text,
        });
        const emailRecord = new Email_1.Email({
            to,
            subject,
            html,
            text,
            status: result.success ? 'sent' : 'failed',
            messageId: result.messageId,
            error: result.error,
        });
        yield emailRecord.save();
        if (result.success) {
            res.status(200).json({
                success: true,
                message: 'Email sent successfully',
                emailId: emailRecord._id,
                messageId: result.messageId,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'Failed to send email',
                error: result.error,
                emailId: emailRecord._id,
            });
        }
    }
    catch (error) {
        console.error('Error in sendEmailController:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
exports.sendEmailController = sendEmailController;
const getEmailHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 10 } = req.query;
        const emails = yield Email_1.Email.find()
            .sort({ createdAt: -1 })
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit));
        const total = yield Email_1.Email.countDocuments();
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
    }
    catch (error) {
        console.error('Error in getEmailHistory:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch email history',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
exports.getEmailHistory = getEmailHistory;
const getEmailById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const email = yield Email_1.Email.findById(id);
        if (!email) {
            res.status(404).json({
                success: false,
                message: 'Email not found',
            });
            return;
        }
        res.status(200).json({
            success: false,
            data: email,
        });
    }
    catch (error) {
        console.error('Error in getEmailById:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch email',
            error: error instanceof Error ? error.message : 'Unknown error',
        });
    }
});
exports.getEmailById = getEmailById;
