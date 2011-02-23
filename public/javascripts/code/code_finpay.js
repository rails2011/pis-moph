var code_finpayRowEditor_number = 0;

var code_finpayFields = [
        {name: "id", type: "int"}
        ,{name: "fcode", type: "string"}
        ,{name: "finname", type: "string"}
        ,{name: "use_status", type: "bool"}
];

var code_finpayNewRecord = Ext.data.Record.create(code_finpayFields);

var code_finpayWriter = new Ext.data.JsonWriter({
   writeAllFields : true
});

var code_finpayRowEditor = new Ext.ux.grid.RowEditor({
        saveText                : 'บันทึก'
        ,cancelText             : 'ยกเลิก'
        ,listeners              : {
                validateedit    : function(rowEditor, obj, data, rowIndex ) {
                        loadMask.show();
                        code_finpayRowEditor_number = rowIndex;
                }
                ,canceledit : function(rowEditor, obj, data, rowIndex ) {
                        code_finpayRowEditor_number = rowIndex;
                }
        }
});

var code_finpaycheckColumn = new Ext.grid.CheckColumn({
        header                  : 'สถานะการใช้งาน'
        ,dataIndex              : 'use_status'
        ,width                  : 100
        ,editor                 : new Ext.form.Checkbox()
});

var code_finpayCols = [
        {
                header          : "#"
                ,width          : 30
                ,renderer       : rowNumberer.createDelegate(this)
                ,sortable       : false
        }
        ,{header: "รหัส", width: 100, sortable: false, dataIndex: "fcode", editor: new Ext.form.NumberField({allowBlank: false})}
        ,{header: "คลังเบิกจ่าย", width: 250, sortable: false, dataIndex: "finname", editor: new Ext.form.TextField({allowBlank: false})}
        ,code_finpaycheckColumn
];

var code_finpaySearch = new Ext.ux.grid.Search({
        iconCls         : 'search'
        ,minChars       : 3
        ,autoFocus      : true
        ,position       : "top"
        ,width          : 200
});

var code_finpayProxy = new Ext.data.HttpProxy({
   api : {
           read         : '/code_finpay/read'
           ,create      : '/code_finpay/create'
           ,update      : '/code_finpay/update'
           ,destroy     : '/code_finpay/delete'
   }
});

var code_finpayGridStore = new Ext.data.JsonStore({
        proxy                           : code_finpayProxy
        ,root                           : 'records'
        ,autoLoad                       : false
        ,totalProperty          : 'totalCount'
        ,remoteSort                     : true
        ,fields                         : code_finpayFields
        ,idProperty                     : 'id'
        ,successProperty        : 'success'
        ,writer                         : code_finpayWriter
        ,autoSave                       : true
        ,listeners                      : {
                write : function (store, action, result, res, rs){
                        if (res.success == true)
                        {
                                code_finpayGridStore.load({ params: { start: 0, limit: 20} });
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
                                                                        code_finpayGridStore.removeAt(code_finpayRowEditor_number);
                                                                        code_finpayGrid.getView().refresh();
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
                                                                        code_finpayGridStore.reload();
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

var code_finpayGrid = new Ext.grid.GridPanel({
	title: "คลังเบิกจ่าย"
	,region: 'center'
	,split: true
	,store: code_finpayGridStore
	,columns: code_finpayCols
	,stripeRows: true
	,loadMask: {msg:'Loading...'}
	,sm: new Ext.grid.RowSelectionModel({singleSelect: true})
	,plugins: [code_finpayRowEditor,code_finpaySearch]
	,tbar: [
			{
					text: 'เพิ่ม'
					,tooltip: 'เพิ่ม'
					,iconCls: 'table-add'
					,handler: function(){
							var e = new code_finpayNewRecord({
									id: ""
									,fcode: ""	
					,finname	: ""
									,use_status	: ""
							});
							code_finpayRowEditor.stopEditing();
							code_finpayGridStore.insert(0, e);
							code_finpayGrid.getView().refresh();
							code_finpayGrid.getSelectionModel().selectRow(0);
							code_finpayRowEditor.startEditing(0);
					}
			},"-",{
					ref             : '../removeBtn'
					,text           : 'ลบ'
					,tooltip        : 'ลบ'
					,iconCls        : 'table-delete'
					,disabled       : true
					,handler        : function(){
							loadMask.show();
							code_finpayRowEditor.stopEditing();
							var s = code_finpayGrid.getSelectionModel().getSelections();
							for(var i = 0, r; r = s[i]; i++){
									code_finpayGridStore.remove(r);
									code_finpayGrid.getView().refresh();
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
													var data = Ext.util.JSON.encode(code_finpayGridStore.lastOptions.params);
													var form = document.createElement("form");
													form.setAttribute("method", "post");
													form.setAttribute("action", "/code_finpay/report?format=xls");
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
													var data = Ext.util.JSON.encode(code_finpayGridStore.lastOptions.params);
													var form = document.createElement("form");
													form.setAttribute("method", "post");
													form.setAttribute("action", "/code_finpay/report?format=pdf");
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
			,store: code_finpayGridStore
			,displayInfo: true
			,displayMsg: 'Displaying {0} - {1} of {2}'
			,emptyMsg: "Not found"
	})
	,listeners: {
		beforedestroy: function(p){
			code_finpayRowEditor.stopEditing();
		}
	}	
});

code_finpayGrid.getSelectionModel().on('selectionchange', function(sm){
        code_finpayGrid.removeBtn.setDisabled(sm.getCount() < 1);
});
