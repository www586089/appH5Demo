const fs = require('fs');
const path = require('path');

// 你的目标目录
const targetDir = 'D:\\taro\\wp\\appH5Demo\\src\\pages\\index\\widget';

function renameStyleFiles(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      renameStyleFiles(fullPath);
    } else {
      // 匹配 css / less / scss
      if (/\.(css|less|scss)$/.test(file) && !file.includes('.module.')) {
        const newName = file.replace(/\.(css|less|scss)$/, '.module.$1');
        fs.renameSync(fullPath, path.join(dir, newName));
        console.log('已改名：', file, '→', newName);
      }
    }
  });
}

renameStyleFiles(targetDir);
console.log('✅ 所有样式文件已改为 CSS Module 格式');