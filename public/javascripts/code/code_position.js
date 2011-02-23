var code_positionRowEditor_number = 0;

var code_positionFields = [
	{name: "id", type: "int"}
	,{name: "poscode", type: "int"}
	,{name: "shortpre", type: "string"}
	,{name: "longpre", type: "string"}
	,{name: "posname", type: "string"}
	,{name: "stdcode", type: "string"}
	,{name: "use_status", type: "bool"}
];	

var code_positionNewRecord = Ext.data.Record.create(code_positionFields);

var code_positionWriter = new Ext.data.JsonWriter({
   writeAllFields : true
});

var code_positionRowEditor = new Ext.ux.grid.RowEditor({
	saveText		: 'บันทึก'
	,cancelText		: 'ยกเลิก'
	,listeners		: {
		validateedit	: function(rowEditor, obj, data, rowIndex ) {	
			loadMask.show();
			code_positionRowEditor_number = rowIndex;
		}
		,canceledit : function(rowEditor, obj, data, rowIndex ) {	
			code_positionRowEditor_number = rowIndex;
		}
	}
});

var code_positioncheckColumn = new Ext.grid.CheckColumn({
	header			: 'สถานะการใช้งาน'
	,dataIndex		: 'use_status'
	,width			: 100
	,editor			: new Ext.form.Checkbox()
});

var code_positionCols = [
	{
		header		: "#"
		,width		: 30
		,renderer	: rowNumberer.createDelegate(this)
		,sortable	: false
	}
	,{header: "รหัสตำแหน่ง", width: 100, sortable: false, dataIndex: "poscode", editor: new Ext.form.NumberField({allowBlank: false, minLength: 5, maxLength: 5 })}
	,{header: "ชื่อย่อคำนำหน้า", width: 100, sortable: false, dataIndex: "shortpre", editor: new Ext.form.TextField({allowBlank: false, maxLength: 5 })}
	,{header: "คำนำหน้า", width: 100, sortable: false, dataIndex: "longpre", editor: new Ext.form.TextField({allowBlank: false})}
	,{header: "ตำแหน่ง", width: 250, sortable: false, dataIndex: "posname", editor: new Ext.form.TextField({allowBlank: false})}
	,{header: "รหัสแทน", width: 100, sortable: false, dataIndex: "stdcode", editor: new Ext.form.TextField({allowBlank: false})}
	,code_positioncheckColumn
];	

var code_positionSearch = new Ext.ux.grid.Search({
	iconCls		: 'search'
	,minChars	: 3
	,autoFocus	: true
	,position	: "top"
	,width		: 200
});

var code_positionProxy = new Ext.data.HttpProxy({
   api : {
	   read		: '/code_position/read'
	   ,create	: '/code_position/create'
	   ,update	: '/code_position/update'
	   ,destroy	: '/code_position/delete'
   }
});	

var code_positionGridStore = new Ext.data.JsonStore({
	proxy: code_positionProxy
	,root: 'records'
	,autoLoad: false
	,totalProperty: 'totalCount'
	,remoteSort: true
	,fields: code_positionFields
	,idProperty: 'id'
	,successProperty: 'success'
	,writer: code_positionWriter
	,autoSave: true
	,listeners: {
		write : function (store, action, result, res, rs){
			if (res.success == true)
			{
				code_positionGridStore.load({ params: { start: 0, limit: 20} });
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
									code_positionGridStore.removeAt(code_positionRowEditor_number);
									code_positionGrid.getView().refresh();
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
									code_positionGridStore.reload();
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

var code_positionGrid = new Ext.grid.GridPanel({
	title: "ตำแหน่งสายงานข้าราชการ"
	,region: 'center'
	,split: true
	,store: code_positionGridStore
	,columns: code_positionCols
	,stripeRows: true
	,loadMask: {msg:'Loading...'}
	,sm: new Ext.grid.RowSelectionModel({singleSelect: true})
	,plugins: [code_positionRowEditor,code_positionSearch]
	,tbar: [
		{
			text: 'เพิ่ม'
			,tooltip: 'เพิ่ม'
			,iconCls: 'table-add'
			,handler: function(){
				var e = new code_positionNewRecord({
					id: ""
					,poscode: ""
					,shortpre: ""
					,longpre: ""
					,posname: ""
					,stdcode: ""
					,use_status: ""
				});
				code_positionRowEditor.stopEditing();
				code_positionGridStore.insert(0, e);
				code_positionGrid.getView().refresh();
				code_positionGrid.getSelectionModel().selectRow(0);
				code_positionRowEditor.startEditing(0);
			}
		},"-",{
			ref: '../removeBtn'
			,text: 'ลบ'
			,tooltip: 'ลบ'
			,iconCls: 'table-delete'
			,disabled: true
			,handler: function(){
				loadMask.show();
				code_positionRowEditor.stopEditing();
				var s = code_positionGrid.getSelectionModel().getSelections();
				for(var i = 0, r; r = s[i]; i++){
					code_positionGridStore.remove(r);
					code_positionGrid.getView().refresh();
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
							var data = Ext.util.JSON.encode(code_positionGridStore.lastOptions.params);
							var form = document.createElement("form");
							form.setAttribute("method", "post");
							form.setAttribute("action", "/code_position/report?format=xls");
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
							var data = Ext.util.JSON.encode(code_positionGridStore.lastOptions.params);
							var form = document.createElement("form");
							form.setAttribute("method", "post");
							form.setAttribute("action", "/code_position/report?format=pdf");
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
		,store: code_positionGridStore
		,displayInfo: true
		,displayMsg: 'Displaying {0} - {1} of {2}'
		,emptyMsg: "Not found"
	})
	,listeners: {
		beforedestroy: function(p){
			code_positionRowEditor.stopEditing();
		}
	}
});

code_positionGrid.getSelectionModel().on('selectionchange', function(sm){
	code_positionGrid.removeBtn.setDisabled(sm.getCount() < 1);
});
