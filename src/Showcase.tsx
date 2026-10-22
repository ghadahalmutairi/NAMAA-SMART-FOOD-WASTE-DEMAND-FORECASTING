import { useCallback, useEffect, useRef, useState } from 'react';
import type { CSSProperties, PointerEvent as ReactPointerEvent, KeyboardEvent as ReactKeyboardEvent } from 'react';
import { ArrowLeft, ArrowRight, Check, Pause, Play, ShieldCheck } from 'lucide-react';

type Shot = { img: string; title: string; en: string; desc: string; points: string[] };

const shots: Shot[] = [
  { img: 'login', title: 'تسجيل الدخول', en: 'Sign in', desc: 'بوابة دخول أنيقة لحساب المطعم، مع خيار إنشاء حساب جديد في خطوة واحدة.', points: ['البريد الإلكتروني وكلمة المرور', 'إنشاء حساب مطعم جديد', 'بيانات كل مطعم في مساحة خاصة'] },
  { img: 'dashboard', title: 'الرئيسية', en: 'Dashboard', desc: 'نظرة سريعة على أداء مطعمك خلال آخر ٧ أيام: المبيعات، الكميات المحضّرة، نسبة الهدر وتكلفته.', points: ['زر استيراد ملف المبيعات', 'مؤشرات المبيعات والهدر', 'رسم اتجاه المبيعات والهدر'] },
  { img: 'import', title: 'استيراد المبيعات', en: 'Import sales', desc: 'اختيار ملف المبيعات من الجهاز بصيغة Excel أو CSV أو جدول Word، وبدء التحليل مباشرة.', points: ['دعم Excel و CSV و Word', 'اختيار الملف من الجهاز', 'نقطة البداية لتوقع الطلب'] },
  { img: 'reports', title: 'التقارير والتحليلات', en: 'Reports', desc: 'تحليلات متقدمة للمطعم على ٧ أو ٣٠ يومًا أو فترة مخصصة، مع اتجاه المبيعات والهدر.', points: ['٧ أيام / ٣٠ يومًا / مخصص', 'نظرة عامة على الأداء', 'تحليل اتجاه المبيعات'] },
  { img: 'goals', title: 'الأهداف', en: 'Goals', desc: 'متابعة أهداف المطعم والتقدم نحوها، مع إعادة نماء حساب النسب تلقائيًا من آخر البيانات.', points: ['أداء الأهداف العام', 'أهداف نشطة ومحققة', 'تحديث تلقائي للتقدم'] },
  { img: 'add-goal', title: 'إضافة هدف', en: 'Add goal', desc: 'اختيار نوع الهدف وتحديد القيمة المستهدفة، مثل إبقاء نسبة الهدر دون ٥٪.', points: ['خفض الهدر أو رفع الربح', 'تحسين دقة التوقع', 'هدف مخصص بقيمة مستهدفة'] },
  { img: 'advisor', title: 'مستشار نماء', en: 'Namaa Advisor', desc: 'أسئلة عن المطعم تقابلها إجابات مبنية على المبيعات والهدر والتوقعات الفعلية.', points: ['أسئلة مقترحة جاهزة', 'ربط مباشر ببيانات المطعم', 'سؤال حر في مربع الكتابة'] },
  { img: 'advisor-insight', title: 'تحليل المستشار', en: 'Advisor insight', desc: 'نتيجة تحليلية واضحة، مثل جاهزية التوسع إلى فرع جديد، مدعومة بمؤشرات الأداء.', points: ['نسبة الجاهزية والاتجاه', 'الربح المقدّر ونسبة الهدر', 'توصية قابلة للمراجعة'] },
  { img: 'settings', title: 'الإعدادات', en: 'Settings', desc: 'إدارة بيانات الحساب والمطعم والأمان، وتغيير مظهر التطبيق بين النظام والفاتح والداكن.', points: ['المعلومات الشخصية', 'رقم المطعم وتغيير كلمة المرور', 'مظهر التطبيق'] },
  { img: 'settings-developers', title: 'التفضيلات والمطورون', en: 'Preferences', desc: 'اختيار الدولة وتفعيل الإشعارات وتسجيل الخروج، مع قسم يعرّف بفريق تطوير نماء.', points: ['الدولة والإشعارات', 'تسجيل الخروج', 'قائمة المطورين'] },
];

const N = shots.length;
const pad = (n: number) => String(n).padStart(2, '0');

function Phone({ img, alt }: { img: string; alt: string }) {
  return <div className="sx-phone"><div className="sx-phone-screen"><img src={`/screens/${img}.jpg`} alt={alt} draggable={false} loading="lazy" /></div><span className="sx-phone-glare" /></div>;
}

