import React, { useState, useMemo } from 'react';
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
  DollarSign,
  Plus,
  Trash2,
  Edit3,
  Search,
  Filter,
  Eye,
  X,
  PhoneCall,
  MapPin,
  RefreshCw,
  Box,
  BarChart3,
  Lock
} from 'lucide-react';

// --- قواعد بيانات أولية متكاملة ---
const INITIAL_PRODUCTS = [
  {
    id: 1,
    name: 'HEAVYWEIGHT OVERSIZED HOODIE',
    subName: 'NOIR EDITION • 480 GSM COTTON FLEECE',
    category: 'hoodies',
    price: 1850,
    cost: 720,
    stock: 48,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=80',
    description: 'ميلتون مصري فائق النعومة بوزن 480 جرام لكل متر مربع. خياطة مزدوجة مدعمة، قبعة مبطنة واسعة، وقصة أوفرسايز أوروبية بأكتاف ساقطة تمنحك حضوراً صلباً ومقاوماً للغسيل المتكرر دون وبر أو انكماش.',
    colors: ['#0A0A0A', '#383838', '#E5E5E5'],
    sizes: ['M', 'L', 'XL']
  },
  {
    id: 2,
    name: 'MINIMALIST WIDE-LEG SWEATPANTS',
    subName: 'RAW ASH • UNBRUSHED FRENCH TERRY',
    category: 'pants',
    price: 1450,
    cost: 580,
    stock: 34,
    image: 'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=1200&q=80',
    description: 'بنطال ميلتون واسع الأرجل بقصة ستريت وير مستقيمة، بدون أستك سفلي مع رباط قطني سميك وجيوب عميقة بسحابات مخفية لحفظ المقتنيات.',
    colors: ['#1F1F1F', '#5E5E5E'],
    sizes: ['S', 'M', 'L', 'XL']
  },
  {
    id: 3,
    name: 'SIGNATURE FULL TRACKSUIT SUIT',
    subName: 'COMPLETE OUTFIT • DENSE ARCHITECTURAL CUT',
    category: 'suits',
    price: 3100,
    cost: 1250,
    stock: 19,
    image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1200&q=80',
    description: 'بدلة كاملة مكونة من هودي قطن ثقيل وبنطال مطابق من نفس نسيج القطن الممشط الفاخر. توازن مثالي بين الراحة والفخامة البصرية لشوارع المدينة.',
    colors: ['#0A0A0A', '#1A1A1A'],
    sizes: ['M', 'L', 'XL']
  },
  {
    id: 4,
    name: 'DROP-SHOULDER BOX-FIT CREWNECK',
    subName: 'OFF-WHITE BLANC • 450 GSM DENSE KNIT',
    category: 'hoodies',
    price: 1650,
    cost: 650,
    stock: 22,
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
    description: 'سويت شيرت بقصة صندوقية عصرية بدون قبعة، تم تصميمه بياقة مضلعة سميكة لا ترتخي بمرور الوقت مع نسيج عالي المتانة بملمس ناعم جداً.',
    colors: ['#FFFFFF', '#E0E0E0'],
    sizes: ['S', 'M', 'L']
  }
];

const INITIAL_ORDERS = [
  {
    id: 'LM-9481',
    customer: 'م. أحمد محمود',
    phone: '01012345678',
    city: 'القاهرة - التجمع الخامس',
    address: 'شارع التسعين الشمالي، كمبوند ماونتن فيو',
    items: ['HEAVYWEIGHT HOODIE NOIR (L)', 'SWEATPANTS RAW ASH (L)'],
    total: 3300,
    status: 'مؤكد - بانتظار الشحن',
    courier: 'Bosta Express',
    date: '2026-10-25 11:20 AM',
    note: 'المعاينة قبل الدفع كاش'
  },
  {
    id: 'LM-9482',
    customer: 'يوسف العطار',
    phone: '01198765432',
    city: 'الجيزة - الشيخ زايد',
    address: 'بيفرلي هيلز، البوابة الثانية',
    items: ['SIGNATURE TRACKSUIT SUIT (XL)'],
    total: 3100,
    status: 'تم تسليم المندوب',
    courier: 'Mylerz Logistics',
    date: '2026-10-25 09:40 AM',
    note: 'الاتصال قبل الوصول بساعة'
  },
  {
    id: 'LM-9483',
    customer: 'عمر شريف',
    phone: '01255544433',
    city: 'الإسكندرية - سموحة',
    address: 'شارع فوزي معاذ، عمارة 14',
    items: ['CREWNECK OFF-WHITE (M)'],
    total: 1650,
    status: 'تم التحصيل والتسليم',
    courier: 'Aramex',
    date: '2026-10-24 04:15 PM',
    note: ''
  }
];

