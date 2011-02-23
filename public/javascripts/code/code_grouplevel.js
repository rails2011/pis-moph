var code_grouplevelRowEditor_number = 0;

var code_grouplevelFields = [
        {name: "id", type: "int"}
        ,{name: "ccode", type: "int"}
        ,{name: "cname", type: "string"}
        ,{name: "scname", type: "string"}
        ,{name: "stdcode", type: "string"}
        ,{name: "minsal", type: "float"}
        ,{name: "maxsal", type: "float"}
        ,{name: "gname", type: "string"}
        ,{name: "clname", type: "string"}
        ,{name: "use_status", type: "bool"}
];

var code_grouplevelNewRecord = Ext.data.Record.create(code_grouplevelFields);

var code_grouplevelWriter = new Ext.data.JsonWriter({
   writeAllFields : true
});

var code_grouplevelRowEditor = new Ext.ux.grid.RowEditor({
        saveText                : 'บันทึก'
        ,cancelText             : 'ยกเลิก'
        ,listeners              : {
                validateedit    : function(rowEditor, obj, data, rowIndex ) {
                        loadMask.show();
                        code_grouplevelRowEditor_number = rowIndex;
                }
                ,canceledit : function(rowEditor, obj, data, rowIndex ) {
                        code_grouplevelRowEditor_number = rowIndex;
                }
        }
});

var code_grouplevelcheckColumn = new Ext.grid.CheckColumn({
        header                  : 'สถานะการใช้งาน'
        ,dataIndex              : 'use_status'
        ,width                  : 100
        ,editor                 : new Ext.form.Checkbox()
});

var code_grouplevelCols = [
        {
                header          : "#"
                ,width          : 30
                ,renderer       : rowNumberer.createDelegate(this)
                ,sortable       : false
        }
        ,{header: "รหัส", width: 100, sortable: false, dataIndex: "ccode", editor: new Ext.form.NumberField({allowBlank: false})}
        ,{header: "ชื่อระดับ", width: 250, sortable: false, dataIndex: "cname", editor: new Ext.form.TextField({allowBlank: false})}
        ,{header: "คำย่อ", width: 50, sortable: false, dataIndex: "scname", editor: new Ext.form.TextField({allowBlank: false})}
        ,{header: "รหัสแทน", width: 100, sortable: false, dataIndex: "stdcode", editor: new Ext.form.TextField({allowBlank: false})}
        ,{header: "เงินเดือนขั้นต่ำ", width: 100, sortable: false, dataIndex: "minsal", editor: new Ext.form.NumberField({allowBlank: false})}
        ,{header: "เงินเดือนขั้นสูง", width: 100, sortable: false, dataIndex: "maxsal", editor: new Ext.form.NumberField({allowBlank: false})}
        ,{header: "กลุ่ม", width: 100, sortable: false, dataIndex: "gname", editor: new Ext.form.TextField({allowBlank: false})}
        ,{header: "ประเภท", width: 100, sortable: false, dataIndex: "clname", editor: new Ext.form.TextField({allowBlank: false})}
        ,code_grouplevelcheckColumn
];

var code_grouplevelSearch = new Ext.ux.grid.Search({
        iconCls         : 'search'
        ,minChars       : 3
        ,autoFocus      : true
        ,position       : "top"
        ,width          : 200
});

var code_grouplevelProxy = new Ext.data.HttpProxy({
   api : {
           read         : '/code_grouplevel/read'
           ,create      : '/code_grouplevel/create'
           ,update      : '/code_grouplevel/update'
           ,destroy     : '/code_grouplevel/delete'
   }
});

var code_grouplevelGridStore = new Ext.data.JsonStore({
        proxy                           : code_grouplevelProxy
        ,root                           : 'records'
        ,autoLoad                       : false
        ,totalProperty          : 'totalCount'
        ,remoteSort                     : true
        ,fields                         : code_grouplevelFields
        ,idProperty                     : 'id'
        ,successProperty        : 'success'
        ,writer                         : code_grouplevelWriter
        ,autoSave                       : true
        ,listeners                      : {
                write : function (store, action, result, res, rs){
                        if (res.success == true)
                        {
                                code_grouplevelGridStore.load({ params: { start: 0, limit: 20} });
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
                                                                        code_grouplevelGridStore.removeAt(code_grouplevelRowEditor_number);
                                                                        code_grouplevelGrid.getView().refresh();
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
                                                                        code_grouplevelGridStore.reload();
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

var code_grouplevelGrid = new Ext.grid.GridPanel({
	title: "กลุ่ม / ระดับ"
	,region: 'center'
	,split: true
	,store: code_grouplevelGridStore
	,columns: code_grouplevelCols
	,stripeRows: true
	,loadMask: {msg:'Loading...'}
	,sm: new Ext.grid.RowSelectionModel({singleSelect: true})
	,plugins: [code_grouplevelRowEditor,code_grouplevelSearch]
	,tbar: [
			{
					text: 'เพิ่ม'
					,tooltip: 'เพิ่ม'
					,iconCls: 'table-add'
					,handler: function(){
							var e = new code_grouplevelNewRecord({
									id: ""
									,ccode: ""
									,cname: ""
									,scname: ""
									,stdcode: ""
									,minsal: ""
									,maxsal: ""
									,gname: ""
									,clname: ""
									,use_status: ""
							});
							code_grouplevelRowEditor.stopEditing();
							code_grouplevelGridStore.insert(0, e);
							code_grouplevelGrid.getView().refresh();
							code_grouplevelGrid.getSelectionModel().selectRow(0);
							code_grouplevelRowEditor.startEditing(0);
					}
			},"-",{
					ref: '../removeBtn'
					,text: 'ลบ'
					,tooltip: 'ลบ'
					,iconCls: 'table-delete'
					,disabled: true
					,handler: function(){
							loadMask.show();
							code_grouplevelRowEditor.stopEditing();
							var s = code_grouplevelGrid.getSelectionModel().getSelections();
							for(var i = 0, r; r = s[i]; i++){
									code_grouplevelGridStore.remove(r);
									code_grouplevelGrid.getView().refresh();
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
													var data = Ext.util.JSON.encode(code_grouplevelGridStore.lastOptions.params);
													var form = document.createElement("form");
													form.setAttribute("method", "post");
													form.setAttribute("action", "/code_grouplevel/report?format=xls");
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
													var data = Ext.util.JSON.encode(code_grouplevelGridStore.lastOptions.params);
													var form = document.createElement("form");
													form.setAttribute("method", "post");
													form.setAttribute("action", "/code_grouplevel/report?format=pdf");
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
			,store: code_grouplevelGridStore
			,displayInfo: true
			,displayMsg: 'Displaying {0} - {1} of {2}'
			,emptyMsg: "Not found"
	})
	,listeners: {
		beforedestroy: function(p){
			code_grouplevelRowEditor.stopEditing();
		}
	}
});

code_grouplevelGrid.getSelectionModel().on('selectionchange', function(sm){
        code_grouplevelGrid.removeBtn.setDisabled(sm.getCount() < 1);
});
