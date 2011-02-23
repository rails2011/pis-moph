var code_sdtypeRowEditor_number = 0;

var code_sdtypeFields = [
        {name: "id", type: "int"}
        ,{name: "sdtcode", type: "int"}
        ,{name: "sdtname", type: "string"}
        ,{name: "stdcode", type: "string"}
        ,{name: "use_status", type: "bool"}
];

var code_sdtypeNewRecord = Ext.data.Record.create(code_sdtypeFields);

var code_sdtypeWriter = new Ext.data.JsonWriter({
   writeAllFields : true
});

var code_sdtypeRowEditor = new Ext.ux.grid.RowEditor({
        saveText                : 'บันทึก'
        ,cancelText             : 'ยกเลิก'
        ,listeners              : {
                validateedit    : function(rowEditor, obj, data, rowIndex ) {
                        loadMask.show();
                        code_sdtypeRowEditor_number = rowIndex;
                }
                ,canceledit : function(rowEditor, obj, data, rowIndex ) {
                        code_sdtypeRowEditor_number = rowIndex;
                }
        }
});

var code_sdtypecheckColumn = new Ext.grid.CheckColumn({
        header                  : 'สถานะการใช้งาน'
        ,dataIndex              : 'use_status'
        ,width                  : 100
        ,editor                 : new Ext.form.Checkbox()
});

var code_sdtypeCols = [
        {
                header          : "#"
                ,width          : 30
                ,renderer       : rowNumberer.createDelegate(this)
                ,sortable       : false
        }
        ,{header: "รหัส", width: 100, sortable: false, dataIndex: "sdtcode", editor: new Ext.form.NumberField({allowBlank: false})}
        ,{header: "ประเภทหน่วยงาน", width: 250, sortable: false, dataIndex: "sdtname", editor: new Ext.form.TextField({allowBlank: false})}
        ,{header: "รหัสแทน", width: 100, sortable: false, dataIndex: "stdcode", editor: new Ext.form.TextField({allowBlank: false})}
        ,code_sdtypecheckColumn
];

var code_sdtypeSearch = new Ext.ux.grid.Search({
        iconCls         : 'search'
        ,minChars       : 3
        ,autoFocus      : true
        ,position       : "top"
        ,width          : 200
});

var code_sdtypeProxy = new Ext.data.HttpProxy({
   api : {
           read         : '/code_sdtype/read'
           ,create      : '/code_sdtype/create'
           ,update      : '/code_sdtype/update'
           ,destroy     : '/code_sdtype/delete'
   }
});

var code_sdtypeGridStore = new Ext.data.JsonStore({
        proxy                           : code_sdtypeProxy
        ,root                           : 'records'
        ,autoLoad                       : false
        ,totalProperty          : 'totalCount'
        ,remoteSort                     : true
        ,fields                         : code_sdtypeFields
        ,idProperty                     : 'id'
        ,successProperty        : 'success'
        ,writer                         : code_sdtypeWriter
        ,autoSave                       : true
        ,listeners                      : {
                write : function (store, action, result, res, rs){
                        if (res.success == true)
                        {
                                code_sdtypeGridStore.load({ params: { start: 0, limit: 20} });
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
                                                                        code_sdtypeGridStore.removeAt(code_sdtypeRowEditor_number);
                                                                        code_sdtypeGrid.getView().refresh();
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
                                                                        code_sdtypeGridStore.reload();
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

var code_sdtypeGrid = new Ext.grid.GridPanel({
	title						: "ประเภทหน่วยงาน"
	,region                  : 'center'
	,split                  : true
	,store                  : code_sdtypeGridStore
	,columns                : code_sdtypeCols
	,stripeRows             : true
	,loadMask               : {msg:'Loading...'}
	,sm                             : new Ext.grid.RowSelectionModel({singleSelect: true})
	,plugins                        : [code_sdtypeRowEditor,code_sdtypeSearch]
	,tbar                   : [
			{
					text                    : 'เพิ่ม'
					,tooltip                : 'เพิ่ม'
					,iconCls                : 'table-add'
					,handler        : function(){
							var e = new code_sdtypeNewRecord({
									id                              : ""
									,sdtcode                : ""
									,sdtname                : ""
									,stdcode                : ""
									,use_status             : ""
							});
							code_sdtypeRowEditor.stopEditing();
							code_sdtypeGridStore.insert(0, e);
							code_sdtypeGrid.getView().refresh();
							code_sdtypeGrid.getSelectionModel().selectRow(0);
							code_sdtypeRowEditor.startEditing(0);
					}
			},"-",{
					ref                     : '../removeBtn'
					,text           : 'ลบ'
					,tooltip                : 'ลบ'
					,iconCls                : 'table-delete'
					,disabled       : true
					,handler        : function(){
							loadMask.show();
							code_sdtypeRowEditor.stopEditing();
							var s = code_sdtypeGrid.getSelectionModel().getSelections();
							for(var i = 0, r; r = s[i]; i++){
									code_sdtypeGridStore.remove(r);
									code_sdtypeGrid.getView().refresh();
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
													var data = Ext.util.JSON.encode(code_sdtypeGridStore.lastOptions.params);
													var form = document.createElement("form");
													form.setAttribute("method", "post");
													form.setAttribute("action", "/code_sdtype/report?format=xls");
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
													var data = Ext.util.JSON.encode(code_sdtypeGridStore.lastOptions.params);
													var form = document.createElement("form");
													form.setAttribute("method", "post");
													form.setAttribute("action", "/code_sdtype/report?format=pdf");
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
	,bbar                           : new Ext.PagingToolbar({
			pageSize                : 20
			,autoWidth              : true
			,store                  : code_sdtypeGridStore
			,displayInfo            : true
			,displayMsg             : 'Displaying {0} - {1} of {2}'
			,emptyMsg               : "Not found"
	})
	,listeners: {
		beforedestroy: function(p){
			code_sdtypeRowEditor.stopEditing();
		}
	}
});

code_sdtypeGrid.getSelectionModel().on('selectionchange', function(sm){
        code_sdtypeGrid.removeBtn.setDisabled(sm.getCount() < 1);
});
