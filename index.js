const fs = require('fs');
const parser = require('@babel/parser');
const depthOfInheritanceTree = require('./depthOfInheritanceTree');
const numberOfChildren = require('./numberOfChildren');
const moodMetrics = require('./moodMetrics');

const sourceCode = fs.readFileSync('./classes.js', 'utf8');
const ast = parser.parse(sourceCode, { sourceType: 'module' });

// Розрахунок метрики Depth of Inheritance Tree
const depth = depthOfInheritanceTree(ast);
console.log(`Depth of Inheritance Tree: ${depth}`);

// Розрахунок метрики Number of Children
const children = numberOfChildren(ast);
console.log(`Number of Children: ${children}`);

// Розрахунок MOOD метрик
const moodMetricsResult = moodMetrics.calculateAllMoodMetrics(sourceCode);
console.log(`MIF: ${moodMetricsResult.mif}`);
console.log(`MHF: ${moodMetricsResult.mhf}`);
console.log(`AHF: ${moodMetricsResult.ahf}`);
console.log(`AIF: ${moodMetricsResult.aif}`);
console.log(`POF: ${moodMetricsResult.pof}`);
console.log(`COF: ${moodMetricsResult.cof}`);
