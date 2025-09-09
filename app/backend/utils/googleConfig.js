import { google } from "googleapis";

const GOOGLE_CLINT_ID = process.env.GOOGLE_CLINT_ID
const GOOGLE_CLINT_SECRET = process.env.GOOGLE_CLINT_SECRET

exports.oauth2client = new google.auth.OAuth2(
    GOOGLE_CLINT_ID,
    GOOGLE_CLINT_SECRET,
    'postmessage'
)