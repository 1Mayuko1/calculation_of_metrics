const parser = require('@babel/parser');

function calculateNumberOfChildren(sourceCode) {
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

    // Функція, що шукає дочірні класи
    function findChildClasses(classNode) {
        const className = classNode.id.name;
        return classes.filter(node => {
            const superClass = node.superClass;
            return superClass && superClass.name === className;
        });
    }

    // Шукаємо всі класи в AST
    const classes = findClasses(ast);

    // Шукаємо кількість дочірніх класів для кожного класу
    return classes.map(classNode => {
        const childClasses = findChildClasses(classNode);
        return {
            className: classNode.id.name,
            numberOfChildren: childClasses.length,
        };
    });
}

module.exports = calculateNumberOfChildren;
