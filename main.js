document.addEventListener("DOMContentLoaded", function () {
  // تفعيل السلايدر تلقائيًا
  const carousel = document.querySelector('#featuredEvents');
  if (carousel) {
    new bootstrap.Carousel(carousel, {
      interval: 3000,
      ride: 'carousel'
    });
  }

  /* ====== صفحة الفعاليات (events.html) ====== */
  // فلترة الفعاليات المتقدمة
  const filterCategory = document.getElementById("filter-category");
  const filterLocation = document.getElementById("filter-location");
  const filterDate = document.getElementById("filter-date");
  const cards = document.querySelectorAll(".event-card");

  // دالة فلترة الفعاليات
  function filterEvents() {
    const selectedCategory = filterCategory ? filterCategory.value : "";
    const selectedLocation = filterLocation ? filterLocation.value : "";
    const selectedDate = filterDate ? filterDate.value : "";

    let visibleCount = 0;

    cards.forEach(card => {
      let showCard = true;

      // فلترة حسب التصنيف
      if (selectedCategory && selectedCategory !== "") {
        const cardCategory = card.getAttribute("data-category");
        if (cardCategory !== selectedCategory) {
          showCard = false;
        }
      }

      // فلترة حسب الموقع
      if (selectedLocation && selectedLocation !== "" && showCard) {
        const cardLocation = card.getAttribute("data-location");
        if (cardLocation !== selectedLocation) {
          showCard = false;
        }
      }

      // فلترة حسب التاريخ
      if (selectedDate && selectedDate !== "" && showCard) {
        const cardDate = card.getAttribute("data-date");
        if (cardDate !== selectedDate) {
          showCard = false;
        }
      }

      // إظهار أو إخفاء البطاقة
      if (showCard) {
        card.style.display = "block";
        card.style.animation = "fadeIn 0.5s ease-in-out";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });

    // إظهار رسالة إذا لم توجد نتائج
    showFilterResults(visibleCount);
  }

  // دالة إظهار نتائج الفلترة
  function showFilterResults(count) {
    // إزالة رسالة النتائج السابقة إن وجدت
    const existingMessage = document.getElementById("filter-results-message");
    if (existingMessage) {
      existingMessage.remove();
    }

    // إضافة رسالة النتائج
    if (count === 0) {
      const resultsContainer = document.querySelector(".container.py-5");
      if (resultsContainer) {
        const message = document.createElement("div");
        message.id = "filter-results-message";
        message.className = "alert alert-info text-center mt-4";
        message.innerHTML = `
          <i class="fas fa-info-circle"></i>
          <strong>لم يتم العثور على فعاليات</strong><br>
          جرب تغيير معايير البحث أو <button class="btn btn-link p-0" onclick="document.getElementById('clear-filters').click()">مسح الفلاتر</button>
        `;
        resultsContainer.appendChild(message);
      }
    }
  }

  // إضافة مستمعي الأحداث للحقول
  if (filterCategory) {
    filterCategory.addEventListener("change", filterEvents);
  }
  
  if (filterLocation) {
    filterLocation.addEventListener("change", filterEvents);
  }
  
  if (filterDate) {
    filterDate.addEventListener("change", filterEvents);
  }

  // زر مسح الفلاتر
  const clearFiltersBtn = document.getElementById("clear-filters");
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener("click", () => {
      // مسح جميع الحقول
      if (filterCategory) filterCategory.value = "";
      if (filterLocation) filterLocation.value = "";
      if (filterDate) filterDate.value = "";
      
      // إزالة رسالة النتائج إن وجدت
      const existingMessage = document.getElementById("filter-results-message");
      if (existingMessage) {
        existingMessage.remove();
      }
      
      // إظهار جميع البطاقات
      cards.forEach(card => {
        card.style.display = "block";
        card.style.animation = "fadeIn 0.5s ease-in-out";
      });
    });
  }

  // فلترة الفعاليات القديمة (للتوافق مع الأزرار)
  const filterButtons = document.querySelectorAll(".filter-btn");
  if (filterButtons.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const category = btn.getAttribute("data-category");
        
        // تحديث حقل التصنيف
        if (filterCategory) {
          filterCategory.value = category;
        }

        cards.forEach(card => {
          if (category === "all" || card.classList.contains(category)) {
            card.style.display = "block";
            card.style.animation = "fadeIn 0.5s ease-in-out";
          } else {
            card.style.display = "none";
          }
        });
      });
    });
  }

  // إضافة وظيفة showAlert العامة
  window.showAlert = function(msg) {
    const alertBox = document.getElementById("formAlert");
    if (alertBox) {
      alertBox.innerHTML = `<p>${msg}</p>`;
    }
  };

  // إخفاء شاشة التحميل
  const loadingScreen = document.getElementById("loading-screen");
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.style.display = "none";
    }, 1000);
  }
});

