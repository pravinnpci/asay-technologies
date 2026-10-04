import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import QRCode from 'qrcode';
import { VerifiedCertificate } from '../data/coursesData';

export async function generateCertificatePdf(cert: VerifiedCertificate): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create();
  // Landscape A4: 841.89 x 595.28 points
  const page = pdfDoc.addPage([842, 595]);
  const { width, height } = page.getSize();

  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Background cream/white
  page.drawRectangle({
    x: 0,
    y: 0,
    width,
    height,
    color: rgb(0.99, 0.99, 1.0)
  });

  // Outer Border (Gold / Indigo)
  page.drawRectangle({
    x: 20,
    y: 20,
    width: width - 40,
    height: height - 40,
    borderWidth: 3,
    borderColor: rgb(0.18, 0.28, 0.65), // Indigo
  });

  // Inner Border (Gold)
  page.drawRectangle({
    x: 28,
    y: 28,
    width: width - 56,
    height: height - 56,
    borderWidth: 1.5,
    borderColor: rgb(0.85, 0.65, 0.13), // Gold
  });

  // Header: Company Name & ISO Accreditation
  const orgName = 'ASAI INFOTECH';
  const orgWidth = fontBold.widthOfTextAtSize(orgName, 26);
  page.drawText(orgName, {
    x: (width - orgWidth) / 2,
    y: height - 70,
    size: 26,
    font: fontBold,
    color: rgb(0.18, 0.28, 0.65)
  });

  const isoText = 'An ISO 9001:2015 Quality Management Certified Technology Organization';
  const isoWidth = fontRegular.widthOfTextAtSize(isoText, 11);
  page.drawText(isoText, {
    x: (width - isoWidth) / 2,
    y: height - 90,
    size: 11,
    font: fontRegular,
    color: rgb(0.4, 0.45, 0.55)
  });

  // Decorative Title
  const certTitle = 'CERTIFICATE OF ACCOMPLISHMENT & INTERNSHIP';
  const titleWidth = fontBold.widthOfTextAtSize(certTitle, 18);
  page.drawText(certTitle, {
    x: (width - titleWidth) / 2,
    y: height - 135,
    size: 18,
    font: fontBold,
    color: rgb(0.85, 0.65, 0.13)
  });

  const presText = 'This is to certify that';
  const presWidth = fontRegular.widthOfTextAtSize(presText, 12);
  page.drawText(presText, {
    x: (width - presWidth) / 2,
    y: height - 170,
    size: 12,
    font: fontRegular,
    color: rgb(0.3, 0.3, 0.3)
  });

  // Student Name
  const studentName = cert.studentName.toUpperCase();
  const nameWidth = fontBold.widthOfTextAtSize(studentName, 24);
  page.drawText(studentName, {
    x: (width - nameWidth) / 2,
    y: height - 210,
    size: 24,
    font: fontBold,
    color: rgb(0.1, 0.12, 0.25)
  });

  // Horizontal underline for student name
  page.drawLine({
    start: { x: (width - nameWidth) / 2 - 20, y: height - 216 },
    end: { x: (width + nameWidth) / 2 + 20, y: height - 216 },
    thickness: 1,
    color: rgb(0.85, 0.65, 0.13)
  });

  // Description
  const completionDesc = `has successfully demonstrated practical industry proficiency and completed the rigorous`;
  const descWidth = fontRegular.widthOfTextAtSize(completionDesc, 12);
  page.drawText(completionDesc, {
    x: (width - descWidth) / 2,
    y: height - 245,
    size: 12,
    font: fontRegular,
    color: rgb(0.3, 0.3, 0.3)
  });

  // Course Title
  const courseTitle = `"${cert.courseTitle}"`;
  const courseWidth = fontBold.widthOfTextAtSize(courseTitle, 16);
  page.drawText(courseTitle, {
    x: (width - courseWidth) / 2,
    y: height - 275,
    size: 16,
    font: fontBold,
    color: rgb(0.18, 0.28, 0.65)
  });

  // Additional detail
  const detailText = `including practical hands-on capstone assignments, daily live interactive sessions, and code evaluation with ${cert.grade}.`;
  const detailWidth = fontRegular.widthOfTextAtSize(detailText, 11);
  page.drawText(detailText, {
    x: (width - detailWidth) / 2,
    y: height - 305,
    size: 11,
    font: fontRegular,
    color: rgb(0.35, 0.35, 0.35)
  });

  // Skills Acquired
  if (cert.skillsAcquired && cert.skillsAcquired.length > 0) {
    const skillsText = `Skills Certified: ${cert.skillsAcquired.join(' • ')}`;
    const skillsWidth = fontOblique.widthOfTextAtSize(skillsText, 10);
    page.drawText(skillsText, {
      x: (width - skillsWidth) / 2,
      y: height - 335,
      size: 10,
      font: fontOblique,
      color: rgb(0.25, 0.35, 0.55)
    });
  }

  // Generate QR Code as PNG data URL
  const qrDataUrl = await QRCode.toDataURL(cert.credentialUrl, {
    width: 130,
    margin: 1,
    color: {
      dark: '#1e293b',
      light: '#ffffff'
    }
  });

  const qrImage = await pdfDoc.embedPng(qrDataUrl);
  // Draw QR code on bottom center/left
  page.drawImage(qrImage, {
    x: 80,
    y: 70,
    width: 90,
    height: 90
  });

  page.drawText('Scan to Verify Credential', {
    x: 65,
    y: 55,
    size: 8,
    font: fontBold,
    color: rgb(0.3, 0.35, 0.45)
  });

  // Certificate ID & Date details
  page.drawText(`Certificate ID: ${cert.certificateId}`, {
    x: 200,
    y: 110,
    size: 9,
    font: fontBold,
    color: rgb(0.2, 0.2, 0.3)
  });

  page.drawText(`Issue Date: ${cert.issueDate}`, {
    x: 200,
    y: 95,
    size: 9,
    font: fontRegular,
    color: rgb(0.4, 0.4, 0.4)
  });

  page.drawText(`Status: VERIFIED & GENUINE (ISO 9001:2015 QMS)`, {
    x: 200,
    y: 80,
    size: 8,
    font: fontBold,
    color: rgb(0.1, 0.55, 0.25)
  });

  page.drawText(`Verify Online: asayinfotech.in/verify`, {
    x: 200,
    y: 65,
    size: 8,
    font: fontRegular,
    color: rgb(0.4, 0.4, 0.5)
  });

  // Authority Signature on right
  const sigLineY = 95;
  
  // Stylized digital signature representation for Sivabarathi M
  page.drawText('Sivabarathi M', {
    x: width - 235,
    y: sigLineY + 12,
    size: 16,
    font: fontOblique,
    color: rgb(0.12, 0.18, 0.45)
  });

  page.drawText('Digitally Signed & Verified', {
    x: width - 240,
    y: sigLineY + 2,
    size: 7,
    font: fontRegular,
    color: rgb(0.1, 0.55, 0.25)
  });

  page.drawLine({
    start: { x: width - 260, y: sigLineY },
    end: { x: width - 80, y: sigLineY },
    thickness: 1,
    color: rgb(0.5, 0.5, 0.5)
  });

  const sigName = 'Sivabarathi M';
  const sigNameWidth = fontBold.widthOfTextAtSize(sigName, 11);
  page.drawText(sigName, {
    x: width - 170 - (sigNameWidth / 2),
    y: sigLineY - 14,
    size: 11,
    font: fontBold,
    color: rgb(0.15, 0.2, 0.35)
  });

  const sigTitle = 'Founder & Director, ASAI InfoTech';
  const sigTitleWidth = fontRegular.widthOfTextAtSize(sigTitle, 8.5);
  page.drawText(sigTitle, {
    x: width - 170 - (sigTitleWidth / 2),
    y: sigLineY - 26,
    size: 8.5,
    font: fontRegular,
    color: rgb(0.4, 0.45, 0.55)
  });

  return await pdfDoc.save();
}

export function downloadPdfBlob(bytes: Uint8Array, filename: string) {
  const blob = new Blob([bytes as any], { type: 'application/pdf' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
