var code_divRowEditor_number = 0;

var code_divFields = [
        {name: "id", type: "int"}
        ,{name: "divcode", type: "int"}
        ,{name: "divname", type: "string"}
        ,{name: "stdcode", type: "string"}
        ,{name: "use_status", type: "bool"}
];

var code_divNewRecord = Ext.data.Record.create(code_divFields);

var code_divWriter = new Ext.data.JsonWriter({
   writeAllFields : true
});

var code_divRowEditor = new Ext.ux.grid.RowEditor({
        saveText                : 'บันทึก'
        ,cancelText             : 'ยกเลิก'
        ,listeners              : {
                validateedit    : function(rowEditor, obj, data, rowIndex ) {
                        loadMask.show();
                        code_divRowEditor_number = rowIndex;
                }
                ,canceledit : function(rowEditor, obj, data, rowIndex ) {
                        code_divRowEditor_number = rowIndex;
                }
        }
});

var code_divcheckColumn = new Ext.grid.CheckColumn({
        header: 'สถานะการใช้งาน'
        ,dataIndex: 'use_status'
        ,width: 100
        ,editor: new Ext.form.Checkbox()
});

var code_divCols = [
        {
                header: "#"
                ,width: 30
                ,renderer: rowNumberer.createDelegate(this)
                ,sortable: false
        }
        ,{header: "รหัส", width: 100, sortable: false, dataIndex: "divcode", editor: new Ext.form.NumberField({allowBlank: false})}
        ,{header: "กอง", width: 250, sortable: false, dataIndex: "divname", editor: new Ext.form.TextField({allowBlank: false})}
        ,{header: "รหัสแทน", width: 100, sortable: false, dataIndex: "stdcode", editor: new Ext.form.TextField({allowBlank: false})}
        ,code_divcheckColumn
];

var code_divSearch = new Ext.ux.grid.Search({
        iconCls: 'search'
        ,minChars: 3
        ,autoFocus: true
        ,position: "top"
        ,width: 200
});

var code_divProxy = new Ext.data.HttpProxy({
   api : {
           read: '/code_div/read'
           ,create: '/code_div/create'
           ,update: '/code_div/update'
           ,destroy: '/code_div/delete'
   }
});

var code_divGridStore = new Ext.data.JsonStore({
        proxy: code_divProxy
        ,root: 'records'
        ,autoLoad: false
        ,totalProperty: 'totalCount'
        ,remoteSort: true
        ,fields: code_divFields
        ,idProperty: 'id'
        ,successProperty: 'success'
        ,writer: code_divWriter
        ,autoSave: true
        ,listeners: {
                write : function (store, action, result, res, rs){
                        if (res.success == true)
                        {
                                code_divGridStore.load({ params: { start: 0, limit: 20} });
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
                                                                        code_divGridStore.removeAt(code_divRowEditor_number);
                                                                        code_divGrid.getView().refresh();
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
                                                                        code_divGridStore.reload();
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

var code_divGrid = new Ext.grid.GridPanel({
	title: "กอง"
	,region: 'center'
	,split: true
	,store: code_divGridStore
	,columns: code_divCols
	,stripeRows: true
	,loadMask: {msg:'Loading...'}
	,sm: new Ext.grid.RowSelectionModel({singleSelect: true})
	,plugins: [code_divRowEditor,code_divSearch]
	,tbar: [
			{
					text: 'เพิ่ม'
					,tooltip: 'เพิ่ม'
					,iconCls: 'table-add'
					,handler: function(){
							var e = new code_divNewRecord({
									id: ""
									,divcode: ""
									,divname: ""
									,stdcode: ""
									,use_status: ""
							});
							code_divRowEditor.stopEditing();
							code_divGridStore.insert(0, e);
							code_divGrid.getView().refresh();
							code_divGrid.getSelectionModel().selectRow(0);
							code_divRowEditor.startEditing(0);
					}
			},"-",{
					ref: '../removeBtn'
					,text: 'ลบ'
					,tooltip: 'ลบ'
					,iconCls: 'table-delete'
					,disabled: true
					,handler: function(){
							loadMask.show();
							code_divRowEditor.stopEditing();
							var s = code_divGrid.getSelectionModel().getSelections();
							for(var i = 0, r; r = s[i]; i++){
									code_divGridStore.remove(r);
									code_divGrid.getView().refresh();
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
													var data = Ext.util.JSON.encode(code_divGridStore.lastOptions.params);
													var form = document.createElement("form");
													form.setAttribute("method", "post");
													form.setAttribute("action", "/code_div/report?format=xls");
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
													var data = Ext.util.JSON.encode(code_divGridStore.lastOptions.params);
													var form = document.createElement("form");
													form.setAttribute("method", "post");
													form.setAttribute("action", "/code_div/report?format=pdf");
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
			,store: code_divGridStore
			,displayInfo: true
			,displayMsg: 'Displaying {0} - {1} of {2}'
			,emptyMsg: "Not found"
	})
	,listeners: {
		beforedestroy: function(p){
			code_divRowEditor.stopEditing();
		}
	}
});

code_divGrid.getSelectionModel().on('selectionchange', function(sm){
        code_divGrid.removeBtn.setDisabled(sm.getCount() < 1);
});