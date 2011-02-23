var code_tumbonRowEditor_number = 0;

var code_tumbonFields = [
	{name: "id",type: 'int'}
	,{name: "tmcode",type: 'int'}
	,{name: "amcode",type: 'int'}
	,{name: "provcode",type: 'int'}
	,{name: "shortpre",type: 'string'}
	,{name: "longpre",type: 'string'}
	,{name: "tmname",type: 'string'}
	,{name: "use_status",type: 'bool'}
];	

var code_tumbonNewRecord = Ext.data.Record.create(code_tumbonFields);

var code_tumbonWriter = new Ext.data.JsonWriter({
   writeAllFields : true
});

var code_tumbonRowEditor = new Ext.ux.grid.RowEditor({
	saveText			: 'บันทึก'
	,cancelText		: 'ยกเลิก'
	,listeners			: {
		validateedit	: function(rowEditor, obj,data, rowIndex ) {	
			loadMask.show();
			code_tumbonRowEditor_number  = rowIndex
		}
		,canceledit : function(rowEditor, obj,data, rowIndex ) {	
			code_tumbonRowEditor_number  = rowIndex
		}
	}

});

var code_tumboncheckColumn = new Ext.grid.CheckColumn({
	header				: 'สถานะการใช้งาน'
	,dataIndex		: 'use_status'
	,width				: 100
	,editor				: new Ext.form.Checkbox()
});

var code_tumbonCols = [
	{
		header			: "#"
		,width			: 30
		,renderer		: rowNumberer.createDelegate(this)
		, sortable		: false
	},{
		header			: "รหัสตำบล"
		,width			: 100
		,sortable		: false
		,dataIndex	: 'tmcode'
		,editor			: new Ext.form.TextField({allowBlank: false})
	},{
		header			: "ชื่อย่อคำนำหน้าตำบล"
		,width			: 150
		,sortable		: false
		,dataIndex	: 'shortpre'
		,editor			: new Ext.form.TextField()
	},{
		header			: "คำนำหน้าตำบล"
		,width			: 100
		,sortable		: false
		,dataIndex	: 'longpre'
		,editor			: new Ext.form.TextField()
	},{
		header			: "ตำบล"
		,width			: 100
		,sortable		: false
		,dataIndex	: 'tmname'
		,editor			: new Ext.form.TextField()
	}
	,code_tumboncheckColumn
];	

var code_tumbonSearch = new Ext.ux.grid.Search({
	iconCls			: 'search'
	,minChars		: 3
	,autoFocus		: true
	,position			: "top"
	,width				: 200
});

var code_tumbonProxy = new Ext.data.HttpProxy({
   api : {
	   read			: '/code_tumbon/read'
	   ,create		: '/code_tumbon/create'
	   ,update		: '/code_tumbon/update'
	   ,destroy	: '/code_tumbon/delete'
   }
});	

