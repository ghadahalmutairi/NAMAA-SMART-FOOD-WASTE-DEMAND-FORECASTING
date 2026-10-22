import { useState } from 'react';
import Showcase from './Showcase';
import {
  Activity, ArrowDownLeft, ArrowUpLeft, BarChart3, BrainCircuit, Check,
  ChevronLeft, Database, Leaf,
  Menu, ShieldCheck, Sparkles, Target, TrendingDown, Users, X, CalendarDays,
  Settings2, Upload, Layers3, Lightbulb, Smartphone, Linkedin, Code2,
} from 'lucide-react';

type ScreenKey = 'dashboard' | 'reports' | 'goals' | 'advisor' | 'settings' | 'login';

const screens: { id: ScreenKey; label: string; en: string; icon: typeof Activity; description: string }[] = [
  { id: 'dashboard', label: 'الرئيسية', en: 'Dashboard', icon: Activity, description: 'نظرة سريعة على أداء المطعم والتوقعات وأبرز المؤشرات.' },
  { id: 'reports', label: 'التقارير والتحليلات', en: 'Reports & Analytics', icon: BarChart3, description: 'تحليل المبيعات والهدر ومقارنة الطلب المتوقع بالفعلي.' },
  { id: 'goals', label: 'الأهداف', en: 'Goals', icon: Target, description: 'تحديد أهداف قابلة للقياس ومتابعة التقدم نحوها.' },
  { id: 'advisor', label: 'مستشار نماء', en: 'Namaa Advisor', icon: Sparkles, description: 'رؤى مبنية على البيانات تساعد على فهم التغيرات واتخاذ القرار.' },
  { id: 'settings', label: 'الإعدادات', en: 'Settings', icon: Settings2, description: 'إدارة الحساب وبيانات المطعم وتفضيلات التطبيق.' },
  { id: 'login', label: 'الدخول والتسجيل', en: 'Authentication', icon: ShieldCheck, description: 'واجهة دخول وتسجيل لتنظيم الوصول إلى بيانات كل مطعم.' },
];

const team = [
  { name: 'Ghadah Almutairi', role: 'تطوير المشروع', url: 'https://www.linkedin.com/in/ghadah-almutairii' },
  { name: 'Ghaida Almukhlifi', role: 'تطوير المشروع', url: 'https://www.linkedin.com/in/ghaida-almukhlifi-11a3143b3/' },
  { name: 'Rawnah Alhasson', role: 'تطوير المشروع', url: 'https://www.linkedin.com/in/rawnah-yousef-alhasson-18a846383' },
  { name: 'Aknan Alshubrumi', role: 'تطوير المشروع', url: 'https://www.linkedin.com/in/aknan-alshubrumi-b2b67128b' },
];

function MiniChart({ purple = false }: { purple?: boolean }) {
  const values = [34, 48, 42, 61, 51, 73, 58, 86, 67, 93, 76, 88];
  return <div className={`mini-chart ${purple ? 'purple-chart' : ''}`} aria-label="رسم توضيحي للبيانات">{values.map((v, i) => <span key={i} style={{ height: `${v}%` }} />)}</div>;
}

