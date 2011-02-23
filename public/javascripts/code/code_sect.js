var code_sectRowEditor_number = 0;

var code_sectFields = [
        {name: "id", type: "int"}
        ,{name: "sectcode", type: "int"}
        ,{name: "shortname", type: "string"}
        ,{name: "sectname", type: "string"}
        ,{name: "stdcode", type: "string"}
        ,{name: "use_status", type: "bool"}
];

var code_sectNewRecord = Ext.data.Record.create(code_sectFields);

var code_sectWriter = new Ext.data.JsonWriter({
   writeAllFields : true
});

var code_sectRowEditor = new Ext.ux.grid.RowEditor({
        saveText                : 'บันทึก'
        ,cancelText             : 'ยกเลิก'
        ,listeners              : {
                validateedit    : function(rowEditor, obj, data, rowIndex ) {
                        loadMask.show();
                        code_sectRowEditor_number = rowIndex;
                }
                ,canceledit : function(rowEditor, obj, data, rowIndex ) {
                        code_sectRowEditor_number = rowIndex;
                }
        }
});

var code_sectcheckColumn = new Ext.grid.CheckColumn({
        header                  : 'สถานะการใช้งาน'
        ,dataIndex              : 'use_status'
        ,width                  : 100
        ,editor                 : new Ext.form.Checkbox()
});

var code_sectCols = [
        {
                header          : "#"
                ,width          : 30
                ,renderer       : rowNumberer.createDelegate(this)
                ,sortable       : false
        }
        ,{header: "รหัส", width: 100, sortable: false, dataIndex: "sectcode", editor: new Ext.form.NumberField({allowBlank: false})}
        ,{header: "ชื่อย่อ", width: 100, sortable: false, dataIndex: "shortname", editor: new Ext.form.TextField({allowBlank: false})}
        ,{header: "ฝ่าย/กลุ่ม/งาน", width: 250, sortable: false, dataIndex: "sectname", editor: new Ext.form.TextField({allowBlank: false})}
        ,{header: "รหัสแทน", width: 100, sortable: false, dataIndex: "stdcode", editor: new Ext.form.TextField({allowBlank: false})}
        ,code_sectcheckColumn
];

var code_sectSearch = new Ext.ux.grid.Search({
        iconCls         : 'search'
        ,minChars       : 3
        ,autoFocus      : true
        ,position       : "top"
        ,width          : 200
});

var code_sectProxy = new Ext.data.HttpProxy({
   api : {
           read         : '/code_sect/read'
           ,create      : '/code_sect/create'
           ,update      : '/code_sect/update'
           ,destroy     : '/code_sect/delete'
   }
});

var code_sectGridStore = new Ext.data.JsonStore({
        proxy                           : code_sectProxy
        ,root                           : 'records'
        ,autoLoad                       : false
        ,totalProperty          : 'totalCount'
        ,remoteSort                     : true
        ,fields                         : code_sectFields
        ,idProperty                     : 'id'
        ,successProperty        : 'success'
        ,writer                         : code_sectWriter
        ,autoSave                       : true
        ,listeners                      : {
                write : function (store, action, result, res, rs){
                        if (res.success == true)
                        {
                                code_sectGridStore.load({ params: { start: 0, limit: 20} });
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
                                                                        code_sectGridStore.removeAt(code_sectRowEditor_number);
                                                                        code_sectGrid.getView().refresh();
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
                                                                        code_sectGridStore.reload();
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

var code_sectGrid = new Ext.grid.GridPanel({
	title						: "ฝ่าย / กลุ่ม / กลุ่มงาน"
	,region                  : 'center'
	,split                  : true
	,store                  : code_sectGridStore
	,columns                : code_sectCols
	,stripeRows             : true
	,loadMask               : {msg:'Loading...'}
	,sm                             : new Ext.grid.RowSelectionModel({singleSelect: true})
	,plugins                        : [code_sectRowEditor,code_sectSearch]
	,tbar                   : [
			{
					text                    : 'เพิ่ม'
					,tooltip                : 'เพิ่ม'
					,iconCls                : 'table-add'
					,handler        : function(){
							var e = new code_sectNewRecord({
									id                              : ""
									,sectcode               : ""
									,shortname              : ""
									,sectname               : ""
									,stdcode                : ""
									,use_status             : ""
							});
							code_sectRowEditor.stopEditing();
							code_sectGridStore.insert(0, e);
							code_sectGrid.getView().refresh();
							code_sectGrid.getSelectionModel().selectRow(0);
							code_sectRowEditor.startEditing(0);
					}
			},"-",{
					ref                     : '../removeBtn'
					,text           : 'ลบ'
					,tooltip                : 'ลบ'
					,iconCls                : 'table-delete'
					,disabled       : true
					,handler        : function(){
							loadMask.show();
							code_sectRowEditor.stopEditing();
							var s = code_sectGrid.getSelectionModel().getSelections();
							for(var i = 0, r; r = s[i]; i++){
									code_sectGridStore.remove(r);
									code_sectGrid.getView().refresh();
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
													var data = Ext.util.JSON.encode(code_sectGridStore.lastOptions.params);
													var form = document.createElement("form");
													form.setAttribute("method", "post");
													form.setAttribute("action", "/code_sect/report?format=xls");
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
													var data = Ext.util.JSON.encode(code_sectGridStore.lastOptions.params);
													var form = document.createElement("form");
													form.setAttribute("method", "post");
													form.setAttribute("action", "/code_sect/report?format=pdf");
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
			,store                  : code_sectGridStore
			,displayInfo            : true
			,displayMsg             : 'Displaying {0} - {1} of {2}'
			,emptyMsg               : "Not found"
	})
	,listeners: {
		beforedestroy: function(p){
			code_sectRowEditor.stopEditing();
		}
	}
});

code_sectGrid.getSelectionModel().on('selectionchange', function(sm){
        code_sectGrid.removeBtn.setDisabled(sm.getCount() < 1);
});
