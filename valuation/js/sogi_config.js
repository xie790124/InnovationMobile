// js/sogi_config.js
// 【注意】這個檔案最上面「不可以」有 const tabsContainer 等宣告！

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

    Object.keys(brandsData).forEach(b => {
        const seriesObj = brandsData[b];

        Object.keys(seriesObj).forEach(seriesName => {
            seriesObj[seriesName].sort((modelA, modelB) => {
                let tA = modelA.title.toUpperCase();
                let tB = modelB.title.toUpperCase();

                let genA = extractNumberFromString(tA);
                let genB = extractNumberFromString(tB);
                if (genA !== genB) return genB - genA;

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

        const seriesTierList = [
             "iPhone 17", "iPhone 16", "iPhone 15", "iPhone 14", "iPhone 13", "iPhone 12", "iPhone 11", "iPad 系列","iPhone X", "iPhone SE", "iPhone 8", "iPhone Air",
             "Galaxy S",  "Galaxy A5", "Galaxy A3", "Galaxy Z",
             "Galaxy Tab","Galaxy M", "Galaxy A2/A1/A0", "Galaxy A","Galaxy Note",
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