// ========== صفحة تفاصيل الفعالية ==========

// زر "أضف للتقويم"
const addToCalendarBtn = document.getElementById("addToCalendar");
if (addToCalendarBtn) {
  addToCalendarBtn.addEventListener("click", () => {
    alert("تمت إضافة الفعالية إلى التقويم ✅");
  });
}

// زر "شارك"
const shareEventBtn = document.getElementById("shareEvent");
if (shareEventBtn) {
  shareEventBtn.addEventListener("click", () => {
    alert("تم نسخ رابط الفعالية للمشاركة 📋");
  });
}

// contact form validation
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  const alertBox = document.getElementById("formAlert");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      // التحقق من الحقول
      if (name === "" || email === "" || message === "") {
        showAlert("الرجاء ملء جميع الحقول.", "wrong");
        return;
      }

      // التحقق من صيغة البريد
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        showAlert("رجاءً أدخل بريد إلكتروني صحيح", "wrong");
        return;
      }

      // نجاح
      showAlert("تم إرسال رسالتك بنجاح ✅", "success");
      form.reset();
    });

    function showAlert(message, type) {
      alertBox.innerHTML = `
        <div class="alert alert-${type} alert-dismissible fade show" role="alert">
          ${message}
          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="إغلاق"></button>
        </div>`;
    }
  }
});
// 🌍 كود ترجمة بسيط (العربية ↔️ الإنجليزية)
document.addEventListener("DOMContentLoaded", () => {

  // 🧠 القاموس الكامل: كل الكلمات العربية وترجمتها الإنجليزية
  const words = {
    // 🔹 الصفحة الرئيسية index1.html
    "الرئيسية": "Home",
    "دليل فعاليات حمص العديّة؛ جميع الحقوق محفوظة لجامعة الافتراضية السورية":"All Rights Reserved - Homs Events Guide AL-Adiyah 2025 - Syrian Virtual University",
    "الفعاليات": "Events",
    "كل الفعاليات":"All Events",
    "تفاصيل الفعالية": "Event Details",
    "عن الدليل": "About the Guide",
    "أحدث الفعاليات":"The latest Events",
    "اتصل بنا": "Contact Us",
    "استكشف أبرز الفعاليات  في حمص : من مهرجاناتها الثقافية إلى معارضها الفنية، دليلك لتجارب لا تُنسى": "Discover the top events in Homs: from cultural festivals to art exhibitions — your guide to unforgettable experiences",
    "تصفح حسب التصنيف": "Browse by category",
    "وطني": "National",
    "تعليمي": "Educational",
    "ثقافي": "Cultural",
    "اجتماعي": "Social",
    "الفعاليات البارزة هذا الأسبوع": "Featured events this week",
    "الدورة الرابعة من مهرجان التسوق \"أهلاً مدرستي\" في حمص": "4th Edition of “Welcome Back to School” Shopping Festival in Homs",
    "يوم السياحة العالمي": "World Tourism Day",
    "فعاليات للأطفال واليافعين على مسرح قصر الثقافة بحمص في الذكرى الـ 14 للثورة السورية": "Activities for children and youth at the Culture Palace in Homs on the 14th anniversary of the Syrian revolution",
    "فعاليات “حمص تاريخ يُروى وثقافة تُبنى”من قصر الثقافة": "Events: “Homs — A Story to Tell & A Culture to Build” from the Culture Palace",

    // 🔹 صفحة الفعاليات events1.html
    "اختر التصنيف": "Choose Category",
    "تسوق": "Shopping",
    "عن الفعالية":"About Events",
    "سياحي": "Tourism",
    "وطني": "National",
    "ثقافي": "Cultural",
    "اختر الموقع": "Choose Location",
    "مدينة المعارض": "Exhibition City",
    "قلعة الحصن": "Krak des Chevaliers",
    "قصر الثقافة": "Culture Palace",
    "التاريخ : من ١٧ سبتمبر حتى ١ اكتوبر ٢٠٢٥": "Date: From September 17 to October 1, 2025",
    "المكان: مدينة المعارض بحي الوعر غرب حمص": "Location: Exhibition City, Al Waer District, Homs",
    "التصنيف: تسوق": "Category: Shopping",
    "عروض تسويقية تتناسب مع متطلبات المدارس وفعاليات فنية وترفيهية متنوعة لكافة الأعمار": "Promotional offers for school needs, and various cultural and entertainment activities for all ages",
    "التفاصيل": "Details",
    "التاريخ: ٢٧ ايلول ٢٠٢٥": "Date: September 27, 2025",
    "المكان: قلعة الحصن": "Location: Krak des Chevaliers",
    "التصنيف: سياحة": "Category: Tourism",
    "يوم عالمي يحتفي بالسياحة ويتضمن فعاليات فنية وثقافية ومعارض تراثية وعروضًا متنوعة": "A global day celebrating tourism with artistic, cultural, and heritage exhibitions",
    "لمعرفة تفاصيل اكثر يرجى زيارة الموقع الرسمي للفعالية": "For more details, please visit the official event website",
    "التاريخ: ١٤ آذار ٢٠٢٥": "Date: March 14, 2025",
    "المكان:قصر الثقافة -حمص": "Location: Culture Palace - Homs",
    "التصنيف: وطني": "Category: National",
    "معارض وعروض مسرحية بمشاركة أطفال ويافعين ضمن فعاليات رمضانية": "Exhibitions and plays with children and youth as part of Ramadan events",
    "فعاليات “حمص تاريخ يروى وثقافة تُبنى”من قصر الثقافة": "Events: “Homs — A Story to Tell & A Culture to Build” from the Culture Palace",
    "التاريخ: من ١١ اغسطس ٢٠٢٥ حتى ١٦ اغسطس ٢٠٢٥": "Date: From August 11 to 16, 2025",
    "التصنيف: ثقافي": "Category: Cultural",
    "تتضمن عروضًا تراثية وفنية ومعارض حرفية وأمسيات أدبية، تُقام في أجواء احتفالية تُبرز تاريخ المدينة العريق وتنوعها الثقافي": "Includes traditional and artistic shows, craft exhibitions, and literary evenings in a festive atmosphere highlighting the city’s culture",

    // 🔹 صفحة تفاصيل الفعالية event1.html
    "حول الفعالية": "About the Event",
    "تفاصيل":"Details",
    "تواصل معنا عبر:":"Contact with us via:",
    "المكان: حديقة تشرين بدمشق":"Location: Tishreen Park, Damascus",
    "©️ 2025 دليل فعاليات المدينة | جميع الحقوق محفوظة":"© 2025 City Events Guide | All Rights Reserved",
    "© 2025 دليل فعاليات المدينة | جميع الحقوق محفوظة":"© 2025 City Events Guide | All Rights Reserved",
    "مهرجان \"أهلاً مدرستي\" هو فعالية سنوية تهدف لدعم الطلاب وتشجيعهم على بداية عام دراسي جديد بروح مليئة بالحماس والطموح.": "\"Welcome Back to School\" is an annual event aimed at supporting students and encouraging them to start the school year with enthusiasm.",
    "ويتضمن المهرجان إلى جانب العروض التسويقية، فعاليات فنية وترفيهية متنوعة، منها حفل إنشاد ديني لفرقة الإخلاص، وحفل فني يحييه المطرب غزوان مدني، بالإضافة إلى فقرات ترفيهية للأطفال تقدمها فرقة هابي ماجيك.": "The festival includes marketing offers, artistic and entertainment activities such as a religious concert, a performance by Ghazwan Madani, and shows by Happy Magic group.",
    "ويأتي المهرجان في وقت تتزايد فيه متطلبات الأسر مع اقتراب العام الدراسي الجديد، ما يجعله فرصة لتأمين المستلزمات المدرسية والمواد الأساسية بأسعار تنافسية.": "The festival comes as family needs increase before the new school year, making it an opportunity to buy supplies at good prices.",
    "تشمل القرطاسية والملابس المدرسية والمواد الغذائية والمنظفات، مع حسومات تصل إلى 50 بالمئة، بما يسهم في تخفيف الأعباء عن الأسر.": "It includes stationery, uniforms, food, and detergents, with discounts up to 50% to reduce family expenses.",
    "شارك": "Share",

 "مهرجان اهلا مدرستي هو فعالية سنوية تهدف لدعم الطلاب وتشجيعهم على بداية عام دراسي جديد بروح مليئة بالحماس والطموح. ويتضمن المهرجان إلى جانب العروض التسويقية، فعاليات فنية وترفيهية متنوعة، منها حفل إنشاد ديني لفرقة الإخلاص، وحفل فني يحييه المطرب غزوان مدني، بالإضافة إلى فقرات ترفيهية للأطفال تقدمها فرقة هابي ماجيك."
 :
   "The Welcome back to school festival is annual event aimed at supporting students and envourging them to behin the new academic year with enthuiasm and ambition in additional to promotional exhibitions the festival includes various artistic and entertainment activities",
   
    "فيسبوك | تويتر":"Facebook/Twitter",
    "التاريخ: 5 - 18 نيسان 2025":"Date:5-18 April 2025",
  
    "أضف التقويم": "Add to Calendar",
    "أضف للتقويم": "Add to Calendar",
    "دليل فعاليات حمص العديّة": "Homs Events Guide – Al-Adiyah",
    "فعاليات ذات صلة": "Related Events",
    "ماراثون دمشق ٢٠٢٥": "Damascus Marathon 2025",
    "التاريخ:٧ تشرين الثاني ٢٠٢٥": "Date: November 7, 2025",
    "المكان:المزة، دمشق": "Location: Mezzeh, Damascus",
    "الموقع الرسمي": "Official Website",
    "جارٍ التحميل...": "Loading...",
    "شعار الموقع": "Website Logo",
    "معرض الزهور الدولي": "International Flower Exhibition",
    "التاريخ: نيسان ١٥-٨-٢٠٢٥": "Date: April 8–15, 2025",
    "المكان: حديقة تشرين بدمشق": "Location: Tishreen Park, Damascus",

    // 🔹 صفحة عن الدليل about1.html
 "🎯 هدفنا": "Our Goal",
    "🌟 رؤيتنا": "Our Vision",
   "💌 رسالتنا": "Our Message",
   "نبذة عن الدليل":"About the Guide",
   "فريق العمل / الشركاء":"Mates/Work team",
  "سياسات ومعايير نشر الفعاليات":"Policies and Standeres for Publishing Events","معايير القبول: نفضل الفعاليات التي تلتزم بالقوانين المحلية، وتراعي السلامة العامة، وتملك منظّمًا واضحًا.": 
"Acceptance Criteria: We prefer events that comply with local laws, ensure public safety, and have a clearly identified organizer.",

"محتوى النشر: نحتفظ بالحق في تعديل العناوين والوصف لتحسين الوضوح، ولا ننشر محتوى مسيء أو غير قانوني.": 
"Publication Policy: We reserve the right to edit titles and descriptions to improve clarity, and we do not publish offensive or illegal content.",


  "معايير القبول: نفضل الفعاليات التي تلتزم بالقوانين المحلية، وتراعي السلامة العامة، وتملك منظّمًا واضحًا.": 
"Acceptance Criteria: We prefer events that comply with local laws, ensure public safety, and have a clearly identified organizer.",

"محتوى النشر: نحتفظ بالحق في تعديل العناوين والوصف لتحسين الوضوح، ولا ننشر محتوى مسيء أو غير قانوني.": 
"Publication Policy: We reserve the right to edit titles and descriptions to improve clarity, and we do not publish offensive or illegal content.",

"كيفية الإرسال: لإرسال فعالية جديدة، يرجى التواصل عبر صفحة تواصل معنا وإرسال التفاصيل الأساسية (الاسم، التاريخ، المكان، وصف قصير، جهة الاتصال).": 
"Submission Method: To submit a new event, please contact us through the 'Contact Us' page and send the basic details (name, date, location, short description, and contact information).",

"نطلب صورة واضحة للفعالية.": 
"We request a clear image of the event.",

"توضيح إن كانت الفعالية مجانية أو بتذاكر.": 
"Please specify whether the event is free or ticketed.",

"نحتفظ بحق رفض النشر بدون إبداء أسباب في حالات نادرة.": 
"We reserve the right to decline publication without providing a reason in rare cases.",
"دليل فعاليات حمص العديّة | جميع الحقوق محفوظة":"Homs Events Guide | All Rights Reserved",


   "معايير القبول: نفضل الفعاليات التي تلتزم بالقوانين المحلية، وتراعي السلامة العامة، وتملك منظّمًا واضحًا.": 
"Acceptance Criteria: We prefer events that comply with local laws, ensure public safety, and have a clearly identified organizer.",

"محتوى النشر: نحتفظ بالحق في تعديل العناوين والوصف لتحسين الوضوح، ولا ننشر محتوى مسيء أو غير قانوني.": 
"Publication Policy: We reserve the right to edit titles and descriptions to improve clarity, and we do not publish offensive or illegal content.",

"كيفية الإرسال: لإرسال فعالية جديدة، يرجى التواصل عبر صفحة تواصل معنا وإرسال التفاصيل الأساسية (الاسم، التاريخ، المكان، وصف قصير، جهة الاتصال).": 
"Submission Method: To submit a new event, please contact us via the 'Contact Us' page and send the basic details (name, date, location, short description, contact information).",
    "هدفنا توفير مرجع شامل ودقيق لكل الفعاليات والنشاطات التي تُقام في المحافظة، ليكون دليلاً موثوقاً للمواطنين والزوار على حد سواء.": "Our goal is to provide a complete, accurate guide for all events and activities in the governorate.",
    "رؤيتنا أن يصبح هذا الدليل منصة رائدة تساهم في تعزيز المشاركة المجتمعية، وتسليط الضوء على المبادرات الثقافية والاجتماعية والفنية.": "Our vision is to make this guide a leading platform that enhances community participation and promotes cultural and artistic initiatives.",
    "رسالتنا تقديم محتوى موثوق ومحدث باستمرار، يسهل الوصول إليه، ويعزز من التواصل بين جميع الأطراف المهتمة بالفعاليات داخل المحافظة.": "Our mission is to provide reliable, updated content that is easy to access and enhances communication among all event participants.",
    "فريق العمل/ الشركاء": "Team / Partners",
    "حمزة المصطفى": "Hamza Al-Mustafa",
    "مؤسس المنصة ومدير المحتوى": "Platform Founder and Content Manager",
    "فاطمة الاسعد": "Fatema Al-Asaad",
    "تهتم بالهوية البصرية وتجربة المستخدم": "Responsible for visual identity and user experience",
    "نغم جاموس": "Nagham Jamous",
    "مؤسس المشروع ومدير المحتوى":"Platform Founder and content Manger",
    "مصممة واجهة المستخدم": "User Interface Designer",
    "مهند الاحمد": "Mohannad Al-Ahmad",
    "مسؤول عن التواصل مع الشركاء وإدارة المحتوى": "Responsible for partner communication and content management",
    "سياسيات ومعايير نشر الفعاليات": "Policies and Criteria for Publishing Events",
    "معايير القبول:نفضل الفعاليات التي تلتزم بالقوانين المحلية، وتراعي السلامة العامة، وتملك منظّمًا واضحًا.": "Acceptance criteria: Events must comply with laws, ensure safety, and have clear organizers.",
    "محتوى النشر: نحتفظ بالحق في تعديل العناوين والوصف لتحسين الوضوح، ولا ننشر محتوى مسيء أو غير قانوني.": "Publishing content: We may edit titles or descriptions for clarity; we don’t publish offensive or illegal content.",
    "كيفية الإرسال: لإرسال فعالية جديدة، يرجى التواصل عبر صفحة اتصل بنا وإرسال التفاصيل الأساسية (الاسم، التاريخ، المكان، وصف قصير، جهة الاتصال).": "How to submit: Contact us and send the event name, date, location, description, and contact info.",

    // 🔹 صفحة اتصل بنا contact1.html
   "©️ 2025 جميع الحقوق محفوظة - دليل فعاليات حمص العدية":"All Rights Reserved-Homs Events Guide AL-Aihyah 2025",
    "📬 تواصل معنا":"Contact us",
    "البريد العام: ":"General Email",
    "© 2025 جميع الحقوق محفوظة - دليل فعاليات حمص العدية ":"All Rights Reserved-Homs Events Guide AL-Aihyah 2025",
    "📌 معلومات التواصل":"Contact information",
    "تواصل معنا: hamzaalmostafa.com":"Contact us :hamzaalmostafa.com",
    "نسعد بتلقي استفساراتكم واقتراحاتكم عبر النموذج أدناه أو من خلال وسائل التواصل المتاحة.": "We are happy to receive your questions and suggestions via the form below or contact methods.",
    "الاسم الكامل": "Full Name",
    "البريد الالكتروني": "Email",
    "الرسالة": "Message",
    "البريد العام: ":"General Email",
   "البريد الإلكتروني" :"Email",
    "معلومات التواصل": "Contact Information",
    "البريد العام": "General Email",
    "© 2025 جميع الحقوق محفوظة - دليل فعاليات حمص العدية":"All Rights Reserved-Homs Events Guide AL-Aihyah 2025",
    "الهاتف": "Phone"
  
  };

  //

 

  // 🔄 عكس القاموس للعودة إلى العربية
  const reversed = {};
  for (let key in words) reversed[words[key]] = key;

  // 🔁 دالة تبديل اللغة
  function switchLang(lang) {
    const all = document.querySelectorAll("*");
    document.dir = (lang === "ar") ? "rtl" : "ltr";
    updatePageDirection(lang);

    function updatePageDirection(lang) {
      const body = document.body;
      const navbar = document.querySelector('.navbar');
      const navItems = document.querySelectorAll('.navbar-nav');

      if (lang === "ar") {
        body.setAttribute("dir", "rtl");
        body.style.textAlign = "right";
        navbar?.classList.add("rtl-navbar");
        navbar?.classList.remove("ltr-navbar");
        navItems.forEach(item => {
          item.classList.add("justify-content-end");
          item.classList.remove("justify-content-start");
        });
      } else {
        body.setAttribute("dir", "ltr");
        body.style.textAlign = "left";
        navbar?.classList.add("ltr-navbar");
        navbar?.classList.remove("rtl-navbar");
        navItems.forEach(item => {
          item.classList.add("justify-content-start");
          item.classList.remove("justify-content-end");
        });
      }
    }

    all.forEach(el => {
      if (el.children.length === 0 && el.textContent.trim() !== "") {
        const txt = el.textContent.trim();
        if (lang === "en" && words[txt]) el.textContent = words[txt];
        if (lang === "ar" && reversed[txt]) el.textContent = reversed[txt];
      }
    });

    localStorage.setItem("siteLang", lang);
  }

  //  تحميل اللغة المحفوظة
  const saved = localStorage.getItem("siteLang") || "ar";
  switchLang(saved);

  //  الأعلام
  const arFlag = document.getElementById("flag-ar");
  const enFlag = document.getElementById("flag-en");

  if (arFlag) arFlag.addEventListener("click", () => switchLang("ar"));
  if (enFlag) enFlag.addEventListener("click", () => switchLang("en"));
});
// دوال تحسين تبديل الألوان مع تأثيرات سلسة
function Colorblack(){
    const body = document.getElementById("body");
    const k = document.getElementById("k");
    const lightBtn = document.querySelector("#color .w");
    const darkBtn = document.querySelector("#color .b");
    
    // تأثير انتقال سلس
    body.style.transition = "all 0.5s ease-in-out";
    if (k) k.style.transition = "all 0.5s ease-in-out";
    
    // تطبيق الوضع المظلم
    body.style.backgroundColor = "#1a1a1a";
    body.style.color = "#ffffff";
    
    if (k) {
        k.style.backgroundColor = "#2d2d2d";
        k.style.color = "#ffffff";
    }
    
    // تحديث حالة الأزرار
    if (lightBtn) lightBtn.classList.remove("active");
    if (darkBtn) darkBtn.classList.add("active");
    
    // حفظ التفضيل
    localStorage.setItem("theme", "dark");
    
    // تأثير بصري إضافي
    body.style.transform = "scale(1.01)";
    setTimeout(() => {
        body.style.transform = "scale(1)";
    }, 200);
}

