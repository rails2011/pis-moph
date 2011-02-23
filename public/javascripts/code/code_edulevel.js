var code_edulevelRowEditor_number = 0;

var code_edulevelFields = [
        {name: "id", type: "int"}
        ,{name: "ecode", type: "int"}
        ,{name: "edulevel", type: "string"}
        ,{name: "stdcode", type: "string"}
        ,{name: "use_status", type: "bool"}
];

var code_edulevelNewRecord = Ext.data.Record.create(code_edulevelFields);

var code_edulevelWriter = new Ext.data.JsonWriter({
   writeAllFields : true
});

var code_edulevelRowEditor = new Ext.ux.grid.RowEditor({
        saveText: 'บันทึก'
        ,cancelText: 'ยกเลิก'
        ,listeners: {
                validateedit: function(rowEditor, obj, data, rowIndex ) {
                        loadMask.show();
                        code_edulevelRowEditor_number = rowIndex;
                }
                ,canceledit : function(rowEditor, obj, data, rowIndex ) {
                        code_edulevelRowEditor_number = rowIndex;
                }
        }
});

var code_edulevelcheckColumn = new Ext.grid.CheckColumn({
        header: 'สถานะการใช้งาน'
        ,dataIndex: 'use_status'
        ,width: 100
        ,editor: new Ext.form.Checkbox()
});

var code_edulevelCols = [
        {
                header: "#"
                ,width: 30
                ,renderer: rowNumberer.createDelegate(this)
                ,sortable: false
        }
        ,{header: "รหัสระดับการศึกษา", width: 100, sortable: false, dataIndex: "ecode", editor: new Ext.form.NumberField({allowBlank: false})}
        ,{header: "ระดับการศึกษา", width: 250, sortable: false, dataIndex: "edulevel", editor: new Ext.form.TextField({allowBlank: false})}
        ,{header: "รหัสแทน", width: 100, sortable: false, dataIndex: "stdcode", editor: new Ext.form.TextField({allowBlank: false})}
        ,code_edulevelcheckColumn
];

var code_edulevelSearch = new Ext.ux.grid.Search({
        iconCls: 'search'
        ,minChars: 3
        ,autoFocus: true
        ,position: "top"
        ,width: 200
});

var code_edulevelProxy = new Ext.data.HttpProxy({
   api : {
           read: '/code_edulevel/read'
           ,create: '/code_edulevel/create'
           ,update: '/code_edulevel/update'
           ,destroy: '/code_edulevel/delete'
   }
});

var code_edulevelGridStore = new Ext.data.JsonStore({
        proxy: code_edulevelProxy
        ,root: 'records'
        ,autoLoad: false
        ,totalProperty: 'totalCount'
        ,remoteSort: true
        ,fields: code_edulevelFields
        ,idProperty: 'id'
        ,successProperty: 'success'
        ,writer: code_edulevelWriter
        ,autoSave: true
        ,listeners: {
                write : function (store, action, result, res, rs){
                        if (res.success == true)
                        {
                                code_edulevelGridStore.load({ params: { start: 0, limit: 20} });
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
                                                                        code_edulevelGridStore.removeAt(code_edulevelRowEditor_number);
                                                                        code_edulevelGrid.getView().refresh();
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
                                                                        code_edulevelGridStore.reload();
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

var code_edulevelGrid = new Ext.grid.GridPanel({
	title: "ระดับการศึกษา"       
	,region: 'center'
	,split: true
	,store: code_edulevelGridStore
	,columns: code_edulevelCols
	,stripeRows: true
	,loadMask: {msg:'Loading...'}
	,sm: new Ext.grid.RowSelectionModel({singleSelect: true})
	,plugins: [code_edulevelRowEditor,code_edulevelSearch]
	,tbar: [
			{
					text: 'เพิ่ม'
					,tooltip: 'เพิ่ม'
					,iconCls: 'table-add'
					,handler: function(){
							var e = new code_edulevelNewRecord({
									id: ""
									,ecode: ""
									,edulevel: ""
									,stdcode: ""
									,use_status: ""
							});
							code_edulevelRowEditor.stopEditing();
							code_edulevelGridStore.insert(0, e);
							code_edulevelGrid.getView().refresh();
							code_edulevelGrid.getSelectionModel().selectRow(0);
							code_edulevelRowEditor.startEditing(0);
					}
			},"-",{
					ref                     : '../removeBtn'
					,text           : 'ลบ'
					,tooltip                : 'ลบ'
					,iconCls                : 'table-delete'
					,disabled       : true
					,handler        : function(){
							loadMask.show();
							code_edulevelRowEditor.stopEditing();
							var s = code_edulevelGrid.getSelectionModel().getSelections();
							for(var i = 0, r; r = s[i]; i++){
									code_edulevelGridStore.remove(r);
									code_edulevelGrid.getView().refresh();
							}
							loadMask.hide();
					}
			},"-",{
					text                    : "Export"
					,iconCls                : "table-go"
					,menu           : {
							items   : [
									{
											text                    : "Excel"
											,iconCls                : "excel"
											,handler        : function() {
													var data = Ext.util.JSON.encode(code_edulevelGridStore.lastOptions.params);
													var form = document.createElement("form");
													form.setAttribute("method", "post");
													form.setAttribute("action", "/code_edulevel/report?format=xls");
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
											text    : "PDF"
											,iconCls        : "pdf"
											,handler : function() {
													var data = Ext.util.JSON.encode(code_edulevelGridStore.lastOptions.params);
													var form = document.createElement("form");
													form.setAttribute("method", "post");
													form.setAttribute("action", "/code_edulevel/report?format=pdf");
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
			,store: code_edulevelGridStore
			,displayInfo: true
			,displayMsg: 'Displaying {0} - {1} of {2}'
			,emptyMsg: "Not found"
	})
	,listeners: {
		beforedestroy: function(p){
			code_edulevelRowEditor.stopEditing();
		}
	}
});

code_edulevelGrid.getSelectionModel().on('selectionchange', function(sm){
        code_edulevelGrid.removeBtn.setDisabled(sm.getCount() < 1);
});