var code_tumbonGridStore = new Ext.data.JsonStore({
	proxy						: code_tumbonProxy
	,root							: 'records'
	,autoLoad				: false
	,totalProperty			: 'totalCount'
	,remoteSort				: true
	,fields						: code_tumbonFields
	,idProperty				: 'id'
	,successProperty	: 'success'
	,writer						: code_tumbonWriter
	,autoSave				: true
	,listeners					: {
		write				: function (store,action,result,res,rs){
			if (res.success == true)
			{
				code_tumbonGridStore.load({ params: { start: 0, limit: 20} });
			} 
			loadMask.hide();		
		}
		,exception	: function(proxy, type, action, option, res, arg) {
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
									code_tumbonGridStore.removeAt(code_tumbonRowEditor_number);
									code_tumbonGrid.getView().refresh();
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
									code_tumbonGridStore.reload();
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

var code_tumbonGrid = new Ext.grid.GridPanel({
	title								: "ตำบล"
	,region							: 'center'
	,disabled						: true
	,split							: true
	,store							: code_tumbonGridStore
	,columns						: code_tumbonCols
	,stripeRows					: true
	,loadMask					: {msg:'Loading...'}
	,sm								: new Ext.grid.RowSelectionModel({singleSelect: true})
	,plugins						: [code_tumbonRowEditor,code_tumbonSearch]
	,tbar								: [
		{
			text				: 'เพิ่ม'
			,tooltip			: 'เพิ่ม'
			,iconCls		: 'table-add'
			,handler: function(){
				var e = new code_tumbonNewRecord({
						id						: ""
						,tmcode			: ""
						,amcode			: ct_source_amphur.getValue()
						,provcode		: ct_source_province.getValue()
						,shortpre			: ""
						,longpre			: ""
						,tmname			: ""
						,use_status		: ""
				});
				code_tumbonRowEditor.stopEditing();
				code_tumbonGridStore.insert(0, e);
				code_tumbonGrid.getView().refresh();
				code_tumbonGrid.getSelectionModel().selectRow(0);
				code_tumbonRowEditor.startEditing(0);
			}
		},"-",{
			ref				: '../removeBtn'
			,text				: 'ลบ'
			,tooltip			: 'ลบ'
			,iconCls		: 'table-delete'
			,disabled		: true
			,handler: function(){
				loadMask.show();
				code_tumbonRowEditor.stopEditing();
				var s = code_tumbonGrid.getSelectionModel().getSelections();
				for(var i = 0, r; r = s[i]; i++){
					code_tumbonGridStore.remove(r);
					code_tumbonGrid.getView().refresh();
				}
			}
		},"-",{
			text				: "Export"
			,iconCls		: "door-out"
			,menu			: {
				items	: [
					{
						text			: "Excel"
						,iconCls	: "excel"
						,handler	: function() {
							var data = Ext.util.JSON.encode(code_tumbonGridStore.lastOptions.params);
							var form = document.createElement("form");
							form.setAttribute("method", "post");
							form.setAttribute("action", "/code_tumbon/report?format=xls");
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
						text			: "PDF"
						,iconCls	: "pdf"
						,handler	: function() {
							var data = Ext.util.JSON.encode(code_tumbonGridStore.lastOptions.params);
							var form = document.createElement("form");
							form.setAttribute("method", "post");
							form.setAttribute("action", "/code_tumbon/report?format=pdf");
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
	,bbar						: new Ext.PagingToolbar({
		pageSize			: 20
		,autoWidth		: true
		,store				: code_tumbonGridStore
		,displayInfo		: true
		,displayMsg	: 'Displaying {0} - {1} of {2}'
		,emptyMsg		: "Not found"
	})
});


code_tumbonGrid.getSelectionModel().on('selectionchange', function(sm){
	code_tumbonGrid.removeBtn.setDisabled(sm.getCount() < 1);
});

var ct_genres_province = new Ext.data.Store({
	reader: new Ext.data.JsonReader({
		fields	: ['provcode', 'provname']
		,root		: 'records'
	})
	,url: '/code_province/genres' 
});

var ct_source_province = new Ext.form.ComboBox({	
	editable				: false
	,hiddenName		:'detail_source_quality'
	,store					: ct_genres_province
	,valueField			: 'provcode'
	,displayField		: 'provname'
	,typeAhead			: true
	,triggerAction		: 'all'
	,emptyText			: 'Select ...'
	,selectOnFocus	: true
	,listeners				:{																							
										select : function(){											
											ct_genres_amphur.baseParams = {	
												random				: Math.random()
												,provcode			: ct_source_province.getValue()
											};
											ct_genres_amphur.load();	
											ct_source_amphur.clearValue();
											delete(code_tumbonGridStore.baseParams["provcode"]);
											delete(code_tumbonGridStore.baseParams["amcode"]);
											if (code_tumbonGridStore.lastOptions && code_tumbonGridStore.lastOptions.params) {
												delete(code_tumbonGridStore.lastOptions.params["provcode"]);
												delete(code_tumbonGridStore.lastOptions.params["amcode"]);
											}	
											code_tumbonGridStore.load({ params: {random: Math.random()} });
											code_tumbonGrid.disable()
										}
	}
});

var ct_genres_amphur = new Ext.data.Store({
	reader: new Ext.data.JsonReader({
		fields	: ['amcode', 'amname']
		,root		: 'records'
	})
	,url: '/code_amphur/genres' 
});

var ct_source_amphur = new Ext.form.ComboBox({
	fieldLabel			: 'อำเภอ'
	,editable				: false
	,hiddenName		:'detail_source_quality'
	,store					: ct_genres_amphur
	,valueField			: 'amcode'
	,displayField		: 'amname'
	,typeAhead			: true
	,triggerAction		: 'all'
	,emptyText			: 'Select ...'
	,selectOnFocus	: true
	,listeners				:{																							
										select : function(){																					
											delete(code_tumbonGridStore.baseParams["provcode"]);
											delete(code_tumbonGridStore.baseParams["amcode"]);
											if (code_tumbonGridStore.lastOptions && code_tumbonGridStore.lastOptions.params) {
												delete(code_tumbonGridStore.lastOptions.params["provcode"]);
												delete(code_tumbonGridStore.lastOptions.params["amcode"]);
											}										
											code_tumbonGridStore.baseParams["provcode"] = ct_source_province.getValue()
											code_tumbonGridStore.baseParams["amcode"] = ct_source_amphur.getValue()
											code_tumbonGridStore.load({ params: { start	: 0, limit: 20} });
											code_tumbonGrid.enable();
										}
	}
});

var code_tumbonNorth = new Ext.Panel({
	region			: "north"
	,layout			: 'hbox' 
	,height			: 50
	,layoutConfig	: { 
		align	: 'middle'
		,pack		: "center"
	}
	,defaults:{
		margins:'0 20 0 0'
	}
	,items			: [
		{
			xtype		: "label"
			,text			: "จังหวัด:"
			,margins	:'0 5 0 0'
		}
		,ct_source_province
		,{
			xtype		: "label"
			,text			: "อำเภอ:"
			,margins	:'0 5 0 0'
		}
		,ct_source_amphur
		
	]
});


var code_tumbonPanel = new Ext.Panel({
	layout		: "border"
	,items		: [
		code_tumbonGrid,code_tumbonNorth
	]
	,listeners: {
		beforedestroy: function(p){
			code_tumbonRowEditor.stopEditing();
		}
	}
})