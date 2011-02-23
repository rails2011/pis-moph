var code_minisRowEditor_number = 0;

var code_minisFields = [
        {name: "id", type: "int"}
        ,{name: "mincode", type: "int"}
        ,{name: "minname", type: "string"}
        ,{name: "stdcode", type: "string"}
        ,{name: "use_status", type: "bool"}
];

var code_minisNewRecord = Ext.data.Record.create(code_minisFields);

var code_minisWriter = new Ext.data.JsonWriter({
   writeAllFields : true
});

var code_minisRowEditor = new Ext.ux.grid.RowEditor({
        saveText                : 'บันทึก'
        ,cancelText             : 'ยกเลิก'
        ,listeners              : {
                validateedit    : function(rowEditor, obj, data, rowIndex ) {
                        loadMask.show();
                        code_minisRowEditor_number = rowIndex;
                }
                ,canceledit : function(rowEditor, obj, data, rowIndex ) {
                        code_minisRowEditor_number = rowIndex;
                }
        }
});

var code_minischeckColumn = new Ext.grid.CheckColumn({
        header                  : 'สถานะการใช้งาน'
        ,dataIndex              : 'use_status'
        ,width                  : 100
        ,editor                 : new Ext.form.Checkbox()
});

var code_minisCols = [
        {
                header          : "#"
                ,width          : 30
                ,renderer       : rowNumberer.createDelegate(this)
                ,sortable       : false
        }
        ,{header: "รหัส", width: 100, sortable: false, dataIndex: "mincode", editor: new Ext.form.NumberField({allowBlank: false})}
        ,{header: "กระทรวง", width: 250, sortable: false, dataIndex: "minname", editor: new Ext.form.TextField({allowBlank: false})}
        ,{header: "รหัสแทน", width: 100, sortable: false, dataIndex: "stdcode", editor: new Ext.form.TextField({allowBlank: false})}
        ,code_minischeckColumn
];

var code_minisSearch = new Ext.ux.grid.Search({
        iconCls         : 'search'
        ,minChars       : 3
        ,autoFocus      : true
        ,position       : "top"
        ,width          : 200
});

var code_minisProxy = new Ext.data.HttpProxy({
   api : {
           read         : '/code_minis/read'
           ,create      : '/code_minis/create'
           ,update      : '/code_minis/update'
           ,destroy     : '/code_minis/delete'
   }
});

var code_minisGridStore = new Ext.data.JsonStore({
        proxy                           : code_minisProxy
        ,root                           : 'records'
        ,autoLoad                       : false
        ,totalProperty          : 'totalCount'
        ,remoteSort                     : true
        ,fields                         : code_minisFields
        ,idProperty                     : 'id'
        ,successProperty        : 'success'
        ,writer                         : code_minisWriter
        ,autoSave                       : true
        ,listeners                      : {
                write : function (store, action, result, res, rs){
                        if (res.success == true)
                        {
                                code_minisGridStore.load({ params: { start: 0, limit: 20} });
                        }
                        loadMask.hide();
                }
                ,exception : function(proxy, type, action, option, res, arg) {
                        if (action == "create")
                        {
                                var obj = Ext.util.JSON.decode(res.responseText);
                                if (obj.success == false)
                                {
                                        if (obj.msg)
                                        {
                                                Ext.Msg.alert("สถานะ", obj.msg,
                                                        function(btn, text){
                                                                if (btn == 'ok')
                                                                {
                                                                        code_minisGridStore.removeAt(code_minisRowEditor_number);
                                                                        code_minisGrid.getView().refresh();
                                                                }
                                                        }
                                                );
                                        }
                                }
                        }
                        if (action == "update")
                        {
                                if (res.success == false)
                                {
                                        if (res.raw.msg)
                                        {
                                                Ext.Msg.alert("สถานะ", res.raw.msg,
                                                        function(btn, text){
                                                                if (btn == 'ok')
                                                                {
                                                                        code_minisGridStore.reload();
                                                                }
                                                        }
                                                );
                                        }
                                }
                        }
                        loadMask.hide();
                }
        }
});

var code_minisGrid = new Ext.grid.GridPanel({
	title: "กระทรวง"
	,region: 'center'
	,split: true
	,store: code_minisGridStore
	,columns: code_minisCols
	,stripeRows: true
	,loadMask: {msg:'Loading...'}
	,sm: new Ext.grid.RowSelectionModel({singleSelect: true})
	,plugins: [code_minisRowEditor,code_minisSearch]
	,tbar: [
			{
					text: 'เพิ่ม'
					,tooltip: 'เพิ่ม'
					,iconCls: 'table-add'
					,handler: function(){
							var e = new code_minisNewRecord({
									id: ""
									,mincode: ""
									,minname: ""
									,stdcode: ""
									,use_status: ""
							});
							code_minisRowEditor.stopEditing();
							code_minisGridStore.insert(0, e);
							code_minisGrid.getView().refresh();
							code_minisGrid.getSelectionModel().selectRow(0);
							code_minisRowEditor.startEditing(0);
					}
			},"-",{
					ref: '../removeBtn'
					,text: 'ลบ'
					,tooltip: 'ลบ'
					,iconCls: 'table-delete'
					,disabled: true
					,handler: function(){
							loadMask.show();
							code_minisRowEditor.stopEditing();
							var s = code_minisGrid.getSelectionModel().getSelections();
							for(var i = 0, r; r = s[i]; i++){
									code_minisGridStore.remove(r);
									code_minisGrid.getView().refresh();
							}
							loadMask.hide();
					}
			},"-",{
					text: "Export"
					,iconCls: "table-go"
					,menu: {
							items: [
									{
											text: "Excel"
											,iconCls: "excel"
											,handler: function() {
													var data = Ext.util.JSON.encode(code_minisGridStore.lastOptions.params);
													var form = document.createElement("form");
													form.setAttribute("method", "post");
													form.setAttribute("action", "/code_minis/report?format=xls");
													form.setAttribute("target", "_blank");
													var hiddenField = document.createElement("input");
													hiddenField.setAttribute("name", "data");
													hiddenField.setAttribute("value", data);
													form.appendChild(hiddenField);
													document.body.appendChild(form);
													form.submit();
													document.body.removeChild(form);
											}
									},{
											text: "PDF"
											,iconCls: "pdf"
											,handler : function() {
													var data = Ext.util.JSON.encode(code_minisGridStore.lastOptions.params);
													var form = document.createElement("form");
													form.setAttribute("method", "post");
													form.setAttribute("action", "/code_minis/report?format=pdf");
													form.setAttribute("target", "_blank");
													var hiddenField = document.createElement("input");
													hiddenField.setAttribute("name", "data");
													hiddenField.setAttribute("value", data);
													form.appendChild(hiddenField);
													document.body.appendChild(form);
													form.submit();
													document.body.removeChild(form);
											}
									}
							]
					}
			}
	]
	,bbar: new Ext.PagingToolbar({
			pageSize: 20
			,autoWidth: true
			,store: code_minisGridStore
			,displayInfo: true
			,displayMsg: 'Displaying {0} - {1} of {2}'
			,emptyMsg: "Not found"
	})
	,listeners: {
		beforedestroy: function(p){
			code_minisRowEditor.stopEditing();
		}
	}
});

code_minisGrid.getSelectionModel().on('selectionchange', function(sm){
        code_minisGrid.removeBtn.setDisabled(sm.getCount() < 1);
});