function Colorwiht(){
    const body = document.getElementById("body");
    const k = document.getElementById("k");
    const lightBtn = document.querySelector("#color .w");
    const darkBtn = document.querySelector("#color .b");
    
    // تأثير انتقال سلس
    body.style.transition = "all 0.5s ease-in-out";
    if (k) k.style.transition = "all 0.5s ease-in-out";
    
    // تطبيق الوضع الفاتح
    body.style.backgroundColor = "#F9F6F2";
    body.style.color = "#0E7A81";
    
    if (k) {
        k.style.backgroundColor = "#ffffff";
        k.style.color = "#0E7A81";
    }
    
    // تحديث حالة الأزرار
    if (lightBtn) lightBtn.classList.add("active");
    if (darkBtn) darkBtn.classList.remove("active");
    
    // حفظ التفضيل
    localStorage.setItem("theme", "light");
    
    // تأثير بصري إضافي
    body.style.transform = "scale(1.01)";
    setTimeout(() => {
        body.style.transform = "scale(1)";
    }, 200);
}

// تحميل التفضيل المحفوظ عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", function() {
    const savedTheme = localStorage.getItem("theme");
    const lightBtn = document.querySelector("#color .w");
    const darkBtn = document.querySelector("#color .b");
    
    if (savedTheme === "dark") {
        Colorblack();
    } else {
        Colorwiht();
    }
    
    // إضافة تأثيرات إضافية للأزرار
    if (lightBtn && darkBtn) {
        // تأثيرات الماوس
        lightBtn.addEventListener("mouseenter", function() {
            this.style.animation = "pulse 0.6s ease-in-out";
        });
        
        darkBtn.addEventListener("mouseenter", function() {
            this.style.animation = "pulse 0.6s ease-in-out";
        });
        
        lightBtn.addEventListener("animationend", function() {
            this.style.animation = "";
        });
        
        darkBtn.addEventListener("animationend", function() {
            this.style.animation = "";
        });
        
        // دعم التنقل بلوحة المفاتيح
        lightBtn.addEventListener("keydown", function(e) {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                Colorwiht();
            }
        });
        
        darkBtn.addEventListener("keydown", function(e) {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                Colorblack();
            }
        });
        
        // دعم التنقل بين الأزرار
        lightBtn.addEventListener("keydown", function(e) {
            if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
                e.preventDefault();
                darkBtn.focus();
            }
        });
        
        darkBtn.addEventListener("keydown", function(e) {
            if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
                e.preventDefault();
                lightBtn.focus();
            }
        });
    }
});

