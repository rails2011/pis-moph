var code_sdeptRowEditor_number = 0;

var code_sdeptFields = [
	{name: "id", type: "int"}
	,{name: "sdcode", type: "int"}
	,{name: "shortpre", type: "string"}
	,{name: "longpre", type: "string"}
	,{name: "sdname", type: "string"}
	,{name: "sdtcode", type: "int"}
	,{name: "sdgcode", type: "int"}
	,{name: "acode", type: "int"}
	,{name: "trlcode", type: "int"}
	,{name: "provcode", type: "int"}
	,{name: "amcode", type: "int"}
	,{name: "tmcode", type: "int"}
	,{name: "fcode", type: "int"}
	,{name: "lcode", type: "int"}
	,{name: "flagbkd", type: "string"}
	,{name: "stdcode", type: "string"}
	,{name: "use_status", type: "bool"}
];	

var code_sdeptNewRecord = Ext.data.Record.create(code_sdeptFields);

var code_sdeptWriter = new Ext.data.JsonWriter({
   writeAllFields : true
});

var code_sdeptRowEditor = new Ext.ux.grid.RowEditor({
	saveText		: 'บันทึก'
	,cancelText		: 'ยกเลิก'
	,listeners		: {
		validateedit	: function(rowEditor, obj, data, rowIndex ) {	
			loadMask.show();
			code_sdeptRowEditor_number = rowIndex;
		}
		,canceledit : function(rowEditor, obj, data, rowIndex ) {	
			code_sdeptRowEditor_number = rowIndex;
		}
	}
});

var code_sdeptcheckColumn = new Ext.grid.CheckColumn({
	header			: 'สถานะการใช้งาน'
	,dataIndex		: 'use_status'
	,width			: 100
	,editor			: new Ext.form.Checkbox()
});

var code_sdeptCols = [
	{
		header		: "#"
		,width		: 30
		,renderer	: rowNumberer.createDelegate(this)
		,sortable	: false
	}
	,{header: "รหัส", width: 50, sortable: false, dataIndex: "sdcode", editor: new Ext.form.NumberField({allowBlank: false, minLength: 5 , maxLength: 5 })}
	,{header: "ชื่อย่อคำนำหน้า", width: 50, sortable: false, dataIndex: "shortpre", editor: new Ext.form.TextField({allowBlank: false})}
	,{header: "คำนำหน้า", width: 50, sortable: false, dataIndex: "longpre", editor: new Ext.form.TextField({allowBlank: false})}
	,{header: "หน่วยงาน", width: 250, sortable: false, dataIndex: "sdname", editor: new Ext.form.TextField({allowBlank: false})}
	,{header: "รหัส sdt", width: 50, sortable: false, dataIndex: "sdtcode", editor: new Ext.form.NumberField({allowBlank: false})}
	,{header: "รหัส sg", width: 50, sortable: false, dataIndex: "sdgcode", editor: new Ext.form.NumberField({allowBlank: false})}
	,{header: "รหัส acode", width: 50, sortable: false, dataIndex: "acode", editor: new Ext.form.NumberField({allowBlank: false})}
	,{header: "รหัส trl", width: 50, sortable: false, dataIndex: "trlcode", editor: new Ext.form.NumberField({allowBlank: false})}
	,{header: "รหัสจังหวัด", width: 50, sortable: false, dataIndex: "provcode", editor: new Ext.form.NumberField({allowBlank: false})}
	,{header: "รหัสอำเภอ", width: 50, sortable: false, dataIndex: "amcode", editor: new Ext.form.NumberField({allowBlank: false})}
	,{header: "รหัสตำบล", width: 50, sortable: false, dataIndex: "tmcode", editor: new Ext.form.NumberField({allowBlank: false})}
	,{header: "รหัส fcode", width: 50, sortable: false, dataIndex: "fcode", editor: new Ext.form.NumberField({allowBlank: false})}
	,{header: "รหัส lcode", width: 50, sortable: false, dataIndex: "lcode", editor: new Ext.form.NumberField({allowBlank: false})}
	,{header: "สถานะ bkd", width: 50, sortable: false, dataIndex: "flagbkd", editor: new Ext.form.TextField({allowBlank: false, minLength: 1 , maxLength: 1 })}
	,{header: "รหัสแทน", width: 50, sortable: false, dataIndex: "stdcode", editor: new Ext.form.TextField({allowBlank: false})}
	,code_sdeptcheckColumn
];	

