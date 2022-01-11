export default async (req, res) => {
  const SECRET_KEY = process.env.RECAPTCHA_SECRETKEY;
  const { recaptcha_token } = req.body;
  const verifyUrl = `https://www.recaptcha.net/recaptcha/api/siteverify?secret=${SECRET_KEY}&response=${recaptcha_token}`;
  try {
    const recaptchaRes = await fetch(verifyUrl, { method: "POST" });
    const recaptchaJson = await recaptchaRes.json();
    console.log('success: ' + JSON.stringify(recaptchaJson));
    res.status(200).json({ recaptchaJson });
  } catch (e) {
    res.status(400).json(e.error);
  }
}