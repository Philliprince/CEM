var status;
var idArray = new Array();
var test = new Array();
var testGroupNames = new Array();

var probedata_handle = new Vue({
    el: '#probehandle',
    data: {},
    mounted(){         /*动态加载测试任务组数据*/
        $.ajax({
            type: "POST",   /*GET会乱码*/
            url: "../../cem/taskproberel/list",//Todo:改成测试任务组的list方法
            cache: false,  //禁用缓存
            dataType: "json",
            /* contentType:"application/json",  /!*必须要,不可少*!/*/
            success: function (result) {
                // for(var i=0;i<result.page.list.length;i++){
                //     testGroupNames[i] = {message: result.page.list[i]}
                // }
                // probeform_data.testgroup_names = testGroupNames;    /*注意,这个js执行放在probeform_data和search_data之前才行*/
                // search_data.testgroup_names = testGroupNames;
            }
        });
    },
    methods: {
        testagentadd: function () {   /*监听录入触发事件*/
            status = 0;
            /*状态0,表示录入*/
            var forms = $('#probeform_data .form-control');

            $('#probeform_data input[type=text]').prop("readonly", false);
            /*去除只读状态*/
            $('#probeform_data select').prop("disabled", false);

            for (var i = 0; i < 11; i++) {
                forms[i].value = ""
            }
            probeform_data.modaltitle = "测试机管理录入";
            /*修改模态框标题*/
            $('#myModal').modal('show');

        },
        testagentupdate: function () {     /*监听编辑触发事件*/
            status = 1;
            /*状态1表示编辑*/
            var trs = $('#probedata_table tbody').find('tr:has(:checked)');
            /*find被选中的行*/
            var forms = $('#probeform_data .form-control');
            console.log(trs.length + "表单对象:" + forms.length);

            $('#probeform_data input[type=text]').prop("readonly", false);
            /*去除只读状态*/
            $('#probeform_data select').prop("disabled", false);

            if (trs.length == 0) {
                toastr.warning('请选择编辑项目！');
            } else if (trs.length == 1) {
                var tds = trs.find("td");
                for (var i = 0; i < 6; i++) {                /*tds.eq(0).text()取得td的值,注意tds[0].text()取不到*/
                    console.log(tds.eq(i + 3).text());
                    forms[i].value = tds.eq(i + 2).text()
                }
                forms[6].value = tds.eq(10).text();
                /*修改测试任务组*/
                console.log(tds.eq(10).text());
                for (var j = 0; j < 4; j++) {                /*tds.eq(0).text()取得td的值,注意tds[0].text()取不到*/
                    console.log(tds.eq(j + 15).text());
                    forms[j + 7].value = tds.eq(j + 15).text()
                }
                /*tds.each(function(){
                 var td = $(this);
                 console.log(td.text());//这个就是td的文本
                 });*/
                probeform_data.modaltitle = "测试机管理编辑";
                /*修改模态框标题*/
                $('#myModal').modal('show');
            } else {
                toastr.warning('请选择一条记录再编辑！');
            }
        },
        testagentdelBatch: function () {   /*批量取消监听事件*/
            status = 2;
            /*状态2表示取消*/
            var trs = $('#probedata_table tbody').find('tr:has(:checked)');
            if (trs.length == 0) {
                toastr.warning('请需要取消的项目！');

            } else {
                console.log("changdu:"+trs.length);
                for (var i = 0; i < trs.length; i++) {
                    var tds = trs.eq(i).find("td");
                    var statuses = parseInt("0");
                    test={id:tds.eq(2).text(),taskId:tds.eq(3).text(),probeId:tds.eq(4).text(),port:tds.eq(5).text(),status:statuses,remark:tds.eq(7).text()};
                    console.log("test!!!!!!!"+tds.eq(1).text());
                    delete_ajax();
                    /*ajax传输*/

                }
            }
            /*find被选中的行*/

        },
        testagentview: function () {     /*查看监听事件*/
            var trs = $('#probedata_table tbody').find('tr:has(:checked)');
            /*find被选中的行*/
            var forms = $('#probeform_data .form-control');
            if (trs.length == 0) {
                toastr.warning('请选择查看项目！');
            } else if (trs.length == 1) {
                var tds = trs.find("td");
                for (var i = 0; i < 6; i++) {                /*tds.eq(0).text()取得td的值,注意tds[0].text()取不到*/
                    console.log(tds.eq(i + 2).text());
                    forms[i].value = tds.eq(i + 2).text()
                }
                forms[6].value = tds.eq(10).text();
                /*修改测试任务组*/
                console.log(tds.eq(10).text());
                for (var j = 0; j < 4; j++) {                /*tds.eq(0).text()取得td的值,注意tds[0].text()取不到*/
                    console.log(tds.eq(j + 15).text());
                    forms[j + 7].value = tds.eq(j + 15).text()
                }
                $('#probeform_data input[type=text]').prop("readonly", true);//将input元素设置为readonly
                $('#probeform_data select').prop("disabled", true);//将select元素设置为不可变

                probeform_data.modaltitle = "查看";
                /*修改模态框标题*/
                $('#myModal').modal('show');
            } else {
                toastr.warning('请选择一条记录再查看！');
            }
        },
      testagentListsearch: function () {   /*查询监听事件*/
            var data = getFormJson($('#searchcolums'));
            /*得到查询条件*/
            /*获取表单元素的值*/
            console.log(data);
            probetable.probedata = data;
            probetable.redraw();
            /*根据查询条件重绘*/
        },
        reset: function () {    /*重置*/
            probetable.reset();

        }

    }
});
function delete_ajax() {   //取消项目，更改数据库状态信息
    var params = JSON.stringify(test);
    console.log(params);
    /*对象数组字符串*/

    $.ajax({
        type: "POST", /*GET会乱码*/
        url: "../../cem/taskproberel/update",
        cache: false,  //禁用缓存
        data: params,  //传入组装的参数
        dataType: "json",
        contentType: "application/json", /*必须要,不可少*/
        success: function (result) {

            toastr.success("测试任务取消成功!");

            probetable.currReset();
            test = [];

            /*更改status的信息*/
            delete_data.close_modal();
            /*关闭模态框*/
        }
    });
}
function delete_this(obj) {
    var localrow = obj.parentNode.parentNode;
    console.log(localrow.cells[4].innerHTML.toString().replace(/<td>/,"").replace(/<\td>/,""));
    delete_data.show_deleteModal();
    delete_data.id = parseInt(obj.id);
    delete_data.taskId = parseInt(localrow.cells[3].innerHTML.toString().replace(/<td>/,"").replace(/<\td>/,""));
    delete_data.probeId = parseInt(localrow.cells[4].innerHTML.toString().replace(/<td>/,"").replace(/<\td>/,""));
    delete_data.port = localrow.cells[5].innerHTML.toString().replace(/<td>/,"").replace(/<\td>/,"");
    delete_data.statuses = parseInt("0");
    delete_data.remark = localrow.cells[7].innerHTML.toString().replace(/<td>/,"").replace(/<\td>/,"");
    console.log(delete_data.id);
}

