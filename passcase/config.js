/* パスケース 用の設定
   選べる色は「メインカラー」「ベースカラー」の2ヶ所のみ。
   ステッチカラーは独立選択させず、メインカラーの選択に応じて
   自動で対応する色（同じ番号/記号の組み合わせ）に変わる（linkedで指定）。
*/
const SIMULATOR_CONFIG = {
  productPageUrl: "https://capyno.official.ec/items/115994479",

  disclaimer: "※表示される色はイメージです。<br>実際の革は、色合いや表情に個体差があります。<br>また、端末によって色味が異なる場合があります。",
  modalNote: "商品ページの「オプション」欄で、<br>ご希望のカラーを設定してから<br>ご注文をお願いいたします。",

  targets: [
    {
      key: "main",
      chipLabel: "メイン",
      fullLabel: "メインカラー",
      cssVar: "--main-color",
      borderCssVar: "--main-border",
      initial: "ピンク",
      colors: [
        { code: "1", name: "ピンク",         hex: "#FF9BAD", border: "#D96F86", linked: { "--thread-color": "#FFCCD7" } },
        { code: "2", name: "イエロー",       hex: "#F8BA33", border: "#D98C18", linked: { "--thread-color": "#FFB231" } },
        { code: "3", name: "グリーン",       hex: "#B5B07D", border: "#8F8A5D", linked: { "--thread-color": "#C7D08B" } },
        { code: "4", name: "ターコイズ",     hex: "#1E9FA4", border: "#16777B", linked: { "--thread-color": "#028284" } },
        { code: "5", name: "ブルー",         hex: "#48769D", border: "#365A78", linked: { "--thread-color": "#25549B" } },
        { code: "6", name: "ブラック",       hex: "#2C2F35", border: "#191B1F", linked: { "--thread-color": "#000000" } },
        { code: "7", name: "ブラウン",       hex: "#DFA272", border: "#B97A4E", linked: { "--thread-color": "#C6967C" } },
        { code: "8", name: "ダークブラウン", hex: "#9E695F", border: "#754A43", linked: { "--thread-color": "#67423B" } }
      ]
    },
    {
      key: "base",
      chipLabel: "ベース",
      fullLabel: "ベースカラー",
      cssVar: "--base-color",
      borderCssVar: "--base-border",
      initial: "ブルー",
      colors: [
        { code: "1", name: "ピンク",         hex: "#FF9BAD", border: "#D96F86" },
        { code: "2", name: "イエロー",       hex: "#F8BA33", border: "#D98C18" },
        { code: "3", name: "グリーン",       hex: "#B5B07D", border: "#8F8A5D" },
        { code: "4", name: "ターコイズ",     hex: "#1E9FA4", border: "#16777B" },
        { code: "5", name: "ブルー",         hex: "#48769D", border: "#365A78" },
        { code: "6", name: "ブラック",       hex: "#2C2F35", border: "#191B1F" },
        { code: "7", name: "ブラウン",       hex: "#DFA272", border: "#B97A4E" },
        { code: "8", name: "ダークブラウン", hex: "#9E695F", border: "#754A43" }
      ]
    }
  ]
};
