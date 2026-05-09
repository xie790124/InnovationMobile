// js/core.js
function switchSource(source) {
    // 1. 根據來源，動態移除舊的 script，載入新的 JS
    let oldScript = document.getElementById('source-logic');
    if (oldScript) oldScript.remove();

    let script = document.createElement('script');
    script.id = 'source-logic';
    script.src = `js/${source}_config.js`; // 自動抓 sogi_config.js 或 chuangyu_config.js
    
    // 2. 當腳本載入完成後，啟動讀取
    script.onload = () => {
        console.log(`${source} 邏輯載入成功，開始渲染...`);
        startSystem(); // 這個 function 會在各別的 config.js 裡面定義
    };
    document.body.appendChild(script);
}
