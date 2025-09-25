const OtpRegistrationTemplats =  (otpDigits)=>{
    return( 

         `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Verify Email</title>
        </head>
        <body style="background-color:#efe5cf; margin:0; padding:50px;">
          <center>
            <table width="100%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                <td align="center">
                  <table width="600" border="0" cellspacing="0" cellpadding="0" style="background:#fff;border-radius:20px;box-shadow:0 8px 24px rgba(0,0,0,0.07);">
                    <tr>
                      <td align="center" style="padding:30px;">
                        <h1 style="margin:0;font-size:24px;color:#111827;">Verify Your Email Address</h1>
                        <p style="font-size:14px;color:#6b7280;">Enter the 6-digit code below. It will expire in 10 minutes.</p>
                        
                        <table cellspacing="0" cellpadding="0" border="0" align="center" style="margin:20px auto;">
                          <tr>
                            ${otpDigits.map(digit => `
                              <td style="width:52px; height:56px; background:#f3f4f6; 
                                border:1px solid #f59e0b; border-radius:12px; 
                                text-align:center; font-size:20px; font-weight:700; 
                                color:#111827; font-family:'Segoe UI', Roboto, Arial, sans-serif;">
                                ${digit}
                              </td>
                              <td width="10"></td>
                            `).join("")}
                          </tr>
                        </table>

                        <a href="http://localhost:5173/otp" style="background:#f59e0b; border-radius:999px; padding:12px 26px; display:inline-block; font-weight:700; font-size:16px; color:#ffffff; text-decoration:none;">Verify Email</a>

                        <p style="font-size:13px;color:#6b7280;margin-top:20px;">Didn't get the code? <a href="https://example.com/resend" style="color:#2563eb;">Resend</a></p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </center>
        </body>
        </html>
        `
     )
}


module.exports = {OtpRegistrationTemplats}