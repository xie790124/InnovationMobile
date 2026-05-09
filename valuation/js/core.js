/**
 * 核心引擎 (Core Engine)
 * 負責：檔案讀取、按鈕渲染、排序控制、多來源切換
 */

const tabsContainer = document.getElementById("brand-tabs");
const cardsContainer = document.getElementById("cards-container");

let globalCategorizedData = {}; 
let currentBrand = ''; 
let currentSourceFile = 'iphone_full_links.txt'; // 預設讀取手機王檔案

// 1. 初始化系統：當 HTML 載入完成後，先去載入預設的 SOGI 邏輯
document.addEventListener("DOMContentLoaded", () => {
    switchSource('sogi'); 
});

// 2. 切換資料來源 (Switch Data Source)
function switchSource(source) {
    cardsContainer.innerHTML = `<div class="status-msg">正在載入 ${source === 'sogi' ? '手機王' : '創宇回收'} 的系統邏輯...</div>`;
    tabsContainer.innerHTML = '';
    currentBrand = '';

    // 移除舊的邏輯腳本
    let oldScript = document.getElementById('source-logic');
    if (oldScript) oldScript.remove();

    // 建立新的腳本標籤
    let script = document.createElement('script');
    script.id = 'source-logic';
    script.src = `js/${source}_config.js`; 
    
    // 【關鍵】確保邏輯檔載入完成後，才開始執行抓取與渲染
    script.onload = () => {
        console.log(`✅ ${source}_config.js 載入成功`);
        
        // 根據來源決定對應的 TXT 資料庫檔案
        currentSourceFile = (source === 'sogi') ? 'iphone_full_links.txt' : 'chuangyu_links.txt';
        
        fetchData(); 
    };

    script.onerror = () => {
cardsContainer.innerHTML = `<div class="error-msg">找不到 js/${source}_config.js 檔案！請檢查資料夾。</div>`;
    };

    document.body.appendChild(script);
}

// 3. 抓取文字資料庫 (Fetch Data)
async function fetchData() {
    try {
        const targetUrl = currentSourceFile + '?t=' + new Date().getTime(); // 防止快取
        const response = await fetch(targetUrl);
        
        if (!response.ok) throw new Error("HTTP Status: " + response.status);
        
        const text = await response.text();
        processData(text);
    } catch (error) {
        console.error("讀取失敗:", error);
        cardsContainer.innerHTML = `<div class="error-msg"><h3>⚠️ 資料庫讀取失敗</h3><p>請確認 ${currentSourceFile} 是否已上傳至伺服器。</p></div>`;
    }
}

// 4. 解析文字內容 (Process Text)
function processData(text) {
    // 依行切割，移除前後空白，並過濾掉空行
    const lines = text.split('\n').map(line => line.trim()).filter(line => line !== '');
    const parsedModels = [];

    for (let i = 0; i < lines.length; i++) {
        // A. 過濾註解行 (以 # 或 // 開頭)
        if (lines[i].startsWith('#') || lines[i].startsWith('//')) continue;

        // B. 偵測網址 (必須包含 http)
        if (lines[i].startsWith('http')) {
            if (i > 0) {
                let prevLine = lines[i-1];
                // C. 檢查前一行是否為有效名稱 (不能是註解、不能是另一個網址)
                if (!prevLine.startsWith('#') && !prevLine.startsWith('//') && !prevLine.startsWith('http')) {
                    
                    // D. 黑名單過濾 (排除快速檢視與 qview)
                    let isInvalid = prevLine === "快速檢視" || prevLine === "比較" || prevLine === "" || lines[i].includes("qview");
                    
                    if (!isInvalid) {
                        // 處理手機王常見的 [二手報價] 標籤前綴
                        let title = prevLine.split('] ').pop().trim(); 
                        parsedModels.push({ title: title, url: lines[i] });
                    }
                }
            }
        }
    }

    if (parsedModels.length === 0) {
        cardsContainer.innerHTML = `<div class="error-msg"><h3>⚠️ 無法讀取到有效型號</h3><p>請檢查 ${currentSourceFile} 的格式。</p></div>`;
        return;
    }

    // 呼叫載入的 config.js 裡面的分類函式
    globalCategorizedData = categorizeBrandsAndModels(parsedModels);
    renderBrandTabs();
}

// 5. 渲染品牌頁籤 (Render Tabs)
function renderBrandTabs() {
    let brands = Object.keys(globalCategorizedData);
    
    // 自訂排序：將常用的排在前面
    const topBrands = ["Apple", "SAMSUNG", "OPPO", "vivo", "ASUS", "小米"];

    brands.sort((a, b) => {
        let indexA = topBrands.indexOf(a);
        let indexB = topBrands.indexOf(b);
        if (indexA === -1) indexA = 999;
        if (indexB === -1) indexB = 999;
        if (indexA === indexB) return a.localeCompare(b);
        return indexA - indexB;
    });

    tabsContainer.innerHTML = "";
    
    // 如果目前沒有選取品牌，預設選取第一個
    if (!currentBrand || !brands.includes(currentBrand)) {
        currentBrand = brands[0];
    }

    brands.forEach(brand => {
        const btn = document.createElement("button");
        btn.className = "brand-tab " + (brand === currentBrand ? "active" : "");
        btn.textContent = brand;
        
        btn.onclick = () => {
            currentBrand = brand;
            Array.from(tabsContainer.children).forEach(c => c.classList.remove("active"));
            btn.classList.add("active");
            renderCategorizedCards(currentBrand);
        };
        tabsContainer.appendChild(btn);
    });

    renderCategorizedCards(currentBrand);
}

// 6. 渲染手機卡片 (Render Cards)
function renderCategorizedCards(brand) {
    cardsContainer.innerHTML = ""; 
    const data = globalCategorizedData[brand] || [];

    data.forEach(series => {
        // 建立系列標題
        const titleEl = document.createElement("div");
        titleEl.className = "series-title";
        titleEl.textContent = series.seriesName;
        cardsContainer.appendChild(titleEl);

        // 建立卡片網格容器
        const gridEl = document.createElement("div");
        gridEl.className = "grid-container";

        series.models.forEach(model => {
            const cardEl = document.createElement("a");
            cardEl.href = model.url;
            cardEl.target = "_blank";
            cardEl.textContent = model.title;
            cardEl.className = "card";
            gridEl.appendChild(cardEl);
        });
        cardsContainer.appendChild(gridEl);
    });
}

// 7. 輔助函式：提取字串中的數字（用於排序）
function extractNumberFromString(str) {
    let numStr = "";
    for(let i = 0; i < str.length; i++) {
        if (str[i] >= '0' && str[i] <= '9') {
            numStr += str[i];
        } else if (numStr.length > 0) {
            break;
        }
    }
    return numStr.length > 0 ? parseInt(numStr, 10) : 0;
}
