import React from 'react';
import { JOURNAL } from '../data/journal.js';
import { IconArrowLeft, IconArrowRight } from './Icons.jsx';

const ESSAY_BODY = {
  1: [
    '夜の東京でカメラを構えるとき、最初に意識するのは明るさではなく暗部の階調です。看板や街灯の強い光は放っておいても画面に写りますが、濡れたアスファルトや路地裏のコンクリートに落ちる弱い反射をどう残すかで、写真全体の静けさが決まります。',
    'シャッタースピードは1/60秒前後を基準にしながら、歩行者の流れを見せたい場面だけ1/15秒まで落とします。ISO感度を無理に抑えるよりも、手ブレのない芯を残し、現像時にシャドウの青みとハイライトの暖色をわずかに分離させるのが近年の定番です。',
  ],
  2: [
    '写真のポートフォリオを設計するとき、画面を埋める装飾が増えるほど一枚ずつの印象は薄れていきます。余白は単なる空白ではなく、次の写真へ目を移す前の呼吸として機能します。',
    '見出しのセリフ体と本文のサンセリフ体、そしてEXIFの等幅数字。役割ごとに書体を絞り、彩度の低い背景に写真を載せることで、被写体が持つ本来の色温度が自然に立ち上がります。',
  ],
  3: [
    'Lightroomプリセットを作るときは、一枚のベストショットに合わせて極端なカーブを引くのではなく、異なる時間帯と光源で撮った10枚前後のRAWファイルに同じ設定を当てて破綻しないかを検証します。',
    '肌色の自然さを崩さないこと、ネオンや白飛びしやすい看板のハイライトを滑らかにロールオフさせること。その二つの基準を満たした設定だけをXMPとして書き出し、現場のベースラインとして使っています。',
  ],
  4: [
    'クライアントワークでは明確な目的と締め切りがあり、パーソナルワークでは自分の好奇心だけが頼りになります。一見すると正反対のようですが、商業撮影で鍛えた光の再現性は、夜のストリートで一瞬の判断を下すときにそのまま活きます。',
    '逆に、個人制作で試し続けている構図や色設計の実験が、次の依頼のきっかけになることも少なくありません。両方を同じ熱量で行き来し続けることが、長く撮り続けるための土台になっています。',
  ],
};

function formatDate(dateStr) {
  const [y, m] = dateStr.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[parseInt(m, 10) - 1]} ${y}`;
}

export default function JournalPage({ activeEssayId, setActiveEssayId }) {
  const activePost = React.useMemo(
    () => JOURNAL.find((post) => post.id === activeEssayId) || null,
    [activeEssayId]
  );

  if (activePost) {
    const paragraphs = ESSAY_BODY[activePost.id] || [activePost.excerpt];
    return (
      <section className="page-section" id="journal" aria-label={activePost.title}>
        <div className="wrap">
          <article className="essay-reader">
            <button
              type="button"
              className="btn-ghost"
              style={{ alignSelf: 'flex-start' }}
              onClick={() => setActiveEssayId(null)}
            >
              <IconArrowLeft />
              <span>Back to journal</span>
            </button>

            <div className="journal-meta">
              <span className="journal-cat">{activePost.category}</span>
              <span>{formatDate(activePost.date)}</span>
              <span>{activePost.readMin} min read</span>
            </div>

            <h1 className="page-title">{activePost.title}</h1>

            <img className="essay-cover" src={activePost.cover} alt={activePost.title} />

            <div className="essay-paragraphs">
              <p>{activePost.excerpt}</p>
              {paragraphs.map((text, idx) => (
                <p key={idx}>{text}</p>
              ))}
            </div>
          </article>
        </div>
      </section>
    );
  }

  return (
    <section className="page-section" id="journal" aria-label="Journal">
      <div className="wrap">
        <header className="page-head">
          <h1 className="page-title">Journal</h1>
          <p className="page-lead">
            Field notes on night exposure, Lightroom grading workflows, and editorial restraint
          </p>
        </header>

        <div className="journal-grid">
          {JOURNAL.map((post) => (
            <button
              type="button"
              key={post.id}
              className="journal-card"
              onClick={() => setActiveEssayId(post.id)}
              aria-label={`Read ${post.title}`}
            >
              <div className="journal-cover-wrap">
                <img src={post.cover} alt={post.title} loading="lazy" />
              </div>

              <div className="journal-body">
                <div className="journal-meta">
                  <span className="journal-cat">{post.category}</span>
                  <span>{formatDate(post.date)}</span>
                  <span>{post.readMin} min read</span>
                </div>
                <h2 className="journal-title">{post.title}</h2>
                <p className="journal-excerpt">{post.excerpt}</p>
                <span className="journal-read-more">
                  <span>Read note</span>
                  <IconArrowRight />
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
