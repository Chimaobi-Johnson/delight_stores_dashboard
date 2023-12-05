module.exports.productReceiptConfirmation = (data) => {
  const { firstName, lastName, city, streetname, houseno, deliveryType, email, products, paymentRef } = data;

  let deliveryLocation = 'Dlight stores - Pick up'
  if(deliveryType === 'delivery') {
    deliveryLocation = houseno + ' ' + streetname + ' ' + city;
  }

  const receiptInfo = {
    address1: 'No. 26 Destiny Drive Rd, Abuloma',
    address2: 'Port Harcourt',
    address3: 'Nigeria. 500101',
    heading1: 'THANK YOU FOR SHOPPING WITH US TODAY.',
    estDeliveryTime: '1-2 days',
    bottomText: 'We  are always stocking up with a variety of new products, please ensure to check with us regularly for new gift items!'
  }

  let current = new Date();
  let cDate = current.getDate() + '-' + (current.getMonth() + 1) + '-' + current.getFullYear();
  let cTime = current.getHours() + ":" + current.getMinutes() + ":" + current.getSeconds();
  let dateTime = cDate + ' ' + cTime;


  const receiptHtml = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html data-editor-version="2" class="sg-campaigns" xmlns="http://www.w3.org/1999/xhtml">
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1">
      <!--[if !mso]><!-->
      <meta http-equiv="X-UA-Compatible" content="IE=Edge">
      <!--<![endif]-->
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
      font-family: inherit;
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
    ul ul ul ul  {
      list-style-type: disc !important;
    }
    ol ol {
      list-style-type: lower-roman !important;
    }
    ol ol ol {
      list-style-type: lower-latin !important;
    }
    ol ol ol ol {
      list-style-type: decimal !important;
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
        max-width: 100% !important;
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
      .social-icon-column {
        display: inline-block !important;
      }
    }
  </style>
      <!--user entered Head Start--><link href="https://fonts.googleapis.com/css?family=Poppins&display=swap" rel="stylesheet"><style>
body {font-family: 'Poppins', sans-serif;}
</style><!--End Head user entered-->
    </head>
    <body>
      <center class="wrapper" data-link-color="#1188E6" data-body-style="font-size:14px; font-family:inherit; color:#000000; background-color:#e5dcd2;">
        <div class="webkit">
          <table cellpadding="0" cellspacing="0" border="0" width="100%" class="wrapper" bgcolor="#e5dcd2">
            <tr>
              <td valign="top" bgcolor="#e5dcd2" width="100%">
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
                                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px;" align="center">
                                      <tr>
                                        <td role="modules-container" style="padding:0px 0px 0px 0px; color:#000000; text-align:left;" bgcolor="#FFFFFF" width="100%" align="left"><table class="module preheader preheader-hide" role="module" data-type="preheader" border="0" cellpadding="0" cellspacing="0" width="100%" style="display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;">
    <tr>
      <td role="module-content">
        <p>Your order has been confirmed</p>
      </td>
    </tr>
  </table><table class="wrapper" role="module" data-type="image" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="7a97ba83-42a9-4fb8-b7d0-bd38c3ec1cfb">
    <tbody>
      <tr>
        <td style="font-size:6px; line-height:10px; padding:0px 0px 0px 0px;" valign="top" align="center">
          <img class="max-width" border="0" style="display:block; color:#000000; text-decoration:none; font-family:Helvetica, arial, sans-serif; font-size:16px; max-width:100% !important; width:100%; height:auto !important;" width="600" alt="" data-proportionally-constrained="true" data-responsive="true" src="http://cdn.mcauto-images-production.sendgrid.net/e9a8b241000b5856/b24893ef-505c-4711-8838-4dfe223e4120/1004x351.png">
        </td>
      </tr>
    </tbody>
  </table><table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns" style="padding:5px 0px 5px 0px;" bgcolor="#6f6f6f" data-distribution="1">
    <tbody>
      <tr role="module-content">
        <td height="100%" valign="top"><table width="600" style="width:600px; border-spacing:0; border-collapse:collapse; margin:0px 0px 0px 0px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="" class="column column-0">
      <tbody>
        <tr>
          <td style="padding:0px;margin:0px;border-spacing:0;"><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="594ac2bc-2bb0-4642-8002-a8c9b543d125" data-mc-module-version="2019-10-22">
    <tbody>
      <tr>
        <td style="padding:2px 0px 0px 0px; line-height:16px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="font-size: 10px; color: #f6f6f6">${receiptInfo.address1},</span></div>
<div style="font-family: inherit; text-align: center"><span style="font-size: 10px; color: #f6f6f6">${receiptInfo.address2}</span></div>
<div style="font-family: inherit; text-align: center"><span style="font-size: 10px; color: #f6f6f6">${receiptInfo.address3}</span></div><div></div></div></td>
      </tr>
    </tbody>
  </table></td>
        </tr>
      </tbody>
    </table></td>
      </tr>
    </tbody>
  </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="8fd711e6-aecf-4663-bf53-6607f08b57e9" data-mc-module-version="2019-10-22">
    <tbody>
      <tr>
        <td style="padding:15px 0px 10px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="color: #80817f; font-size: 12px"><strong>${receiptInfo.heading1}</strong></span></div>
<div style="font-family: inherit; text-align: center"><br></div>
<div style="font-family: inherit; text-align: center"><span style="color: #80817f; font-size: 12px"><strong>Sales Receipt</strong></span></div>
<div style="font-family: inherit; text-align: center"><span style="color: #80817f; font-size: 12px">${dateTime}</span></div><div></div></div></td>
      </tr>
    </tbody>
  </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="8fd711e6-aecf-4663-bf53-6607f08b57e9.1" data-mc-module-version="2019-10-22">
    <tbody>
      <tr>
        <td style="padding:0px 40px 30px 40px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><h4 style="text-align: inherit; font-family: inherit">SHIP TO:</h4>
<div style="font-family: inherit; text-align: inherit"><span style="color: #80817f; font-size: 12px"><strong>Name: </strong></span><span style="color: #80817f; font-size: 12px">${firstName} ${lastName}</span></div>
<div style="font-family: inherit; text-align: inherit"><span style="color: #80817f; font-size: 12px"><strong>Address: </strong></span><span style="color: #80817f; font-size: 12px">${deliveryLocation}</span></div>
<div style="font-family: inherit; text-align: inherit"><span style="color: #80817f; font-size: 12px"><strong>Receipt No: </strong></span><span style="color: #80817f; font-size: 12px">${paymentRef.reference}</span></div>
<div style="font-family: inherit; text-align: inherit"><span style="color: #80817f; font-size: 12px"><strong>Est. Delivery time</strong></span><span style="color: #80817f; font-size: 12px">: ${receiptInfo.estDeliveryTime}</span></div><div></div></div></td>
      </tr>
    </tbody>
  </table><table class="module" role="module" data-type="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="c614d8b1-248a-48ea-a30a-8dd0b2c65e10">
    <tbody>
      <tr>
        <td style="padding:0px 40px 0px 40px;" role="module-content" height="100%" valign="top" bgcolor="">
          <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="2px" style="line-height:2px; font-size:2px;">
            <tbody>
              <tr>
                <td style="padding:0px 0px 2px 0px;" bgcolor="#80817f"></td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table><table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" role="module" data-type="columns" style="padding:0px 40px 0px 40px;" bgcolor="#FFFFFF" data-distribution="1,1,1">
    <tbody>
      <tr role="module-content">
        <td height="100%" valign="top"><table width="173" style="width:173px; border-spacing:0; border-collapse:collapse; margin:0px 0px 0px 0px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="" class="column column-0">
      <tbody>
        <tr>
          <td style="padding:0px;margin:0px;border-spacing:0;"><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="64573b96-209a-4822-93ec-5c5c732af15c" data-mc-module-version="2019-10-22">
    <tbody>
      <tr>
        <td style="padding:15px 0px 15px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="color: #80817f; font-size: 12px"><strong>ITEM</strong></span></div><div></div></div></td>
      </tr>
    </tbody>
  </table></td>
        </tr>
      </tbody>
    </table><table width="173" style="width:173px; border-spacing:0; border-collapse:collapse; margin:0px 0px 0px 0px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="" class="column column-1">
      <tbody>
        <tr>
          <td style="padding:0px;margin:0px;border-spacing:0;"><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="64573b96-209a-4822-93ec-5c5c732af15c.1" data-mc-module-version="2019-10-22">
    <tbody>
      <tr>
        <td style="padding:15px 0px 15px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="color: #80817f; font-size: 12px"><strong>QTY</strong></span></div><div></div></div></td>
      </tr>
    </tbody>
  </table></td>
        </tr>
      </tbody>
    </table><table width="173" style="width:173px; border-spacing:0; border-collapse:collapse; margin:0px 0px 0px 0px;" cellpadding="0" cellspacing="0" align="left" border="0" bgcolor="" class="column column-2">
      <tbody>
        <tr>
          <td style="padding:0px;margin:0px;border-spacing:0;"><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="64573b96-209a-4822-93ec-5c5c732af15c.1.1" data-mc-module-version="2019-10-22">
    <tbody>
      <tr>
        <td style="padding:15px 0px 15px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="color: #80817f; font-size: 12px"><strong>PRICE</strong></span></div><div></div></div></td>
      </tr>
    </tbody>
  </table></td>
        </tr>
      </tbody>
    </table></td>
      </tr>
    </tbody>
  </table>
    ${products.map(product => (
      `
      <table
      class="module"
      role="module"
      data-type="divider"
      border="0"
      cellpadding="0"
      cellspacing="0"
      width="100%"
      style="table-layout: fixed"
      data-muid="c614d8b1-248a-48ea-a30a-8dd0b2c65e10.1"
    >
      <tbody>
        <tr>
          <td
            style="padding: 0px 40px 0px 40px"
            role="module-content"
            height="100%"
            valign="top"
            bgcolor=""
          >
            <table
              border="0"
              cellpadding="0"
              cellspacing="0"
              align="center"
              width="100%"
              height="2px"
              style="
                line-height: 2px;
                font-size: 2px;
              "
            >
              <tbody>
                <tr>
                  <td
                    style="padding: 0px 0px 2px 0px"
                    bgcolor="#80817f"
                  ></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
    <table
      border="0"
      cellpadding="0"
      cellspacing="0"
      align="center"
      width="100%"
      role="module"
      data-type="columns"
      style="padding: 0px 40px 0px 40px"
      bgcolor="#FFFFFF"
      data-distribution="1,1,1"
    >
      <tbody>
        <tr role="module-content">
          <td height="100%" valign="top">
            <table
              width="173"
              style="
                width: 173px;
                border-spacing: 0;
                border-collapse: collapse;
                margin: 0px 0px 0px 0px;
              "
              cellpadding="0"
              cellspacing="0"
              align="left"
              border="0"
              bgcolor=""
              class="column column-0"
            >
              <tbody>
                <tr>
                  <td
                    style="
                      padding: 0px;
                      margin: 0px;
                      border-spacing: 0;
                    "
                  >
                    <table
                      class="module"
                      role="module"
                      data-type="text"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                      style="table-layout: fixed"
                      data-muid="64573b96-209a-4822-93ec-5c5c732af15c.2"
                      data-mc-module-version="2019-10-22"
                    >
                      <tbody>
                        <tr>
                          <td
                            style="
                              padding: 15px 0px 15px
                                0px;
                              line-height: 22px;
                              text-align: inherit;
                            "
                            height="100%"
                            valign="top"
                            bgcolor=""
                            role="module-content"
                          >
                            <div>
                              <div
                                style="
                                  font-family: inherit;
                                  text-align: center;
                                "
                              >
                                <span
                                  style="
                                    color: #80817f;
                                    font-size: 12px;
                                  "
                                  >${product.name} <span> (${product.size ? product.size.label : ''} ${product.color ? product.color.label : '' })</span></span
                                >
                              </div>
                              <div></div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              width="173"
              style="
                width: 173px;
                border-spacing: 0;
                border-collapse: collapse;
                margin: 0px 0px 0px 0px;
              "
              cellpadding="0"
              cellspacing="0"
              align="left"
              border="0"
              bgcolor=""
              class="column column-1"
            >
              <tbody>
                <tr>
                  <td
                    style="
                      padding: 0px;
                      margin: 0px;
                      border-spacing: 0;
                    "
                  >
                    <table
                      class="module"
                      role="module"
                      data-type="text"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                      style="table-layout: fixed"
                      data-muid="64573b96-209a-4822-93ec-5c5c732af15c.1.2"
                      data-mc-module-version="2019-10-22"
                    >
                      <tbody>
                        <tr>
                          <td
                            style="
                              padding: 15px 0px 15px
                                0px;
                              line-height: 22px;
                              text-align: inherit;
                            "
                            height="100%"
                            valign="top"
                            bgcolor=""
                            role="module-content"
                          >
                            <div>
                              <div
                                style="
                                  font-family: inherit;
                                  text-align: center;
                                "
                              >
                                <span
                                  style="
                                    color: #80817f;
                                    font-size: 12px;
                                  "
                                  >${product.quantity}</span
                                >
                              </div>
                              <div></div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
            <table
              width="173"
              style="
                width: 173px;
                border-spacing: 0;
                border-collapse: collapse;
                margin: 0px 0px 0px 0px;
              "
              cellpadding="0"
              cellspacing="0"
              align="left"
              border="0"
              bgcolor=""
              class="column column-2"
            >
              <tbody>
                <tr>
                  <td
                    style="
                      padding: 0px;
                      margin: 0px;
                      border-spacing: 0;
                    "
                  >
                    <table
                      class="module"
                      role="module"
                      data-type="text"
                      border="0"
                      cellpadding="0"
                      cellspacing="0"
                      width="100%"
                      style="table-layout: fixed"
                      data-muid="64573b96-209a-4822-93ec-5c5c732af15c.1.1.1"
                      data-mc-module-version="2019-10-22"
                    >
                      <tbody>
                        <tr>
                          <td
                            style="
                              padding: 15px 0px 15px
                                0px;
                              line-height: 22px;
                              text-align: inherit;
                            "
                            height="100%"
                            valign="top"
                            bgcolor=""
                            role="module-content"
                          >
                            <div>
                              <div
                                style="
                                  font-family: inherit;
                                  text-align: center;
                                "
                              >
                                <span
                                  style="
                                    color: #80817f;
                                    font-size: 12px;
                                  "
                                  >N${product.price}</span
                                >
                              </div>
                              <div></div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
      `
    ))}

    
    
    
  <table class="module" role="module" data-type="divider" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="c614d8b1-248a-48ea-a30a-8dd0b2c65e10.1.2.1">
    <tbody>
      <tr>
        <td style="padding:0px 40px 0px 40px;" role="module-content" height="100%" valign="top" bgcolor="">
          <table border="0" cellpadding="0" cellspacing="0" align="center" width="100%" height="1px" style="line-height:1px; font-size:1px;">
            <tbody>
              <tr>
                <td style="padding:0px 0px 1px 0px;" bgcolor="#80817f"></td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table><table class="module" role="module" data-type="spacer" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="9bbc393c-c337-4d1a-b9f9-f20c740a0d44">
    <tbody>
      <tr>
        <td style="padding:0px 0px 30px 0px;" role="module-content" bgcolor="">
        </td>
      </tr>
    </tbody>
  </table><table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="20d6cd7f-4fad-4e9c-8fba-f36dba3278fc" data-mc-module-version="2019-10-22">
    <tbody>
      <tr>
        <td style="padding:10px 30px 10px 30px; line-height:22px; text-align:inherit; background-color:#80817f;" height="100%" valign="top" bgcolor="#80817f" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="color: #ffffff; font-size: 12px"><strong>${receiptInfo.bottomText}</strong></span></div><div></div></div></td>
      </tr>
    </tbody>
  </table>
      <tbody>
        <tr>
          <td align="center" bgcolor="#ffffff" class="outer-td" style="padding:20px 0px 20px 0px; background-color:#ffffff;">
            <table border="0" cellpadding="0" cellspacing="0" class="wrapper-mobile" style="text-align:center;">
              <tbody>
                <tr>
                <td align="center" bgcolor="#f5f8fd" class="inner-td" style="border-radius:6px; font-size:16px; text-align:center; background-color:inherit;"><a href="https://marvtech.herokuapp.com" style="background-color:#f5f8fd; border:1px solid #f5f8fd; border-color:#f5f8fd; border-radius:25px; border-width:1px; color:##c9c9c9; display:inline-block; font-size:10px; font-weight:normal; letter-spacing:0px; line-height:normal; padding:5px 18px 5px 18px; text-align:center; text-decoration:none; border-style:solid; font-family:helvetica,sans-serif;" target="_blank">♥ POWERED BY MARVTECH</a></td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table></td>
                                      </tr>
                                    </table>
                                    <!--[if mso]>
                                  </td>
                                </tr>
                              </table>
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
    </body>
  </html>`;

  return receiptHtml;
};
