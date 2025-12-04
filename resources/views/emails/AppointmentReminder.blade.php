<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
  <meta charset="utf-8"> <!-- utf-8 works for most cases -->
  <meta name="viewport" content="width=device-width"> <!-- Forcing initial-scale shouldn't be necessary -->
  <meta http-equiv="X-UA-Compatible" content="IE=edge"> <!-- Use the latest (edge) version of IE rendering engine -->
  <meta name="x-apple-disable-message-reformatting"> <!-- Disable auto-scale in iOS 10 Mail entirely -->
  <title></title> <!-- The title tag shows in email notifications, like Android 4.4. -->

  <link href="https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700" rel="stylesheet">

  <!-- CSS Reset : BEGIN -->
  <style>
    /* What it does: Remove spaces around the email design added by some email clients. */
    /* Beware: It can remove the padding / margin and add a background color to the compose a reply window. */
    html,
    body {
      margin: 0 auto !important;
      padding: 0 !important;
      height: 100% !important;
      width: 100% !important;
      background: #f1f1f1;
    }

    /* What it does: Stops email clients resizing small text. */
    * {
      -ms-text-size-adjust: 100%;
      -webkit-text-size-adjust: 100%;
    }

    /* What it does: Centers email on Android 4.4 */
    div[style*="margin: 16px 0"] {
      margin: 0 !important;
    }

    /* What it does: Stops Outlook from adding extra spacing to tables. */
    table,
    td {
      mso-table-lspace: 0pt !important;
      mso-table-rspace: 0pt !important;
    }

    /* What it does: Fixes webkit padding issue. */
    table {
      border-spacing: 0 !important;
      border-collapse: collapse !important;
      table-layout: fixed !important;
      margin: 0 auto !important;
    }

    /* What it does: Uses a better rendering method when resizing images in IE. */
    img {
      -ms-interpolation-mode: bicubic;
    }

    /* What it does: Prevents Windows 10 Mail from underlining links despite inline CSS. Styles for underlined links should be inline. */
    a {
      text-decoration: none;
    }

    /* What it does: A work-around for email clients meddling in triggered links. */
    *[x-apple-data-detectors],
    /* iOS */
    .unstyle-auto-detected-links *,
    .aBn {
      border-bottom: 0 !important;
      cursor: default !important;
      color: inherit !important;
      text-decoration: none !important;
      font-size: inherit !important;
      font-family: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
    }

    /* What it does: Prevents Gmail from displaying a download button on large, non-linked images. */
    .a6S {
      display: none !important;
      opacity: 0.01 !important;
    }

    /* What it does: Prevents Gmail from changing the text color in conversation threads. */
    .im {
      color: inherit !important;
    }

    /* If the above doesn't work, add a .g-img class to any image in question. */
    img.g-img+div {
      display: none !important;
    }

    /* What it does: Removes right gutter in Gmail iOS app: https://github.com/TedGoas/Cerberus/issues/89  */
    /* Create one of these media queries for each additional viewport size you'd like to fix */

    /* iPhone 4, 4S, 5, 5S, 5C, and 5SE */
    @media only screen and (min-device-width: 320px) and (max-device-width: 374px) {
      u~div .email-container {
        min-width: 320px !important;
      }
    }

    /* iPhone 6, 6S, 7, 8, and X */
    @media only screen and (min-device-width: 375px) and (max-device-width: 413px) {
      u~div .email-container {
        min-width: 375px !important;
      }
    }

    /* iPhone 6+, 7+, and 8+ */
    @media only screen and (min-device-width: 414px) {
      u~div .email-container {
        min-width: 414px !important;
      }
    }
  </style>

  <!-- CSS Reset : END -->

  <!-- Progressive Enhancements : BEGIN -->
  <style>
    .primary {
      background: #17bebb;
    }

    .bg_white {
      background: #ffffff;
    }

    .bg_light {
      background: #f7fafa;
    }

    .bg_black {
      background: #000000;
    }

    .bg_dark {
      background: rgba(0, 0, 0, .8);
    }

    .email-section {
      padding: 2.5em;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      font-family: 'Poppins', sans-serif;
      color: #000000;
      margin-top: 0;
      font-weight: 400;
    }

    body {
      font-family: 'Poppins', sans-serif;
      font-weight: 400;
      font-size: 16px;
      line-height: 1.8;
      color: rgba(0, 0, 0, .4);
    }

    a {
      color: #17bebb;
    }

    /* center {
      padding: 30px 0;
    } */

    /*LOGO*/

    .logo h1 {
      margin: 0;
    }

    .logo h1 a {
      color: #E03A14;
      font-size: 24px;
      font-weight: 700;
      font-family: 'Poppins', sans-serif;
    }

    /* DESCRIPTION */

    .description {
      text-align: justify;
      word-wrap: break-word;
    }

    .description ul {
      padding: 0;
    }

    .description ol {
      padding-left: 20px;
    }

    .description ul li {
      list-style: none;
      margin-left: 0;
    }

    /*FOOTER*/

    .footer {
      border-top: 1px solid rgba(0, 0, 0, .05);
      color: rgba(0, 0, 0, .5);
    }

    .footer .heading {
      color: #E03A14;
      font-size: 20px;
    }

    .footer ul {
      margin: 0;
      padding: 0;
    }

    .footer ul li {
      list-style: none;
      margin-bottom: 10px;
    }

    .footer ul li a {
      color: rgba(0, 0, 0, 1);
    }
  </style>


