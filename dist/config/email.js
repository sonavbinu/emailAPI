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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEmailConnection = exports.emailConfig = exports.transporter = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const helpers_1 = require("../utils/helpers");
const EMAIL_HOST = (0, helpers_1.getEnvVariable)('EMAIL_HOST');
const EMAIL_PORT = parseInt((0, helpers_1.getEnvVariable)('EMAIL_PORT'));
const EMAIL_USER = (0, helpers_1.getEnvVariable)('EMAIL_USER');
const EMAIL_PASSWORD = (0, helpers_1.getEnvVariable)('EMAIL_PASSWORD');
const EMAIL_FROM = (0, helpers_1.getEnvVariable)('EMAIL_FROM');
exports.transporter = nodemailer_1.default.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    secure: false,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASSWORD,
    },
});
exports.emailConfig = {
    from: EMAIL_FROM,
};
const verifyEmailConnection = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield exports.transporter.verify();
        console.log('Email service is ready to send emails');
    }
    catch (error) {
        console.log('Email service connection failed:', error);
    }
});
exports.verifyEmailConnection = verifyEmailConnection;
