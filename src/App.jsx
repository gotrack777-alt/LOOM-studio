import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  Sliders,
  ShieldCheck,
  Truck,
  CreditCard,
  MessageCircle,
  Bell,
  CheckCircle,
  ChevronRight,
  TrendingUp,
  Users,
  LogOut,
  Key,
  Printer,
  Sun,
  Moon,
  Layers,
  ArrowRight,
  Package,
  Clock,
  Star,
  ExternalLink,
  DollarSign
} from 'lucide-react';

// --- بيانات المتجر الافتراضية ---
const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: 'HEAVYWEIGHT OVERSIZED HOODIE',
    subName: 'NOIR EDITION • 480 GSM FLEECE',
    price: 1850,
    cost: 720,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
    stock: 45,
    colors: ['#0A0A0A', '#4A4A4A', '#E5E5E5']
  },
  {
    id: 2,
    name: 'MINIMALIST WIDE SWEATPANTS',
    subName: 'RAW ASH • UNBRUSHED COTTON',
    price: 1450,
    cost: 580,
    image: 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=1000&q=80',
    stock: 28,
    colors: ['#1F1F1F', '#5E5E5E']
  },
  {
    id: 3,
    name: 'SIGNATURE FULL TRACKSUIT SUIT',
    subName: 'COMPLETE LOOK • DENSE MILTON',
    price: 3100,
    cost: 1250,
    image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80',
    stock: 16,
    colors: ['#0A0A0A']
  }
];

