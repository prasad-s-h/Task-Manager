
const sgMail = require('@sendgrid/mail');

const SendGridAPI = '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';

sgMail.setApiKey(SendGridAPI);

const welcomeEmail = (name, email) => {
    sgMail.send({
        to: email,
        from: 'prasads367@gmail.com',
        subject: `Hi ${name}, this is a Test Mail`,
        text: 'and easy to do anywhere, even with Node.js',
        html: `<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1" /><!--[if !mso]><!-->
        <meta http-equiv="X-UA-Compatible" content="IE=Edge" /><!--<![endif]-->
        <!--[if (gte mso 9)|(IE)]>
        <xml>
        <o:OfficeDocumentSettings>
        <o:AllowPNG/>
        <o:PixelsPerInch>96</o:PixelsPerInch>
        </o:OfficeDocumentSettings>
        </xml>
        <![endif]-->
        <!--[if (gte mso 9)|(IE)]>
        <style type="text/css">
          body {width: 600px;margin: 0 auto;}
          table {border-collapse: collapse;}
          table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;}
          img {-ms-interpolation-mode: bicubic;}
        </style>
        <![endif]-->
    
        <style type="text/css">
          body, p, div {
            font-family: arial;
            font-size: 14px;
          }
          body {
            color: #000000;
          }
          body a {
            color: #1188E6;
            text-decoration: none;
          }
          p { margin: 0; padding: 0; }
          table.wrapper {
            width:100% !important;
            table-layout: fixed;
            -webkit-font-smoothing: antialiased;
            -webkit-text-size-adjust: 100%;
            -moz-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
          }
          img.max-width {
            max-width: 100% !important;
          }
          .column.of-2 {
            width: 50%;
          }
          .column.of-3 {
            width: 33.333%;
          }
          .column.of-4 {
            width: 25%;
          }
          @media screen and (max-width:480px) {
            .preheader .rightColumnContent,
            .footer .rightColumnContent {
                text-align: left !important;
            }
            .preheader .rightColumnContent div,
            .preheader .rightColumnContent span,
            .footer .rightColumnContent div,
            .footer .rightColumnContent span {
              text-align: left !important;
            }
            .preheader .rightColumnContent,
            .preheader .leftColumnContent {
              font-size: 80% !important;
              padding: 5px 0;
            }
            table.wrapper-mobile {
              width: 100% !important;
              table-layout: fixed;
            }
            img.max-width {
              height: auto !important;
              max-width: 480px !important;
            }
            a.bulletproof-button {
              display: block !important;
              width: auto !important;
              font-size: 80%;
              padding-left: 0 !important;
              padding-right: 0 !important;
            }
            .columns {
              width: 100% !important;
            }
            .column {
              display: block !important;
              width: 100% !important;
              padding-left: 0 !important;
              padding-right: 0 !important;
              margin-left: 0 !important;
              margin-right: 0 !important;
            }
          }
        </style>
        <!--user entered Head Start-->
        
         <!--End Head user entered-->
      </head>
      <body>
        <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size: 14px; font-family: arial; color: #000000; background-color: #ffffff;">
          <div class="webkit">
            <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#ffffff">
              <tr>
                <td valign="top" bgcolor="#ffffff" width="100%">
                  <table width="100%" role="content-container" class="outer" align="center" cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td width="100%">
                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                          <tr>
                            <td>
                              <!--[if mso]>
                              <center>
                              <table><tr><td width="600">
                              <![endif]-->
                              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width: 100%; max-width:600px;" align="center">
                                <tr>
                                  <td role="modules-container" style="padding: 0px 0px 0px 0px; color: #000000; text-align: left;" bgcolor="#ffffff" width="100%" align="left">
                                    
        <table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%"
               style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
          <tr>
            <td role="module-content">
              <p></p>
            </td>
          </tr>
        </table>
      
        <table  border="0"
                cellpadding="0"
                cellspacing="0"
                align="center"
                width="100%"
                role="module"
                data-type="columns"
                data-version="2"
                style="padding:0px 0px 0px 0px;box-sizing:border-box;"
                bgcolor="">
          <tr role='module-content'>
            <td height="100%" valign="top">
                <!--[if (gte mso 9)|(IE)]>
                  <center>
                    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-spacing:0;border-collapse:collapse;table-layout: fixed;" >
                      <tr>
                <![endif]-->
              
        <!--[if (gte mso 9)|(IE)]>
          <td width="300.000px" valign="top" style="padding: 0px 0px 0px 0px;border-collapse: collapse;" >
        <![endif]-->
    
        <table  width="300.000"
                style="width:300.000px;border-spacing:0;border-collapse:collapse;margin:0px 0px 0px 0px;"
                cellpadding="0"
                cellspacing="0"
                align="left"
                border="0"
                bgcolor=""
                class="column column-0 of-2
                      empty"
          >
          <tr>
            <td style="padding:0px;margin:0px;border-spacing:0;">
                
        <table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
          <tr>
            <td style="font-size:6px;line-height:10px;padding:0px 0px 0px 0px;" valign="top" align="center">
              <img class="max-width" border="0" style="display:block;color:#000000;text-decoration:none;font-family:Helvetica, arial, sans-serif;font-size:16px;max-width:100% !important;width:100%;height:auto !important;" src="https://marketing-image-production.s3.amazonaws.com/uploads/57f2c69d70d11d4281653786e5949ebb20a6548b45baeeb03b7b88664dd71a6fd7fc909588fe2a1561a5d4172c5c084c712d1f34b8bb68142113385065f055c5.png" alt="" width="300">
            </td>
          </tr>
        </table>
      
            </td>
          </tr>
        </table>
    
        <!--[if (gte mso 9)|(IE)]>
          </td>
        <![endif]-->
        <!--[if (gte mso 9)|(IE)]>
          <td width="300.000px" valign="top" style="padding: 0px 0px 0px 0px;border-collapse: collapse;" >
        <![endif]-->
    
        <table  width="300.000"
                style="width:300.000px;border-spacing:0;border-collapse:collapse;margin:0px 0px 0px 0px;"
                cellpadding="0"
                cellspacing="0"
                align="left"
                border="0"
                bgcolor=""
                class="column column-1 of-2
                      empty"
          >
          <tr>
            <td style="padding:0px;margin:0px;border-spacing:0;">
                
        <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
          <tr>
            <td style="padding:18px 0px 18px 0px;line-height:22px;text-align:inherit;"
                height="100%"
                valign="top"
                bgcolor="">
                <div>&nbsp;</div>
    
    <div>&nbsp;</div>
    
    <div>Welcome Aboard to Task Manager App.</div>
    
    <div>Happy to have you as our customer.</div>
    
    <div>&nbsp;</div>
    
    <div>This is just beginning of our pleasantful journey</div>
    
    <div>&nbsp;</div>
            </td>
          </tr>
        </table>
      
            </td>
          </tr>
        </table>
    
        <!--[if (gte mso 9)|(IE)]>
          </td>
        <![endif]-->
                <!--[if (gte mso 9)|(IE)]>
                      <tr>
                    </table>
                  </center>
                <![endif]-->
            </td>
          </tr>
        </table>
      
        <table class="module"
               role="module"
               data-type="divider"
               border="0"
               cellpadding="0"
               cellspacing="0"
               width="100%"
               style="table-layout: fixed;">
          <tr>
            <td style="padding:0px 0px 0px 0px;"
                role="module-content"
                height="100%"
                valign="top"
                bgcolor="">
              <table border="0"
                     cellpadding="0"
                     cellspacing="0"
                     align="center"
                     width="100%"
                     height="10px"
                     style="line-height:10px; font-size:10px;">
                <tr>
                  <td
                    style="padding: 0px 0px 10px 0px;"
                    bgcolor="#000000"></td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      
        <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
          <tr>
            <td style="padding:18px 0px 18px 0px;line-height:22px;text-align:inherit;"
                height="100%"
                valign="top"
                bgcolor="">
                <div>Hi ${name},<p>Welcome to Task Manager Application, which provides CRUD operations using RESTful API Web services. Happy to support you</p>.</div>
            </td>
          </tr>
        </table>
      
        <table class="module"
               role="module"
               data-type="spacer"
               border="0"
               cellpadding="0"
               cellspacing="0"
               width="100%"
               style="table-layout: fixed;">
          <tr>
            <td style="padding:0px 0px 30px 0px;"
                role="module-content"
                bgcolor="">
            </td>
          </tr>
        </table>
      <table class="module" role="module" data-type="code" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;">
          <tr>
            <td height="100%" valign="top">
              <div>Thank you, <p></p><center>For further support, please reach to us at 1234567890<p></p></center></div>
            </td>
          </tr>
        </table>
                                  </td>
                                </tr>
                              </table>
                              <!--[if mso]>
                              </td></tr></table>
                              </center>
                              <![endif]-->
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </div>
        </center>
      </body>`
    });
};

const deleteMail = (name, email) => {
    sgMail.send({
        to: email,
        from: 'prasads367@gmail.com',
        subject: `Hi ${name}, this is a Test Mail`,
        text: `Hi ${name}, Sorry to hear that you have deleted your account from our Application. Please provide the suggestions for improvising our services.`
    });
};

module.exports = {welcomeEmail, deleteMail};

