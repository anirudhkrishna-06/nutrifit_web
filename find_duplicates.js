const fs = require('fs');
const content = fs.readFileSync('c:/Users/Lenovo/NutriFit/frontend/src/pages/LandingPage.jsx', 'utf8');

function findDuplicateKeys(str) {
    const lines = str.split('\n');
    const stack = [];
    const duplicates = [];

    lines.forEach((line, index) => {
        const trimmed = line.trim();
        if (trimmed.endsWith('{')) {
            stack.push({ line: index + 1, keys: new Set() });
        } else if (trimmed.startsWith('}') || trimmed === '},') {
            stack.pop();
        } else {
            const match = trimmed.match(/^([a-zA-Z0-9_]+):/);
            if (match && stack.length > 0) {
                const key = match[1];
                const current = stack[stack.length - 1];
                if (current.keys.has(key)) {
                    duplicates.push({ key, line: index + 1 });
                }
                current.keys.add(key);
            }
        }
    });
    return duplicates;
}

const dups = findDuplicateKeys(content);
console.log(JSON.stringify(dups, null, 2));
