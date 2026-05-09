// js/chuangyu_config.js
// 創宇專用分類大腦：具備智慧補全品牌功能與頂級排序邏輯 (包含最新 Samsung A 系列更新)

function categorizeBrandsAndModels(models) {
    const brandsData = {};

    models.forEach(model => {
        let title = model.title;
        let upperTitle = title.toUpperCase(); 
        
        let brand = "其他品牌 (Others)";
        let seriesName = "未分類型號 (Uncategorized)";

        // 1. Apple (蘋果)
        if (upperTitle.includes("IPHONE") || upperTitle.includes("IPAD") || upperTitle.includes("WATCH") || upperTitle.includes("APPLE") || upperTitle.includes("MINI 第")) {
            brand = "Apple";
            if (upperTitle.includes("IPHONE 17")) seriesName = "iPhone 17 系列 (Series)";
            else if (upperTitle.includes("IPHONE 16")) seriesName = "iPhone 16 系列 (Series)";
            else if (upperTitle.includes("IPHONE 15")) seriesName = "iPhone 15 系列 (Series)";
            else if (upperTitle.includes("IPHONE 14")) seriesName = "iPhone 14 系列 (Series)";
            else if (upperTitle.includes("IPHONE 13")) seriesName = "iPhone 13 系列 (Series)";
            else if (upperTitle.includes("IPHONE 12")) seriesName = "iPhone 12 系列 (Series)";
            else if (upperTitle.includes("IPHONE 11")) seriesName = "iPhone 11 系列 (Series)";
            else if (upperTitle.includes("IPHONE X")) seriesName = "iPhone X 系列 (Series)";
            else if (upperTitle.includes("IPHONE 8") || upperTitle.includes("IPHONE 7")) seriesName = "iPhone 8/7 系列 (Series)";
            else if (upperTitle.includes("SE")) seriesName = "iPhone SE 系列 (Series)";
            else if (upperTitle.includes("IPAD PRO")) seriesName = "iPad Pro 系列 (Series)";
            else if (upperTitle.includes("IPAD AIR")) seriesName = "iPad Air 系列 (Series)";
            else if (upperTitle.includes("IPAD MINI") || upperTitle.includes("MINI 第") || upperTitle.includes("MINI 4")) seriesName = "iPad mini 系列 (Series)";
            else if (upperTitle.includes("IPAD")) seriesName = "iPad 數字系列 (Series)";
            else seriesName = "Apple 其他產品";
        }
        // 2. Google (嚴格比對 Pixel)
        else if (upperTitle.includes("PIXEL")) {
            brand = "Google";
            if (upperTitle.includes("PIXEL 10")) seriesName = "Pixel 10 系列";
            else if (upperTitle.includes("PIXEL 9")) seriesName = "Pixel 9 系列";
            else if (upperTitle.includes("PIXEL 8")) seriesName = "Pixel 8 系列";
            else if (upperTitle.includes("PIXEL 7")) seriesName = "Pixel 7 系列";
            else if (upperTitle.includes("PIXEL 6")) seriesName = "Pixel 6 系列";
            else seriesName = "Google 其他系列";
        }
        // 3. Sony
        else if (upperTitle.includes("XPERIA")) {
            brand = "Sony";
            seriesName = "Xperia 系列";
        }
        // 4. ASUS
        else if (upperTitle.includes("ROG") || upperTitle.includes("ZENFONE")) {
            brand = "ASUS";
            if (upperTitle.includes("ROG")) seriesName = "ROG Phone 電競系列";
            else seriesName = "Zenfone 系列";
        }
        // 5. SHARP
        else if (upperTitle.includes("AQUOS")) {
            brand = "SHARP";
            seriesName = "AQUOS 系列";
        }
        // 6. Nothing
        else if (upperTitle.includes("NOTHING") || upperTitle.includes("PHONE (") || upperTitle.includes("CMF")) {
            brand = "Nothing";
            seriesName = "Nothing / CMF 系列";
        }
        // 7. HTC
        else if (upperTitle.includes("U24") || upperTitle.includes("U23") || upperTitle.includes("U20") || upperTitle.includes("DESIRE")) {
            brand = "HTC";
            seriesName = "HTC 系列";
        }
        // 8. Motorola
        else if (upperTitle.includes("EDGE") || upperTitle.includes("RAZR") || upperTitle.includes("MOTOROLA") || upperTitle.includes("G82") || upperTitle.includes("G62") || upperTitle.includes("G51") || upperTitle.includes("G34") || upperTitle.includes("E32") || upperTitle.includes("E40")) {
            brand = "Motorola";
            if (upperTitle.includes("RAZR")) seriesName = "Razr 摺疊系列";
            else if (upperTitle.includes("EDGE")) seriesName = "Edge 系列";
            else seriesName = "Moto G / E 系列";
        }
        // 9. Realme (放在小米前面抓取 GT 系列)
        else if (upperTitle.includes("GT") || upperTitle.includes("NARZO") || upperTitle.includes("REALME") || upperTitle.includes("12+") || upperTitle.includes("11 PRO+")) {
            brand = "Realme";
            if (upperTitle.includes("GT")) seriesName = "Realme GT 系列";
            else if (upperTitle.includes("NARZO")) seriesName = "Realme Narzo 系列";
            else seriesName = "Realme 數字系列";
        }
        // 10. SAMSUNG (極度嚴謹的特徵庫，已更新 A57/A37/A17 判定優先權)
        else if (
            upperTitle.includes("S26") || upperTitle.includes("S25") || upperTitle.includes("S24") || upperTitle.includes("S23") || upperTitle.includes("S22") || upperTitle.includes("S21") || upperTitle.includes("S20") || upperTitle.includes("S10") || 
            upperTitle.includes("Z FOLD") || upperTitle.includes("Z FLIP") || upperTitle.includes("FOLD") || upperTitle.includes("Z TRIFOLD") || 
            upperTitle.includes("A57") || upperTitle.includes("A56") || upperTitle.includes("A55") || upperTitle.includes("A54") || upperTitle.includes("A53") || upperTitle.includes("A52") || upperTitle.includes("A51") ||
            upperTitle.includes("A37") || upperTitle.includes("A36") || upperTitle.includes("A35") || upperTitle.includes("A34") || upperTitle.includes("A33") || upperTitle.includes("A32") || upperTitle.includes("A31") ||
            upperTitle.includes("A26") || upperTitle.includes("A25") || upperTitle.includes("A24") || upperTitle.includes("A23") || upperTitle.includes("A22") || upperTitle.includes("A21") ||
            upperTitle.includes("A17") || upperTitle.includes("A16") || upperTitle.includes("A15") || upperTitle.includes("A14") || upperTitle.includes("A13") || upperTitle.includes("A12") || upperTitle.includes("A07") ||
            upperTitle.includes("M53") || upperTitle.includes("M34") || upperTitle.includes("M33") || upperTitle.includes("M32") || upperTitle.includes("M14") || upperTitle.includes("M13") || upperTitle.includes("M12") || upperTitle.includes("M11") ||
            upperTitle.includes("TAB S") || upperTitle.includes("TAB A") || upperTitle.includes("TAB ACTIVE") ||
            (upperTitle.includes("NOTE 20") || upperTitle.includes("N98") || upperTitle.includes("N97") || upperTitle.includes("NOTE10") || upperTitle.includes("NOTE 10+"))
        ) {
            brand = "SAMSUNG";
            if (upperTitle.includes("S2") || upperTitle.includes("S10")) seriesName = "Galaxy S 系列 (頂級旗艦)";
            else if (upperTitle.includes("FOLD") || upperTitle.includes("FLIP")) seriesName = "Galaxy Z 系列 (折疊螢幕)";
            else if (upperTitle.includes("NOTE")) seriesName = "Galaxy Note 系列";
            else if (upperTitle.includes("TAB")) seriesName = "Galaxy Tab 平板系列";
            else if (upperTitle.includes("A5") || upperTitle.includes("A3")) seriesName = "Galaxy A5/A3 系列 (中高階)";
            else if (upperTitle.includes("A1") || upperTitle.includes("A2") || upperTitle.includes("A0") || upperTitle.includes("A6") || upperTitle.includes("A7")) seriesName = "Galaxy A2/A1/A0 系列 (入門)";
            else if (upperTitle.includes("M")) seriesName = "Galaxy M 系列";
            else seriesName = "Samsung 其他型號";
        }
        // 11. OPPO (排除三星 A 系列後，剩下的 A 就是 OPPO)
        else if (
            upperTitle.includes("FIND") || upperTitle.includes("RENO") || upperTitle.includes("OPPO PAD") ||
            upperTitle.includes("AX5S") || upperTitle.includes("A98") || upperTitle.includes("A91") || upperTitle.includes("A79") || upperTitle.includes("A78") || upperTitle.includes("A77") || upperTitle.includes("A74") || upperTitle.includes("A73") || upperTitle.includes("A72") || upperTitle.includes("A38") || upperTitle.includes("A9") || upperTitle.includes("A5 ")
        ) {
            brand = "OPPO";
            if (upperTitle.includes("FIND")) seriesName = "OPPO Find 系列 (頂級旗艦)";
            else if (upperTitle.includes("RENO")) seriesName = "OPPO Reno 系列 (中高階手機)";
            else if (upperTitle.includes("PAD")) seriesName = "OPPO Pad 平板系列";
            else seriesName = "OPPO A 系列 (入門至中階)";
        }
        // 12. vivo (精準攔截 X, V, Y 系列)
        else if (
            upperTitle.includes("X300") || upperTitle.includes("X200") || upperTitle.includes("X100") || upperTitle.includes("X90") || upperTitle.includes("X80") || upperTitle.includes("X70") || upperTitle.includes("X60") || upperTitle.includes("X50") || upperTitle.includes("X40") || upperTitle.includes("X30") ||
            upperTitle.includes("V70") || upperTitle.includes("V60") || upperTitle.includes("V50") || upperTitle.includes("V40") || upperTitle.includes("V30") || upperTitle.includes("V29") || upperTitle.includes("V27") || upperTitle.includes("V25") || upperTitle.includes("V23") || upperTitle.includes("V21") || upperTitle.includes("V17") ||
            upperTitle.includes("Y100") || upperTitle.includes("Y78") || upperTitle.includes("Y76") || upperTitle.includes("Y72") || upperTitle.includes("Y55") || upperTitle.includes("Y52") || upperTitle.includes("Y50") || upperTitle.includes("Y39") || upperTitle.includes("Y38") || upperTitle.includes("Y36") || upperTitle.includes("Y31") || upperTitle.includes("Y29") || upperTitle.includes("Y28") || upperTitle.includes("Y27") || upperTitle.includes("Y21") || upperTitle.includes("Y20") || upperTitle.includes("Y17") || upperTitle.includes("Y16") || upperTitle.includes("Y15") || upperTitle.includes("Y05") || upperTitle.includes("Y04") || upperTitle.includes("Y03") || upperTitle.includes("Y02")
        ) {
            brand = "vivo";
            if (upperTitle.includes("X")) seriesName = "vivo X 系列 (頂級旗艦)";
            else if (upperTitle.includes("V")) seriesName = "vivo V 系列 (中高階)";
            else seriesName = "vivo Y 系列 (高 CP 值)";
        }
        // 13. 小米 / Redmi / POCO (處理最麻煩的純數字與 POCO 系列)
        else if (
            upperTitle.includes("XIAOMI") || upperTitle.includes("REDMI") || upperTitle.includes("POCO") || upperTitle.includes("小米") || upperTitle.includes("紅米") || upperTitle.includes("黑鯊") ||
            upperTitle.includes("NOTE 15") || upperTitle.includes("NOTE 14") || upperTitle.includes("NOTE 13") || upperTitle.includes("NOTE 12") || upperTitle.includes("NOTE 11") || upperTitle.includes("NOTE 10") || upperTitle.includes("NOTE 9") ||
            upperTitle.includes("X8") || upperTitle.includes("X7") || upperTitle.includes("X6") || upperTitle.includes("X5") || upperTitle.includes("X4") || upperTitle.includes("X3") ||
            upperTitle.includes("F8") || upperTitle.includes("F7") || upperTitle.includes("F6") || upperTitle.includes("F5") || upperTitle.includes("F4") || upperTitle.includes("F3") ||
            upperTitle.includes("M8") || upperTitle.includes("M7") || upperTitle.includes("M6") || upperTitle.includes("M5") || upperTitle.includes("M4") || upperTitle.includes("M3") ||
            upperTitle.includes("C75") || upperTitle.includes("C71") || upperTitle.includes("C65") || upperTitle.includes("C61") || upperTitle.includes("C51") || upperTitle.includes("C40") || upperTitle.includes("C35") || upperTitle.includes("C33") || upperTitle.includes("C31") || upperTitle.includes("C21") || upperTitle.includes("C11") ||
            upperTitle.includes("17 ") || upperTitle === "17" || upperTitle.includes("16 ") || upperTitle === "16" || upperTitle.includes("15 ") || upperTitle === "15" || upperTitle.includes("14 ") || upperTitle === "14" || upperTitle.includes("13 ") || upperTitle === "13" || upperTitle.includes("12 ") || upperTitle === "12" || upperTitle.includes("11 ") || upperTitle === "11" || upperTitle.includes("10 ") || upperTitle === "10" || upperTitle.includes("9T") ||
            upperTitle.includes("17T") || upperTitle.includes("16T") || upperTitle.includes("15T") || upperTitle.includes("14T") || upperTitle.includes("13T") || upperTitle.includes("12T") || upperTitle.includes("11T") || upperTitle.includes("10T") ||
            upperTitle.includes("17C") || upperTitle.includes("16C") || upperTitle.includes("15C") || upperTitle.includes("14C") || upperTitle.includes("13C") || upperTitle.includes("12C") || upperTitle.includes("11C") || upperTitle.includes("10C") || upperTitle.includes("17 ULTRA") || upperTitle.includes("16 PRO") || upperTitle.includes("15 PRO") || upperTitle.includes("14 ULTRA")
        ) {
            brand = "小米";
            if (upperTitle.includes("NOTE")) seriesName = "Redmi Note 系列";
            else if (upperTitle.includes("PAD")) seriesName = "小米/紅米 平板系列";
            else if (upperTitle.includes("POCO") || upperTitle.includes("X8") || upperTitle.includes("X6") || upperTitle.includes("F7") || upperTitle.includes("F6") || upperTitle.includes("M8") || upperTitle.includes("C75")) seriesName = "POCO 系列";
            else seriesName = "Xiaomi 數字/T 系列";
        }
        // 14. Lenovo 與其他兜底
        else if (upperTitle.includes("LEGION") || upperTitle.includes("TAB P") || upperTitle.includes("TAB M") || upperTitle.includes("IDEA TAB")) {
            brand = "Lenovo";
            seriesName = "Lenovo 平板/手機";
        }
        else {
            brand = "其他 (Others)";
            seriesName = "所有機型 (All Models)";
        }

        if (!brandsData[brand]) brandsData[brand] = {};
        if (!brandsData[brand][seriesName]) brandsData[brand][seriesName] = [];
        brandsData[brand][seriesName].push(model);
    });

    // 輔助函式：提取字串中的數字
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

    // 【終極排序核心：套用手機王標準】
    Object.keys(brandsData).forEach(b => {
        const seriesObj = brandsData[b];

        Object.keys(seriesObj).forEach(seriesName => {
            seriesObj[seriesName].sort((modelA, modelB) => {
                let tA = modelA.title.toUpperCase();
                let tB = modelB.title.toUpperCase();

                // 1. 代數排序 (例如 16 > 15)
                let genA = extractNumberFromString(tA);
                let genB = extractNumberFromString(tB);
                if (genA !== genB) return genB - genA;

                // 2. 效能等級排序 (Ultra > Pro Max > Pro)
                const modelKeywords = ["ULTRA", "PRO MAX", "PRO", "PLUS", "AIR", "MINI", "FE", "LITE"];
                let getWeight = (t) => {
                    for (let i = 0; i < modelKeywords.length; i++) {
                        if (t.includes(modelKeywords[i])) return i;
                    }
                    return 99; 
                };
                let wA = getWeight(tA);
                let wB = getWeight(tB);
                if (wA !== wB) return wA - wB;

                // 3. 容量大小排序
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
            "iPhone 17", "iPhone 16", "iPhone 15", "iPhone 14", "iPhone 13", "iPhone 12", "iPhone 11","iPad 系列",  "iPhone X", "iPhone SE", "iPhone 8", "iPhone Air",
            "Galaxy S",  "Galaxy Tab", 
            "Galaxy A5", "Galaxy A3", "Galaxy Z", "Galaxy M", "Galaxy A2", "Galaxy A1/A0", "Galaxy A","Galaxy Note",
            "OPPO Find", "OPPO Reno", "OPPO A",
            "vivo X", "vivo V", "vivo Y",
            "ROG", "Zenfone",
            "Xiaomi", "Redmi", "POCO",
            "Pixel", "Edge", "Razr"
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
