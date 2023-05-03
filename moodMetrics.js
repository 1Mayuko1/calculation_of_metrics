const esprima = require('esprima');
function calculateMIF(sourceCode) {
    const ast = esprima.parse(sourceCode);

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

    // Функція, що шукає методи в класі
    function findMethods(classNode) {
        const methods = [];
        for (const node of classNode.body.body) {
            if (node.type === 'MethodDefinition') {
                methods.push(node);
            }
        }
        return methods;
    }

    // Функція, що шукає успадковані методи в класі
    function findInheritedMethods(classNode) {
        const inheritedMethods = new Set();
        let parentClass = classNode.superClass;
        while (parentClass) {
            const parentClassName = parentClass.name;
            const parentClassNode = classes.find(node => node.id.name === parentClassName);
            if (!parentClassNode) {
                break;
            }

            for (const method of findMethods(parentClassNode)) {
                inheritedMethods.add(method.key.name);
            }

            parentClass = parentClassNode.superClass;
        }
        return inheritedMethods;
    }

    // Шукаємо всі класи в AST
    const classes = findClasses(ast);

    // Розраховуємо MIF для кожного класу
    const mifs = classes.map(classNode => {
        const methods = findMethods(classNode);
        const inheritedMethods = findInheritedMethods(classNode);
        const numberOfInheritedMethods = [...inheritedMethods].filter(method => methods.some(node => node.key.name === method)).length;
        const numberOfMethods = methods.length;
        return {
            className: classNode.id.name,
            mif: numberOfMethods === 0 ? 0 : numberOfInheritedMethods / numberOfMethods * 100,
        };
    });

    return mifs;
}

function calculateMHF(sourceCode) {
    const ast = esprima.parse(sourceCode);

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

    // Функція, що шукає атрибути в класі
    function findAttributes(classNode) {
        const attributes = [];
        for (const node of classNode.body.body) {
            if (node.type === 'ClassProperty') {
                attributes.push(node);
            }
        }
        return attributes;
    }

    // Функція, що шукає успадковані атрибути в класі
    function findInheritedAttributes(classNode) {
        const inheritedAttributes = new Set();
        let parentClass = classNode.superClass;
        while (parentClass) {
            const parentClassName = parentClass.name;
            const parentClassNode = classes.find(node => node.id.name === parentClassName);
            if (!parentClassNode) {
                break;
            }

            for (const attribute of findAttributes(parentClassNode)) {
                inheritedAttributes.add(attribute.key.name);
            }

            parentClass = parentClassNode.superClass;
        }
        return inheritedAttributes;
    }

    // Шукаємо всі класи в AST
    const classes = findClasses(ast);

    // Розраховуємо MHF для кожного класу
    const mhfs = classes.map(classNode => {
        const attributes = findAttributes(classNode);
        const inheritedAttributes = findInheritedAttributes(classNode);
        const numberOfInheritedAttributes = [...inheritedAttributes].filter(attribute => attributes.some(node => node.key.name === attribute)).length;
        const numberOfAttributes = attributes.length;
        return {
            className: classNode.id.name,
            mhf: numberOfAttributes === 0 ? 0 : numberOfInheritedAttributes / numberOfAttributes * 100,
        };
    });

    return mhfs;
}

function calculateAHF(sourceCode) {
    const ast = esprima.parse(sourceCode);

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

    // Функція, що шукає атрибути в класі
    function findAttributes(classNode) {
        const attributes = [];
        for (const node of classNode.body.body) {
            if (node.type === 'ClassProperty') {
                attributes.push(node);
            }
        }
        return attributes;
    }

    // Функція, що шукає успадковані атрибути в класі
    function findInheritedAttributes(classNode) {
        const inheritedAttributes = new Set();
        let parentClass = classNode.superClass;
        while (parentClass) {
            const parentClassName = parentClass.name;
            const parentClassNode = classes.find(node => node.id.name === parentClassName);
            if (!parentClassNode) {
                break;
            }

            for (const attribute of findAttributes(parentClassNode)) {
                inheritedAttributes.add(attribute.key.name);
            }

            parentClass = parentClassNode.superClass;
        }
        return inheritedAttributes;
    }

    // Шукаємо всі класи в AST
    const classes = findClasses(ast);

    // Розраховуємо AHF для кожного класу
    const ahfs = classes.map(classNode => {
        const attributes = findAttributes(classNode);
        const inheritedAttributes = findInheritedAttributes(classNode);
        const numberOfInheritedAttributes = [...inheritedAttributes].filter(attribute => attributes.every(node => node.key.name !== attribute)).length;
        const numberOfAttributes = attributes.length;
        return {
            className: classNode.id.name,
            ahf: numberOfAttributes === 0 ? 0 : numberOfInheritedAttributes / numberOfAttributes * 100,
        };
    });

    return ahfs;
}

