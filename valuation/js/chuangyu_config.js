// 創宇回收專用擷取腳本 - 純淨導航版 (Chuangyu Clean Navigation Script)
console.clear();

let resultString = "【擷取結果（Extraction Results）】\n\n";
let cards = document.querySelectorAll('.phoneinfo');
let uniqueItems = new Set();

cards.forEach(card => {
    // 1. 只抓取手機型號，保持畫面乾淨 (Only extract model title)
    let titleElement = card.querySelector('.mainphonetitle');
    let title = titleElement ? titleElement.innerText.trim() : "";

    // 2. 網址設定：統一指向創宇總列表頁，作為跳板 (Point to main list page as a springboard)
    let url = "https://www.3c91.com.tw/phonelist.html";
    
    // 確保有資料且不重複
    if (title !== "" && !uniqueItems.has(title)) {
        uniqueItems.add(title);
        resultString += `${title}\n${url}\n\n`;
    }
});

// 打包下載 (Package and download)
let blob = new Blob([resultString], { type: 'text/plain' });
let a = document.createElement('a');
a.href = URL.createObjectURL(blob);
a.download = 'chuangyu_links.txt'; 
document.body.appendChild(a);
a.click();
document.body.removeChild(a);

console.log("🎉 創宇純淨版資料已成功打包！請上傳至 GitHub。");