</head>

<body width="100%"
  style="margin: 0; padding: 0 !important; mso-line-height-rule: exactly; background-color: #f1f1f1;">
  <center style="width: 100%; background-color: #f1f1f1;">
    <div
      style="display: none; font-size: 1px;max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; mso-hide: all; font-family: sans-serif;">
      &zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
    </div>
    <div style="max-width: 700px; margin: 0 auto;" class="email-container">
      <!-- BEGIN BODY -->
      <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
        style="margin: auto;">
        <tr>
          <td valign="top" class="bg_white" style="padding: 1em 2.5em 0 2.5em;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td class="logo" style="text-align: center;">
                  <h1><a href="https://rs.ui.ac.id/umum">Rumah Sakit Universitas Indonesia</a></h1>
                </td>
              </tr>
            </table>
          </td>
        </tr><!-- end tr -->
        <tr>
          <!-- <td valign="top" class="bg_white" style="padding: 1em 2.5em 0 2.5em;"> -->
          <td class="bg_white description" style="padding: 1em 2.5em 4em 2.5em;">
            <p class="has-background has-very-light-gray-background-color">
              <strong>Selamat malam</strong>,<br><br>
              Kami ingin mengingatkan atas nama <strong>{{ $nama_lengkap ?? '' }}</strong> memiliki janji temu:
            <ul>
              <!-- <li><strong>Tujuan kedatangan:</strong> Konsultasi dokter</li> -->
              <li><strong>Poli:</strong> {!! $nama_klinik ?? '' !!}</li>
              <li><strong>Nama Dokter:</strong> {{ $nama_dokter ?? '' }}</li>
              <li><strong>Tanggal Kunjungan:</strong> {{ $tgl_kunjungan ?? '' }}</li>
              <li><strong>Jadwal Dokter:</strong> {{ $jadwal_dokter ?? '' }}</li>
            </ul>

            <strong>Hal-hal yang perlu diperhatikan sebagai berikut:</strong>
            <ol>
              <li>Datang pada tanggal tersebut 1 jam sebelum praktek dokter dimulai</li>
              <li>Sebelum memasuki gedung Entrance RSUI akan dilakukan skrining terlebih dahulu (di lobi)</li>
              <li>Diharapkan mengisi borang skrining pasien/pengunjung melalui link rs.ui.ac.id/skrining</li>
              <li>Menunjukkan hasil pengisian borang skrining ke petugas kami</li>
              <li>Melakukan registrasi ulang dengan memindai QR code di Anjungan Pendaftaran Online dan kemudian akan
                mendapatkan nomor antrian sesuai dengan penjaminan</li>
              <li>Loket registrasi dibuka mulai pukul 07.30 pagi</li>
            </ol>

            Sesuai kebijakan pencegahan dan pengendalian infeksi COVID-19, kami anjurkan untuk selalu menggunakan masker
            dari rumah dan selama berada di lingkungan RSUI. <br><br>

            <Strong>Terima kasih</Strong>
            </p>
          </td>
        </tr><!-- end tr -->
        <!-- 1 Column Text + Button : END -->
      </table>
      <table align="center" role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%"
        style="margin: auto;">
        <tr>
          <td valign="middle" class="bg_light footer email-section">
            <table>
              <tr>
                <td valign="top" width="33.333%" style="padding-top: 20px;">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr>
                      <td style="text-align: left; padding-left: 5px; padding-right: 5px;">
                        <h3 class="heading">Informasi Kontak</h3>
                        <ul>
                          <li><span class="text">Jl. Prof. Dr. Bahder Djohan No.1, Pondok Cina, Kec. Beji, Kota Depok,
                              Jawa Barat 16424</span></li>
                          <li><span class="text">(021) 50829292</span></a></li>
                          <li><span class="text"><a
                                href="https://api.whatsapp.com/send/?phone=628119113913&text&app_absent=0"
                                target="_blank" rel="noopener noreferrer">Whatsapp</a></span></li>
                        </ul>
                      </td>
                    </tr>
                  </table>
                </td>
                <td valign="top" width="33.333%" style="padding-top: 20px;">
                  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr>
                      <td style="text-align: left; padding-left: 10px;">
                        <h3 class="heading">Tautan</h3>
                        <ul>
                          <li><a href="https://rs.ui.ac.id/umum/">Website</a></li>
                          <li><a href="https://rs.ui.ac.id/umum/berita-artikel/promosi">Promo</a></li>
                          <li><a href="https://rs.ui.ac.id/umum/tentang-rsui/mengapa-rsui">Tentang Kami</a></li>
                        </ul>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr><!-- end: tr -->
        <tr>
          <td class="bg_light" style="text-align: center;">
            <p> &copy; Copyright @php echo date('Y') @endphp, RSUI</p>
          </td>
        </tr>
      </table>

    </div>
  </center>
</body>

</html>
