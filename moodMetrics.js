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
        ClassMethod(path) {
            if (path.node.kind === 'get') {
                mif++;
            }
            if (path.node.kind === 'set') {
                mhf++;
            }
        },
        AssignmentExpression(path) {
            if (
                path.node.left.type === 'MemberExpression' &&
                path.node.left.property.type === 'Identifier'
            ) {
                ahf++;
            }
            if (
                path.node.right.type === 'MemberExpression' &&
                path.node.right.property.type === 'Identifier'
            ) {
                aif++;
            }
        },
        ObjectMethod(path) {
            if (path.node.params.length === 1 && path.node.params[0].type === 'ObjectPattern') {
                pof++;
            }
        },
        ConditionalExpression(path) {
            cof++;
        },
        IfStatement(path) {
            cof++;
        },
        SwitchStatement(path) {
            cof++;
        },
    });

    const totalMethods = mif + mhf;
    const totalAccesses = ahf + aif;
    const totalOperators = cof;
    const totalConditionals = cof;

    const mof = totalMethods + totalAccesses;
    const rfc = totalMethods + totalAccesses + totalOperators;
    const mmf = totalMethods + totalConditionals;

    return {
        mif,
        mhf,
        ahf,
        aif,
        pof,
        cof,
        mof,
        rfc,
        mmf,
    };
}

module.exports = {
    calculateMoodMetrics,
};
