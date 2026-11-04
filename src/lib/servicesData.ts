export interface ServiceDetailData {
  slug: string;
  titleAr: string;
  titleEn: string;
  seoTitleAr: string;
  seoTitleEn: string;
  seoDescAr: string;
  seoDescEn: string;
  badgeAr: string;
  badgeEn: string;
  h1Ar: string;
  h1En: string;
  subheadlineAr: string;
  subheadlineEn: string;
  stats: { value: string; labelAr: string; labelEn: string }[];
  pillars: {
    titleAr: string;
    titleEn: string;
    descAr: string;
    descEn: string;
    icon: string;
  }[];
  deliverablesAr: string[];
  deliverablesEn: string[];
  technologies: string[];
  caseStudyHighlight?: {
    appNameAr: string;
    appNameEn: string;
    descAr: string;
    descEn: string;
    metricAr: string;
    metricEn: string;
    link: string;
  };
  faqs: {
    qAr: string;
    qEn: string;
    aAr: string;
    aEn: string;
  }[];
}

export const servicesData: Record<string, ServiceDetailData> = {
  "mobile-app-development": {
    slug: "mobile-app-development",
    titleAr: "تطوير تطبيقات الجوال (iOS & Android)",
    titleEn: "Mobile App Development Services",
    seoTitleAr: "شركة تصميم وتطوير تطبيقات الجوال (iOS & Android) | كيمفو ستوديو",
    seoTitleEn: "Mobile App Development Company (iOS & Android) | Kemvo Studio",
    seoDescAr:
      "شركة برمجة وتطوير تطبيقات جوال متخصصة لـ iOS و Android. نبني تطبيقات فائقة السرعة والأمان بنظام Apple HIG وتكامل كامل مع الخوادم والمتاجر لرواد الأعمال والشركات.",
    seoDescEn:
      "Leading mobile app development company engineering high-performance native and cross-platform mobile applications for iOS and Android. Build fast, scalable apps with Kemvo Studio.",
    badgeAr: "📱 هندسة تطبيقات الهواتف الذكية",
    badgeEn: "📱 Enterprise Mobile Engineering",
    h1Ar: "شركة تصميم وتطوير تطبيقات الجوال الرائدة (iOS & Android)",
    h1En: "Premier Mobile App Development Company (iOS & Android)",
    subheadlineAr:
      "نبتكر تطبيقات جوال استثنائية تمزج بين دقة واجهات Apple وسلاسة 60-120 FPS وبنية تحتية سحابية مقاومة للانهيارات لدعم نمو أعمالك وملايين المستخدمين في الشرق الأوسط والعالم.",
    subheadlineEn:
      "We engineer market-leading mobile applications merging Apple HIG craftsmanship, fluid 60-120 FPS performance, and fault-tolerant cloud backends built to scale for millions.",
    stats: [
      { value: "60-120 FPS", labelAr: "سلاسة الأداء التام", labelEn: "Fluid Performance" },
      { value: "100%", labelAr: "اعتماد متجري Google و Apple", labelEn: "Store Approval Guarantee" },
      { value: "99.9%", labelAr: "استقرار الخوادم والـ API", labelEn: "API & Backend Uptime" },
    ],
    pillars: [
      {
        titleAr: "معمارية برمجية نقية (Clean Architecture)",
        titleEn: "Clean Architecture & Modular Code",
        descAr: "كود برمجي معياري منظم يسهل صيانته وإضافة ميزات جديدة مستقبلاً دون إعادة بناء التطبيق من الصفر.",
        descEn: "Scalable modular codebase engineered for effortless maintenance, continuous updates, and zero tech debt.",
        icon: "Layers",
      },
      {
        titleAr: "تكامل لحظي ودعم عدم الاتصال (Offline-First)",
        titleEn: "Offline-First Data Sync",
        descAr: "قدرة التطبيق على العمل وحفظ البيانات حتى عند انقطاع الإنترنت والمزامنة التلقائية فور عودة الشبكة.",
        descEn: "Reliable offline database caching that syncs seamlessly the second connectivity restores.",
        icon: "WifiOff",
      },
      {
        titleAr: "أمان مصرفي وحماية البيانات البيومترية",
        titleEn: "Banking-Grade Biometric Security",
        descAr: "تشفير شامل للبيانات مع دعم FaceID وبصمة الأصبع وتوافق كامل مع بوابات الدفع الإلكتروني المعتمدة.",
        descEn: "End-to-end payload encryption with FaceID, TouchID, and PCI-DSS compliant payment gateways.",
        icon: "ShieldCheck",
      },
    ],
    deliverablesAr: [
      "الكود المصدري الكامل للتطبيق بدون أي قيود (Full Source Code)",
      "نسخ تجريبية فورية عبر TestFlight و Google Play Beta للاختبار المباشر",
      "إدارة شاملة لرفع التطبيق وتجاوز مراجعات متجري Apple و Google",
      "لوحة تحكم سحابية لإدارة المحتوى، الإشعارات الفورية، والمستخدمين",
      "ضمان فني ودعم وصيانة مستمرة بعد الإطلاق الرسمي",
    ],
    deliverablesEn: [
      "Full documented source code ownership with zero lock-in",
      "Live TestFlight and Google Play Beta builds for sprint testing",
      "Complete App Store and Google Play review management to approval",
      "Cloud admin console for users, push notifications, and analytics",
      "Post-launch SLA warranty and ongoing maintenance support",
    ],
    technologies: ["Swift", "Kotlin", "Flutter", "Firebase", "WebSockets", "Node.js", "PostgreSQL", "Apple Pay"],
    caseStudyHighlight: {
      appNameAr: "تطبيق «إن رايد» (inRide) للنقل الذكي",
      appNameEn: "«inRide» Smart Mobility Platform",
      descAr: "تطبيق نقل ذكي وتوصيل طرود أدار أكثر من 30,000 رحلة مع تتبع GPS لحظي وتفاوض مرن على الأجرة.",
      descEn: "High-scale ride-hailing and courier platform managing 30,000+ completed trips with real-time GPS clustering.",
      metricAr: "30,000+ رحلة منجزة",
      metricEn: "30,000+ Trips Completed",
      link: "https://play.google.com/store/apps/details?id=com.inride.inride_app",
    },
    faqs: [
      {
        qAr: "كم تبلغ تكلفة تطوير تطبيق جوال في مصر والسعودية والخليج؟",
        qEn: "How much does custom mobile app development cost?",
        aAr: "تتراوح تكلفة تطوير التطبيق الاحترافي بحسب نطاق العمل، وتبدأ الإصدارات الأولية (MVP) بميزانيات واضحة وشفافة بدون مصاريف مفاجئة. نوفر عروض أسعار تفصيلية بناءً على دراسة متطلبات تطبيقك بدقة.",
        aEn: "Development costs depend on feature complexity, platform requirements, and backend integrations. We provide clear, fixed-price sprint proposals for high-ROI delivery.",
      },
      {
        qAr: "هل تدعمون نشر التطبيق على متجري Apple App Store و Google Play؟",
        qEn: "Do you handle App Store and Google Play publishing?",
        aAr: "نعم 100%. نتولى كافة اشتراطات وتجهيزات النشر والحسابات حتى يصبح تطبيقك متاحاً للتحميل للجمهور مباشرة.",
        aEn: "Yes. Our team manages metadata preparation, compliance audits, and full submission review until your app is approved and live.",
      },
    ],
  },

  "flutter-app-development": {
    slug: "flutter-app-development",
    titleAr: "تطوير تطبيقات Flutter متعددة المنصات",
    titleEn: "Flutter App Development Company",
    seoTitleAr: "شركة تطوير وبرمجة تطبيقات Flutter | كيمفو ستوديو",
    seoTitleEn: "Flutter App Development Company & Cross-Platform Agency | Kemvo",
    seoDescAr:
      "شركة برمجة وتطوير تطبيقات Flutter متخصصة. نبني تطبيقات كود موحد تعمل على iOS و Android بكفاءة وأداء 60-120 FPS وتوفر حتى 40% من تكلفة ووقت التطوير.",
    seoDescEn:
      "Expert Flutter app development company crafting cross-platform iOS and Android apps with a single unified codebase, 120 FPS rendering, and 40% cost efficiency.",
    badgeAr: "⚡ كود موحد فائق الأداء بـ Flutter",
    badgeEn: "⚡ Unified 120 FPS Flutter Codebase",
    h1Ar: "شركة برمجة وتطوير تطبيقات Flutter الاحترافية (iOS & Android)",
    h1En: "Expert Flutter App Development Company (iOS & Android)",
    subheadlineAr:
      "استفد من قوة محرك Flutter لبناء تطبيقين بجودة Native كاملة بكود موحد يختصر وقتك إلى النصف ويمنح مستخدميك تجربة تفاعلية سلسة ومطابقة لأعلى معايير التصميم العالمية.",
    subheadlineEn:
      "Harness the power of Flutter to launch native-grade mobile applications across both iOS and Android simultaneously with half the development cycle and zero compromise on speed.",
    stats: [
      { value: "40%", labelAr: "توفير في وقت وتكلفة التطوير", labelEn: "Time & Cost Saved" },
      { value: "1 Codebase", labelAr: "كود موحد لـ iOS و Android", labelEn: "Unified Codebase" },
      { value: "120 FPS", labelAr: "سلاسة رندرة الشاشات", labelEn: "Fluid Display Engine" },
    ],
    pillars: [
      {
        titleAr: "أداء ورندرة بصرية فائقة (Skia & Impeller)",
        titleEn: "Hardware Accelerated Impeller Engine",
        descAr: "رندرة مباشرة على كارت الشاشة بدون Frame Drops لضمان تجربة مستخدم سريعة وسلسة جداً.",
        descEn: "GPU-accelerated rendering delivering zero frame drops and silky 120Hz scrolling.",
        icon: "Zap",
      },
      {
        titleAr: "تحديث وصيانة أسرع بنسبة 50%",
        titleEn: "50% Faster Feature Iteration",
        descAr: "إضافة أي ميزة جديدة يتم تطبيقها لحظياً على نظامي iPhone و Android معاً في دورة برمجية واحدة.",
        descEn: "Every new feature or bugfix deploys synchronously to iOS and Android simultaneously.",
        icon: "Clock",
      },
      {
        titleAr: "مكتبة واجهات مخصصة (Custom UI Kit)",
        titleEn: "Tailored Pixel-Perfect UI Kit",
        descAr: "تصميم واجهات تتطابق مع معايير Apple Cupertino و Material You مع الحفاظ على هوية علامتك التجارية.",
        descEn: "Pixel-perfect interfaces adhering to Apple Human Interface Guidelines and Material 3.",
        icon: "Smartphone",
      },
    ],
    deliverablesAr: [
      "كود Flutter نظيف موثق بالكامل مع State Management حديثة (Bloc / Riverpod)",
      "تطبيقان كاملان لنظامي iOS و Android جاهزان للمتاجر",
      "ربط كامل بقواعد البيانات السحابية (Firebase / Supabase / Custom REST APIs)",
      "تكامل بوابات الدفع الإلكتروني (Apple Pay، Mada، Visa، STC Pay)",
      "دعم فني وصيانة وضمان كفاءة بعد التسليم",
    ],
    deliverablesEn: [
      "Production-grade Flutter repository with modern state management (Bloc/Riverpod)",
      "Ready-to-deploy application bundles for iOS and Android",
      "Full cloud backend integration (Firebase / Custom REST / GraphQL APIs)",
      "Integrated regional and international payment gateways (Apple Pay, Stripe)",
      "Comprehensive warranty and update maintenance packages",
    ],
    technologies: ["Flutter", "Dart", "Firebase", "Bloc", "REST APIs", "GraphQL", "Apple Pay", "Google Play"],
    caseStudyHighlight: {
      appNameAr: "تطبيق «كرمتي» (Karamty) لإدارة الخدمات",
      appNameEn: "«Karamty» Community Management Platform",
      descAr: "منصة متكاملة بنيت بـ Flutter لإدارة وتنظيم الخدمات ومدارس الأحد بكفاءة تامة وتفاعل يومي نشط.",
      descEn: "Complete mobile platform engineered with Flutter managing attendance, curricula, and real-time operations.",
      metricAr: "منصة متكاملة 100%",
      metricEn: "100% Integrated Platform",
      link: "https://play.google.com/store/apps/details?id=com.karamty.karamty_app",
    },
    faqs: [
      {
        qAr: "هل تطبيقات Flutter سريعة مثل التطبيقات الأصلية (Native)؟",
        qEn: "Is Flutter performance identical to native apps?",
        aAr: "نعم، Flutter يترجم كود Dart مباشرة إلى Machine Code خاص بمعالجات ARM الخاصة بأجهزة iPhone و Android، مع محرك Impeller الرسومي الجديد الذي يضمن 60 و 120 إطاراً في الثانية دون أي بطء.",
        aEn: "Yes. Flutter compiles directly to native ARM machine code using the Impeller graphics engine, delivering identical 60-120 FPS performance matching pure Swift or Kotlin.",
      },
      {
        qAr: "هل يمكن ربط تطبيقات Flutter ببوابات الدفع والخرائط؟",
        qEn: "Can Flutter integrate with payment gateways and live GPS maps?",
        aAr: "بالتأكيد، تدعم تطبيقاتنا بـ Flutter الربط التام مع خرائط Google Maps، Apple Pay، وبوابات الدفع البنكية وكافة ميزات الكاميرا والبصمة البيومترية.",
        aEn: "Absolutely. Flutter offers native bridge support for Apple Pay, Google Maps, GPS geofencing, camera sensors, and biometric FaceID.",
      },
    ],
  },

  "web-development": {
    slug: "web-development",
    titleAr: "تصميم وتطوير المواقع والمنصات الإلكترونية",
    titleEn: "Web Development & Web Platform Engineering",
    seoTitleAr: "شركة تصميم وتطوير مواقع إلكترونية ومنصات ويب | كيمفو ستوديو",
    seoTitleEn: "Website & Web Platform Development Company | Kemvo Studio",
    seoDescAr:
      "شركة تطوير وتصميم مواقع إلكترونية احترافية ومنصات ويب سحابية فائقة السرعة بـ Next.js و React. مواقع متوافقة مع محركات البحث SEO وتدعم التحويل والمبيعات للشركات.",
    seoDescEn:
      "Custom web development company engineering high-speed websites, SaaS platforms, and cloud portals built with Next.js 15, React, and high-converting SEO architectures.",
    badgeAr: "🌐 منصات ويب حديثة بـ Next.js 15",
    badgeEn: "🌐 High-Speed Next.js 15 Web Platforms",
    h1Ar: "شركة تصميم وتطوير المواقع والمنصات الإلكترونية الحديثة",
    h1En: "High-Performance Web Development & Web Platform Engineering",
    subheadlineAr:
      "نصمم ونطور منصات ويب سحابية، بوابات إلكترونية، ومواقع شركات فائقة السرعة تجمع بين جمالية التصميم التفاعلي، توافق الـ SEO بنسبة 100%، وسرعة تحميل خارقة دون تأخير.",
    subheadlineEn:
      "We design and engineer enterprise web platforms, SaaS applications, and company portals that combine stunning interactive UI, 100% SEO compliance, and sub-second page loads.",
    stats: [
      { value: "0.8s", labelAr: "متوسط سرعة التحميل", labelEn: "Sub-Second Load Time" },
      { value: "100%", labelAr: "توافق الجوال ومحركات البحث", labelEn: "Responsive & SEO Ready" },
      { value: "99.99%", labelAr: "استقرار الاستضافة السحابية", labelEn: "Cloud Reliability" },
    ],
    pillars: [
      {
        titleAr: "رندرة هجينة وسرعة فائقة (SSR & Static)",
        titleEn: "Server-Side & Static Hybrid Rendering",
        descAr: "اعتماد أحدث معايير Next.js 15 مع Server Components لأقصى درجات سرعة التصفح وتصدر نتائج Google.",
        descEn: "Powered by Next.js 15 Server Components for instant rendering and top Google rankings.",
        icon: "Rocket",
      },
      {
        titleAr: "لوحات تحكم إدارية ذكية (Admin Dashboards)",
        titleEn: "Intuitive Custom Admin Portals",
        descAr: "لوحات تحكم سحابية آمنة تمكّنك من إدارة محتوى الموقع، العملاء، والطلبات بكل سهولة من أي جهاز.",
        descEn: "Secure, real-time dashboard interfaces to manage content, user analytics, and orders seamlessly.",
        icon: "Layers",
      },
      {
        titleAr: "أمان متقدم وحماية من الهجمات (Cloudflare & SSL)",
        titleEn: "Enterprise Security & Protection",
        descAr: "حماية كاملة من هجمات DDoS مع شهادات أمان مجانية وتوافق مع معايير حماية البيانات العالمية.",
        descEn: "DDoS protection, automatic SSL, and GDPR-compliant cloud infrastructure.",
        icon: "ShieldCheck",
      },
    ],
    deliverablesAr: [
      "موقع إلكتروني أو منصة ويب كاملة مجهزة بكود Next.js 15 و React",
      "لوحة تحكم إدارية حديثة لإدارة البيانات والعمليات",
      "تهيئة تقنية شاملة لمحركات البحث (Technical & On-Page SEO)",
      "ربط أدوات التحليلات (Google Analytics 4 و Search Console)",
      "نشر واستضافة سحابية على خوادم Vercel أو AWS العالمية",
    ],
    deliverablesEn: [
      "Full web platform codebase built with Next.js 15, TypeScript, and Tailwind CSS",
      "Modern administrative backoffice console for data and role management",
      "Comprehensive on-page and technical SEO setup with schema markup",
      "Integrated telemetry tools (Google Analytics 4 and Meta Pixel)",
      "Cloud deployment on Vercel or AWS with edge caching",
    ],
    technologies: ["Next.js 15", "React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL", "Vercel", "AWS"],
    faqs: [
      {
        qAr: "هل الموقع متوافق مع كافة أحجام الهواتف والشاشات؟",
        qEn: "Is the website fully mobile responsive?",
        aAr: "نعم 100%. نصمم بأسلوب Mobile-First بحيث تظهر كافة الأقسام والأزرار والقوائم بانسيابية فائقة وسهولة استخدام مطلقة على شاشات الهواتف والأجهزة اللوحية وأجهزة الكمبيوتر.",
        aEn: "Yes, 100%. We employ mobile-first responsive architecture ensuring fluid usability across all smartphones, tablets, and desktop displays.",
      },
      {
        qAr: "هل تقدمون تهيئة لمحركات البحث (SEO) مع تصميم الموقع؟",
        qEn: "Does the website development include search engine optimization (SEO)?",
        aAr: "نعم، كل موقع يتم بناؤه مع هيكلة بيانات منظمة (Schema.org JSON-LD)، خريطة موقع Sitemap.xml، ملف Robots.txt، وسرعة تحميل متوافقة مع معايير Google Core Web Vitals.",
        aEn: "Yes. Every web build features complete metadata, Schema.org JSON-LD structured data, dynamic sitemaps, and Core Web Vitals optimization.",
      },
    ],
  },

  "ui-ux-design": {
    slug: "ui-ux-design",
    titleAr: "تصميم واجهات وتجربة المستخدم (UI/UX Design)",
    titleEn: "UI/UX Design & Design Systems Agency",
    seoTitleAr: "شركة تصميم واجهات وتجربة المستخدم (UI/UX Design) | كيمفو ستوديو",
    seoTitleEn: "UI/UX Design Agency & Product Design Studio | Kemvo Studio",
    seoDescAr:
      "شركة متخصصة في تصميم واجهات وتجربة المستخدم UI/UX للتطبيقات والمواقع. نبني تجارب استخدام سهلة وممتعة مبنية على معايير Apple HIG ونظام تصميم متكامل يرفع معدل التحويل.",
    seoDescEn:
      "Top-tier UI/UX design agency creating Apple-grade digital product interfaces, user journeys, and interactive design systems that maximize user retention and conversions.",
    badgeAr: "✨ تصميم منتجات رقمية بمعايير Apple HIG",
    badgeEn: "✨ Apple HIG-Grade Product Design",
    h1Ar: "شركة تصميم واجهات وتجربة المستخدم الاحترافية (UI/UX)",
    h1En: "Apple-Grade UI/UX Design & Product Design Studio",
    subheadlineAr:
      "لا نقوم بمجرد رسم شاشات؛ نحن نهندس رحلات استخدام سلسة ومؤثرة تفهم سيكولوجية عميلك، ترفع معدل التحويل، وتمنح تطبيقك أو موقعك طابع الشركات التقنية الكبرى.",
    subheadlineEn:
      "We design intuitive, conversion-focused user journeys that understand human psychology, minimize cognitive friction, and elevate your digital brand to industry-leading standards.",
    stats: [
      { value: "+60%", labelAr: "توفير وقت التطوير عبر Design Tokens", labelEn: "Dev Time Saved via Tokens" },
      { value: "4.9/5", labelAr: "متوسط تقييم تجارب المستخدم", labelEn: "User Satisfaction Rating" },
      { value: "100%", labelAr: "ملفات Figma مجهزة للمطورين", labelEn: "Developer-Ready Figma Files" },
    ],
    pillars: [
      {
        titleAr: "أنظمة تصميم معيارية (Scalable Design Systems)",
        titleEn: "Production Design Tokens & Components",
        descAr: "بناء مكتبات مكونات وDesign Tokens مجهزة للمطورين تقلل وقت البرمجة بنسبة 60% وتوحد الهوية البصرية.",
        descEn: "Scalable component libraries and design tokens that standardize your brand and accelerate code delivery.",
        icon: "Layers",
      },
      {
        titleAr: "نماذج تفاعلية حية (Interactive Prototypes)",
        titleEn: "Clickable High-Fidelity Prototypes",
        descAr: "نماذج حية قابلة للنقر والتجربة على هاتفك الفعلي قبل كتابة سطر كود واحد للتأكد من سهولة كل شاشة.",
        descEn: "Interactive Figma prototypes you can test on real devices before writing a single line of code.",
        icon: "Smartphone",
      },
      {
        titleAr: "أبحاث المستخدم وتحسين التحويل (UX Research & CRO)",
        titleEn: "Behavioral UX Research & CRO",
        descAr: "دراسة سلوك المنافسين والجمهور المستهدف لتقليل عدد النقرات والوصول لأعلى معدل شراء واحتفاظ بالمستخدمين.",
        descEn: "User journey mapping that eliminates drop-offs and drives higher conversions and user retention.",
        icon: "Zap",
      },
    ],
    deliverablesAr: [
      "ملف Figma كامل ومفصل مع كافة الشاشات وحالاتها المختلفة (Active, Hover, Error)",
      "نظام تصميم شامل (Design System) يضم الألوان، الخطوط، والأيقونات والمكونات",
      "نموذج تفاعلي حي (Clickable Prototype) للاختبار والعرض على المستثمرين",
      "خريطة تدفق المستخدم الكاملة (User Journey Map & Wireframes)",
      "دليل تسليم هندسي للمطورين (Design-to-Code Handoff Guide)",
    ],
    deliverablesEn: [
      "Master Figma source file with organized component states and autolayouts",
      "Comprehensive Design System (Typography, Color Tokens, Iconography, UI Kit)",
      "Interactive high-fidelity clickable prototype for user testing and investors",
      "Complete user flow diagrams, wireframes, and information architecture",
      "Full developer handoff documentation with asset export kits",
    ],
    technologies: ["Figma", "Apple HIG", "Material 3", "Design Tokens", "Prototyping", "Design Systems"],
    faqs: [
      {
        qAr: "هل تسلّمون ملفات التصميم قابلة للتسليم للمبرمجين مباشرة؟",
        qEn: "Are design deliverables developer-ready?",
        aAr: "نعم 100%. ملفات Figma التي نسلمها مبنية بـ Auto-Layout ومعايير Design Tokens ومجهزة بمسافات وأبعاد دقيقة تسمح لأي مطور بتحويلها إلى كود برمجي دون أي لبس.",
        aEn: "Yes. All Figma designs use auto-layout, exact design tokens, and clean naming conventions optimized for developer handoff.",
      },
      {
        qAr: "كم يستغرق تصميم واجهات تطبيق أو موقع إلكتروني؟",
        qEn: "How long does a complete UI/UX design project take?",
        aAr: "يستغرق تصميم النسخة الأولية المتكاملة عادة بين أسبوعين إلى 4 أسابيع، تتضمن أبحاث المستخدم، السكتشات، ومراجعة الشاشات معك خطوة بخطوة.",
        aEn: "A typical full product design sprint takes 2 to 4 weeks, including UX research, wireframing, high-fidelity UI screens, and interactive prototyping.",
      },
    ],
  },

  "custom-software-development": {
    slug: "custom-software-development",
    titleAr: "تطوير البرمجيات المخصصة وحلول الشركات",
    titleEn: "Custom Software Development Services",
    seoTitleAr: "شركة برمجة وتطوير برمجيات مخصصة للشركات | كيمفو ستوديو",
    seoTitleEn: "Custom Software Development Company & Enterprise Solutions | Kemvo",
    seoDescAr:
      "شركة برمجة وتطوير برمجيات مخصصة وحلول سحابية متقدمة للشركات والمؤسسات. نبني أنظمة إدارة وميكنة أعمال آمنة وقابلة للتوسع بأحدث معايير الأمان والتكامل.",
    seoDescEn:
      "Enterprise custom software development company engineering secure, scalable ERP, CRM, and cloud platforms engineered to streamline business operations and fuel growth.",
    badgeAr: "⚙️ برمجيات وأنظمة مخصصة للشركات",
    badgeEn: "⚙️ Enterprise Custom Software",
    h1Ar: "شركة برمجة وتطوير برمجيات مخصصة وحلول سحابية للشركات",
    h1En: "Enterprise Custom Software Development & Cloud Solutions",
    subheadlineAr:
      "نبتكر ونبرمج أنظمة سحابية مخصصة، واجهات برمجية APIs متطورة، وبوابات أعمال مؤتمتة تلبي الاحتياجات الفريدة لمؤسستك وترفع كفاءة العمليات التشغيلية بنسبة 300%.",
    subheadlineEn:
      "We build bespoke cloud platforms, high-throughput APIs, and automated enterprise portals tailored to your exact business workflows to maximize productivity and ROI.",
    stats: [
      { value: "300%", labelAr: "زيادة في كفاءة العمليات التشغيلية", labelEn: "Operational Efficiency Boost" },
      { value: "0%", labelAr: "رسوم اشتراكات شهرية متكررة للغير", labelEn: "Zero Third-Party Vendor Lock-in" },
      { value: "Enterprise", labelAr: "أمان مصرفي وتشفير متكامل", labelEn: "Enterprise-Grade Security" },
    ],
    pillars: [
      {
        titleAr: "بنية تحتية سحابية مستقلة (Self-Hosted Cloud)",
        titleEn: "Dedicated Independent Cloud Architecture",
        descAr: "نظام مصمم خصيصاً لك بدون الاعتماد على منصات جاهزة تفرض اشتراكات باهظة أو قيوداً على بياناتك.",
        descEn: "Tailored software that you own 100% without recurring third-party software licensing fees.",
        icon: "Server",
      },
      {
        titleAr: "تكامل مباشر مع الأنظمة وبوابات الدفع (API Integrations)",
        titleEn: "Seamless API & ERP Integrations",
        descAr: "ربط سلس مع بوابات الدفع الإلكتروني، الفوترة الإلكترونية، أنظمة الشحن، ومنصات الـ ERP الحالية.",
        descEn: "Frictionless integration with regional e-invoicing, payment gateways, CRM, and existing ERPs.",
        icon: "Layers",
      },
      {
        titleAr: "أمان متقدم وصلاحيات دقيقة (RBAC Security)",
        titleEn: "Role-Based Access Control (RBAC)",
        descAr: "نظام صلاحيات متعدد المستويات يضمن وصول كل موظف أو مدير للمعلومات المخصصة له فقط بأعلى درجات الخصوصية.",
        descEn: "Granular multi-tier permissions and audit logging guaranteeing bulletproof internal governance.",
        icon: "ShieldCheck",
      },
    ],
    deliverablesAr: [
      "نظام برمجي مخصص متكامل مع الكود المصدري الكامل",
      "واجهات برمجية آمنة (RESTful / GraphQL APIs) للربط مع أي نظام خارجي",
      "لوحة تحكم إدارية سحابية للمدراء والمشرفين والموظفين",
      "توثيق تقني معماري شامل (Technical Architecture Documentation)",
      "خطة تدريب ودعم فني وصيانة دورية لضمان استقرار العمليات",
    ],
    deliverablesEn: [
      "Full custom enterprise software platform with 100% proprietary code ownership",
      "Secure RESTful & GraphQL API infrastructure for third-party integrations",
      "Comprehensive web dashboard with role-based permissions and analytics",
      "Technical architecture and system administration documentation",
      "Deployment setup, team training, and long-term maintenance SLAs",
    ],
    technologies: ["Node.js", "Python", "Next.js", "PostgreSQL", "Docker", "Kubernetes", "Redis", "AWS / GCP"],
    faqs: [
      {
        qAr: "لماذا أختار برمجة نظام مخصص بدلاً من شراء برامج جاهزة؟",
        qEn: "Why choose custom software over off-the-shelf software?",
        aAr: "البرمجيات الجاهزة تفرض اشتراكات متكررة وتجبرك على تغيير طريقة عملك لتناسبها، بينما النظام المخصص يُبنى خصيصاً حول دورتك التشغيلية وتملكه شركتك بالكامل مع قابلية غير محدودة للتوسع.",
        aEn: "Commercial off-the-shelf tools demand recurring monthly license fees and lack flexibility. Custom software is built exactly for your workflow, completely owned by your company, and scales infinitely.",
      },
      {
        qAr: "هل تقدمون ضماناً وصيانة بعد تسليم النظام البرمجي؟",
        qEn: "Do you offer warranty and support after software delivery?",
        aAr: "نعم، نقدم ضماناً كاملاً ضد أي أخطاء برمجية بعد الإطلاق، بالإضافة إلى اتفاقيات مستوى الخدمة (SLA) للصيانة وتطوير ميزات جديدة مع نمو شركتك.",
        aEn: "Yes. Every custom software platform includes an initial post-delivery warranty and tailored SLAs covering server maintenance, database backups, and ongoing feature expansion.",
      },
    ],
  },
};
