/* 二つ折りパスケース 用の設定
   選択項目はシステム手帳バイブルサイズと同じ（メイン・内側・ステッチの3種類、
   メインカラーに床面色が連動）。
*/
const SIMULATOR_CONFIG = {
  productPageUrl: "https://capyno.official.ec/items/133966633",

  disclaimer: "※表示される色はイメージです。<br>実際の革は、色合いや表情に個体差があります。<br>また、端末によって色味が異なる場合があります。",
  modalNote: "商品ページの「オプション」欄で、<br>ご希望のカラーを設定してから<br>ご注文をお願いいたします。",

  targets: [
    {
      key: "main",
      chipLabel: "メイン",
      fullLabel: "メインカラー",
      cssVar: "--main-color",
      borderCssVar: "--main-border",
      initial: "ダークブラウン",
      colors: [
        { code: "1", name: "ピンク",         hex: "#FF9BAD", border: "#D96F86", linked: { "--main-suede-color": "#E8787D" } },
        { code: "2", name: "イエロー",       hex: "#FFB231", border: "#D98C18", linked: { "--main-suede-color": "#EFA13A" } },
        { code: "3", name: "グリーン",       hex: "#B5B07D", border: "#8F8A5D", linked: { "--main-suede-color": "#9C9168" } },
        { code: "4", name: "ターコイズ",     hex: "#1E9FA4", border: "#16777B", linked: { "--main-suede-color": "#168F98" } },
        { code: "5", name: "ブルー",         hex: "#48769D", border: "#365A78", linked: { "--main-suede-color": "#527994" } },
        { code: "6", name: "ブラック",       hex: "#2C2F35", border: "#191B1F", linked: { "--main-suede-color": "#35383D" } },
        { code: "7", name: "ブラウン",       hex: "#DFA272", border: "#B97A4E", linked: { "--main-suede-color": "#C77C4A" } },
        { code: "8", name: "ダークブラウン", hex: "#9E695F", border: "#754A43", linked: { "--main-suede-color": "#68413D" } }
      ]
    },
    {
      key: "inner",
      chipLabel: "内側",
      fullLabel: "内側カラー",
      cssVar: "--inner-color",
      borderCssVar: "--inner-border",
      initial: "グリーン",
      colors: [
        { code: "1", name: "ピンク",         hex: "#FF9BAD", border: "#D96F86" },
        { code: "2", name: "イエロー",       hex: "#FFB231", border: "#D98C18" },
        { code: "3", name: "グリーン",       hex: "#B5B07D", border: "#8F8A5D" },
        { code: "4", name: "ターコイズ",     hex: "#1E9FA4", border: "#16777B" },
        { code: "5", name: "ブルー",         hex: "#48769D", border: "#365A78" },
        { code: "6", name: "ブラック",       hex: "#2C2F35", border: "#191B1F" },
        { code: "7", name: "ブラウン",       hex: "#DFA272", border: "#B97A4E" },
        { code: "8", name: "ダークブラウン", hex: "#9E695F", border: "#754A43" }
      ]
    },
    {
      key: "thread",
      chipLabel: "ステッチ",
      fullLabel: "ステッチカラー",
      cssVar: "--thread-color",
      initial: "グリーン",
      colors: [
        { code: "a", name: "ピンク",         hex: "#FFCCD7" },
        { code: "b", name: "イエロー",       hex: "#FEBE0A" },
        { code: "c", name: "グリーン",       hex: "#C7D08B" },
        { code: "d", name: "ターコイズ",     hex: "#028284" },
        { code: "e", name: "ブルー",         hex: "#25549B" },
        { code: "f", name: "ブラック",       hex: "#000000" },
        { code: "g", name: "ブラウン",       hex: "#E4AE7E" },
        { code: "h", name: "ダークブラウン", hex: "#67423B" }
      ]
    }
  ]
};
