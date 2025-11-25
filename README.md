# Photogrphy Portfolio

## ファイル構成
- `index.html` — ヒーロー、About、Resume、Gallery、Presets、Testimonials、Contact の順で構成。
- `styles.css` — ライトトーンのデザインシステム、ギャラリーカード／ウォーターマーク／プリセットカードのスタイル、レスポンシブ調整。
- `app.js` — ナビゲーションとサイドバーのアクティブ状態を IntersectionObserver で制御。クリック時はスムーズスクロール。
- `presets/*.xmp` — 無料配布用 Lightroom Classic プリセット（Tokyo Chrome / Harajuku Pastel）。
- `concept/` — プロフィールカード用の参考画像。

## 主要セクション
- **Hero** — Ryuta の紹介、Unsplash での実績、クイック CTA（Gallery / Presets）。
- **Gallery** — Unsplash Source API (`https://source.unsplash.com/user/srtgraphy/...`) から取得した写真を Free / Paid に分類。Paid カードにはウォーターマークバッジとライセンス問い合わせボタンを配置。
- **Presets** — 無料ダウンロード（`.xmp` への直リンク）とプレミアムバンドル（メール購入）のカードを用意。
- **Testimonials** — 最新のクライアントコメントに差し替え。
- **Contact** — `hello@ryutasuzuki.studio` での問い合わせ、Instagram リンク、簡易フォーム。

## 動作確認
1. このフォルダーをローカルに配置します。
2. 最新の Chromium / Firefox / Safari 等で `index.html` を開きます。
3. ギャラリー画像は Unsplash からライブ取得するため、インターネット接続が必要です。

## カスタマイズのヒント
- 別の Unsplash ユーザーを使う場合は `index.html` 内の `source.unsplash.com/user/...` を一括置換してください（`sig` パラメータでキャッシュを回避）。
- プリセットを追加する際は `presets/` に `.xmp` を配置し、プリセットカードを複製してファイル名と説明を更新します。
- 有償ライセンスの CTA は `mailto:` になっています。実際のチェックアウトを組み込む場合はボタンを外部カートやフォームに変更してください。

## 今後の拡張案
- Contact フォームを Netlify Forms / Firebase 等に接続。
- ギャラリーカードを CMS (Contentful・Sanity など) と同期して手動更新を不要に。
- プリセット販売の決済フローを Stripe Checkout で自動化。