function calculateAIF(sourceCode) {
    const ast = esprima.parse(sourceCode);

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

    // Функція, що шукає атрибути в класі
    function findAttributes(classNode) {
        const attributes = [];
        for (const node of classNode.body.body) {
            if (node.type === 'ClassProperty') {
                attributes.push(node);
            }
        }
        return attributes;
    }

    // Функція, що шукає успадковані атрибути в класі
    function findInheritedAttributes(classNode) {
        const inheritedAttributes = new Set();
        let parentClass = classNode.superClass;
        while (parentClass) {
            const parentClassName = parentClass.name;
            const parentClassNode = classes.find(node => node.id.name === parentClassName);
            if (!parentClassNode) {
                break;
            }

            for (const attribute of findAttributes(parentClassNode)) {
                inheritedAttributes.add(attribute.key.name);
            }

            parentClass = parentClassNode.superClass;
        }
        return inheritedAttributes;
    }

    // Шукаємо всі класи в AST
    const classes = findClasses(ast);

    // Розраховуємо AIF для кожного класу
    const aifs = classes.map(classNode => {
        const attributes = findAttributes(classNode);
        const inheritedAttributes = findInheritedAttributes(classNode);
        const usedInheritedAttributes = new Set();
        for (const node of ast.body) {
            if (node.type === 'ExpressionStatement' && node.expression.type === 'AssignmentExpression') {
                const left = node.expression.left;
                const right = node.expression.right;
                if (left.type === 'MemberExpression' && left.object.type === 'ThisExpression' && attributes.some(node => node.key.name === left.property.name)) {
                    let object = right;
                    while (object.type === 'MemberExpression') {
                        object = object.object;
                    }
                    if (object.type === 'Identifier' && inheritedAttributes.has(object.name)) {
                        usedInheritedAttributes.add(object.name);
                    }
                }
            }
        }
        const numberOfUsedInheritedAttributes = usedInheritedAttributes.size;
        const numberOfInheritedAttributes = inheritedAttributes.size;
        return {
            className: classNode.id.name,
            aif: numberOfInheritedAttributes === 0 ? 0 : numberOfUsedInheritedAttributes / numberOfInheritedAttributes * 100,
        };
    });

    return aifs
}

function calculatePOF(sourceCode) {
    const ast = esprima.parse(sourceCode);

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

    // Функція, що шукає методи в класі
    function findMethods(classNode) {
        const methods = [];
        for (const node of classNode.body.body) {
            if (node.type === 'MethodDefinition') {
                methods.push(node);
            }
        }
        return methods;
    }

    // Функція, що шукає методи в дочірніх класах
    function findOverriddenMethods(classNode) {
        const overriddenMethods = new Set();
        let childClasses = classes.filter(node => node.superClass && node.superClass.name === classNode.id.name);
        while (childClasses.length) {
            const childClass = childClasses.shift();
            for (const node of findMethods(childClass)) {
                overriddenMethods.add(node.key.name);
            }
            childClasses = childClasses.concat(classes.filter(node => node.superClass && node.superClass.name === childClass.id.name));
        }
        return overriddenMethods;
    }

    // Шукаємо всі класи в AST
    const classes = findClasses(ast);

    // Розраховуємо POF для кожного класу
    const pofs = classes.map(classNode => {
        const methods = findMethods(classNode);
        const overriddenMethods = findOverriddenMethods(classNode);
        const numberOfOverriddenMethods = overriddenMethods.size;
        const numberOfMethods = methods.length;
        return {
            className: classNode.id.name,
            pof: numberOfMethods === 0 ? 0 : numberOfOverriddenMethods / numberOfMethods * 100,
        };
    });

    return pofs;
}

function calculateCOF(sourceCode) {
    const ast = esprima.parse(sourceCode);

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

    // Функція, що шукає залежності від інших класів
    function findDependencies(classNode) {
        const dependencies = new Set();
        for (const node of ast.body) {
            if (node.type === 'ImportDeclaration') {
                if (node.source.type === 'Literal' && node.source.value.endsWith(classNode.id.name)) {
                    for (const specifier of node.specifiers) {
                        if (specifier.type === 'ImportSpecifier') {
                            dependencies.add(specifier.local.name);
                        }
                    }
                }
            } else if (node.type === 'ExpressionStatement' && node.expression.type === 'AssignmentExpression') {
                const left = node.expression.left;
                const right = node.expression.right;
                if (left.type === 'MemberExpression' && left.object.type === 'ThisExpression' && right.type === 'NewExpression' && right.callee.type === 'Identifier') {
                    dependencies.add(right.callee.name);
                }
            }
        }
        return dependencies;
    }

    // Шукаємо всі класи в AST
    const classes = findClasses(ast);

    // Розраховуємо COF для кожного класу
    const cofs = classes.map(classNode => {
        const dependencies = findDependencies(classNode);
        return {
            className: classNode.id.name,
            cof: dependencies.size,
        };
    });

    return cofs;
}

const moodMetrics = require('./moodMetrics');

// function calculateAllMoodMetrics(sourceCode) {
//     const ast = esprima.parse(sourceCode);
//     const metrics = {};
//
//     Object.keys(moodMetrics).forEach(key => {
//         if (key.startsWith('calculate')) {
//             const metricName = key.replace(/^calculate/, '').toLowerCase();
//             metrics[metricName] = moodMetrics[key](sourceCode);
//         }
//     });
//
//     return metrics;
// }
//
// module.exports = {
//     calculateAllMoodMetrics,
// };

function calculateAllMoodMetrics(sourceCode) {
    return {
        mif: calculateMIF(sourceCode),
        mhf: calculateMHF(sourceCode),
        ahf: calculateAHF(sourceCode),
        aif: calculateAIF(sourceCode),
        pof: calculatePOF(sourceCode),
        cof: calculateCOF(sourceCode),
    };
}

module.exports = {
    calculateMIF,
    calculateMHF,
    calculateAHF,
    calculateAIF,
    calculatePOF,
    calculateCOF,
    calculateAllMoodMetrics,
};