// إضافة أنيميشن النبض
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// دوال التبديل بين RTL و LTR
function switchToRTL() {
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.setAttribute('lang', 'ar');
    localStorage.setItem('direction', 'rtl');
    updateDirectionStyles();
}

function switchToLTR() {
    document.documentElement.setAttribute('dir', 'ltr');
    document.documentElement.setAttribute('lang', 'en');
    localStorage.setItem('direction', 'ltr');
    updateDirectionStyles();
}

function updateDirectionStyles() {
    const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
    const navbar = document.querySelector('.navbar-nav');
    const colorDiv = document.querySelector('#color');
    const langSwitch = document.querySelector('.lang-switch');
    
    if (navbar) {
        if (isRTL) {
            navbar.style.marginRight = 'auto';
            navbar.style.marginLeft = '0';
        } else {
            navbar.style.marginLeft = 'auto';
            navbar.style.marginRight = '0';
        }
    }
    
    if (colorDiv) {
        if (isRTL) {
            colorDiv.style.marginRight = '30px';
            colorDiv.style.marginLeft = '0';
        } else {
            colorDiv.style.marginLeft = '30px';
            colorDiv.style.marginRight = '0';
        }
    }
    
    if (langSwitch) {
        if (isRTL) {
            langSwitch.style.marginLeft = '0';
            langSwitch.style.marginRight = 'auto';
        } else {
            langSwitch.style.marginRight = '0';
            langSwitch.style.marginLeft = 'auto';
        }
    }
}