function edit_this(obj){
    var localrow = obj.parentNode.parentNode;
    console.log(localrow.cells[4].innerHTML.toString().replace(/<td>/,"").replace(/<\td>/,""));
    edit_data.show_editModal();
    edit_data.id = parseInt(obj.id);
    edit_data.taskId = parseInt(localrow.cells[3].innerHTML.toString().replace(/<td>/,"").replace(/<\td>/,""));
    edit_data.probeId = parseInt(localrow.cells[4].innerHTML.toString().replace(/<td>/,"").replace(/<\td>/,""));
    edit_data.port = localrow.cells[5].innerHTML.toString().replace(/<td>/,"").replace(/<\td>/,"");
    edit_data.statuses = parseInt("0");
    edit_data.remark = localrow.cells[7].innerHTML.toString().replace(/<td>/,"").replace(/<\td>/,"");
}

var edit_data = new Vue({
    el: '#myModal_edit',
    data: {
        id:null,
        taskId:null,
        probeId:null,
        port:null,
        statuses:null,
        remark:null,
    },
    methods: {
        show_editModal: function () {
            $(this.$el).modal('show');
            /*弹出确认模态框*/
        },
        close_modal: function (obj) {
            $(this.$el).modal('hide');

        },
        cancel_delete: function () {

        },
        edit_data: function () {
            /*更改status的信息*/
            test={id:this.id,taskId:this.taskId,probeId:this.probeId,port:this.port,status:this.statuses,remark:this.remark};
            console.log("bianji:"+test);
          //  delete_ajax();
            /*ajax传输*/

        }
    }
});

