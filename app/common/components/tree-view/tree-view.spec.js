/**
 * Created by Timofey Novitskiy on 10.02.2016.
 */
define([
    '_',
    'angular',
    'app/common/components/tree-view/tree-view.module'
], function (_, angular) {
    describe("eTreeView", function () {
        var $compile,
            $rootScope,
            $cScope;

        beforeEach(module('common.components.tree-view'));

        beforeEach(inject(function (_$compile_, _$rootScope_) {
            $compile = _$compile_;
            $rootScope = _$rootScope_;
            $cScope = $rootScope.$new();
            $cScope.items = [{
                name: 'node 1',
                children: [{name: 'node 1.1'}, {name: 'node 1.2'}]
            }, {
                name: 'node 2',
                children: [{name: 'node 2.1'}, {name: 'node 2.2'}]
            }, {
                name: 'node 3',
                children: [{name: 'node 3.1'}, {
                    name: 'node 3.2',
                    children: [{name: 'node 3.2.1'}, {name: 'node 3.2.2'}]
                }]
            }, {name: 'node 4'}];
        }));

        afterEach(function () {
            $cScope.$destroy();
        });

        it('directive', function (done) {
            $cScope.filterValue = '';
            $cScope.filter = function ($items, $filter) {
                if (_.isEmpty($filter)) {
                    return $items;
                }
                return $items.filter((it)=>it.match($filter));
            };
            $cScope.select = function ($item, $parent, $index, $event) {
                if ($item.name === 'node 2') {
                    return false;
                } else if ($item.name === 'node 4') {
                    expect('everything').to.be.ok;
                    done();
                }
            };
            $cScope.parentController = {
                getPrifex: function () {
                    return 'parent-test';
                }
            };

            var items, element = $compile(tmpl)($cScope);
            $('body').append(element);
            $cScope.$digest();
            items = $('.e-tree-menu-top-level', element);
            expect(items).to.have.length(4);

            expect($(items[0]).text().trim()).to.be.equal('parent-test node 1');

            $('.tree-view-node-label', items[0]).click();
            expect($('.tree-view-node:eq(0) .tree-view-node', items[0])).to.have.length(2);

            $('.tree-view-node-label', items[0]).click();
            expect($('.tree-view-node:eq(0) .tree-view-node', items[0])).to.have.length(0);

            $('.tree-view-node-label', items[1]).click();
            expect($('.tree-view-node:eq(0) .tree-view-node', items[1])).to.have.length(0);

            $('.tree-view-node-label', items[2]).click();

            $('.tree-view-node-label:eq(2)', items[2]).click();
            expect($('.tree-view-node:eq(0) .tree-view-node:eq(1) .tree-view-node', items[2])).to.have.length(2);

            $('.tree-view-node-label', items[3]).click();
            return done;
        });

        it('Filtering', function () {
            $cScope.tmpl = {filterValue: ''};
            $cScope.filter = function ($items, $filter) {
                if (_.isEmpty($filter)) {
                    return $items;
                }
                return $items.filter((it)=>it.name.match($filter));
            };

            var items, element = $compile(tmplWithFilter)($cScope);
            $('body').append(element);
            $cScope.$digest();
            items = $('.e-tree-menu-top-level', element);
            expect(items).to.have.length(4);

            $cScope.tmpl.filterValue = 'node 1';
            $cScope.$digest();
            expect($('.tree-view-node', element)).to.have.length(1);

            $cScope.tmpl.filterValue = 'node';
            $cScope.$digest();

            items = $('.e-tree-menu-top-level', element);
            expect(items).to.have.length(4);

            expect($('.tree-view-node:eq(0) .tree-view-node', items[2])).to.have.length(2);
        });

        var tmpl = `<div class="menu-tree"
                         get-children="$item.children"
                         has-children="$item.children.length > 0"
                         parent-controller="parentController"
                         on-select="select($item, $parent, $index, $event)"
                         e-tree-view="items">
                        <span>{{parentController.getPrifex()}} {{::$item.name}}</span>
                    </div>`,
            tmplWithFilter = `<div class="menu-tree"
                            is-opened="$item.name === 'node 3'"
                            filter="filter($items, $filter)"
                            filter-value="tmpl.filterValue"
                         get-children="$item.children"
                         has-children="$item.children.length > 0"
                         parent-controller="parentController"
                         on-select="select($item, $parent, $index, $event)"
                         e-tree-view="items">
                        <span>{{parentController.getPrifex()}} {{::$item.name}}</span>
                    </div>`;
    });
});