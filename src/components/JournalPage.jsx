import React from 'react';
import { JOURNAL } from '../data/journal.js';
import { ArrowLeftIcon, ArrowRightIcon } from './Icons.jsx';

const ESSAY_NOTES = {
  1: [
    '夜の東京でシャッターを切るとき、最初に決めるのは被写体ではなく露出の重心です。ネオンのハイライトを守りながら路面の濡れた反射を残すことで、現場の湿度と温度がそのままフレームに残ります。',
    'シャッタースピードは 1/50s〜1/80s を基準にしつつ、人の気配だけをわずかに流すことで、静的な建築と動的な群衆の対比を際立たせています。',
  ],
  2: [
    '写真を並べる画面では、装飾や枠線が強いほど写真自身のコントラストが弱まります。背景は暗いニュートラルに抑え、余白の比率だけで視線の速度を設計しています。',
    '見出しのセリフ体と EXIF の等幅フォントのコントラストだけで階層を作ることで、テキストが写真の邪魔をしない静かなページになります。',
  ],
  3: [
    'プリセットを作るときは、1枚の見栄えではなく異なる時間帯の 5〜10 枚の RAW に当てて破綻しないかを検証します。ハイライトのロールオフと肌色の傾きを最初に固定するのがポイントです。',
    'XMP ファイルとして書き出す前に、デスクトップとモバイルの両環境でシャドウの黒つぶれと粒子量を確認して仕上げています。',
  ],
  4: [
    'クライアントワークでは明確な目的と制約の中で最適解を出し、パーソナルワークではまだ言葉にならない違和感や光の断片を追いかけます。',
    '両者の往復があることで、商業撮影の現場でも独自の視点を失わず、個人制作でも再現性の高いワークフローを保てます。',
  ],
};

function formatDate(d) {
  const [y, m] = d.split('-');
  const dt = new Date(Number(y), Number(m) - 1, 1);
  return new Intl.DateTimeFormat('en-US', { month: 'short', year: 'numeric' }).format(dt);
}

export default function JournalPage() {
  const [activeId, setActiveId] = React.useState(null);
  const activePost = JOURNAL.find((p) => p.id === activeId) || null;

  if (activePost) {
    const paragraphs = ESSAY_NOTES[activePost.id] || [];
    return (
      <section className="section" id="journal" aria-labelledby="article-heading">
        <div className="container container-narrow">
          <button
            type="button"
            className="text-link back-link"
            onClick={() => setActiveId(null)}
          >
            <ArrowLeftIcon />
            <span>Back to Journal</span>
          </button>

          <article className="essay-reader">
            <header className="essay-header">
              <div className="journal-meta">
                <span className="journal-cat">{activePost.category}</span>
                <span>{formatDate(activePost.date)}</span>
                <span>{activePost.readMin} min read</span>
              </div>
              <h1 id="article-heading" className="essay-title">{activePost.title}</h1>
              <p className="essay-lead">{activePost.excerpt}</p>
            </header>

            <figure className="essay-cover">
              <img src={activePost.cover} alt={activePost.title} width={960} height={540} />
            </figure>

            <div className="essay-body">
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
    <section className="section" id="journal" aria-labelledby="journal-heading">
      <div className="container">
        <header className="page-header">
          <div>
            <h1 id="journal-heading">Journal</h1>
            <p className="page-lead">
              Field notes on night exposure, color grading workflows, and visual restraint.
            </p>
          </div>
          <span className="page-counter">{JOURNAL.length} essays</span>
        </header>

        <div className="journal-list">
          {JOURNAL.map((post) => (
            <article key={post.id} className="journal-row">
              <button
                type="button"
                className="journal-row-btn"
                onClick={() => setActiveId(post.id)}
              >
                <div className="journal-thumb">
                  <img
                    src={post.cover}
                    alt={post.title}
                    width={320}
                    height={214}
                    loading="lazy"
                  />
                </div>
                <div className="journal-body">
                  <div className="journal-meta">
                    <span className="journal-cat">{post.category}</span>
                    <span>{formatDate(post.date)}</span>
                    <span>{post.readMin} min read</span>
                  </div>
                  <h2 className="journal-title">{post.title}</h2>
                  <p className="journal-excerpt">{post.excerpt}</p>
                  <span className="journal-read-cta">
                    <span>Read essay</span>
                    <ArrowRightIcon />
                  </span>
                </div>
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