export default function App() {
  // حالة المظهر العام (ثيمات براند الشارع الفاخرة)
  const [theme, setTheme] = useState('noir');

  // المستخدم والجلسة الحالية
  const [session, setSession] = useState({
    user: 'gotrack777@gmail.com',
    role: 'OWNER',
    name: 'Ibrahim Bakry (مالك ومؤسس البراند)',
    permissions: ['all']
  });

  // التحكم في الشاشات
  const [view, setView] = useState('store'); // 'store', 'product_detail', 'calculator', 'cart', 'admin'
  const [adminSection, setAdminSection] = useState('overview'); // 'overview', 'products', 'orders', 'waybills', 'staff', 'finance'

  // البيانات التشغيلية مع إمكانية التعديل الحي
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [selectedProduct, setSelectedProduct] = useState(INITIAL_PRODUCTS[0]);
  const [cart, setCart] = useState([]);

  // حاسبة المقاسات
  const [height, setHeight] = useState(180);
  const [weight, setWeight] = useState(82);

  // إعدادات البوالص الحرارية
  const [waybillFormat, setWaybillFormat] = useState('4x6');
  const [activeOrderForWaybill, setActiveOrderForWaybill] = useState(INITIAL_ORDERS[0]);

  // نموذج إضافة منتج جديد في لوحة التحكم
  const [newProduct, setNewProduct] = useState({
    name: '',
    subName: '',
    category: 'hoodies',
    price: '',
    cost: '',
    stock: '',
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=80',
    description: ''
  });

  // نموذج إتمام الطلب (COD)
  const [orderForm, setOrderForm] = useState({
    name: '',
    phone: '',
    city: 'القاهرة',
    address: '',
    notes: 'الدفع نقداً عند الاستلام بعد المعاينة'
  });

  // مصادقة الدخول للوحة التحكم
  const [isLoginModal, setIsLoginModal] = useState(false);
  const [loginEmail, setLoginEmail] = useState('gotrack777@gmail.com');
  const [loginPassword, setLoginPassword] = useState('123456789');
  const [loginRole, setLoginRole] = useState('OWNER');
  const [loginError, setLoginError] = useState('');

  // استنتاج توصية المقاس الذكي
  const recommendedSize = useMemo(() => {
    if (weight < 65) return { size: 'S', fit: 'OVERSIZED RELAXED', note: 'سقوط مثالي للأكتاف دون اتساع مفرط' };
    if (weight <= 78) return { size: 'M', fit: 'STANDARD STREET DROP', note: 'قصة ستريت وير متزنة وعصرية جداً' };
    if (weight <= 92) return { size: 'L', fit: 'SIGNATURE HEAVY OVERSIZED', note: 'الإطلالة التحريرية المميزة لبراند LOOM' };
    return { size: 'XL', fit: 'BOX-FIT EXTRA HEAVY', note: 'راحة قصوى ومظهر ضخم صلب' };
  }, [height, weight]);

  // الحسابات المالية اللحظية
  const financialStats = useMemo(() => {
    const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
    const estimatedCOGS = orders.reduce((acc, order) => acc + (order.total * 0.42), 0);
    const shippingCosts = orders.length * 85;
    const netProfit = totalRevenue - (estimatedCOGS + shippingCosts);
    const totalInventoryValue = products.reduce((acc, p) => acc + (p.cost * p.stock), 0);
    return { totalRevenue, estimatedCOGS, shippingCosts, netProfit, totalInventoryValue };
  }, [orders, products]);

  // تدرجات الألوان والتصميم حسب الثيم المختار
  const t = {
    noir: {
      bg: 'bg-[#0a0a0a]',
      surface: 'bg-[#121212]',
      surfaceAlt: 'bg-[#181818]',
      border: 'border-[#262626]',
      text: 'text-white',
      muted: 'text-neutral-400',
      accent: 'bg-white text-black hover:bg-neutral-200',
      pill: 'bg-neutral-900 border-neutral-800 text-neutral-300'
    },
    ash: {
      bg: 'bg-[#1b1c1d]',
      surface: 'bg-[#252729]',
      surfaceAlt: 'bg-[#2f3235]',
      border: 'border-[#383d42]',
      text: 'text-[#f0f2f5]',
      muted: 'text-[#9ca3af]',
      accent: 'bg-[#e5e7eb] text-black hover:bg-white',
      pill: 'bg-[#2a2d30] border-[#3e4348] text-[#d1d5db]'
    },
    blanc: {
      bg: 'bg-[#f7f7f8]',
      surface: 'bg-white',
      surfaceAlt: 'bg-[#f0f0f2]',
      border: 'border-[#e0e0e4]',
      text: 'text-[#0f1115]',
      muted: 'text-[#6b7280]',
      accent: 'bg-[#0f1115] text-white hover:bg-black',
      pill: 'bg-stone-100 border-stone-200 text-stone-800'
    }
  }[theme];

  // إدارة المنتجات في السلة
  const addToCart = (product, selectedSize = 'L') => {
    setCart(prev => [...prev, { ...product, cartId: Date.now(), selectedSize }]);
  };

  const removeFromCart = (cartId) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  // تسجيل الدخول
  const handleAuth = (e) => {
    e.preventDefault();
    if (loginEmail === 'gotrack777@gmail.com' && loginPassword === '123456789') {
      setSession({
        user: loginEmail,
        role: loginRole,
        name: loginRole === 'OWNER' ? 'Ibrahim Bakry (مالك المتجر)' : `${loginRole} Staff`,
        permissions: loginRole === 'OWNER' ? ['all'] : ['limited']
      });
      setIsLoginModal(false);
      setLoginError('');
      setView('admin');
    } else {
      setLoginError('البريد الإلكتروني أو كلمة المرور غير صحيحة.');
    }
  };

  // إضافة منتج جديد
  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.price) return;
    const item = {
      id: Date.now(),
      name: newProduct.name.toUpperCase(),
      subName: newProduct.subName || 'STREETWEAR COLLECTION',
      category: newProduct.category,
      price: Number(newProduct.price),
      cost: Number(newProduct.cost) || Number(newProduct.price) * 0.4,
      stock: Number(newProduct.stock) || 10,
      image: newProduct.image,
      description: newProduct.description || 'خامات ميلتون ثقيلة معالجة لبراند لووم ستوديوز.',
      colors: ['#0A0A0A'],
      sizes: ['M', 'L', 'XL']
    };
    setProducts([item, ...products]);
    setNewProduct({ name: '', subName: '', category: 'hoodies', price: '', cost: '', stock: '', image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=80', description: '' });
    alert('تم إضافة المنتج وتحديث الكتالوج فوراً!');
  };

  // تأكيد الطلب
  const handleConfirmOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    const newOrder = {
      id: `LM-${Math.floor(1000 + Math.random() * 9000)}`,
      customer: orderForm.name,
      phone: orderForm.phone,
      city: orderForm.city,
      address: orderForm.address,
      items: cart.map(i => `${i.name} (${i.selectedSize})`),
      total: cart.reduce((sum, i) => sum + i.price, 0),
      status: 'مؤكد - بانتظار الشحن',
      courier: 'Bosta Express',
      date: 'الآن',
      note: orderForm.notes
    };
    setOrders([newOrder, ...orders]);
    setCart([]);
    alert(`شكراً لك! تم استلام طلبك برقم ${newOrder.id}. سيتم التجهيز والتوصيل خلال 24 إلى 48 ساعة والدفع عند الاستلام.`);
    setView('store');
  };

  return (
    <div className={`min-h-screen ${t.bg} ${t.text} font-sans selection:bg-neutral-500 selection:text-white transition-colors duration-300`}>
      {/* 1. الشريط العلوي العام */}
      <div className={`border-b ${t.border} ${t.surface} px-4 py-2 text-[11px] font-mono tracking-widest flex flex-wrap justify-between items-center gap-2`}>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>LOOM STUDIOS • 480 GSM HEAVYWEIGHT MILTON ARCHIVE</span>
        </div>

        <div className="flex items-center gap-4">
          {/* اختيار الثيمات البصرية */}
          <div className="flex items-center gap-1 border border-neutral-700/60 rounded px-1.5 py-0.5">
            <span className="text-[9px] uppercase text-neutral-400 mr-1">THEME:</span>
            <button onClick={() => setTheme('noir')} className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition ${theme === 'noir' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'}`}>Noir</button>
            <button onClick={() => setTheme('ash')} className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition ${theme === 'ash' ? 'bg-[#9ca3af] text-black' : 'text-neutral-400 hover:text-white'}`}>Ash</button>
            <button onClick={() => setTheme('blanc')} className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition ${theme === 'blanc' ? 'bg-black text-white' : 'text-neutral-400 hover:text-white'}`}>Blanc</button>
          </div>

          {/* معلومات الدخول */}
          <button
            onClick={() => {
              if (session.user) {
                setView(view === 'admin' ? 'store' : 'admin');
              } else {
                setIsLoginModal(true);
              }
            }}
            className="flex items-center gap-1.5 text-[10px] uppercase font-bold tracking-wider hover:underline text-amber-400"
          >
            <ShieldCheck size={13} />
            {session.user ? `${session.role} CONSOLE` : 'STAFF LOGIN'}
          </button>
        </div>
      </div>

      {/* 2. هيدر الموقع - طراز زارا التحريري (Zara Minimalist Nav) */}
      <header className={`sticky top-0 z-40 border-b ${t.border} ${t.bg}/90 backdrop-blur-md px-6 md:px-12 py-5 flex items-center justify-between`}>
        <div className="flex items-center gap-10">
          <button onClick={() => setView('store')} className="text-2xl md:text-3xl font-serif font-black tracking-[0.35em] uppercase">
            LOOM STUDIOS
          </button>
          <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-[0.2em] font-medium text-neutral-400">
            <button onClick={() => setView('store')} className={view === 'store' ? `${t.text} font-bold` : 'hover:text-white transition'}>الكتالوج (Archive)</button>
            <button onClick={() => setView('calculator')} className={view === 'calculator' ? `${t.text} font-bold` : 'hover:text-white transition'}>حاسبة المقاسات (Size Lab)</button>
            {session.user && (
              <button onClick={() => setView('admin')} className={`flex items-center gap-1.5 ${view === 'admin' ? 'text-amber-400 font-bold' : 'text-amber-400/80 hover:text-amber-300 transition'}`}>
                <Box size={14} /> لوحة التحكم والمخزون
              </button>
            )}
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <button onClick={() => setView('calculator')} className="text-xs uppercase tracking-widest hidden sm:inline-block border-b border-current pb-0.5">
            دليل المقاسات
          </button>

          <button
            onClick={() => setView('cart')}
            className={`relative p-2.5 rounded-full border ${t.border} hover:border-neutral-400 transition flex items-center justify-center`}
          >
            <ShoppingBag size={18} />
            {cart.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-400 text-black text-[10px] font-mono font-black w-5 h-5 rounded-full flex items-center justify-center">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* 3. الشاشة الرئيسية: الكتالوج التحريري المتكامل */}
      {view === 'store' && (
        <div>
          {/* بانر سنيمائي راقٍ */}
          <section className="relative border-b border-neutral-800 bg-neutral-950 py-20 px-6 md:px-12 overflow-hidden">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="space-y-4 max-w-xl">
                <span className="text-xs font-mono tracking-[0.3em] uppercase text-neutral-400 block">Heavyweight Streetwear / Cairo & Giza</span>
                <h1 className="text-4xl md:text-6xl font-serif font-light tracking-tight leading-tight">
                  ORIGINAL 480 GSM MILTON ARCHIVE
                </h1>
                <p className="text-sm text-neutral-400 leading-relaxed font-light">
                  تصميمات معمارية مستوحاة من ثقافة أزياء الشارع العالمية مع نسيج ميلتون مصري خالص ثقيل الوزن، معالج لمقاومة الانكماش، مع إمكانية المعاينة والقياس عند الاستلام.
                </p>
                <div className="pt-4 flex items-center gap-4">
                  <button onClick={() => {
                    const el = document.getElementById('catalog-grid');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }} className={`px-8 py-3 text-xs uppercase tracking-[0.2em] font-bold ${t.accent} transition`}>
                    تصفح المجموعة
                  </button>
                  <button onClick={() => setView('calculator')} className={`px-6 py-3 text-xs uppercase tracking-[0.2em] border ${t.border} hover:border-white transition`}>
                    احسب مقاسك بدقة
                  </button>
                </div>
              </div>
              <div className="w-full md:w-1/3 aspect-[3/4] bg-neutral-900 border border-neutral-800 overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80"
                  alt="Featured Outfit"
                  className="w-full h-full object-cover grayscale contrast-125 hover:scale-105 transition duration-1000"
                />
              </div>
            </div>
          </section>

          {/* شبكة المنتجات الكاملة */}
          <section id="catalog-grid" className="max-w-7xl mx-auto px-6 py-16 space-y-12">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-neutral-800 pb-6 gap-4">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-neutral-500 uppercase">Archive Items ({products.length})</span>
                <h2 className="text-3xl font-serif mt-1">القطع المتوفرة للشحن الفوري</h2>
              </div>
              <div className="text-xs text-neutral-400 flex items-center gap-2">
                <Truck size={15} /> شحن وتوصيل بالقاهرة والجيزة خلال 24-48 ساعة مع المعاينة
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {products.map((item) => (
                <div
                  key={item.id}
                  className={`group border ${t.border} ${t.surface} p-4 flex flex-col justify-between transition duration-300 hover:border-neutral-500`}
                >
                  <div
                    onClick={() => { setSelectedProduct(item); setView('product_detail'); }}
                    className="cursor-pointer overflow-hidden aspect-[3/4] mb-4 bg-neutral-900 relative"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover grayscale contrast-125 group-hover:scale-105 group-hover:grayscale-0 transition duration-700"
                    />
                    <div className="absolute top-2 right-2 bg-black/80 px-2 py-0.5 text-[9px] font-mono uppercase text-white border border-neutral-800">
                      {item.stock > 0 ? `In Stock: ${item.stock}` : 'Sold Out'}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <span className="text-[9px] font-mono tracking-widest uppercase text-neutral-500 block">{item.subName}</span>
                    <h3
                      onClick={() => { setSelectedProduct(item); setView('product_detail'); }}
                      className="text-xs font-bold tracking-widest uppercase cursor-pointer hover:underline"
                    >
                      {item.name}
                    </h3>
                    <div className="flex justify-between items-center pt-2 border-t border-neutral-800/80">
                      <span className="font-mono text-sm font-bold">{item.price} EGP</span>
                      <button
                        onClick={() => addToCart(item, 'L')}
                        className={`text-[10px] uppercase tracking-widest px-4 py-2 ${t.accent} font-bold transition`}
                      >
                        إضافة للحقيبة
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* 4. صفحة تفاصيل المنتج الكاملة */}
      {view === 'product_detail' && selectedProduct && (
        <section className="max-w-6xl mx-auto px-6 py-12">
          <button onClick={() => setView('store')} className="text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white mb-8 flex items-center gap-1">
            ← العودة للكتالوج
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="aspect-[3/4] bg-neutral-900 border border-neutral-800 overflow-hidden shadow-2xl">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-full object-cover contrast-110"
              />
            </div>

            <div className="space-y-8 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-neutral-500">{selectedProduct.subName}</span>
                <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-wider">{selectedProduct.name}</h1>
                <p className="text-2xl font-mono font-bold text-amber-400">{selectedProduct.price} EGP</p>
                <p className="text-sm text-neutral-300 leading-relaxed font-light border-y border-neutral-800 py-4">
                  {selectedProduct.description}
                </p>

                {/* مقاسات المنتج */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-mono">
                    <span>المقاس المتاح:</span>
                    <button onClick={() => setView('calculator')} className="underline text-amber-400">حاسبة المقاس المناسب</button>
                  </div>
                  <div className="flex gap-2">
                    {selectedProduct.sizes.map((s) => (
                      <button key={s} className="px-4 py-2 border border-neutral-700 text-xs font-mono hover:border-white font-bold">
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-neutral-900/60 border border-neutral-800 text-xs space-y-1.5 font-mono text-neutral-300">
                  <div className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-400" /> معاينة كاملة ومطابقة خامات قبل استلام الأوردر</div>
                  <div className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-400" /> دفع عند الاستلام (COD) نقداً مع المندوب</div>
                  <div className="flex items-center gap-2"><CheckCircle size={14} className="text-emerald-400" /> خامات مصرية أصلية ثقيلة 480 جرام غير مخلوطة ببوليستر رديء</div>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => { addToCart(selectedProduct, 'L'); setView('cart'); }}
                  className={`flex-1 py-4 text-xs uppercase tracking-[0.2em] font-bold ${t.accent} transition`}
                >
                  شراء الآن والدفع عند الاستلام
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 5. حاسبة المقاسات التفاعلية المتقدمة */}
      {view === 'calculator' && (
        <section className="max-w-3xl mx-auto px-6 py-16">
          <div className={`p-8 md:p-12 border ${t.border} ${t.surface} space-y-10 shadow-2xl`}>
            <div className="border-b border-neutral-800 pb-6 text-center space-y-2">
              <span className="text-xs font-mono tracking-widest uppercase text-neutral-500">Interactive Precision Size Lab</span>
              <h2 className="text-3xl font-serif font-bold">حاسبة مقاسات ميلتون LOOM STUDIOS</h2>
              <p className="text-xs text-neutral-400 max-w-md mx-auto">
                اضبط طولك ووزنك بالأسفل لحساب المقاس الهندسي الذي يمنحك التوازن المطلوب لقصة الأوفرسايز دون ترهل أو ضيق.
              </p>
            </div>

            <div className="space-y-8">
              {/* شريط الطول */}
              <div className="space-y-3">
                <div className="flex justify-between text-xs font-mono">
                  <span>الطول (Height):</span>
                  <span className="text-sm font-bold text-amber-400">{height} cm</span>
                </div>
                <input
                  type="range"
                  min="155"
                  max="205"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full accent-white h-2 bg-neutral-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* شريط الوزن */}
              <div className="space-y-3">
                <div className="flex justify-between text-xs font-mono">
                  <span>الوزن (Weight):</span>
                  <span className="text-sm font-bold text-amber-400">{weight} kg</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="130"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="w-full accent-white h-2 bg-neutral-800 rounded-lg cursor-pointer"
                />
              </div>

              {/* نتيجة التوصية */}
              <div className="p-8 border-2 border-neutral-700 bg-black/60 text-center space-y-4 rounded">
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-neutral-400 block">المقاس المثالي المعتمد لجسمك</span>
                <p className="text-5xl font-serif font-black tracking-widest text-emerald-400">{recommendedSize.size}</p>
                <div className="inline-block px-3 py-1 bg-neutral-800 text-[10px] font-mono tracking-wider text-neutral-300 uppercase">
                  {recommendedSize.fit}
                </div>
                <p className="text-xs text-neutral-300 pt-2 font-mono">
                  💡 {recommendedSize.note}
                </p>
              </div>

              <div className="text-center pt-4">
                <button
                  onClick={() => setView('store')}
                  className={`px-8 py-3 text-xs uppercase tracking-widest font-bold ${t.accent} transition`}
                >
                  الذهاب للمتجر واختيار القطع بمقاسك
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 6. سلة التسوق وإنهاء الطلب (COD) */}
      {view === 'cart' && (
        <section className="max-w-4xl mx-auto px-6 py-12">
          <h2 className="text-3xl font-serif font-bold mb-8 border-b border-neutral-800 pb-4">حقيبة التسوق والطلب</h2>

          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <ShoppingBag size={48} className="mx-auto text-neutral-600" />
              <p className="text-sm text-neutral-400">حقيبة التسوق فارغة حالياً.</p>
              <button onClick={() => setView('store')} className={`px-6 py-2.5 text-xs font-bold uppercase tracking-widest ${t.accent}`}>
                تصفح الكتالوج الآن
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* قائمة العناصر في السلة */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400">القطع المختارة ({cart.length})</h3>
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.cartId} className={`p-4 border ${t.border} ${t.surface} flex justify-between items-center gap-4`}>
                      <img src={item.image} alt={item.name} className="w-14 h-18 object-cover grayscale" />
                      <div className="flex-1">
                        <h4 className="text-xs font-bold uppercase">{item.name}</h4>
                        <span className="text-[10px] font-mono text-neutral-400 block">مقاس: {item.selectedSize}</span>
                        <span className="text-xs font-mono font-bold mt-1 block">{item.price} EGP</span>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.cartId)}
                        className="text-neutral-500 hover:text-red-400 p-2"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="border-t border-neutral-800 pt-4 space-y-2 text-xs font-mono">
                  <div className="flex justify-between text-neutral-400">
                    <span>قيمة المشتريات:</span>
                    <span>{cart.reduce((s, i) => s + i.price, 0)} EGP</span>
                  </div>
                  <div className="flex justify-between text-neutral-400">
                    <span>الشحن السريع (القاهرة والجيزة):</span>
                    <span className="text-emerald-400 font-bold">مجاني</span>
                  </div>
                  <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-neutral-800">
                    <span>الإجمالي المستحق كاش عند الاستلام:</span>
                    <span className="text-amber-400">{cart.reduce((s, i) => s + i.price, 0)} EGP</span>
                  </div>
                </div>
              </div>

              {/* فورم بيانات العميل للدفع عند الاستلام */}
              <form onSubmit={handleConfirmOrder} className={`p-6 border ${t.border} ${t.surface} space-y-4`}>
                <h3 className="text-xs font-mono uppercase tracking-widest text-neutral-400">بيانات التوصيل والشحن (COD)</h3>

                <div>
                  <label className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">اسم العميل الثلاثي</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: أحمد محمود علي"
                    value={orderForm.name}
                    onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-white"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">رقم الهاتف (واتساب متاح)</label>
                  <input
                    type="tel"
                    required
                    placeholder="01012345678"
                    value={orderForm.phone}
                    onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-white font-mono"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">المحافظة</label>
                  <select
                    value={orderForm.city}
                    onChange={(e) => setOrderForm({ ...orderForm, city: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-white"
                  >
                    <option value="القاهرة">القاهرة</option>
                    <option value="الجيزة">الجيزة</option>
                    <option value="الإسكندرية">الإسكندرية</option>
                    <option value="أخرى">محافظة أخرى</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">العنوان التفصيلي (المنطقة، الشارع، العمارة)</label>
                  <textarea
                    required
                    rows={2}
                    placeholder="مثال: التجمع الخامس، الحي الثاني، شارع التسعين، عمارة 45"
                    value={orderForm.address}
                    onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-xs text-white focus:outline-none focus:border-white"
                  />
                </div>

                <div className="p-3 bg-neutral-900 border border-neutral-800 text-[11px] font-mono text-neutral-400">
                  📦 سياسة LOOM STUDIOS: يحق لك فتح الشحنة ومعاينة خامات الميلتون والتأكد من المقاس قبل دفع أي مبلغ للمندوب.
                </div>

                <button
                  type="submit"
                  className={`w-full py-3.5 text-xs uppercase tracking-widest font-bold ${t.accent} transition`}
                >
                  تأكيد الأوردر الآن (دفع عند الاستلام)
                </button>
              </form>
            </div>
          )}
        </section>
      )}

      {/* 7. لوحة تحكم الإدارة الكاملة (Full CMS Engine) */}
      {view === 'admin' && (
        <section className="max-w-7xl mx-auto px-6 py-10 space-y-8">
          {/* هيدر لوحة التحكم */}
          <div className={`p-6 border ${t.border} ${t.surface} flex flex-col md:flex-row justify-between items-start md:items-center gap-4`}>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-amber-400 text-black text-[10px] font-mono font-bold uppercase rounded">
                  {session.role} MODE
                </span>
                <span className="text-xs font-mono text-neutral-400">• الحساب: {session.user}</span>
              </div>
              <h2 className="text-2xl font-serif font-bold mt-1">مركز القيادة والتحكم الإداري</h2>
            </div>

            {/* أزرار التنقل بين أقسام الإدارة */}
            <div className="flex flex-wrap gap-2 text-xs font-mono">
              <button
                onClick={() => setAdminSection('overview')}
                className={`px-3 py-1.5 border ${adminSection === 'overview' ? 'bg-white text-black font-bold' : `${t.border} hover:border-neutral-500`}`}
              >
                نظرة عامة والمالية
              </button>
              <button
                onClick={() => setAdminSection('products')}
                className={`px-3 py-1.5 border ${adminSection === 'products' ? 'bg-white text-black font-bold' : `${t.border} hover:border-neutral-500`}`}
              >
                إدارة المخزون والمنتجات
              </button>
              <button
                onClick={() => setAdminSection('orders')}
                className={`px-3 py-1.5 border ${adminSection === 'orders' ? 'bg-white text-black font-bold' : `${t.border} hover:border-neutral-500`}`}
              >
                الطلبات والشحن ({orders.length})
              </button>
              <button
                onClick={() => setAdminSection('waybills')}
                className={`px-3 py-1.5 border ${adminSection === 'waybills' ? 'bg-white text-black font-bold' : `${t.border} hover:border-neutral-500`}`}
              >
                استوديو بوالص الشحن الحرارية
              </button>
              <button
                onClick={() => setAdminSection('staff')}
                className={`px-3 py-1.5 border ${adminSection === 'staff' ? 'bg-white text-black font-bold' : `${t.border} hover:border-neutral-500`}`}
              >
                أداء فريق العمل
              </button>
            </div>
          </div>

          {/* قسم: نظرة عامة والمالية */}
          {adminSection === 'overview' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className={`p-5 border ${t.border} ${t.surface}`}>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase">إجمالي إيرادات المبيعات (Revenue)</span>
                  <p className="text-3xl font-mono font-bold mt-2 text-white">{financialStats.totalRevenue.toLocaleString()} EGP</p>
                  <span className="text-[10px] text-emerald-400 mt-1 block">↑ نشط من مبيعات الشتاء</span>
                </div>

                <div className={`p-5 border ${t.border} ${t.surface}`}>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase">تكلفة التصنيع والخامات (COGS)</span>
                  <p className="text-3xl font-mono font-bold mt-2 text-neutral-400">{Math.round(financialStats.estimatedCOGS).toLocaleString()} EGP</p>
                  <span className="text-[10px] text-neutral-500 mt-1 block">ميلتون 480 جرام وخياطة</span>
                </div>

                <div className={`p-5 border ${t.border} ${t.surface}`}>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase">قيمة المخزون الإجمالي المتاح</span>
                  <p className="text-3xl font-mono font-bold mt-2 text-amber-400">{financialStats.totalInventoryValue.toLocaleString()} EGP</p>
                  <span className="text-[10px] text-neutral-500 mt-1 block">{products.reduce((a, b) => a + b.stock, 0)} قطعة بالمستودع</span>
                </div>

                <div className="p-5 border border-emerald-800 bg-emerald-950/20">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase">صافي الأرباح المحققة (Net Profit)</span>
                  <p className="text-3xl font-mono font-bold mt-2 text-emerald-400">{Math.round(financialStats.netProfit).toLocaleString()} EGP</p>
                  <span className="text-[10px] text-emerald-500/80 mt-1 block">هامش ربح ممتاز (~55%)</span>
                </div>
              </div>
            </div>
          )}

          {/* قسم: إدارة المخزون وإضافة منتج جديد (CRUD) */}
          {adminSection === 'products' && (
            <div className="space-y-8">
              {/* فورم إضافة منتج جديد */}
              <form onSubmit={handleAddProduct} className={`p-6 border ${t.border} ${t.surface} space-y-4`}>
                <h3 className="text-sm font-bold uppercase tracking-wider flex items-center gap-2">
                  <Plus size={16} /> إضافة قطعة ميلتون جديدة للمتجر فوراً
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                  <div>
                    <label className="text-[10px] text-neutral-400 block mb-1">اسم المنتج</label>
                    <input
                      type="text"
                      required
                      placeholder="مثال: VINTAGE NOIR HOODIE"
                      value={newProduct.name}
                      onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-700 p-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-neutral-400 block mb-1">البيان الفرعي والوزن</label>
                    <input
                      type="text"
                      placeholder="مثال: 480 GSM MILTON ARCHIVE"
                      value={newProduct.subName}
                      onChange={(e) => setNewProduct({ ...newProduct, subName: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-700 p-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-neutral-400 block mb-1">القسم</label>
                    <select
                      value={newProduct.category}
                      onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-700 p-2 text-white"
                    >
                      <option value="hoodies">هوديز (Hoodies)</option>
                      <option value="pants">سويت بانتس (Pants)</option>
                      <option value="suits">بدل كاملة (Full Suits)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] text-neutral-400 block mb-1">سعر البيع (EGP)</label>
                    <input
                      type="number"
                      required
                      placeholder="1850"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-700 p-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-neutral-400 block mb-1">تكلفة التصنيع (Cost)</label>
                    <input
                      type="number"
                      placeholder="720"
                      value={newProduct.cost}
                      onChange={(e) => setNewProduct({ ...newProduct, cost: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-700 p-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-neutral-400 block mb-1">الكمية بالمخزن</label>
                    <input
                      type="number"
                      placeholder="30"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                      className="w-full bg-neutral-900 border border-neutral-700 p-2 text-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button type="submit" className={`px-6 py-2.5 text-xs font-bold uppercase tracking-widest ${t.accent}`}>
                    حفظ ونشر في الموقع
                  </button>
                </div>
              </form>

              {/* جدول المنتجات الموجودة */}
              <div className={`border ${t.border} overflow-x-auto`}>
                <table className="w-full text-xs font-mono text-left">
                  <thead className={`border-b ${t.border} ${t.surfaceAlt} text-neutral-400 uppercase text-[10px]`}>
                    <tr>
                      <th className="p-3">المنتج</th>
                      <th className="p-3">السعر</th>
                      <th className="p-3">التكلفة</th>
                      <th className="p-3">المخزون</th>
                      <th className="p-3">الربح للقطعة</th>
                      <th className="p-3 text-right">إجراء</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-800">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-neutral-900/40">
                        <td className="p-3 flex items-center gap-3">
                          <img src={p.image} alt={p.name} className="w-8 h-10 object-cover" />
                          <span className="font-bold">{p.name}</span>
                        </td>
                        <td className="p-3 font-bold">{p.price} EGP</td>
                        <td className="p-3 text-neutral-400">{p.cost} EGP</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] ${p.stock < 20 ? 'bg-amber-950 text-amber-300' : 'bg-neutral-800'}`}>
                            {p.stock} قطعة
                          </span>
                        </td>
                        <td className="p-3 text-emerald-400 font-bold">+{p.price - p.cost} EGP</td>
                        <td className="p-3 text-right">
                          <button
                            onClick={() => setProducts(products.filter(item => item.id !== p.id))}
                            className="text-neutral-500 hover:text-red-400"
                          >
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* قسم: إدارة الطلبات والشحن */}
          {adminSection === 'orders' && (
            <div className={`border ${t.border} overflow-x-auto`}>
              <table className="w-full text-xs font-mono text-left">
                <thead className={`border-b ${t.border} ${t.surfaceAlt} text-neutral-400 uppercase text-[10px]`}>
                  <tr>
                    <th className="p-3">رقم الطلب</th>
                    <th className="p-3">العميل والموقع</th>
                    <th className="p-3">القطع</th>
                    <th className="p-3">المبلغ (COD)</th>
                    <th className="p-3">الحالة</th>
                    <th className="p-3">شركة الشحن</th>
                    <th className="p-3 text-right">بوليصة الشحن</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-neutral-900/40">
                      <td className="p-3 font-bold text-amber-400">{ord.id}</td>
                      <td className="p-3">
                        <div className="font-bold text-white">{ord.customer}</div>
                        <div className="text-[10px] text-neutral-500">{ord.phone} • {ord.city}</div>
                      </td>
                      <td className="p-3 text-[11px] text-neutral-300">{ord.items.join(', ')}</td>
                      <td className="p-3 font-bold">{ord.total} EGP</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded text-[10px] bg-neutral-800 border border-neutral-700">
                          {ord.status}
                        </span>
                      </td>
                      <td className="p-3">{ord.courier}</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => {
                            setActiveOrderForWaybill(ord);
                            setAdminSection('waybills');
                          }}
                          className="px-2.5 py-1 bg-white text-black font-bold text-[10px] uppercase hover:bg-neutral-200"
                        >
                          معاينة وطباعة
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* قسم: استوديو بوالص الشحن الحرارية المتقدم */}
          {adminSection === 'waybills' && (
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-neutral-800 pb-4">
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-neutral-400">مقاس البوليصة الحرارية:</span>
                  <button
                    onClick={() => setWaybillFormat('4x6')}
                    className={`px-3 py-1 border ${waybillFormat === '4x6' ? 'bg-white text-black font-bold' : 'border-neutral-800'}`}
                  >
                    4×6 Standard Thermal
                  </button>
                  <button
                    onClick={() => setWaybillFormat('a4')}
                    className={`px-3 py-1 border ${waybillFormat === 'a4' ? 'bg-white text-black font-bold' : 'border-neutral-800'}`}
                  >
                    A4 Multi-sheet
                  </button>
                  <button
                    onClick={() => setWaybillFormat('a6')}
                    className={`px-3 py-1 border ${waybillFormat === 'a6' ? 'bg-white text-black font-bold' : 'border-neutral-800'}`}
                  >
                    A6 Compact Sticker
                  </button>
                </div>

                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs px-5 py-2 font-bold transition"
                >
                  <Printer size={15} /> طباعة البوليصة الحرارية للطابعة
                </button>
              </div>

              {/* ورقة البوليصة القابلة للطباعة */}
              <div className="flex justify-center p-8 bg-neutral-900/60 border border-neutral-800">
                <div
                  className={`bg-white text-black p-6 font-mono text-xs border-2 border-black shadow-2xl ${
                    waybillFormat === '4x6' ? 'w-[400px]' : waybillFormat === 'a4' ? 'w-[560px]' : 'w-[320px]'
                  }`}
                >
                  {/* رأس البوليصة */}
                  <div className="border-b-2 border-black pb-3 text-center">
                    <h3 className="text-2xl font-black tracking-[0.25em] uppercase">LOOM STUDIOS</h3>
                    <p className="text-[10px] font-bold tracking-widest">STREETWEAR ARCHIVE • COD OFFICIAL DISPATCH</p>
                  </div>

                  {/* بيانات شركة الشحن والباركود */}
                  <div className="grid grid-cols-2 gap-2 border-b-2 border-black py-3 text-[11px]">
                    <div>
                      <span className="font-bold block text-[9px] uppercase text-neutral-600">رقم البوليصة / AWB</span>
                      <span className="font-bold text-base">{activeOrderForWaybill.id}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold block text-[9px] uppercase text-neutral-600">شركة الشحن المعينة</span>
                      <span className="font-bold text-sm">{activeOrderForWaybill.courier}</span>
                    </div>
                  </div>

                  {/* باركود رمزي */}
                  <div className="py-3 text-center border-b border-black">
                    <div className="h-10 bg-neutral-900 w-full flex items-center justify-around px-2 text-[8px] text-white tracking-[0.5em]">
                      ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
                    </div>
                    <span className="text-[9px] text-neutral-600 tracking-widest mt-1 block">*{activeOrderForWaybill.id}*</span>
                  </div>

                  {/* بيانات العميل */}
                  <div className="border-b-2 border-black py-3 space-y-1.5">
                    <span className="font-bold block text-sm">بيانات المرسل إليه (Customer):</span>
                    <div>الاسم: <strong className="text-sm">{activeOrderForWaybill.customer}</strong></div>
                    <div>الهاتف: <strong className="font-bold">{activeOrderForWaybill.phone}</strong></div>
                    <div>العنوان: <span>{activeOrderForWaybill.address}</span></div>
                    <div>المدينة: <strong>{activeOrderForWaybill.city}</strong></div>
                  </div>

                  {/* محتويات الشحنة */}
                  <div className="border-b-2 border-black py-3 space-y-1">
                    <span className="font-bold block text-[10px] uppercase text-neutral-600">محتويات الطرد:</span>
                    {activeOrderForWaybill.items.map((it, idx) => (
                      <div key={idx} className="font-bold">• {it}</div>
                    ))}
                  </div>

                  {/* المبلغ المطلوب تحصيله كاش */}
                  <div className="pt-3 pb-2 flex justify-between items-center text-sm">
                    <span className="font-bold">المطلوب تحصيله كاش (COD):</span>
                    <span className="text-2xl font-black">{activeOrderForWaybill.total} EGP</span>
                  </div>

                  <div className="border-t border-dashed border-black pt-2 text-center text-[10px] font-bold">
                    *** مسموح بالمعاينة والقياس بحضور المندوب قبل السداد ***
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* قسم: أداء الموظفين وخدمة العملاء */}
          {adminSection === 'staff' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={`p-6 border ${t.border} ${t.surface} space-y-4`}>
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-sm">كريم عادل (Logistics Officer)</h4>
                  <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded">KPI: 97%</span>
                </div>
                <div className="space-y-2 text-xs font-mono text-neutral-400">
                  <div className="flex justify-between"><span>الشحنات المطبوعة اليوم:</span><strong className="text-white">46 بوليصة</strong></div>
                  <div className="flex justify-between"><span>زمن تسليم المندوب:</span><strong className="text-white">18 دقيقة</strong></div>
                  <div className="flex justify-between"><span>أخطاء الشحن:</span><strong className="text-emerald-400">0%</strong></div>
                </div>
              </div>

              <div className={`p-6 border ${t.border} ${t.surface} space-y-4`}>
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-sm">سارة ناصر (Support & WhatsApp)</h4>
                  <span className="text-[10px] font-mono bg-emerald-950 text-emerald-300 px-2 py-0.5 rounded">KPI: 99%</span>
                </div>
                <div className="space-y-2 text-xs font-mono text-neutral-400">
                  <div className="flex justify-between"><span>محادثات تأكيد المقاس:</span><strong className="text-white">72 عميل</strong></div>
                  <div className="flex justify-between"><span>متوسط وقت الرد:</span><strong className="text-white">45 ثانية</strong></div>
                  <div className="flex justify-between"><span>رضا العملاء (CSAT):</span><strong className="text-emerald-400">5.0 / 5.0</strong></div>
                </div>
              </div>

              <div className={`p-6 border ${t.border} ${t.surface} space-y-4`}>
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-sm">عمر سمير (Sales Coordinator)</h4>
                  <span className="text-[10px] font-mono bg-amber-950 text-amber-300 px-2 py-0.5 rounded">KPI: 91%</span>
                </div>
                <div className="space-y-2 text-xs font-mono text-neutral-400">
                  <div className="flex justify-between"><span>أوردرات مؤكدة واتساب:</span><strong className="text-white">31 أوردر</strong></div>
                  <div className="flex justify-between"><span>نسبة الإغلاق (Conversion):</span><strong className="text-white">4.2%</strong></div>
                  <div className="flex justify-between"><span>معدل المرتجعات:</span><strong className="text-emerald-400">منخفض جداً</strong></div>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* 8. نافذة تسجيل الدخول للمالك والموظفين */}
      {isLoginModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className={`max-w-md w-full border ${t.border} ${t.surface} p-8 space-y-6 shadow-2xl`}>
            <div className="border-b border-neutral-800 pb-3 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-mono uppercase text-neutral-400">Staff & Owner Portal</span>
                <h3 className="text-xl font-serif font-bold mt-1">تسجيل الدخول للنظام</h3>
              </div>
              <button onClick={() => setIsLoginModal(false)} className="text-neutral-500 hover:text-white">
                <X size={18} />
              </button>
            </div>

            {loginError && (
              <div className="p-3 bg-red-950/40 border border-red-800 text-red-300 text-xs font-mono">
                {loginError}
              </div>
            )}

            <form onSubmit={handleAuth} className="space-y-4">
              <div>
                <label className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">الرتبة / الصلاحية</label>
                <select
                  value={loginRole}
                  onChange={(e) => setLoginRole(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-xs text-white"
                >
                  <option value="OWNER">المالك العام (Owner - كامل الصلاحيات)</option>
                  <option value="MANAGER">مدير المبيعات (Sales Manager)</option>
                  <option value="LOGISTICS">مسؤول الشحن والمستودع (Logistics)</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">البريد الإلكتروني</label>
                <input
                  type="email"
                  required
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">كلمة المرور</label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full bg-neutral-900 border border-neutral-700 px-3 py-2 text-xs text-white font-mono"
                />
              </div>

              <button
                type="submit"
                className={`w-full py-3.5 text-xs uppercase tracking-widest font-bold ${t.accent} transition`}
              >
                دخول لوحة القيادة (Authorize)
              </button>
            </form>
          </div>
        </div>
      )}

      {/* الفوتر */}
      <footer className={`border-t ${t.border} ${t.surface} mt-20 py-12 px-6 text-center text-xs text-neutral-500 font-mono space-y-2`}>
        <p>© 2026 LOOM STUDIOS ARCHIVE. ALL RIGHTS RESERVED.</p>
        <p className="text-[10px]">HAUTE STREETWEAR • 480 GSM MILTON FABRICATIONS • CAIRO & GIZA</p>
      </footer>
    </div>
  );
}
