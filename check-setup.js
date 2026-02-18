// Script de verificação rápida do setup
console.log('🔍 Verificando configuração do projeto...\n');

const fs = require('fs');
const path = require('path');

const checks = [
  {
    name: 'package.json existe',
    check: () => fs.existsSync('package.json'),
    fix: 'Arquivo package.json não encontrado'
  },
  {
    name: 'node_modules existe',
    check: () => fs.existsSync('node_modules'),
    fix: 'Execute: npm install'
  },
  {
    name: 'src/main.tsx existe',
    check: () => fs.existsSync('src/main.tsx'),
    fix: 'Arquivo src/main.tsx não encontrado'
  },
  {
    name: 'src/App.tsx existe',
    check: () => fs.existsSync('src/App.tsx'),
    fix: 'Arquivo src/App.tsx não encontrado'
  },
  {
    name: 'index.html existe',
    check: () => fs.existsSync('index.html'),
    fix: 'Arquivo index.html não encontrado'
  },
  {
    name: 'vite.config.ts existe',
    check: () => fs.existsSync('vite.config.ts'),
    fix: 'Arquivo vite.config.ts não encontrado'
  },
  {
    name: 'tailwind.config.js existe',
    check: () => fs.existsSync('tailwind.config.js'),
    fix: 'Arquivo tailwind.config.js não encontrado'
  }
];

let allPassed = true;

checks.forEach(({ name, check, fix }) => {
  const passed = check();
  const icon = passed ? '✅' : '❌';
  console.log(`${icon} ${name}`);
  if (!passed) {
    console.log(`   ⚠️  ${fix}\n`);
    allPassed = false;
  }
});

if (allPassed) {
  console.log('\n✅ Todas as verificações passaram!');
  console.log('🚀 Execute: npm run dev');
} else {
  console.log('\n❌ Algumas verificações falharam. Corrija os problemas acima.');
}

