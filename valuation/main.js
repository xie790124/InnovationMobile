        const tabsContainer = document.getElementById("brand-tabs");
        const cardsContainer = document.getElementById("cards-container");
        
        let globalCategorizedData = {}; 
        let currentBrand = ''; 

        document.addEventListener("DOMContentLoaded", function() {
            console.log("【步驟 1】網頁架構載入完畢，準備啟動讀取程序 (Step 1: DOM loaded, preparing to fetch)");
            fetchData();
        });

        async function fetchData() {
            try {
                // 已完美切換回原本的檔名，維持您的作業習慣 (Perfectly switched back to the original filename to maintain your workflow)
                const targetUrl = 'iphone_full_links.txt?t=' + new Date().getTime();
                console.log("【步驟 2】開始向伺服器請求檔案 (Step 2: Start fetching file): " + targetUrl);
                
                const response = await fetch(targetUrl);
                console.log("【步驟 3】伺服器回應狀態碼 (Step 3: Server status): " + response.status);
                
                if (!response.ok) throw new Error("HTTP Status: " + response.status);
                
                const text = await response.text();
                console.log("【步驟 4】成功讀取文字資料，總字元數 (Step 4: Characters read): " + text.length);
                
                processData(text);
            } catch (error) {
                console.error("【重大錯誤】(CRITICAL ERROR):", error);
                cardsContainer.innerHTML = `<div class="error-msg">
                    <h3>⚠️ 系統讀取失敗 (System Read Failed)</h3>
                    <p>請確認 <b>iphone_full_links.txt</b> 是否已上傳至伺服器。(Please ensure iphone_full_links.txt is uploaded.)</p>
                    <p style="font-size: 14px;">錯誤細節: ${error.message}</p>
                </div>`;
            }
        }

      function processData(text) {
            console.log("【步驟 5】開始解析文字內容 (Step 5: Start parsing text content)");
            const lines = text.split('\n').map(line => line.trim()).filter(line => line !== '');
            const parsedModels = [];

            for (let i = 0; i < lines.length; i++) {
                // 【新增功能】如果這一行以 # 或 // 開頭，直接跳過不讀取 (Skip lines starting with # or //)
                if (lines[i].startsWith('#') || lines[i].startsWith('//')) {
                    continue;
                }

                if (lines[i].startsWith('http') && lines[i].includes('sogi.com.tw')) {
                    if (lines[i].includes('/usedprices/')) {
                        if (i > 0) {
                            let prevLine = lines[i-1];
                            // 確保標題行本身也不是註解 (Ensure the title line itself is not a comment)
                            if (!prevLine.startsWith('#') && !prevLine.startsWith('//') && !prevLine.startsWith('http')) {
                                let title = prevLine.split('] ').pop().trim(); 
                                parsedModels.push({ title: title, url: lines[i] });
                            }
                        }
                    }
                }
            }

            console.log("【步驟 6】解析完成，找到有效資料數: " + parsedModels.length);

            if (parsedModels.length === 0) {
                cardsContainer.innerHTML = `<div class="error-msg"><h3>⚠️ 資料庫內容無效</h3></div>`;
                return;
            }

            globalCategorizedData = categorizeBrandsAndModels(parsedModels);
            renderBrandTabs();
        }

     function categorizeBrandsAndModels(models) {
            const brandsData = {};

            models.forEach(model => {
                let title = model.title;
                let upperTitle = title.toUpperCase(); 
                
                let brand = "其他品牌 (Others)";
                let seriesName = "其他型號 (Other Models)";

                if (upperTitle.includes("APPLE") || upperTitle.includes("IPHONE")) {
                    brand = "Apple";
                    if (upperTitle.includes("IPHONE 17")) seriesName = "iPhone 17 系列 (Series)";
                    else if (upperTitle.includes("IPHONE 16")) seriesName = "iPhone 16 系列 (Series)";
                    else if (upperTitle.includes("IPHONE 15")) seriesName = "iPhone 15 系列 (Series)";
                    else if (upperTitle.includes("IPHONE 14")) seriesName = "iPhone 14 系列 (Series)";
                    else if (upperTitle.includes("IPHONE 13")) seriesName = "iPhone 13 系列 (Series)";
                    else if (upperTitle.includes("IPHONE 12")) seriesName = "iPhone 12 系列 (Series)";
                    else if (upperTitle.includes("IPHONE 11")) seriesName = "iPhone 11 系列 (Series)";
                    else if (upperTitle.includes("IPHONE X")) seriesName = "iPhone X 系列 (Series)";
                    else if (upperTitle.includes("IPHONE SE")) seriesName = "iPhone SE 系列 (Series)";
                    else if (upperTitle.includes("IPHONE 8") || upperTitle.includes("IPHONE 7")) seriesName = "iPhone 8/7 系列 (Series)";
                    else if (upperTitle.includes("AIR")) seriesName = "iPhone Air 系列 (Series)";
                    else if (upperTitle.includes("IPAD")) seriesName = "iPad 系列 (Series)";
                    else if (upperTitle.includes("WATCH")) seriesName = "Watch 系列 (Series)";
                    else seriesName = "其他 iPhone (Other iPhones)";
                } 
                else if (upperTitle.includes("SAMSUNG") || upperTitle.includes("GALAXY")) {
                    brand = "SAMSUNG";
                    if (upperTitle.includes("GALAXY S")) seriesName = "Galaxy S 系列 (頂級旗艦)";
                    else if (upperTitle.includes("GALAXY Z")) seriesName = "Galaxy Z 系列 (折疊螢幕)";
                    else if (upperTitle.includes("NOTE")) seriesName = "Galaxy Note 系列 (Series)";
                    else if (upperTitle.includes("GALAXY A")) {
                        if (upperTitle.includes("A5")) seriesName = "Galaxy A5 系列 (中高階)";
                        else if (upperTitle.includes("A3")) seriesName = "Galaxy A3 系列 (中階)";
                        else if (upperTitle.includes("A2") || upperTitle.includes("A1") || upperTitle.includes("A0")) seriesName = "Galaxy A2/A1/A0 系列 (入門)";
                        else seriesName = "Galaxy A 系列 (其他)";
                    }
                    else if (upperTitle.includes("GALAXY M")) seriesName = "Galaxy M 系列 (中階)";
                    else if (upperTitle.includes("TAB")) seriesName = "Galaxy Tab 系列 (平版)";
                    else seriesName = "其他 Samsung (Other Samsungs)";
                } 
                else if (upperTitle.includes("OPPO")) {
                    brand = "OPPO";
                    if (upperTitle.includes("RENO")) seriesName = "OPPO Reno 系列 (中高階手機)";
                    else if (upperTitle.includes("FIND")) seriesName = "OPPO Find 系列 (頂級旗艦)";
                    else if (upperTitle.includes(" A")) seriesName = "OPPO A 系列 (入門至中階)";
                    else seriesName = "其他 OPPO (Other OPPOs)";
                } 
                else if (upperTitle.includes("VIVO")) {
                    brand = "vivo";
                    if (upperTitle.includes(" X")) seriesName = "vivo X 系列 (頂級旗艦)";
                    else if (upperTitle.includes(" V")) seriesName = "vivo V 系列 (中高階)";
                    else if (upperTitle.includes(" Y")) seriesName = "vivo Y 系列 (高 CP 值)";
                    else seriesName = "其他 vivo (Other vivos)";
                }
                else if (upperTitle.includes("ASUS") || upperTitle.includes("ZENFONE") || upperTitle.includes("ROG")) {
                    brand = "ASUS";
                    if (upperTitle.includes("ROG")) seriesName = "ROG 系列 (Series)";
                    else if (upperTitle.includes("ZENFONE")) seriesName = "Zenfone 系列 (Series)";
                    else seriesName = "其他 ASUS (Other ASUS)";
                }   
                else if (upperTitle.includes("小米") || upperTitle.includes("XIAOMI") || upperTitle.includes("REDMI")) {
                    brand = "小米";
                    if (upperTitle.includes("XIAOMI")) seriesName = "Xiaomi 系列 (Series)";
                    else if (upperTitle.includes("REDMI")) seriesName = "Redmi 系列 (Series)";
                    else seriesName = "其他 小米 (Other 小米)";
                }
                else {
                    let parts = title.split(' ');
                    brand = parts.length > 0 ? parts[0] : "其他 (Others)";
                    seriesName = "所有機型 (All Models)";
                }

                if (!brandsData[brand]) brandsData[brand] = {};
                if (!brandsData[brand][seriesName]) brandsData[brand][seriesName] = [];
                brandsData[brand][seriesName].push(model);
            });

            // 【終極排序核心】 (Ultimate Sorting Core)
            Object.keys(brandsData).forEach(b => {
                const seriesObj = brandsData[b];

                Object.keys(seriesObj).forEach(seriesName => {
                    seriesObj[seriesName].sort((modelA, modelB) => {
                        let tA = modelA.title.toUpperCase();
                        let tB = modelB.title.toUpperCase();

                        // 1. 代數排序 (S26 > S25 > S24)
                        let genA = extractNumberFromString(tA);
                        let genB = extractNumberFromString(tB);
                        if (genA !== genB) return genB - genA;

                        // 2. 效能等級排序 (Ultra > Pro Max > Pro...)
                        const modelKeywords = ["ULTRA", "PRO MAX", "PRO", "PLUS", "AIR", "MINI", "FE"];
                        let getWeight = (t) => {
                            for (let i = 0; i < modelKeywords.length; i++) {
                                if (t.includes(modelKeywords[i])) return i;
                            }
                            return 99; 
                        };
                        let wA = getWeight(tA);
                        let wB = getWeight(tB);
                        if (wA !== wB) return wA - wB;

                        // 3. 容量大小排序 (1TB > 512GB > 256GB)
                        let getCapacity = (t) => {
                            if (t.includes("1TB")) return 1000;
                            if (t.includes("512GB")) return 512;
                            if (t.includes("256GB")) return 256;
                            if (t.includes("128GB")) return 128;
                            if (t.includes("64GB")) return 64;
                            return 0;
                        };
                        return getCapacity(tB) - getCapacity(tA); 
                    });
                });

                // 4. 系列區塊本身的效能階級排序
                const seriesTierList = [
                    "iPhone 17", "iPhone 16", "iPhone 15", "iPhone 14", "iPhone 13", "iPhone 12", "iPhone 11", "iPhone X", "iPad 系列", "iPhone SE", "iPhone 8", "iPhone Air",
                     "Galaxy S",   
                     "Galaxy A5", "Galaxy A3", "Galaxy A2/A1/A0", "Galaxy A","Galaxy Tab","Galaxy Z","Galaxy M","Galaxy Note",
                    "OPPO Find", "OPPO Reno", "OPPO A",
                    "vivo X", "vivo V", "vivo Y",
                    "ROG 系列", "Zenfone 系列",
                    "Xiaomi 系列", "Redmi 系列",
                    "Watch 系列"
                ];

                const sortedArray = Object.keys(seriesObj)
                    .sort((a, b) => {
                        let getTierWeight = (s) => {
                            for (let i = 0; i < seriesTierList.length; i++) {
                                if (s.includes(seriesTierList[i])) return i;
                            }
                            return 999;
                        };
                        let tierA = getTierWeight(a);
                        let tierB = getTierWeight(b);
                        if (tierA !== tierB) return tierA - tierB;
                        return extractNumberFromString(b) - extractNumberFromString(a);
                    })
                    .map(key => ({ seriesName: key, models: seriesObj[key] }));
                    
                brandsData[b] = sortedArray;
            });

            return brandsData;
        }

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

       function renderBrandTabs() {
            // 取得所有已分類的品牌名稱 (Get all categorized brand names)
            let brands = Object.keys(globalCategorizedData);
            
            // 【核心升級：自訂常用品牌順序】 (Core Upgrade: Custom order for frequently used brands)
            // 您可以在這裡隨意更改順序，越前面的會排在越左邊 (You can freely change the order here; the earlier ones will be placed further to the left)
            const topBrands = ["Apple", "SAMSUNG", "OPPO", "vivo", "小米", "ASUS"];

            brands.sort((a, b) => {
                let indexA = topBrands.indexOf(a);
                let indexB = topBrands.indexOf(b);

                // 如果品牌不在常用清單中，賦予最低權重 999 排到最後面 
                // (If the brand is not in the frequent list, assign the lowest weight 999 to push it to the end)
                if (indexA === -1) indexA = 999;
                if (indexB === -1) indexB = 999;

                // 如果權重相同（例如都不在清單內），則照英文字母順序排
                // (If weights are the same, e.g., neither is in the list, sort alphabetically)
                if (indexA === indexB) {
                    return a.localeCompare(b);
                }
                return indexA - indexB;
            });

            tabsContainer.innerHTML = "";
            
            // 如果沒有選取的品牌，預設直接選取排在第一順位的常用品牌
            // (If no brand is selected, default to selecting the first frequently used brand in the order)
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
            console.log("【步驟 8】畫面渲染完畢，系統啟動成功 (Step 8: UI rendering complete, system started successfully)");
        }

        function renderCategorizedCards(brand) {
            cardsContainer.innerHTML = ""; 
            const data = globalCategorizedData[brand] || [];

            data.forEach(series => {
                const titleEl = document.createElement("div");
                titleEl.className = "series-title";
                titleEl.textContent = series.seriesName;
                cardsContainer.appendChild(titleEl);

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
