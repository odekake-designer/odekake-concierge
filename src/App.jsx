import React, { useState, useRef, useEffect } from 'react';
import { Calendar, Users, Train, Wallet, Heart, Sparkles, MapPin, ArrowRight, RefreshCw, ChevronLeft, ChevronRight, Pencil, Sun, Home, Compass, Info, ExternalLink, ChevronDown, Coffee, Utensils, Camera, Mail, Copy, Bookmark, Trash2, Check, Crown, Gem, Star, Globe, Share2, Smile, MessageCircle, Send, Wand2 } from 'lucide-react';

const BG_IMAGE = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAA0JCgsKCA0LCgsODg0PEyAVExISEyccHhcgLikxMC4pLSwzOko+MzZGNywtQFdBRkxOUlNSMj5aYVpQYEpRUk//2wBDAQ4ODhMREyYVFSZPNS01T09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0//wgARCAN4AfQDASIAAhEBAxEB/8QAGQABAQEBAQEAAAAAAAAAAAAAAAECAwQF/8QAGAEBAQEBAQAAAAAAAAAAAAAAAAECAwT/2gAMAwEAAhADEAAAAfo2XXpBCiUJQABAAAQBQBFUSyBLAEoixCiKSLKABAIpIKABJQikAlM+soBAFliUAQAKABAALSRLALAIsAQUixApKIEKIEACosQsAQBTPrAFQAWIoikihKAAQAChEsAoEABJQBEqoAEABJQgAsABAFM+oAAqAAQACgiwFSUEoBEoSiUslCUSKEsQsAAsiiKSFIEShKoAEpceqAAAAFRKAAAQAAApIAEACgQAESiLAECgQogEpIoikiqUx6gEoigEAWBZSKIpIoSiFJRAEoikABJSosQAsAQCUQAsQKgBSBNFz6YsEsUsCkigAAAELAAsQAAogQAEACwAEAhSKSKIsAQKLACqz6JQgAAAAACkigUzbBKSLAohSURKIpJQikhRLLAAAQABKSLCpaiijPoSiUIoiiKCUFJSQKgAAQAAEAABAAQKlCUQBKSLAUSiBAAKM+gAAAAUlVAIAQKqKEpIoABAJZQEAikAAixAAoEAAlESiKBc+iFIoigAChIAAAAAEAChUgAAQAEAABAJWjREzNZEqoEFICjPoAWAABZUShLAogCiURKIogsUAEoikiiLEAWUBIBYNMksAKSkiiKKsz6CwiwFIolEAAAAABAAAQAKBAAAQCKAQCLBZQEhSACwDSs95LAFAABAACwAsohUgCiKSKIoikgoAEAABAAAAQBLAEA6TUz2yLUoAlQLAoAASgEAAABAAAQABKsSiLAEAWUiwABAAQDYz2gUBLAUiwAACggLAAACkgBSBABSLECgASKAEoikSiFIAE3Uz2LkBUoASiFAJQBAAoICgQAAEAigEiiFIEFqAABAAIsKE3LM9kFFIoiwAAAABAAAAsAABAAAARKAAQQoEsoVIAAAE0M9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Aw0gOL42gUG003Jbe94LbuJJ/pqGCHJdcIHDHo9tAAHo4877t8z49/77P7//AM9MrS2PcNQIfyzBoMeyNNoowx3a6jOSzCDk18GPKnODB8KPZdc0xxMEMd0kV3yyuOfuNcDD63y2rFkMxhttNJccxxAwRVw6iSziz6Vtef7mb3IwZRhxxxIIvI8gN5MdNctqHIglIR36SPe+HDvP/wCiw/x8MEcQATKAQMwgt7gDVLI0/u+88lhq/wAM84497ynwh2w0q4cLbWNB3v1d6476vtfP/KNvL2UBDHDXygX6788BnHETbbrKOMVf04+949/y1wwUzAEHaoNq403h3ywh233XxDv7LPLLPzx3QBX0AKMNb/8AzpdJl1xBBQBFMCPKCfqCRRk99okMrCDD7uKXb3vLc+9988x+q/O6nNMFxAQxR4sNnHuTPS7CmLDBCABGKDCyHz6/58s5BA0BXe6C2+O+e/8AznnbPLa9rg2ggxwlOfTCASsv28imkr788tu/lPXfv/8A7688IJFHQz25u6ta4Y8csIIMMYJEHAENL7OP749sjz3Naf8A/wDu445nv/8AZ740AAEUIINMY5b+0TD7pNP/ALDXKCyz3/8Avv3jBffVLf8A7qoMewDIMMNOMMMJYoPP/bqM57MNXzlmsZ69N74MMMEEd77QhYMcpIItMIMMJKFHwLr+sLL7+8337r577f8AvO++PWuD/uODNAM0z7iCD++98+ue+69//wAuv9/vn+/vi8xAAM9z/wAMJJbz7LK4/wBx0aCzTCqzzi+7P+oABDH+CCCSAAOSy85BBCmDDCCDDCC/3+6EFLCyrCCAAACCABBcAEDDHWCDvKiD/wDsvvbSvry0tinHbbTXLAMAz/rB/wDf4oMcI5LHX0z/AC6ez99/9988w59988X/AP8A76/++q40mEGNIb79bnXHXzygHXvzz29L7OPf8ILbU01It/PMOIkADTgEUOJDDnaNenGyIIroIY/ta475aoAAAAQEFEUARd46d8sDD766mAMvbKKzSgAAAgEEEgABWfKoY7/r4JEPN4Kt426nSgwADkEHAAABUMcKr764ubIPvI0920Y99wB22mUETTzzX/I77rfvpVkTfrG8CUhWh7DH333zzzzhT+vopNNpb5H3q/1xyA322x3333nDhzziP/pJ/wDTwLzUTRdPJbaNBFRN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";

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

const PREFECTURES_EN = [
  'Hokkaido','Aomori','Iwate','Miyagi','Akita','Yamagata','Fukushima',
  'Ibaraki','Tochigi','Gunma','Saitama','Chiba','Tokyo','Kanagawa',
  'Niigata','Toyama','Ishikawa','Fukui','Yamanashi','Nagano',
  'Gifu','Shizuoka','Aichi','Mie',
  'Shiga','Kyoto','Osaka','Hyogo','Nara','Wakayama',
  'Tottori','Shimane','Okayama','Hiroshima','Yamaguchi',
  'Tokushima','Kagawa','Ehime','Kochi',
  'Fukuoka','Saga','Nagasaki','Kumamoto','Oita','Miyazaki','Kagoshima','Okinawa'
];

// 気象庁API用の都道府県コードマッピング(代表都市)
const JMA_AREA_CODES = {
  '北海道': '016000', '青森県': '020000', '岩手県': '030000', '宮城県': '040000',
  '秋田県': '050000', '山形県': '060000', '福島県': '070000', '茨城県': '080000',
  '栃木県': '090000', '群馬県': '100000', '埼玉県': '110000', '千葉県': '120000',
  '東京都': '130000', '神奈川県': '140000', '新潟県': '150000', '富山県': '160000',
  '石川県': '170000', '福井県': '180000', '山梨県': '190000', '長野県': '200000',
  '岐阜県': '210000', '静岡県': '220000', '愛知県': '230000', '三重県': '240000',
  '滋賀県': '250000', '京都府': '260000', '大阪府': '270000', '兵庫県': '280000',
  '奈良県': '290000', '和歌山県': '300000', '鳥取県': '310000', '島根県': '320000',
  '岡山県': '330000', '広島県': '340000', '山口県': '350000', '徳島県': '360000',
  '香川県': '370000', '愛媛県': '380000', '高知県': '390000', '福岡県': '400000',
  '佐賀県': '410000', '長崎県': '420000', '熊本県': '430000', '大分県': '440000',
  '宮崎県': '450000', '鹿児島県': '460100', '沖縄県': '471000',
};

// 行き先のテキストから都道府県を推測する(主要観光地名にも対応)
const DESTINATION_TO_PREF = {
  '京都': '京都府', '清水寺': '京都府', '嵐山': '京都府', '祇園': '京都府',
  '東京': '東京都', '渋谷': '東京都', '新宿': '東京都', '浅草': '東京都', 'お台場': '東京都',
  '横浜': '神奈川県', '鎌倉': '神奈川県', '箱根': '神奈川県', '江ノ島': '神奈川県',
  '大阪': '大阪府', '梅田': '大阪府', '難波': '大阪府', 'USJ': '大阪府', 'ユニバ': '大阪府',
  '神戸': '兵庫県', '姫路': '兵庫県', '有馬': '兵庫県',
  '奈良': '奈良県', '名古屋': '愛知県', '熱海': '静岡県', '伊豆': '静岡県',
  '日光': '栃木県', '那須': '栃木県', '軽井沢': '長野県', '高山': '岐阜県', '飛騨': '岐阜県',
  '金沢': '石川県', '富山': '富山県', '新潟': '新潟県',
  '広島': '広島県', '宮島': '広島県', '尾道': '広島県', '岡山': '岡山県', '倉敷': '岡山県',
  '福岡': '福岡県', '博多': '福岡県', '別府': '大分県', '湯布院': '大分県', '由布院': '大分県',
  '熊本': '熊本県', '長崎': '長崎県', '鹿児島': '鹿児島県', '屋久島': '鹿児島県',
  '沖縄': '沖縄県', '石垣': '沖縄県', '宮古島': '沖縄県', '那覇': '沖縄県',
  '札幌': '北海道', '函館': '北海道', '小樽': '北海道', '富良野': '北海道', 'ニセコ': '北海道',
  '仙台': '宮城県', '松島': '宮城県', '青森': '青森県',
};

const LANGUAGES = {
  ja: { code: 'ja', name: '日本語', flag: '🇯🇵', aiName: '日本語' },
  en: { code: 'en', name: 'English', flag: '🇺🇸', aiName: 'English' },
};

