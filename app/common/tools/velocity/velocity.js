/**
 * Created by Timofey Novitskiy on 28.04.2015.
 */
define([
        'app/common/tools/tlp/parser',
        'app/common/tools/velocity/states/literal',
        'app/common/tools/velocity/states/variable',
        'app/common/tools/velocity/states/variable-name'
    ],
    function (Parser, Literal, Variable, VariableName) {
        var states = [Literal, Variable, VariableName],
            graph;

        graph = [
            {
                clazz: Literal
            },
            {
                clazz: Variable,
                children: [
                    {
                        clazz: VariableName,
                        isChildren : true,
                        open: [/\{/],
                        close: [/}/]
                    }
                ]
            }
        ];

        function Velocity() {
            this.parser = new Parser(states, graph);
        }

        Velocity.prototype.parse = function (str) {
            return this.parser.parse(str);
        };

        return Velocity;
    });
