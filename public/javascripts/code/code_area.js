var code_areaRowEditor_number = 0;

var code_areaFields = [
	{name: "id",type: 'int'}
	,{name: "acode",type: 'int'}
	,{name: "aname",type: 'string'}
	,{name: "use_status",type: 'bool'}
];	

var code_areaNewRecord = Ext.data.Record.create(code_areaFields);

var code_areaWriter = new Ext.data.JsonWriter({
   writeAllFields : true
});

var code_areaRowEditor = new Ext.ux.grid.RowEditor({
	saveText			: 'บันทึก',
	cancelText		: 'ยกเลิก',
	listeners			: {
		validateedit	: function(rowEditor, obj,data, rowIndex ) {	
			loadMask.show();
			code_areaRowEditor_number  = rowIndex
		},
		canceledit : function(rowEditor, obj,data, rowIndex ) {	
			code_areaRowEditor_number  = rowIndex
		}
	}
});

var code_areacheckColumn = new Ext.grid.CheckColumn({
	header				: 'สถานะการใช้งาน',
	dataIndex		: 'use_status',
	width				: 100,
	editor				: new Ext.form.Checkbox()
});

var code_areaCols = [
	{
		header			: "#"
		,width			: 30
		,renderer		: rowNumberer.createDelegate(this)
		, sortable		: false
	},{
		header			: "รหัสเขต",		
		width			: 200, 
		sortable		: false, 
		dataIndex	: 'acode',
		editor			: new Ext.form.NumberField({allowBlank: false})
	},{
		header			: "เขต",		
		width			: 100, 
		sortable		: false, 
		dataIndex	: 'aname',
		editor			: new Ext.form.TextField({allowBlank: false})
	}
	,code_areacheckColumn
];	

var code_areaSearch = new Ext.ux.grid.Search({
	iconCls			: 'search'
	,minChars		: 3
	,autoFocus		: true
	,position			: "top"
	,width				: 200
});

var code_areaProxy = new Ext.data.HttpProxy({
   api : {
	   read			: '/code_area/read',
	   create		: '/code_area/create',
	   update		: '/code_area/update',
	   destroy		: 'code_area/delete'
   }
});	

var code_areaGridStore = new Ext.data.JsonStore({
	proxy						: code_areaProxy,
	root							: 'records',
	autoLoad					: false,
	totalProperty			: 'totalCount',
	remoteSort				: true,
	fields						: code_areaFields,
	idProperty				: 'id',
	successProperty		: 'success',
	writer						: code_areaWriter,
	autoSave					: true,
	listeners             : {
		write				: function (store,action,result,res,rs){
			if (res.success == true)
			{
				code_areaGridStore.load({ params: { start: 0, limit: 20} });
			} 
			loadMask.hide();		
		},
		exception		: function(proxy, type, action, option, res, arg) {
			if (action == "create")
			{
				var obj = Ext.util.JSON.decode(res.responseText);
				if (obj.success == false)
				{
					if (obj.msg)
					{					
						Ext.Msg.alert("สถานะ",obj.msg, 
							function(btn, text){										
								if (btn == 'ok')
								{
									code_areaGridStore.removeAt(code_areaRowEditor_number);
									code_areaGrid.getView().refresh();
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
						Ext.Msg.alert("สถานะ",res.raw.msg, 
							function(btn, text){										
								if (btn == 'ok')
								{
									code_areaGridStore.reload();
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

var code_areaGrid = new Ext.grid.GridPanel({
	title								: "เขต",
	region							: 'center',
	split								: true,
	store							: code_areaGridStore,
	columns						: code_areaCols,
	stripeRows					: true,	
	loadMask						: {msg:'Loading...'},
	sm								: new Ext.grid.RowSelectionModel({singleSelect: true}),
	plugins						: [code_areaRowEditor,code_areaSearch],
	tbar								: [
		{
			text				: 'เพิ่ม',
			tooltip			: 'เพิ่ม',
			iconCls		: 'table-add',
			handler: function(){
				var e = new code_areaNewRecord({
					id					    : ""
					,acode				: ""
					,aname			: ""
					,use_status		: ""
				});
				code_areaRowEditor.stopEditing();
				code_areaGridStore.insert(0, e);
				code_areaGrid.getView().refresh();
				code_areaGrid.getSelectionModel().selectRow(0);
				code_areaRowEditor.startEditing(0);
			}
		},"-",{
			ref				: '../removeBtn',
			text				: 'ลบ',
			tooltip			: 'ลบ',
			iconCls		: 'table-delete',
			disabled		: true,
			handler: function(){
				loadMask.show();
				code_areaRowEditor.stopEditing();
				var s = code_areaGrid.getSelectionModel().getSelections();
				for(var i = 0, r; r = s[i]; i++){
					code_areaGridStore.remove(r);
					code_areaGrid.getView().refresh();
				}
			}
		},"-",{
			text		: "Export",
			iconCls		: "table-go",
			menu		: {
				items	: [
					{
						text	: "Excel",
						iconCls	: "excel",
						handler : function() {

							var data = Ext.util.JSON.encode(code_areaGridStore.lastOptions.params);
							var form = document.createElement("form");
							form.setAttribute("method", "post");
							form.setAttribute("action", "/code_area/report?format=xls");
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
						text	: "PDF",
						iconCls	: "pdf",
						handler : function() {

							var data = Ext.util.JSON.encode(code_areaGridStore.lastOptions.params);
							var form = document.createElement("form");
							form.setAttribute("method", "post");
							form.setAttribute("action", "/code_area/report?format=pdf");
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
	],
	bbar						: new Ext.PagingToolbar({
		pageSize			: 20,
		autoWidth		: true,
		store				: code_areaGridStore,
		displayInfo		: true,
		displayMsg		: 'Displaying {0} - {1} of {2}',
		emptyMsg		: "Not found"
	})
	,listeners: {
		beforedestroy: function(p){
			code_areaRowEditor.stopEditing();
		}
	}
});


code_areaGrid.getSelectionModel().on('selectionchange', function(sm){
	code_areaGrid.removeBtn.setDisabled(sm.getCount() < 1);
});
