const parser = require('@babel/parser');

function calculateDepthOfInheritanceTree(sourceCode) {
    const ast = parser.parse(sourceCode, { sourceType: 'module' });

    // Функція, що шукає класи
    function findClasses(node) {
        if (node.type === 'ClassDeclaration') {
            return [node];
        }

        if (node.type === 'Program' || node.type === 'BlockStatement') {
            const classes = [];
            for (const childNode of node.body) {
                classes.push(...findClasses(childNode));
            }
            return classes;
        }

        return [];
    }

    // Функція, що шукає батьківський клас
    function findParentClass(classNode, classes) {
        const parentClassName = classNode.superClass && classNode.superClass.name;
        if (!parentClassName) {
            return null;
        }

        const parentClass = classes.find(node => node.id.name === parentClassName);
        return parentClass || null;
    }

    // Шукаємо всі класи в AST
    const classes = findClasses(ast);

    // Шукаємо глибину дерева успадкування для кожного класу
    let maxDepth = 0;
    for (const classNode of classes) {
        let depth = 0;
        let parentClass = findParentClass(classNode, classes);
        while (parentClass) {
            depth++;
            parentClass = findParentClass(parentClass, classes);
        }
        maxDepth = Math.max(maxDepth, depth);
    }

    return maxDepth;
}

module.exports = calculateDepthOfInheritanceTree;
