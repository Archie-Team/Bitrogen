const learnSchema = require('../../../models/learn')
module.exports = (req, res) => {
    const moneyManagmentText = `قبل از مدیریت سرمایه برای سود کردن در کانال سیگنال باید به چند نکته توجه کنید :همه ی سیگنال ها را معامله کنید .ممکن است سیگنالی که برای معامله انتخاب نکرده اید به بیشترین سوددهی برسد و بازدهی کامل سیگنال هارا از دست بدهید.2. همه ی سیگنال ها با حجم ثابت معامله شود. برای راحتی هر چه بیشتر شما عزیزان، ریسک سیگنال ها به گونه ای طراحی شده است که حجم ثابت برای هر سیگنال بیشترین سود را داشته باشد. 
    3. برای تمام سیگنال ها همان حد ضرر توصیه شده را قرار دهید و هیچ سیگنالی را بدون حد ضرر رها نکنید. در غیراین صورت این برنامه معنایی نخواهد داشت و احتمال از دست رفتن سرمایه شما بسیار بالا میرود. پیشنهاد بیتروژن برای مدیریت سرمایه : 1. ریسک کم :  حجم هر معامله: کل سرمایه حساب معاملاتی تقسیم بر 10
    مثال: با فرض اینکه حساب معاملاتی شما $1000 باشد: حجم هر معامله = 1000 دلار تقسیم بر 10 برابر با 100 دلار

    به این معنی که شما باید هر سیگنال را با$100 معامله کنید. 
    تمام سیگنال های بیتروژن به گونه ای طراحی شده اند که حدضرر آنها کمتر از 10 درصد باشد. بنابراین با فرض اینکه تارگت و استاپ لاسسیگنال هر دو 10 درصد باشند در صورت سودده بودن سیگنال به میزان 1 درصد از کل سرمایه حساب خود سود می کنید و درصورت ضررده بودن نیز به همین صورت 1 درصد از کل سرمایه خود را ضرر می کنید. بدیهی است در این حالت قادر خواهید بود 10 معامله جاری در حساب خود داشته باشید. 
    این برنامه مناسب افرادی است که حجم پول بسیار بالایی در حساب بایننس خود دارند و علاقه ای به ریسک زیاد روی این پول ندارند.  
2. ریسک متوسط : 
    حجم هر معامله: کل سرمایه حساب معاملای تقسیم بر 7.5

    مثال: با فرضینکه حساب معاملاتی شما $1000 باشد: 
حجم هر معامله = 1000 دلار تقسیم بر 7.5 برابر با 133 دلار
    به این معنی که شما باید هر سیگنال را با $133 معامله کنید.
    
    بنابراین با فرض اینکه تارگت و استاپ لاس سیگنال هر دو 10 درصد باشند در صورت سودده بودن سیگنال به میزان 1.3 درصد از کل سرمایه حساب خود سود می کنید و درصورت ضررده بودن نیز به همین صورت 1.3 درصد از کل سرمایه خود را ضرر می کنید. بدیهی است در این حالت قادر خواهید بود 7 معامله جاری در حساب خود داشته باشید. 
    
    3. ریسک بالا : 
    حجم هر معامله: کل سرمایه حساب معاملاتی تقسیم بر 5

مثال: با فرض اینکه حساب معاملاتی شما $1000 باشد: حجم هر معامله = 1000 دلار تقسیم بر 10 برابر با 200 دلار
    به این معنی که ما باید هر سیگنال را با $200 معامله کنید.
    
بنابراین با فرض اینکه تارگت و استاپ لاس سیگنال هر دو 10 درصد باشند در صورت سودده بودن سیگنال به میزان 2 درصد از کل سرمایه حساب خود سود می کنید و درصورت ضررده بودن نیز به همین صورت 2 درصد از کل سرمایه خود را ضرر می کنید. بدیهی است در این حالت قادر خواهید بود 5 معامله جاری در حساب خود داشته باشید. 
    این برنامه مناسب افرادی است که حجم پول کمتری در ساب خود دارند و یا علاقه دارند بر روی سرمایه خود ریسک بیشتری متحمل شوند. 
    استراتژی خروج از معاملات:
    برای سیگنال های سه ستاره 50% از حجم معامله خود را در تارگت اول خالی کرده و 50% باقی مانده را در تارگت دوم بفروشید. 
برای سیگنال های  دو ستاره 75% از حجم معامله خود را در تارگت اول خالی کرده و 20% باقی مانده را در تارگت دوم بفروشید.
    برای سیگنال تک ستاره تنها یک تارگت در نظر گرفته شده است بنابراین تمام حجم معامله را در همان تارگت بفروشید.  
    `
    if (req.paied == false) {
        return res.json({ message: 'شما اشتراک ندارید', status: 0 })
    } else {
        return res.json({ message: moneyManagmentText, status: 1 })
    }
}