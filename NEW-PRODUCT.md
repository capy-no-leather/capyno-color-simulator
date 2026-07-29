# 新しい商品のカラーシミュレーターを追加する手順

このリポジトリは「共通エンジン（見た目・操作・戻る導線などの土台）」と
「商品ごとの設定（アートワークと色）」を分けています。
新商品を追加するときは、共通エンジン（`shared/`）は基本的に触らず、
商品用フォルダを1つ追加するだけで済みます。

## 全体構成

```
site/
  index.html          … ルートURLへのアクセスを /bible/ へ転送するだけのページ
  shared/
    simulator.css      … 全商品共通のレイアウト・UI（触らない）
    simulator.js        … 全商品共通の動作ロジック（触らない）
  bible/                … 商品ごとのフォルダ（例：バイブルサイズ）
    index.html           … アートワークSVG + その商品専用の色CSS
    config.js             … 色・商品ページURL・文言などの設定
    assets/*.png           … ロゴなど埋め込み画像
  NEW-PRODUCT.md         … このファイル
```

公開URLは商品フォルダ名がそのままパスになります。
例：`https://capy-no-leather.github.io/capyno-color-simulator/bible/`

## 手順

### 1. 商品用フォルダを作る

`bible/` フォルダを丸ごとコピーして、新しい商品名のフォルダを作る（例：`weeks/`）。

```
site/bible/  →  site/weeks/
```

### 2. アートワーク（SVG）を用意する

デザイナーからIllustrator等で書き出したSVGを、`weeks/index.html` の `<svg>...</svg>` 部分に
差し替える。その際、色が変わるパーツには **クラス名をつけてもらう**（またはこちらで付ける）。

- 1つの色見本（例：メインカラー）に対応する部分はすべて同じクラス名にする
  （例：表紙も持ち手も同じ「メイン」色なら、どちらも `c-main` にする）
- 色が変わらない金具などのパーツは、既存の `c-hardware-*` のように固定色のクラスにする
- ロゴ画像などのラスター画像は、SVGにBase64で埋め込まず、`assets/` フォルダにPNGとして
  書き出してから `<image href="assets/xxx.png">` のように参照する
  （HTMLファイルが軽くなり、ブラウザにキャッシュされるため）

商品によって色を変える部位の**数や種類が違ってもよい**（メイン・内側・ステッチの3種類である
必要はない。例えば2種類だけの商品や、4種類ある商品も同じ仕組みで作れる）。

### 3. 色CSSを書く（`weeks/index.html` の `<style>` 内）

各クラスに対応する色変数を定義する。命名ルール：

```css
:root{
  --main-color:#XXXXXX;       /* 初期表示色（config.js の initial と一致させる） */
  --main-border:#XXXXXX;      /* 枠線が必要な場合のみ */
}
.c-main{ fill:var(--main-color); stroke:var(--main-border); stroke-miterlimit:10; stroke-width:.5px; transition:fill .35s ease, stroke .35s ease; }
```

床面など、選んだ色に連動して自動で変わる別パーツがある場合は、`c-main-suede` のように
別クラス＋別のCSS変数を用意する（`config.js` 側の `linked` でこの変数に値を流し込む。
詳しくは既存の `bible/index.html` と `bible/config.js` の `--main-suede-color` を参照）。

### 4. `weeks/config.js` を書き換える

```js
const SIMULATOR_CONFIG = {
  productPageUrl: "https://capyno.official.ec/items/【新商品のID】",

  disclaimer: "※表示される色はイメージです。<br>実際の革は、色合いや表情に個体差があります。<br>また、端末によって色味が異なる場合があります。",
  modalNote: "商品ページの「オプション」欄で、<br>ご希望のカラーを設定してから<br>ご注文をお願いいたします。",

  targets: [
    {
      key: "main",              // 内部識別子（半角英数字）。ラベルIDなどに使われる
      chipLabel: "メイン",        // チップに出る短いラベル
      fullLabel: "メインカラー",   // モーダルなどに出る正式名称
      cssVar: "--main-color",    // このターゲットが操作するCSS変数
      borderCssVar: "--main-border", // 枠線がなければ省略可
      initial: "ターコイズ",       // 初期選択色の name（下の colors 内と一致させる）
      colors: [
        { code: "1", name: "ピンク", hex: "#FF9BAD", border: "#D96F86" },
        // ... 商品のカラーコード表に合わせて追加
      ]
    },
    // 色の種類が2つ・4つなど3以外でもよい。targets配列に追加/削除するだけ。
  ]
};
```

**カラーコードは必ずデザイナー提供の正本PDF（`色コード表.pdf`のようなもの）と
一致させる。** 数値の書き写しミスがないよう、既存の `bible/config.js` と同様、
PDFの値をそのまま転記する。

### 5. `weeks/index.html` の商品固有の文言を直す

- `<title>`
- `<h1 class="visually-hidden">`（商品名がわかるように）
- Google Analyticsのタグはそのまま（サイト全体で同じ測定IDを共有し、
  GA4側はページパス［`/bible/`か`/weeks/`か］で自動的に商品ごとの閲覧を区別できる）

### 6. ローカルで確認する

このプロジェクトの `serve.js` を使うと、`site/` フォルダをそのままローカル配信できる
（`node serve.js` → `http://localhost:8123/weeks/`）。以下を必ず確認する：

- 8色 × 8色 × …（ターゲット数ぶん）の組み合わせが正しく反映されるか
- スマホの小さい画面（320×568程度）でもスクロールなしで1画面に収まるか
- 「商品ページへ戻る」→確認モーダル→OKで、正しい商品ページURLに遷移するか
  （`config.js` の `productPageUrl` を商品ごとに変え忘れないこと）

### 7. 公開する

このリポジトリの `main` ブランチにpushするだけで、GitHub Pagesに自動反映される
（追加設定不要。フォルダを増やすだけで新しいURLが公開される）。

```bash
git add weeks/
git commit -m "Add weeks-size color simulator"
git push
```

反映まで数分かかる場合がある（`https://github.com/capy-no-leather/capyno-color-simulator/deployments` で状況確認可）。

### 8. BASE商品ページにリンクを貼る

新しい商品ページの説明欄に、`?back=` パラメータ付きでリンクを貼る：

```
https://capy-no-leather.github.io/capyno-color-simulator/weeks/?back=https%3A%2F%2Fcapyno.official.ec%2Fitems%2F【新商品のID】
```
