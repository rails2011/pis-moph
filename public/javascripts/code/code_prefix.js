var code_prefixRowEditor_number = 0;

var code_prefixFields = [
        {name: "id", type: "int"}
        ,{name: "precode", type: "int"}
        ,{name: "prename", type: "string"}
        ,{name: "longpre", type: "string"}
        ,{name: "prefax", type: "int"}
        ,{name: "stdcode", type: "string"}
        ,{name: "use_status", type: "bool"}
];

var code_prefixNewRecord = Ext.data.Record.create(code_prefixFields);

var code_prefixWriter = new Ext.data.JsonWriter({
   writeAllFields : true
});

var code_prefixRowEditor = new Ext.ux.grid.RowEditor({
        saveText                : 'บันทึก'
        ,cancelText             : 'ยกเลิก'
        ,listeners              : {
                validateedit    : function(rowEditor, obj, data, rowIndex ) {
                        loadMask.show();
                        code_prefixRowEditor_number = rowIndex;
                }
                ,canceledit : function(rowEditor, obj, data, rowIndex ) {
                        code_prefixRowEditor_number = rowIndex;
                }
        }
});

var code_prefixcheckColumn = new Ext.grid.CheckColumn({
        header                  : 'สถานะการใช้งาน'
        ,dataIndex              : 'use_status'
        ,width                  : 100
        ,editor                 : new Ext.form.Checkbox()
});

var code_prefixCols = [
        {
                header          : "#"
                ,width          : 30
                ,renderer       : rowNumberer.createDelegate(this)
                ,sortable       : false
        }
        ,{header: "รหัส", width: 100, sortable: false, dataIndex: "precode", editor: new Ext.form.NumberField({allowBlank: false})}
        ,{header: "คำนำหน้าชื่อ", width: 150, sortable: false, dataIndex: "prename", editor: new Ext.form.TextField({allowBlank: false})}
        ,{header: "คำนำหน้าชื่อแบบยาว", width: 150, sortable: false, dataIndex: "longpre", editor: new Ext.form.TextField({allowBlank: false})}
        ,{header: "prefax", width: 100, sortable: false, dataIndex: "prefax", editor: new Ext.form.NumberField({allowBlank: false})}
        ,{header: "รหัสแทน", width: 100, sortable: false, dataIndex: "stdcode", editor: new Ext.form.TextField({allowBlank: false})}
        ,code_prefixcheckColumn
];

var code_prefixSearch = new Ext.ux.grid.Search({
        iconCls         : 'search'
        ,minChars       : 3
        ,autoFocus      : true
        ,position       : "top"
        ,width          : 200
});

var code_prefixProxy = new Ext.data.HttpProxy({
   api : {
           read         : '/code_prefix/read'
           ,create      : '/code_prefix/create'
           ,update      : '/code_prefix/update'
           ,destroy     : '/code_prefix/delete'
   }
});

var code_prefixGridStore = new Ext.data.JsonStore({
        proxy                           : code_prefixProxy
        ,root                           : 'records'
        ,autoLoad                       : false
        ,totalProperty          : 'totalCount'
        ,remoteSort                     : true
        ,fields                         : code_prefixFields
        ,idProperty                     : 'id'
        ,successProperty        : 'success'
        ,writer                         : code_prefixWriter
        ,autoSave                       : true
        ,listeners                      : {
                write : function (store, action, result, res, rs){
                        if (res.success == true)
                        {
                                code_prefixGridStore.load({ params: { start: 0, limit: 20} });
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
                                                                        code_prefixGridStore.removeAt(code_prefixRowEditor_number);
                                                                        code_prefixGrid.getView().refresh();
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
                                                                        code_prefixGridStore.reload();
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

var code_prefixGrid = new Ext.grid.GridPanel({
	title: "คำนำหน้าชื่อ"
	,region: 'center'
	,split: true
	,store: code_prefixGridStore
	,columns: code_prefixCols
	,stripeRows: true
	,loadMask: {msg:'Loading...'}
	,sm: new Ext.grid.RowSelectionModel({singleSelect: true})
	,plugins: [code_prefixRowEditor,code_prefixSearch]
	,tbar: [
			{
					text: 'เพิ่ม'
					,tooltip: 'เพิ่ม'
					,iconCls: 'table-add'
					,handler: function(){
							var e = new code_prefixNewRecord({
									id: ""
									,precode: ""
									,prename: ""
									,longpre: ""
									,prefax: ""
									,stdcode: ""
									,use_status: ""
							});
							code_prefixRowEditor.stopEditing();
							code_prefixGridStore.insert(0, e);
							code_prefixGrid.getView().refresh();
							code_prefixGrid.getSelectionModel().selectRow(0);
							code_prefixRowEditor.startEditing(0);
					}
			},"-",{
					ref: '../removeBtn'
					,text: 'ลบ'
					,tooltip: 'ลบ'
					,iconCls: 'table-delete'
					,disabled: true
					,handler: function(){
							loadMask.show();
							code_prefixRowEditor.stopEditing();
							var s = code_prefixGrid.getSelectionModel().getSelections();
							for(var i = 0, r; r = s[i]; i++){
									code_prefixGridStore.remove(r);
									code_prefixGrid.getView().refresh();
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
													var data = Ext.util.JSON.encode(code_prefixGridStore.lastOptions.params);
													var form = document.createElement("form");
													form.setAttribute("method", "post");
													form.setAttribute("action", "/code_prefix/report?format=xls");
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
											,handler: function() {
													var data = Ext.util.JSON.encode(code_prefixGridStore.lastOptions.params);
													var form = document.createElement("form");
													form.setAttribute("method", "post");
													form.setAttribute("action", "/code_prefix/report?format=pdf");
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
			,store: code_prefixGridStore
			,displayInfo: true
			,displayMsg: 'Displaying {0} - {1} of {2}'
			,emptyMsg: "Not found"
	})
	,listeners: {
		beforedestroy: function(p){
			code_prefixRowEditor.stopEditing();
		}
	}
});

code_prefixGrid.getSelectionModel().on('selectionchange', function(sm){
        code_prefixGrid.removeBtn.setDisabled(sm.getCount() < 1);
});