function ScreenPreview({ screen }: { screen: ScreenKey }) {
  if (screen === 'reports') return <div className="mock-screen">
    <div className="mock-top"><div><span className="muted tiny">NAMAA / ANALYTICS</span><h3>التقارير والتحليلات</h3></div><span className="mock-icon"><BarChart3 size={17}/></span></div>
    <div className="mock-tabs"><span className="selected">٧ أيام</span><span>٣٠ يومًا</span><span>مخصص</span></div>
    <div className="stat-grid"><div className="stat-box"><span>إجمالي المبيعات</span><b>24,680 <small>ر.س</small></b><em className="positive">↗ 12.4%</em></div><div className="stat-box"><span>دقة التوقع</span><b>93.6%</b><em className="positive">↗ 3.2%</em></div></div>
    <div className="mock-card"><div className="card-heading"><b>المبيعات خلال الفترة</b><span className="muted tiny">مقارنة أسبوعية</span></div><MiniChart/></div>
    <div className="mock-card"><div className="card-heading"><b>التوقع مقابل الفعلي</b><span className="tiny orange-text">+ 4.8%</span></div><div className="compare-row"><span>متوقع</span><div><i style={{width:'78%'}}/></div><b>713</b></div><div className="compare-row"><span>فعلي</span><div><i className="purple-fill" style={{width:'83%'}}/></div><b>747</b></div></div>
  </div>;
  if (screen === 'goals') return <div className="mock-screen">
    <div className="mock-top"><div><span className="muted tiny">NAMAA / PERFORMANCE</span><h3>أهداف المطعم</h3></div><span className="mock-icon"><Target size={17}/></span></div>
    <div className="goal-summary"><span>الأهداف النشطة</span><b>03</b><small>هدف قيد المتابعة</small></div>
    {[['خفض هدر الطعام','خفض الهدر بنسبة 20%','68%','68%'],['رفع دقة التوقع','الوصول إلى دقة 95%','82%','82%'],['تحسين كفاءة الإنتاج','تقليل الفائض الأسبوعي','54%','54%']].map(([title,sub,pct,tag],i)=><div className="goal-row" key={title}><div className="goal-symbol">{i===0?<Leaf size={17}/>:i===1?<Target size={17}/>:<TrendingDown size={17}/>}</div><div className="goal-content"><b>{title}</b><span>{sub}</span><div className="progress-track"><i style={{width:pct}}/></div></div><strong>{tag}</strong></div>)}
    <div className="mock-footnote"><Check size={14}/> يتم تحديث التقدم وفق البيانات المسجلة</div>
  </div>;
  if (screen === 'advisor') return <div className="mock-screen">
    <div className="mock-top"><div><span className="muted tiny">NAMAA / AI INSIGHTS</span><h3>مستشار نماء</h3></div><span className="mock-icon purple-icon"><Sparkles size={17}/></span></div>
    <div className="advisor-banner"><span className="advisor-orb"><BrainCircuit size={25}/></span><div><b>رؤى من بياناتك</b><span>ملخص تحليلي توضيحي</span></div><span className="live-dot"/></div>
    <div className="insight-card"><div className="insight-label"><TrendingDown size={15}/> فرصة لتقليل الهدر</div><h4>مراجعة الأصناف ذات الفائض المتكرر</h4><p>تشير البيانات المعروضة إلى وجود فرصة لمواءمة الكميات المخططة مع الطلب الفعلي في بعض الأيام.</p><div className="insight-tag">تحليل تشغيلي</div></div>
    <div className="insight-card purple-border"><div className="insight-label purple-text"><BarChart3 size={15}/> دقة التوقع</div><h4>الأداء يتحسن مع اكتمال السجل</h4><p>تساعد البيانات التاريخية الأكثر انتظامًا على تقييم أنماط الطلب بصورة أوضح.</p><div className="insight-tag purple-tag">اقتراح للمراجعة</div></div>
    <div className="advisor-disclaimer">هذه معاينة للواجهة، وليست نتيجة حقيقية من نموذج متصل.</div>
  </div>;
  if (screen === 'settings') return <div className="mock-screen">
    <div className="mock-top"><div><span className="muted tiny">NAMAA / PREFERENCES</span><h3>الإعدادات</h3></div><span className="mock-icon"><Settings2 size={17}/></span></div>
    <div className="profile-row"><div className="profile-avatar">NM</div><div><b>مدير المطعم</b><span>admin@namaa.sa</span></div><span className="status-chip">حساب تجريبي</span></div>
    <div className="settings-group"><span className="muted tiny">إدارة الحساب</span>{[['معلومات المطعم','اسم المطعم وبياناته'],['إعدادات التوقع','هامش الأمان وتفضيلات التحليل'],['إدارة البيانات','استيراد ملفات المبيعات'],['الخصوصية والأمان','خيارات الحساب والوصول']].map(([a,b],i)=><div className="settings-row" key={a}><span className="settings-icon">{i===0?<Users size={16}/>:i===1?<Activity size={16}/>:i===2?<Database size={16}/>:<ShieldCheck size={16}/>}</span><div><b>{a}</b><small>{b}</small></div><ChevronLeft size={15}/></div>)}</div>
  </div>;
  if (screen === 'login') return <div className="mock-screen auth-preview">
    <div className="auth-brand"><span className="brand-mark small"><img src="/namaa-logo.jpg" alt="شعار نماء"/></span><b>نماء<span>.</span></b><small>SMART FOOD WASTE & DEMAND FORECASTING</small></div>
    <div className="auth-card"><span className="muted tiny">مرحبًا بعودتك</span><h3>تسجيل الدخول</h3><p>الدخول إلى مساحة العمل لمتابعة مؤشرات المطعم.</p><label>البريد الإلكتروني</label><div className="fake-input">name@restaurant.com</div><label>كلمة المرور</label><div className="fake-input">•••••••••• <span>◉</span></div><div className="auth-button">تسجيل الدخول <ArrowUpLeft size={15}/></div><div className="auth-switch">ليس لديك حساب؟ <b>إنشاء حساب</b></div></div>
    <div className="auth-note"><ShieldCheck size={14}/> معاينة بصرية فقط — لا يتم إرسال بيانات.</div>
  </div>;
  return <div className="mock-screen">
    <div className="mock-top"><div><span className="muted tiny">WEDNESDAY, MAY 14</span><h3>ملخص الأداء</h3></div><span className="mock-icon"><CalendarDays size={17}/></span></div>
    <div className="welcome-line"><div><span className="muted tiny">أهلًا بك في نماء</span><b>صورة أوضح لأداء مطعمك</b></div><span className="avatar-dot">ن</span></div>
    <div className="stat-grid four-stats"><div className="stat-box"><span>المبيعات</span><b>713</b><small>طلبًا مسجلًا</small></div><div className="stat-box purple-stat"><span>التوقع</span><b>815</b><small>طلبًا متوقعًا</small></div><div className="stat-box"><span>الهدر</span><b>6.0%</b><small>من الإنتاج</small></div><div className="stat-box orange-stat"><span>قيمة الفائض</span><b>414 <small>ر.س</small></b><small>خلال الفترة</small></div></div>
    <div className="mock-card"><div className="card-heading"><b>اتجاه المبيعات والطلب</b><span className="tiny muted">آخر ١٢ فترة</span></div><MiniChart/></div>
    <div className="mock-card forecast-card"><div className="forecast-head"><div className="forecast-symbol"><BrainCircuit size={17}/></div><div><b>توقع الطلب</b><span>تحليل مبني على البيانات التاريخية</span></div><span className="tiny purple-text">AI</span></div><div className="forecast-bottom"><span>التوقع التالي</span><b>815 <small>طلبًا</small></b></div></div>
    <div className="mock-nav"><span className="active"><Activity size={14}/>الرئيسية</span><span><BarChart3 size={14}/>التقارير</span><span><Target size={14}/>الأهداف</span><span><Sparkles size={14}/>المستشار</span><span><Settings2 size={14}/>الإعدادات</span></div>
  </div>;
}

