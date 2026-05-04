import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Users, Train, Wallet, Heart, Sparkles, MapPin, ArrowRight, RefreshCw, ChevronLeft, ChevronRight, Pencil, Sun, Home, Compass, Info, ExternalLink, ChevronDown, Coffee, Utensils, Camera, Mail, Copy, Bookmark, Trash2, Check, Crown, Gem, Star } from 'lucide-react';

const PREFECTURES = [
  '北海道','青森','岩手','宮城','秋田','山形','福島',
  '茨城','栃木','群馬','埼玉','千葉','東京','神奈川',
  '新潟','富山','石川','福井','山梨','長野',
  '岐阜','静岡','愛知','三重',
  '滋賀','京都','大阪','兵庫','奈良','和歌山',
  '鳥取','島根','岡山','広島','山口',
  '徳島','香川','愛媛','高知',
  '福岡','佐賀','長崎','熊本','大分','宮崎','鹿児島','沖縄'
];

export default function HolidayPlanner() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({
    hasDestination: '', destination: '', destinationNote: '',
    startDate: null, endDate: null, isDayTrip: false, whenNote: '',
    companions: '', companionsNote: '',
    departure: '', departureNote: '',
    transport: '', transportNote: '',
    budget: '', budgetNote: '',
    interests: [], interestsNote: '',
    likes: '', likesNote: '',
    freeText: '',
  });
  const [plans, setPlans] = useState(null); // { A: {...}, B: {...}, C: {...} }
  const [openPlan, setOpenPlan] = useState('A'); // 現在開いているプラン
  const [favorites, setFavorites] = useState([]);
  const [view, setView] = useState('home'); // 'home' | 'mypage'
  const [copiedKey, setCopiedKey] = useState('');
  const [extras, setExtras] = useState(null);
  const [extrasLoading, setExtrasLoading] = useState(false);
  const [openExtraSection, setOpenExtraSection] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const [showPrefList, setShowPrefList] = useState(false);
  
  // プランカードへの参照（スクロール用）
  const planRefs = useRef({ A: null, B: null, C: null });
  
  // openPlanが変わった時、そのプランの上端にスクロール
  useEffect(() => {
    if (openPlan && plans && planRefs.current[openPlan]) {
      // 少し遅延を入れてDOMの更新を待ってからスクロール
      setTimeout(() => {
        const el = planRefs.current[openPlan];
        if (el) {
          const rect = el.getBoundingClientRect();
          // 現在の位置から、要素の上端 - 10px の位置にスクロール
          window.scrollTo({
            top: window.scrollY + rect.top - 10,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  }, [openPlan, plans]);

  const questions = [
    { key: 'hasDestination', icon: Compass, title: '行き先は決まっていますか？', subtitle: '', options: ['はい', 'いいえ'], type: 'single' },
    { key: 'when', icon: Calendar, title: 'いつ行きますか？', subtitle: '出発日と帰る日を選んでください', type: 'dateRange', notePlaceholder: '例：午後から夜まで、朝6時出発、紅葉の時期に など' },
    { key: 'companions', icon: Users, title: '誰と行きますか？', subtitle: '同行者を選んでください', options: ['ひとり', 'パートナー', '友人', '家族', '子連れ', '大人数グループ'], type: 'single', notePlaceholder: '例：両親と、3歳の子供と、5人グループ など' },
    { key: 'departure', icon: Home, title: 'どこから出発しますか？', subtitle: '都道府県を選んでください', type: 'prefecture', notePlaceholder: '例：横浜駅から、神戸三宮、那覇空港から など' },
    { key: 'transport', icon: Train, title: 'どうやって行きますか？', subtitle: '主な移動手段は？', options: ['電車', '車', '飛行機', '新幹線', 'バス', '決めてない'], type: 'single', notePlaceholder: '例：レンタカー利用、自家用車で、現地ではタクシー など' },
    { key: 'budget', icon: Wallet, title: '予算はどのくらい？', subtitle: '一人あたりの目安', options: ['〜5,000円', '〜15,000円', '〜30,000円', '〜50,000円', '50,000円以上', '気にしない'], type: 'single', notePlaceholder: '例：交通費別、食事に多めに使いたい など' },
    { key: 'interests', icon: Sparkles, title: 'どんなことがしたい？', subtitle: '複数選択OK', options: ['観光・名所巡り', 'グルメ', '温泉・リラックス', 'アクティビティ', 'ショッピング', '自然・絶景', 'カフェ巡り', 'アート・文化', '夜景・夜の街', 'ひとり時間'], type: 'multi', notePlaceholder: '例：海鮮が食べたい、写真を撮りたい、温泉に長く浸かりたい など' },
    { key: 'likes', icon: Heart, title: '好きな雰囲気は？', subtitle: 'どんな空気感が好き？', options: ['賑やか・活気', '静か・落ち着く', 'おしゃれ・洗練', 'レトロ・懐かしい', '冒険・刺激的', 'のんびり・癒し'], type: 'single', notePlaceholder: '例：人混みが苦手、地元の人と交流したい、SNS映え重視 など' },
  ];

  const currentQuestion = questions[step];
  const isLastQuestion = step === questions.length;

  const handleSelect = (option) => {
    const q = currentQuestion;
    if (q.type === 'multi') {
      const current = answers[q.key];
      const updated = current.includes(option) ? current.filter(o => o !== option) : [...current, option];
      setAnswers({ ...answers, [q.key]: updated });
    } else {
      setAnswers({ ...answers, [q.key]: option });
    }
  };

  const isCurrentAnswered = () => {
    if (!currentQuestion) return true;
    const key = currentQuestion.key;
    if (key === 'hasDestination') {
      if (answers.hasDestination === 'はい') return answers.destination.trim() !== '';
      return answers.hasDestination === 'いいえ';
    }
    if (currentQuestion.type === 'dateRange') return answers.startDate !== null;
    if (currentQuestion.type === 'prefecture') return answers.departure !== '';
    if (currentQuestion.type === 'multi') return answers[key].length > 0;
    return answers[key] !== '';
  };

  const handleNext = () => { if (isCurrentAnswered()) setStep(step + 1); };
  const handleBack = () => { if (step > 0) setStep(step - 1); };

  const formatDate = (date) => date ? `${date.getMonth() + 1}月${date.getDate()}日` : '';
  const formatDateFull = (date) => {
    if (!date) return '';
    const days = ['日','月','火','水','木','金','土'];
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}(${days[date.getDay()]})`;
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= lastDate; i++) days.push(new Date(year, month, i));
    return days;
  };

  const handleDateClick = (date) => {
    if (!date) return;
    const { startDate, endDate, isDayTrip } = answers;
    if (isDayTrip) { setAnswers({ ...answers, startDate: date, endDate: date }); return; }
    if (!startDate || (startDate && endDate)) setAnswers({ ...answers, startDate: date, endDate: null });
    else {
      if (date < startDate) setAnswers({ ...answers, startDate: date, endDate: startDate });
      else setAnswers({ ...answers, endDate: date });
    }
  };

  const toggleDayTrip = () => {
    if (!answers.isDayTrip) setAnswers({ ...answers, isDayTrip: true, endDate: answers.startDate || null });
    else setAnswers({ ...answers, isDayTrip: false });
  };

  const clearDates = () => setAnswers({ ...answers, startDate: null, endDate: null });

  const changeMonth = (delta) => {
    const newDate = new Date(calendarMonth);
    newDate.setMonth(newDate.getMonth() + delta);
    setCalendarMonth(newDate);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const getDateStatus = (date) => {
    if (!date) return null;
    const { startDate, endDate } = answers;
    if (!startDate) return null;
    const dateTime = date.getTime();
    const startTime = startDate.getTime();
    const endTime = endDate ? endDate.getTime() : null;
    if (dateTime === startTime && (!endTime || endTime === startTime)) return 'single';
    if (dateTime === startTime) return 'start';
    if (endTime && dateTime === endTime) return 'end';
    if (endTime && dateTime > startTime && dateTime < endTime) return 'between';
    return null;
  };

  const calculateNights = () => {
    const { startDate, endDate, isDayTrip } = answers;
    if (!startDate) return '';
    if (isDayTrip || !endDate || startDate.getTime() === endDate.getTime()) return '日帰り';
    const diff = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));
    return `${diff}泊${diff + 1}日`;
  };

  const buildAnswerSummary = () => {
    const buildLine = (label, value, note) => {
      let line = `・${label}: ${value || '未指定'}`;
      if (note) line += `(補足: ${note})`;
      return line;
    };
    const dateStr = answers.startDate ? (answers.isDayTrip || !answers.endDate || answers.startDate.getTime() === answers.endDate.getTime() ? `${formatDateFull(answers.startDate)} 日帰り` : `${formatDateFull(answers.startDate)} 〜 ${formatDateFull(answers.endDate)}（${calculateNights()}）`) : '未指定';
    const destStr = answers.hasDestination === 'はい' ? (answers.destination || '未記入') : 'おまかせ';
    return `${buildLine('行き先', destStr, answers.destinationNote)}\n${buildLine('時期・期間', dateStr, answers.whenNote)}\n${buildLine('同行者', answers.companions, answers.companionsNote)}\n${buildLine('出発地', answers.departure, answers.departureNote)}\n${buildLine('移動手段', answers.transport, answers.transportNote)}\n${buildLine('予算', answers.budget, answers.budgetNote)}\n${buildLine('やりたいこと', answers.interests.join('、'), answers.interestsNote)}\n${buildLine('好きな雰囲気', answers.likes, answers.likesNote)}\n・その他の要望: ${answers.freeText || '特になし'}`;
  };

  const generatePlans = async () => {
    setLoading(true); setError(''); setPlans(null); setOpenPlan('A');
    setExtras(null); setOpenExtraSection(null);
    const summary = buildAnswerSummary();
    const prompt = `あなたは経験豊富な旅行プランナーです。以下の条件をもとに、3つの異なるテーマでプランを提案してください。

【ユーザーの希望】
${summary}

【3つのプランのテーマ】
- Aプラン「王道・定番」: 一番人気のスポットや有名どころを巡る、はずさない安心プラン
- Bプラン「穴場・通好み」: 地元の人が行くようなディープなスポットや穴場を中心としたプラン
- Cプラン「贅沢・特別感」: 少し予算を上げて、記念日や自分へのご褒美にしたい特別感のあるプラン

【最重要ルール】
プラン内に登場する全ての固有名詞（観光地、施設、店、レストラン、カフェ、ホテル、駅など）は必ず [[名前]] の形式で二重角括弧で囲んでください。
✅ 正: [[清水寺]]を訪れる
❌ 誤: 清水寺を訪れる
❌ 誤: **[[竹林の小径]]**（外側の**は不要、[[ ]]だけでOK）

【出力形式】必ず以下のJSON形式のみで出力してください。前後に説明文は一切不要です。
{
  "A": {
    "title": "プランのキャッチコピー（15字以内）",
    "summary": "プランの一言説明（30字以内）",
    "imageKeyword": "プランの雰囲気を表す英語の検索キーワード（例: kyoto temple, tokyo cafe, hokkaido nature）。地名+雰囲気で2〜3語",
    "content": "Markdown形式の本文。## 見出しと箇条書きで読みやすく。タイムスケジュール、予算内訳、持ち物・注意点を含める。"
  },
  "B": { 同じ構造 },
  "C": { 同じ構造 }
}

contentは各2000文字程度。親しみやすく、わくわくする文章で。`;

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 8000, messages: [{ role: "user", content: prompt }] }),
      });
      const data = await response.json();
      const text = data.content.map(i => i.text || "").join("\n");
      const clean = text.replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(clean);
      setPlans(parsed);
    } catch (err) {
      console.error(err);
      setError('プラン生成中にエラーが発生しました。もう一度お試しください。');
    } finally { setLoading(false); }
  };

  const searchUrl = (name) => `https://www.google.com/search?q=${encodeURIComponent(name)}`;

  // 写真URLを取得（Lorem Flickr - APIキー不要、無料）
  const getPhotoUrl = (keyword) => {
    if (!keyword) return null;
    // キーワードをカンマ区切りタグに変換
    const tags = keyword.replace(/[^\w\s,]/g, '').trim().split(/\s+/).join(',');
    // Lorem Flickr: 同じキーワードでも安定した画像を返す
    return `https://loremflickr.com/800/400/${encodeURIComponent(tags)}`;
  };

  // その他の候補を生成
  const generateExtras = async () => {
    if (extras) return;
    setExtrasLoading(true);
    const summary = buildAnswerSummary();
    const prompt = `以下の条件のユーザーに対し、メインプラン以外の「その他の候補」を提案してください。

【ユーザーの希望】
${summary}

【出力形式】必ず以下のJSON形式のみで出力してください。前後に説明文は一切不要です。
{
  "cafes": [{"name": "店名", "description": "30字以内の魅力説明"}],
  "restaurants": [{"name": "店名", "description": "30字以内の魅力説明"}],
  "spots": [{"name": "場所名", "description": "30字以内の魅力説明"}]
}

各カテゴリ3〜4件、実在する具体的な店名・場所名で。`;
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1500, messages: [{ role: "user", content: prompt }] }),
      });
      const data = await response.json();
      const text = data.content.map(i => i.text || "").join("\n");
      const clean = text.replace(/```json|```/g, "").trim();
      setExtras(JSON.parse(clean));
    } catch (err) { console.error(err); }
    finally { setExtrasLoading(false); }
  };

  // プランをプレーンテキストに変換（メール・コピー用）
  const planToPlainText = (planData, planLabel) => {
    if (!planData) return '';
    const cleaned = planData.content
      .replace(/\[\[([^\]]+)\]\]/g, '$1')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/^#+\s/gm, '');
    return `【${planLabel}】${planData.title}\n${planData.summary}\n\n${cleaned}\n\n---\nおでかけコンシェルジュで作成`;
  };

  // メール送信
  const sendByEmail = (planData, planLabel) => {
    const subject = `【おでかけプラン】${planData.title}`;
    const body = planToPlainText(planData, planLabel);
    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  // コピー
  const copyToClipboard = async (planData, planLabel, key) => {
    const text = planToPlainText(planData, planLabel);
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(''), 2000);
    } catch (err) {
      console.error(err);
    }
  };

  // お気に入り保存
  const toggleFavorite = (planKey) => {
    if (!plans || !plans[planKey]) return;
    const planData = plans[planKey];
    const planLabel = planLabels[planKey].label;
    const id = `${planData.title}-${planData.summary}`;
    const exists = favorites.some(f => f.id === id);
    if (exists) {
      setFavorites(favorites.filter(f => f.id !== id));
    } else {
      setFavorites([{
        id,
        planKey,
        planLabel,
        title: planData.title,
        summary: planData.summary,
        content: planData.content,
        imageKeyword: planData.imageKeyword,
        savedAt: new Date().toISOString(),
      }, ...favorites]);
    }
  };

  const isFavorite = (planKey) => {
    if (!plans || !plans[planKey]) return false;
    const planData = plans[planKey];
    const id = `${planData.title}-${planData.summary}`;
    return favorites.some(f => f.id === id);
  };

  const removeFavorite = (id) => {
    setFavorites(favorites.filter(f => f.id !== id));
  };

  const reset = () => {
    setStep(0);
    setAnswers({ hasDestination: '', destination: '', destinationNote: '', startDate: null, endDate: null, isDayTrip: false, whenNote: '', companions: '', companionsNote: '', departure: '', departureNote: '', transport: '', transportNote: '', budget: '', budgetNote: '', interests: [], interestsNote: '', likes: '', likesNote: '', freeText: '' });
    setPlans(null); setOpenPlan('A'); setError(''); setShowPrefList(false);
    setExtras(null); setOpenExtraSection(null);
  };

  const renderInlineText = (text, baseKey) => {
    let processed = text.replace(/\*\*(\[\[[^\]]+\]\][^*]*)\*\*/g, '$1');
    const tokens = processed.split(/(\[\[[^\]]+\]\]|\*\*[^*]+\*\*)/g);
    return tokens.map((token, j) => {
      if (token.startsWith('[[') && token.endsWith(']]')) {
        const name = token.slice(2, -2);
        return (
          <a key={`${baseKey}-${j}`} href={searchUrl(name)} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 px-1.5 py-0.5 mx-0.5 rounded-md bg-pink-100 text-pink-700 font-bold hover:bg-pink-200 active:bg-pink-300 transition-colors">
            {name}<ExternalLink className="w-3 h-3 inline flex-shrink-0" />
          </a>
        );
      }
      if (token.startsWith('**') && token.endsWith('**')) return <strong key={`${baseKey}-${j}`} className="font-bold text-stone-900">{token.slice(2, -2)}</strong>;
      return <span key={`${baseKey}-${j}`}>{token}</span>;
    });
  };

  const renderPlan = (text) => text.split('\n').map((line, i) => {
    if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold mt-5 mb-2 text-stone-800">{renderInlineText(line.replace('## ', ''), `h2-${i}`)}</h2>;
    if (line.startsWith('### ')) return <h3 key={i} className="text-lg font-semibold mt-3 mb-2 text-stone-700">{renderInlineText(line.replace('### ', ''), `h3-${i}`)}</h3>;
    if (line.startsWith('# ')) return <h1 key={i} className="text-2xl font-bold mt-5 mb-3 text-stone-900">{renderInlineText(line.replace('# ', ''), `h1-${i}`)}</h1>;
    if (line.startsWith('- ') || line.startsWith('* ')) return <li key={i} className="ml-6 mb-1 text-stone-700 list-disc">{renderInlineText(line.replace(/^[-*] /, ''), `li-${i}`)}</li>;
    if (/^\d+\. /.test(line)) return <li key={i} className="ml-6 mb-1 text-stone-700 list-decimal">{renderInlineText(line.replace(/^\d+\. /, ''), `oli-${i}`)}</li>;
    if (line.trim() === '') return <div key={i} className="h-2"></div>;
    return <p key={i} className="text-stone-700 leading-relaxed mb-2">{renderInlineText(line, `p-${i}`)}</p>;
  });

  const progress = (step / (questions.length + 1)) * 100;
  const noteKey = currentQuestion ? currentQuestion.key + 'Note' : '';
  const dateDisplay = answers.startDate ? (answers.isDayTrip || !answers.endDate || answers.startDate.getTime() === answers.endDate.getTime() ? `${formatDateFull(answers.startDate)} 日帰り` : `${formatDateFull(answers.startDate)} 〜 ${formatDateFull(answers.endDate)}（${calculateNights()}）`) : '未指定';

  // 各プランのラベル情報
  const planLabels = {
    A: { label: 'Aプラン', theme: '王道・定番', icon: Star, color: '#C77B8C', bg: '#FAE5EA' },
    B: { label: 'Bプラン', theme: '穴場・通好み', icon: Gem, color: '#9890C0', bg: '#E8E5F0' },
    C: { label: 'Cプラン', theme: '贅沢・特別感', icon: Crown, color: '#B8843E', bg: '#F2E8D8' },
  };

  return (
    <div className="min-h-screen p-4 sm:p-6" style={{
      background: 'linear-gradient(180deg, #F4C8C8 0%, #F5D0D0 25%, #F0DCE0 55%, #ECDDE8 80%, #E8DCEE 100%)',
      fontFamily: '"Hiragino Sans", "Yu Gothic", "Noto Sans JP", sans-serif',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Kaisei+Decol:wght@500;700&display=swap');
      `}</style>
      <div className="max-w-2xl mx-auto">
        {/* ヘッダー */}
        <div className="text-center mb-4 pt-4">
          <div className="inline-flex items-center gap-2 mb-2 whitespace-nowrap">
            <Sparkles className="w-4 h-4 flex-shrink-0" style={{ color: '#C77B8C' }} />
            <h1 className="font-bold tracking-tight" style={{ 
              color: '#5C3A4A',
              fontFamily: '"Kaisei Decol", "Yuji Syuku", cursive, serif',
              fontSize: 'clamp(1.5rem, 6vw, 2.25rem)',
              fontWeight: 700,
              letterSpacing: '0.02em',
            }}>
              おでかけコンシェルジュ
            </h1>
            <Sparkles className="w-4 h-4 flex-shrink-0" style={{ color: '#C77B8C' }} />
          </div>
          <p className="text-sm italic" style={{ color: '#8B6878', fontFamily: '"Caveat", cursive', fontSize: '1.1rem' }}>
            Today's plan, leave it to me ♡
          </p>
        </div>

        {/* タブナビゲーション */}
        <div className="flex gap-2 mb-4">
          <button onClick={() => setView('home')}
            className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all"
            style={view === 'home' ? { backgroundColor: '#C77B8C', color: 'white', borderColor: '#C77B8C' } : { backgroundColor: 'rgba(255,255,255,0.6)', color: '#5C3A4A', borderColor: 'rgba(255,255,255,0.8)' }}>
            <Sparkles className="w-4 h-4" />プランを作る
          </button>
          <button onClick={() => setView('mypage')}
            className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all"
            style={view === 'mypage' ? { backgroundColor: '#C77B8C', color: 'white', borderColor: '#C77B8C' } : { backgroundColor: 'rgba(255,255,255,0.6)', color: '#5C3A4A', borderColor: 'rgba(255,255,255,0.8)' }}>
            <Bookmark className="w-4 h-4" />マイページ
            {favorites.length > 0 && (
              <span className="px-1.5 py-0.5 rounded-full text-xs font-bold" style={view === 'mypage' ? { backgroundColor: 'white', color: '#C77B8C' } : { backgroundColor: '#C77B8C', color: 'white' }}>
                {favorites.length}
              </span>
            )}
          </button>
        </div>

        {/* プログレスバー（ホームかつプラン未生成時のみ） */}
        {view === 'home' && !plans && !loading && (
          <div className="mb-5">
            <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
              <div className="h-full transition-all duration-500 ease-out rounded-full" 
                style={{ width: `${progress}%`, backgroundColor: '#C77B8C' }} />
            </div>
            <p className="text-xs mt-2 text-right" style={{ color: '#8B6878' }}>{step + 1} / {questions.length + 1}</p>
          </div>
        )}

        {/* ============ ホーム画面 ============ */}
        {view === 'home' && (
          <div className="rounded-3xl p-6 sm:p-8" style={{
            backgroundColor: 'rgba(255, 255, 255, 0.75)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            boxShadow: '0 8px 32px rgba(199, 123, 140, 0.15)',
          }}>
            {/* 質問画面 */}
            {!isLastQuestion && !plans && !loading && (
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md" style={{ background: 'linear-gradient(135deg, #FAD0D8 0%, #E8C5DD 100%)' }}>
                    {React.createElement(currentQuestion.icon, { className: "w-6 h-6", style: { color: '#A85A75' } })}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-1" style={{ color: '#5C3A4A' }}>{currentQuestion.title}</h2>
                    {currentQuestion.subtitle && <p className="text-sm" style={{ color: '#8B6878' }}>{currentQuestion.subtitle}</p>}
                  </div>
                </div>

                {currentQuestion.key === 'hasDestination' && answers.hasDestination === 'はい' && (
                  <div className="space-y-2 rounded-xl p-4 border-2" style={{ backgroundColor: 'rgba(250, 208, 216, 0.3)', borderColor: '#F4C8D2' }}>
                    <label className="text-sm font-medium" style={{ color: '#5C3A4A' }}>行き先を教えてください</label>
                    <input type="text" value={answers.destination} onChange={(e) => setAnswers({ ...answers, destination: e.target.value })}
                      placeholder="例：京都、箱根、沖縄、宮古島、大阪のUSJ など"
                      className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none bg-white transition-colors"
                      style={{ borderColor: '#F4C8D2', color: '#5C3A4A' }} />
                  </div>
                )}

                {currentQuestion.type === 'dateRange' && (
                  <>
                    <div className="rounded-xl p-3 flex gap-2 border-2" style={{ backgroundColor: 'rgba(184, 136, 173, 0.1)', borderColor: '#E0CCE0' }}>
                      <Info className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#A07AAD' }} />
                      <p className="text-xs leading-relaxed" style={{ color: '#5C3A4A' }}>
                        時間が決まっている場合（例：午後から夜まで、朝6時出発など）は<strong>日にちを選択して下の補足欄</strong>に記入してください
                      </p>
                    </div>
                    <button onClick={toggleDayTrip}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium border transition-all"
                      style={answers.isDayTrip ? { backgroundColor: '#C77B8C', color: 'white', borderColor: '#C77B8C' } : { backgroundColor: 'white', color: '#5C3A4A', borderColor: '#EAD5DA' }}>
                      <Sun className="w-4 h-4" />日帰り
                      {answers.isDayTrip && <span className="text-xs">（タップで解除）</span>}
                    </button>
                    <div className="bg-white rounded-2xl border-2 p-4" style={{ borderColor: '#F4C8D2' }}>
                      <div className="flex items-center justify-between mb-3">
                        <button onClick={() => changeMonth(-1)} className="p-2 rounded-lg hover:bg-pink-50" style={{ color: '#5C3A4A' }}><ChevronLeft className="w-4 h-4" /></button>
                        <p className="font-bold" style={{ color: '#5C3A4A' }}>{calendarMonth.getFullYear()}年 {calendarMonth.getMonth() + 1}月</p>
                        <button onClick={() => changeMonth(1)} className="p-2 rounded-lg hover:bg-pink-50" style={{ color: '#5C3A4A' }}><ChevronRight className="w-4 h-4" /></button>
                      </div>
                      <div className="grid grid-cols-7 gap-1 mb-2">
                        {['日','月','火','水','木','金','土'].map((d, i) => (
                          <div key={d} className="text-center text-xs font-bold py-1" style={{ color: i === 0 ? '#D88595' : i === 6 ? '#9890C0' : '#8B6878' }}>{d}</div>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-1">
                        {getDaysInMonth(calendarMonth).map((date, i) => {
                          if (!date) return <div key={i}></div>;
                          const isPast = date < today;
                          const status = getDateStatus(date);
                          const isToday = date.getTime() === today.getTime();
                          const dayOfWeek = date.getDay();
                          let style = {};
                          let cls = 'aspect-square text-sm font-medium transition-all rounded-lg ';
                          if (status === 'single') { style = { backgroundColor: '#C77B8C', color: 'white' }; cls += 'font-bold'; }
                          else if (status === 'start') { style = { backgroundColor: '#C77B8C', color: 'white' }; cls += 'font-bold rounded-r-none'; }
                          else if (status === 'end') { style = { backgroundColor: '#C77B8C', color: 'white' }; cls += 'font-bold rounded-l-none'; }
                          else if (status === 'between') { style = { backgroundColor: '#F5E0E5', color: '#A85A75' }; cls += 'rounded-none'; }
                          else if (isPast) { style = { color: '#D8C8D0', cursor: 'not-allowed' }; }
                          else if (isToday) { style = { backgroundColor: 'rgba(250, 208, 216, 0.4)', color: '#A85A75', border: '1px solid #E08FA0' }; }
                          else if (dayOfWeek === 0) { style = { color: '#D88595' }; cls += 'hover:bg-pink-50'; }
                          else if (dayOfWeek === 6) { style = { color: '#9890C0' }; cls += 'hover:bg-purple-50'; }
                          else { style = { color: '#5C3A4A' }; cls += 'hover:bg-pink-50'; }
                          return <button key={i} onClick={() => handleDateClick(date)} disabled={isPast} className={cls} style={style}>{date.getDate()}</button>;
                        })}
                      </div>
                      {answers.startDate && (
                        <div className="mt-3 pt-3 border-t flex items-center justify-between" style={{ borderColor: '#F4D8DD' }}>
                          <div className="text-sm" style={{ color: '#5C3A4A' }}>
                            {answers.isDayTrip || !answers.endDate || (answers.endDate && answers.startDate.getTime() === answers.endDate.getTime()) ? (
                              <p><span className="font-bold" style={{ color: '#A85A75' }}>{formatDate(answers.startDate)}</span><span className="ml-2 text-xs" style={{ color: '#8B6878' }}>日帰り</span></p>
                            ) : answers.endDate ? (
                              <p><span className="font-bold" style={{ color: '#A85A75' }}>{formatDate(answers.startDate)}</span><span className="mx-2" style={{ color: '#C77B8C' }}>→</span><span className="font-bold" style={{ color: '#A85A75' }}>{formatDate(answers.endDate)}</span><span className="ml-2 text-xs" style={{ color: '#8B6878' }}>{calculateNights()}</span></p>
                            ) : (
                              <p><span className="font-bold" style={{ color: '#A85A75' }}>{formatDate(answers.startDate)}</span><span className="text-xs ml-2" style={{ color: '#8B6878' }}>→ 帰る日を選択</span></p>
                            )}
                          </div>
                          <button onClick={clearDates} className="text-xs hover:underline" style={{ color: '#8B6878' }}>クリア</button>
                        </div>
                      )}
                      {!answers.startDate && (
                        <p className="mt-3 pt-3 border-t text-xs text-center" style={{ borderColor: '#F4D8DD', color: '#8B6878' }}>
                          {answers.isDayTrip ? '出かける日を選んでください' : '出発日と帰る日を選んでください'}
                        </p>
                      )}
                    </div>
                  </>
                )}

                {currentQuestion.type === 'prefecture' && (
                  <>
                    {!showPrefList && !answers.departure && (
                      <button onClick={() => setShowPrefList(true)}
                        className="w-full flex items-center justify-center gap-2 px-4 py-4 rounded-xl text-sm font-medium border-2 bg-white transition-all hover:shadow-md"
                        style={{ color: '#5C3A4A', borderColor: '#F4C8D2' }}>
                        <MapPin className="w-4 h-4" />出発地選択
                      </button>
                    )}
                    {(showPrefList || answers.departure) && (
                      <div className="bg-white rounded-2xl border-2 p-3" style={{ borderColor: '#F4C8D2' }}>
                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5">
                          {PREFECTURES.map((pref) => {
                            const isSelected = answers.departure === pref;
                            return (
                              <button key={pref} onClick={() => setAnswers({ ...answers, departure: pref })}
                                className="px-1 py-2 rounded-lg text-xs font-medium transition-all border"
                                style={isSelected ? { backgroundColor: '#C77B8C', color: 'white', borderColor: '#C77B8C' } : { backgroundColor: 'white', color: '#5C3A4A', borderColor: '#EAD5DA' }}>
                                {pref}
                              </button>
                            );
                          })}
                        </div>
                        {answers.departure && (
                          <div className="mt-3 pt-3 border-t flex items-center justify-between" style={{ borderColor: '#F4D8DD' }}>
                            <p className="text-sm" style={{ color: '#5C3A4A' }}>選択中: <span className="font-bold" style={{ color: '#A85A75' }}>{answers.departure}</span></p>
                            <button onClick={() => { setAnswers({ ...answers, departure: '' }); setShowPrefList(true); }} className="text-xs hover:underline" style={{ color: '#8B6878' }}>変更</button>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}

                {(currentQuestion.type === 'single' || currentQuestion.type === 'multi') && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {currentQuestion.options.map((option) => {
                      const isSelected = currentQuestion.type === 'multi' ? answers[currentQuestion.key].includes(option) : answers[currentQuestion.key] === option;
                      return (
                        <button key={option} onClick={() => handleSelect(option)}
                          className="px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border"
                          style={isSelected ? { backgroundColor: '#C77B8C', color: 'white', borderColor: '#C77B8C' } : { backgroundColor: 'white', color: '#5C3A4A', borderColor: '#EAD5DA' }}>
                          {option}
                        </button>
                      );
                    })}
                  </div>
                )}

                {currentQuestion.key !== 'hasDestination' && (
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium" style={{ color: '#8B6878' }}>
                      <Pencil className="w-3.5 h-3.5" />補足・自由記述（任意）
                    </label>
                    <textarea value={answers[noteKey] || ''} onChange={(e) => setAnswers({ ...answers, [noteKey]: e.target.value })}
                      placeholder={currentQuestion.notePlaceholder}
                      className="w-full h-20 px-3 py-2 rounded-xl border-2 focus:outline-none resize-none text-sm bg-white"
                      style={{ borderColor: '#F4D8DD', color: '#5C3A4A' }} />
                  </div>
                )}

                <div className="flex justify-between items-center pt-2">
                  <button onClick={handleBack} disabled={step === 0} className="flex items-center gap-1 text-sm hover:underline disabled:opacity-30 disabled:cursor-not-allowed" style={{ color: '#8B6878' }}>
                    <ChevronLeft className="w-4 h-4" />戻る
                  </button>
                  <div className="flex flex-col items-end gap-1">
                    {!isCurrentAnswered() && <p className="text-xs" style={{ color: '#A89098' }}>選択してください</p>}
                    <button onClick={handleNext} disabled={!isCurrentAnswered()}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
                      style={!isCurrentAnswered() ? { backgroundColor: '#D8C8D0', color: 'white', cursor: 'not-allowed', opacity: 0.5 } : { background: 'linear-gradient(135deg, #5C3A4A, #7A5A6A)', color: 'white', boxShadow: '0 4px 12px rgba(92, 58, 74, 0.25)' }}>
                      次へ<ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 最終確認画面 */}
            {isLastQuestion && !plans && !loading && (
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md" style={{ background: 'linear-gradient(135deg, #FAD0D8 0%, #E8C5DD 100%)' }}>
                    <Sparkles className="w-6 h-6" style={{ color: '#A85A75' }} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-1" style={{ color: '#5C3A4A' }}>他に伝えたいことは？</h2>
                    <p className="text-sm" style={{ color: '#8B6878' }}>自由に書いてください（任意）</p>
                  </div>
                </div>
                <textarea value={answers.freeText} onChange={(e) => setAnswers({ ...answers, freeText: e.target.value })}
                  placeholder="例：インスタ映えするスポット重視 / 雨でも楽しめるところ / アレルギーあり など"
                  className="w-full h-32 px-4 py-3 rounded-xl border-2 focus:outline-none resize-none bg-white"
                  style={{ borderColor: '#F4D8DD', color: '#5C3A4A' }} />
                <div className="rounded-xl p-4 text-xs space-y-1.5 border-2" style={{ backgroundColor: 'rgba(250, 208, 216, 0.2)', borderColor: '#F4E0E5', color: '#8B6878' }}>
                  <p className="font-bold pb-1.5 mb-1 border-b" style={{ color: '#5C3A4A', borderColor: '#F4D8DD' }}>📋 入力内容</p>
                  <p><span className="font-semibold" style={{ color: '#5C3A4A' }}>行き先:</span> {answers.hasDestination === 'はい' ? (answers.destination || '未記入') : 'おまかせ'}</p>
                  <p><span className="font-semibold" style={{ color: '#5C3A4A' }}>時期・期間:</span> {dateDisplay}{answers.whenNote && ` (${answers.whenNote})`}</p>
                  <p><span className="font-semibold" style={{ color: '#5C3A4A' }}>同行者:</span> {answers.companions || '未指定'}{answers.companionsNote && ` (${answers.companionsNote})`}</p>
                  <p><span className="font-semibold" style={{ color: '#5C3A4A' }}>出発地:</span> {answers.departure || '未指定'}{answers.departureNote && ` (${answers.departureNote})`}</p>
                  <p><span className="font-semibold" style={{ color: '#5C3A4A' }}>移動:</span> {answers.transport || '未指定'}{answers.transportNote && ` (${answers.transportNote})`}</p>
                  <p><span className="font-semibold" style={{ color: '#5C3A4A' }}>予算:</span> {answers.budget || '未指定'}{answers.budgetNote && ` (${answers.budgetNote})`}</p>
                  <p><span className="font-semibold" style={{ color: '#5C3A4A' }}>やりたいこと:</span> {answers.interests.join('、') || '未指定'}{answers.interestsNote && ` (${answers.interestsNote})`}</p>
                  <p><span className="font-semibold" style={{ color: '#5C3A4A' }}>雰囲気:</span> {answers.likes || '未指定'}{answers.likesNote && ` (${answers.likesNote})`}</p>
                </div>
                <div className="flex justify-between items-center">
                  <button onClick={handleBack} className="flex items-center gap-1 text-sm hover:underline" style={{ color: '#8B6878' }}>
                    <ChevronLeft className="w-4 h-4" />戻る
                  </button>
                  <button onClick={generatePlans}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90"
                    style={{ backgroundColor: '#C77B8C', color: 'white' }}>
                    <Sparkles className="w-4 h-4" />プランを作る
                  </button>
                </div>
              </div>
            )}

            {/* ローディング */}
            {loading && (
              <div className="py-10">
                <div className="text-center mb-6">
                  <div className="inline-block animate-spin mb-3">
                    <Sparkles className="w-10 h-10" style={{ color: '#C77B8C' }} />
                  </div>
                  <p className="font-bold" style={{ color: '#5C3A4A' }}>あなただけのプランを考え中...</p>
                  <p className="text-xs mt-1" style={{ color: '#8B6878' }}>少々お待ちください（30秒ほど）</p>
                </div>
                
                {/* 生成中のプラン一覧 */}
                <div className="space-y-2.5 max-w-md mx-auto">
                  {['A', 'B', 'C'].map((key, idx) => {
                    const meta = planLabels[key];
                    return (
                      <div key={key} className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: meta.bg }}>
                        <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 relative" style={{ backgroundColor: meta.color }}>
                          {React.createElement(meta.icon, { className: "w-4 h-4 text-white" })}
                          {/* 生成中のパルスアニメーション（順番にハイライト） */}
                          <div 
                            className="absolute inset-0 rounded-full animate-ping" 
                            style={{ 
                              backgroundColor: meta.color, 
                              opacity: 0.4,
                              animationDelay: `${idx * 0.3}s`,
                            }}
                          ></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold" style={{ color: meta.color }}>
                            {meta.label}・{meta.theme}
                          </p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <div className="flex gap-1">
                              <span className="inline-block w-1 h-1 rounded-full animate-bounce" style={{ backgroundColor: meta.color, animationDelay: `${idx * 0.2}s` }}></span>
                              <span className="inline-block w-1 h-1 rounded-full animate-bounce" style={{ backgroundColor: meta.color, animationDelay: `${idx * 0.2 + 0.1}s` }}></span>
                              <span className="inline-block w-1 h-1 rounded-full animate-bounce" style={{ backgroundColor: meta.color, animationDelay: `${idx * 0.2 + 0.2}s` }}></span>
                            </div>
                            <p className="text-xs italic" style={{ color: '#8B6878' }}>
                              {key === 'A' && '王道のおでかけプランを考えています'}
                              {key === 'B' && '穴場スポットを探しています'}
                              {key === 'C' && '特別な体験を選んでいます'}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* エラー */}
            {error && (
              <div className="py-8 text-center">
                <p className="mb-4" style={{ color: '#C77B8C' }}>{error}</p>
                <button onClick={generatePlans} className="px-5 py-2 rounded-xl text-sm" style={{ backgroundColor: '#5C3A4A', color: 'white' }}>再試行</button>
              </div>
            )}

            {/* プラン結果（A/B/C） */}
            {plans && !loading && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b" style={{ borderColor: '#F4D8DD' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#C77B8C' }}>
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold" style={{ color: '#5C3A4A' }}>3つのおすすめプラン</h2>
                    <p className="text-xs" style={{ color: '#8B6878' }}>お好みのプランをお選びください</p>
                  </div>
                </div>

                <div className="rounded-xl p-3 flex gap-2 border-2" style={{ backgroundColor: 'rgba(250, 208, 216, 0.3)', borderColor: '#F4D8DD' }}>
                  <Info className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#C77B8C' }} />
                  <p className="text-xs leading-relaxed" style={{ color: '#5C3A4A' }}>
                    <strong className="px-1.5 py-0.5 rounded" style={{ backgroundColor: 'rgba(244, 200, 210, 0.6)' }}>ピンクのタグ</strong>をタップすると、その場所の詳細情報を検索できます
                  </p>
                </div>

                {/* A/B/Cプラン */}
                {['A', 'B', 'C'].map((key) => {
                  const planData = plans[key];
                  if (!planData) return null;
                  const meta = planLabels[key];
                  const isOpen = openPlan === key;
                  const fav = isFavorite(key);
                  return (
                    <div key={key} ref={(el) => { planRefs.current[key] = el; }} className="rounded-xl border-2 overflow-hidden" style={{ borderColor: meta.color, backgroundColor: 'white' }}>
                      <button onClick={() => setOpenPlan(isOpen ? '' : key)}
                        className="w-full flex items-center justify-between p-4 transition-colors"
                        style={{ backgroundColor: isOpen ? meta.bg : 'white' }}>
                        <div className="flex items-center gap-3 text-left flex-1 min-w-0">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: meta.color }}>
                            {React.createElement(meta.icon, { className: "w-5 h-5 text-white" })}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: meta.color, color: 'white' }}>{meta.label}</span>
                              <span className="text-xs" style={{ color: meta.color }}>{meta.theme}</span>
                            </div>
                            <p className="text-sm font-bold truncate" style={{ color: '#5C3A4A' }}>{planData.title}</p>
                            <p className="text-xs truncate" style={{ color: '#8B6878' }}>{planData.summary}</p>
                          </div>
                        </div>
                        <ChevronDown className={`w-5 h-5 flex-shrink-0 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} style={{ color: meta.color }} />
                      </button>
                      
                      {isOpen && (
                        <div className="border-t p-4 space-y-4" style={{ borderColor: meta.bg }}>
                          {/* イメージ写真 */}
                          {planData.imageKeyword && (
                            <div className="rounded-xl overflow-hidden relative" style={{ aspectRatio: '2/1', backgroundColor: meta.bg }}>
                              <img 
                                src={getPhotoUrl(planData.imageKeyword)}
                                alt={planData.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                onError={(e) => { e.target.style.display = 'none'; }}
                              />
                              {/* 写真の上に薄く重ねるグラデーション */}
                              <div className="absolute inset-0 pointer-events-none" style={{
                                background: 'linear-gradient(to bottom, transparent 0%, transparent 60%, rgba(0,0,0,0.3) 100%)'
                              }}></div>
                              {/* 写真クレジット表記 */}
                              <p className="absolute bottom-1.5 right-2 text-[9px] text-white/80">
                                Photo via Flickr
                              </p>
                            </div>
                          )}
                          <div className="prose max-w-none">{renderPlan(planData.content)}</div>
                          
                          {/* アクションボタン */}
                          <div className="flex flex-wrap gap-2 pt-3 border-t" style={{ borderColor: meta.bg }}>
                            <button onClick={() => toggleFavorite(key)}
                              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-medium border transition-colors"
                              style={fav ? { backgroundColor: '#FFE5EA', color: '#C77B8C', borderColor: '#C77B8C' } : { backgroundColor: 'white', color: '#5C3A4A', borderColor: '#EAD5DA' }}>
                              <Heart className={`w-3.5 h-3.5 ${fav ? 'fill-current' : ''}`} />
                              {fav ? '保存済み' : 'マイページに保存'}
                            </button>
                            <button onClick={() => sendByEmail(planData, meta.label)}
                              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-medium border transition-colors hover:bg-pink-50"
                              style={{ backgroundColor: 'white', color: '#5C3A4A', borderColor: '#EAD5DA' }}>
                              <Mail className="w-3.5 h-3.5" />メールで送る
                            </button>
                            <button onClick={() => copyToClipboard(planData, meta.label, key)}
                              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-medium border transition-colors hover:bg-pink-50"
                              style={{ backgroundColor: 'white', color: '#5C3A4A', borderColor: '#EAD5DA' }}>
                              {copiedKey === key ? <><Check className="w-3.5 h-3.5" />コピー済み</> : <><Copy className="w-3.5 h-3.5" />コピー</>}
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t" style={{ borderColor: '#F4D8DD' }}>
                  <button onClick={generatePlans}
                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium transition-colors"
                    style={{ backgroundColor: 'rgba(244, 216, 221, 0.5)', color: '#5C3A4A' }}>
                    <RefreshCw className="w-4 h-4" />別の3プランを提案
                  </button>
                  <button onClick={reset}
                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90"
                    style={{ backgroundColor: '#C77B8C', color: 'white' }}>
                    最初からやり直す
                  </button>
                </div>

                {/* その他の候補 */}
                <div className="pt-4 border-t space-y-3" style={{ borderColor: '#F4D8DD' }}>
                  {!extras && !extrasLoading && (
                    <button onClick={generateExtras}
                      className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium border-2 transition-colors hover:shadow-md"
                      style={{ backgroundColor: 'rgba(232, 197, 221, 0.3)', color: '#7A4A60', borderColor: '#E8C5DD' }}>
                      <Sparkles className="w-4 h-4" />その他の候補も見る（カフェ・ご飯・名所）
                    </button>
                  )}
                  {extrasLoading && (
                    <div className="text-center py-4">
                      <div className="inline-block animate-spin"><Sparkles className="w-6 h-6" style={{ color: '#B888AD' }} /></div>
                      <p className="text-sm mt-2" style={{ color: '#8B6878' }}>候補を集めています...</p>
                    </div>
                  )}
                  {extras && (
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold flex items-center gap-2" style={{ color: '#5C3A4A' }}>
                        <Sparkles className="w-5 h-5" style={{ color: '#B888AD' }} />その他の候補
                      </h3>
                      {[
                        { key: 'cafes', label: 'カフェ', icon: Coffee, items: extras.cafes },
                        { key: 'restaurants', label: 'ご飯処', icon: Utensils, items: extras.restaurants },
                        { key: 'spots', label: '名所・スポット', icon: Camera, items: extras.spots },
                      ].map(section => (
                        <div key={section.key} className="bg-white border-2 rounded-xl overflow-hidden" style={{ borderColor: '#F4D8DD' }}>
                          <button onClick={() => setOpenExtraSection(openExtraSection === section.key ? null : section.key)}
                            className="w-full flex items-center justify-between px-4 py-3 hover:bg-pink-50 transition-colors">
                            <div className="flex items-center gap-2.5">
                              {React.createElement(section.icon, { className: "w-4 h-4", style: { color: '#C77B8C' } })}
                              <span className="text-sm font-bold" style={{ color: '#5C3A4A' }}>{section.label}</span>
                              <span className="text-xs" style={{ color: '#A89098' }}>（{section.items?.length || 0}件）</span>
                            </div>
                            <ChevronDown className={`w-4 h-4 transition-transform ${openExtraSection === section.key ? 'rotate-180' : ''}`} style={{ color: '#A89098' }} />
                          </button>
                          {openExtraSection === section.key && section.items && (
                            <div className="border-t divide-y" style={{ borderColor: '#F4D8DD' }}>
                              {section.items.map((item, idx) => (
                                <a key={idx} href={searchUrl(item.name)} target="_blank" rel="noopener noreferrer" className="block px-4 py-3 hover:bg-pink-50 transition-colors">
                                  <p className="text-sm font-bold underline decoration-2 underline-offset-2 flex items-center gap-1" style={{ color: '#A85A75', textDecorationColor: '#F4C8D2' }}>
                                    {item.name}<ExternalLink className="w-3 h-3 flex-shrink-0" />
                                  </p>
                                  <p className="text-xs mt-1" style={{ color: '#8B6878' }}>{item.description}</p>
                                </a>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ============ マイページ画面 ============ */}
        {view === 'mypage' && (
          <div className="rounded-3xl p-6 sm:p-8" style={{
            backgroundColor: 'rgba(255, 255, 255, 0.75)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            boxShadow: '0 8px 32px rgba(199, 123, 140, 0.15)',
          }}>
            <div className="flex items-center gap-3 pb-4 border-b mb-4" style={{ borderColor: '#F4D8DD' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#C77B8C' }}>
                <Heart className="w-5 h-5 text-white fill-current" />
              </div>
              <div>
                <h2 className="text-xl font-bold" style={{ color: '#5C3A4A' }}>保存したプラン</h2>
                <p className="text-xs" style={{ color: '#8B6878' }}>{favorites.length}件のお気に入り</p>
              </div>
            </div>

            {favorites.length === 0 && (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: 'rgba(244, 216, 221, 0.5)' }}>
                  <Bookmark className="w-7 h-7" style={{ color: '#C77B8C' }} />
                </div>
                <p className="text-sm font-medium mb-2" style={{ color: '#5C3A4A' }}>まだ保存したプランはありません</p>
                <p className="text-xs mb-6" style={{ color: '#8B6878' }}>気に入ったプランを保存して、後から見返せます</p>
                <button onClick={() => setView('home')}
                  className="px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
                  style={{ backgroundColor: '#C77B8C', color: 'white' }}>
                  プランを作る
                </button>
              </div>
            )}

            {favorites.length > 0 && (
              <div className="space-y-3">
                {favorites.map((fav) => {
                  const meta = planLabels[fav.planKey] || planLabels.A;
                  return (
                    <div key={fav.id} className="rounded-xl border-2 overflow-hidden bg-white" style={{ borderColor: meta.color }}>
                      <div className="p-4" style={{ backgroundColor: meta.bg }}>
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: meta.color }}>
                            {React.createElement(meta.icon, { className: "w-5 h-5 text-white" })}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: meta.color, color: 'white' }}>{fav.planLabel}</span>
                              <span className="text-xs" style={{ color: '#8B6878' }}>
                                {new Date(fav.savedAt).toLocaleDateString('ja-JP')}
                              </span>
                            </div>
                            <p className="text-sm font-bold" style={{ color: '#5C3A4A' }}>{fav.title}</p>
                            <p className="text-xs mt-0.5" style={{ color: '#8B6878' }}>{fav.summary}</p>
                          </div>
                          <button onClick={() => removeFavorite(fav.id)}
                            className="p-1.5 rounded-lg transition-colors hover:bg-white/60"
                            style={{ color: '#A89098' }}>
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <details className="border-t" style={{ borderColor: meta.bg }}>
                        <summary className="px-4 py-2.5 text-xs cursor-pointer hover:bg-pink-50 transition-colors" style={{ color: meta.color }}>
                          📖 プランの詳細を見る
                        </summary>
                        <div className="p-4 border-t space-y-4" style={{ borderColor: meta.bg }}>
                          {fav.imageKeyword && (
                            <div className="rounded-xl overflow-hidden relative" style={{ aspectRatio: '2/1', backgroundColor: meta.bg }}>
                              <img 
                                src={getPhotoUrl(fav.imageKeyword)}
                                alt={fav.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                                onError={(e) => { e.target.style.display = 'none'; }}
                              />
                              <div className="absolute inset-0 pointer-events-none" style={{
                                background: 'linear-gradient(to bottom, transparent 0%, transparent 60%, rgba(0,0,0,0.3) 100%)'
                              }}></div>
                              <p className="absolute bottom-1.5 right-2 text-[9px] text-white/80">
                                Photo via Flickr
                              </p>
                            </div>
                          )}
                          <div className="prose max-w-none">{renderPlan(fav.content)}</div>
                          <div className="flex flex-wrap gap-2 pt-3 mt-3 border-t" style={{ borderColor: meta.bg }}>
                            <button onClick={() => sendByEmail(fav, fav.planLabel)}
                              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border transition-colors hover:bg-pink-50"
                              style={{ backgroundColor: 'white', color: '#5C3A4A', borderColor: '#EAD5DA' }}>
                              <Mail className="w-3.5 h-3.5" />メールで送る
                            </button>
                            <button onClick={() => copyToClipboard(fav, fav.planLabel, `fav-${fav.id}`)}
                              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border transition-colors hover:bg-pink-50"
                              style={{ backgroundColor: 'white', color: '#5C3A4A', borderColor: '#EAD5DA' }}>
                              {copiedKey === `fav-${fav.id}` ? <><Check className="w-3.5 h-3.5" />コピー済み</> : <><Copy className="w-3.5 h-3.5" />コピー</>}
                            </button>
                          </div>
                        </div>
                      </details>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        <p className="text-center text-xs mt-6" style={{ color: '#A89098' }}>✨ AIがあなたのおでかけをプランニング</p>
      </div>
    </div>
  );
}