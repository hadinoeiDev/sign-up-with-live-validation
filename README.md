
# Registration form with live validation and working with Fetch + Firebase

This project is a simple, clean signup form built with HTML, CSS, and Vanilla JavaScript. It features live validation that gives instant feedback while typing, ensuring form submission only happens when all inputs are valid.  
Additionally, it integrates Fetch API for sending and receiving data to/from Firebase.

## Features
- Live email and password validation  
- Password confirmation check  
- Clear and updated error messages  
- Responsive and minimal UI  
- Fetch API integration with Firebase

## Tech Stack
- HTML5  
- CSS3  
- Vanilla JavaScript  
- Firebase (Realtime Database or Firestore)

## How to run
Simply open the `index.html` file in your browser and try the form.  
Feel free to extend or customize it.

---

## Fetch and Firebase Integration

This project supports sending and receiving data via Fetch API with Firebase backend.  
- When a user signs up, the form data is POSTed to Firebase.  
- On a separate page, a list of registered users is fetched (GET) from Firebase and displayed.  
- This makes the project more interactive and stores data online.

### Notes  
- You need to create a Firebase project and use its API URL in the fetch requests.  
- It's built with plain Vanilla JS, no extra libraries needed.  
- You can extend it to add features like deleting or editing users.

---

# فرم ثبت‌نام با اعتبارسنجی زنده و کار با Fetch + Firebase

این پروژه یک فرم ثبت‌نام ساده و تمیزه که با HTML, CSS و JavaScript ساخته شده.  
ویژگی اصلیش اعتبارسنجی زنده ورودی‌هاست که باعث میشه کاربر همزمان با تایپ، خطاها رو ببینه و فرم فقط وقتی ارسال بشه که همه فیلدها درست پر شده باشن.  
علاوه بر این، پروژه قابلیت ارسال داده‌ها با Fetch API به Firebase و دریافت لیست کاربران ثبت‌نام شده رو هم داره.

## امکانات
- اعتبارسنجی زنده ایمیل و پسورد  
- بررسی پسورد تکراری  
- پیام‌های خطای واضح و به‌روز  
- رابط کاربری واکنش‌گرا و ساده  
- ارسال و دریافت داده‌ها با Fetch API به Firebase

## تکنولوژی‌ها
- HTML5  
- CSS3  
- JavaScript (Vanilla)  
- Firebase (Realtime Database یا Firestore)

## نحوه اجرا
کافیه فایل `index.html` رو باز کنی و فرم رو تست کنی.  
می‌تونی کدها رو توسعه بدی و ویژگی‌های جدید اضافه کنی.

---

## کار با Fetch و Firebase

در این پروژه، قابلیت ارسال و دریافت داده‌ها با استفاده از Fetch API به Firebase اضافه شده است.  
- وقتی کاربر فرم ثبت‌نام را پر می‌کند، داده‌ها با متد POST به Firebase ارسال می‌شوند.  
- در صفحهٔ جداگانه‌ای، لیست کاربران ثبت‌نام شده با متد GET از Firebase خوانده شده و نمایش داده می‌شود.  
- این کار باعث می‌شود که اطلاعات به صورت آنلاین ذخیره و نمایش داده شود و پروژه واقعی‌تر و حرفه‌ای‌تر بشود.

### نکته‌ها  
- نیاز داری یک پروژه در Firebase بسازی و URL مربوط به API را در کدهای fetch قرار بدی.  
- روش کار کاملاً Vanilla JS هست و بدون نیاز به کتابخانه‌های اضافی.  
- می‌تونی توسعه بدی و ویژگی‌های بیشتر مثل حذف، ویرایش کاربر هم اضافه کنی.
