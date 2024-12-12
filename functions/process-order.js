const nodemailer = require("nodemailer");
const { google } = require("googleapis");

exports.handler = async (event) => {
    if (event.httpMethod !== "POST") {
        return {
            statusCode: 405,
            body: JSON.stringify({ message: "Method Not Allowed" }),
        };
    }

    try {
        const data = JSON.parse(event.body);

        // Send Email
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: "your-email@example.com",
            subject: "New Order",
            text: `Order Details:\nName: ${data.name}\nEmail: ${data.email}\nSize: ${data.size}\nScent: ${data.scent}`,
        });

        // Update Google Sheets
        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_CLIENT_EMAIL,
                private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
            },
            scopes: ["https://www.googleapis.com/auth/spreadsheets"],
        });

        const sheets = google.sheets({ version: "v4", auth });
        const spreadsheetId = process.env.SPREADSHEET_ID;

        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: "Orders!A1",
            valueInputOption: "USER_ENTERED",
            requestBody: {
                values: [[data.name, data.email, data.phone, data.size, data.scent, data.quantity]],
            },
        });

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Order successfully submitted!" }),
        };
    } catch (error) {
        console.error("Error processing order:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Internal Server Error" }),
        };
    }
};