export default function Showcase() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(() => typeof window === 'undefined' || !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const hover = useRef(false);
  const startX = useRef<number | null>(null);
  const rail = useRef<HTMLDivElement>(null);

  const go = useCallback((i: number) => setActive(((i % N) + N) % N), []);
  const next = useCallback(() => setActive(a => (a + 1) % N), []);
  const prev = useCallback(() => setActive(a => (a - 1 + N) % N), []);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => { if (!hover.current) next(); }, 5200);
    return () => window.clearInterval(id);
  }, [playing, active, next]);

  useEffect(() => {
    const r = rail.current; const b = r?.children[active] as HTMLElement | undefined;
    if (r && b) r.scrollTo({ left: b.offsetLeft - r.clientWidth / 2 + b.clientWidth / 2, behavior: 'smooth' });
  }, [active]);

  const onDown = (e: ReactPointerEvent) => { startX.current = e.clientX; };
  const onUp = (e: ReactPointerEvent) => {
    if (startX.current === null) return;
    const dx = e.clientX - startX.current; startX.current = null;
    if (Math.abs(dx) > 45) (dx < 0 ? next : prev)();
  };
  const onKey = (e: ReactKeyboardEvent) => { if (e.key === 'ArrowRight') next(); if (e.key === 'ArrowLeft') prev(); };

  const cur = shots[active];

  return <div className="sx" onMouseEnter={() => { hover.current = true; }} onMouseLeave={() => { hover.current = false; }}>
    <div className="sx-main">
      <div className="sx-info" key={active}>
        <span className="sx-count"><b>{pad(active + 1)}</b> / {pad(N)}</span>
        <small className="sx-en">{cur.en}</small>
        <h3>{cur.title}</h3>
        <p>{cur.desc}</p>
        <ul>{cur.points.map(p => <li key={p}><span><Check size={12} /></span>{p}</li>)}</ul>
      </div>

      <div className="sx-stage-wrap">
        <div className="sx-glow" data-alt={active % 2} />
        <div className="sx-ring sx-ring-a" /><div className="sx-ring sx-ring-b" />
        <div className="sx-stage" dir="ltr" tabIndex={0} role="group" aria-roledescription="carousel" aria-label="واجهات تطبيق نماء" onKeyDown={onKey} onPointerDown={onDown} onPointerUp={onUp} onPointerCancel={() => { startX.current = null; }}>
          {shots.map((s, i) => {
            const o = ((i - active + N + N / 2) % N) - N / 2;
            const ao = Math.abs(o);
            return <div key={s.img} className={`sx-slot ${o === 0 ? 'is-active' : ''}`} aria-hidden={o !== 0}
              style={{ '--o': o, '--ao': Math.min(ao, 3), opacity: ao === 0 ? 1 : ao === 1 ? 0.5 : ao === 2 ? 0.18 : 0, zIndex: 10 - Math.round(ao), pointerEvents: ao > 2 ? 'none' : 'auto' } as CSSProperties}
              onClick={() => { if (o !== 0) go(i); }}>
              <Phone img={s.img} alt={`واجهة ${s.title}`} />
            </div>;
          })}
        </div>
      </div>
    </div>

    <div className="sx-controls">
      <button type="button" className="sx-round" onClick={prev} aria-label="الواجهة السابقة"><ArrowRight size={17} /></button>
      <button type="button" className="sx-round" onClick={() => setPlaying(p => !p)} aria-label={playing ? 'إيقاف العرض التلقائي' : 'تشغيل العرض التلقائي'}>{playing ? <Pause size={15} /> : <Play size={15} />}</button>
      <button type="button" className="sx-round" onClick={next} aria-label="الواجهة التالية"><ArrowLeft size={17} /></button>
    </div>

    <div className="sx-rail" dir="ltr" ref={rail}>
      {shots.map((s, i) => <button type="button" key={s.img} className={`sx-thumb ${i === active ? 'on' : ''}`} onClick={() => go(i)} aria-label={`عرض ${s.title}`} aria-current={i === active}>
        <span className="sx-thumb-img"><img src={`/screens/${s.img}.jpg`} alt="" loading="lazy" draggable={false} /></span>
        <b>{pad(i + 1)}</b><span className="sx-thumb-name">{s.title}</span>
      </button>)}
    </div>

    <p className="sx-note"><ShieldCheck size={15} /> لقطات حقيقية من تطبيق نماء على iPhone.</p>
  </div>;
}