var code_sdeptSearch = new Ext.ux.grid.Search({
	iconCls		: 'search'
	,minChars	: 3
	,autoFocus	: true
	,position	: "top"
	,width		: 200
});

var code_sdeptProxy = new Ext.data.HttpProxy({
   api : {
	   read		: '/code_sdept/read'
	   ,create	: '/code_sdept/create'
	   ,update	: '/code_sdept/update'
	   ,destroy	: '/code_sdept/delete'
   }
});	

var code_sdeptGridStore = new Ext.data.JsonStore({
	proxy				: code_sdeptProxy
	,root				: 'records'
	,autoLoad			: false
	,totalProperty		: 'totalCount'
	,remoteSort			: true
	,fields				: code_sdeptFields
	,idProperty			: 'id'
	,successProperty	: 'success'
	,writer				: code_sdeptWriter
	,autoSave			: true
	,listeners			: {
		write : function (store, action, result, res, rs){
			if (res.success == true)
			{
				code_sdeptGridStore.load({ params: { start: 0, limit: 20} });
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
									code_sdeptGridStore.removeAt(code_sdeptRowEditor_number);
									code_sdeptGrid.getView().refresh();
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
									code_sdeptGridStore.reload();
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

var code_sdeptGrid = new Ext.grid.GridPanel({
	title				: "หน่วยงานในส่วนภูมิภาค"
	,region			: 'center'
	,split			: true
	,store			: code_sdeptGridStore
	,columns		: code_sdeptCols
	,stripeRows		: true
	,loadMask		: {msg:'Loading...'}
	,sm				: new Ext.grid.RowSelectionModel({singleSelect: true})
	,plugins			: [code_sdeptRowEditor,code_sdeptSearch]
	,tbar			: [
		{
			text			: 'เพิ่ม'
			,tooltip		: 'เพิ่ม'
			,iconCls		: 'table-add'
			,handler	: function(){
				var e = new code_sdeptNewRecord({
					id				: ""
					,sdcode		: ""
					,shortpre		: ""
					,longpre		: ""
					,sdname		: ""
					,sdtcode		: ""
					,sdgcode		: ""
					,acode		: ""
					,trlcode		: ""
					,provcode		: ""
					,amcode		: ""
					,tmcode		: ""
					,fcode		: ""
					,lcode		: ""
					,flagbkd		: ""
					,stdcode		: ""
					,use_status		: ""
				});
				code_sdeptRowEditor.stopEditing();
				code_sdeptGridStore.insert(0, e);
				code_sdeptGrid.getView().refresh();
				code_sdeptGrid.getSelectionModel().selectRow(0);
				code_sdeptRowEditor.startEditing(0);
			}
		},"-",{
			ref			: '../removeBtn'
			,text		: 'ลบ'
			,tooltip		: 'ลบ'
			,iconCls		: 'table-delete'
			,disabled	: true
			,handler	: function(){
				loadMask.show();
				code_sdeptRowEditor.stopEditing();
				var s = code_sdeptGrid.getSelectionModel().getSelections();
				for(var i = 0, r; r = s[i]; i++){
					code_sdeptGridStore.remove(r);
					code_sdeptGrid.getView().refresh();
				}
				loadMask.hide();
			}
		},"-",{
			text			: "Export"
			,iconCls		: "table-go"
			,menu		: {
				items	: [
					{
						text	 		: "Excel"
						,iconCls		: "excel"
						,handler	: function() {
							var data = Ext.util.JSON.encode(code_sdeptGridStore.lastOptions.params);
							var form = document.createElement("form");
							form.setAttribute("method", "post");
							form.setAttribute("action", "/code_sdept/report?format=xls");
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
						text	: "PDF"
						,iconCls	: "pdf"
						,handler : function() {
							var data = Ext.util.JSON.encode(code_sdeptGridStore.lastOptions.params);
							var form = document.createElement("form");
							form.setAttribute("method", "post");
							form.setAttribute("action", "/code_sdept/report?format=pdf");
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
	,bbar				: new Ext.PagingToolbar({
		pageSize		: 20
		,autoWidth		: true
		,store			: code_sdeptGridStore
		,displayInfo		: true
		,displayMsg		: 'Displaying {0} - {1} of {2}'
		,emptyMsg		: "Not found"
	})
	,listeners: {
		beforedestroy: function(p){
			code_sdeptRowEditor.stopEditing();
		}
	}
});

code_sdeptGrid.getSelectionModel().on('selectionchange', function(sm){
	code_sdeptGrid.removeBtn.setDisabled(sm.getCount() < 1);
});
