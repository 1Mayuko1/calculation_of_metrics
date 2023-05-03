const { parse } = require('@babel/parser');
const traverse = require('@babel/traverse').default;

function calculateMoodMetrics(sourceCode) {
    const ast = parse(sourceCode, { sourceType: 'module' });

    let mif = 0;
    let mhf = 0;
    let ahf = 0;
    let aif = 0;
    let pof = 0;
    let cof = 0;

    const classProperties = new Set();
    const methodNames = new Set();
    const conditionalExpressions = new Set();
    const loopStatements = new Set();
    const switchStatements = new Set();
    const variableNames = new Set();
    const objectPatterns = new Set();

    traverse(ast, {
        ClassMethod(path) {
            methodNames.add(path.node.key.name);
            if (path.node.kind === 'get') {
                mif++;
            }
            if (path.node.kind === 'set') {
                mhf++;
            }
        },
        ClassProperty(path) {
            classProperties.add(path.node.key.name);
        },
        AssignmentExpression(path) {
            if (
                path.node.left.type === 'MemberExpression' &&
                path.node.left.property.type === 'Identifier'
            ) {
                ahf++;
                variableNames.add(path.node.left.property.name);
            }
            if (
                path.node.right.type === 'MemberExpression' &&
                path.node.right.property.type === 'Identifier'
            ) {
                aif++;
                variableNames.add(path.node.right.property.name);
            }
        },
        ObjectPattern(path) {
            objectPatterns.add(path.node);
        },
        ConditionalExpression(path) {
            conditionalExpressions.add(path.node);
            cof++;
        },
        IfStatement(path) {
            conditionalExpressions.add(path.node);
            cof++;
        },
        ForStatement(path) {
            loopStatements.add(path.node);
            cof++;
        },
        ForInStatement(path) {
            loopStatements.add(path.node);
            cof++;
        },
        ForOfStatement(path) {
            loopStatements.add(path.node);
            cof++;
        },
        WhileStatement(path) {
            loopStatements.add(path.node);
            cof++;
        },
        DoWhileStatement(path) {
            loopStatements.add(path.node);
            cof++;
        },
        SwitchStatement(path) {
            switchStatements.add(path.node);
            cof++;
        },
        MemberExpression(path) {
            if (path.parent.type === 'AssignmentExpression') {
                if (path.node.object.type === 'ThisExpression') {
                    ahf++;
                    variableNames.add(path.node.property.name);
                } else {
                    aif++;
                    variableNames.add(path.node.property.name);
                }
            }
        },
    });

    const totalMethods = methodNames.size;
    const totalAccesses = variableNames.size;
    const totalOperators = cof;
    const totalConditionals = conditionalExpressions.size + loopStatements.size + switchStatements.size;

    const mof = totalMethods + totalAccesses;
    const rfc = totalMethods + totalAccesses + totalOperators;
    const mmf = totalMethods + totalConditionals;

    return {
        mif,
        mhf,
        ahf,
        aif,
        pof: objectPatterns.size,
        cof,
        mof,
        rfc,
        mmf,
    };
}

module.exports = {
    calculateMoodMetrics,
};