export default function App() {
  // حالة الثيم (Noir: داكن, Ash: رمادي زارا, Blanc: أبيض عالي التباين)
  const [theme, setTheme] = useState('noir');

  // المصادقة والصلاحيات
  const [authSession, setAuthSession] = useState({
    user: 'gotrack777@gmail.com',
    role: 'OWNER / MASTER ADMIN',
    name: 'Ibrahim Bakry (Owner)',
    permissions: ['all']
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [loginEmail, setLoginEmail] = useState('gotrack777@gmail.com');
  const [loginPassword, setLoginPassword] = useState('123456789');
  const [authError, setAuthError] = useState('');

  // عرض الواجهة (Storefront أم لوحة الإدارة CMS)
  const [activeTab, setActiveTab] = useState('store');
  const [cmsTab, setCmsTab] = useState('performance');

  // سلة المشتريات
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // حاسبة المقاسات التفاعلية
  const [userHeight, setUserHeight] = useState(178);
  const [userWeight, setUserWeight] = useState(76);
  const [calcRecommendation, setCalcRecommendation] = useState('L / OVERSIZED');

  // بوالص الشحن واختيار المقاس
  const [selectedWaybillSize, setSelectedWaybillSize] = useState('4x6');

  // بيانات نموذج الطلب والشحن (COD)
  const [checkoutData, setCheckoutData] = useState({
    name: 'أحمد محمود',
    phone: '01012345678',
    governorate: 'Cairo',
    address: 'شارع التسعين الشمالي، التجمع الخامس',
    notes: 'معاينة قبل الاستلام ودفع كاش'
  });

  // تحديث توصية المقاس بناءً على الطول والوزن
  useEffect(() => {
    if (userWeight < 65) {
      setCalcRecommendation('S / RELAXED');
    } else if (userWeight <= 78) {
      setCalcRecommendation('M / OVERSIZED');
    } else if (userWeight <= 92) {
      setCalcRecommendation('L / HEAVY DROP');
    } else {
      setCalcRecommendation('XL / EXTRA FIT');
    }
  }, [userHeight, userWeight]);

  // دالة تسجيل الدخول
  const handleLogin = (e) => {
    e.preventDefault();
    if (loginEmail === 'gotrack777@gmail.com' && loginPassword === '123456789') {
      setAuthSession({
        user: 'gotrack777@gmail.com',
        role: 'OWNER / MASTER ADMIN',
        name: 'Ibrahim Bakry (Owner)',
        permissions: ['all']
      });
      setIsAuthModalOpen(false);
      setAuthError('');
      setActiveTab('cms');
    } else {
      setAuthError('بيانات الدخول غير صحيحة. يرجى استخدام البريد وكلمة المرور المحددين.');
    }
  };

  // ألوان وتنسيقات الثيم
  const themeClasses = {
    noir: {
      bg: 'bg-black',
      surface: 'bg-neutral-950',
      border: 'border-neutral-800',
      textPrimary: 'text-white',
      textSecondary: 'text-neutral-400',
      accent: 'bg-white text-black hover:bg-neutral-200',
      badge: 'bg-neutral-900 text-neutral-300 border border-neutral-800'
    },
    ash: {
      bg: 'bg-[#1a1a1a]',
      surface: 'bg-[#242424]',
      border: 'border-[#333333]',
      textPrimary: 'text-[#e5e5e5]',
      textSecondary: 'text-[#999999]',
      accent: 'bg-[#d4d4d4] text-black hover:bg-white',
      badge: 'bg-[#2b2b2b] text-[#cccccc] border border-[#3d3d3d]'
    },
    blanc: {
      bg: 'bg-stone-50',
      surface: 'bg-white',
      border: 'border-stone-200',
      textPrimary: 'text-stone-900',
      textSecondary: 'text-stone-500',
      accent: 'bg-stone-950 text-white hover:bg-stone-800',
      badge: 'bg-stone-100 text-stone-700 border border-stone-200'
    }
  }[theme];

  return (
    <div className={`min-h-screen ${themeClasses.bg} ${themeClasses.textPrimary} transition-colors duration-300 font-sans antialiased`}>
      {/* شريط الإعلانات العلوي */}
      <div className={`border-b ${themeClasses.border} px-4 py-2 text-[10px] tracking-widest uppercase flex justify-between items-center ${themeClasses.surface}`}>
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          NEW DROP 04 • HEAVYWEIGHT MILTON 480 GSM AVAILABLE IN CAIRO & GIZA
        </span>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setTheme('noir')}
              className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase transition ${theme === 'noir' ? 'bg-white text-black' : 'text-neutral-500'}`}
            >
              Noir
            </button>
            <button
              onClick={() => setTheme('ash')}
              className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase transition ${theme === 'ash' ? 'bg-[#999] text-black' : 'text-neutral-500'}`}
            >
              Ash
            </button>
            <button
              onClick={() => setTheme('blanc')}
              className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase transition ${theme === 'blanc' ? 'bg-black text-white' : 'text-neutral-500'}`}
            >
              Blanc
            </button>
          </div>
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="hover:underline flex items-center gap-1 font-mono text-[9px]"
          >
            <Key size={11} /> {authSession ? 'OWNER ACTIVE' : 'SIGN IN'}
          </button>
        </div>
      </div>

      {/* الهيدر الرئيسي - Zara Style Editorial Nav */}
      <header className={`sticky top-0 z-40 border-b ${themeClasses.border} ${themeClasses.bg} backdrop-blur-md bg-opacity-95 px-6 py-4 flex justify-between items-center`}>
        <div className="flex items-center gap-8">
          <button
            onClick={() => setActiveTab('store')}
            className="text-2xl font-bold tracking-[0.3em] uppercase font-serif"
          >
            LOOM STUDIOS
          </button>
          <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-widest text-neutral-400">
            <button onClick={() => setActiveTab('store')} className={activeTab === 'store' ? `${themeClasses.textPrimary} font-semibold` : 'hover:text-white transition'}>
              Catalogue
            </button>
            <button onClick={() => setActiveTab('calculator')} className={activeTab === 'calculator' ? `${themeClasses.textPrimary} font-semibold` : 'hover:text-white transition'}>
              Size Lab
            </button>
            {authSession && (
              <button onClick={() => setActiveTab('cms')} className={`flex items-center gap-1.5 ${activeTab === 'cms' ? 'text-amber-500 font-semibold' : 'text-amber-500/70 hover:text-amber-400 transition'}`}>
                <ShieldCheck size={13} /> CMS Command
              </button>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsCartOpen(!isCartOpen)}
            className="relative p-2 rounded-full border border-neutral-800 hover:border-neutral-500 transition"
          >
            <ShoppingBag size={18} />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-white text-black text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* المحتوى الرئيسي */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* صفحة الكتالوج */}
        {activeTab === 'store' && (
          <section className="space-y-12">
            <div className="border-b border-neutral-800 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono tracking-widest uppercase text-neutral-500 block mb-2">Winter 2026 Collection</span>
                <h1 className="text-4xl md:text-5xl font-serif font-light tracking-tight">HEAVYWEIGHT COMFORT</h1>
              </div>
              <p className="text-xs text-neutral-400 max-w-sm tracking-wide leading-relaxed">
                قماش ميلتون مصري فائق النعومة، وزن 480 جرام، مقاوم للانكماش، ومعالج حرارياً لأعلى درجات الراحة والثبات.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {INITIAL_PRODUCTS.map((prod) => (
                <div key={prod.id} className={`group border ${themeClasses.border} ${themeClasses.surface} p-4 flex flex-col justify-between transition hover:border-neutral-500`}>
                  <div className="overflow-hidden aspect-[3/4] mb-4 bg-neutral-900">
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 transition duration-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <span className="text-[9px] font-mono tracking-widest uppercase text-neutral-400 block">{prod.subName}</span>
                    <h3 className="text-sm font-semibold tracking-wider uppercase">{prod.name}</h3>
                    <div className="flex justify-between items-center pt-2">
                      <span className="font-mono text-sm">{prod.price} EGP</span>
                      <button
                        onClick={() => {
                          setCart([...cart, prod]);
                          setIsCartOpen(true);
                        }}
                        className={`text-[10px] tracking-widest uppercase px-4 py-2 ${themeClasses.accent} font-bold transition`}
                      >
                        Add to Bag
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* حاسبة المقاسات التفاعلية */}
        {activeTab === 'calculator' && (
          <section className={`max-w-2xl mx-auto border ${themeClasses.border} ${themeClasses.surface} p-8 space-y-8`}>
            <div className="border-b border-neutral-800 pb-4">
              <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-500">Interactive Sizing Lab</span>
              <h2 className="text-2xl font-serif mt-1">حاسبة القياس الدقيق للميلتون الأوفرسايز</h2>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span>الطول (Height):</span>
                  <span className="font-bold">{userHeight} cm</span>
                </div>
                <input
                  type="range"
                  min="155"
                  max="205"
                  value={userHeight}
                  onChange={(e) => setUserHeight(Number(e.target.value))}
                  className="w-full accent-white cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-mono mb-2">
                  <span>الوزن (Weight):</span>
                  <span className="font-bold">{userWeight} kg</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="130"
                  value={userWeight}
                  onChange={(e) => setUserWeight(Number(e.target.value))}
                  className="w-full accent-white cursor-pointer"
                />
              </div>

              <div className="p-6 border border-neutral-700 bg-neutral-900/50 text-center space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400">المقاس الموصى به لإطلالة أوفرسايز منضبطة</span>
                <p className="text-3xl font-serif font-bold text-emerald-400 tracking-wider">{calcRecommendation}</p>
                <p className="text-xs text-neutral-400 pt-2">
                  تمت الحسابات وفقاً لأبعاد قصات LOOM STUDIOS ذات الأكتاف الساقطة (Drop Shoulder) وخامات الـ 480 GSM.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* لوحة تحكم الإدارة (CMS Command) */}
        {activeTab === 'cms' && (
          <section className="space-y-8">
            {/* بار معلومات الأونر */}
            <div className={`p-4 border ${themeClasses.border} ${themeClasses.surface} flex flex-col md:flex-row justify-between items-start md:items-center gap-4`}>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-amber-400">{authSession.role}</span>
                  <span className="text-xs text-neutral-500">• {authSession.user}</span>
                </div>
                <h2 className="text-xl font-serif mt-1">مركز إدارة العمليات والمبيعات</h2>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCmsTab('performance')}
                  className={`text-xs px-3 py-1.5 border ${cmsTab === 'performance' ? 'bg-white text-black font-bold' : `${themeClasses.border} hover:border-neutral-500`}`}
                >
                  أداء الموظفين
                </button>
                <button
                  onClick={() => setCmsTab('waybill')}
                  className={`text-xs px-3 py-1.5 border ${cmsTab === 'waybill' ? 'bg-white text-black font-bold' : `${themeClasses.border} hover:border-neutral-500`}`}
                >
                  بوالص الشحن (4x6)
                </button>
                <button
                  onClick={() => setCmsTab('revenue')}
                  className={`text-xs px-3 py-1.5 border ${cmsTab === 'revenue' ? 'bg-white text-black font-bold' : `${themeClasses.border} hover:border-neutral-500`}`}
                >
                  الإيرادات والأرباح
                </button>
              </div>
            </div>

            {/* تبويب أداء الموظفين */}
            {cmsTab === 'performance' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className={`p-5 border ${themeClasses.border} ${themeClasses.surface} space-y-3`}>
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold">كريم عادل (Logistics Dispatch)</span>
                      <span className="text-emerald-400 font-mono text-[10px]">KPI: 96%</span>
                    </div>
                    <div className="space-y-1 text-xs text-neutral-400 font-mono">
                      <div>الأوردرات المؤكدة اليوم: <span className="text-white font-bold">42</span></div>
                      <div>بوالص الشحن المطبوعة: <span className="text-white font-bold">39</span></div>
                      <div>معدل الاستجابة للشحن: <span className="text-white font-bold">14 دقيقة</span></div>
                    </div>
                  </div>

                  <div className={`p-5 border ${themeClasses.border} ${themeClasses.surface} space-y-3`}>
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold">سارة ناصر (Support Lead)</span>
                      <span className="text-emerald-400 font-mono text-[10px]">KPI: 98%</span>
                    </div>
                    <div className="space-y-1 text-xs text-neutral-400 font-mono">
                      <div>المحادثات المحلولة: <span className="text-white font-bold">68</span></div>
                      <div>متوسط وقت الرد: <span className="text-white font-bold">1.2 دقيقة</span></div>
                      <div>تقييم رضا العملاء (CSAT): <span className="text-white font-bold">4.9 / 5.0</span></div>
                    </div>
                  </div>

                  <div className={`p-5 border ${themeClasses.border} ${themeClasses.surface} space-y-3`}>
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold">عمر سمير (Sales Associate)</span>
                      <span className="text-amber-400 font-mono text-[10px]">KPI: 89%</span>
                    </div>
                    <div className="space-y-1 text-xs text-neutral-400 font-mono">
                      <div>أوردرات مؤكدة واتساب: <span className="text-white font-bold">28</span></div>
                      <div>معدل إتمام الشراء (Conversion): <span className="text-white font-bold">3.4%</span></div>
                      <div>محادثات معلقة: <span className="text-white font-bold">3</span></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* تبويب استوديو بوالص الشحن الحرارية */}
            {cmsTab === 'waybill' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                  <div className="flex gap-2 text-xs">
                    <button
                      onClick={() => setSelectedWaybillSize('4x6')}
                      className={`px-3 py-1 border ${selectedWaybillSize === '4x6' ? 'bg-white text-black font-bold' : 'border-neutral-800'}`}
                    >
                      4×6 بوصة (حراري)
                    </button>
                    <button
                      onClick={() => setSelectedWaybillSize('a4')}
                      className={`px-3 py-1 border ${selectedWaybillSize === 'a4' ? 'bg-white text-black font-bold' : 'border-neutral-800'}`}
                    >
                      A4 Standard
                    </button>
                    <button
                      onClick={() => setSelectedWaybillSize('a6')}
                      className={`px-3 py-1 border ${selectedWaybillSize === 'a6' ? 'bg-white text-black font-bold' : 'border-neutral-800'}`}
                    >
                      A6 Pocket Sticker
                    </button>
                  </div>
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-2 text-xs bg-emerald-600 text-white px-4 py-2 font-bold hover:bg-emerald-500 transition"
                  >
                    <Printer size={14} /> طباعة البوليصة الآن
                  </button>
                </div>

                {/* نموذج البوليصة للمعاينة والطباعة */}
                <div className="flex justify-center p-6 bg-neutral-900 border border-neutral-800">
                  <div className={`bg-white text-black p-6 font-mono text-xs border border-black shadow-2xl ${selectedWaybillSize === '4x6' ? 'w-[380px]' : selectedWaybillSize === 'a4' ? 'w-[520px]' : 'w-[300px]'}`}>
                    <div className="border-b-2 border-black pb-3 text-center">
                      <h3 className="text-xl font-bold tracking-widest uppercase">LOOM STUDIOS</h3>
                      <p className="text-[10px]">HAUTE STREETWEAR • COD DISPATCH</p>
                    </div>

                    <div className="grid grid-cols-2 gap-2 border-b border-black py-2 text-[11px]">
                      <div>
                        <span className="font-bold block">رقم الشحنة:</span>
                        <span>LM-2026-9481</span>
                      </div>
                      <div className="text-right">
                        <span className="font-bold block">شركة الشحن:</span>
                        <span>BOSTA EXPRESS</span>
                      </div>
                    </div>

                    <div className="border-b border-black py-3 space-y-1">
                      <span className="font-bold block text-sm">بيانات العميل:</span>
                      <div>الاسم: {checkoutData.name}</div>
                      <div>الهاتف: {checkoutData.phone}</div>
                      <div>العنوان: {checkoutData.address} - {checkoutData.governorate}</div>
                    </div>

                    <div className="border-b border-black py-3 space-y-1">
                      <span className="font-bold block">محتويات الشحنة:</span>
                      <div>• 1x HEAVYWEIGHT HOODIE NOIR (Size L)</div>
                      <div>• 1x SWEATPANTS RAW ASH (Size L)</div>
                    </div>

                    <div className="pt-3 flex justify-between items-center text-sm font-bold">
                      <span>المطلوب تحصيله (COD):</span>
                      <span className="text-lg">3,300 EGP</span>
                    </div>

                    <div className="mt-4 pt-2 border-t border-dashed border-black text-center text-[10px]">
                      *** يسمح بالمعاينة والقياس بحضور المندوب ***
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* تبويب الإيرادات وصافي الأرباح */}
            {cmsTab === 'revenue' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className={`p-4 border ${themeClasses.border} ${themeClasses.surface}`}>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase">إجمالي المبيعات (Gross)</span>
                    <p className="text-2xl font-bold font-mono mt-1">142,600 EGP</p>
                  </div>
                  <div className={`p-4 border ${themeClasses.border} ${themeClasses.surface}`}>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase">تكلفة التصنيع (COGS)</span>
                    <p className="text-2xl font-bold font-mono text-neutral-400 mt-1">54,200 EGP</p>
                  </div>
                  <div className={`p-4 border ${themeClasses.border} ${themeClasses.surface}`}>
                    <span className="text-[10px] font-mono text-neutral-400 uppercase">رسوم الشحن والتحصيل</span>
                    <p className="text-2xl font-bold font-mono text-neutral-400 mt-1">8,450 EGP</p>
                  </div>
                  <div className={`p-4 border border-emerald-900 bg-emerald-950/20`}>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase">صافي الأرباح (Net Profit)</span>
                    <p className="text-2xl font-bold font-mono text-emerald-400 mt-1">79,950 EGP</p>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}
      </main>

      {/* نافذة تسجيل الدخول للمالك gotrack777@gmail.com */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`max-w-md w-full border ${themeClasses.border} ${themeClasses.surface} p-8 space-y-6`}>
            <div className="border-b border-neutral-800 pb-3">
              <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">Master Authentication</span>
              <h3 className="text-xl font-serif mt-1">تسجيل دخول مالك LOOM STUDIOS</h3>
            </div>

            {authError && (
              <div className="p-3 bg-red-950/40 border border-red-800 text-red-300 text-xs">
                {authError}
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">البريد الإلكتروني (Gmail)</label>
                <input
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-sm text-white focus:outline-none focus:border-white"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">كلمة المرور (Password)</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-sm text-white focus:outline-none focus:border-white"
                  required
                />
              </div>

              <button
                type="submit"
                className={`w-full py-3 ${themeClasses.accent} font-bold text-xs uppercase tracking-widest`}
              >
                دخول لوحة التحكم (Sign In)
              </button>
            </form>

            <button
              onClick={() => setIsAuthModalOpen(false)}
              className="w-full text-center text-xs text-neutral-500 hover:text-white"
            >
              إلغاء والعودة للمتجر
            </button>
          </div>
        </div>
      )}

      {/* سلة الشراء والدفع عند الاستلام */}
      {isCartOpen && (
        <div className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-neutral-950 border-l border-neutral-800 p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center border-b border-neutral-800 pb-4 mb-4">
              <h3 className="text-lg font-serif">سلة المشتريات ({cart.length})</h3>
              <button onClick={() => setIsCartOpen(false)} className="text-xs text-neutral-400 hover:text-white">إغلاق ✕</button>
            </div>

            {cart.length === 0 ? (
              <p className="text-xs text-neutral-500 text-center py-12">السلة فارغة حالياً</p>
            ) : (
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
                {cart.map((item, index) => (
                  <div key={index} className="flex justify-between items-center border-b border-neutral-900 pb-3">
                    <div>
                      <p className="text-xs font-semibold">{item.name}</p>
                      <span className="text-[10px] text-neutral-500 font-mono">{item.price} EGP</span>
                    </div>
                    <button
                      onClick={() => setCart(cart.filter((_, i) => i !== index))}
                      className="text-[10px] text-red-400 hover:underline"
                    >
                      حذف
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="border-t border-neutral-800 pt-4 space-y-3">
              <div className="flex justify-between text-sm font-bold font-mono">
                <span>الإجمالي:</span>
                <span>{cart.reduce((sum, item) => sum + item.price, 0)} EGP</span>
              </div>
              <button
                onClick={() => {
                  alert('تم إرسال الطلب بنجاح! سيتم التواصل معك عبر الواتساب لتأكيد الشحن.');
                  setCart([]);
                  setIsCartOpen(false);
                }}
                className="w-full bg-white text-black font-bold py-3 text-xs uppercase tracking-widest hover:bg-neutral-200 transition"
              >
                تأكيد الطلب والدفع عند الاستلام (COD)
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
