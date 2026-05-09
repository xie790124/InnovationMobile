const tabsContainer = document.getElementById("brand-tabs");
const cardsContainer = document.getElementById("cards-container");
let globalCategorizedData = {}; 
let currentBrand = ''; 
let currentSourceFile = 'iphone_full_links.txt'; // 預設檔案

// 1. 網頁一載入時，【千萬不要】直接執行 fetchData！
// (Do NOT execute fetchData directly on load!)
document.addEventListener("DOMContentLoaded", () => {
    // 而是呼叫切換來源的函式，讓它按順序去載入外部腳本
    // (Instead, call the switch function to load external scripts in order)
    switchSource('sogi'); 
});

// 2. 切換資料來源與動態載入 JS
function switchSource(source) {
    cardsContainer.innerHTML = `<div class="status-msg">正在載入 ${source} 的系統邏輯，請稍候...</div>`;
    tabsContainer.innerHTML = '';
    currentBrand = '';

    // 移除舊的邏輯檔 (Remove old logic file)
    let oldScript = document.getElementById('source-logic');
    if (oldScript) oldScript.remove();

    // 建立新的腳本標籤來載入 sogi_config.js 或 chuangyu_config.js
    let script = document.createElement('script');
    script.id = 'source-logic';
    script.src = `js/${source}_config.js`; 
    
    // 【核心修復：等待機制】(Core Fix: Wait Mechanism)
    // 必須等到這個 js 檔案 100% 載入完成，才允許去抓資料！
    script.onload = () => {
        console.log(`✅ ${source}_config.js 載入成功，大腦已連線！`);
        
        // 根據來源決定要讀取哪個 TXT 檔
        currentSourceFile = (source === 'sogi') ? 'iphone_full_links.txt' : 'chuangyu_links.txt';
        
        // 食譜準備好了，現在才開始做菜！
        fetchData(); 
    };

    script.onerror = () => {
        console.error(`找不到 js/${source}_config.js 檔案！`);
        cardsContainer.innerHTML = `<div class="error-msg">找不到 ${source} 的設定檔，請確認 js 資料夾內是否有該檔案。</div>`;
    };

    document.body.appendChild(script);
}

// ... 下方繼續保留您原本的 async function fetchData() { ... } 
// 與 function processData(text) { ... }