const T = {
  ja: {
    subtitle: 'あなただけの、特別なおでかけプランを',
    tagline: "Today's plan, leave it to me ♡",
    progress_label: 'あなたのプランが',
    progress_suffix: '%できました!',
    progress_start: 'プラン作成スタート',
    progress_almost: 'もう少しで完成です!',
    progress_complete: 'いよいよ最終ステップ',
    tabPlan: 'プランを作る',
    tabMypage: 'マイページ',
    backBtn: '戻る',
    nextBtn: '次へ',
    pleaseSelect: '選択してください',
    q_dest_title: '行き先は決まっていますか？',
    q_dest_yes: 'はい',
    q_dest_no: 'いいえ',
    q_dest_label: '行き先を教えてください',
    q_dest_ph: '例:京都、箱根、沖縄、宮古島、大阪のUSJ など',
    q_when_title: 'いつ行きますか？',
    q_when_sub: '出発日と帰る日を選んでください',
    q_when_ph: '例:午後から夜まで、朝6時出発、紅葉の時期に など',
    q_when_info: '時間が決まっている場合(例:午後から夜まで、朝6時出発など)は',
    q_when_info_em: '日にちを選択して下の補足欄',
    q_when_info_end: 'に記入してください',
    q_when_dayTrip: '日帰り',
    q_when_dayTrip_off: '(タップで解除)',
    q_when_choose_dates: '出発日と帰る日を選んでください',
    q_when_choose_date: '出かける日を選んでください',
    q_when_choose_end: '→ 帰る日を選択',
    q_when_clear: 'クリア',
    q_comp_title: '誰と行きますか？',
    q_comp_sub: '同行者を選んでください',
    q_comp_alone: 'ひとり',
    q_comp_partner: 'パートナー',
    q_comp_friends: '友人',
    q_comp_family: '家族',
    q_comp_kids: '子連れ',
    q_comp_group: '大人数グループ',
    q_comp_ph: '例:両親と、3歳の子供と、5人グループ など',
    q_dep_title: 'どこから出発しますか？',
    q_dep_sub: '都道府県を選んでください',
    q_dep_btn: '出発地選択',
    q_dep_selected: '選択中:',
    q_dep_change: '変更',
    q_dep_ph: '例:横浜駅から、神戸三宮、那覇空港から など',
    q_tr_title: 'どうやって行きますか？',
    q_tr_sub: '主な移動手段は?',
    q_tr_train: '電車',
    q_tr_car: '車',
    q_tr_plane: '飛行機',
    q_tr_shink: '新幹線',
    q_tr_bus: 'バス',
    q_tr_undec: '決めてない',
    q_tr_ph: '例:レンタカー利用、自家用車で、現地ではタクシー など',
    q_bg_title: '予算はどのくらい？',
    q_bg_sub: '一人あたりの目安',
    q_bg_5k: '〜5,000円',
    q_bg_15k: '〜15,000円',
    q_bg_30k: '〜30,000円',
    q_bg_50k: '〜50,000円',
    q_bg_50p: '50,000円以上',
    q_bg_no: '気にしない',
    q_bg_ph: '例:交通費別、食事に多めに使いたい など',
    q_int_title: 'どんなことがしたい？',
    q_int_sub: '複数選択OK',
    q_int_sights: '観光・名所巡り',
    q_int_food: 'グルメ',
    q_int_onsen: '温泉・リラックス',
    q_int_act: 'アクティビティ',
    q_int_shop: 'ショッピング',
    q_int_nat: '自然・絶景',
    q_int_cafe: 'カフェ巡り',
    q_int_art: 'アート・文化',
    q_int_night: '夜景・夜の街',
    q_int_solo: 'ひとり時間',
    q_int_ph: '例:海鮮が食べたい、写真を撮りたい、温泉に長く浸かりたい など',
    q_lk_title: '好きな雰囲気は？',
    q_lk_sub: 'どんな空気感が好き?',
    q_lk_lively: '賑やか・活気',
    q_lk_quiet: '静か・落ち着く',
    q_lk_chic: 'おしゃれ・洗練',
    q_lk_retro: 'レトロ・懐かしい',
    q_lk_adv: '冒険・刺激的',
    q_lk_relax: 'のんびり・癒し',
    q_lk_ph: '例:人混みが苦手、地元の人と交流したい、SNS映え重視 など',
    q_ex_title: '他に伝えたいことは？',
    q_ex_sub: '自由に書いてください(任意)',
    q_ex_ph: '例:インスタ映えするスポット重視 / 雨でも楽しめるところ / アレルギーあり など',
    note_label: '補足・自由記述(任意)',
    sum_title: '📋 入力内容',
    sum_dest: '行き先:',
    sum_when: '時期・期間:',
    sum_comp: '同行者:',
    sum_dep: '出発地:',
    sum_tr: '移動:',
    sum_bg: '予算:',
    sum_int: 'やりたいこと:',
    sum_lk: '雰囲気:',
    sum_undef: '未指定',
    sum_omakase: 'おまかせ',
    sum_unwritten: '未記入',
    btn_create: 'プランを作る',
    load_messages: [
      'あなたの希望を読み解いています',
      '本物のおでかけ、丁寧に組み立てています',
      '定番から穴場まで、心を込めて選んでいます',
      'コンシェルジュが念入りに仕上げています',
      'もうすぐです。最後のひと工夫を',
    ],
    load_sub: '生成には約90秒ほどかかります',
    load_a: '王道のおでかけプランを考えています',
    load_b: '穴場スポットを探しています',
    load_c: '特別な体験を選んでいます',
    pa_label: 'Aプラン',
    pa_theme: '王道・定番',
    pb_label: 'Bプラン',
    pb_theme: '穴場・通好み',
    pc_label: 'Cプラン',
    pc_theme: '贅沢・特別感',
    res_title: '3つのおすすめプラン',
    res_sub: 'お好みのプランをお選びください',
    link_em: 'ピンクのタグ',
    link_text: 'をタップすると、その場所の詳細情報を検索できます',
    btn_save: 'マイページに保存',
    btn_saved: '保存済み',
    btn_email: 'メールで送る',
    btn_copy: 'コピー',
    btn_copied: 'コピー済み',
    btn_share: '共有する',
    btn_shared: '共有しました',
    share_title: 'おでかけプラン',
    btn_regen: '別の3プランを提案',
    btn_reset: '最初からやり直す',
    ext_btn: 'その他の候補も見る(カフェ・ご飯・名所)',
    ext_loading: '候補を集めています...',
    ext_title: 'その他の候補',
    ext_cafes: 'カフェ',
    ext_rest: 'ご飯処',
    ext_spots: '名所・スポット',
    ext_count: '件',
    mp_title: '保存したプラン',
    mp_count: '件のお気に入り',
    mp_empty_title: 'まだ保存したプランはありません',
    mp_empty_sub: '気に入ったプランを保存して、後から見返せます',
    mp_detail: '📖 プランの詳細を見る',
    err_msg: 'プラン生成中にエラーが発生しました。もう一度お試しください。',
    err_retry: '再試行',
    insta_err_msg: '映え版プランの生成に失敗しました。もう一度お試しください。',
    photo_credit: 'Photo via Flickr',
    img_warning_q: '時期・期間',
    weather_title: '🌤️ 旅行日の情報',
    weather_loading: '天気予報を取得中...',
    weather_unavailable: '天気予報の取得対象外(予報は約1週間先まで)',
    warnings_title: '⚠️ 注意ポイント',
    insta_btn: '📷 映え重視で再構成',
    insta_btn_hint: '生成に90秒ほどかかります',
    insta_loading: '映えスポット視点で再構成中...',
    insta_back: '本来のプランに戻る',
    insta_badge: '映え版',
    insta_score: 'SNS映え度',
    insta_time: 'ベスト撮影時間',
    insta_angle: 'おすすめ構図',
    insta_tags: '推奨ハッシュタグ',
    album_title: 'ODEKAKEアルバム',
    album_sub: '行ってきた旅の思い出',
    album_empty: '保存したプランで「行ってきた」を記録すると、ここに思い出が残ります',
    album_visit_btn: '✓ この旅、行ってきた',
    album_form_title: '旅の思い出を記録',
    album_review_label: '感想(200字程度)',
    album_review_ph: '例:紅葉のタイミングが完璧で、夕方の光がきれいでした。○○のうどんは想像以上...',
    album_rating_label: '満足度',
    album_photos_label: '写真(任意・最大3枚)',
    album_photos_add: '写真を追加',
    album_save: '記録する',
    album_cancel: 'キャンセル',
    album_edit: '編集',
    album_delete: '削除',
    album_visited_at: '訪問日',
    album_delete_confirm: '本当に削除しますか?',
    // チャットモード
    chat_btn: 'チャットで相談',
    chat_header_title: 'おでかけコンシェルジュ',
    chat_header_sub: '気軽にご相談ください',
    chat_welcome: 'こんにちは。今日はどんなおでかけをお考えですか?行き先や同行者、雰囲気など、自由にお話しください。',
    chat_input_ph: 'メッセージを入力...',
    chat_send: '送信',
    chat_reset: '最初から相談する',
    chat_reset_confirm: '会話をリセットしますか?(これまでの内容は消えます)',
    chat_generate_btn: 'このまま、プランを作る',
    chat_thinking: 'コンシェルジュが考えています...',
    chat_error: 'メッセージの送信に失敗しました。もう一度お試しください。',
    chat_back_to_form: '質問形式に切り替える',
    ai_invite_text: 'AIと話しながら、ぴったりのおでかけ先を探せます',
  },
  en: {
    subtitle: 'Your personal travel plan, made just for you',
    tagline: "Today's plan, leave it to me ♡",
    progress_label: 'Your plan is',
    progress_suffix: '% complete!',
    progress_start: "Let's start your plan",
    progress_almost: 'Almost there!',
    progress_complete: 'Final step coming up',
    tabPlan: 'Create Plan',
    tabMypage: 'My Page',
    backBtn: 'Back',
    nextBtn: 'Next',
    pleaseSelect: 'Please select',
    q_dest_title: 'Have you decided where to go?',
    q_dest_yes: 'Yes',
    q_dest_no: 'No',
    q_dest_label: 'Tell us your destination',
    q_dest_ph: 'e.g. Kyoto, Hakone, Okinawa, Osaka USJ',
    q_when_title: 'When are you going?',
    q_when_sub: 'Choose departure and return dates',
    q_when_ph: 'e.g. afternoon to night, leaving at 6 AM, autumn season',
    q_when_info: 'If you have specific times (e.g. afternoon to night, 6 AM departure), please ',
    q_when_info_em: 'select the date and write in the notes below',
    q_when_info_end: '',
    q_when_dayTrip: 'Day Trip',
    q_when_dayTrip_off: '(tap to cancel)',
    q_when_choose_dates: 'Please select departure and return dates',
    q_when_choose_date: 'Please select your trip date',
    q_when_choose_end: '→ Select return date',
    q_when_clear: 'Clear',
    q_comp_title: 'Who are you going with?',
    q_comp_sub: 'Select your companions',
    q_comp_alone: 'Solo',
    q_comp_partner: 'Partner',
    q_comp_friends: 'Friends',
    q_comp_family: 'Family',
    q_comp_kids: 'With Kids',
    q_comp_group: 'Group',
    q_comp_ph: 'e.g. with parents, with a 3-year-old, group of 5',
    q_dep_title: 'Where are you departing from?',
    q_dep_sub: 'Select prefecture',
    q_dep_btn: 'Select Departure',
    q_dep_selected: 'Selected:',
    q_dep_change: 'Change',
    q_dep_ph: 'e.g. from Yokohama Station, Kobe Sannomiya, Naha Airport',
    q_tr_title: 'How will you get there?',
    q_tr_sub: 'Main transportation',
    q_tr_train: 'Train',
    q_tr_car: 'Car',
    q_tr_plane: 'Plane',
    q_tr_shink: 'Shinkansen',
    q_tr_bus: 'Bus',
    q_tr_undec: 'Undecided',
    q_tr_ph: 'e.g. rent a car, own car, taxi locally',
    q_bg_title: 'What is your budget?',
    q_bg_sub: 'Per person',
    q_bg_5k: '〜¥5,000',
    q_bg_15k: '〜¥15,000',
    q_bg_30k: '〜¥30,000',
    q_bg_50k: '〜¥50,000',
    q_bg_50p: '¥50,000+',
    q_bg_no: 'No limit',
    q_bg_ph: 'e.g. excluding transportation, want to spend on food',
    q_int_title: 'What do you want to do?',
    q_int_sub: 'Multiple selection OK',
    q_int_sights: 'Sightseeing',
    q_int_food: 'Gourmet',
    q_int_onsen: 'Hot Springs',
    q_int_act: 'Activities',
    q_int_shop: 'Shopping',
    q_int_nat: 'Nature & Views',
    q_int_cafe: 'Cafe Hopping',
    q_int_art: 'Art & Culture',
    q_int_night: 'Nightlife',
    q_int_solo: 'Me Time',
    q_int_ph: 'e.g. want to eat seafood, take photos, soak in hot springs',
    q_lk_title: 'What kind of vibe do you like?',
    q_lk_sub: 'Choose your atmosphere',
    q_lk_lively: 'Lively',
    q_lk_quiet: 'Quiet',
    q_lk_chic: 'Chic',
    q_lk_retro: 'Retro',
    q_lk_adv: 'Adventurous',
    q_lk_relax: 'Relaxing',
    q_lk_ph: 'e.g. avoid crowds, want to interact with locals, Instagram-worthy',
    q_ex_title: 'Anything else to share?',
    q_ex_sub: 'Feel free to write (optional)',
    q_ex_ph: 'e.g. Instagram-worthy spots / rainy day options / allergies',
    note_label: 'Notes / Free text (optional)',
    sum_title: '📋 Your Inputs',
    sum_dest: 'Destination:',
    sum_when: 'Date:',
    sum_comp: 'With:',
    sum_dep: 'From:',
    sum_tr: 'Transport:',
    sum_bg: 'Budget:',
    sum_int: 'Interests:',
    sum_lk: 'Vibe:',
    sum_undef: 'Not specified',
    sum_omakase: 'Surprise me',
    sum_unwritten: 'Not written',
    btn_create: 'Create Plan',
    load_messages: [
      'Reading your wishes carefully',
      'Crafting an authentic journey for you',
      'Curating from classics to hidden gems',
      'Your concierge is putting it all together',
      'Almost there. Adding the final touches',
    ],
    load_sub: 'Takes about 90 seconds',
    load_a: 'Crafting the classic plan',
    load_b: 'Finding hidden gems',
    load_c: 'Selecting special experiences',
    pa_label: 'Plan A',
    pa_theme: 'Classic',
    pb_label: 'Plan B',
    pb_theme: 'Hidden Gems',
    pc_label: 'Plan C',
    pc_theme: 'Luxury',
    res_title: '3 Recommended Plans',
    res_sub: 'Choose your favorite',
    link_em: 'Pink tags',
    link_text: ' can be tapped to search for details',
    btn_save: 'Save to My Page',
    btn_saved: 'Saved',
    btn_email: 'Email',
    btn_copy: 'Copy',
    btn_copied: 'Copied',
    btn_share: 'Share',
    btn_shared: 'Shared',
    share_title: 'Travel Plan',
    btn_regen: 'Generate New Plans',
    btn_reset: 'Start Over',
    ext_btn: 'See More (Cafes・Food・Spots)',
    ext_loading: 'Gathering suggestions...',
    ext_title: 'More Suggestions',
    ext_cafes: 'Cafes',
    ext_rest: 'Restaurants',
    ext_spots: 'Spots',
    ext_count: '',
    mp_title: 'Saved Plans',
    mp_count: ' favorites',
    mp_empty_title: 'No saved plans yet',
    mp_empty_sub: 'Save plans you love to revisit later',
    mp_detail: '📖 View Plan Details',
    err_msg: 'An error occurred while generating the plan. Please try again.',
    err_retry: 'Retry',
    insta_err_msg: 'Failed to generate photo-worthy plans. Please try again.',
    photo_credit: 'Photo via Flickr',
    weather_title: '🌤️ Trip Day Info',
    weather_loading: 'Fetching weather...',
    weather_unavailable: 'Weather forecast not available (forecasts cover ~1 week ahead)',
    warnings_title: '⚠️ Heads-up',
    insta_btn: '📷 Re-style for Photos',
    insta_btn_hint: 'Takes about 90 seconds',
    insta_loading: 'Re-styling for Instagram-worthy spots...',
    insta_back: 'Back to original plans',
    insta_badge: 'Photo Edition',
    insta_score: 'Photo Score',
    insta_time: 'Best Time',
    insta_angle: 'Suggested Angle',
    insta_tags: 'Hashtags',
    album_title: 'ODEKAKE Album',
    album_sub: 'Memories of trips you took',
    album_empty: 'Mark a saved plan as visited to record your memories here',
    album_visit_btn: '✓ Mark as Visited',
    album_form_title: 'Record Your Memory',
    album_review_label: 'Your thoughts (~200 chars)',
    album_review_ph: 'e.g. The autumn colors were perfect, and the evening light was beautiful...',
    album_rating_label: 'Rating',
    album_photos_label: 'Photos (optional, up to 3)',
    album_photos_add: 'Add Photo',
    album_save: 'Save',
    album_cancel: 'Cancel',
    album_edit: 'Edit',
    album_delete: 'Delete',
    album_visited_at: 'Visited',
    album_delete_confirm: 'Delete this memory?',
    chat_btn: 'Chat with us',
    chat_header_title: 'ODEKAKE Concierge',
    chat_header_sub: 'Feel free to ask anything',
    chat_welcome: 'Hello! What kind of outing are you thinking about today? Feel free to share your destination, companions, or the vibe you want.',
    chat_input_ph: 'Type a message...',
    chat_send: 'Send',
    chat_reset: 'Start over',
    chat_reset_confirm: 'Reset the conversation? Your messages will be lost.',
    chat_generate_btn: 'Generate plans now',
    chat_thinking: 'Your concierge is thinking...',
    chat_error: 'Failed to send. Please try again.',
    chat_back_to_form: 'Switch to questions',
    ai_invite_text: 'Chat with AI to find your perfect destination',
  },
};

