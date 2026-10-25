import React, { useState, useMemo } from 'react';
import {
  ShoppingBag,
  Package,
  Users,
  Trash2,
  Plus,
  Edit,
  MessageCircle,
  ShieldCheck,
  Truck,
  X,
  Search,
  Copy,
  Palette,
  User,
  Key,
  DollarSign,
  CreditCard,
  Send,
  Activity,
  FileSpreadsheet,
  Percent,
  Wallet,
  Printer,
  QrCode
} from 'lucide-react';

// --- بيانات اعتماد المالك الرسمي ---
const OWNER_EMAIL = 'gotrack777@gmail.com';
const OWNER_PASS = '123456789';

// شعار الإنفينيتي المصمم برمجياً كـ SVG نقي عالي الدقة
const InfinityLogo = ({ className = "w-7 h-7 mx-1 inline-block" }) => (
  <svg
    viewBox="0 0 100 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    stroke="currentColor"
    strokeWidth="7"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M30 25 C30 15, 10 15, 10 25 C10 35, 30 35, 50 25 C70 15, 90 15, 90 25 C90 35, 70 35, 50 25 Z" />
  </svg>
);

// --- محافظات مصر وتكاليف الشحن ---
const EGYPT_GOVERNORATES = [
  { id: 'cairo', name: 'القاهرة (Cairo)', defaultCost: 60 },
  { id: 'giza', name: 'الجيزة / زايد / أكتوبر (Giza)', defaultCost: 60 },
  { id: 'alex', name: 'الإسكندرية (Alexandria)', defaultCost: 75 },
  { id: 'delta', name: 'الدلتا والوجه البحري (Delta)', defaultCost: 80 },
  { id: 'canal', name: 'مدن القناة (Canal Cities)', defaultCost: 85 },
  { id: 'upper', name: 'الصعيد (Upper Egypt)', defaultCost: 100 }
];

// --- محتوى المظهر التحريري (ZARA EDITORIAL) ---
const INITIAL_THEME_CONFIG = {
  tickerEnabled: true,
  tickerText: 'EDITORIAL DROP 01 / HEAVYWEIGHT EGYPTIAN COTTON / FREE DOORSTEP FITTING',
  tickerArabicBadge: 'معاينة وقياس مجاني مع المندوب قبل الاستلام',
  heroPreBadge: 'AUTUMN / WINTER 2026',
  heroHeading: 'ARCHITECTURAL DRAPE',
  heroSubheading: 'Heavyweight 460 GSM combed cotton sculpted in oversized streetwear cuts. Pure monochrome presence.',
  heroCtaText: 'EXPLORE LOOKBOOK',
  heroSecondaryCta: 'SIZE & FIT ADVISOR',
  heroBgImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1800&q=85',
  editorialImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1800&q=85'
};

// --- كتالوج المنتجات الأصلي ---
const INITIAL_PRODUCTS = [
  {
    id: 'loom-01',
    ref: 'REF. 0482/101',
    title: 'THE INFINITE COMPLETE TRACKSUIT',
    subtitle: 'OVERSIZED HOODIE & RELAXED TROUSERS',
    category: 'sets',
    gender: 'UNISEX',
    price: 1100,
    salePrice: 899,
    cogs: 420,
    badge: 'RUNWAY EXCLUSIVE',
    fabric: '460 GSM Heavyweight Terry Cotton',
    stock: 42,
    sizes: ['M/L', 'L/XL'],
    image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1200&q=85',
    detailImage: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1000&q=80',
    description: 'طقم كامل يتكون من هودي وبنطال بقصة أوفرسايز معمارية مريحة، خامة ميلتون قطن مصري ممشط 460 جرام معالج ضد الانكماش.',
    highlight: 'وفر 200 ج عند طلب الطقم الكامل'
  },
  {
    id: 'loom-02',
    ref: 'REF. 0482/102',
    title: 'HEAVYWEIGHT INFINITE HOODIE',
    subtitle: 'BOXY DROPPED-SHOULDER FLEECE',
    category: 'hoodies',
    gender: 'UNISEX',
    price: 650,
    salePrice: 550,
    cogs: 240,
    badge: 'NEW',
    fabric: '480 GSM Dense Brushed Fleece',
    stock: 28,
    sizes: ['M/L', 'L/XL'],
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=85',
    detailImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
    description: 'هودي ثقيل بكتف ساقط، كابيشون مبطن بطبقتين مع جيب كانغرو مخفي وتطريز رمزي كثيف على الظهر.',
    highlight: 'الأعلى طلباً للكولكشن الحالي'
  },
  {
    id: 'loom-03',
    ref: 'REF. 0482/103',
    title: 'WIDE-LEG RELAXED INSEAM SWEATPANTS',
    subtitle: 'EXTENDED DRAPE WITH WAIST DRAWSTRING',
    category: 'pants',
    gender: 'UNISEX',
    price: 520,
    salePrice: 440,
    cogs: 200,
    badge: 'RUNWAY',
    fabric: '440 GSM Loopback Heavy Knit',
    stock: 35,
    sizes: ['M/L', 'L/XL'],
    image: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?auto=format&fit=crop&w=1200&q=85',
    detailImage: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1000&q=80',
    description: 'بنطال ميلتون بأرجل مستقيمة واسعة تتدفق فوق الأحذية الرياضية مع حبل شد قطني عريض وأطراف معدنية غير لامعة.',
    highlight: 'قصة انسيابية مريحة مع سنيكرز'
  },
  {
    id: 'loom-04',
    ref: 'REF. 0482/104',
    title: 'BOXY HEAVYWEIGHT EMBROIDERED TEE',
    subtitle: 'STRUCTURED MOCK NECK T-SHIRT',
    category: 'tees',
    gender: 'MEN',
    price: 380,
    salePrice: 320,
    cogs: 130,
    badge: 'LIMITED',
    fabric: '260 GSM Compact Cotton Jersey',
    stock: 50,
    sizes: ['M/L', 'L/XL'],
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=85',
    detailImage: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=1000&q=80',
    description: 'تيشيرت بياقة مضلعة دائرية محكمة وقصة مربعة Boxy مع تطريز دقيق لشعار الإنفينيتي على الصدر.',
    highlight: 'خامة متماسكة وقطن مصري 100%'
  }
];

// --- فريق العمل ومصفوفة الصلاحيات ---
const INITIAL_STAFF = [
  {
    id: 'staff-owner',
    name: 'Ibrahim Bakry',
    email: OWNER_EMAIL,
    roleTitle: 'Master Owner / Executive Director',
    rank: 'Level 1: Executive',
    isOwner: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    status: 'online',
    kpiScore: 100,
    ordersConfirmedToday: 18,
    chatsHandled: 24,
    avgResponseMinutes: 1.2,
    csat: 4.95,
    recentAction: 'Approved Q4 Financial Settlement & Payout',
    permissions: { design: true, products: true, orders: true, staff: true, marketing: true, analytics: true, finance: true, logistics: true, waybills: true }
  },
  {
    id: 'staff-gm',
    name: 'Tarek Hamed',
    email: 'tarek.gm@loom.com',
    roleTitle: 'General Operations Manager',
    rank: 'Level 2: Management',
    isOwner: false,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80',
    status: 'online',
    kpiScore: 97,
    ordersConfirmedToday: 14,
    chatsHandled: 16,
    avgResponseMinutes: 1.9,
    csat: 4.9,
    recentAction: 'Audited inventory stock across Cairo warehouse',
    permissions: { design: true, products: true, orders: true, staff: true, marketing: true, analytics: true, finance: false, logistics: true, waybills: true }
  },
  {
    id: 'staff-logistics',
    name: 'Karim El-Sayed',
    email: 'karim.ops@loom.com',
    roleTitle: 'Logistics & Dispatch Officer',
    rank: 'Level 3: Operations',
    isOwner: false,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    status: 'online',
    kpiScore: 94,
    ordersConfirmedToday: 32,
    chatsHandled: 8,
    avgResponseMinutes: 2.4,
    csat: 4.8,
    recentAction: 'Generated 4x6 thermal waybills for Bosta pickup',
    permissions: { design: false, products: false, orders: true, staff: false, marketing: false, analytics: false, finance: false, logistics: true, waybills: true }
  },
  {
    id: 'staff-support',
    name: 'Sarah Nour',
    email: 'sarah.support@loom.com',
    roleTitle: 'Customer Support Lead',
    rank: 'Level 3: Operations',
    isOwner: false,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
    status: 'busy',
    kpiScore: 96,
    ordersConfirmedToday: 21,
    chatsHandled: 48,
    avgResponseMinutes: 1.8,
    csat: 4.98,
    recentAction: 'Sent WhatsApp measurements consultation for #LM-9042',
    permissions: { design: false, products: false, orders: true, staff: false, marketing: false, analytics: false, finance: false, logistics: false, waybills: false }
  }
];

