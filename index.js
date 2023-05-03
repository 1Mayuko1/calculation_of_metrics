const fs = require('fs');
const { parse } = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const calculateDepthOfInheritanceTree = require('./depthOfInheritanceTree');
const calculateNumberOfChildren = require('./numberOfChildren');
const { calculateMoodMetrics } = require('./moodMetrics');


const sourceCode = fs.readFileSync('./src/classes.js', 'utf8');
const ast = parse(sourceCode, { sourceType: 'module' });

// Розрахунок метрики Depth of Inheritance Tree
let depth = 0;
traverse(ast, {
    ClassDeclaration(path) {
        let parentClass = path.node.superClass;
        let count = 0;
        while (parentClass) {
            count++;
            parentClass = parentClass.superClass;
        }
        if (count > depth) depth = count;
    },
});
console.log(`Depth of Inheritance Tree: ${depth}`);

// Розрахунок метрики Number of Children
let classes = [];
traverse(ast, {
    ClassDeclaration(path) {
        classes.push(path.node);
    },
});

const numberOfChildren = classes.map(classNode => {
    const childClasses = classes.filter(node => {
        const superClass = node.superClass;
        return superClass && superClass.name === classNode.id.name;
    });
    return {
        className: classNode.id.name,
        numberOfChildren: childClasses.length,
    };
});

console.log(`Number of Children:`);
console.table(numberOfChildren);

// Розрахунок MOOD метрик
const moodMetricsResult = calculateMoodMetrics(sourceCode);
console.log(`MIF: ${moodMetricsResult.mif}`);
console.log(`MHF: ${moodMetricsResult.mhf}`);
console.log(`AHF: ${moodMetricsResult.ahf}`);
console.log(`AIF: ${moodMetricsResult.aif}`);
console.log(`POF: ${moodMetricsResult.pof}`);
console.log(`COF: ${moodMetricsResult.cof}`);
