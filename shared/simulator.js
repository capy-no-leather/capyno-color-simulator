/* capy-no カラーシミュレーター 共通エンジン
   商品ごとの見た目・色数はすべて設定オブジェクト（config）で渡す。
   新商品を追加する場合は、このファイルは変更せず、
   商品フォルダの config.js とアートワークSVGだけを用意すればよい。

   config の形は README.md の「新しい商品シミュレーターの作り方」を参照。
*/
(function () {
  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (m) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    }[m]));
  }

  function renderControls(config, container) {
    const chipsHtml = config.targets.map((t, i) => {
      const initialColor = t.colors.find(c => c.name === t.initial);
      return `
        <button class="chip${i === 0 ? " active" : ""}" data-target="${t.key}">
          <span class="swatch-dot" style="background:${initialColor.hex}"></span>
          <span class="chip-text"><span class="chip-label">${escapeHtml(t.chipLabel)}</span><span class="chip-value" id="label-${t.key}">${escapeHtml(t.initial)}</span></span>
        </button>`;
    }).join("");

    container.innerHTML = `
      <div class="summary">${chipsHtml}</div>
      <div class="palette-row" id="palette-grid"></div>
      <div class="foot-row"><span class="active-label" id="active-label"></span></div>
      <button class="back-btn" id="back-btn"><span>${escapeHtml(config.backButtonLabel || "商品ページへ戻る")}</span></button>
      ${config.disclaimer ? `<p class="disclaimer">${config.disclaimer}</p>` : ""}
    `;
  }

  function renderModalShell(config, container) {
    container.innerHTML = `
      <div class="modal-card">
        <p class="modal-title">${escapeHtml(config.modalTitle || "選んだ配色はこちらです")}</p>
        <div class="modal-colors" id="modal-colors"></div>
        <p class="modal-note">${config.modalNote || ""}</p>
        <button class="modal-ok" id="modal-ok">OK</button>
        <button class="modal-cancel" id="modal-cancel">${escapeHtml(config.modalCancelLabel || "シミュレーションに戻る")}</button>
      </div>
    `;
  }

  function isSafeHttpUrl(url) {
    try {
      const u = new URL(url, window.location.href);
      return u.protocol === "http:" || u.protocol === "https:";
    } catch {
      return false;
    }
  }

  // 「商品ページへ戻る」の遷移先を、確実性の高い順に解決する。
  // 1. リンクに付与された ?back=<商品ページURL>
  // 2. document.referrer（同一タブでの遷移時のみ・ブラウザ設定で空になる場合あり）
  // 3. config.productPageUrl（固定URL）
  // 4. history.back()（最終手段）
  function resolveBackUrl(productPageUrl) {
    const paramBack = new URLSearchParams(window.location.search).get("back");
    if (paramBack && isSafeHttpUrl(paramBack)) return paramBack;

    if (document.referrer && isSafeHttpUrl(document.referrer)) return document.referrer;

    if (productPageUrl && isSafeHttpUrl(productPageUrl)) return productPageUrl;

    return null;
  }

  function init(config) {
    if (!config || !Array.isArray(config.targets) || config.targets.length === 0) {
      throw new Error("ColorSimulator.init: config.targets is required");
    }

    const root = document.documentElement;
    const state = {};
    config.targets.forEach(t => { state[t.key] = t.initial; });
    let activeTarget = config.targets[0].key;

    const controlsEl = document.getElementById("controls");
    const modalOverlayEl = document.getElementById("modal-overlay");
    renderControls(config, controlsEl);
    renderModalShell(config, modalOverlayEl);

    const grid = document.getElementById("palette-grid");
    const activeLabelEl = document.getElementById("active-label");
    const modalColors = document.getElementById("modal-colors");

    function findTarget(key) { return config.targets.find(t => t.key === key); }
    function findColor(key, name) { return findTarget(key).colors.find(c => c.name === name); }

    function applyColor(key, colorName) {
      const t = findTarget(key);
      const c = findColor(key, colorName);
      state[key] = colorName;
      root.style.setProperty(t.cssVar, c.hex);
      if (t.borderCssVar && c.border) {
        root.style.setProperty(t.borderCssVar, c.border);
      }
      // linked: 選んだ色に連動して変化する追加のCSS変数（例:床面カラー）
      if (c.linked) {
        Object.entries(c.linked).forEach(([varName, val]) => root.style.setProperty(varName, val));
      }
      const labelEl = document.getElementById(`label-${key}`);
      if (labelEl) labelEl.textContent = c.name;
      const dotEl = document.querySelector(`.chip[data-target="${key}"] .swatch-dot`);
      if (dotEl) dotEl.style.background = c.hex;
    }

    function renderPalette() {
      grid.innerHTML = "";
      findTarget(activeTarget).colors.forEach(c => {
        const btn = document.createElement("button");
        btn.className = "swatch";
        btn.style.background = c.hex;
        btn.title = c.name;
        btn.setAttribute("aria-label", c.name);
        if (c.name === state[activeTarget]) btn.classList.add("selected");
        btn.addEventListener("click", () => {
          applyColor(activeTarget, c.name);
          renderPalette();
        });
        grid.appendChild(btn);
      });
    }

    function setActiveTarget(key) {
      activeTarget = key;
      document.querySelectorAll(".chip").forEach(el => {
        el.classList.toggle("active", el.dataset.target === key);
      });
      activeLabelEl.textContent = `${findTarget(key).fullLabel}を選択中`;
      renderPalette();
    }

    document.querySelectorAll(".chip").forEach(chip => {
      chip.addEventListener("click", () => setActiveTarget(chip.dataset.target));
    });

    function openConfirmModal() {
      modalColors.innerHTML = "";
      config.targets.forEach(t => {
        const c = findColor(t.key, state[t.key]);
        const row = document.createElement("div");
        row.className = "modal-color-row";
        row.innerHTML = `
          <span class="dot" style="background:${c.hex}"></span>
          <span>
            <span class="label">${escapeHtml(t.fullLabel)}</span>
            <span class="value">${escapeHtml(c.code)}.${escapeHtml(c.name)}</span>
          </span>`;
        modalColors.appendChild(row);
      });
      modalOverlayEl.classList.add("open");
    }

    document.getElementById("back-btn").addEventListener("click", openConfirmModal);

    document.getElementById("modal-ok").addEventListener("click", () => {
      const backUrl = resolveBackUrl(config.productPageUrl);
      if (backUrl) {
        window.location.href = backUrl;
      } else {
        window.history.back();
      }
    });

    document.getElementById("modal-cancel").addEventListener("click", () => {
      modalOverlayEl.classList.remove("open");
    });

    // 初期カラーを反映（アートワークのCSS初期値とconfigの初期値を一致させる）
    config.targets.forEach(t => applyColor(t.key, t.initial));
    setActiveTarget(config.targets[0].key);
  }

  window.ColorSimulator = { init };
})();