// إضافة مستمعي الأحداث لأزرار اللغة عند تحميل الصفحة
document.addEventListener("DOMContentLoaded", function() {
    // إضافة مستمعي الأحداث لأزرار اللغة
    const flagAr = document.getElementById('flag-ar');
    const flagEn = document.getElementById('flag-en');
    
    if (flagAr) {
        flagAr.addEventListener('click', switchToRTL);
        flagAr.style.cursor = 'pointer';
    }
    
    if (flagEn) {
        flagEn.addEventListener('click', switchToLTR);
        flagEn.style.cursor = 'pointer';
    }
    
    // تحميل اتجاه النص المحفوظ
    const savedDirection = localStorage.getItem("direction");
    if (savedDirection === 'ltr') {
        switchToLTR();
    } else {
        switchToRTL();
    }
});

// ========================================
// نموذج اتصل بنا - التحقق من صحة البيانات
// ========================================
document.addEventListener("DOMContentLoaded", function() {
  const contactForm = document.getElementById("contactForm");
  
  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();
      
      // الحصول على القيم
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();
      const formAlert = document.getElementById("formAlert");
      
      // مسح أي رسائل سابقة
      formAlert.innerHTML = "";
      
      // التحقق من صحة البيانات
      let isValid = true;
      let errors = [];
      
      // التحقق من الاسم
      if (name === "") {
        errors.push("يرجى إدخال الاسم الكامل");
        isValid = false;
      } else if (name.length < 3) {
        errors.push("الاسم يجب أن يكون 3 أحرف على الأقل");
        isValid = false;
      }
      
      // التحقق من البريد الإلكتروني
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email === "") {
        errors.push("يرجى إدخال البريد الإلكتروني");
        isValid = false;
      } else if (!emailRegex.test(email)) {
        errors.push("يرجى إدخال بريد إلكتروني صحيح");
        isValid = false;
      }
      
      // التحقق من الرسالة
      if (message === "") {
        errors.push("يرجى إدخال الرسالة");
        isValid = false;
      } else if (message.length < 10) {
        errors.push("الرسالة يجب أن تكون 10 أحرف على الأقل");
        isValid = false;
      }
      
      // عرض النتيجة
      if (!isValid) {
        // عرض رسالة خطأ
        let errorHtml = '<div class="alert alert-danger alert-dismissible fade show" role="alert">';
        errorHtml += '<i class="fas fa-exclamation-triangle me-2"></i>';
        errorHtml += '<strong>خطأ!</strong> يرجى تصحيح الأخطاء التالية:<ul class="mb-0 mt-2">';
        errors.forEach(error => {
          errorHtml += `<li>${error}</li>`;
        });
        errorHtml += '</ul>';
        errorHtml += '<button type="button" class="btn-close" data-bs-dismiss="alert"></button>';
        errorHtml += '</div>';
        formAlert.innerHTML = errorHtml;
        
        // التمرير إلى الأعلى
        formAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
      } else {
        // عرض رسالة نجاح
        formAlert.innerHTML = `
          <div class="alert alert-success alert-dismissible fade show" role="alert">
            <i class="fas fa-check-circle me-2"></i>
            <strong>تم الإرسال بنجاح!</strong> شكراً لتواصلك معنا ${name}. سنرد عليك قريباً على ${email}.
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
          </div>
        `;
        
        // إعادة تعيين النموذج
        contactForm.reset();
        
        // التمرير إلى الأعلى
        formAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // إخفاء الرسالة بعد 5 ثواني
        setTimeout(() => {
          const alert = formAlert.querySelector('.alert');
          if (alert) {
            alert.classList.remove('show');
            setTimeout(() => {
              formAlert.innerHTML = "";
            }, 150);
          }
        }, 5000);
      }
    });
    
    // إضافة تأثيرات بصرية للحقول
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
      });
      
      input.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
      });
      
      input.addEventListener('input', function() {
        if (this.value.trim() !== '') {
          this.classList.add('has-content');
        } else {
          this.classList.remove('has-content');
        }
      });
    });
  }
});
  