// --- شركات الشحن المعتمدة ---
const INITIAL_COURIERS = [
  {
    id: 'bosta',
    name: 'Bosta Express (بوسطة)',
    active: true,
    isDefault: true,
    sla: '24-48 ساعة',
    coverage: 'جميع محافظات مصر',
    rates: { cairo: 55, giza: 55, alex: 70, delta: 75, canal: 80, upper: 95 },
    collectedCodPending: 18450,
    settlementCycle: 'تحويل بنكي نصف أسبوعي',
    phone: '01002233445'
  },
  {
    id: 'mylerz',
    name: 'Mylerz Logistics (مايلرز)',
    active: true,
    isDefault: false,
    sla: 'خلال 24 ساعة',
    coverage: 'القاهرة الكبرى والإسكندرية',
    rates: { cairo: 60, giza: 60, alex: 75, delta: 85, canal: 90, upper: 110 },
    collectedCodPending: 7200,
    settlementCycle: 'تحويل أسبوعي تلقائي',
    phone: '01123456789'
  },
  {
    id: 'aramex',
    name: 'Aramex Domestic (أرامكس)',
    active: true,
    isDefault: false,
    sla: '48 ساعة',
    coverage: 'تغطية محلية شاملة',
    rates: { cairo: 75, giza: 75, alex: 90, delta: 95, canal: 100, upper: 125 },
    collectedCodPending: 3800,
    settlementCycle: 'تسوية شهرية مجمعة',
    phone: '16999'
  }
];

// --- قنوات الدفع والتسوية ---
const INITIAL_GATEWAYS = [
  {
    id: 'cod',
    name: 'الدفع عند الاستلام مع المعاينة والقياس (COD)',
    badge: '90% من الطلبات',
    description: 'يسمح بفتح الشحنة والقياس بحضور المندوب قبل دفع أي مبلغ.',
    active: true,
    feePercentage: 0
  },
  {
    id: 'instapay',
    name: 'تحويل انستاباي فوري (InstaPay Direct)',
    badge: 'تحويل فوري بدون رسوم',
    description: 'تحويل مباشر وسريع إلى حساب المتجر الرسمي: loomstudios@instapay.',
    active: true,
    feePercentage: 0
  },
  {
    id: 'paymob',
    name: 'بطاقات بنكية ومحافظ إلكترونية (Paymob)',
    badge: 'دفع إلكتروني آمن',
    description: 'دعم بطاقات فيزا، ماستركارد، ومحافظ فودافون كاش وأورنج كاش.',
    active: true,
    feePercentage: 2.75
  }
];

// --- سجل الطلبات الأولي ---
const INITIAL_ORDERS = [
  {
    id: 'LM-9041',
    customerName: 'يوسف المنشاوي',
    phone: '01019876543',
    city: 'القاهرة الجديدة (التجمع الخامس)',
    governorate: 'cairo',
    address: 'جنوب الأكاديمية، فيلا 18، الدور الثاني',
    items: [{ name: 'THE INFINITE COMPLETE TRACKSUIT (L/XL)', qty: 1, price: 899, cogs: 420 }],
    totalAmount: 954,
    shippingCost: 55,
    courierId: 'bosta',
    status: 'Pending Confirmation',
    assignedStaff: 'Sarah Nour',
    paymentMethod: 'COD (معاينة وقياس مع المندوب)',
    date: 'اليوم، 10:40 ص',
    waybillNumber: 'BST-8942-0199'
  },
  {
    id: 'LM-9040',
    customerName: 'فريدة مصطفى',
    phone: '01155443322',
    city: 'الجيزة (الشيخ زايد)',
    governorate: 'giza',
    address: 'كمبوند بيفرلي هيلز، بوابة 4',
    items: [{ name: 'HEAVYWEIGHT INFINITE HOODIE (M/L)', qty: 1, price: 550, cogs: 240 }],
    totalAmount: 605,
    shippingCost: 55,
    courierId: 'bosta',
    status: 'WhatsApp Verified',
    assignedStaff: 'Sarah Nour',
    paymentMethod: 'COD (معاينة وقياس مع المندوب)',
    date: 'أمس، 06:15 م',
    waybillNumber: 'BST-8942-0198'
  },
  {
    id: 'LM-9039',
    customerName: 'كريم عبد العزيز',
    phone: '01223344556',
    city: 'الإسكندرية (سموحة)',
    governorate: 'alex',
    address: 'شارع فوزي معاذ، عمارة 14',
    items: [
      { name: 'WIDE-LEG RELAXED INSEAM SWEATPANTS (M/L)', qty: 1, price: 440, cogs: 200 },
      { name: 'BOXY HEAVYWEIGHT EMBROIDERED TEE (M/L)', qty: 1, price: 320, cogs: 130 }
    ],
    totalAmount: 830,
    shippingCost: 70,
    courierId: 'mylerz',
    status: 'Dispatched with Courier',
    assignedStaff: 'Karim El-Sayed',
    paymentMethod: 'COD (معاينة وقياس مع المندوب)',
    date: 'أمس، 02:20 م',
    waybillNumber: 'MYL-2026-9039'
  },
  {
    id: 'LM-9038',
    customerName: 'نوران الجندي',
    phone: '01099887766',
    city: 'القاهرة (المعادي)',
    governorate: 'cairo',
    address: 'دجلة، شارع 218، شقة 4B',
    items: [{ name: 'THE INFINITE COMPLETE TRACKSUIT (M/L)', qty: 1, price: 899, cogs: 420 }],
    totalAmount: 954,
    shippingCost: 55,
    courierId: 'bosta',
    status: 'Delivered & Collected',
    assignedStaff: 'Karim El-Sayed',
    paymentMethod: 'COD (تم التحصيل من المندوب)',
    date: 'منذ يومين',
    waybillNumber: 'BST-8942-0182'
  }
];

