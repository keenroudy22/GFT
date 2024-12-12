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

        // Email Logic
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER, // Gmail address
                pass: process.env.EMAIL_PASS, // Gmail app password
            },
        });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: "your-email@example.com",
            subject: "New Order Submission",
            text: `Order Details:
Name: ${data.name}
Email: ${data.email}
Phone: ${data.phone}
Size: ${data.size}
Scent: ${data.scent}
Quantity: ${data.quantity}`,
        });

        // Google Sheets Logic
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
            body: JSON.stringify({ message: "Internal Server Error", error: error.message }),
        };
    }
};