var delete_data = new Vue({
    el: '#myModal_delete',
    data: {
        id:null,
        taskId:null,
        probeId:null,
        port:null,
        statuses:null,
        remark:null,
    },
    methods: {
        show_deleteModal: function () {
            $(this.$el).modal('show');
            /*弹出确认模态框*/
        },
        close_modal: function (obj) {
            $(this.$el).modal('hide');

        },
        cancel_delete: function () {

        },
        delete_data: function () {
            /*更改status的信息*/
            test={id:this.id,taskId:this.taskId,probeId:this.probeId,port:this.port,status:this.statuses,remark:this.remark};
            delete_ajax();
            /*ajax传输*/

        }
    }
});

var probeform_data = new Vue({
    el: '#myModal',
    data: {
        modaltitle: "测试任务录入", /*定义模态框标题*/
        countys: [
            {message: '新城区'},
            {message: '碑林区'}
        ],
        city_mans: [
            {message: '西安市'}
        ],
        testgroup_names: []
    },
    // 在 `methods` 对象中定义方法
    methods: {
        submit: function () {
            var testagentJson = getFormJson($('#probeform_data'));
            if (typeof(testagentJson["cityMan"]) == "undefined") {                  /*3个select必选*/
                toastr.warning("请录入地市信息!");
            } else if (typeof(testagentJson["county"]) == "undefined") {
                toastr.warning("请录入区县信息!");
            } else if (typeof(testagentJson["testgroupName"]) == "undefined") {
                toastr.warning("请录入测试任务组!");
            } else {
                var testagent = JSON.stringify(testagentJson);
                /*封装成json数组*/
                /*获取表单元素的值*/
                console.log(testagent);
                var mapstr;
                if (status == 0) {
                    mapstr = "save";
                } else if (status == 1) {
                    mapstr = "update"
                }
                $.ajax({
                    type: "POST", /*GET会乱码*/
                    url: "../../cem/taskproberel/" + mapstr,
                    cache: false,  //禁用缓存
                    data: testagent,  //传入组装的参数
                    dataType: "json",
                    contentType: "application/json", /*必须要,不可少*/
                    success: function (result) {
                        let code = result.code;
                        let msg = result.msg;
                        console.log(result);
                        if (status == 0) {
                            switch (code) {
                                case 0:
                                    toastr.success("业务信息录入成功!");
                                    break;
                                case 403:
                                    toastr.error(msg);
                                    break;
                                default:
                                    toastr.error("未知错误");
                                    break
                            }
                        } else if (status == 1) {
                            switch (code) {
                                case 0:
                                    toastr.success("业务信息更新成功!");
                                    break;
                                case 403:
                                    toastr.error(msg);
                                    break;
                                default:
                                    toastr.error("未知错误");
                                    break
                            }
                        }

                        probetable.currReset();
                    }
                });
            }


        }
    }
});