export default function App() {
  const [view, setView] = useState('store'); // 'store' | 'admin'
  const [adminTab, setAdminTab] = useState('waybills');
  const [theme, setTheme] = useState('noir'); // 'noir' | 'ash' | 'blanc'

  const [currentUser, setCurrentUser] = useState(INITIAL_STAFF[0]);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: OWNER_EMAIL, password: OWNER_PASS });
  const [authError, setAuthError] = useState('');

  const [activeWaybillOrder, setActiveWaybillOrder] = useState(INITIAL_ORDERS[0]);
  const [waybillFormat, setWaybillFormat] = useState('4x6'); // '4x6' | 'a4' | 'a6'
  const [barcodeType, setBarcodeType] = useState('code128');

  const [themeConfig, setThemeConfig] = useState(INITIAL_THEME_CONFIG);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [staff, setStaff] = useState(INITIAL_STAFF);
  const [couriers, setCouriers] = useState(INITIAL_COURIERS);
  const [gateways, setGateways] = useState(INITIAL_GATEWAYS);

  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeModalProduct, setActiveModalProduct] = useState(null);
  const [showSizeAdvisor, setShowSizeAdvisor] = useState(false);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const [isVisitorChatOpen, setIsVisitorChatOpen] = useState(false);
  const [visitorChatText, setVisitorChatText] = useState('');
  const [visitorMessages, setVisitorMessages] = useState([
    { sender: 'bot', text: 'أهلاً بك في LOOM STUDIOS 🖤. هل ترغب في الاستفسار عن مقاسات الأوفرسايز أو خامة الميلتون 460 GSM؟', time: '10:45 ص' }
  ]);

  const [checkoutData, setCheckoutData] = useState({
    name: '',
    phone: '',
    governorate: 'cairo',
    cityArea: '',
    address: '',
    notes: '',
    paymentGateway: 'cod'
  });

  const [calcWeight, setCalcWeight] = useState(76);
  const [calcHeight, setCalcHeight] = useState(179);

  const recommendedSize = useMemo(() => {
    if (calcWeight <= 78 && calcHeight <= 178) {
      return { size: 'M / L', fit: 'Editorial Relaxed Fit (Standard Oversized)' };
    }
    return { size: 'L / XL', fit: 'Architectural Exaggerated Fit (Statement Boxy)' };
  }, [calcWeight, calcHeight]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const cartSubtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  const activeCourier = useMemo(() => {
    return couriers.find((c) => c.isDefault && c.active) || couriers.find((c) => c.active) || couriers[0];
  }, [couriers]);

  const calculatedShippingCost = useMemo(() => {
    if (!activeCourier || !activeCourier.rates) return 60;
    return activeCourier.rates[checkoutData.governorate] || 60;
  }, [activeCourier, checkoutData.governorate]);

  const themeStyles = useMemo(() => {
    switch (theme) {
      case 'ash':
        return {
          wrapper: 'bg-[#1c1c1e] text-[#f2f2f7]',
          card: 'bg-[#2c2c2e] border-neutral-700',
          header: 'bg-[#1c1c1e]/90 border-neutral-700',
          subtext: 'text-neutral-400',
          highlight: 'bg-white text-black',
          border: 'border-neutral-700'
        };
      case 'blanc':
        return {
          wrapper: 'bg-[#FFFFFF] text-[#000000]',
          card: 'bg-[#F9F9F8] border-neutral-200',
          header: 'bg-white/95 border-neutral-200 shadow-sm',
          subtext: 'text-neutral-600',
          highlight: 'bg-black text-white',
          border: 'border-neutral-200'
        };
      case 'noir':
      default:
        return {
          wrapper: 'bg-black text-[#F5F5F3]',
          card: 'bg-[#080808] border-neutral-800',
          header: 'bg-black/90 border-neutral-900',
          subtext: 'text-neutral-400',
          highlight: 'bg-white text-black',
          border: 'border-neutral-800'
        };
    }
  }, [theme]);

  const financialMetrics = useMemo(() => {
    let grossSales = 0;
    let totalCogs = 0;
    let totalShippingCost = 0;
    let collectedCash = 0;
    let inTransitCash = 0;

    orders.forEach((o) => {
      grossSales += o.totalAmount;
      totalShippingCost += o.shippingCost;
      o.items.forEach((it) => {
        totalCogs += (it.cogs || it.price * 0.45) * it.qty;
      });

      if (o.status === 'Delivered & Collected') {
        collectedCash += o.totalAmount;
      } else if (o.status !== 'Returned') {
        inTransitCash += o.totalAmount;
      }
    });

    const netProfit = grossSales - totalCogs - totalShippingCost;
    const netMarginPercent = grossSales > 0 ? Math.round((netProfit / grossSales) * 100) : 0;

    return {
      grossSales,
      totalCogs,
      totalShippingCost,
      netProfit,
      netMarginPercent,
      collectedCash,
      inTransitCash,
      ordersCount: orders.length
    };
  }, [orders]);

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setAuthError('');

    if (loginForm.email.toLowerCase() === OWNER_EMAIL.toLowerCase() && loginForm.password === OWNER_PASS) {
      setCurrentUser(INITIAL_STAFF[0]);
      setShowAuthModal(false);
      showToast(`تم تسجيل الدخول كمالك رئيسي (${OWNER_EMAIL})`);
      return;
    }

    const match = staff.find(
      (s) => s.email.toLowerCase() === loginForm.email.toLowerCase()
    );

    if (match) {
      setCurrentUser(match);
      setShowAuthModal(false);
      showToast(`تم تسجيل الدخول: ${match.name} [${match.roleTitle}]`);
      return;
    }

    setAuthError('بيانات غير صحيحة. حساب المالك: gotrack777@gmail.com مع كلمة مرور: 123456789');
  };

  const addToCart = (product, sizeChoice) => {
    const chosenSize = sizeChoice || product.sizes[0];
    const key = `${product.id}-${chosenSize}`;
    const exists = cart.find((i) => i.key === key);

    if (exists) {
      setCart(cart.map((i) => (i.key === key ? { ...i, quantity: i.quantity + 1 } : i)));
    } else {
      setCart([
        ...cart,
        {
          key,
          id: product.id,
          title: product.title,
          price: product.salePrice || product.price,
          cogs: product.cogs || 200,
          size: chosenSize,
          image: product.image,
          quantity: 1
        }
      ]);
    }
    showToast(`تمت الإضافة للحقيبة: ${product.title} (${chosenSize})`);
  };

  const removeFromCart = (key) => {
    setCart(cart.filter((i) => i.key !== key));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      showToast('سلة التسوق فارغة.');
      return;
    }
    if (!checkoutData.name || !checkoutData.phone || !checkoutData.address) {
      showToast('يرجى ملء الاسم الثلاثي ورقم الهاتف والعنوان بدقة.');
      return;
    }

    const orderId = `LM-${Math.floor(1000 + Math.random() * 9000)}`;
    const courierCode = activeCourier.id === 'bosta' ? 'BST' : activeCourier.id === 'mylerz' ? 'MYL' : 'ARX';
    const waybillNumber = `${courierCode}-${Date.now().toString().slice(-4)}-${Math.floor(100 + Math.random() * 900)}`;

    const newOrder = {
      id: orderId,
      customerName: checkoutData.name,
      phone: checkoutData.phone,
      city: `${checkoutData.governorate.toUpperCase()} - ${checkoutData.cityArea}`,
      governorate: checkoutData.governorate,
      address: checkoutData.address,
      items: cart.map((c) => ({ name: `${c.title} (${c.size})`, qty: c.quantity, price: c.price, cogs: c.cogs })),
      totalAmount: cartSubtotal + calculatedShippingCost,
      shippingCost: calculatedShippingCost,
      courierId: activeCourier.id,
      status: 'Pending Confirmation',
      assignedStaff: 'Sarah Nour',
      paymentMethod:
        checkoutData.paymentGateway === 'cod'
          ? 'COD (معاينة وقياس مع المندوب)'
          : checkoutData.paymentGateway === 'instapay'
          ? 'InstaPay Direct Transfer'
          : 'Card Payment (Paymob)',
      date: 'الآن',
      waybillNumber
    };

    setOrders([newOrder, ...orders]);
    setActiveWaybillOrder(newOrder);
    setCart([]);
    setIsCartOpen(false);

    showToast(`تم تسجيل الطلب: #${newOrder.id}. تم إرسال إشعار فوري للمالك.`);
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
      const matchSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const handleVisitorChatSend = (e) => {
    e.preventDefault();
    if (!visitorChatText.trim()) return;

    const userMsg = { sender: 'user', text: visitorChatText, time: 'الآن' };
    setVisitorMessages((prev) => [...prev, userMsg]);
    setVisitorChatText('');

    setTimeout(() => {
      setVisitorMessages((prev) => [
        ...prev,
        {
          sender: 'bot',
          text: 'تم استلام استفسارك! جاري تحويلك لخدمة العملاء (سارة نور) لتأكيد المقاسات والشحن عبر الواتساب.',
          time: 'الآن'
        }
      ]);
    }, 700);
  };

  return (
    <div className={`min-h-screen ${themeStyles.wrapper} font-sans antialiased selection:bg-neutral-300 selection:text-black flex flex-col transition-colors duration-300`}>
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#F5F5F3] text-black px-6 py-3.5 shadow-2xl font-mono text-[11px] tracking-[0.2em] uppercase border border-neutral-300 flex items-center gap-3">
          <span className="w-1.5 h-1.5 bg-black"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* شريط الإعلانات التحريري العلوي */}
      {themeConfig.tickerEnabled && (
        <aside aria-label="Announcement" className="border-b border-neutral-800/60 py-2 px-6 text-[10px] tracking-[0.25em] flex items-center justify-between font-mono uppercase bg-black/40">
          <div className="hidden md:flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            <span className="font-sans tracking-normal text-neutral-300">{themeConfig.tickerArabicBadge}</span>
          </div>

          <div className="mx-auto truncate max-w-xl text-center text-neutral-300">
            {themeConfig.tickerText}
          </div>

          <div className="hidden sm:flex items-center gap-4 text-[10px]">
            <span className="text-emerald-400 flex items-center gap-1 font-bold">
              <Truck className="w-3 h-3" />
              <span>COURIER: {activeCourier.name.split(' ')[0]}</span>
            </span>
            <span>•</span>
            <span className="font-sans tracking-normal text-neutral-400">خدمة عملاء وقياس منزلي</span>
          </div>
        </aside>
      )}

      {/* الهيدر التحريري - زارا ستايل مع شعار الإنفينيتي النقي */}
      <header className={`sticky top-0 z-40 ${themeStyles.header} backdrop-blur-md border-b transition-all duration-300`}>
        <div className="max-w-[1720px] mx-auto px-6 sm:px-10 h-20 flex items-center justify-between gap-6">
          <nav className="hidden lg:flex items-center gap-7 text-[11px] font-mono tracking-[0.25em] uppercase text-neutral-400">
            <button onClick={() => setSelectedCategory('all')} className={`transition cursor-pointer ${selectedCategory === 'all' ? 'text-inherit font-bold border-b border-current pb-0.5' : 'opacity-70 hover:opacity-100'}`}>COLLECTION</button>
            <button onClick={() => setSelectedCategory('sets')} className={`transition cursor-pointer ${selectedCategory === 'sets' ? 'text-inherit font-bold border-b border-current pb-0.5' : 'opacity-70 hover:opacity-100'}`}>SUITS</button>
            <button onClick={() => setSelectedCategory('hoodies')} className={`transition cursor-pointer ${selectedCategory === 'hoodies' ? 'text-inherit font-bold border-b border-current pb-0.5' : 'opacity-70 hover:opacity-100'}`}>HOODIES</button>
            <button onClick={() => setSelectedCategory('pants')} className={`transition cursor-pointer ${selectedCategory === 'pants' ? 'text-inherit font-bold border-b border-current pb-0.5' : 'opacity-70 hover:opacity-100'}`}>TROUSERS</button>
            <button onClick={() => setSelectedCategory('tees')} className={`transition cursor-pointer ${selectedCategory === 'tees' ? 'text-inherit font-bold border-b border-current pb-0.5' : 'opacity-70 hover:opacity-100'}`}>BASICS</button>
          </nav>

          {/* لوجو LOOM STUDIOS الأصلي مع علامة الإنفينيتي Vector */}
          <div
            onClick={() => setView('store')}
            className="cursor-pointer text-center group select-none flex flex-col items-center"
          >
            <div className="text-3xl sm:text-4xl font-light tracking-[0.25em] font-serif flex items-center leading-none">
              <span>L</span>
              <InfinityLogo className="w-8 h-5 mx-0.5 group-hover:rotate-180 transition-transform duration-700" />
              <span>M</span>
            </div>
            <span className="text-[8px] font-mono tracking-[0.45em] opacity-60 uppercase mt-1">
              STUDIOS
            </span>
          </div>

          {/* عناصر التحكم والثيم والولوج لحساب المالك */}
          <div className="flex items-center gap-3 sm:gap-4 font-mono text-[11px] tracking-[0.2em] uppercase">
            <div className="flex items-center border border-neutral-700/60 p-0.5 bg-black/30 rounded-sm">
              <button onClick={() => { setTheme('noir'); showToast('THEME: NOIR'); }} className={`px-2 py-1 text-[9px] transition ${theme === 'noir' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'}`}>NOIR</button>
              <button onClick={() => { setTheme('ash'); showToast('THEME: ASH'); }} className={`px-2 py-1 text-[9px] transition ${theme === 'ash' ? 'bg-white text-black font-bold' : 'text-neutral-400 hover:text-white'}`}>ASH</button>
              <button onClick={() => { setTheme('blanc'); showToast('THEME: BLANC'); }} className={`px-2 py-1 text-[9px] transition ${theme === 'blanc' ? 'bg-black text-white font-bold' : 'text-neutral-400 hover:text-black'}`}>BLANC</button>
            </div>

            <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="opacity-70 hover:opacity-100 transition hidden sm:flex items-center gap-1.5 cursor-pointer">
              <Search className="w-3.5 h-3.5" />
              <span>SEARCH</span>
            </button>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setView(view === 'admin' ? 'store' : 'admin')}
                className={`px-3 py-1.5 border text-[10px] tracking-[0.2em] uppercase flex items-center gap-1.5 transition cursor-pointer ${
                  currentUser.isOwner
                    ? 'border-amber-400 text-amber-300 bg-amber-950/40 hover:bg-amber-900/60 font-bold'
                    : 'border-neutral-700 text-neutral-300 hover:border-white'
                }`}
              >
                <User className="w-3 h-3" />
                <span className="hidden md:inline">{currentUser.isOwner ? 'MASTER OWNER' : currentUser.name.split(' ')[0]}</span>
                <span className="md:hidden">CMS</span>
              </button>

              <button
                onClick={() => setShowAuthModal(true)}
                className="p-1.5 border border-neutral-700/70 hover:border-white transition cursor-pointer"
                title="تسجيل الدخول / تغيير الرتبة"
              >
                <Key className="w-3.5 h-3.5" />
              </button>
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative opacity-80 hover:opacity-100 transition flex items-center gap-1.5 cursor-pointer"
            >
              <span className="hidden sm:inline">BAG</span>
              <span className="text-xs">[{cart.reduce((s, i) => s + i.quantity, 0)}]</span>
            </button>
          </div>
        </div>

        {isSearchOpen && (
          <div className="border-t border-neutral-800/80 bg-black/95 px-6 py-4 animate-fadeIn">
            <div className="max-w-2xl mx-auto flex items-center gap-3">
              <Search className="w-4 h-4 text-neutral-500" />
              <input
                type="text"
                autoFocus
                placeholder="ابحث عن هوديز، ترينجات كاملة، أو ميلتون 460 جرام..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-xs font-mono tracking-[0.15em] uppercase text-white placeholder-neutral-600 focus:outline-none"
              />
              <button onClick={() => { setSearchQuery(''); setIsSearchOpen(false); }} className="text-neutral-500 hover:text-white text-xs font-mono cursor-pointer">
                إغلاق
              </button>
            </div>
          </div>
        )}
      </header>

      {/* نافذة تسجيل الدخول وحسابات الإدارة */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-6">
          <div className="border border-neutral-800 bg-[#0e0e0e] max-w-lg w-full p-8 relative font-mono shadow-2xl text-white">
            <button onClick={() => setShowAuthModal(false)} className="absolute top-6 right-6 text-neutral-400 hover:text-white cursor-pointer">
              <X className="w-5 h-5" />
            </button>

            <div className="text-center space-y-1.5 mb-6">
              <span className="text-[10px] tracking-[0.3em] text-neutral-500 uppercase block">LOOM ENTERPRISE ACCESS</span>
              <h3 className="font-serif text-2xl font-light tracking-[0.15em] text-white uppercase">SECURITY CHECKPOINT</h3>
              <p className="text-xs text-neutral-400 font-sans">تسجيل دخول المالك الرسمي أو طاقم العمل.</p>
            </div>

            {authError && (
              <div className="mb-4 p-3 border border-rose-800 bg-rose-950/40 text-rose-300 text-xs font-sans">
                {authError}
              </div>
            )}

            <div className="border border-amber-500/50 bg-amber-950/20 p-4 space-y-3 mb-6">
              <div className="flex items-center justify-between text-[10px] text-amber-300 uppercase tracking-widest font-bold">
                <span>MASTER OWNER PRESET</span>
                <span className="bg-amber-400 text-black px-1.5 py-0.5">UNRESTRICTED</span>
              </div>
              <button
                onClick={() => {
                  setLoginForm({ email: OWNER_EMAIL, password: OWNER_PASS });
                  setCurrentUser(INITIAL_STAFF[0]);
                  setShowAuthModal(false);
                  showToast(`تم تسجيل الدخول: ${OWNER_EMAIL}`);
                }}
                className="w-full py-3 bg-white text-black font-mono text-xs tracking-[0.15em] font-bold hover:bg-neutral-200 transition flex items-center justify-center gap-3 cursor-pointer"
              >
                <span>دخول فوري بحساب المالك (gotrack777@gmail.com)</span>
              </button>
            </div>

            <form onSubmit={handleAuthSubmit} className="space-y-3 border-t border-neutral-800 pt-4 mb-6">
              <div>
                <label className="text-[10px] text-neutral-400 uppercase block mb-1">البريد الإلكتروني</label>
                <input
                  type="email"
                  required
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  className="w-full bg-black border border-neutral-700 px-3 py-2 text-xs text-white focus:border-white outline-none"
                />
              </div>

              <div>
                <label className="text-[10px] text-neutral-400 uppercase block mb-1">كلمة المرور</label>
                <input
                  type="password"
                  required
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  className="w-full bg-black border border-neutral-700 px-3 py-2 text-xs text-white focus:border-white outline-none"
                />
              </div>

              <button type="submit" className="w-full py-2.5 bg-neutral-900 border border-neutral-600 text-white font-mono text-xs tracking-[0.2em] uppercase font-bold hover:bg-neutral-800 cursor-pointer">
                تأكيد البيانات والدخول
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 1. واجهة المتجر التحريرية (STOREFRONT LOOKBOOK) */}
      {view === 'store' && (
        <main className="flex-1 w-full">
          {/* الغلاف السينمائي الكبير (Hero Banner) */}
          <section className="relative w-full h-[82vh] min-h-[580px] bg-neutral-950 overflow-hidden border-b border-neutral-800/80">
            <img
              src={themeConfig.heroBgImage}
              alt="Zara-style Editorial"
              className="w-full h-full object-cover object-top filter grayscale contrast-125 brightness-90 hover:scale-[1.02] transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>

            <div className="absolute inset-x-0 bottom-0 max-w-[1720px] mx-auto px-6 sm:px-12 pb-14 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="max-w-2xl text-white">
                <span className="font-mono text-[10px] tracking-[0.35em] text-neutral-400 uppercase block mb-3">
                  {themeConfig.heroPreBadge}
                </span>
                <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-[0.15em] uppercase leading-none mb-4">
                  {themeConfig.heroHeading}
                </h1>
                <p className="text-xs sm:text-sm text-neutral-300 font-sans tracking-wide leading-relaxed max-w-lg">
                  {themeConfig.heroSubheading}
                </p>
              </div>

              <div className="flex items-center gap-4 font-mono text-[11px] tracking-[0.25em] uppercase">
                <button
                  onClick={() => {
                    const el = document.getElementById('lookbook-grid');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-3.5 bg-white text-black font-semibold hover:bg-neutral-200 transition cursor-pointer"
                >
                  {themeConfig.heroCtaText}
                </button>
                <button
                  onClick={() => setShowSizeAdvisor(true)}
                  className="px-6 py-3.5 bg-transparent text-white border border-neutral-600 hover:border-white transition cursor-pointer"
                >
                  {themeConfig.heroSecondaryCta}
                </button>
              </div>
            </div>
          </section>

          {/* البانر التعريفي */}
          <section className="border-b border-neutral-800/60 py-16 px-6 sm:px-12 text-center">
            <div className="max-w-3xl mx-auto space-y-4">
              <span className="text-[9px] font-mono tracking-[0.4em] opacity-60 uppercase block">
                ATELIER MANIFESTO
              </span>
              <p className="font-serif text-xl sm:text-2xl font-light italic leading-relaxed">
                "كثافة خالصة وخامات ميلتون معمارية مصممة في القاهرة لتتجاوز تقلبات الموضة السريعة."
              </p>
              <div className="pt-2 flex flex-wrap items-center justify-center gap-6 text-[10px] font-mono tracking-[0.2em] opacity-80 uppercase">
                <span>100% COMBED HEAVYWEIGHT COTTON</span>
                <span>•</span>
                <span>ZERO SHRINKAGE</span>
                <span>•</span>
                <span>DOORSTEP TRY-ON WITH COURIER</span>
              </div>
            </div>
          </section>

          {/* شبكة الكتالوج التحريرية */}
          <section id="lookbook-grid" className="max-w-[1720px] mx-auto px-6 sm:px-10 py-16">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-neutral-800/80 gap-4 mb-12">
              <div className="font-mono text-[11px] tracking-[0.25em] opacity-70 uppercase">
                INDEX [{filteredProducts.length} DESIGNS]
              </div>

              <div className="flex items-center gap-6 font-mono text-[11px] tracking-[0.2em] uppercase opacity-80 overflow-x-auto pb-2 sm:pb-0">
                {[
                  { id: 'all', label: 'VIEW ALL' },
                  { id: 'sets', label: 'FULL SUITS' },
                  { id: 'hoodies', label: 'HOODIES' },
                  { id: 'pants', label: 'TROUSERS' },
                  { id: 'tees', label: 'BASICS' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedCategory(tab.id)}
                    className={`transition cursor-pointer ${
                      selectedCategory === tab.id ? 'opacity-100 font-bold border-b border-current pb-0.5' : 'hover:opacity-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
              {filteredProducts.map((product) => {
                const discount =
                  product.salePrice &&
                  Math.round(((product.price - product.salePrice) / product.price) * 100);

                return (
                  <div key={product.id} className="group flex flex-col justify-between">
                    <div className="relative aspect-[3/4] bg-neutral-950 overflow-hidden mb-5">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover object-center filter grayscale-[20%] group-hover:scale-105 transition-all duration-700 ease-out"
                      />

                      {product.detailImage && (
                        <img
                          src={product.detailImage}
                          alt={`${product.title} detail`}
                          className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                        />
                      )}

                      {product.badge && (
                        <div className="absolute top-4 left-4 font-mono text-[9px] tracking-[0.25em] uppercase text-neutral-200 bg-black/80 px-2 py-1 border border-neutral-800">
                          {product.badge}
                        </div>
                      )}

                      {discount > 0 && (
                        <div className="absolute top-4 right-4 font-mono text-[9px] tracking-[0.2em] text-white bg-neutral-900 px-2 py-1">
                          -{discount}%
                        </div>
                      )}

                      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-between font-mono text-[10px] tracking-[0.2em]">
                        <span className="text-neutral-400">SELECT SIZE:</span>
                        <div className="flex gap-2">
                          {product.sizes.map((sz) => (
                            <button
                              key={sz}
                              onClick={(e) => {
                                e.stopPropagation();
                                addToCart(product, sz);
                              }}
                              className="px-2.5 py-1 bg-white text-black hover:bg-neutral-200 transition font-bold cursor-pointer"
                            >
                              {sz}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1.5 font-mono">
                      <div className="flex items-center justify-between text-[10px] tracking-[0.25em] opacity-60 uppercase">
                        <span>{product.ref}</span>
                        <span>{product.fabric}</span>
                      </div>

                      <h3
                        onClick={() => setActiveModalProduct(product)}
                        className="text-sm font-normal tracking-[0.12em] uppercase hover:opacity-70 transition cursor-pointer"
                      >
                        {product.title}
                      </h3>

                      <p className="text-[11px] opacity-70 font-sans tracking-wide">
                        {product.subtitle}
                      </p>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-baseline gap-2.5 text-xs font-mono tracking-wider">
                          <span className="font-bold">{product.salePrice || product.price} EGP</span>
                          {product.salePrice && (
                            <span className="opacity-50 line-through text-[11px]">
                              {product.price} EGP
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => setActiveModalProduct(product)}
                          className="text-[10px] tracking-[0.2em] uppercase opacity-70 hover:opacity-100 underline underline-offset-4 cursor-pointer"
                        >
                          + DETAILS
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* مميزات الشحن والمعاينة الثلاثية */}
          <section className={`border-t ${themeStyles.border} py-14 px-6 sm:px-12 bg-black/20`}>
            <div className="max-w-[1720px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 font-mono text-xs tracking-wider">
              <div className={`border ${themeStyles.border} p-6 space-y-2`}>
                <span className="text-[10px] block uppercase tracking-[0.25em] opacity-60">01 / INSPECTION</span>
                <h4 className="font-serif text-base uppercase">DOORSTEP TRY-ON</h4>
                <p className="text-[11px] font-sans opacity-80">
                  معاينة وقياس القطعة مع مندوب الشحن قبل دفع أي مبلغ للتأكد من المقاس وجودة الميلتون 460GSM.
                </p>
              </div>

              <div className={`border ${themeStyles.border} p-6 space-y-2`}>
                <span className="text-[10px] block uppercase tracking-[0.25em] opacity-60">02 / DISPATCH PARTNER</span>
                <h4 className="font-serif text-base uppercase">{activeCourier.name}</h4>
                <p className="text-[11px] font-sans opacity-80">
                  شحن مؤمن لجميع المحافظات خلال 24 لـ 48 ساعة مع ميزة تتبع الشحنة المباشر.
                </p>
              </div>

              <div className={`border ${themeStyles.border} p-6 space-y-2`}>
                <span className="text-[10px] block uppercase tracking-[0.25em] opacity-60">03 / EXCHANGES</span>
                <h4 className="font-serif text-base uppercase">14-DAY REPLACEMENT</h4>
                <p className="text-[11px] font-sans opacity-80">
                  إمكانية استبدال المقاس دون أي تعقيد عبر مندوب الاستبدال السريع.
                </p>
              </div>
            </div>
          </section>

          {/* ودجت المحادثة الحية المباشرة */}
          <div className="fixed bottom-6 left-6 z-40">
            <button
              onClick={() => setIsVisitorChatOpen(!isVisitorChatOpen)}
              className="bg-white text-black font-mono text-[10px] tracking-[0.2em] uppercase font-bold px-4 py-3 shadow-2xl flex items-center gap-2 hover:bg-neutral-200 transition cursor-pointer border border-neutral-300"
            >
              <MessageCircle className="w-4 h-4" />
              <span>LIVE ATELIER SUPPORT</span>
            </button>
          </div>

          {isVisitorChatOpen && (
            <div className="fixed bottom-20 left-6 z-40 w-80 sm:w-96 border border-neutral-800 bg-[#0a0a0a] shadow-2xl font-mono text-xs flex flex-col h-96 text-white">
              <div className="p-3.5 border-b border-neutral-800 bg-black flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-white font-bold text-[11px] tracking-wider uppercase">LOOM SUPPORT DESK</span>
                </div>
                <button onClick={() => setIsVisitorChatOpen(false)} className="text-neutral-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 p-4 overflow-y-auto space-y-3 font-sans text-xs">
                {visitorMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 max-w-[85%] rounded ${
                      msg.sender === 'user'
                        ? 'ml-auto bg-neutral-800 text-white text-right'
                        : 'bg-neutral-900 border border-neutral-800 text-neutral-300'
                    }`}
                  >
                    <div>{msg.text}</div>
                    <span className="text-[9px] text-neutral-500 block mt-1 font-mono">{msg.time}</span>
                  </div>
                ))}
              </div>

              <form onSubmit={handleVisitorChatSend} className="p-3 border-t border-neutral-800 flex gap-2 bg-black">
                <input
                  type="text"
                  placeholder="اكتب استفسارك هنا..."
                  value={visitorChatText}
                  onChange={(e) => setVisitorChatText(e.target.value)}
                  className="flex-1 bg-neutral-950 border border-neutral-800 px-3 py-2 text-xs text-white outline-none focus:border-white font-sans"
                />
                <button type="submit" className="px-3 bg-white text-black font-bold uppercase hover:bg-neutral-200 text-[10px]">
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          )}
        </main>
      )}

      {/* 2. لوحة تحكم الإدارة الكاملة (ENTERPRISE CMS CONSOLE) */}
      {view === 'admin' && (
        <div className="flex-1 max-w-[1720px] mx-auto px-6 sm:px-10 py-8 w-full flex flex-col md:flex-row gap-8 font-mono">
          <aside className={`w-full md:w-80 border ${themeStyles.border} ${themeStyles.card} p-5 shrink-0 h-fit space-y-6`}>
            <div className={`border-b ${themeStyles.border} pb-4`}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[9px] tracking-[0.3em] opacity-60 uppercase">ENTERPRISE CONSOLE</span>
                {currentUser.isOwner ? (
                  <span className="text-[9px] bg-amber-400/20 text-amber-300 border border-amber-400/40 px-1.5 py-0.5 font-bold">MASTER OWNER</span>
                ) : (
                  <span className="text-[9px] bg-neutral-800 text-neutral-300 px-1.5 py-0.5">{currentUser.roleTitle.split('/')[0]}</span>
                )}
              </div>
              <h2 className="text-sm font-bold tracking-[0.2em] uppercase">LOOM OPERATIONS</h2>
              <div className="text-[10px] opacity-70 truncate mt-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>{currentUser.email}</span>
              </div>
            </div>

            <nav className="space-y-1 text-xs tracking-[0.2em] uppercase">
              <button onClick={() => setAdminTab('waybills')} className={`w-full flex items-center justify-between px-3 py-3 transition text-left cursor-pointer ${adminTab === 'waybills' ? themeStyles.highlight : 'opacity-70 hover:opacity-100 hover:bg-neutral-800/40'}`}>
                <div className="flex items-center gap-2.5"><Printer className="w-3.5 h-3.5" /><span>WAYBILL STUDIO (4×6)</span></div>
                <span className="text-[9px] bg-emerald-950 text-emerald-300 px-1 py-0.5 font-bold">THERMAL</span>
              </button>

              <button onClick={() => setAdminTab('performance')} className={`w-full flex items-center justify-between px-3 py-3 transition text-left cursor-pointer ${adminTab === 'performance' ? themeStyles.highlight : 'opacity-70 hover:opacity-100 hover:bg-neutral-800/40'}`}>
                <div className="flex items-center gap-2.5"><Activity className="w-3.5 h-3.5" /><span>STAFF PERFORMANCE</span></div>
                <span className="text-[10px]">[{staff.length}]</span>
              </button>

              {currentUser.isOwner && (
                <button onClick={() => setAdminTab('revenue')} className={`w-full flex items-center justify-between px-3 py-3 transition text-left cursor-pointer ${adminTab === 'revenue' ? 'bg-amber-400 text-black font-bold' : 'text-amber-300 hover:bg-amber-950/40'}`}>
                  <div className="flex items-center gap-2.5"><DollarSign className="w-3.5 h-3.5" /><span>NET REVENUE & COGS</span></div>
                  <span className="text-[9px] bg-black/40 text-amber-300 px-1 py-0.5">OWNER</span>
                </button>
              )}

              <button onClick={() => setAdminTab('orders')} className={`w-full flex items-center justify-between px-3 py-3 transition text-left cursor-pointer ${adminTab === 'orders' ? themeStyles.highlight : 'opacity-70 hover:opacity-100 hover:bg-neutral-800/40'}`}>
                <div className="flex items-center gap-2.5"><ShoppingBag className="w-3.5 h-3.5" /><span>ORDERS & DISPATCH</span></div>
                <span className="text-[10px]">[{orders.length}]</span>
              </button>

              <button onClick={() => setAdminTab('couriers')} className={`w-full flex items-center justify-between px-3 py-3 transition text-left cursor-pointer ${adminTab === 'couriers' ? themeStyles.highlight : 'opacity-70 hover:opacity-100 hover:bg-neutral-800/40'}`}>
                <div className="flex items-center gap-2.5"><Truck className="w-3.5 h-3.5" /><span>COURIER PARTNERS</span></div>
                <span className="text-[10px]">[{couriers.length}]</span>
              </button>

              {currentUser.isOwner && (
                <button onClick={() => setAdminTab('gateways')} className={`w-full flex items-center justify-between px-3 py-3 transition text-left cursor-pointer ${adminTab === 'gateways' ? themeStyles.highlight : 'opacity-70 hover:opacity-100 hover:bg-neutral-800/40'}`}>
                  <div className="flex items-center gap-2.5"><CreditCard className="w-3.5 h-3.5" /><span>PAYMENT GATEWAYS</span></div>
                  <span className="text-[10px]">[{gateways.length}]</span>
                </button>
              )}

              <button onClick={() => setAdminTab('products')} className={`w-full flex items-center justify-between px-3 py-3 transition text-left cursor-pointer ${adminTab === 'products' ? themeStyles.highlight : 'opacity-70 hover:opacity-100 hover:bg-neutral-800/40'}`}>
                <div className="flex items-center gap-2.5"><Package className="w-3.5 h-3.5" /><span>CATALOG & DROPS</span></div>
                <span className="text-[10px]">[{products.length}]</span>
              </button>

              <button onClick={() => setAdminTab('design')} className={`w-full flex items-center justify-between px-3 py-3 transition text-left cursor-pointer ${adminTab === 'design' ? themeStyles.highlight : 'opacity-70 hover:opacity-100 hover:bg-neutral-800/40'}`}>
                <div className="flex items-center gap-2.5"><Palette className="w-3.5 h-3.5" /><span>THEME & CONTENT</span></div>
              </button>

              <button onClick={() => setAdminTab('staff')} className={`w-full flex items-center justify-between px-3 py-3 transition text-left cursor-pointer ${adminTab === 'staff' ? themeStyles.highlight : 'opacity-70 hover:opacity-100 hover:bg-neutral-800/40'}`}>
                <div className="flex items-center gap-2.5"><Users className="w-3.5 h-3.5" /><span>HIERARCHY & ROLES</span></div>
              </button>
            </nav>
          </aside>

          {/* محتوى لوحة التحكم */}
          <div className={`flex-1 border ${themeStyles.border} ${themeStyles.card} p-6 sm:p-8 min-h-[680px]`}>
            {/* استوديو بوالص الشحن الحرارية */}
            {adminTab === 'waybills' && (
              <div className="space-y-8">
                <div className={`border-b ${themeStyles.border} pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
                  <div>
                    <h3 className="text-base font-bold tracking-[0.2em] uppercase">
                      WAYBILL & SHIPPING LABEL ENGINE (PRINT STUDIO)
                    </h3>
                    <p className="text-xs opacity-70 font-sans tracking-normal mt-0.5">
                      طباعة بوالص الشحن الحرارية بمقاس 4×6 لطابعات الباركود (Zebra/Xprinter) وكذلك A4 و A6.
                    </p>
                  </div>
                  <button
                    onClick={() => window.print()}
                    className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-lg"
                  >
                    <Printer className="w-4 h-4" />
                    <span>طباعة البوليصة الحرارية الآن</span>
                  </button>
                </div>

                <div className={`border ${themeStyles.border} p-4 bg-black/30 flex flex-wrap items-center justify-between gap-4 text-xs`}>
                  <div className="flex items-center gap-3">
                    <span className="opacity-70 uppercase tracking-widest text-[10px]">SELECT ORDER:</span>
                    <select
                      value={activeWaybillOrder.id}
                      onChange={(e) => {
                        const found = orders.find((o) => o.id === e.target.value);
                        if (found) setActiveWaybillOrder(found);
                      }}
                      className="bg-black border border-neutral-700 px-3 py-1.5 text-xs text-white"
                    >
                      {orders.map((o) => (
                        <option key={o.id} value={o.id}>
                          #{o.id} — {o.customerName} ({o.totalAmount} ج.م)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="opacity-70 uppercase tracking-widest text-[10px]">مقاس الورق:</span>
                    <div className="flex border border-neutral-700">
                      <button onClick={() => setWaybillFormat('4x6')} className={`px-3 py-1 text-[10px] uppercase font-bold transition ${waybillFormat === '4x6' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'}`}>
                        4×6" حراري (Zebra)
                      </button>
                      <button onClick={() => setWaybillFormat('a4')} className={`px-3 py-1 text-[10px] uppercase font-bold transition ${waybillFormat === 'a4' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'}`}>
                        A4 ورقة كاملة
                      </button>
                      <button onClick={() => setWaybillFormat('a6')} className={`px-3 py-1 text-[10px] uppercase font-bold transition ${waybillFormat === 'a6' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'}`}>
                        A6 ملصق مدمج
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="opacity-70 uppercase tracking-widest text-[10px]">الباركود:</span>
                    <div className="flex border border-neutral-700">
                      <button onClick={() => setBarcodeType('code128')} className={`px-2.5 py-1 text-[10px] uppercase ${barcodeType === 'code128' ? 'bg-white text-black font-bold' : 'text-neutral-400'}`}>
                        CODE 128
                      </button>
                      <button onClick={() => setBarcodeType('qr')} className={`px-2.5 py-1 text-[10px] uppercase ${barcodeType === 'qr' ? 'bg-white text-black font-bold' : 'text-neutral-400'}`}>
                        QR CODE
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center p-6 bg-neutral-950/70 border border-neutral-800 overflow-x-auto">
                  {waybillFormat === '4x6' && (
                    <div className="w-[380px] bg-white text-black border-2 border-black p-5 shadow-2xl font-mono flex flex-col justify-between space-y-4">
                      <div className="border-b-2 border-black pb-3 flex items-start justify-between">
                        <div>
                          <div className="text-2xl font-serif font-black tracking-widest uppercase flex items-center">
                            <span>L</span>
                            <InfinityLogo className="w-6 h-4 mx-0.5" />
                            <span>M</span>
                          </div>
                          <span className="text-[9px] uppercase tracking-wider block font-bold">
                            HEAVYWEIGHT ATELIER CAIRO
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-black border-2 border-black px-2 py-0.5 uppercase bg-black text-white block">
                            {activeCourier.name.split(' ')[0]}
                          </span>
                          <span className="text-[9px] font-bold block mt-1">STANDARD EXPRESS</span>
                        </div>
                      </div>

                      <div className="text-center py-2 border-b-2 border-black space-y-1">
                        {barcodeType === 'code128' ? (
                          <div className="h-12 flex items-center justify-center space-x-1 overflow-hidden px-4">
                            {[2,4,1,3,2,5,1,2,4,2,3,1,4,2,1,5,3,2,4,1,2,3,4,1,3,2,5,1,4,2,3,1].map((w, idx) => (
                              <div key={idx} className="bg-black h-full" style={{ width: `${w * 2}px` }}></div>
                            ))}
                          </div>
                        ) : (
                          <div className="py-1 flex justify-center">
                            <QrCode className="w-16 h-16 text-black" />
                          </div>
                        )}
                        <span className="text-xs font-black tracking-[0.25em]">{activeWaybillOrder.waybillNumber}</span>
                      </div>

                      <div className="border-2 border-black bg-neutral-100 p-2 text-center">
                        <span className="text-xs font-black block font-sans">
                          ★ مسموح بالمعاينة والقياس مع المندوب قبل الدفع ★
                        </span>
                        <span className="text-[9px] font-mono uppercase tracking-wider block text-neutral-700">
                          DOORSTEP INSPECTION & FITTING AUTHORIZED
                        </span>
                      </div>

                      <div className="space-y-2 border-b-2 border-black pb-3 text-xs">
                        <div className="flex justify-between">
                          <span className="font-bold text-neutral-600">العميل:</span>
                          <span className="font-black font-sans uppercase">{activeWaybillOrder.customerName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-bold text-neutral-600">الهاتف:</span>
                          <span className="font-black font-mono">{activeWaybillOrder.phone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="font-bold text-neutral-600">المحافظة:</span>
                          <span className="font-black uppercase">{activeWaybillOrder.governorate.toUpperCase()}</span>
                        </div>
                        <div>
                          <span className="font-bold text-neutral-600 block">العنوان التفصيلي:</span>
                          <span className="font-sans font-bold block text-sm leading-snug mt-0.5">
                            {activeWaybillOrder.address} — {activeWaybillOrder.city}
                          </span>
                        </div>
                      </div>

                      <div className="border-b-2 border-black pb-3 text-[10px] space-y-1">
                        <span className="font-bold text-neutral-600 block uppercase">محتويات الطرد:</span>
                        {activeWaybillOrder.items.map((it, idx) => (
                          <div key={idx} className="flex justify-between font-sans font-medium">
                            <span>• {it.name}</span>
                            <span className="font-bold font-mono">x{it.qty}</span>
                          </div>
                        ))}
                      </div>

                      <div className="bg-black text-white p-3 flex items-center justify-between">
                        <div>
                          <span className="text-[9px] font-bold tracking-widest block uppercase text-neutral-300">
                            CASH TO COLLECT (COD)
                          </span>
                          <span className="text-[11px] font-sans font-bold text-neutral-200">
                            المطلوب تحصيله نقدياً
                          </span>
                        </div>
                        <div className="text-2xl font-black font-mono">
                          {activeWaybillOrder.totalAmount} EGP
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* تقارير الأرباح والمصروفات الخاصة بالمالك فقط */}
            {adminTab === 'revenue' && currentUser.isOwner && (
              <div className="space-y-8">
                <div className={`border-b ${themeStyles.border} pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-amber-400 text-xs font-bold uppercase tracking-widest bg-amber-950/40 border border-amber-500/30 px-2 py-0.5">
                        MASTER FINANCIAL LEDGER
                      </span>
                      <span className="text-[10px] opacity-60 font-mono">ENCRYPTED & OWNER-ONLY</span>
                    </div>
                    <h3 className="text-base font-bold tracking-[0.2em] uppercase mt-1">
                      GROSS REVENUE VS NET EARNINGS & COD RECONCILIATION
                    </h3>
                  </div>
                  <button
                    onClick={() => showToast('تم تصدير كشف الحساب المالي')}
                    className="px-4 py-2 bg-amber-400 text-black font-bold text-xs uppercase hover:bg-amber-300 flex items-center gap-2"
                  >
                    <FileSpreadsheet className="w-3.5 h-3.5" />
                    <span>EXPORT LEDGER (EXCEL)</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className={`border ${themeStyles.border} p-5 bg-black/40 space-y-1`}>
                    <span className="text-[10px] opacity-60 tracking-[0.2em] uppercase block">إجمالي المبيعات (GROSS)</span>
                    <div className="text-2xl font-serif">{financialMetrics.grossSales.toLocaleString()} EGP</div>
                    <span className="text-[10px] opacity-70">{financialMetrics.ordersCount} طلبات مؤكدة</span>
                  </div>

                  <div className={`border ${themeStyles.border} p-5 bg-black/40 space-y-1`}>
                    <span className="text-[10px] opacity-60 tracking-[0.2em] uppercase block">تكلفة الخامات والتصنيع (COGS)</span>
                    <div className="text-2xl font-serif text-rose-300">-{financialMetrics.totalCogs.toLocaleString()} EGP</div>
                    <span className="text-[10px] opacity-70">ميلتون 460 جرام وقص وتطريز</span>
                  </div>

                  <div className={`border ${themeStyles.border} p-5 bg-black/40 space-y-1`}>
                    <span className="text-[10px] opacity-60 tracking-[0.2em] uppercase block">رسوم الشحن والتوصيل</span>
                    <div className="text-2xl font-serif text-amber-200">-{financialMetrics.totalShippingCost.toLocaleString()} EGP</div>
                    <span className="text-[10px] opacity-70">تسديدات بوسطة / مايلرز</span>
                  </div>

                  <div className="border border-amber-500/50 p-5 bg-amber-950/20 space-y-1">
                    <span className="text-[10px] text-amber-300 tracking-[0.2em] uppercase block font-bold">صافي أرباح المالك (NET PROFIT)</span>
                    <div className="text-3xl font-serif text-amber-400 font-bold">{financialMetrics.netProfit.toLocaleString()} EGP</div>
                    <span className="text-[10px] text-emerald-400 font-bold">هامش الربح الصافي: {financialMetrics.netMarginPercent}%</span>
                  </div>
                </div>
              </div>
            )}

            {/* شاشة إدارة المنتجات وإضافة قطع جديدة */}
            {adminTab === 'products' && (
              <div className="space-y-8">
                <div className={`border-b ${themeStyles.border} pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4`}>
                  <div>
                    <h3 className="text-base font-bold tracking-[0.2em] uppercase">CATALOG INVENTORY & DROPS</h3>
                    <p className="text-xs opacity-70 font-sans tracking-normal mt-0.5">التحكم في الأسعار، الخامات، والكميات المتوفرة بالمخزون.</p>
                  </div>
                  <button
                    onClick={() => {
                      const name = prompt('اسم القطعة الجديدة:');
                      const price = prompt('سعر البيع (ج.م):');
                      if (name && price) {
                        const newItem = {
                          id: `loom-0${products.length + 1}`,
                          ref: `REF. 0482/10${products.length + 1}`,
                          title: name.toUpperCase(),
                          subtitle: 'NEW DROP ARCHIVE',
                          category: 'hoodies',
                          gender: 'UNISEX',
                          price: Number(price),
                          salePrice: Number(price) - 100,
                          cogs: Number(price) * 0.4,
                          badge: 'NEW DROP',
                          fabric: '480 GSM Cotton',
                          stock: 25,
                          sizes: ['M/L', 'L/XL'],
                          image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=1200&q=85',
                          description: 'ميلتون مصري فائق النعومة بوزن 480 جرام.',
                          highlight: 'إصدار جديد'
                        };
                        setProducts([newItem, ...products]);
                        showToast('تمت إضافة المنتج للكتالوج بنجاح');
                      }
                    }}
                    className={`px-5 py-2.5 ${themeStyles.highlight} text-xs tracking-[0.2em] uppercase font-bold flex items-center gap-2 cursor-pointer`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>إضافة تصميم جديد للكتالوج</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border border-neutral-800 divide-y divide-neutral-800">
                    <thead>
                      <tr className="bg-black/60 opacity-70 tracking-[0.2em] uppercase">
                        <th className="py-3 px-3">المنتج والرمز</th>
                        <th className="py-3 px-3">وزن الخامة</th>
                        <th className="py-3 px-3">التكلفة (COGS)</th>
                        <th className="py-3 px-3">السعر الأصلي</th>
                        <th className="py-3 px-3">سعر البيع</th>
                        <th className="py-3 px-3">المخزون</th>
                        <th className="py-3 px-3 text-center">إجراءات</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800">
                      {products.map((item) => (
                        <tr key={item.id} className="hover:bg-neutral-900/40">
                          <td className="py-3 px-3 flex items-center gap-3">
                            <img src={item.image} alt={item.title} className="w-11 h-14 object-cover bg-neutral-900 filter grayscale-[20%]" />
                            <div>
                              <div className="font-bold uppercase tracking-wider">{item.title}</div>
                              <div className="text-[10px] opacity-60">{item.ref}</div>
                            </div>
                          </td>
                          <td className="py-3 px-3 opacity-80">{item.fabric}</td>
                          <td className="py-3 px-3 opacity-70 font-mono">{item.cogs || 200} ج.م</td>
                          <td className="py-3 px-3 opacity-50 line-through">{item.price} ج.م</td>
                          <td className="py-3 px-3 font-bold">{item.salePrice || item.price} ج.م</td>
                          <td className="py-3 px-3">
                            <span className="text-[10px] border border-neutral-700 px-2 py-0.5 uppercase">{item.stock} قطعة</span>
                          </td>
                          <td className="py-3 px-3 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <button
                                onClick={() => {
                                  const pr = prompt('أدخل سعر البيع الجديد (ج.م):', item.salePrice || item.price);
                                  if (pr) {
                                    setProducts(products.map((p) => p.id === item.id ? { ...p, salePrice: Number(pr) } : p));
                                    showToast('تم تحديث السعر');
                                  }
                                }}
                                className="p-1.5 opacity-70 hover:opacity-100 cursor-pointer"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => {
                                  setProducts(products.filter((p) => p.id !== item.id));
                                  showToast('تم حذف المنتج');
                                }}
                                className="p-1.5 opacity-50 hover:text-rose-400 cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* حاسبة المقاسات التفاعلية المتقدمة */}
      {showSizeAdvisor && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-6 text-white">
          <div className="border border-neutral-800 bg-[#0a0a0a] max-w-lg w-full p-8 relative font-mono">
            <button onClick={() => setShowSizeAdvisor(false)} className="absolute top-6 right-6 text-neutral-400 hover:text-white cursor-pointer">
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] tracking-[0.3em] text-neutral-500 uppercase block mb-1">ATELIER MEASUREMENTS</span>
            <h3 className="font-serif text-2xl font-light tracking-[0.15em] text-white uppercase mb-6">SIZE & SILHOUETTE CALCULATOR</h3>

            <div className="space-y-6 mb-8 border border-neutral-900 p-6 bg-black">
              <div>
                <div className="flex justify-between text-xs mb-2 text-neutral-300">
                  <span>الوزن (BODY WEIGHT):</span>
                  <span className="text-white font-bold">{calcWeight} KG</span>
                </div>
                <input type="range" min="50" max="120" value={calcWeight} onChange={(e) => setCalcWeight(Number(e.target.value))} className="w-full accent-white" />
              </div>

              <div>
                <div className="flex justify-between text-xs mb-2 text-neutral-300">
                  <span>الطول (HEIGHT):</span>
                  <span className="text-white font-bold">{calcHeight} CM</span>
                </div>
                <input type="range" min="155" max="205" value={calcHeight} onChange={(e) => setCalcHeight(Number(e.target.value))} className="w-full accent-white" />
              </div>
            </div>

            <div className="border border-neutral-700 p-6 space-y-2 mb-6">
              <span className="text-[10px] tracking-[0.25em] text-neutral-400 uppercase block">المقاس الموصى به لإطلالة أوفرسايز مميزة</span>
              <div className="text-2xl font-serif text-white">{recommendedSize.size}</div>
              <p className="text-xs text-neutral-400 font-sans tracking-wide">{recommendedSize.fit}</p>
            </div>

            <div className="text-neutral-400 font-sans text-xs flex items-center gap-2 border-t border-neutral-900 pt-4">
              <ShieldCheck className="w-4 h-4 text-white shrink-0" />
              <span>متاح قياس القطعة وتجربتها مع المندوب قبل دفع أي جنيه.</span>
            </div>
          </div>
        </div>
      )}

      {/* سلة الشراء وإتمام الطلب (COD) */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/80 backdrop-blur-sm flex justify-end text-white">
          <div className="w-full max-w-md bg-[#0a0a0a] h-full border-l border-neutral-800 flex flex-col justify-between font-mono">
            <div className="p-6 border-b border-neutral-900 flex items-center justify-between text-xs tracking-[0.25em] uppercase">
              <span className="text-white font-bold">حقيبة التسوق [{cart.reduce((s, i) => s + i.quantity, 0)}]</span>
              <button onClick={() => setIsCartOpen(false)} className="text-neutral-400 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="py-20 text-center text-neutral-600 space-y-3">
                  <div className="text-xs uppercase tracking-[0.2em]">الحقيبة فارغة حالياً</div>
                  <button onClick={() => setIsCartOpen(false)} className="px-6 py-2.5 border border-neutral-700 text-neutral-300 text-[10px] tracking-[0.2em] uppercase hover:border-white cursor-pointer">
                    العودة للكتالوج
                  </button>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.key} className="flex gap-4 border-b border-neutral-900 pb-4">
                        <img src={item.image} alt={item.title} className="w-14 h-18 object-cover bg-neutral-950 filter grayscale-[15%]" />
                        <div className="flex-1 space-y-1">
                          <h4 className="text-xs font-bold text-white uppercase tracking-wider">{item.title}</h4>
                          <div className="text-[10px] text-neutral-500">مقاس: {item.size} • عدد: {item.quantity}</div>
                          <div className="text-xs text-white">{item.price} ج.م</div>
                        </div>
                        <button onClick={() => removeFromCart(item.key)} className="text-neutral-500 hover:text-white cursor-pointer">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handlePlaceOrder} className="pt-4 border-t border-neutral-900 space-y-4 font-sans">
                    <div className="flex items-center justify-between font-mono text-xs tracking-wider">
                      <span className="text-white uppercase font-bold">بيانات التوصيل والشحن</span>
                      <span className="text-[11px] text-neutral-400">معاينة وقياس منزلي</span>
                    </div>

                    <div>
                      <input
                        type="text"
                        required
                        placeholder="الاسم ثلاثي (Full Name)"
                        value={checkoutData.name}
                        onChange={(e) => setCheckoutData({ ...checkoutData, name: e.target.value })}
                        className="w-full bg-black border border-neutral-800 p-3 text-xs text-white focus:border-white outline-none"
                      />
                    </div>

                    <div>
                      <input
                        type="tel"
                        required
                        placeholder="رقم الهاتف (WhatsApp Mobile)"
                        value={checkoutData.phone}
                        onChange={(e) => setCheckoutData({ ...checkoutData, phone: e.target.value })}
                        className="w-full bg-black border border-neutral-800 p-3 text-xs text-white focus:border-white outline-none font-mono"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <select
                        value={checkoutData.governorate}
                        onChange={(e) => setCheckoutData({ ...checkoutData, governorate: e.target.value })}
                        className="bg-black border border-neutral-800 p-3 text-xs text-white"
                      >
                        {EGYPT_GOVERNORATES.map((g) => {
                          const cost = activeCourier.rates[g.id] || g.defaultCost;
                          return (
                            <option key={g.id} value={g.id}>
                              {g.name} (+{cost}ج)
                            </option>
                          );
                        })}
                      </select>
                      <input
                        type="text"
                        required
                        placeholder="المنطقة أو الحي"
                        value={checkoutData.cityArea}
                        onChange={(e) => setCheckoutData({ ...checkoutData, cityArea: e.target.value })}
                        className="w-full bg-black border border-neutral-800 p-3 text-xs text-white focus:border-white outline-none"
                      />
                    </div>

                    <div>
                      <input
                        type="text"
                        required
                        placeholder="العنوان التفصيلي (الشارع ورقم العمارة)"
                        value={checkoutData.address}
                        onChange={(e) => setCheckoutData({ ...checkoutData, address: e.target.value })}
                        className="w-full bg-black border border-neutral-800 p-3 text-xs text-white focus:border-white outline-none"
                      />
                    </div>

                    <div className="border border-neutral-900 p-4 space-y-2 font-mono text-xs">
                      <div className="flex justify-between text-neutral-500">
                        <span>قيمة المنتجات:</span>
                        <span>{cartSubtotal} EGP</span>
                      </div>
                      <div className="flex justify-between text-neutral-500">
                        <span>الشحن ({activeCourier.name.split(' ')[0]}):</span>
                        <span>{calculatedShippingCost} EGP</span>
                      </div>
                      <div className="flex justify-between text-white font-bold border-t border-neutral-900 pt-2">
                        <span>المطلوب تحصيله كاش عند الاستلام:</span>
                        <span>{cartSubtotal + calculatedShippingCost} EGP</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-white text-black font-mono text-xs tracking-[0.25em] uppercase font-bold hover:bg-neutral-200 transition cursor-pointer"
                    >
                      تأكيد الأوردر والشحن (COD)
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* الفوتر التحريري */}
      <footer className={`border-t ${themeStyles.border} py-16 font-mono text-xs opacity-70`}>
        <div className="max-w-[1720px] mx-auto px-6 sm:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="font-serif text-2xl tracking-[0.2em] uppercase mb-1 flex items-center">
              <span>LOOM</span>
              <InfinityLogo className="w-5 h-3 mx-1" />
              <span>STUDIOS</span>
            </div>
            <div className="text-[10px] tracking-[0.3em] opacity-60 uppercase">
              HEAVYWEIGHT COTTON ATELIER / CAIRO
            </div>
          </div>

          <div className="flex flex-wrap gap-8 text-[10px] tracking-[0.25em] uppercase">
            <span>COLLECTION 2026</span>
            <span>•</span>
            <span>DOORSTEP TRY-ON GUARANTEE</span>
            <span>•</span>
            <span>DISPATCH: {activeCourier.name}</span>
          </div>

          <div className="text-[10px] opacity-60 tracking-[0.2em]">
            © 2026 LOOM STUDIOS. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </div>
  );
}
