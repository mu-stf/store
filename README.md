ملاحظة عن دمج دفع حقيقي (Stripe مثال): تحتاج إلى إعداد خادم آمن يتعامل مع مفاتيح السرية لإنشاء جلسات Checkout وعودة الويب هوك. أستطيع إضافة مثال لخادم Node.js ودمجه إذا رغبت.

Stripe Example Server (optional)

I added a minimal Stripe Checkout example under `stripe-server/`. This is a reference server only — you must set your Stripe secret key in the environment before running.

To run the Stripe example:

```powershell
cd "c:\Users\mk2uu\OneDrive - AlShaab University\Desktop\edit2\stripe-server"
npm install
$env:STRIPE_SECRET = 'sk_test_your_secret_key'
node server.js
```

The server listens on port `4242` and exposes `POST /create-checkout-session`.

Security note: never commit your Stripe secret key. Use environment variables on your deployment environment.
# ملصقات—هادئ (Stickers Store)

هذه نسخة مبسطة لمتجر ملصقات statically-served. التغييرات الأساسية:

- `index.html` أصبح واجهة المتجر (قائمة الملصقات، عربة محلية).
- `auth.html` صفحة تسجيل الدخول (Supabase auth يُستخدم إن توفر).
- `admin.html` لوحة لإضافة الملصقات (يدعم إدراج بيانات إلى جدول `stickers` عبر Supabase).
- `styles.css` تصميم RTL عصري.
- `app.js` تحميل المنتجات (Supabase fallback لعينة بيانات) وعربة محلية (localStorage).

تشغيل محلي (مطلوب Python أو أي سيرفر ملفات ثابتة):

PowerShell:

```powershell
cd "c:\Users\mk2uu\OneDrive - AlShaab University\Desktop\edit2"
python -m http.server 8000
```

ثم افتح المتصفح على `http://localhost:8000/index.html`.

ملاحظات:
- إذا كنت تستخدم Supabase، ضع ملف `supabase.js` مع تهيئة `supabase` في نفس المجلد، واشتق جدول `stickers` مع الحقول `id`, `title`, `price`, `active`, `image_url`.
- أستطيع تطوير واجهة الدفع، صور الملصقات، أو نظام إدارة كامل إذا رغبت بذلك.

ملاحظات إضافية:

- تم إضافة ملف عينة `supabase.js` في المشروع — استبدل القيم الوهمية (`SUPABASE_URL` و `SUPABASE_ANON_KEY`) بقيم مشروعك.
- اقتراح مخطط جدول `stickers` في Supabase: `id` (uuid/int), `title` (text), `price` (numeric), `active` (boolean), `image_url` (text), `created_at` (timestamp).
- واجهة الإدارة الآن تدعم: إضافة/تعديل/حذف ملصقات. في حال عدم توافر Supabase، يتم حفظ الملصقات محلياً في `localStorage` بالمفتاح `stickers_local`، وتُعرض في واجهة المتجر.

تشغيل محلي (الملخص):

```powershell
cd "c:\Users\mk2uu\OneDrive - AlShaab University\Desktop\edit2"
python -m http.server 8000
# للخلفية (اختياري):
Start-Process python -ArgumentList '-m','http.server','8000'
```

بعد التهيئة، افتح `http://localhost:8000/index.html` لمعاينة المتجر.

المزيد: شملت التعديلات التالية في المشروع:

- رفع صور للملصقات في `admin.html`: يدعم Supabase Storage (عند التهيئة) أو حفظ الصورة محلياً كـ data URL في `stickers_local`.
- صفحة تفاصيل منتج: `product.html?id=<id>` لعرض وشراء منتج واحد.
- تجربة دفع تجريبية: عند الدفع في المتجر تُنشئ الطلب ويتم حفظه في Supabase إن كان مُهيأ وإلا في `local_orders`.

ملاحظة عن دمج دفع حقيقي (Stripe مثال): تحتاج إلى إعداد خادم آمن يتعامل مع مفاتيح السرية لإنشاء جلسات Checkout وعودة الويب هوك. أستطيع إضافة مثال لخادم Node.js ودمجه إذا رغبت.
