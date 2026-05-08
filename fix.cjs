const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = dir + '/' + file;
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else if (file.endsWith('.jsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk('src');
for (const f of files) {
  let content = fs.readFileSync(f, 'utf8');
  content = content.replace(/import\s+React\s*,\s*\{\s*/g, 'import { ');
  content = content.replace(/import\s+React\s+from\s+['"]react['"];?\s*\n?/g, '');
  if (f.endsWith('ThemeContext.jsx')) {
    content = content.replace(/export\s+const\s+useTheme/, '// eslint-disable-next-line react-refresh/only-export-components\nexport const useTheme');
  }
  fs.writeFileSync(f, content);
}
console.log('done');
