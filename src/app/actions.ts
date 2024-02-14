"use server";
import * as nodemailer from "nodemailer";

export async function sendInvite(email: string) {
  const DATA = {
    image:
      "https://firebasestorage.googleapis.com/v0/b/inkognito-club.appspot.com/o/email%2Finkognito-club.jpg?alt=media&token=0afd0b12-74db-46db-82ad-43c98634472b",
    title: "¡Bienvenido a Inkognito Club!",
    message:
      "Si te llegó este mensaje, es porque nos dejaste tu mail, o porque tipeamos mal; si la pifiamos disculpá loco/a. Abrazo!",
    preButtonText:
      "Si vos sos vos, ingresá a la web de Inkognito para crear tu perfil",
    buttonText: "Botón para crear perfil",
    buttonLink: "https://inkognito-club.vercel.app/login",
    footer:
      "Tenés que tocar en ese botón de arriba. Si no te funciona porque queseyopasaroncosas, tocá el siguiente link:",
    rrssLink: "https://www.instagram.com/inkognito_club/"
  };

  const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD
    },
    secure: true
  });
  const mailData = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: `Invitación Inkognito Club`,
    text: `¡Hola! Has sido invitado a unirte a Inkognito Club. Haz click en el siguiente enlace para registrarte: https://inkognito-club.vercel.app/login`,
    html: `
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html
        xmlns="http://www.w3.org/1999/xhtml"
        xmlns:v="urn:schemas-microsoft-com:vml"
        xmlns:o="urn:schemas-microsoft-com:office:office"
      >
        <head>
          <!--[if gte mso 9]>
            <xml>
              <o:OfficeDocumentSettings>
                <o:AllowPNG />
                <o:PixelsPerInch>96</o:PixelsPerInch>
              </o:OfficeDocumentSettings>
            </xml>
          <![endif]-->
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta name="x-apple-disable-message-reformatting" />
          <!--[if !mso]><!-->
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <!--<![endif]-->
          <title></title>

          <style type="text/css">
            @media only screen and (min-width: 620px) {
              .u-row {
                width: 600px !important;
              }
              .u-row .u-col {
                vertical-align: top;
              }

              .u-row .u-col-100 {
                width: 600px !important;
              }
            }

            @media (max-width: 620px) {
              .u-row-container {
                max-width: 100% !important;
                padding-left: 0px !important;
                padding-right: 0px !important;
              }
              .u-row .u-col {
                min-width: 320px !important;
                max-width: 100% !important;
                display: block !important;
              }
              .u-row {
                width: 100% !important;
              }
              .u-col {
                width: 100% !important;
              }
              .u-col > div {
                margin: 0 auto;
              }
            }
            body {
              margin: 0;
              padding: 0;
            }

            table,
            tr,
            td {
              vertical-align: top;
              border-collapse: collapse;
            }

            p {
              margin: 0;
            }

            .ie-container table,
            .mso-container table {
              table-layout: fixed;
            }

            * {
              line-height: inherit;
            }

            a[x-apple-data-detectors="true"] {
              color: inherit !important;
              text-decoration: none !important;
            }

            table,
            td {
              color: #000000;
            }
            #u_body a {
              color: #0000ee;
              text-decoration: underline;
            }
            @media (max-width: 480px) {
              #u_content_image_1 .v-container-padding-padding {
                padding: 40px 10px 5px !important;
              }
              #u_content_image_1 .v-src-width {
                width: auto !important;
              }
              #u_content_image_1 .v-src-max-width {
                max-width: 50% !important;
              }
              #u_content_heading_1 .v-font-size {
                font-size: 18px !important;
              }
              #u_content_text_2 .v-container-padding-padding {
                padding: 10px !important;
              }
              #u_content_button_1 .v-text-align {
                text-align: center !important;
              }
              #u_content_text_1 .v-container-padding-padding {
                padding: 10px 10px 40px !important;
              }
            }
          </style>

          <!--[if !mso]><!-->
          <link
            href="https://fonts.googleapis.com/css?family=Raleway:400,700&display=swap"
            rel="stylesheet"
            type="text/css"
          />
          <!--<![endif]-->
        </head>

        <body
          class="clean-body u_body"
          style="
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: 100%;
            background-color: #ffffff;
            color: #000000;
          "
        >
          <!--[if IE]><div class="ie-container"><![endif]-->
          <!--[if mso]><div class="mso-container"><![endif]-->
          <table
            id="u_body"
            style="
              border-collapse: collapse;
              table-layout: fixed;
              border-spacing: 0;
              mso-table-lspace: 0pt;
              mso-table-rspace: 0pt;
              vertical-align: top;
              min-width: 320px;
              margin: 0 auto;
              background-color: #ffffff;
              width: 100%;
            "
            cellpadding="0"
            cellspacing="0"
          >
            <tbody>
              <tr style="vertical-align: top">
                <td
                  style="
                    word-break: break-word;
                    border-collapse: collapse !important;
                    vertical-align: top;
                  "
                >
                  <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #ffffff;"><![endif]-->

                  <!--[if gte mso 9]>
            <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;min-width: 320px;max-width: 600px;">
              <tr>
                <td background="https://cdn.templates.unlayer.com/assets/1704365105617-bg.png" valign="top" width="100%">
            <v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width: 600px;">
              <v:fill type="frame" src="https://cdn.templates.unlayer.com/assets/1704365105617-bg.png" /><v:textbox style="mso-fit-shape-to-text:true" inset="0,0,0,0">
            <![endif]-->

                  <div
                    class="u-row-container"
                    style="padding: 0px; background-color: #e7454a"
                  >
                    <div
                      class="u-row"
                      style="
                        margin: 0 auto;
                        min-width: 320px;
                        max-width: 600px;
                        overflow-wrap: break-word;
                        word-wrap: break-word;
                        word-break: break-word;
                        background-color: #ffffff;
                      "
                    >
                      <div
                        style="
                          border-collapse: collapse;
                          display: table;
                          width: 100%;
                          height: 100%;
                          background-color: transparent;
                        "
                      >
                        <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding: 0px; background-color: #e7454a;" align="center"><table cellpadding="0" cellspacing="0" border="0" style="width:600px;"><tr style="background-color: #ffffff;"><![endif]-->

                        <!--[if (mso)|(IE)]><td align="center" width="600" style="width: 600px;padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;-webkit-border-radius: 0px; -moz-border-radius: 0px;" valign="top"><![endif]-->
                        <div
                          class="u-col u-col-100"
                          style="
                            max-width: 320px;
                            min-width: 600px;
                            display: table-cell;
                            vertical-align: top;
                          "
                        >
                          <div
                            style="
                              height: 100%;
                              width: 100% !important;
                              border-radius: 0px;
                              -webkit-border-radius: 0px;
                              -moz-border-radius: 0px;
                            "
                          >
                            <!--[if (!mso)&(!IE)]><!--><div
                              style="
                                box-sizing: border-box;
                                height: 100%;
                                padding: 0px;
                                border-top: 0px solid transparent;
                                border-left: 0px solid transparent;
                                border-right: 0px solid transparent;
                                border-bottom: 0px solid transparent;
                                border-radius: 0px;
                                -webkit-border-radius: 0px;
                                -moz-border-radius: 0px;
                              "
                            ><!--<![endif]-->
                              <table
                                id="u_content_image_1"
                                style="font-family: 'Raleway', sans-serif"
                                role="presentation"
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                border="0"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      class="v-container-padding-padding"
                                      style="
                                        overflow-wrap: break-word;
                                        word-break: break-word;
                                        padding: 40px 10px 20px;
                                        font-family: 'Raleway', sans-serif;
                                      "
                                      align="left"
                                    >
                                      <table
                                        width="100%"
                                        cellpadding="0"
                                        cellspacing="0"
                                        border="0"
                                      >
                                        <tr>
                                          <td
                                            class="v-text-align"
                                            style="
                                              padding-right: 0px;
                                              padding-left: 0px;
                                            "
                                            align="center"
                                          >
                                            <img
                                              align="center"
                                              border="0"
                                              src="${DATA.image}"
                                              alt="image"
                                              title="image"
                                              style="
                                                outline: none;
                                                text-decoration: none;
                                                -ms-interpolation-mode: bicubic;
                                                clear: both;
                                                display: inline-block !important;
                                                border: none;
                                                height: auto;
                                                float: none;
                                                width: 28%;
                                                max-width: 162.4px;
                                              "
                                              width="162.4"
                                              class="v-src-width v-src-max-width"
                                            />
                                          </td>
                                        </tr>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>

                              <table
                                id="u_content_heading_1"
                                style="font-family: 'Raleway', sans-serif"
                                role="presentation"
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                border="0"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      class="v-container-padding-padding"
                                      style="
                                        overflow-wrap: break-word;
                                        word-break: break-word;
                                        padding: 10px 10px 20px;
                                        font-family: 'Raleway', sans-serif;
                                      "
                                      align="left"
                                    >
                                      <!--[if mso]><table width="100%"><tr><td><![endif]-->
                                      <h1
                                        class="v-text-align v-font-size"
                                        style="
                                          margin: 0px;
                                          color: #e7454a;
                                          line-height: 140%;
                                          text-align: center;
                                          word-wrap: break-word;
                                          font-family: arial black, AvenirNext-Heavy,
                                            avant garde, arial;
                                          font-size: 25px;
                                          font-weight: 400;
                                        "
                                      >
                                        <span
                                          ><span
                                            ><span
                                              ><span
                                                ><span
                                                  ><span
                                                    ><span
                                                      ><strong
                                                        >${DATA.title}</strong
                                                      ></span
                                                    ></span
                                                  ></span
                                                ></span
                                              ></span
                                            ></span
                                          ></span
                                        >
                                      </h1>
                                      <!--[if mso]></td></tr></table><![endif]-->
                                    </td>
                                  </tr>
                                </tbody>
                              </table>

                              <table
                                id="u_content_text_2"
                                style="font-family: 'Raleway', sans-serif"
                                role="presentation"
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                border="0"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      class="v-container-padding-padding"
                                      style="
                                        overflow-wrap: break-word;
                                        word-break: break-word;
                                        padding: 10px 70px;
                                        font-family: 'Raleway', sans-serif;
                                      "
                                      align="left"
                                    >
                                      <div
                                        class="v-text-align v-font-size"
                                        style="
                                          font-size: 14px;
                                          line-height: 170%;
                                          text-align: center;
                                          word-wrap: break-word;
                                        "
                                      >
                                        <p style="line-height: 170%">
                                          <span
                                            data-metadata="&lt;!--(figmeta)eyJmaWxlS2V5Ijoia1NVOHd0cGhRU2w3YnZMY2JvWVd6USIsInBhc3RlSUQiOjE3MTIwNTA3NDUsImRhdGFUeXBlIjoic2NlbmUifQo=(/figmeta)--&gt;"
                                            style="line-height: 23.8px"
                                          ></span
                                          >${DATA.message}
                                        </p>
                                        <p style="line-height: 170%"> </p>
                                        <p style="line-height: 170%">
                                          <span
                                            data-metadata="&lt;!--(figmeta)eyJmaWxlS2V5Ijoia1NVOHd0cGhRU2w3YnZMY2JvWVd6USIsInBhc3RlSUQiOjE2MjA2MjMwNDksImRhdGFUeXBlIjoic2NlbmUifQo=(/figmeta)--&gt;"
                                            style="line-height: 23.8px"
                                          ></span
                                          ><span
                                            data-buffer="&lt;!--(figma)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(/figma)--&gt;"
                                            style="line-height: 23.8px"
                                          ></span
                                          ><strong
                                            >${DATA.preButtonText}</strong
                                          >
                                        </p>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>

                              <table
                                id="u_content_button_1"
                                style="font-family: 'Raleway', sans-serif"
                                role="presentation"
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                border="0"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      class="v-container-padding-padding"
                                      style="
                                        overflow-wrap: break-word;
                                        word-break: break-word;
                                        padding: 10px;
                                        font-family: 'Raleway', sans-serif;
                                      "
                                      align="left"
                                    >
                                      <!--[if mso
                                        ]><style>
                                          .v-button {
                                            background: transparent !important;
                                          }
                                        </style><!
                                      [endif]-->
                                      <div class="v-text-align" align="center">
                                        <!--[if mso]><table border="0" cellspacing="0" cellpadding="0"><tr><td align="center" bgcolor="#3b3b3b" style="padding:10px 20px;" valign="top"><![endif]-->
                                        <a
                                          href="${DATA.buttonLink}"
                                          target="_blank"
                                          class="v-button v-font-size"
                                          style="
                                            box-sizing: border-box;
                                            display: inline-block;
                                            text-decoration: none;
                                            -webkit-text-size-adjust: none;
                                            text-align: center;
                                            color: #ffffff;
                                            background-color: #3b3b3b;
                                            border-radius: 4px;
                                            -webkit-border-radius: 4px;
                                            -moz-border-radius: 4px;
                                            width: auto;
                                            max-width: 100%;
                                            overflow-wrap: break-word;
                                            word-break: break-word;
                                            word-wrap: break-word;
                                            mso-border-alt: none;
                                            font-size: 14px;
                                          "
                                        >
                                          <span
                                            style="
                                              display: block;
                                              padding: 10px 20px;
                                              line-height: 120%;
                                            "
                                            ><strong
                                              >${DATA.buttonText}</strong
                                            ></span
                                          >
                                        </a>
                                        <!--[if mso]></td></tr></table><![endif]-->
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>

                              <table
                                id="u_content_text_1"
                                style="font-family: 'Raleway', sans-serif"
                                role="presentation"
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                border="0"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      class="v-container-padding-padding"
                                      style="
                                        overflow-wrap: break-word;
                                        word-break: break-word;
                                        padding: 10px 70px 40px;
                                        font-family: 'Raleway', sans-serif;
                                      "
                                      align="left"
                                    >
                                      <div
                                        class="v-text-align v-font-size"
                                        style="
                                          font-size: 12px;
                                          line-height: 120%;
                                          text-align: center;
                                          word-wrap: break-word;
                                        "
                                      >
                                        <p style="line-height: 120%">
                                          <span
                                            data-metadata="&lt;!--(figmeta)eyJmaWxlS2V5Ijoia1NVOHd0cGhRU2w3YnZMY2JvWVd6USIsInBhc3RlSUQiOjE3MTIwNTA3NDUsImRhdGFUeXBlIjoic2NlbmUifQo=(/figmeta)--&gt;"
                                            style="line-height: 14.4px"
                                          ></span
                                          >${DATA.footer}<br /><a
                                            href="${DATA.buttonLink}"
                                            >${DATA.buttonLink}</a
                                          >
                                        </p>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>

                              <table
                                style="font-family: 'Raleway', sans-serif"
                                role="presentation"
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                border="0"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      class="v-container-padding-padding"
                                      style="
                                        overflow-wrap: break-word;
                                        word-break: break-word;
                                        padding: 0px;
                                        font-family: 'Raleway', sans-serif;
                                      "
                                      align="left"
                                    >
                                      <table
                                        height="0px"
                                        align="center"
                                        border="0"
                                        cellpadding="0"
                                        cellspacing="0"
                                        width="100%"
                                        style="
                                          border-collapse: collapse;
                                          table-layout: fixed;
                                          border-spacing: 0;
                                          mso-table-lspace: 0pt;
                                          mso-table-rspace: 0pt;
                                          vertical-align: top;
                                          border-top: 10px solid #ffffff;
                                          -ms-text-size-adjust: 100%;
                                          -webkit-text-size-adjust: 100%;
                                        "
                                      >
                                        <tbody>
                                          <tr style="vertical-align: top">
                                            <td
                                              style="
                                                word-break: break-word;
                                                border-collapse: collapse !important;
                                                vertical-align: top;
                                                font-size: 0px;
                                                line-height: 0px;
                                                mso-line-height-rule: exactly;
                                                -ms-text-size-adjust: 100%;
                                                -webkit-text-size-adjust: 100%;
                                              "
                                            >
                                              <span>&#160;</span>
                                            </td>
                                          </tr>
                                        </tbody>
                                      </table>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>

                              <!--[if (!mso)&(!IE)]><!-->
                            </div>
                            <!--<![endif]-->
                          </div>
                        </div>
                        <!--[if (mso)|(IE)]></td><![endif]-->
                        <!--[if (mso)|(IE)]></tr></table></td></tr></table><![endif]-->
                      </div>
                    </div>
                  </div>

                  <!--[if gte mso 9]>
            </v:textbox></v:rect>
          </td>
          </tr>
          </table>
          <![endif]-->

                  <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                </td>
              </tr>
            </tbody>
          </table>
          <!--[if mso]></div><![endif]-->
          <!--[if IE]></div><![endif]-->
        </body>
      </html>
    `
  };

  transporter.sendMail(mailData, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
}