function getFormJson(form) {      /*将表单对象变为json对象*/
    var o = {};
    var a = $(form).serializeArray();
    $.each(a, function () {
        if (o[this.name] !== undefined) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
}

var search_data = new Vue({

    el:'#searchcolums',
    data:{
        countys:probeform_data.countys,
        city_mans:probeform_data.city_mans,
        testgroup_names:[]

    }
});


/*选中表格事件*/
$(document).ready(function () {
    $(".list td").slice(9).each(function(){   //操作列取消选中状态
    $('#probedata_table tbody').slice(9).on('click', 'tr', function () {   /*表格某一行选中状态*/
        if ($(this).hasClass('selected')) {
            $(this).removeClass('selected');
            $(this).find("input:checkbox").prop("checked", false);
            /*prop可以,attr会出错*/
        }
        else {
            /*vm.dtHandle.$('tr.selected').removeClass('selected');*/
            /*只能选中一行*/
            $(this).addClass('selected');
            $(this).find("input:checkbox").prop("checked", true);
        }
    });
    });

    $('#checkAll').on('click', function () {
        if (this.checked) {
            $("input[name='selectFlag']:checkbox").each(function () { //遍历所有的name为selectFlag的 checkbox
                $(this).prop("checked", true);
                $(this).closest('tr').addClass('selected');
                /*取得最近的tr元素*/
            })
        } else {   //反之 取消全选
            $("input[name='selectFlag']:checkbox").each(function () { //遍历所有的name为selectFlag的 checkbox
                $(this).prop("checked", false);
                $(this).closest('tr').removeClass('selected');
                /*取得最近的tr元素*/

            })
        }
    })

});


// 注册
var probetable = new Vue({
    el: '#probedata_table',
    data: {
        headers: [
            {title: '<div style="width:10px"></div>'},
            {title: '<div class="checkbox" style="width:10px"> <label> <input type="checkbox" id="checkAll"></label> </div>'},
 //           {title: '<div style="display:none">id</div>'},
            {title: '<div style="width:10px">id</div>'},
            {title: '<div style="width:142px">任务名称</div>'},
            {title: '<div style="width:142px">探针名称</div>'},
            {title: '<div style="width:80px">探针端口</div>'},
            {title: '<div style="width:80px">状态</div>'},
            {title: '<div style="width:100px">备注</div>'},
            {title: '<div style="width:80px">操作</div>'}
        ],
        rows: [],
        dtHandle: null,
        probedata: {},

    },
    methods: {
        reset: function () {
            let vm = this;
            vm.probedata = {};
            /*清空probedata*/
            vm.dtHandle.clear();
            console.log("重置");
            vm.dtHandle.draw();
            /*重置*/
        },
        currReset: function () {
            let vm = this;
            vm.dtHandle.clear();
            console.log("当前页面重绘");
            vm.dtHandle.draw(false);
            /*当前页面重绘*/
        },
        redraw: function () {
            let vm = this;
            vm.dtHandle.clear();
            console.log("页面重绘");
            vm.dtHandle.draw();
            /*重绘*/
        }
    },
    mounted() {
        let vm = this;
        // Instantiate the datatable and store the reference to the instance in our dtHandle element.
        vm.dtHandle = $(this.$el).DataTable({
            // Specify whatever options you want, at a minimum these:
            columns: vm.headers,
            data: vm.rows,
            searching: false,
            paging: true,
            serverSide: true,
            info: false,
            ordering: false, /*禁用排序功能*/

            oLanguage: {
                sLengthMenu: "每页 _MENU_ 行数据",
                oPaginate: {
                    sNext: '<i class="fa fa-chevron-right" ></i>', /*图标替换上一页,下一页*/
                    sPrevious: '<i class="fa fa-chevron-left" ></i>'
                }
            },
            sDom: 'Rfrtlip', /*显示在左下角*/

            
            ajax: function (data, callback, settings) {
                //封装请求参数
                let param = {};
                param.limit = data.length;//页面显示记录条数，在页面显示每页显示多少项的时候
                param.start = data.start;//开始的记录序号
                param.page = (data.start / data.length) + 1;//当前页码
                param.probedata = JSON.stringify(vm.probedata);
                /*用于查询probe数据*/
                console.log(param);
                //ajax请求数据
                $.ajax({
                    type: "POST", /*GET会乱码*/
                    url: "../../cem/taskproberel/list",
                    cache: false,  //禁用缓存
                    data: param,  //传入组装的参数
                    dataType: "json",
                    success: function (result) {
                        console.log(result);

                        //封装返回数据
                        let returnData = {};
                        returnData.draw = data.draw;//这里直接自行返回了draw计数器,应该由后台返回
                        returnData.recordsTotal = result.page.totalCount;//返回数据全部记录
                        returnData.recordsFiltered = result.page.totalCount;//后台不实现过滤功能，每次查询均视作全部结果
                        // returnData.data = result.page.list;//返回的数据列表
                        // 重新整理返回数据以匹配表格
                        let rows = [];
                        var i = param.start+1;
                        result.page.list.forEach(function (item) {
                            var status_word;
                            if(item.status==1){status_word="正在执行";}else{status_word="已取消";}
                            let row = [];
                            row.push(i++);
                            row.push('<div class="checkbox"> <label> <input type="checkbox" name="selectFlag" ><div style="display: none">'+item.id+'</div></label> </div>');
                            row.push('<div class="probe_id" >'+item.id+'</div>');
                            row.push(item.taskName);
                            row.push(item.probeName);
                            row.push(item.port);
                            row.push(status_word);
                            //row.push(item.status);
                            row.push(item.remark);
                            row.push('<a class="fontcolor" onclick="delete_this(this)" id='+item.id+'>取消</a>');
                            rows.push(row);
                        });
                        returnData.data = rows;
                        console.log(returnData);
                        //调用DataTables提供的callback方法，代表数据已封装完成并传回DataTables进行渲染
                        //此时的数据需确保正确无误，异常判断应在执行此回调前自行处理完毕
                        callback(returnData);
                        $("#probedata_table").colResizable({
                            liveDrag:true,
                            gripInnerHtml:"<div class='grip'></div>",
                            draggingClass:"dragging",
                            resizeMode:'overflow',
                        });
                    }
                });
            }
        });
    }
});



