def _gen_email(msg:str,client:str,logo:str = None):
    html = f"""
    <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>AXION Notification</title>
        <style>
            body {{
            font-family: Arial, sans-serif;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
            }}
            .container {{
            width: 100%;
            padding: 20px;
            background-color: #f4f4f4;
            }}
            .email-wrapper {{
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }}
            .header{{
            text-align: center;
            padding-bottom: 20px;
            }}
            .header img {{
            max-width: 60px;
            margin-bottom: 15px;
            }}
            .content {{
            line-height: 1.6;
            font-size: 16px;
            }}
            .content p {{
            margin: 10px 0;
            }}
            .footer {{
            text-align: center;
            margin-top: 20px;
            font-size: 14px;
            color: #777;
            }}
            .footer a {{
            color: #007bff;
            text-decoration: none;
            }}
            @media (max-width: 600px) {{
            .email-wrapper {{
                width: 100% !important;
                padding: 15px;
            }}
            }}
        </style>
        </head>
        <body>
        <div class="container">
            <div class="email-wrapper">
            <div class="header">
                <img src=[url] alt="AXION Logo">
            </div>

            <div class="content">
                <p>Hello {client},</p>
                <p> {msg} </p>
            <br/>
            <p>Best regards,</p>
            <p>AXION Team</p>
                <p>Thank you for being a valued member of AXION.</p>
            </div>

            <div class="footer">
                <p>© 2025 AXION. All rights reserved.</p>
            </div>
            </div>
        </div>
        </body>
    </html>

    """
    return html