export default function HolidayPlanner() {
  const [step, setStep] = useState(0);
  const [lang, setLang] = useState('ja');
  const [showLangMenu, setShowLangMenu] = useState(false);
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
  const [plans, setPlans] = useState(null);
  const [openPlan, setOpenPlan] = useState('A');
  const [favorites, setFavorites] = useState([]);
  const [view, setView] = useState('home');
  const [copiedKey, setCopiedKey] = useState('');
  const [extras, setExtras] = useState(null);
  const [extrasLoading, setExtrasLoading] = useState(false);
  const [openExtraSection, setOpenExtraSection] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [calendarMonth, setCalendarMonth] = useState(new Date());
  const [showPrefList, setShowPrefList] = useState(false);
  // 天気・季節情報
  const [tripWeather, setTripWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  // 映え版プラン
  const [instaPlans, setInstaPlans] = useState(null);
  const [instaLoading, setInstaLoading] = useState(false);
  const [instaError, setInstaError] = useState('');
  const [showInsta, setShowInsta] = useState(false);
  // ODEKAKEアルバム
  const [albums, setAlbums] = useState([]);
  const [albumEditingId, setAlbumEditingId] = useState(null);
  const [albumDraft, setAlbumDraft] = useState({ favId: null, review: '', rating: 5, photos: [] });

  // ローディング中の段階的メッセージ
  const [loadingMsgIdx, setLoadingMsgIdx] = useState(0);
  // 擬似進捗バー(0-100)
  const [loadingProgress, setLoadingProgress] = useState(0);
  // チャットモード
  const [chatMessages, setChatMessages] = useState([]); // [{role:'user'|'assistant', content:string}]
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [chatError, setChatError] = useState('');
  const chatScrollRef = useRef(null);

  // アルバムの localStorage 永続化(初回ロード)
  useEffect(() => {
    try {
      const saved = localStorage.getItem('odekake_albums');
      if (saved) setAlbums(JSON.parse(saved));
    } catch (e) { console.error('Album load failed:', e); }
  }, []);

  // アルバム変更時に localStorage へ保存
  useEffect(() => {
    try {
      localStorage.setItem('odekake_albums', JSON.stringify(albums));
    } catch (e) { console.error('Album save failed:', e); }
  }, [albums]);

  // ローディングメッセージのローテーション(5秒ごと、最後で停止)
  useEffect(() => {
    if (!loading) {
      setLoadingMsgIdx(0);
      return;
    }
    const messages = T[lang]?.load_messages;
    const total = messages?.length || 0;
    if (total <= 1) return;
    const timer = setInterval(() => {
      setLoadingMsgIdx((prev) => Math.min(prev + 1, total - 1));
    }, 18000);
    return () => clearInterval(timer);
  }, [loading, lang]);

  // 擬似進捗バー:約90秒を想定し、滑らかに進む。90秒以降も99%に向けて進み続ける
  useEffect(() => {
    if (!loading) {
      // 完了時:100%にして余韻、その後リセット
      if (loadingProgress > 0 && loadingProgress < 100) {
        setLoadingProgress(100);
        const t = setTimeout(() => setLoadingProgress(0), 800);
        return () => clearTimeout(t);
      }
      return;
    }
    setLoadingProgress(0);
    const startTime = Date.now();
    // 0-90秒:ロジスティックで 0→90%(中央45秒で50%)
    // 90秒以降:90→99%に漸近(止まらない)
    const t0 = 45; // 中央
    const k = 0.058; // カーブの傾き
    // 端点を正規化するための定数
    const minR = 1 / (1 + Math.exp(-k * (0 - t0)));
    const maxR = 1 / (1 + Math.exp(-k * (90 - t0)));
    const timer = setInterval(() => {
      const elapsedSec = (Date.now() - startTime) / 1000;
      let value;
      if (elapsedSec <= 90) {
        const ratio = 1 / (1 + Math.exp(-k * (elapsedSec - t0)));
        const scaled = (ratio - minR) / (maxR - minR);
        value = Math.max(0, Math.min(90, scaled * 90));
      } else {
        // 90秒以降:漸近で99%に近づく
        const extra = elapsedSec - 90;
        value = 90 + 9 * (1 - Math.exp(-extra / 40));
      }
      setLoadingProgress(value);
    }, 150);
    return () => clearInterval(timer);
  }, [loading]);
  const planRefs = useRef({ A: null, B: null, C: null });

  const t = (key) => T[lang][key] || T.ja[key] || key;

  useEffect(() => {
    if (openPlan && plans && planRefs.current[openPlan]) {
      setTimeout(() => {
        const el = planRefs.current[openPlan];
        if (el) {
          const rect = el.getBoundingClientRect();
          window.scrollTo({ top: window.scrollY + rect.top - 10, behavior: 'smooth' });
        }
      }, 100);
    }
  }, [openPlan, plans]);

  // 同行者・移動・予算・雰囲気の選択肢を内部値（日本語）として保存し、表示時に翻訳
  const COMP_OPTS = [
    { val: 'alone', t: 'q_comp_alone' },
    { val: 'partner', t: 'q_comp_partner' },
    { val: 'friends', t: 'q_comp_friends' },
    { val: 'family', t: 'q_comp_family' },
    { val: 'kids', t: 'q_comp_kids' },
    { val: 'group', t: 'q_comp_group' },
  ];
  const TR_OPTS = [
    { val: 'train', t: 'q_tr_train' },
    { val: 'car', t: 'q_tr_car' },
    { val: 'plane', t: 'q_tr_plane' },
    { val: 'shink', t: 'q_tr_shink' },
    { val: 'bus', t: 'q_tr_bus' },
    { val: 'undec', t: 'q_tr_undec' },
  ];
  const BG_OPTS = [
    { val: '5k', t: 'q_bg_5k' },
    { val: '15k', t: 'q_bg_15k' },
    { val: '30k', t: 'q_bg_30k' },
    { val: '50k', t: 'q_bg_50k' },
    { val: '50p', t: 'q_bg_50p' },
    { val: 'no', t: 'q_bg_no' },
  ];
  const INT_OPTS = [
    { val: 'sights', t: 'q_int_sights' },
    { val: 'food', t: 'q_int_food' },
    { val: 'onsen', t: 'q_int_onsen' },
    { val: 'act', t: 'q_int_act' },
    { val: 'shop', t: 'q_int_shop' },
    { val: 'nat', t: 'q_int_nat' },
    { val: 'cafe', t: 'q_int_cafe' },
    { val: 'art', t: 'q_int_art' },
    { val: 'night', t: 'q_int_night' },
    { val: 'solo', t: 'q_int_solo' },
  ];
  const LK_OPTS = [
    { val: 'lively', t: 'q_lk_lively' },
    { val: 'quiet', t: 'q_lk_quiet' },
    { val: 'chic', t: 'q_lk_chic' },
    { val: 'retro', t: 'q_lk_retro' },
    { val: 'adv', t: 'q_lk_adv' },
    { val: 'relax', t: 'q_lk_relax' },
  ];
  const DEST_OPTS = [
    { val: 'yes', t: 'q_dest_yes' },
    { val: 'no', t: 'q_dest_no' },
  ];

  // 内部値を表示テキストに変換
  const getOptLabel = (opts, val) => {
    const opt = opts.find(o => o.val === val);
    return opt ? t(opt.t) : '';
  };
  // AI送信用：内部値を日本語にする
  const getOptJa = (opts, val) => {
    const opt = opts.find(o => o.val === val);
    return opt ? T.ja[opt.t] : '';
  };

  const questions = [
    { key: 'hasDestination', icon: Compass, title: t('q_dest_title'), subtitle: '', opts: DEST_OPTS, type: 'single' },
    { key: 'when', icon: Calendar, title: t('q_when_title'), subtitle: t('q_when_sub'), type: 'dateRange', notePh: t('q_when_ph') },
    { key: 'companions', icon: Users, title: t('q_comp_title'), subtitle: t('q_comp_sub'), opts: COMP_OPTS, type: 'single', notePh: t('q_comp_ph') },
    { key: 'departure', icon: Home, title: t('q_dep_title'), subtitle: t('q_dep_sub'), type: 'prefecture', notePh: t('q_dep_ph') },
    { key: 'transport', icon: Train, title: t('q_tr_title'), subtitle: t('q_tr_sub'), opts: TR_OPTS, type: 'single', notePh: t('q_tr_ph') },
    { key: 'budget', icon: Wallet, title: t('q_bg_title'), subtitle: t('q_bg_sub'), opts: BG_OPTS, type: 'single', notePh: t('q_bg_ph') },
    { key: 'interests', icon: Sparkles, title: t('q_int_title'), subtitle: t('q_int_sub'), opts: INT_OPTS, type: 'multi', notePh: t('q_int_ph') },
    { key: 'likes', icon: Heart, title: t('q_lk_title'), subtitle: t('q_lk_sub'), opts: LK_OPTS, type: 'single', notePh: t('q_lk_ph') },
  ];

  const currentQuestion = questions[step];
  const isLastQuestion = step === questions.length;

  const handleSelect = (val) => {
    const q = currentQuestion;
    if (q.type === 'multi') {
      const cur = answers[q.key];
      const updated = cur.includes(val) ? cur.filter(o => o !== val) : [...cur, val];
      setAnswers({ ...answers, [q.key]: updated });
    } else {
      setAnswers({ ...answers, [q.key]: val });
    }
  };

  const isCurrentAnswered = () => {
    if (!currentQuestion) return true;
    const key = currentQuestion.key;
    if (key === 'hasDestination') {
      if (answers.hasDestination === 'yes') return answers.destination.trim() !== '';
      return answers.hasDestination === 'no';
    }
    if (currentQuestion.type === 'dateRange') return answers.startDate !== null;
    if (currentQuestion.type === 'prefecture') return answers.departure !== '';
    if (currentQuestion.type === 'multi') return answers[key].length > 0;
    return answers[key] !== '';
  };

  const handleNext = () => { if (isCurrentAnswered()) setStep(step + 1); };
  const handleBack = () => { if (step > 0) setStep(step - 1); };

  const formatDate = (date) => date ? `${date.getMonth() + 1}/${date.getDate()}` : '';
  const formatDateFull = (date) => {
    if (!date) return '';
    const days = lang === 'ja' ? ['日','月','火','水','木','金','土'] : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}(${days[date.getDay()]})`;
  };

  const getDaysInMonth = (date) => {
    const y = date.getFullYear();
    const m = date.getMonth();
    const first = new Date(y, m, 1).getDay();
    const last = new Date(y, m + 1, 0).getDate();
    const days = [];
    for (let i = 0; i < first; i++) days.push(null);
    for (let i = 1; i <= last; i++) days.push(new Date(y, m, i));
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
    const nd = new Date(calendarMonth);
    nd.setMonth(nd.getMonth() + delta);
    setCalendarMonth(nd);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const getDateStatus = (date) => {
    if (!date) return null;
    const { startDate, endDate } = answers;
    if (!startDate) return null;
    const dt = date.getTime();
    const st = startDate.getTime();
    const et = endDate ? endDate.getTime() : null;
    if (dt === st && (!et || et === st)) return 'single';
    if (dt === st) return 'start';
    if (et && dt === et) return 'end';
    if (et && dt > st && dt < et) return 'between';
    return null;
  };

  const calcNights = () => {
    const { startDate, endDate, isDayTrip } = answers;
    if (!startDate) return '';
    if (isDayTrip || !endDate || startDate.getTime() === endDate.getTime()) return lang === 'ja' ? '日帰り' : 'Day trip';
    const d = Math.round((endDate - startDate) / 86400000);
    return lang === 'ja' ? `${d}泊${d + 1}日` : `${d} night${d > 1 ? 's' : ''}`;
  };

  const buildSummary = () => {
    // AIには日本語で送る（精度確保のため）
    const line = (label, value, note) => {
      let l = `・${label}: ${value || '未指定'}`;
      if (note) l += `(補足: ${note})`;
      return l;
    };
    // 日帰り/宿泊の表示(日付がなくても isDayTrip を反映する)
    let dateStr;
    if (answers.startDate) {
      const isDay = answers.isDayTrip || !answers.endDate || answers.startDate.getTime() === answers.endDate.getTime();
      dateStr = isDay
        ? `${formatDateFull(answers.startDate)} 【日帰り(宿泊なし)】`
        : `${formatDateFull(answers.startDate)} 〜 ${formatDateFull(answers.endDate)}`;
    } else {
      // 日付なし → isDayTrip フラグだけでも反映
      if (answers.isDayTrip === true) dateStr = '日付未指定 【日帰り(宿泊なし)】';
      else if (answers.isDayTrip === false) dateStr = '日付未指定(宿泊あり)';
      else dateStr = '未指定';
    }
    const destStr = answers.hasDestination === 'yes' ? (answers.destination || '未記入') : '【おまかせ・指定なし】';
    return `${line('行き先', destStr, answers.destinationNote)}
${line('時期・期間', dateStr, answers.whenNote)}
${line('同行者', getOptJa(COMP_OPTS, answers.companions), answers.companionsNote)}
${line('出発地', answers.departure, answers.departureNote)}
${line('移動手段', getOptJa(TR_OPTS, answers.transport), answers.transportNote)}
${line('予算', getOptJa(BG_OPTS, answers.budget), answers.budgetNote)}
${line('やりたいこと', answers.interests.map(v => getOptJa(INT_OPTS, v)).join('、'), answers.interestsNote)}
${line('好きな雰囲気', getOptJa(LK_OPTS, answers.likes), answers.likesNote)}
・その他の要望: ${answers.freeText || '特になし'}`;
  };

  // ===== 天気・季節情報取得 =====
  // 行き先テキストから都道府県を推測
  const detectPrefecture = (destText) => {
    if (!destText) return null;
    // 完全一致(都道府県名)
    if (JMA_AREA_CODES[destText]) return destText;
    // 部分一致(主要観光地名)
    for (const [key, pref] of Object.entries(DESTINATION_TO_PREF)) {
      if (destText.includes(key)) return pref;
    }
    // 都道府県名の部分一致
    for (const pref of Object.keys(JMA_AREA_CODES)) {
      const short = pref.replace(/[都道府県]$/, '');
      if (destText.includes(short)) return pref;
    }
    return null;
  };

  // 季節イベントを判定(月+地域 → 桜・紅葉・祭り等)
  const getSeasonalEvent = (date, pref) => {
    if (!date) return null;
    const m = date.getMonth() + 1;
    const events = [];
    // 桜(地域差を考慮)
    if (pref) {
      if (['沖縄県'].includes(pref) && (m === 1 || m === 2)) events.push('桜の時期(寒緋桜)');
      else if (['北海道'].includes(pref) && (m === 4 || m === 5)) events.push('桜の時期');
      else if ((m === 3 && date.getDate() >= 20) || m === 4) events.push('桜の時期(混雑注意)');
    }
    // 紅葉
    if (pref) {
      if (['北海道'].includes(pref) && (m === 9 || m === 10)) events.push('紅葉の時期');
      else if ((m === 11) || (m === 10 && date.getDate() >= 20) || (m === 12 && date.getDate() <= 5)) {
        events.push('紅葉の時期(混雑注意)');
      }
    }
    // 梅雨
    if (m === 6 || (m === 7 && date.getDate() <= 20)) {
      if (!['北海道'].includes(pref)) events.push('梅雨の時期(雨の備えを)');
    }
    // 真夏
    if (m === 7 || m === 8) events.push('真夏(熱中症対策を)');
    // 冬季
    if (m === 12 || m === 1 || m === 2) {
      if (['北海道', '長野県', '新潟県', '富山県', '石川県', '福井県', '岐阜県', '山形県', '秋田県'].includes(pref)) {
        events.push('冬季(積雪・閉鎖施設に注意)');
      }
    }
    // GW・お盆・年末年始(混雑)
    if ((m === 4 && date.getDate() >= 29) || (m === 5 && date.getDate() <= 6)) events.push('GW期間(大混雑)');
    if (m === 8 && date.getDate() >= 10 && date.getDate() <= 16) events.push('お盆期間(混雑)');
    if ((m === 12 && date.getDate() >= 29) || (m === 1 && date.getDate() <= 3)) events.push('年末年始(混雑・休業注意)');
    return events.length > 0 ? events : null;
  };

  // 気象庁APIで天気予報を取得
  const fetchWeather = async (pref, tripDate) => {
    const code = JMA_AREA_CODES[pref];
    if (!code) return null;
    try {
      const res = await fetch(`https://www.jma.go.jp/bosai/forecast/data/forecast/${code}.json`);
      if (!res.ok) return null;
      const data = await res.json();
      // data[0] が直近の予報。timeSeries[0] が天気概況
      const ts = data[0]?.timeSeries?.[0];
      if (!ts) return null;
      const times = ts.timeDefines.map(t => new Date(t));
      const weathers = ts.areas[0]?.weathers || [];
      // 旅行日に最も近い予報を探す
      const tripTime = tripDate.getTime();
      let bestIdx = -1;
      let bestDiff = Infinity;
      times.forEach((t, i) => {
        const diff = Math.abs(t.getTime() - tripTime);
        if (diff < bestDiff && diff < 24 * 60 * 60 * 1000 * 1.5) { // 1.5日以内なら採用
          bestDiff = diff;
          bestIdx = i;
        }
      });
      if (bestIdx === -1) return { available: false };
      return {
        available: true,
        weather: weathers[bestIdx] || '',
        forecastDate: times[bestIdx],
        publishingOffice: data[0].publishingOffice,
      };
    } catch (e) {
      console.error('Weather fetch failed:', e);
      return null;
    }
  };

  // プラン生成前に呼ぶ:天気+季節の情報をまとめて取得
  const prepareTripContext = async () => {
    const dest = answers.destination || answers.destinationNote || '';
    const pref = detectPrefecture(dest);
    const tripDate = answers.startDate;
    const seasonal = getSeasonalEvent(tripDate, pref);
    let weather = null;
    if (pref && tripDate) {
      setWeatherLoading(true);
      weather = await fetchWeather(pref, tripDate);
      setWeatherLoading(false);
    }
    const ctx = { pref, tripDate, seasonal, weather };
    setTripWeather(ctx);
    return ctx;
  };

  const generatePlans = async () => {
    setLoading(true); setError(''); setPlans(null); setOpenPlan('A');
    setExtras(null); setOpenExtraSection(null);
    setInstaPlans(null); setShowInsta(false);

    // 天気・季節情報を先に取得
    const tripCtx = await prepareTripContext();

    const summary = buildSummary();

    // 天気・季節情報をプロンプト用テキストに変換
    let weatherSection = '';
    if (tripCtx.weather?.available) {
      weatherSection += `- 天気予報(気象庁発表): ${tripCtx.weather.weather}\n`;
    }
    if (tripCtx.seasonal && tripCtx.seasonal.length > 0) {
      weatherSection += `- 季節要因: ${tripCtx.seasonal.join('、')}\n`;
    }
    const weatherBlock = weatherSection
      ? `\n【旅行日の状況(必ずプランに反映)】\n${weatherSection}上記を踏まえ、雨予報なら屋内中心、晴れなら屋外中心、混雑期なら早朝・分散など、現実に即したプランを組んでください。\n`
      : '';

    // ユーザーの主要条件を動的に最重要ルールとして抽出(プロンプト冒頭に配置)
    const criticalConstraints = [];
    if (answers.isDayTrip === true) {
      criticalConstraints.push('🚨 ユーザーは「日帰り」を希望しています。3プラン全て日帰りで構成してください。宿泊・1泊・温泉旅館に泊まる提案は絶対に禁止です。日帰りで楽しめる範囲のスポットだけで構成してください。');
    } else if (answers.isDayTrip === false && answers.startDate && answers.endDate) {
      const days = Math.round((answers.endDate.getTime() - answers.startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      criticalConstraints.push(`🚨 ユーザーは${days - 1}泊${days}日を希望しています。この泊数を厳守してください。`);
    }
    if (answers.hasDestination !== 'yes' || !answers.destination) {
      criticalConstraints.push('🚨 ユーザーは行き先を指定していません(おまかせ)。3プラン全てを同じ目的地にしないでください。出発地・移動手段・予算・興味から逆算し、3プランで異なる方向のエリアを提案してください。例: 出発地が岡山なら、Aプランは岡山県内、Bプランは兵庫西部、Cプランは香川方面、など現実的に散らす。');
    } else if (answers.destination) {
      criticalConstraints.push(`🚨 ユーザーの行き先指定は「${answers.destination}」です。3プラン全てこのエリア内で完結させてください。勝手に別の地域を提案しないでください。`);
    }
    const criticalBlock = criticalConstraints.length > 0
      ? `\n\n══════════════════════════════════════\n【⛔ 最重要・絶対遵守(これを破ったプランは無効)】\n══════════════════════════════════════\n${criticalConstraints.map((c, i) => `${i + 1}. ${c}`).join('\n')}\n══════════════════════════════════════\n`
      : '';

    const prompt = `${criticalBlock}あなたは経験豊富な旅行プランナーです。以下の条件をもとに、3つの異なるテーマでプランを提案してください。

【出力言語】
${LANGUAGES[lang].aiName}で出力してください。タイトル、サマリー、本文、すべてこの言語で書いてください。施設名は日本の地名の場合、日本語のまま記載してください(検索しやすくするため)。

【ユーザーの希望】
${summary}
${weatherBlock}
【その他の遵守ルール】
- 移動手段が「車」なら駐車場情報、「電車」ならアクセス手段を必ず本文に含める。
- 同行者が「高齢者」「子連れ」等の場合、バリアフリー・休憩・無理のないペース配分を必ず反映する。
- 出発地から目的地までの移動時間が日帰りで現実的でない場合(片道3時間超など)、その旨を warnings に明記し、近場の代替を検討する。

【3つのプランのテーマ】
- Aプラン「王道・定番」: 一番人気のスポットや有名どころを巡る、はずさない安心プラン
- Bプラン「穴場・通好み」: 地元の人が行くようなディープなスポットや穴場を中心としたプラン
- Cプラン「贅沢・特別感」: 少し予算を上げて、記念日や自分へのご褒美にしたい特別感のあるプラン

【固有名詞のルール】
プラン内に登場する全ての固有名詞(観光地、施設、店、レストラン、カフェ、ホテル、駅など)は必ず [[名前]] の形式で二重角括弧で囲んでください。
✅ 正: [[清水寺]]を訪れる
❌ 誤: 清水寺を訪れる
❌ 誤: **[[竹林の小径]]**(外側の**は不要、[[ ]]だけでOK)

【失敗しないためのチェック(必ず含める)】
各プランには「warnings」フィールドを必ず含めてください。これは「失敗したくない」というユーザー心理に応える重要な情報です。
以下の観点で、そのプラン特有の注意点を3〜5個、上品で実用的に記載してください(威圧的でない優しいトーンで):
- 定休日(例:「○○は火曜定休。今回は金曜なので問題なし」)
- 予約必須情報(例:「△△は2週間前までに電話予約が必要」)
- 移動時間の現実性(例:「移動は約40分、余裕を持って」)
- 季節性(桜・紅葉時期の混雑、冬季閉鎖など)
- 営業時間の制約(例:「ラストオーダーが早めなので注意」)
- 同行者特有の配慮(子連れ・高齢者など、該当時のみ)
※ プランに登場しない一般論ではなく、必ずプラン内の具体的な施設・時間に紐づけること。

【出力形式】必ず以下のJSON形式のみで出力してください。前後に説明文は一切不要です。
{
  "A": {
    "title": "プランのキャッチコピー(15字以内)",
    "summary": "プランの一言説明(30字以内)",
    "imageKeyword": "プランの雰囲気を表す英語の検索キーワード(例: kyoto temple, tokyo cafe)。地名+雰囲気で2〜3語",
    "warnings": ["注意点1(1文)", "注意点2", "注意点3"],
    "content": "Markdown形式の本文。## 見出しと箇条書きで読みやすく。タイムスケジュール、予算内訳、持ち物・注意点を含める。"
  },
  "B": { 同じ構造 },
  "C": { 同じ構造 }
}

contentは各2000文字程度。親しみやすく、わくわくする文章で。`;
    try {
      const response = await fetch("/api/claude", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-5-20250929", max_tokens: 8000, messages: [{ role: "user", content: prompt }] }),
      });
      const data = await response.json();
      const text = data.content.map(i => i.text || "").join("\n");
      const clean = text.replace(/```json|```/g, "").trim();
      setPlans(JSON.parse(clean));
    } catch (err) {
      console.error(err);
      setError(t('err_msg'));
    } finally { setLoading(false); }
  };

  const generateExtras = async () => {
    if (extras) return;
    setExtrasLoading(true);
    const summary = buildSummary();
    const prompt = `以下の条件のユーザーに対し、メインプラン以外の「その他の候補」を提案してください。

【出力言語】
descriptionは${LANGUAGES[lang].aiName}で書いてください。施設名は日本の地名の場合、日本語のまま記載してください。

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
      const response = await fetch("/api/claude", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-5-20250929", max_tokens: 1500, messages: [{ role: "user", content: prompt }] }),
      });
      const data = await response.json();
      const text = data.content.map(i => i.text || "").join("\n");
      const clean = text.replace(/```json|```/g, "").trim();
      setExtras(JSON.parse(clean));
    } catch (err) { console.error(err); }
    finally { setExtrasLoading(false); }
  };

  // 映え重視で再構成(同じ条件で映え視点の3プラン)
  const generateInstaPlans = async () => {
    if (instaPlans) {
      setShowInsta(true);
      return;
    }
    setInstaLoading(true);
    setInstaError('');
    const summary = buildSummary();

    // 動的に最重要ルールを生成(通常プランと同じパターン)
    const criticalConstraints = [];
    if (answers.isDayTrip === true) {
      criticalConstraints.push('🚨 ユーザーは「日帰り」を希望しています。3プラン全て日帰りで構成してください。宿泊・1泊・温泉旅館に泊まる提案は絶対に禁止です。');
    } else if (answers.isDayTrip === false && answers.startDate && answers.endDate) {
      const days = Math.round((answers.endDate.getTime() - answers.startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
      criticalConstraints.push(`🚨 ユーザーは${days - 1}泊${days}日を希望しています。この泊数を厳守してください。`);
    }
    if (answers.hasDestination === 'yes' && answers.destination) {
      criticalConstraints.push(`🚨 目的地は「${answers.destination}」です。3プラン全てこのエリア内で完結させてください。別の地域(出発地周辺など)に変更してはいけません。`);
    } else {
      criticalConstraints.push('🚨 行き先未指定なので、出発地・予算・移動手段から現実的な範囲で目的地を選んでください。3プランを同じ目的地にしないでください。');
    }
    const criticalBlock = criticalConstraints.length > 0
      ? `\n\n══════════════════════════════════════\n【⛔ 最重要・絶対遵守(これを破ったプランは無効)】\n══════════════════════════════════════\n${criticalConstraints.map((c, i) => `${i + 1}. ${c}`).join('\n')}\n══════════════════════════════════════\n`
      : '';

    const prompt = `${criticalBlock}あなたはSNS映えに詳しい旅行プランナーです。以下の条件で、写真映え・SNS映えに特化した3プランを提案してください。

【出力言語】
${LANGUAGES[lang].aiName}で出力してください。施設名は日本の地名の場合、日本語のまま記載してください。

【ユーザーの希望】
${summary}

【3プラン】
- A: 王道映えプラン(誰もが知る撮影スポット中心)
- B: 穴場映えプラン(まだ知られていないフォトジェニック)
- C: 贅沢映えプラン(特別感ある絶景・体験)

【その他のルール】
- 固有名詞は必ず [[名前]] の形式で囲んでください。
- 各プランのspotsは必ず3〜4件(多すぎるとトークンが切れます。3〜4件厳守)。
- contentは1000〜1200字程度(超過しないこと)。

【映え情報(各スポットに必ず含める)】
- photoScore: SNS映え度(1〜5の整数)
- bestTime: ベスト撮影時間(20字以内)
- angle: おすすめ構図(20字以内)
- tags: 推奨ハッシュタグ(配列、3個、#は付けない)

【出力形式】必ず以下のJSON形式のみで出力してください。前後に説明文・コードブロック記号は一切不要です。
{
  "A": {
    "title": "プランのキャッチコピー(15字以内)",
    "summary": "プランの一言説明(30字以内)",
    "imageKeyword": "英語のキーワード2〜3語",
    "spots": [
      {
        "name": "スポット名(固有名詞、[[]]は不要、表示時に自動付与)",
        "description": "そのスポットの魅力(40字以内)",
        "photoScore": 5,
        "bestTime": "ベスト撮影時間",
        "angle": "おすすめ構図",
        "tags": ["タグ1", "タグ2", "タグ3"]
      }
    ],
    "content": "Markdown形式の本文(タイムスケジュール込み、1000字程度)。固有名詞は[[名前]]形式で囲む。"
  },
  "B": { 同じ構造 },
  "C": { 同じ構造 }
}`;
    try {
      const response = await fetch("/api/claude", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-5-20250929", max_tokens: 8000, messages: [{ role: "user", content: prompt }] }),
      });
      if (!response.ok) {
        throw new Error(`API responded with status ${response.status}`);
      }
      const data = await response.json();
      if (!data.content || !Array.isArray(data.content)) {
        throw new Error('Unexpected API response shape');
      }
      const text = data.content.map(i => i.text || "").join("\n");
      // JSON抽出: ```json ... ``` で囲まれていれば中身を、なければそのまま使う
      let clean = text.trim();
      const blockMatch = clean.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      if (blockMatch) clean = blockMatch[1].trim();
      // JSON冒頭の{ から末尾の } までを抽出(前後にゴミがある場合の保険)
      const firstBrace = clean.indexOf('{');
      const lastBrace = clean.lastIndexOf('}');
      if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        clean = clean.slice(firstBrace, lastBrace + 1);
      }
      const parsed = JSON.parse(clean);
      // 最低限の構造チェック(A,B,C があり、各プランに spots がある)
      if (!parsed.A || !parsed.B || !parsed.C) {
        throw new Error('Missing A/B/C plans in response');
      }
      setInstaPlans(parsed);
      setShowInsta(true);
      setOpenPlan('A');
    } catch (err) {
      console.error('Insta plan generation error:', err);
      setInstaError(t('insta_err_msg'));
    } finally {
      setInstaLoading(false);
    }
  };

  // ===== チャットモード =====
  // チャット用のシステムプロンプト(コンシェルジュの人格と役割を定義)
  const buildChatSystemPrompt = () => {
    // 実コードの選択肢を AI に正確に伝えるための一覧を動的構築
    const optsList = (opts) => opts.map(o => `"${o.val}"(${T.ja[o.t]})`).join(', ');
    return `あなたはODEKAKEというサービスの旅行コンシェルジュです。ユーザーと自然な対話を通じて、おでかけプランの希望をやさしく聞き出してください。

【あなたの役割】
- 上品で温かみのある言葉づかい(押し付けがましくない、洗練された日本語)
- 一度に1〜2個ずつ、自然に質問する。質問攻めにしない
- ユーザーが既に話してくれた情報は二度聞かない
- 雑談にも自然に応じる(「素敵ですね」「いいですね」など共感)
- 完璧主義のユーザーに対応できるよう、品の良い言葉を選ぶ

【出力言語】
${LANGUAGES[lang].aiName}で応答してください。

【集めたい情報】
1. 行き先(地域名・施設名など、未定でもOK)
2. 時期・期間(具体的な日程または「いつ頃」)
3. 同行者
4. 出発地
5. 移動手段
6. 予算感
7. やりたいこと・興味(複数可)
8. 好きな雰囲気

すべて完璧に揃わなくても問題ありません。ユーザーが話しやすいトピックから自然に。

【ユーザー発言の解釈ルール(厳守)】
- 「日帰り」「日帰りで」「その日のうちに帰る」「一日だけ」等の発言があれば、必ず isDayTrip: true、endDate は startDate と同じ値にする
- 「1泊」「2泊」「泊まりで」「宿泊」「温泉に泊まる」等の発言があれば、isDayTrip: false、endDate を適切に設定
- 「行き先は決まってない」「おまかせ」「どこでもいい」「おすすめは?」「決めてない」等の発言があれば、hasDestination: "no"、destination: "" にする(勝手に行き先を推測しない)
- ユーザーが明示していない条件は推測で埋めない。空文字または null を使う
- 「日帰り」と「宿泊」の両方の発言があった場合は、より新しい(直近の)発言を優先する

【プラン生成タイミング】
情報が一定揃ったと判断した時、最後の応答の末尾に必ず以下のJSONブロックを含めてください(マークダウンのコードブロックで囲む):

\`\`\`json
{
  "ready": true,
  "answers": {
    "hasDestination": "yes か no(行き先が決まっているか)",
    "destination": "地域名や施設名(行き先がある場合、なければ空文字)",
    "destinationNote": "補足(空文字でも可)",
    "startDate": "2026-05-15(YYYY-MM-DD形式、未定なら null)",
    "endDate": "2026-05-15(同上、日帰りなら startDate と同じ、未定なら null)",
    "isDayTrip": true または false,
    "whenNote": "時期の補足や曖昧表現",
    "companions": "次の中から1つ(または空文字): ${optsList(COMP_OPTS)}",
    "companionsNote": "補足",
    "departure": "東京都、横浜駅 など、または空文字",
    "departureNote": "補足",
    "transport": "次の中から1つ(または空文字): ${optsList(TR_OPTS)}",
    "transportNote": "補足",
    "budget": "次の中から1つ(または空文字): ${optsList(BG_OPTS)}",
    "budgetNote": "補足",
    "interests": ["次の中から該当する複数を配列で: ${optsList(INT_OPTS)}"],
    "interestsNote": "補足",
    "likes": "次の中から1つ(または空文字): ${optsList(LK_OPTS)}",
    "likesNote": "補足",
    "freeText": "その他の要望があれば、なければ空文字"
  },
  "ready_message": "では、お聞きしたお話をもとに3つのプランをご用意しますね。"
}
\`\`\`

【重要なルール】
- 情報が3つ以下しか集まっていない時は、JSONを出さず、自然な会話を続けてください
- 情報が揃ってきたら(目安:5〜6項目)、ユーザーに「プランをお作りしましょうか?」と確認してからJSONを出してください
- JSONを出す時も、その前に必ず自然な会話文を入れてください(JSONだけ返さない)
- 確証のない情報は推測せず、空文字や null にしてください
- companions/transport/budget/likes は必ず**指定された値のみ**を使ってください(独自の値はNG)
- interests は指定された値の中から該当するものを配列で
- 短い応答(2〜4文程度)を心がけてください。長文は重い`;
  };

  // チャット用 answers 構造の初期値(実際の answers ステートと完全に一致させる)
  const emptyAnswers = () => ({
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

  // チャットメッセージの送信
  const sendChatMessage = async () => {
    const text = chatInput.trim();
    if (!text || chatLoading) return;
    setChatError('');
    const newMessages = [...chatMessages, { role: 'user', content: text }];
    setChatMessages(newMessages);
    setChatInput('');
    setChatLoading(true);
    try {
      const response = await fetch("/api/claude", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-5-20250929",
          max_tokens: 1500,
          system: buildChatSystemPrompt(),
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await response.json();
      const fullText = data.content.map(i => i.text || "").join("\n");

      // JSON ブロックの抽出を試みる
      const jsonMatch = fullText.match(/```json\s*([\s\S]*?)\s*```/);
      let visibleText = fullText;
      let readyData = null;
      if (jsonMatch) {
        try {
          const parsed = JSON.parse(jsonMatch[1]);
          if (parsed.ready && parsed.answers) {
            readyData = parsed;
            // JSONブロックを除いたテキストを表示用に
            visibleText = fullText.replace(/```json\s*[\s\S]*?\s*```/, '').trim();
            if (parsed.ready_message && !visibleText) visibleText = parsed.ready_message;
          }
        } catch (e) { console.error('Chat JSON parse failed:', e); }
      }

      setChatMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: visibleText,
          readyData, // 揃ったらここに answers が入る
        },
      ]);
    } catch (err) {
      console.error('Chat error:', err);
      setChatError(t('chat_error'));
    } finally {
      setChatLoading(false);
    }
  };

  // ユーザーの全発言からキーワードを検出して、AIのJSONより優先する(多層防御)
  // AIがJSONを間違えても、ユーザーの明示的な発言は必ず反映される
  const detectUserIntent = () => {
    // ユーザーの全発言を結合(role='user' のもの)
    const userText = chatMessages
      .filter(m => m.role === 'user')
      .map(m => m.content)
      .join(' ');

    const intent = {};

    // 日帰り検出(優先度: 後の発言を優先するため、宿泊系を先にチェックして上書き可能に)
    const dayTripPatterns = /日帰り|日帰|その日のうち|一日だけ|1日だけ|当日中/;
    const stayPatterns = /(\d)\s*泊|一泊|二泊|三泊|泊まり|宿泊|温泉旅館に泊|宿に泊/;
    if (dayTripPatterns.test(userText)) intent.isDayTrip = true;
    if (stayPatterns.test(userText)) intent.isDayTrip = false;
    // 両方ある場合、後の発言を優先(最後にマッチしたもの)
    if (dayTripPatterns.test(userText) && stayPatterns.test(userText)) {
      const lastDayTrip = userText.search(/日帰り|日帰|その日のうち/);
      const lastStay = userText.search(/泊|宿泊/);
      // search は最初の一致を返すので、最後のマッチを取るために lastIndexOf 系で再計算
      const dayMatches = [...userText.matchAll(/日帰り|日帰|その日のうち|一日だけ|1日だけ|当日中/g)];
      const stayMatches = [...userText.matchAll(/(\d)\s*泊|一泊|二泊|三泊|泊まり|宿泊|温泉旅館に泊|宿に泊/g)];
      const lastDayIdx = dayMatches.length > 0 ? dayMatches[dayMatches.length - 1].index : -1;
      const lastStayIdx = stayMatches.length > 0 ? stayMatches[stayMatches.length - 1].index : -1;
      intent.isDayTrip = lastDayIdx > lastStayIdx;
    }

    // 行先未定検出
    const noDestPatterns = /おまかせ|お任せ|決めてない|決まってない|どこでもいい|未定|未決|まだ決め|決められない|おすすめは|どこがいい|どこがおすすめ/;
    if (noDestPatterns.test(userText)) intent.hasDestination = 'no';

    return intent;
  };

  // チャットの answers を、既存の answers ステートに反映
  const applyChatAnswers = (chatAnswers) => {
    const merged = { ...emptyAnswers(), ...chatAnswers };

    // 🛡 多層防御: ユーザー発言から直接検出した意図でAIのJSONを上書き
    const userIntent = detectUserIntent();
    if (userIntent.isDayTrip !== undefined) merged.isDayTrip = userIntent.isDayTrip;
    if (userIntent.hasDestination !== undefined) merged.hasDestination = userIntent.hasDestination;

    // 日付文字列を Date オブジェクトに復元(Invalid Date は null に)
    const parseDate = (v) => {
      if (!v || typeof v !== 'string') return null;
      const d = new Date(v);
      return isNaN(d.getTime()) ? null : d;
    };
    if (typeof merged.startDate === 'string') merged.startDate = parseDate(merged.startDate);
    if (typeof merged.endDate === 'string') merged.endDate = parseDate(merged.endDate);
    // 日帰り判定の補正(isDayTrip を最優先)
    if (merged.isDayTrip === true && merged.startDate) {
      // 明示的に日帰り → endDate は startDate と同じに強制
      merged.endDate = merged.startDate;
    } else if (merged.startDate && !merged.endDate && merged.isDayTrip !== false) {
      // endDateが無くてisDayTripも未指定 → 日帰り扱い
      merged.endDate = merged.startDate;
      merged.isDayTrip = true;
    }
    // 配列フィールドの保証
    if (!Array.isArray(merged.interests)) merged.interests = [];
    // 行き先有無の補正(明示的にnoが来ていれば尊重)
    if (merged.hasDestination !== 'yes' && merged.hasDestination !== 'no') {
      // AIが指定しなかった場合のみ destination の有無で推測
      if (merged.destination) merged.hasDestination = 'yes';
      else merged.hasDestination = 'no';
    }
    // hasDestination が "no" なら destination は空に強制(推測されたゴミを除去)
    if (merged.hasDestination === 'no') {
      merged.destination = '';
    }
    setAnswers(merged);
    return merged;
  };

  // チャットからプラン生成へ遷移
  const generateFromChat = (chatAnswers) => {
    applyChatAnswers(chatAnswers);
    setView('home');
    // setAnswers は非同期だが、generatePlans は内部で buildSummary を呼び、それは answers を参照するので
    // 次のレンダリングサイクルで実行する
    setTimeout(() => { generatePlans(); }, 50);
  };

  // チャットをリセット
  const resetChat = () => {
    if (chatMessages.length > 0 && !window.confirm(t('chat_reset_confirm'))) return;
    setChatMessages([]);
    setChatInput('');
    setChatError('');
  };

  // チャット画面オープン時、初回メッセージを表示
  useEffect(() => {
    if (view === 'chat' && chatMessages.length === 0) {
      setChatMessages([{ role: 'assistant', content: t('chat_welcome') }]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [view]);

  // チャット画面の自動スクロール
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollTop = chatScrollRef.current.scrollHeight;
    }
  }, [chatMessages, chatLoading]);

  const searchUrl = (name) => `https://www.google.com/search?q=${encodeURIComponent(name)}`;
  const getPhotoUrl = (kw) => {
    if (!kw) return null;
    const tags = kw.replace(/[^\w\s,]/g, '').trim().split(/\s+/).join(',');
    return `https://loremflickr.com/800/400/${encodeURIComponent(tags)}`;
  };

  const planLabels = {
    A: { label: t('pa_label'), theme: t('pa_theme'), icon: Star, color: '#C77B8C', bg: '#FAE5EA' },
    B: { label: t('pb_label'), theme: t('pb_theme'), icon: Gem, color: '#9890C0', bg: '#E8E5F0' },
    C: { label: t('pc_label'), theme: t('pc_theme'), icon: Crown, color: '#B8843E', bg: '#F2E8D8' },
  };

  const planToText = (pd, pl) => {
    if (!pd) return '';
    const c = pd.content.replace(/\[\[([^\]]+)\]\]/g, '$1').replace(/\*\*([^*]+)\*\*/g, '$1').replace(/^#+\s/gm, '');
    return `【${pl}】${pd.title}\n${pd.summary}\n\n${c}\n\n---\nODEKAKE`;
  };

  // 共有機能(Web Share API + クリップボードフォールバック)
  const sharePlan = async (pd, pl, key) => {
    const text = planToText(pd, pl);
    const title = lang === 'ja' ? `${t('share_title')}: ${pd.title}` : `${t('share_title')}: ${pd.title}`;
    
    // Web Share APIが使える場合(主にスマホ)
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: text,
        });
        setCopiedKey(key);
        setTimeout(() => setCopiedKey(''), 2000);
        return;
      } catch (err) {
        // ユーザーがキャンセルした場合は何もしない
        if (err.name === 'AbortError') return;
        console.error('Share failed, falling back to clipboard:', err);
      }
    }
    
    // フォールバック: クリップボードにコピー
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey(''), 2000);
    } catch (err) {
      console.error('Clipboard copy failed:', err);
      // 最終フォールバック: メールアプリ起動
      const subj = lang === 'ja' ? `【おでかけプラン】${pd.title}` : `[ODEKAKE Plan] ${pd.title}`;
      window.location.href = `mailto:?subject=${encodeURIComponent(subj)}&body=${encodeURIComponent(text)}`;
    }
  };

  const toggleFav = (key) => {
    if (!plans || !plans[key]) return;
    const pd = plans[key];
    const meta = planLabels[key];
    const id = `${pd.title}-${pd.summary}`;
    const exists = favorites.some(f => f.id === id);
    if (exists) setFavorites(favorites.filter(f => f.id !== id));
    else setFavorites([{ id, planKey: key, planLabel: meta.label, title: pd.title, summary: pd.summary, content: pd.content, imageKeyword: pd.imageKeyword, warnings: pd.warnings || [], savedAt: new Date().toISOString() }, ...favorites]);
  };

  const isFav = (key) => {
    if (!plans || !plans[key]) return false;
    const pd = plans[key];
    return favorites.some(f => f.id === `${pd.title}-${pd.summary}`);
  };

  const removeFav = (id) => setFavorites(favorites.filter(f => f.id !== id));

  // ===== ODEKAKEアルバム関連 =====
  // 写真ファイルを Base64 化(リサイズ込み・容量節約)
  const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // 最大幅800pxに圧縮
        const maxW = 800;
        const ratio = Math.min(1, maxW / img.width);
        const w = Math.round(img.width * ratio);
        const h = Math.round(img.height * ratio);
        const canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);
        resolve(canvas.toDataURL('image/jpeg', 0.82));
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  // 「この旅、行ってきた」ボタンから入力フォームを開く
  const openAlbumForm = (favId, existing = null) => {
    if (existing) {
      setAlbumEditingId(existing.id);
      setAlbumDraft({ favId: existing.favId, review: existing.review, rating: existing.rating, photos: existing.photos || [] });
    } else {
      setAlbumEditingId(null);
      setAlbumDraft({ favId, review: '', rating: 5, photos: [] });
    }
  };

  const closeAlbumForm = () => {
    setAlbumEditingId(null);
    setAlbumDraft({ favId: null, review: '', rating: 5, photos: [] });
  };

  // 写真を追加
  const handlePhotoAdd = async (e) => {
    const files = Array.from(e.target.files || []);
    const remaining = 3 - albumDraft.photos.length;
    const targets = files.slice(0, remaining);
    try {
      const newPhotos = await Promise.all(targets.map(f => fileToBase64(f)));
      setAlbumDraft({ ...albumDraft, photos: [...albumDraft.photos, ...newPhotos] });
    } catch (err) { console.error('Photo conversion failed:', err); }
    e.target.value = ''; // 同じファイルを再選択できるようリセット
  };

  // アルバムを保存(新規 or 編集)
  const saveAlbum = () => {
    if (!albumDraft.review.trim()) return; // 感想は必須
    if (albumEditingId) {
      // 編集
      setAlbums(albums.map(a => a.id === albumEditingId
        ? { ...a, review: albumDraft.review.trim(), rating: albumDraft.rating, photos: albumDraft.photos, updatedAt: new Date().toISOString() }
        : a));
    } else {
      // 新規
      const fav = favorites.find(f => f.id === albumDraft.favId);
      if (!fav) return;
      const newAlbum = {
        id: `album-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        favId: fav.id,
        title: fav.title,
        summary: fav.summary,
        planLabel: fav.planLabel,
        planKey: fav.planKey,
        review: albumDraft.review.trim(),
        rating: albumDraft.rating,
        photos: albumDraft.photos,
        visitedAt: new Date().toISOString(),
      };
      setAlbums([newAlbum, ...albums]);
    }
    closeAlbumForm();
  };

  // アルバム削除
  const deleteAlbum = (id) => {
    if (window.confirm(t('album_delete_confirm'))) {
      setAlbums(albums.filter(a => a.id !== id));
    }
  };

  // 保存プランに対するアルバムが既にあるか
  const albumForFav = (favId) => albums.find(a => a.favId === favId);

  const reset = () => {
    setStep(0);
    setAnswers({ hasDestination: '', destination: '', destinationNote: '', startDate: null, endDate: null, isDayTrip: false, whenNote: '', companions: '', companionsNote: '', departure: '', departureNote: '', transport: '', transportNote: '', budget: '', budgetNote: '', interests: [], interestsNote: '', likes: '', likesNote: '', freeText: '' });
    setPlans(null); setOpenPlan('A'); setError(''); setShowPrefList(false);
    setExtras(null); setOpenExtraSection(null);
    setInstaPlans(null); setShowInsta(false); setInstaLoading(false);
    setTripWeather(null);
  };

  const renderInline = (text, baseKey) => {
    let p = text.replace(/\*\*(\[\[[^\]]+\]\][^*]*)\*\*/g, '$1');
    const tokens = p.split(/(\[\[[^\]]+\]\]|\*\*[^*]+\*\*)/g);
    return tokens.map((tk, j) => {
      if (tk.startsWith('[[') && tk.endsWith(']]')) {
        const name = tk.slice(2, -2);
        return (
          <a key={`${baseKey}-${j}`} href={searchUrl(name)} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 px-1.5 py-0.5 mx-0.5 rounded-md bg-pink-100 text-pink-700 font-bold hover:bg-pink-200 active:bg-pink-300 transition-colors">
            {name}<ExternalLink className="w-3 h-3 inline flex-shrink-0" />
          </a>
        );
      }
      if (tk.startsWith('**') && tk.endsWith('**')) return <strong key={`${baseKey}-${j}`} className="font-bold text-stone-900">{tk.slice(2, -2)}</strong>;
      return <span key={`${baseKey}-${j}`}>{tk}</span>;
    });
  };

  const renderPlan = (text) => text.split('\n').map((line, i) => {
    if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold mt-5 mb-2 text-stone-800">{renderInline(line.replace('## ', ''), `h2-${i}`)}</h2>;
    if (line.startsWith('### ')) return <h3 key={i} className="text-lg font-semibold mt-3 mb-2 text-stone-700">{renderInline(line.replace('### ', ''), `h3-${i}`)}</h3>;
    if (line.startsWith('# ')) return <h1 key={i} className="text-2xl font-bold mt-5 mb-3 text-stone-900">{renderInline(line.replace('# ', ''), `h1-${i}`)}</h1>;
    if (line.startsWith('- ') || line.startsWith('* ')) return <li key={i} className="ml-6 mb-1 text-stone-700 list-disc">{renderInline(line.replace(/^[-*] /, ''), `li-${i}`)}</li>;
    if (/^\d+\. /.test(line)) return <li key={i} className="ml-6 mb-1 text-stone-700 list-decimal">{renderInline(line.replace(/^\d+\. /, ''), `oli-${i}`)}</li>;
    if (line.trim() === '') return <div key={i} className="h-2"></div>;
    return <p key={i} className="text-stone-700 leading-relaxed mb-2">{renderInline(line, `p-${i}`)}</p>;
  });

  const progress = (step / (questions.length + 1)) * 100;
  const noteKey = currentQuestion ? currentQuestion.key + 'Note' : '';
  const dateDisplay = answers.startDate ? (
    answers.isDayTrip || !answers.endDate || answers.startDate.getTime() === answers.endDate.getTime()
      ? `${formatDateFull(answers.startDate)} ${calcNights()}`
      : `${formatDateFull(answers.startDate)} 〜 ${formatDateFull(answers.endDate)}（${calcNights()}）`
  ) : t('sum_undef');

  const prefList = lang === 'en' ? PREFECTURES_EN : PREFECTURES;

  return (
    <div className="min-h-screen p-4 sm:p-6" style={{
      backgroundImage: `url("${BG_IMAGE}")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center top',
      backgroundAttachment: 'fixed',
      backgroundColor: '#F4C8C8',
      fontFamily: '"Hiragino Sans", "Yu Gothic", "Noto Sans JP", sans-serif',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@500;700&family=Kaisei+Decol:wght@500;700&display=swap');
      `}</style>
      <div className="max-w-2xl mx-auto">

        {/* 言語切り替え（右上） */}
        <div className="flex justify-end pt-2 relative">
          <button onClick={() => setShowLangMenu(!showLangMenu)}
            className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border transition-all"
            style={{ backgroundColor: 'rgba(255,255,255,0.85)', color: '#5C3A4A', borderColor: 'rgba(255,255,255,0.9)' }}>
            <Globe className="w-3 h-3" />
            <span style={{ fontSize: '0.85rem' }}>{LANGUAGES[lang].flag}</span>
            <ChevronDown className={`w-2.5 h-2.5 transition-transform ${showLangMenu ? 'rotate-180' : ''}`} />
          </button>
          {showLangMenu && (
            <div className="absolute top-full right-0 mt-1 rounded-xl overflow-hidden border shadow-lg z-50" style={{ backgroundColor: 'white', borderColor: '#EAD5DA', minWidth: '140px' }}>
              {Object.values(LANGUAGES).map(l => (
                <button key={l.code} onClick={() => { setLang(l.code); setShowLangMenu(false); }}
                  className="w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-pink-50 transition-colors text-left"
                  style={{ color: lang === l.code ? '#C77B8C' : '#5C3A4A', fontWeight: lang === l.code ? 'bold' : 'normal', backgroundColor: lang === l.code ? '#FAE5EA' : 'white' }}>
                  <span>{l.flag}</span><span>{l.name}</span>
                  {lang === l.code && <Check className="w-3.5 h-3.5 ml-auto" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ヘッダー */}
        <div className="text-center mb-6 pt-2">
          <div className="inline-flex items-center gap-2 mb-2 whitespace-nowrap">
            <Sparkles className="w-4 h-4 flex-shrink-0" style={{ color: '#C77B8C' }} />
            <h1 className="font-bold tracking-widest" style={{ 
              color: '#3D2530',
              fontFamily: '"Cormorant Garamond", "Times New Roman", serif',
              fontSize: 'clamp(2.2rem, 9vw, 3.2rem)',
              fontWeight: 600,
              letterSpacing: '0.18em',
              textShadow: '0 2px 4px rgba(255,255,255,0.6)',
            }}>ODEKAKE</h1>
            <Sparkles className="w-4 h-4 flex-shrink-0" style={{ color: '#C77B8C' }} />
          </div>
          <p className="text-sm font-bold" style={{ color: '#3D2530', textShadow: '0 1px 2px rgba(255,255,255,0.6)' }}>
            {t('subtitle')}
          </p>
        </div>

        {/* タブ(チャット画面では非表示) */}
        {view !== 'chat' && (
          <div className="flex gap-2 mb-4">
            <button onClick={() => setView('home')}
              className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all"
              style={view === 'home' ? { backgroundColor: '#C77B8C', color: 'white', borderColor: '#C77B8C' } : { backgroundColor: 'rgba(255,255,255,0.6)', color: '#5C3A4A', borderColor: 'rgba(255,255,255,0.8)' }}>
              <Sparkles className="w-4 h-4" />{t('tabPlan')}
            </button>
            <button onClick={() => setView('mypage')}
              className="flex-1 flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all"
              style={view === 'mypage' ? { backgroundColor: '#C77B8C', color: 'white', borderColor: '#C77B8C' } : { backgroundColor: 'rgba(255,255,255,0.6)', color: '#5C3A4A', borderColor: 'rgba(255,255,255,0.8)' }}>
              <Bookmark className="w-4 h-4" />{t('tabMypage')}
              {favorites.length > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-xs font-bold" style={view === 'mypage' ? { backgroundColor: 'white', color: '#C77B8C' } : { backgroundColor: '#C77B8C', color: 'white' }}>{favorites.length}</span>
              )}
            </button>
          </div>
        )}

        {view === 'home' && !plans && !loading && (
          <div className="mb-5">
            {/* 達成感あるメッセージ */}
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-bold flex items-center gap-1.5" style={{ color: '#3D2530', textShadow: '0 1px 2px rgba(255,255,255,0.6)' }}>
                {Math.round(progress) === 0 ? (
                  <span key="start" className="flex items-center gap-1.5">
                    <Compass className="w-4 h-4" style={{ color: '#C77B8C' }} strokeWidth={2.2} />
                    {t('progress_start')}
                  </span>
                ) : Math.round(progress) >= 80 ? (
                  <span key="complete" className="flex items-center gap-1.5">
                    <Star className="w-4 h-4 fill-current" style={{ color: '#C77B8C' }} strokeWidth={2} />
                    {t('progress_complete')}
                  </span>
                ) : Math.round(progress) >= 50 ? (
                  <span key="almost" className="flex items-center gap-1.5">
                    <Smile className="w-4 h-4" style={{ color: '#C77B8C' }} strokeWidth={2.2} />
                    {t('progress_almost')}
                  </span>
                ) : (
                  <span key="middle" className="flex items-center gap-1.5">
                    <Heart className="w-4 h-4" style={{ color: '#C77B8C' }} strokeWidth={2.2} />
                    {t('progress_label')} {Math.round(progress)}{t('progress_suffix')}
                  </span>
                )}
              </p>
              <p className="text-sm font-bold" style={{ color: '#C77B8C' }}>
                {Math.round(progress)}%
              </p>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(255, 255, 255, 0.6)' }}>
              <div className="h-full transition-all duration-700 ease-out rounded-full" style={{ 
                width: `${progress}%`, 
                background: 'linear-gradient(90deg, #FAD0D8 0%, #C77B8C 100%)',
                boxShadow: '0 0 8px rgba(199, 123, 140, 0.4)',
              }} />
            </div>
            <p className="text-xs mt-1.5 text-right font-medium" style={{ color: '#8B6878' }}>{step + 1} / {questions.length + 1}</p>
          </div>
        )}

        {view === 'home' && (
          <div className="rounded-3xl p-6 sm:p-8" style={{
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.8)',
            boxShadow: '0 8px 32px rgba(199, 123, 140, 0.15)',
          }}>
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

                {currentQuestion.key === 'hasDestination' && answers.hasDestination === 'yes' && (
                  <div className="space-y-2 rounded-xl p-4 border-2" style={{ backgroundColor: 'rgba(250, 208, 216, 0.3)', borderColor: '#F4C8D2' }}>
                    <label className="text-sm font-medium" style={{ color: '#5C3A4A' }}>{t('q_dest_label')}</label>
                    <input type="text" value={answers.destination} onChange={(e) => setAnswers({ ...answers, destination: e.target.value })}
                      placeholder={t('q_dest_ph')}
                      className="w-full px-4 py-3 rounded-xl border-2 focus:outline-none bg-white"
                      style={{ borderColor: '#F4C8D2', color: '#5C3A4A' }} />
                  </div>
                )}

                {currentQuestion.type === 'dateRange' && (
                  <>
                    <div className="rounded-xl p-3 flex gap-2 border-2" style={{ backgroundColor: 'rgba(184, 136, 173, 0.1)', borderColor: '#E0CCE0' }}>
                      <Info className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#A07AAD' }} />
                      <p className="text-xs leading-relaxed" style={{ color: '#5C3A4A' }}>
                        {t('q_when_info')}<strong>{t('q_when_info_em')}</strong>{t('q_when_info_end')}
                      </p>
                    </div>
                    <button onClick={toggleDayTrip}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium border transition-all"
                      style={answers.isDayTrip ? { backgroundColor: '#C77B8C', color: 'white', borderColor: '#C77B8C' } : { backgroundColor: 'white', color: '#5C3A4A', borderColor: '#EAD5DA' }}>
                      <Sun className="w-4 h-4" />{t('q_when_dayTrip')}
                      {answers.isDayTrip && <span className="text-xs">{t('q_when_dayTrip_off')}</span>}
                    </button>
                    <div className="bg-white rounded-2xl border-2 p-4" style={{ borderColor: '#F4C8D2' }}>
                      <div className="flex items-center justify-between mb-3">
                        <button onClick={() => changeMonth(-1)} className="p-2 rounded-lg hover:bg-pink-50" style={{ color: '#5C3A4A' }}><ChevronLeft className="w-4 h-4" /></button>
                        <p className="font-bold" style={{ color: '#5C3A4A' }}>
                          {lang === 'ja' ? `${calendarMonth.getFullYear()}年 ${calendarMonth.getMonth() + 1}月` : calendarMonth.toLocaleString('en-US', { month: 'long', year: 'numeric' })}
                        </p>
                        <button onClick={() => changeMonth(1)} className="p-2 rounded-lg hover:bg-pink-50" style={{ color: '#5C3A4A' }}><ChevronRight className="w-4 h-4" /></button>
                      </div>
                      <div className="grid grid-cols-7 gap-1 mb-2">
                        {(lang === 'ja' ? ['日','月','火','水','木','金','土'] : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']).map((d, i) => (
                          <div key={d} className="text-center text-xs font-bold py-1" style={{ color: i === 0 ? '#D88595' : i === 6 ? '#9890C0' : '#8B6878' }}>{d}</div>
                        ))}
                      </div>
                      <div className="grid grid-cols-7 gap-1">
                        {getDaysInMonth(calendarMonth).map((date, i) => {
                          if (!date) return <div key={i}></div>;
                          const isPast = date < today;
                          const status = getDateStatus(date);
                          const isToday = date.getTime() === today.getTime();
                          const dow = date.getDay();
                          let style = {};
                          let cls = 'aspect-square text-sm font-medium transition-all rounded-lg ';
                          if (status === 'single') { style = { backgroundColor: '#C77B8C', color: 'white' }; cls += 'font-bold'; }
                          else if (status === 'start') { style = { backgroundColor: '#C77B8C', color: 'white' }; cls += 'font-bold rounded-r-none'; }
                          else if (status === 'end') { style = { backgroundColor: '#C77B8C', color: 'white' }; cls += 'font-bold rounded-l-none'; }
                          else if (status === 'between') { style = { backgroundColor: '#F5E0E5', color: '#A85A75' }; cls += 'rounded-none'; }
                          else if (isPast) { style = { color: '#D8C8D0', cursor: 'not-allowed' }; }
                          else if (isToday) { style = { backgroundColor: 'rgba(250, 208, 216, 0.4)', color: '#A85A75', border: '1px solid #E08FA0' }; }
                          else if (dow === 0) { style = { color: '#D88595' }; cls += 'hover:bg-pink-50'; }
                          else if (dow === 6) { style = { color: '#9890C0' }; cls += 'hover:bg-purple-50'; }
                          else { style = { color: '#5C3A4A' }; cls += 'hover:bg-pink-50'; }
                          return <button key={i} onClick={() => handleDateClick(date)} disabled={isPast} className={cls} style={style}>{date.getDate()}</button>;
                        })}
                      </div>
                      {answers.startDate && (
                        <div className="mt-3 pt-3 border-t flex items-center justify-between" style={{ borderColor: '#F4D8DD' }}>
                          <div className="text-sm" style={{ color: '#5C3A4A' }}>
                            {answers.isDayTrip || !answers.endDate || (answers.endDate && answers.startDate.getTime() === answers.endDate.getTime()) ? (
                              <p><span className="font-bold" style={{ color: '#A85A75' }}>{formatDate(answers.startDate)}</span><span className="ml-2 text-xs" style={{ color: '#8B6878' }}>{calcNights()}</span></p>
                            ) : answers.endDate ? (
                              <p><span className="font-bold" style={{ color: '#A85A75' }}>{formatDate(answers.startDate)}</span><span className="mx-2" style={{ color: '#C77B8C' }}>→</span><span className="font-bold" style={{ color: '#A85A75' }}>{formatDate(answers.endDate)}</span><span className="ml-2 text-xs" style={{ color: '#8B6878' }}>{calcNights()}</span></p>
                            ) : (
                              <p><span className="font-bold" style={{ color: '#A85A75' }}>{formatDate(answers.startDate)}</span><span className="text-xs ml-2" style={{ color: '#8B6878' }}>{t('q_when_choose_end')}</span></p>
                            )}
                          </div>
                          <button onClick={clearDates} className="text-xs hover:underline" style={{ color: '#8B6878' }}>{t('q_when_clear')}</button>
                        </div>
                      )}
                      {!answers.startDate && (
                        <p className="mt-3 pt-3 border-t text-xs text-center" style={{ borderColor: '#F4D8DD', color: '#8B6878' }}>
                          {answers.isDayTrip ? t('q_when_choose_date') : t('q_when_choose_dates')}
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
                        <MapPin className="w-4 h-4" />{t('q_dep_btn')}
                      </button>
                    )}
                    {(showPrefList || answers.departure) && (
                      <div className="bg-white rounded-2xl border-2 p-3" style={{ borderColor: '#F4C8D2' }}>
                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-1.5">
                          {prefList.map((pref, idx) => {
                            const jaPref = PREFECTURES[idx];
                            const isSel = answers.departure === jaPref;
                            return (
                              <button key={pref} onClick={() => setAnswers({ ...answers, departure: jaPref })}
                                className="px-1 py-2 rounded-lg text-xs font-medium transition-all border"
                                style={isSel ? { backgroundColor: '#C77B8C', color: 'white', borderColor: '#C77B8C' } : { backgroundColor: 'white', color: '#5C3A4A', borderColor: '#EAD5DA' }}>
                                {pref}
                              </button>
                            );
                          })}
                        </div>
                        {answers.departure && (
                          <div className="mt-3 pt-3 border-t flex items-center justify-between" style={{ borderColor: '#F4D8DD' }}>
                            <p className="text-sm" style={{ color: '#5C3A4A' }}>{t('q_dep_selected')} <span className="font-bold" style={{ color: '#A85A75' }}>{lang === 'en' ? PREFECTURES_EN[PREFECTURES.indexOf(answers.departure)] : answers.departure}</span></p>
                            <button onClick={() => { setAnswers({ ...answers, departure: '' }); setShowPrefList(true); }} className="text-xs hover:underline" style={{ color: '#8B6878' }}>{t('q_dep_change')}</button>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}

                {(currentQuestion.type === 'single' || currentQuestion.type === 'multi') && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {currentQuestion.opts.map((opt) => {
                      const isSel = currentQuestion.type === 'multi' ? answers[currentQuestion.key].includes(opt.val) : answers[currentQuestion.key] === opt.val;
                      return (
                        <button key={opt.val} onClick={() => handleSelect(opt.val)}
                          className="px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 border"
                          style={isSel ? { backgroundColor: '#C77B8C', color: 'white', borderColor: '#C77B8C' } : { backgroundColor: 'white', color: '#5C3A4A', borderColor: '#EAD5DA' }}>
                          {t(opt.t)}
                        </button>
                      );
                    })}
                  </div>
                )}

                {currentQuestion.key !== 'hasDestination' && (
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-medium" style={{ color: '#8B6878' }}>
                      <Pencil className="w-3.5 h-3.5" />{t('note_label')}
                    </label>
                    <textarea value={answers[noteKey] || ''} onChange={(e) => setAnswers({ ...answers, [noteKey]: e.target.value })}
                      placeholder={currentQuestion.notePh}
                      className="w-full h-20 px-3 py-2 rounded-xl border-2 focus:outline-none resize-none text-sm bg-white"
                      style={{ borderColor: '#F4D8DD', color: '#5C3A4A' }} />
                  </div>
                )}

                <div className="flex justify-between items-center pt-2">
                  <button onClick={handleBack} disabled={step === 0} className="flex items-center gap-1 text-sm font-medium hover:underline disabled:opacity-30 disabled:cursor-not-allowed" style={{ color: '#5C3A4A' }}>
                    <ChevronLeft className="w-4 h-4" />{t('backBtn')}
                  </button>
                  <div className="flex flex-col items-end gap-1">
                    {!isCurrentAnswered() && <p className="text-xs font-medium" style={{ color: '#5C3A4A' }}>{t('pleaseSelect')}</p>}
                    <button onClick={handleNext} disabled={!isCurrentAnswered()}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
                      style={!isCurrentAnswered() ? { backgroundColor: '#C9BAC2', color: 'white', cursor: 'not-allowed' } : { background: 'linear-gradient(135deg, #5C3A4A, #7A5A6A)', color: 'white', boxShadow: '0 4px 12px rgba(92, 58, 74, 0.25)' }}>
                      {t('nextBtn')}<ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* 質問1の下にAI誘導カード(画像通り) */}
                {step === 0 && (
                  <div className="mt-6 pt-5 border-t" style={{ borderTop: '1px dashed #EAD5DA' }}>
                    <div className="flex items-center gap-3 p-3 rounded-2xl" style={{ background: 'linear-gradient(135deg, rgba(252, 240, 245, 0.7) 0%, rgba(248, 232, 240, 0.7) 100%)', border: '1px solid #F4D8DD' }}>
                      {/* AIキャラ(ロボット風SVG) */}
                      <button onClick={() => setView('chat')} className="flex-shrink-0 transition-transform hover:scale-105" aria-label={t('chat_btn')}>
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                          {/* 背景の柔らかい円 */}
                          <circle cx="24" cy="24" r="23" fill="white" stroke="#E8C5DD" strokeWidth="1" />
                          {/* アンテナ */}
                          <line x1="24" y1="10" x2="24" y2="14" stroke="#A85A75" strokeWidth="1.2" strokeLinecap="round" />
                          <circle cx="24" cy="9" r="1.5" fill="#A85A75" />
                          {/* 顔の輪郭(やわらかい角丸の長方形) */}
                          <rect x="13" y="15" width="22" height="20" rx="6" fill="#FAE4EC" stroke="#C77B8C" strokeWidth="1.2" />
                          {/* ほっぺ */}
                          <circle cx="16.5" cy="26" r="1.8" fill="#F4B8C8" opacity="0.7" />
                          <circle cx="31.5" cy="26" r="1.8" fill="#F4B8C8" opacity="0.7" />
                          {/* 目(キラキラ) */}
                          <circle cx="19" cy="23" r="1.8" fill="#3D2530" />
                          <circle cx="29" cy="23" r="1.8" fill="#3D2530" />
                          <circle cx="19.6" cy="22.4" r="0.6" fill="white" />
                          <circle cx="29.6" cy="22.4" r="0.6" fill="white" />
                          {/* 口(にっこり) */}
                          <path d="M 21 29 Q 24 31 27 29" stroke="#A85A75" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                          {/* 装飾の星 */}
                          <path d="M 38 12 L 39 14 L 41 14 L 39.5 15.5 L 40 17.5 L 38 16.5 L 36 17.5 L 36.5 15.5 L 35 14 L 37 14 Z" fill="#E8C5DD" />
                          <path d="M 9 18 L 9.6 19.2 L 10.8 19.2 L 9.9 20.1 L 10.2 21.3 L 9 20.7 L 7.8 21.3 L 8.1 20.1 L 7.2 19.2 L 8.4 19.2 Z" fill="#E8C5DD" opacity="0.7" />
                        </svg>
                      </button>
                      {/* テキスト + ボタン */}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs leading-relaxed mb-2" style={{ color: '#5C3A4A' }}>
                          {t('ai_invite_text')}
                        </p>
                        <button onClick={() => setView('chat')}
                          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all hover:opacity-90"
                          style={{ backgroundColor: 'white', color: '#A85A75', border: '1px solid #E8C5DD', boxShadow: '0 2px 8px rgba(199, 123, 140, 0.15)' }}>
                          <MessageCircle className="w-3.5 h-3.5" strokeWidth={1.8} />
                          {t('chat_btn')}
                          <ChevronRight className="w-3.5 h-3.5 ml-auto" strokeWidth={1.8} />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {isLastQuestion && !plans && !loading && (
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md" style={{ background: 'linear-gradient(135deg, #FAD0D8 0%, #E8C5DD 100%)' }}>
                    <Sparkles className="w-6 h-6" style={{ color: '#A85A75' }} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-1" style={{ color: '#5C3A4A' }}>{t('q_ex_title')}</h2>
                    <p className="text-sm" style={{ color: '#8B6878' }}>{t('q_ex_sub')}</p>
                  </div>
                </div>
                <textarea value={answers.freeText} onChange={(e) => setAnswers({ ...answers, freeText: e.target.value })}
                  placeholder={t('q_ex_ph')}
                  className="w-full h-32 px-4 py-3 rounded-xl border-2 focus:outline-none resize-none bg-white"
                  style={{ borderColor: '#F4D8DD', color: '#5C3A4A' }} />
                <div className="rounded-xl p-4 text-xs space-y-1.5 border-2" style={{ backgroundColor: 'rgba(250, 208, 216, 0.2)', borderColor: '#F4E0E5', color: '#8B6878' }}>
                  <p className="font-bold pb-1.5 mb-1 border-b" style={{ color: '#5C3A4A', borderColor: '#F4D8DD' }}>{t('sum_title')}</p>
                  <p><span className="font-semibold" style={{ color: '#5C3A4A' }}>{t('sum_dest')}</span> {answers.hasDestination === 'yes' ? (answers.destination || t('sum_unwritten')) : t('sum_omakase')}</p>
                  <p><span className="font-semibold" style={{ color: '#5C3A4A' }}>{t('sum_when')}</span> {dateDisplay}{answers.whenNote && ` (${answers.whenNote})`}</p>
                  <p><span className="font-semibold" style={{ color: '#5C3A4A' }}>{t('sum_comp')}</span> {getOptLabel(COMP_OPTS, answers.companions) || t('sum_undef')}{answers.companionsNote && ` (${answers.companionsNote})`}</p>
                  <p><span className="font-semibold" style={{ color: '#5C3A4A' }}>{t('sum_dep')}</span> {answers.departure ? (lang === 'en' ? PREFECTURES_EN[PREFECTURES.indexOf(answers.departure)] : answers.departure) : t('sum_undef')}{answers.departureNote && ` (${answers.departureNote})`}</p>
                  <p><span className="font-semibold" style={{ color: '#5C3A4A' }}>{t('sum_tr')}</span> {getOptLabel(TR_OPTS, answers.transport) || t('sum_undef')}{answers.transportNote && ` (${answers.transportNote})`}</p>
                  <p><span className="font-semibold" style={{ color: '#5C3A4A' }}>{t('sum_bg')}</span> {getOptLabel(BG_OPTS, answers.budget) || t('sum_undef')}{answers.budgetNote && ` (${answers.budgetNote})`}</p>
                  <p><span className="font-semibold" style={{ color: '#5C3A4A' }}>{t('sum_int')}</span> {answers.interests.map(v => getOptLabel(INT_OPTS, v)).join(', ') || t('sum_undef')}{answers.interestsNote && ` (${answers.interestsNote})`}</p>
                  <p><span className="font-semibold" style={{ color: '#5C3A4A' }}>{t('sum_lk')}</span> {getOptLabel(LK_OPTS, answers.likes) || t('sum_undef')}{answers.likesNote && ` (${answers.likesNote})`}</p>
                </div>
                <div className="flex justify-between items-center">
                  <button onClick={handleBack} className="flex items-center gap-1 text-sm font-medium hover:underline" style={{ color: '#5C3A4A' }}>
                    <ChevronLeft className="w-4 h-4" />{t('backBtn')}
                  </button>
                  <button onClick={generatePlans}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90"
                    style={{ backgroundColor: '#C77B8C', color: 'white' }}>
                    <Sparkles className="w-4 h-4" />{t('btn_create')}
                  </button>
                </div>
              </div>
            )}

            {loading && (
              <div className="py-10">
                <style>{`
                  @keyframes odekakeFadeIn {
                    from { opacity: 0; transform: translateY(4px); }
                    to { opacity: 1; transform: translateY(0); }
                  }
                `}</style>
                <div className="text-center mb-6">
                  <div className="inline-block animate-spin mb-3"><Sparkles className="w-10 h-10" style={{ color: '#C77B8C' }} /></div>
                  <p key={loadingMsgIdx}
                    style={{ color: '#5C3A4A', minHeight: '1.5em', fontWeight: 700, animation: 'odekakeFadeIn 0.6s ease-out' }}>
                    {T[lang].load_messages[loadingMsgIdx]}
                  </p>
                  <p className="text-xs mt-1" style={{ color: '#8B6878' }}>{t('load_sub')}</p>
                  {/* 擬似進捗バー */}
                  <div className="max-w-xs mx-auto mt-4">
                    <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(244, 216, 221, 0.6)' }}>
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${loadingProgress}%`,
                          background: 'linear-gradient(90deg, #E8C5DD 0%, #C77B8C 50%, #A85A75 100%)',
                          boxShadow: '0 0 8px rgba(199, 123, 140, 0.4)',
                          transition: loading ? 'width 0.4s ease-out' : 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                      />
                    </div>
                    <p className="text-[10px] mt-1.5" style={{ color: '#A89098', fontVariantNumeric: 'tabular-nums' }}>
                      {Math.floor(loadingProgress)}%
                    </p>
                  </div>
                </div>
                <div className="space-y-2.5 max-w-md mx-auto">
                  {['A', 'B', 'C'].map((key, idx) => {
                    const meta = planLabels[key];
                    return (
                      <div key={key} className="flex items-center gap-3 p-3 rounded-xl" style={{ backgroundColor: meta.bg }}>
                        <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 relative" style={{ backgroundColor: meta.color }}>
                          {React.createElement(meta.icon, { className: "w-4 h-4 text-white" })}
                          <div className="absolute inset-0 rounded-full animate-ping" style={{ backgroundColor: meta.color, opacity: 0.4, animationDelay: `${idx * 0.3}s` }}></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold" style={{ color: meta.color }}>{meta.label}・{meta.theme}</p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <div className="flex gap-1">
                              <span className="inline-block w-1 h-1 rounded-full animate-bounce" style={{ backgroundColor: meta.color, animationDelay: `${idx * 0.2}s` }}></span>
                              <span className="inline-block w-1 h-1 rounded-full animate-bounce" style={{ backgroundColor: meta.color, animationDelay: `${idx * 0.2 + 0.1}s` }}></span>
                              <span className="inline-block w-1 h-1 rounded-full animate-bounce" style={{ backgroundColor: meta.color, animationDelay: `${idx * 0.2 + 0.2}s` }}></span>
                            </div>
                            <p className="text-xs italic" style={{ color: '#8B6878' }}>
                              {key === 'A' && t('load_a')}
                              {key === 'B' && t('load_b')}
                              {key === 'C' && t('load_c')}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {error && (
              <div className="py-8 text-center">
                <p className="mb-4" style={{ color: '#C77B8C' }}>{error}</p>
                <button onClick={generatePlans} className="px-5 py-2 rounded-xl text-sm" style={{ backgroundColor: '#5C3A4A', color: 'white' }}>{t('err_retry')}</button>
              </div>
            )}

            {plans && !loading && (
              <div className="space-y-4">
                <div className="flex items-center gap-3 pb-3 border-b" style={{ borderColor: '#F4D8DD' }}>
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#C77B8C' }}>
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold" style={{ color: '#5C3A4A' }}>{t('res_title')}</h2>
                    <p className="text-xs" style={{ color: '#8B6878' }}>{t('res_sub')}</p>
                  </div>
                </div>

                <div className="rounded-xl p-3 flex gap-2 border-2" style={{ backgroundColor: 'rgba(250, 208, 216, 0.3)', borderColor: '#F4D8DD' }}>
                  <Info className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#C77B8C' }} />
                  <p className="text-xs leading-relaxed" style={{ color: '#5C3A4A' }}>
                    <strong className="px-1.5 py-0.5 rounded" style={{ backgroundColor: 'rgba(244, 200, 210, 0.6)' }}>{t('link_em')}</strong>{t('link_text')}
                  </p>
                </div>

                {/* 旅行日の天気・季節情報 */}
                {tripWeather && (tripWeather.weather?.available || (tripWeather.seasonal && tripWeather.seasonal.length > 0)) && (
                  <div className="rounded-xl p-4 border-2" style={{ backgroundColor: 'rgba(232, 240, 250, 0.5)', borderColor: '#C5D8EA' }}>
                    <div className="flex items-center gap-2 mb-2">
                      <Sun className="w-4 h-4" style={{ color: '#5A8AB8' }} />
                      <h3 className="text-sm font-bold" style={{ color: '#3D4A5C' }}>{t('weather_title')}</h3>
                    </div>
                    {tripWeather.weather?.available && (
                      <p className="text-xs mb-1.5" style={{ color: '#3D4A5C' }}>
                        <span className="font-medium">{tripWeather.pref}:</span> {tripWeather.weather.weather}
                      </p>
                    )}
                    {tripWeather.seasonal && tripWeather.seasonal.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-1.5">
                        {tripWeather.seasonal.map((ev, i) => (
                          <span key={i} className="text-xs px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(199, 123, 140, 0.15)', color: '#7A4A60' }}>
                            {ev}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {['A', 'B', 'C'].map((key) => {
                  const pd = (showInsta && instaPlans) ? instaPlans[key] : plans[key];
                  if (!pd) return null;
                  const meta = planLabels[key];
                  const isOpen = openPlan === key;
                  const fav = isFav(key);
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
                            <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                              <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ backgroundColor: meta.color, color: 'white' }}>{meta.label}</span>
                              <span className="text-xs" style={{ color: meta.color }}>{meta.theme}</span>
                              {showInsta && (
                                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full" style={{ backgroundColor: '#E8C5DD', color: '#7A4A60' }}>📷 {t('insta_badge')}</span>
                              )}
                            </div>
                            <p className="text-sm font-bold truncate" style={{ color: '#5C3A4A' }}>{pd.title}</p>
                            <p className="text-xs truncate" style={{ color: '#8B6878' }}>{pd.summary}</p>
                          </div>
                        </div>
                        <ChevronDown className={`w-5 h-5 flex-shrink-0 ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} style={{ color: meta.color }} />
                      </button>
                      {isOpen && (
                        <div className="border-t p-4 space-y-4" style={{ borderColor: meta.bg }}>
                          {/* 写真表示は一旦オフ(プラン本文の質に集中するため)。復活時は下記の{false &&}を{pd.imageKeyword &&}に戻す */}
                          {false && pd.imageKeyword && (
                            <div className="rounded-xl overflow-hidden relative" style={{ aspectRatio: '2/1', backgroundColor: meta.bg }}>
                              <img src={getPhotoUrl(pd.imageKeyword)} alt={pd.title} className="w-full h-full object-cover" loading="lazy" onError={(e) => { e.target.style.display = 'none'; }} />
                              <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent 0%, transparent 60%, rgba(0,0,0,0.3) 100%)' }}></div>
                              <p className="absolute bottom-1.5 right-2 text-[9px] text-white/80">{t('photo_credit')}</p>
                            </div>
                          )}
                          {pd.warnings && pd.warnings.length > 0 && (
                            <div className="rounded-xl p-3.5 border-2" style={{ backgroundColor: 'rgba(254, 245, 220, 0.7)', borderColor: '#E8D5A0' }}>
                              <p className="text-xs font-bold mb-2" style={{ color: '#8B6E2A' }}>{t('warnings_title')}</p>
                              <ul className="space-y-1.5">
                                {pd.warnings.map((w, i) => (
                                  <li key={i} className="text-xs leading-relaxed flex gap-1.5" style={{ color: '#5C4820' }}>
                                    <span className="flex-shrink-0" style={{ color: '#B89554' }}>・</span>
                                    <span>{w}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {showInsta && pd.spots && pd.spots.length > 0 && (
                            <div className="space-y-2.5">
                              {pd.spots.map((s, i) => (
                                <div key={i} className="rounded-xl p-3 border-2" style={{ backgroundColor: 'rgba(232, 197, 221, 0.2)', borderColor: '#E8C5DD' }}>
                                  <div className="flex items-start justify-between gap-2 mb-1.5">
                                    <a href={searchUrl(s.name)} target="_blank" rel="noopener noreferrer"
                                      className="text-sm font-bold underline decoration-2 underline-offset-2 flex items-center gap-1"
                                      style={{ color: '#7A4A60', textDecorationColor: '#E8C5DD' }}>
                                      {s.name}<ExternalLink className="w-3 h-3 flex-shrink-0" />
                                    </a>
                                    <div className="flex items-center gap-0.5 flex-shrink-0">
                                      {Array.from({ length: 5 }).map((_, idx) => (
                                        <Star key={idx} className="w-3 h-3" style={{ color: idx < (s.photoScore || 0) ? '#D4A04F' : '#E5DACD', fill: idx < (s.photoScore || 0) ? '#D4A04F' : 'none' }} />
                                      ))}
                                    </div>
                                  </div>
                                  {s.description && (<p className="text-xs mb-2" style={{ color: '#5C3A4A' }}>{s.description}</p>)}
                                  <div className="space-y-1 text-xs" style={{ color: '#5C3A4A' }}>
                                    {s.bestTime && (<p><span className="font-bold" style={{ color: '#A85A75' }}>📸 {t('insta_time')}:</span> {s.bestTime}</p>)}
                                    {s.angle && (<p><span className="font-bold" style={{ color: '#A85A75' }}>✨ {t('insta_angle')}:</span> {s.angle}</p>)}
                                  </div>
                                  {s.tags && s.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-1 mt-2">
                                      {s.tags.map((tag, idx) => (
                                        <span key={idx} className="text-[10px] px-1.5 py-0.5 rounded-full" style={{ backgroundColor: 'white', color: '#7A4A60', border: '1px solid #E8C5DD' }}>
                                          #{tag}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                          <div className="prose max-w-none">{renderPlan(pd.content)}</div>
                          <div className="flex flex-wrap gap-2 pt-3 border-t" style={{ borderColor: meta.bg }}>
                            <button onClick={() => toggleFav(key)}
                              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-medium border transition-colors"
                              style={fav ? { backgroundColor: '#FFE5EA', color: '#C77B8C', borderColor: '#C77B8C' } : { backgroundColor: 'white', color: '#5C3A4A', borderColor: '#EAD5DA' }}>
                              <Heart className={`w-3.5 h-3.5 ${fav ? 'fill-current' : ''}`} />
                              {fav ? t('btn_saved') : t('btn_save')}
                            </button>
                            <button onClick={() => sharePlan(pd, meta.label, key)}
                              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg text-xs font-medium border transition-colors hover:bg-pink-50"
                              style={{ backgroundColor: 'white', color: '#5C3A4A', borderColor: '#EAD5DA' }}>
                              {copiedKey === key ? <><Check className="w-3.5 h-3.5" />{t('btn_shared')}</> : <><Share2 className="w-3.5 h-3.5" />{t('btn_share')}</>}
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
                    <RefreshCw className="w-4 h-4" />{t('btn_regen')}
                  </button>
                  <button onClick={reset}
                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-90"
                    style={{ backgroundColor: '#C77B8C', color: 'white' }}>
                    {t('btn_reset')}
                  </button>
                </div>

                {/* 映え重視で再構成ボタン */}
                {!instaLoading && (
                  <div className="pt-2 flex flex-col items-center gap-1">
                    {!showInsta ? (
                      <>
                        <button onClick={generateInstaPlans}
                          className="text-xs px-4 py-2 rounded-full transition-colors"
                          style={{ color: '#A85A75', backgroundColor: 'rgba(232, 197, 221, 0.25)', border: '1px dashed #D8B5C8' }}
                          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'rgba(232, 197, 221, 0.45)'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'rgba(232, 197, 221, 0.25)'; }}>
                          {t('insta_btn')}
                        </button>
                        <p className="text-[10px]" style={{ color: '#A89098' }}>{t('insta_btn_hint')}</p>
                      </>
                    ) : (
                      <button onClick={() => { setShowInsta(false); setOpenPlan('A'); }}
                        className="text-xs px-4 py-2 rounded-full transition-colors hover:bg-pink-50"
                        style={{ color: '#A89098', backgroundColor: 'transparent', border: '1px dashed #D8C5D0' }}>
                        ← {t('insta_back')}
                      </button>
                    )}
                  </div>
                )}
                {instaLoading && (
                  <div className="text-center py-3">
                    <div className="inline-block animate-spin"><Sparkles className="w-5 h-5" style={{ color: '#B888AD' }} /></div>
                    <p className="text-xs mt-1.5" style={{ color: '#8B6878' }}>{t('insta_loading')}</p>
                  </div>
                )}
                {instaError && !instaLoading && (
                  <div className="text-center py-3 px-4 rounded-xl" style={{ backgroundColor: 'rgba(232, 197, 221, 0.25)', border: '1px solid #E8C5DD' }}>
                    <p className="text-xs mb-2" style={{ color: '#7A4A60' }}>{instaError}</p>
                    <button onClick={() => { setInstaError(''); generateInstaPlans(); }}
                      className="text-xs px-3 py-1.5 rounded-full font-medium"
                      style={{ backgroundColor: '#C77B8C', color: 'white' }}>
                      {t('err_retry')}
                    </button>
                  </div>
                )}

                <div className="pt-4 border-t space-y-3" style={{ borderColor: '#F4D8DD' }}>
                  {!extras && !extrasLoading && (
                    <button onClick={generateExtras}
                      className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-medium border-2 transition-colors hover:shadow-md"
                      style={{ backgroundColor: 'rgba(232, 197, 221, 0.3)', color: '#7A4A60', borderColor: '#E8C5DD' }}>
                      <Sparkles className="w-4 h-4" />{t('ext_btn')}
                    </button>
                  )}
                  {extrasLoading && (
                    <div className="text-center py-4">
                      <div className="inline-block animate-spin"><Sparkles className="w-6 h-6" style={{ color: '#B888AD' }} /></div>
                      <p className="text-sm mt-2" style={{ color: '#8B6878' }}>{t('ext_loading')}</p>
                    </div>
                  )}
                  {extras && (
                    <div className="space-y-2">
                      <h3 className="text-lg font-bold flex items-center gap-2" style={{ color: '#5C3A4A' }}>
                        <Sparkles className="w-5 h-5" style={{ color: '#B888AD' }} />{t('ext_title')}
                      </h3>
                      {[
                        { key: 'cafes', label: t('ext_cafes'), icon: Coffee, items: extras.cafes },
                        { key: 'restaurants', label: t('ext_rest'), icon: Utensils, items: extras.restaurants },
                        { key: 'spots', label: t('ext_spots'), icon: Camera, items: extras.spots },
                      ].map(section => (
                        <div key={section.key} className="bg-white border-2 rounded-xl overflow-hidden" style={{ borderColor: '#F4D8DD' }}>
                          <button onClick={() => setOpenExtraSection(openExtraSection === section.key ? null : section.key)}
                            className="w-full flex items-center justify-between px-4 py-3 hover:bg-pink-50 transition-colors">
                            <div className="flex items-center gap-2.5">
                              {React.createElement(section.icon, { className: "w-4 h-4", style: { color: '#C77B8C' } })}
                              <span className="text-sm font-bold" style={{ color: '#5C3A4A' }}>{section.label}</span>
                              <span className="text-xs" style={{ color: '#A89098' }}>({section.items?.length || 0}{t('ext_count')})</span>
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

        {view === 'mypage' && (
          <div className="rounded-3xl p-6 sm:p-8" style={{
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
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
                <h2 className="text-xl font-bold" style={{ color: '#5C3A4A' }}>{t('mp_title')}</h2>
                <p className="text-xs" style={{ color: '#8B6878' }}>{favorites.length}{t('mp_count')}</p>
              </div>
            </div>

            {favorites.length === 0 && (
              <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ backgroundColor: 'rgba(244, 216, 221, 0.5)' }}>
                  <Bookmark className="w-7 h-7" style={{ color: '#C77B8C' }} />
                </div>
                <p className="text-sm font-medium mb-2" style={{ color: '#5C3A4A' }}>{t('mp_empty_title')}</p>
                <p className="text-xs mb-6" style={{ color: '#8B6878' }}>{t('mp_empty_sub')}</p>
                <button onClick={() => setView('home')}
                  className="px-5 py-2.5 rounded-xl text-sm font-medium transition-colors"
                  style={{ backgroundColor: '#C77B8C', color: 'white' }}>
                  {t('tabPlan')}
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
                              <span className="text-xs" style={{ color: '#8B6878' }}>{new Date(fav.savedAt).toLocaleDateString(lang === 'ja' ? 'ja-JP' : 'en-US')}</span>
                            </div>
                            <p className="text-sm font-bold" style={{ color: '#5C3A4A' }}>{fav.title}</p>
                            <p className="text-xs mt-0.5" style={{ color: '#8B6878' }}>{fav.summary}</p>
                          </div>
                          <button onClick={() => removeFav(fav.id)} className="p-1.5 rounded-lg transition-colors hover:bg-white/60" style={{ color: '#A89098' }}>
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <details className="border-t" style={{ borderColor: meta.bg }}>
                        <summary className="px-4 py-2.5 text-xs cursor-pointer hover:bg-pink-50 transition-colors" style={{ color: meta.color }}>
                          {t('mp_detail')}
                        </summary>
                        <div className="p-4 border-t space-y-4" style={{ borderColor: meta.bg }}>
                          {/* 写真表示は一旦オフ。復活時は下記の{false &&}を{fav.imageKeyword &&}に戻す */}
                          {false && fav.imageKeyword && (
                            <div className="rounded-xl overflow-hidden relative" style={{ aspectRatio: '2/1', backgroundColor: meta.bg }}>
                              <img src={getPhotoUrl(fav.imageKeyword)} alt={fav.title} className="w-full h-full object-cover" loading="lazy" onError={(e) => { e.target.style.display = 'none'; }} />
                              <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent 0%, transparent 60%, rgba(0,0,0,0.3) 100%)' }}></div>
                              <p className="absolute bottom-1.5 right-2 text-[9px] text-white/80">{t('photo_credit')}</p>
                            </div>
                          )}
                          {fav.warnings && fav.warnings.length > 0 && (
                            <div className="rounded-xl p-3.5 border-2" style={{ backgroundColor: 'rgba(254, 245, 220, 0.7)', borderColor: '#E8D5A0' }}>
                              <p className="text-xs font-bold mb-2" style={{ color: '#8B6E2A' }}>{t('warnings_title')}</p>
                              <ul className="space-y-1.5">
                                {fav.warnings.map((w, i) => (
                                  <li key={i} className="text-xs leading-relaxed flex gap-1.5" style={{ color: '#5C4820' }}>
                                    <span className="flex-shrink-0" style={{ color: '#B89554' }}>・</span>
                                    <span>{w}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          <div className="prose max-w-none">{renderPlan(fav.content)}</div>
                          <div className="flex flex-wrap gap-2 pt-3 mt-3 border-t" style={{ borderColor: meta.bg }}>
                            <button onClick={() => sharePlan(fav, fav.planLabel, `fav-${fav.id}`)}
                              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border transition-colors hover:bg-pink-50"
                              style={{ backgroundColor: 'white', color: '#5C3A4A', borderColor: '#EAD5DA' }}>
                              {copiedKey === `fav-${fav.id}` ? <><Check className="w-3.5 h-3.5" />{t('btn_shared')}</> : <><Share2 className="w-3.5 h-3.5" />{t('btn_share')}</>}
                            </button>
                            {(() => {
                              const existing = albumForFav(fav.id);
                              return (
                                <button onClick={() => openAlbumForm(fav.id, existing)}
                                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border transition-colors"
                                  style={existing ? { backgroundColor: 'rgba(232, 197, 221, 0.4)', color: '#7A4A60', borderColor: '#E8C5DD' } : { backgroundColor: 'white', color: '#5C3A4A', borderColor: '#EAD5DA' }}>
                                  <Check className="w-3.5 h-3.5" />
                                  {existing ? t('album_edit') : t('album_visit_btn')}
                                </button>
                              );
                            })()}
                          </div>
                        </div>
                      </details>
                    </div>
                  );
                })}
              </div>
            )}

            {/* ODEKAKEアルバムセクション */}
            <div className="mt-8 pt-6 border-t" style={{ borderColor: '#F4D8DD' }}>
              <div className="flex items-center gap-3 pb-4 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #E8C5DD 0%, #C77B8C 100%)' }}>
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold" style={{ color: '#5C3A4A' }}>{t('album_title')}</h2>
                  <p className="text-xs" style={{ color: '#8B6878' }}>{t('album_sub')}</p>
                </div>
              </div>

              {albums.length === 0 ? (
                <div className="text-center py-10 rounded-2xl" style={{ backgroundColor: 'rgba(244, 216, 221, 0.2)' }}>
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-3" style={{ backgroundColor: 'rgba(232, 197, 221, 0.5)' }}>
                    <Camera className="w-6 h-6" style={{ color: '#A85A75' }} />
                  </div>
                  <p className="text-xs leading-relaxed px-6" style={{ color: '#8B6878' }}>{t('album_empty')}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {albums.map((a) => {
                    const meta = planLabels[a.planKey] || planLabels.A;
                    return (
                      <div key={a.id} className="rounded-2xl overflow-hidden bg-white shadow-sm" style={{ border: `1px solid ${meta.bg}` }}>
                        {/* 写真ギャラリー */}
                        {a.photos && a.photos.length > 0 && (
                          <div className={`grid gap-0.5 ${a.photos.length === 1 ? 'grid-cols-1' : a.photos.length === 2 ? 'grid-cols-2' : 'grid-cols-3'}`}>
                            {a.photos.map((p, i) => (
                              <div key={i} className="relative" style={{ aspectRatio: a.photos.length === 1 ? '16/9' : '1/1', backgroundColor: meta.bg }}>
                                <img src={p} alt="" className="w-full h-full object-cover" loading="lazy" />
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="p-4">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold" style={{ color: '#5C3A4A' }}>{a.title}</p>
                              <p className="text-xs mt-0.5" style={{ color: '#8B6878' }}>{a.summary}</p>
                            </div>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0" style={{ backgroundColor: meta.color, color: 'white' }}>{a.planLabel}</span>
                          </div>
                          {/* 評価 */}
                          <div className="flex items-center gap-0.5 mb-2.5">
                            {Array.from({ length: 5 }).map((_, idx) => (
                              <Star key={idx} className="w-4 h-4" style={{ color: idx < a.rating ? '#D4A04F' : '#E5DACD', fill: idx < a.rating ? '#D4A04F' : 'none' }} />
                            ))}
                          </div>
                          {/* 感想 */}
                          <p className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: '#3D2530' }}>{a.review}</p>
                          {/* 訪問日 + 操作 */}
                          <div className="flex items-center justify-between mt-3 pt-3 border-t" style={{ borderColor: meta.bg }}>
                            <p className="text-[11px]" style={{ color: '#A89098' }}>
                              {t('album_visited_at')}: {new Date(a.visitedAt).toLocaleDateString(lang === 'ja' ? 'ja-JP' : 'en-US')}
                            </p>
                            <div className="flex gap-1.5">
                              <button onClick={() => openAlbumForm(a.favId, a)}
                                className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-medium hover:bg-pink-50 transition-colors"
                                style={{ color: '#7A4A60', border: '1px solid #EAD5DA' }}>
                                <Pencil className="w-3 h-3" />{t('album_edit')}
                              </button>
                              <button onClick={() => deleteAlbum(a.id)}
                                className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] hover:bg-pink-50 transition-colors"
                                style={{ color: '#A89098', border: '1px solid #EAD5DA' }}>
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* === チャットモード === */}
        {view === 'chat' && (
          <div className="space-y-4">
            <style>{`
              @keyframes odekakeButtonPulse {
                0%, 100% { box-shadow: 0 4px 14px rgba(199, 123, 140, 0.35), inset 0 1px 0 rgba(255,255,255,0.3); }
                50% { box-shadow: 0 4px 22px rgba(199, 123, 140, 0.55), inset 0 1px 0 rgba(255,255,255,0.4); }
              }
              @keyframes odekakeFloat {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-4px); }
              }
            `}</style>            {/* ヘッダー */}
            <div className="rounded-2xl p-5 backdrop-blur-md" style={{ backgroundColor: 'rgba(255, 255, 255, 0.85)' }}>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #E8C5DD 0%, #C77B8C 100%)' }}>
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-bold" style={{ color: '#5C3A4A' }}>{t('chat_header_title')}</h2>
                  <p className="text-xs" style={{ color: '#8B6878' }}>{t('chat_header_sub')}</p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 mt-3 pt-3 border-t" style={{ borderColor: '#F4D8DD' }}>
                <button onClick={resetChat}
                  className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full transition-colors hover:bg-pink-50"
                  style={{ color: '#A85A75', border: '1px solid #EAD5DA' }}>
                  <RefreshCw className="w-3 h-3" strokeWidth={1.8} />
                  {t('chat_reset')}
                </button>
                <button onClick={() => setView('home')}
                  className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full transition-colors hover:bg-pink-50"
                  style={{ color: '#A85A75', border: '1px solid #EAD5DA' }}>
                  <ArrowRight className="w-3 h-3 rotate-180" strokeWidth={1.8} />
                  {t('chat_back_to_form')}
                </button>
                <button onClick={() => setView('mypage')}
                  className="flex items-center gap-1 text-[11px] px-2.5 py-1 rounded-full transition-colors hover:bg-pink-50"
                  style={{ color: '#A85A75', border: '1px solid #EAD5DA' }}>
                  <Bookmark className="w-3 h-3" strokeWidth={1.8} />
                  {t('tabMypage')}
                  {favorites.length > 0 && (
                    <span className="ml-0.5 px-1.5 py-0 rounded-full text-[9px] font-bold" style={{ backgroundColor: '#C77B8C', color: 'white' }}>{favorites.length}</span>
                  )}
                </button>
              </div>
            </div>

            {/* チャット画面本体 */}
            <div className="rounded-2xl backdrop-blur-md flex flex-col" style={{ backgroundColor: 'rgba(255, 255, 255, 0.85)', height: 'calc(100vh - 360px)', minHeight: '400px' }}>
              {/* メッセージ一覧 */}
              <div ref={chatScrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.role === 'assistant' && (
                      <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mr-2 mt-0.5" style={{ background: 'linear-gradient(135deg, #E8C5DD 0%, #C77B8C 100%)' }}>
                        <Sparkles className="w-3.5 h-3.5 text-white" />
                      </div>
                    )}
                    <div className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap ${msg.role === 'user' ? 'rounded-tr-sm' : 'rounded-tl-sm'}`}
                      style={msg.role === 'user'
                        ? { backgroundColor: '#C77B8C', color: 'white' }
                        : { backgroundColor: 'white', color: '#3D2530', border: '1px solid #F4D8DD' }}>
                      {msg.content}
                      {/* 情報が揃ったら、このメッセージ内に生成提案ボタン */}
                      {msg.readyData && (
                        <button onClick={() => generateFromChat(msg.readyData.answers)}
                          className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-bold transition-all hover:opacity-95 hover:scale-[1.02]"
                          style={{
                            background: 'linear-gradient(135deg, #F4D8DD 0%, #C77B8C 50%, #A85A75 100%)',
                            color: 'white',
                            boxShadow: '0 4px 14px rgba(199, 123, 140, 0.35), inset 0 1px 0 rgba(255,255,255,0.3)',
                            animation: 'odekakeButtonPulse 2.4s ease-in-out infinite',
                          }}>
                          <Wand2 className="w-4 h-4" strokeWidth={1.8} />
                          {t('chat_generate_btn')}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                {chatLoading && (
                  <div className="flex justify-start">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mr-2 mt-0.5" style={{ background: 'linear-gradient(135deg, #E8C5DD 0%, #C77B8C 100%)' }}>
                      <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
                    </div>
                    <div className="rounded-2xl rounded-tl-sm px-3.5 py-2.5 text-sm" style={{ backgroundColor: 'white', color: '#8B6878', border: '1px solid #F4D8DD' }}>
                      <span className="inline-flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: '#C77B8C', animationDelay: '0ms' }}></span>
                        <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: '#C77B8C', animationDelay: '150ms' }}></span>
                        <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: '#C77B8C', animationDelay: '300ms' }}></span>
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* エラー表示 */}
              {chatError && (
                <div className="px-4 pb-2">
                  <p className="text-xs px-3 py-2 rounded-lg" style={{ backgroundColor: 'rgba(220, 100, 100, 0.1)', color: '#B85555' }}>{chatError}</p>
                </div>
              )}

              {/* 入力欄 */}
              <div className="p-3 border-t flex gap-2 items-end" style={{ borderColor: '#F4D8DD' }}>
                <textarea
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendChatMessage();
                    }
                  }}
                  placeholder={t('chat_input_ph')}
                  rows={1}
                  disabled={chatLoading}
                  className="flex-1 px-3 py-2 rounded-xl text-sm focus:outline-none resize-none disabled:opacity-50"
                  style={{ border: '1px solid #EAD5DA', color: '#3D2530', backgroundColor: 'rgba(250, 244, 246, 0.5)', maxHeight: '100px' }}
                />
                <button onClick={sendChatMessage}
                  disabled={!chatInput.trim() || chatLoading}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold transition-all disabled:opacity-40 flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg, #C77B8C 0%, #A85A75 100%)', color: 'white' }}>
                  <Send className="w-3.5 h-3.5" strokeWidth={1.8} />
                  {t('chat_send')}
                </button>
              </div>
            </div>

            {/* ユーザー主導の生成ボタン(3往復以上で表示)*/}
            {chatMessages.filter(m => m.role === 'user').length >= 3 && !chatMessages.some(m => m.readyData) && (
              <div className="flex justify-center">
                <button onClick={async () => {
                  // ユーザー主導:現状の会話から情報を抽出する追加リクエスト
                  setChatLoading(true);
                  try {
                    const extractPrompt = `これまでの会話から、ユーザーの希望を抽出して必ず以下のJSONブロックのみで返してください(自然文は不要):

\`\`\`json
{
  "ready": true,
  "answers": {
    "destination": "", "destinationNote": "",
    "startDate": null, "endDate": null, "dateNote": "",
    "companions": "", "companionsNote": "",
    "departure": "", "departureNote": "",
    "transport": "", "transportNote": "",
    "budget": "", "budgetNote": "",
    "interests": [], "interestsNote": "",
    "atmosphere": [], "atmosphereNote": ""
  }
}
\`\`\`

不明な項目は空文字または空配列で。`;
                    const response = await fetch("/api/claude", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        model: "claude-sonnet-4-5-20250929",
                        max_tokens: 1500,
                        system: buildChatSystemPrompt(),
                        messages: [
                          ...chatMessages.map(m => ({ role: m.role, content: m.content })),
                          { role: 'user', content: extractPrompt },
                        ],
                      }),
                    });
                    const data = await response.json();
                    const fullText = data.content.map(i => i.text || "").join("\n");
                    const jsonMatch = fullText.match(/```json\s*([\s\S]*?)\s*```/);
                    if (jsonMatch) {
                      const parsed = JSON.parse(jsonMatch[1]);
                      if (parsed.answers) generateFromChat(parsed.answers);
                    }
                  } catch (err) {
                    console.error(err);
                    setChatError(t('chat_error'));
                  } finally { setChatLoading(false); }
                }}
                  disabled={chatLoading}
                  className="flex items-center gap-1.5 text-xs px-4 py-2 rounded-full transition-all disabled:opacity-40 hover:opacity-90"
                  style={{ color: '#A85A75', backgroundColor: 'rgba(232, 197, 221, 0.4)', border: '1px solid #D8B5C8' }}>
                  <Wand2 className="w-3.5 h-3.5" strokeWidth={1.8} />
                  {t('chat_generate_btn')}
                </button>
              </div>
            )}
          </div>
        )}

        <p className="text-center mt-6 font-bold" style={{ 
          color: '#3D2530',
          fontFamily: '"Caveat", cursive',
          fontSize: '1.3rem',
          letterSpacing: '0.02em',
          textShadow: '0 1px 3px rgba(255,255,255,0.7)',
        }}>
          {t('tagline')}
        </p>
      </div>

      {/* アルバム入力フォーム(モーダル) */}
      {albumDraft.favId !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ backgroundColor: 'rgba(60, 37, 48, 0.55)', backdropFilter: 'blur(4px)' }}>
          <div className="rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto" style={{ backgroundColor: 'white', boxShadow: '0 20px 60px rgba(60, 37, 48, 0.3)' }}>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-5 pb-3 border-b" style={{ borderColor: '#F4D8DD' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #E8C5DD 0%, #C77B8C 100%)' }}>
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-lg font-bold" style={{ color: '#5C3A4A' }}>{t('album_form_title')}</h2>
              </div>

              {/* 評価 */}
              <div className="mb-4">
                <label className="text-xs font-bold mb-2 block" style={{ color: '#5C3A4A' }}>{t('album_rating_label')}</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} onClick={() => setAlbumDraft({ ...albumDraft, rating: n })}
                      className="p-1 transition-transform hover:scale-110">
                      <Star className="w-7 h-7" style={{ color: n <= albumDraft.rating ? '#D4A04F' : '#E5DACD', fill: n <= albumDraft.rating ? '#D4A04F' : 'none' }} />
                    </button>
                  ))}
                </div>
              </div>

              {/* 感想 */}
              <div className="mb-4">
                <label className="text-xs font-bold mb-2 block" style={{ color: '#5C3A4A' }}>{t('album_review_label')}</label>
                <textarea value={albumDraft.review} onChange={(e) => setAlbumDraft({ ...albumDraft, review: e.target.value })}
                  placeholder={t('album_review_ph')}
                  rows={5}
                  className="w-full px-3 py-2.5 rounded-xl border-2 focus:outline-none text-sm leading-relaxed resize-none"
                  style={{ borderColor: '#EAD5DA', color: '#3D2530', backgroundColor: 'rgba(250, 244, 246, 0.5)' }} />
                <p className="text-[10px] mt-1 text-right" style={{ color: '#A89098' }}>{albumDraft.review.length} / 500</p>
              </div>

              {/* 写真 */}
              <div className="mb-5">
                <label className="text-xs font-bold mb-2 block" style={{ color: '#5C3A4A' }}>{t('album_photos_label')}</label>
                <div className="grid grid-cols-3 gap-2">
                  {albumDraft.photos.map((p, i) => (
                    <div key={i} className="relative" style={{ aspectRatio: '1/1' }}>
                      <img src={p} alt="" className="w-full h-full object-cover rounded-xl" />
                      <button onClick={() => setAlbumDraft({ ...albumDraft, photos: albumDraft.photos.filter((_, j) => j !== i) })}
                        className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full flex items-center justify-center shadow-md"
                        style={{ backgroundColor: '#5C3A4A', color: 'white' }}>
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  {albumDraft.photos.length < 3 && (
                    <label className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed cursor-pointer hover:bg-pink-50 transition-colors"
                      style={{ aspectRatio: '1/1', borderColor: '#EAD5DA', color: '#A85A75' }}>
                      <Camera className="w-5 h-5 mb-1" />
                      <span className="text-[10px]">{t('album_photos_add')}</span>
                      <input type="file" accept="image/*" multiple onChange={handlePhotoAdd} className="hidden" />
                    </label>
                  )}
                </div>
              </div>

              {/* ボタン */}
              <div className="flex gap-2">
                <button onClick={closeAlbumForm}
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors hover:bg-pink-50"
                  style={{ backgroundColor: 'white', color: '#5C3A4A', borderColor: '#EAD5DA' }}>
                  {t('album_cancel')}
                </button>
                <button onClick={saveAlbum}
                  disabled={!albumDraft.review.trim()}
                  className="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-40"
                  style={{ backgroundColor: '#C77B8C', color: 'white' }}>
                  {t('album_save')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
