/**
 * Created with JetBrains PhpStorm.
 * User: 恒
 * Date: 13-4-9
 * Time: 下午2:57
 * To change this template use File | Settings | File Templates.
 */
GraphicTemplate = {
    tid:0,
    template:{
        title:' <div class="title">美食食材</div>',
        section:'<div class="section">' +
            '<div class="subtitle">$$</div>' +
            '<div class="content">%%</div>' +
            '</div>',
        module:function () {
            return '<div class="module">' +
                '<input type="text" class="name" maxlength="8" id="' + (this.tid++) + '"/>' +
                '<input type="text" class="num"  maxlength="6" id="' + (this.tid++) + '"/>' +
                '<span class="delete"></span>' +
                ' </div>'
        },
        foot:'<div class="foot">' +
            '<div class="add">+ 添加食材</div>' +
            '</div>'
    },
    initPageByData:function () {
        var me = this,
            arr = [],
            tpl = me.template,
            data = editor["graphictemplate"][frameElement.id];

        var mainNum = data ? (me._getObjLength(data[0]) / 2 ) : 4;
        var subNum = data ? (me._getObjLength(data[1]) / 2 ) : 4;

        arr.push(tpl.title);
        arr.push(tpl.section.replace("$$", "主料").replace("%%", me._addModule(mainNum)));
        arr.push(tpl.foot);
        arr.push(tpl.section.replace("$$", "辅料").replace("%%", me._addModule(subNum)));
        arr.push(tpl.foot);

        G("J_main").innerHTML = arr.join('');

        me._addPageListener();
        me.setPageData(data);
        me.savePageData();
        moveTemplate("J_drag");
        iframeAutoHeight();
    },
    _addPageListener:function () {
        var me = this;
        domUtils.on(document, "click", function (e) {
            var tgt = e.target || e.srcElement;
            if (domUtils.hasClass(tgt, "add")) {
                me._addSection(tgt);
            } else if (domUtils.hasClass(tgt, "delete")) {
                me._deleteModule(tgt);
            }
        });
    },
    _addSection:function (tgt) {
        var me = this,
            tmpDiv = document.createElement("div");

        var content = domUtils.getElementsByTagName(tgt.parentNode.previousSibling, "div", "content")[0];
        var sum = domUtils.getElementsByTagName(content, "div", "module").length;

        var len = sum % 2 ? 1 : 2;
        for (var i = 0; i < len; i++) {
            tmpDiv.innerHTML = me.template.module();
            content.appendChild(tmpDiv.children[0]);
        }

        iframeAutoHeight();
    },
    _addModule:function (num) {
        var me = this, str = "";
        for (var i = 0; i < num; i++) {
            str += me.template.module();
        }
        return str;
    },
    _getObjLength:function (obj) {
        var num = 0;
        for (var tmp in obj) {
            num += 1;
        }
        return num;
    },
    _deleteModule:function (tgt) {
        var node = tgt.parentNode;
        node.parentNode.removeChild(node);
    },

    setPageData:function (data) {
        if (data) {
            var list = domUtils.getElementsByTagName(document, "div", "content");

            for (var i = 0, len = list.length; i < len; i++) {
                var inputs = domUtils.getElementsByTagName(list[i], "input");
                for (var j = 0, node; node = inputs[j++];) {
                    node.value = data[i][j];
                }
            }
        }
    },
    savePageData:function () {
        editor["graphictemplate"][frameElement.id] = {};
        var data = editor["graphictemplate"][frameElement.id];
        var list = domUtils.getElementsByTagName(document, "div", "content");

        for (var i = 0, len = list.length; i < len; i++) {
            data[i] = {};
            var inputs = domUtils.getElementsByTagName(list[i], "input");
            for (var j = 0, node; node = inputs[j++];) {
                data[i][j] = node.value;
            }
        }
    }
};
