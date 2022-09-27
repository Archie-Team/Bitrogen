const JDate = require('jalali-date');
module.exports = (req, res) => {
    const jdate = new JDate;
    const today = jdate.format('dddd DD MMMM YYYY')
    return res.json({
        message: 'نسخه جدید را از گوگل پلی و سیب اپ نصب کنید',
        message2: today,
        status: 0
    })
}