function App() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [previousSales, setPreviousSales] = useState(500);
  const [trend, setTrend] = useState(0);
  const [buffer, setBuffer] = useState(5);
  const [scenario, setScenario] = useState<'normal' | 'weekend' | 'quiet'>('normal');
  const scenarioTrend = scenario === 'weekend' ? Math.max(trend, 20) : scenario === 'quiet' ? Math.min(trend, -15) : trend;
  const forecastDemand = Math.max(0, Math.round(previousSales * (1 + scenarioTrend / 100)));
  const traditionalPlan = Math.round(previousSales * 1.15);
  const namaaPlan = Math.round(forecastDemand * (1 + buffer / 100));
  const traditionalGap = traditionalPlan - forecastDemand;
  const namaaGap = namaaPlan - forecastDemand;
  const formatQty = (value: number) => new Intl.NumberFormat('en-US').format(value);

  return <div className="site-shell" dir="rtl">
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="#home" aria-label="نماء - الصفحة الرئيسية"><span className="brand-mark"><img src="/namaa-logo.jpg" alt="شعار نماء"/></span><span>نماء<span className="brand-dot">.</span><small>NAMAA · SMART FORECASTING</small></span></a>
        <nav className={`main-nav ${mobileOpen ? 'nav-open' : ''}`}>
          <a href="#about" onClick={() => setMobileOpen(false)} >عن نماء </a><a href="#features" onClick={() => setMobileOpen(false)}>المزايا</a><a href="#screens" onClick={() => setMobileOpen(false)}>الواجهات</a><a href="#lab" onClick={() => setMobileOpen(false)}>المختبر</a><a href="#team" onClick={() => setMobileOpen(false)}>فريق العمل</a>
        </nav>
        <a className="header-cta" href="#screens">استكشاف الواجهات <ArrowUpLeft size={15}/></a>
        <button className="mobile-menu" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? 'إغلاق القائمة' : 'فتح القائمة'}>{mobileOpen ? <X/> : <Menu/>}</button>
      </div>
    </header>

    <main>
      <section id="home" className="hero-section">
        <div className="hero-grid-bg"/>
        <div className="container hero-layout">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot"/> نظام ذكي · باستخدام الذكاء الاصطناعي وتحليل البيانات</div>
            <h1>قرارات أذكى،<br/><span>وهدر أقل.</span></h1>
            <p className="hero-lead">نماء منصة للتنبؤ بطلب المطاعم وإدارة هدر الطعام، تحوّل بيانات المبيعات السابقة إلى توقعات ومؤشرات تساعد على تخطيط أدق وقرارات تشغيلية أوضح.</p>
            <div className="hero-actions"><a className="button-primary" href="#about">اكتشاف المشروع <ArrowDownLeft size={17}/></a><a className="button-secondary" href="#screens"><Smartphone size={16}/> مشاهدة واجهات النظام</a></div>
            <div className="hero-proof"><span><ShieldCheck size={15}/> تحليل مبني على البيانات</span><i/><span><Leaf size={15}/> دعم الاستدامة وتقليل الهدر</span></div>
          </div>
          <div className="hero-visual">
            <div className="visual-glow glow-orange"/><div className="visual-glow glow-purple"/>
            <div className="hero-phones" aria-label="واجهات تطبيق نماء على الجوال">
              <div className="hero-phone hero-phone-back"><div className="hero-phone-screen"><img src="/screens/advisor-insight.jpg" alt="واجهة تحليل مستشار نماء" draggable={false}/></div></div>
              <div className="hero-phone hero-phone-front"><div className="hero-phone-screen"><img src="/screens/dashboard.jpg" alt="واجهة الرئيسية في تطبيق نماء" draggable={false}/></div><span className="hero-phone-glare"/></div>
              <div className="hero-phone hero-phone-side"><div className="hero-phone-screen"><img src="/screens/reports.jpg" alt="واجهة التقارير والتحليلات" draggable={false}/></div></div>
            </div>
            <div className="floating-chip chip-top"><span className="chip-icon"><BrainCircuit size={17}/></span><div><b>AI Forecast</b><small>توقع الطلب</small></div><span className="chip-signal"/></div>
            <div className="floating-chip chip-bottom"><span className="chip-icon purple-chip"><BarChart3 size={17}/></span><div><b>تحليلات واضحة</b><small>مبيعات · هدر · أهداف</small></div></div>
          </div>
        </div>
        <div className="container hero-bottom"><span>من البيانات إلى القرار</span><div/><span> <b>·</b> <b>·</b> </span></div>
      </section>

      <section id="about" className="section about-section">
        <div className="container">
          <div className="section-heading split-heading"><div><span className="eyebrow">01 / عن نماء</span><h2>من بيانات المبيعات<br/>إلى <span className="gradient-text">توقع أكثر وعيًا.</span></h2></div><p>نماء نظام يربط تحليل البيانات بالاحتياج اليومي للمطاعم، من خلال التنبؤ بالطلب المتوقع ومتابعة مؤشرات الأداء والهدر ضمن تجربة واحدة.</p></div>
          <div className="about-grid">
            <article className="about-main-card"><span className="large-line-number">01</span><span className="card-icon orange-icon"><Activity size={21}/></span><h3>ما هو نماء؟</h3><p>نظام ذكي يساعد أصحاب المطاعم على فهم أنماط الطلب اعتمادًا على سجلات المبيعات التاريخية، ثم يعرض توقعات وتوصيات كمية قابلة للمراجعة قبل اتخاذ القرار.</p><div className="tag-row"><span>Demand Forecasting</span><span>Food Waste Analytics</span></div></article>
            <article className="about-side-card problem-card"><span className="card-icon purple-icon"><Target size={20}/></span><h3>التحدّي</h3><p>التقدير غير الدقيق للطلب قد يؤدي إلى فائض في الإنتاج وهدر وتكاليف إضافية، أو نقص في الكميات يؤثر في رضا العملاء وفرص البيع.</p><div className="card-bottom-label"><span/> مشكلة تشغيلية تحتاج بيانات أدق</div></article>
            <article className="about-side-card solution-card"><span className="card-icon green-icon"><Lightbulb size={20}/></span><h3>الحل المقترح</h3><p>تحليل السجلات السابقة والعوامل المؤثرة في الطلب، ثم تقديم توقعات ومؤشرات تساعد على مواءمة الكميات المخططة مع الاحتياج المتوقع.</p><div className="card-bottom-label"><span/> من التقدير إلى القرار المبني على البيانات</div></article>
          </div>
          <div className="mission-strip"><span className="mission-mark"><Leaf size={22}/></span><div><b>هدف نماء</b><p>تقليل الهدر، دعم كفاءة التشغيل، وتوفير رؤية أوضح لأداء المطعم من خلال التنبؤ والتحليلات.</p></div><span className="mission-en"><br/></span></div>
        </div>
      </section>

      <section id="features" className="section features-section">
        <div className="container">
          <div className="section-heading centered-heading"><span className="eyebrow">02 / المزايا الأساسية</span><h2>كل ما تحتاجه لفهم <span className="gradient-text">الصورة كاملة.</span></h2><p>أدوات مترابطة تجمع بين التوقع، المتابعة، والتحليل في مكان واحد.</p></div>
          <div className="features-grid">
            {[
              { icon: Upload, no: '01', title: 'استيراد بيانات المبيعات', text: 'رفع ملفات CSV أو Excel والتحقق من السجلات الجديدة والمكررة وغير الصالحة.' },
              { icon: BrainCircuit, no: '02', title: 'التنبؤ بالطلب', text: 'استخدام بيانات المبيعات التاريخية للتعرف على الأنماط وتقدير الطلب القادم.' },
              { icon: BarChart3, no: '03', title: 'التقارير والتحليلات', text: 'عرض اتجاهات المبيعات والهدر ومقارنة التوقعات بالنتائج الفعلية.' },
              { icon: Target, no: '04', title: 'إدارة الأهداف', text: 'تحديد أهداف مثل خفض الهدر وتحسين دقة التوقع ومتابعة التقدم.' },
              { icon: Sparkles, no: '05', title: 'مستشار نماء', text: 'عرض رؤى مبنية على المؤشرات لمساعدة المستخدم على تحديد ما يستحق المراجعة.' },
              { icon: ShieldCheck, no: '06', title: 'إدارة الحساب والبيانات', text: 'تنظيم الوصول إلى بيانات المطعم والتحقق من المدخلات وحماية المعلومات.' },
            ].map(({icon: Icon,no,title,text})=><article className="feature-card" key={no}><div className="feature-card-top"><span className="card-icon"><Icon size={20}/></span><span className="feature-number">{no}</span></div><h3>{title}</h3><p>{text}</p><span className="feature-arrow"><ArrowUpLeft size={16}/></span></article>)}
          </div>
        </div>
      </section>

      <section id="screens" className="section screens-section sx-section">
        <div className="container">
          <div className="section-heading centered-heading sx-heading">
            <span className="eyebrow">03 / واجهات التطبيق</span>
            <h2>نماء في جيبك،<br/><span className="gradient-text">بكل تفاصيله.</span></h2>
            <p>التنقل بين الواجهات الحقيقية للتطبيق بالأسهم أو بالسحب، أو اختيار أي شاشة من الشريط السفلي.</p>
          </div>
          <Showcase />
        </div>
      </section>

      <section id="lab" className="section lab-section">
        <div className="container">
          <div className="section-heading split-heading">
            <div><span className="eyebrow">04 / مختبر نماء التفاعلي</span><h2>بتغيير الأرقام،<br/><span className="gradient-text">يظهر الفرق.</span></h2></div>
            <p>يمكن تجربة سيناريوهات مختلفة للطلب ومشاهدة كيف يختلف التخطيط الثابت عن توصية تراعي تغير الطلب المتوقع. هذه محاكاة تعليمية مبسطة لشرح الفكرة، وليست تشغيلًا للنموذج المدرّب داخل التطبيق.</p>
          </div>
          <div className="lab-layout">
            <div className="lab-controls">
              <div className="lab-panel-title"><span className="lab-panel-icon"><Activity size={19}/></span><div><b>إعداد السيناريو</b><small>تعديل القيم لمشاهدة النتائج فورًا</small></div></div>
              <div className="scenario-picker" role="group" aria-label="نوع السيناريو">
                <button className={scenario==='normal'?'selected':''} onClick={()=>setScenario('normal')} type="button">يوم عادي</button>
                <button className={scenario==='weekend'?'selected':''} onClick={()=>setScenario('weekend')} type="button">نهاية الأسبوع</button>
                <button className={scenario==='quiet'?'selected':''} onClick={()=>setScenario('quiet')} type="button">طلب منخفض</button>
              </div>
              <label className="lab-range-label" htmlFor="previous-sales"><span>مبيعات اليوم السابق</span><b>{formatQty(previousSales)} طلب</b></label>
              <input id="previous-sales" className="lab-range" type="range" min="100" max="1200" step="25" value={previousSales} onChange={e=>setPreviousSales(Number(e.target.value))}/>
              <div className="range-ends"><span>100</span><span>1,200 طلب</span></div>
              <label className="lab-range-label" htmlFor="demand-trend"><span>تغير الطلب المتوقع</span><b>{scenarioTrend>0?'+':''}{scenarioTrend}%</b></label>
              <input id="demand-trend" className="lab-range" type="range" min="-30" max="30" step="5" value={trend} onChange={e=>{setTrend(Number(e.target.value));setScenario('normal');}}/>
              <div className="range-ends"><span>انخفاض −30%</span><span>ارتفاع +30%</span></div>
              <label className="lab-range-label" htmlFor="prep-buffer"><span>هامش التحضير في توصية نماء</span><b>{buffer}%</b></label>
              <input id="prep-buffer" className="lab-range" type="range" min="0" max="15" step="1" value={buffer} onChange={e=>setBuffer(Number(e.target.value))}/>
              <div className="range-ends"><span>0%</span><span>15%</span></div>
              <button className="lab-reset" type="button" onClick={()=>{setPreviousSales(500);setTrend(0);setBuffer(5);setScenario('normal');}}>إعادة القيم الافتراضية <X size={15}/></button>
            </div>
            <div className="lab-results">
              <div className="lab-results-head"><div><span className="eyebrow">LIVE SCENARIO</span><h3>نتيجة التخطيط</h3></div><span className="live-pill"><i/> تتحدث مباشرة</span></div>
              <div className="lab-kpis">
                <div className="lab-kpi"><span>الطلب المتوقع</span><b>{formatQty(forecastDemand)}</b><small>طلب</small><div className="kpi-bar"><i style={{width:`${Math.min(100,forecastDemand/12)}%`}}/></div></div>
                <div className="lab-kpi"><span>التخطيط التقليدي</span><b>{formatQty(traditionalPlan)}</b><small>طلب مخطط</small><div className="kpi-bar traditional-bar"><i style={{width:`${Math.min(100,traditionalPlan/12)}%`}}/></div></div>
                <div className="lab-kpi highlighted"><span>توصية نماء</span><b>{formatQty(namaaPlan)}</b><small>طلب مخطط</small><div className="kpi-bar purple-bar"><i style={{width:`${Math.min(100,namaaPlan/12)}%`}}/></div></div>
              </div>
              <div className="lab-comparison">
                <div className="lab-comparison-title"><b>الفائض أو العجز المتوقع</b><span>مقارنة بالطلب المتوقع</span></div>
                <div className="lab-compare-row"><div className="lab-compare-label"><span className="compare-dot orange-dot"/> التخطيط التقليدي</div><div className="lab-compare-track"><i className="orange-track" style={{width:`${Math.min(100,Math.abs(traditionalGap)/Math.max(1,forecastDemand)*100)}%`}}/></div><b className={traditionalGap>=0?'surplus':'shortage'}>{traditionalGap>=0?`فائض ${formatQty(traditionalGap)}`:`عجز ${formatQty(Math.abs(traditionalGap))}`}</b></div>
                <div className="lab-compare-row"><div className="lab-compare-label"><span className="compare-dot purple-dot"/> توصية نماء</div><div className="lab-compare-track"><i className="purple-track" style={{width:`${Math.min(100,Math.abs(namaaGap)/Math.max(1,forecastDemand)*100)}%`}}/></div><b className={namaaGap>=0?'surplus':'shortage'}>{namaaGap>=0?`فائض ${formatQty(namaaGap)}`:`عجز ${formatQty(Math.abs(namaaGap))}`}</b></div>
                <div className="lab-insight"><span className="lab-insight-icon"><Lightbulb size={18}/></span><p>{traditionalGap>namaaGap?`في هذا السيناريو، يقل الفائض المحسوب في توصية نماء بمقدار ${formatQty(traditionalGap-namaaGap)} طلب مقارنة بالتخطيط الثابت.`:traditionalGap<namaaGap?`في هذا السيناريو، ترفع توصية نماء كمية التحضير للمساعدة على مواكبة الطلب المتوقع؛ يُفضّل مراجعة القيم قبل اعتماد أي قرار.`:'في هذا السيناريو، تتقارب الكميتان المخططتان مع الطلب المتوقع.'}</p></div>
              </div>
              <div className="lab-formula"><b>كيف حُسبت النتائج؟</b><span>التخطيط التقليدي = مبيعات اليوم السابق + 15% هامش ثابت</span><span>توقع الطلب = المبيعات السابقة × (1 + نسبة التغير)</span><span>توصية نماء في المحاكاة = الطلب المتوقع + هامش التحضير المحدد</span></div>
            </div>
          </div>
          <p className="lab-disclaimer"><ShieldCheck size={15}/> الأرقام محسوبة داخل المتصفح لأغراض التجربة والتوضيح فقط؛ لا تُرفع بيانات ولا يُستدعى نموذج ML فعلي في هذه المحاكاة.</p>
        </div>
      </section>

      <section id="workflow" className="section workflow-section">
        <div className="container">
          <div className="section-heading centered-heading"><span className="eyebrow">05 / آلية العمل</span><h2>رحلة البيانات في <span className="gradient-text">نماء.</span></h2><p>من ملف المبيعات إلى التوقع ثم متابعة النتائج.</p></div>
          <div className="workflow-track">
            {[
              {icon:Upload,no:'01',title:'إدخال البيانات',text:'استيراد سجلات المبيعات والتحقق من جودتها.'},
              {icon:Database,no:'02',title:'المعالجة والتخزين',text:'تنظيم السجلات وحفظها في قاعدة البيانات.'},
              {icon:BrainCircuit,no:'03',title:'نموذج التعلّم الآلي',text:'تحليل الأنماط التاريخية وتوقع الطلب.'},
              {icon:BarChart3,no:'04',title:'التوصيات والتحليلات',text:'عرض التوقعات ومؤشرات الأداء ومقارنتها بالواقع.'},
            ].map(({icon:Icon,no,title,text},i)=><div className="workflow-step" key={no}><div className="workflow-icon"><Icon size={21}/><span>{no}</span></div><h3>{title}</h3><p>{text}</p>{i<3&&<div className="workflow-connector"><ArrowUpLeft size={15}/></div>}</div>)}
          </div>
        </div>
      </section>

      <section id="team" className="section team-section">
        <div className="container">
          <div className="section-heading split-heading"><div><span className="eyebrow">06 / فريق العمل</span><h2>وراء نماء،<br/><span className="gradient-text">فريق يصنع الفرق.</span></h2></div><p> </p></div>
          <div className="team-grid">{team.map((member,i)=><a className="team-card" key={member.name} href={member.url} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} على LinkedIn (يفتح في تبويب جديد)`}><div className={`team-avatar avatar-${i+1}`}><span className="dev-avatar" aria-hidden="true"><Code2 size={30} strokeWidth={1.8}/></span><b>{String(i+1).padStart(2,'0')}</b><span className="team-in"><Linkedin size={15}/></span></div><div className="team-role">PROJECT TEAM</div><h3>{member.name}</h3><p>{member.role}</p><span className="team-link"><Linkedin size={14}/> LinkedIn <ArrowUpLeft size={14}/></span></a>)}</div>
        </div>
      </section>

      <section className="closing-section"><div className="closing-glow"/><div className="container closing-inner"><span className="closing-symbol"><Activity size={23}/></span><span className="eyebrow">NAMAA · SMART FOOD WASTE & DEMAND FORECASTING</span><h2>بيانات أوضح.<br/><span className="gradient-text">قرارات أفضل.</span></h2><p>نماء يحوّل سجلات المبيعات إلى رؤية تساعد المطاعم على التخطيط ومتابعة الأداء وتقليل الهدر.</p><a href="#home" className="button-primary">العودة إلى البداية <ArrowUpLeft size={16}/></a></div></section>
    </main>

    <footer className="site-footer"><div className="container footer-inner"><a className="brand footer-brand" href="#home"><span className="brand-mark"><img src="/namaa-logo.jpg" alt="شعار نماء"/></span><span>نماء<span className="brand-dot">.</span><small> </small></span></a><span className="footer-caption">نظام للتنبؤ بالطلب وإدارة هدر الطعام باستخدام الذكاء الاصطناعي.</span><div className="footer-links"><a href="#about">عن المشروع</a><a href="#screens">الواجهات</a><a href="#team">الفريق</a></div><span className="copyright">© NAMAA 2026</span></div></footer>
  </div>;
}

export default App;
