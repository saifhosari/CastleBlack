import nodemailer from "nodemailer";
import { google } from "googleapis";

const { OAuth2 } = google.auth;
const oauth_link = "https://developers.google.com/oauthplayground";

const { EMAIL, MAILING_ID, MAILING_REFRESH, MAILING_SECRET } = process.env;

const auth = new OAuth2(
  MAILING_ID,
  MAILING_SECRET, // gotta pass the secret before the refresh!
  MAILING_REFRESH,
  oauth_link
);

const sendVerificationEmail = (email, name, url) => {
  auth.setCredentials({
    refresh_token: MAILING_REFRESH,
  });
  const accessToken = auth.getAccessToken();
  const stmp = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL,
      clientId: MAILING_ID,
      clientSecret: MAILING_SECRET,
      refreshToken: MAILING_REFRESH,
      accessToken,
    },
  });
  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: "CastleBlack email verification",
    html: `<div style="max-width:700px;margin-bottom:1rem;display:flex;align-items:center;gap:10px;font-family:Roboto;font-weight:600;color:#71550e"><img style="width:70px" src="https://images.vexels.com/media/users/3/153585/isolated/preview/a95b54b6bad54395d32af83076c9cfdb-chilling-halloween-house.png" alt=""><span>Action Required: Activate your CastleBlack Account</span></div><div style="padding:1rem 0;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;color:#392205;font-size:17px;font-family:Roboto"><span>Hello ${name}</span><div style="padding:20px 0"><span style="padding:1.5rem 0">You recently created an account on CastleBlack. To complete your registration, please confirm your account.</span></div><a href=${url} style="width:200px;padding:10px 15px;background-color:#322605;border-radius:20px;color:#fff;text-decoration:none;font-weight:600">Confirm your account</a><br><div style="padding-top:20px"><span style="margin:1.5rem 0;color:#9c9a89">CastleBlack allows you to stay in touch with your friends, once you are registered on CastleBlack, you can share photos, organize events and much more.</span></div></div>`,
  };
  stmp.sendMail(mailOptions, (err, res) => {
    if (err) return err;
    return res;
  });
};

const sendResetCode = (email, name, code) => {
  auth.setCredentials({
    refresh_token: MAILING_REFRESH,
  });
  const accessToken = auth.getAccessToken();
  const stmp = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: EMAIL,
      clientId: MAILING_ID,
      clientSecret: MAILING_SECRET,
      refreshToken: MAILING_REFRESH,
      accessToken,
    },
  });
  const mailOptions = {
    from: EMAIL,
    to: email,
    subject: "Reset CastleBlack Password",
    html: `<div style="max-width:700px;margin-bottom:1rem;display:flex;align-items:center;gap:10px;font-family:Roboto;font-weight:600;color:#71550e"><img style="width:70px" src="https://images.vexels.com/media/users/3/153585/isolated/preview/a95b54b6bad54395d32af83076c9cfdb-chilling-halloween-house.png" alt=""><span>Action Required: Activate your CastleBlack Account</span></div><div style="padding:1rem 0;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;color:#392205;font-size:17px;font-family:Roboto"><span>Hello ${name}</span><div style="padding:20px 0"><span style="padding:1.5rem 0">You recently created an account on CastleBlack. To complete your registration, please confirm your account.</span></div><a style="width:200px;padding:10px 15px;background-color:#322605;border-radius:20px;color:#fff;text-decoration:none;font-weight:600">${code} </a><br><div style="padding-top:20px"><span style="margin:1.5rem 0;color:#9c9a89">CastleBlack allows you to stay in touch with your friends, once you are registered on CastleBlack, you can share photos, organize events and much more.</span></div></div>`,
  };
  stmp.sendMail(mailOptions, (err, res) => {
    if (err) return err;
    return res;
  });
};

export { sendVerificationEmail, sendResetCode };
