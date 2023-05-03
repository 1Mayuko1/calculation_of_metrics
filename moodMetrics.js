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

    traverse(ast, {
        // Розрахунок MOOD метрики MIF та MHF
        ClassMethod(path) {
            if (path.node.kind === 'method') {
                const isGetter = path.node.body.body.length === 1 && path.node.body.body[0].type === 'ReturnStatement';
                const isSetter = path.node.body.body.length === 2 && path.node.body.body[0].type === 'ExpressionStatement' && path.node.body.body[1].type === 'ReturnStatement';
                if (isGetter) {
                    mif++;
                }
                if (isSetter) {
                    mhf++;
                }
            }
        },

        // Розрахунок MOOD метрики AHF та AIF
        AssignmentExpression(path) {
            if (path.parent.type === 'ExpressionStatement' && path.node.operator === '=') {
                const left = path.node.left;
                const right = path.node.right;
                if (left.type === 'MemberExpression' && left.property.type === 'Identifier') {
                    ahf++;
                }
                if (right.type === 'MemberExpression' && right.property.type === 'Identifier') {
                    aif++;
                }
            }
        },

        // Розрахунок MOOD метрики POF
        ObjectMethod(path) {
            const params = path.node.params;
            if (params.length === 1 && params[0].type === 'ObjectPattern') {
                pof++;
            }
        },

        // Розрахунок MOOD метрики COF
        ConditionalExpression(path) {
            cof++;
        },
    });

    return {
        mif,
        mhf,
        ahf,
        aif,
        pof,
        cof,
    };
}

module.exports = {
    calculateMoodMetrics,
};
