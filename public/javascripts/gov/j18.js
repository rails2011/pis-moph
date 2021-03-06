/********************************************************************/
/*			Gride J18				   */
/******************************************************************/

    var action_j18Grid = new Ext.ux.grid.RowActions({
             header					: 'จัดการ'
            ,keepSelection			: true
            ,widthSlope				: 50
            ,actions					:[
                    {iconCls: 'page', tooltip: 'แก้ไข'}
            ]		
    });

    action_j18Grid.on({
            action:function(grid, record, action, row, col) {
                    if (action == "page"){
						center_govPanel.getLayout().setActiveItem(j18Form);
						searchEditJ18(record.data.id);
						j18Form_url = "j18/update_j18";
						if (record.data.pis_personel_id != "" && record.data.pis_personel_id != null ){
							data_pis_personel_id = record.data.pis_personel_id;
						}
						
                    }		
            }
    });


	var j18Search = new Ext.ux.grid.Search({
		iconCls         : 'search'
		,minChars       : 3
		,autoFocus      : true
		,position       : "top"
		,width          : 200
	});
	var j18Fields = [
		{name: "id", type: "int"}
		,{name: "posid", type: "int"}
		,{name: "poscode", type: "int"}
		,{name: "mincode", type: "int"}
		,{name: "deptcode", type: "int"}
		,{name: "sdcode", type: "int"}
		,{name: "posname", type: "string"}
		,{name: "minname", type: "string"}
		,{name: "deptname", type: "string"}
		,{name: "sdname", type: "string"}
		,{name: "c", type: "int"}
		,{name: "salary", type: "int"}
		,{name: "pis_personel_id",type:"string"}
		,{name: "fname",type:"string"}
		,{name: "lname",type:"string"}
		,{name: "prename",type:"string"}
	];

	var j18Cols = [
		{
			header		: "#"
			,width		: 30
			,renderer	: rowNumberer.createDelegate(this)
			,sortable  : false
		}		
		,{header: "ตำแหน่งเลขที่",width: 100, sortable: false, dataIndex: 'posid'	}
		,{header: "ตำแหน่งสายงาน",width: 100, sortable: false, dataIndex: 'posname'	}
		,{header: "กระทรวง",width: 200, sortable: false, dataIndex: 'minname'	}
		,{header: "กรม",width: 200, sortable: false, dataIndex: 'deptname'	}
		,{header: "หน่วยงาน",width: 200, sortable: false, dataIndex: 'sdname'	}
		,{header: "ระดับ",width: 100, sortable: false, dataIndex: 'c'	}
		,{header: "เงินเดือน",width: 100, sortable: false, dataIndex: 'salary'	}
		,{header: "สถานะตำแหน่ง",width:150,sortable:false,dataIndex:"pis_personel_id",renderer:function(val, p, record){
			if (val == null || val == ''){
				return "ตำแหน่งว่าง";
			}
			else{
				return record.data.prename+"&nbsp;"+record.data.fname+"&nbsp;&nbsp;&nbsp;&nbsp;"+record.data.lname;
			}
		}}
		,action_j18Grid
	];

	var j18GridStore = new Ext.data.JsonStore({
		url					: "/j18/read_j18"
		,root					: "records"
		,autoLoad		: false
		,totalProperty	: 'totalCount'
		,fields				: j18Fields
		,idProperty		: 'id'
	});

	var j18Grid = new Ext.grid.GridPanel({
		title			: "ข้อมูลตำแหน่ง จ.18"
		,region			: 'center'
		,split			: true
		,store			: j18GridStore
		,columns		: j18Cols
		,stripeRows		: true
		,loadMask		: {msg:'Loading...'}
		,sm			: new Ext.grid.RowSelectionModel({singleSelect: true})
		,plugins		: [j18Search,action_j18Grid]
		,bbar			: new Ext.PagingToolbar({
				pageSize			: 20
				,autoWidth		: true
				,store				: j18GridStore
				,displayInfo		: true
				,displayMsg	: 'Displaying {0} - {1} of {2}'
				,emptyMsg		: "Not found"
		})
		,tbar					: [
			{
				text				: "เพิ่ม"
				,iconCls		: "table-add"
				,handler		: function(){
					j18Form_url = "/j18/create_j18"
					center_govPanel.getLayout().setActiveItem(j18Form);
				}
			},"-",{
				ref                    : '../removeBtn'
				,text					: 'ลบ'
				,tooltip             : 'ลบ'
				,iconCls           : 'table-delete'
				,disabled			: true
				,handler			: function(){
						deleteJ18(j18Grid.getSelectionModel().getSelections()[0].data.id);
				}
			}
			
		]
	});

	j18Grid.getSelectionModel().on('selectionchange', function(sm){
		
		 if (sm.getSelections().length > 0){
			 if (sm.getSelections()[0].data.pis_personel_id == null || sm.getSelections()[0].data.pis_personel_id == ""){
				j18Grid.removeBtn.setDisabled(sm.getCount() < 1);
			}
			else{
				j18Grid.removeBtn.setDisabled(true);
			}
		 }
		 else{
			j18Grid.removeBtn.setDisabled(sm.getCount() < 1);
		 }

        
	});
/********************************************************************/
/*			Form Search Grid													*/
/******************************************************************/
	var formSearchJ18Grid =  new Ext.FormPanel({
		region					: "north"
		,title						: "ค้นหา"
		,autoHeight			: true
		,frame					: true
		,collapsible			: true
		,collapsed			: true
		,autoScroll			: true
		,labelWidth			: 100
		,labelAlign			: "right"
		,items					: [
			{
				layout			: "column"
				,items			: [
					{
						width		: 300
						,layout		: "form"
						,items		: [
							new Ext.form.ComboBox({
								fieldLabel				: '<b>จังหวัด</b>'
								,hiddenName			: 'provcode'
								,id							: 'idprovcode'
								,store						: new Ext.data.Store({
										reader		: new Ext.data.JsonReader({
											fields	: ['provcode', 'provname']
											,root		: 'records'
										})
										,url					: 'code_province/genres'
								})
								,valueField				: 'provcode'
								,displayField			: 'provname'
								,typeAhead				: true
								,triggerAction			: 'all'
								,emptyText				: 'Select ...'
								,selectOnFocus		: true
								,anchor					: "100%"
								,listeners					: {
									select : function( combo,record,  index ) {
										delete(Ext.getCmp("idamcode").getStore().baseParams["provcode"]);
										if (Ext.getCmp("idamcode").getStore().lastOptions && Ext.getCmp("idamcode").getStore().lastOptions.params) {
											delete(Ext.getCmp("idamcode").getStore().lastOptions.params["provcode"]);					
										}
										if (combo.getValue() != ""){											
											Ext.getCmp("idamcode").clearValue();
											Ext.getCmp("idsdcode").clearValue();
											Ext.getCmp("idtmcode").clearValue();
											Ext.getCmp("idprovcode").enable();											
											Ext.getCmp("idamcode").enable();
											Ext.getCmp("idsdcode").disable();
											Ext.getCmp("idtmcode").disable();											
											Ext.getCmp("idamcode").getStore().baseParams = {
												provcode: combo.getValue()
											}
											Ext.getCmp("idamcode").getStore().load()
										}
									}
								}
							})
							,new Ext.form.ComboBox({
								fieldLabel				: '<b>ประเภทหน่วยงาน</b>'
								,hiddenName			: 'sdtcode'
								,id							: 'idsdtcode'
								,store						: new Ext.data.Store({
										reader		: new Ext.data.JsonReader({
											fields	: ['sdtcode', 'sdtname']
											,root		: 'records'
										})
										,url					: 'code_sdtype/genres'
								})
								,valueField				: 'sdtcode'
								,displayField			: 'sdtname'
								,typeAhead				: true
								,triggerAction			: 'all'
								,emptyText				: 'Select ...'
								,selectOnFocus		: true	
								,anchor					: "100%"
								,listeners					: {
									select : function( combo,record,  index ) {
										delete(Ext.getCmp("idsdcode").getStore().baseParams["provcode"]);
										delete(Ext.getCmp("idsdcode").getStore().baseParams["amcode"]);
										delete(Ext.getCmp("idsdcode").getStore().baseParams["tmcode"]);
										delete(Ext.getCmp("idsdcode").getStore().baseParams["sdtcode"]);
										if (Ext.getCmp("idsdcode").getStore().lastOptions && Ext.getCmp("idsdcode").getStore().lastOptions.params) {
											delete(Ext.getCmp("idsdcode").getStore().lastOptions.params["provcode"]);		
											delete(Ext.getCmp("idsdcode").getStore().lastOptions.params["amcode"]);		
											delete(Ext.getCmp("idsdcode").getStore().lastOptions.params["tmcode"]);		
											delete(Ext.getCmp("idsdcode").getStore().lastOptions.params["sdtcode"]);											
										}
										if (combo.getValue() != ""){
											Ext.getCmp("idprovcode").enable();											
											Ext.getCmp("idamcode").enable();
											Ext.getCmp("idsdcode").enable();
											Ext.getCmp("idtmcode").enable();											
											Ext.getCmp("idsdcode").getStore().baseParams = {
												provcode: Ext.getCmp("idprovcode").getValue()
												,amcode: Ext.getCmp("idamcode").getValue()
												,tmcode: Ext.getCmp("idtmcode").getValue()
												,sdtcode: Ext.getCmp("idsdtcode").getValue()
											}
											Ext.getCmp("idsdcode").getStore().load()
										}
									}
								}
							})
						]
					},{
						width		: 300
						,layout		: "form"
						,items		: [
							new Ext.form.ComboBox({
								fieldLabel				: '<b>อำเภอ</b>'
								,disabled					: true
								,hiddenName			: 'amcode'
								,id							: 'idamcode'
								,store						: new Ext.data.Store({
										reader		: new Ext.data.JsonReader({
											fields	: ['amcode', 'amname']
											,root		: 'records'
										})
										,url					: 'code_amphur/genres'
								})
								,valueField				: 'amcode'
								,displayField			: 'amname'
								,typeAhead				: true
								,triggerAction			: 'all'
								,emptyText				: 'Select ...'
								,selectOnFocus		: true
								,anchor					: "100%"
								,listeners					: {
									select : function( combo,record,  index ) {
										delete(Ext.getCmp("idtmcode").getStore().baseParams["amcode"]);
										if (Ext.getCmp("idtmcode").getStore().lastOptions && Ext.getCmp("idtmcode").getStore().lastOptions.params) {
											delete(Ext.getCmp("idtmcode").getStore().lastOptions.params["amcode"]);					
										}
										if (combo.getValue() != ""){
											
											Ext.getCmp("idsdcode").clearValue();
											Ext.getCmp("idtmcode").clearValue();
											Ext.getCmp("idprovcode").enable();
											
											Ext.getCmp("idamcode").enable();
											Ext.getCmp("idsdcode").disable();
											Ext.getCmp("idtmcode").enable();
											Ext.getCmp("idtmcode").getStore().baseParams = {
												amcode: combo.getValue()
											}
											Ext.getCmp("idtmcode").getStore().load()
										}
									}
								}
							})
							,new Ext.form.ComboBox({
								fieldLabel				: '<b>หน่วยงาน</b>'
								,disabled					: true
								,hiddenName			: 'sdcode'
								,id							: 'idsdcode'
								,store						: new Ext.data.Store({
										reader		: new Ext.data.JsonReader({
											fields	: ['sdcode', 'sdname']
											,root		: 'records'
										})
										,url					: 'code_sdept/genres'
								})
								,valueField				: 'sdcode'
								,displayField			: 'sdname'
								,typeAhead				: true
								,triggerAction			: 'all'
								,emptyText				: 'Select ...'
								,selectOnFocus		: true
								,anchor					: "100%"
							})
						]
					},{
						width		: 300
						,layout		: "form"
						,items		: [
							new Ext.form.ComboBox({
								fieldLabel				: '<b>ตำบล</b>'
								,disabled					: true
								,hiddenName			: 'tmcode'
								,id							: 'idtmcode'
								,store						: new Ext.data.Store({
										reader		: new Ext.data.JsonReader({
											fields	: ['tmcode', 'tmname']
											,root		: 'records'
										})
										,url					: 'code_tumbon/genres'
								})
								,valueField				: 'tmcode'
								,displayField			: 'tmname'
								,typeAhead				: true
								,triggerAction			: 'all'
								,emptyText				: 'Select ...'
								,selectOnFocus		: true
								,anchor					: "100%"
								,listeners					: {
									select : function( combo,record,  index ) {
										if (combo.getValue() != ""){											
											Ext.getCmp("idsdcode").clearValue();
											Ext.getCmp("idprovcode").enable();											
											Ext.getCmp("idamcode").enable();
											Ext.getCmp("idsdcode").disable();
											Ext.getCmp("idtmcode").enable();											
										}
									}
								}
							}),
							new Ext.form.ComboBox({
								fieldLabel			: '<b>ตำแหน่ง</b>'
								,hiddenName		: 'status_pos'
								,id						: "idstatus_pos"
								,store					: new Ext.data.SimpleStore({
									fields		: ['id', 'type']
									,data		: [	['0', 'ว่าง'],['1', 'ไม่ว่าง']]
								})
								,valueField			: 'id'
								,displayField		: 'type'
								,typeAhead			: true
								,mode					: 'local'
								,triggerAction		: 'all'
								,emptyText			: 'Select ...'
								,selectOnFocus	: true
								,anchor				: "100%"
							})
						]
					}
				]
			}
		]
		,buttons				: [
			{
				text				: "ค้นหา"
				,handler		: function(){
					delete(j18GridStore.baseParams["searchform"]);
					delete(j18GridStore.baseParams["provcode_searchform"]);
					delete(j18GridStore.baseParams["sdtcode_searchform"]);
					delete(j18GridStore.baseParams["amcode_searchform"]);
					delete(j18GridStore.baseParams["sdcode_searchform"]);
					delete(j18GridStore.baseParams["tmcode_searchform"]);
					delete(j18GridStore.baseParams["status_pos_searchform"]);
					
					if (j18GridStore.lastOptions && j18GridStore.lastOptions.params) {
						delete(j18GridStore.lastOptions.params["searchform"]);						
						delete(j18GridStore.lastOptions.params["provcode_searchform"]);						
						delete(j18GridStore.lastOptions.params["sdtcode_searchform"]);						
						delete(j18GridStore.lastOptions.params["amcode_searchform"]);						
						delete(j18GridStore.lastOptions.params["sdcode_searchform"]);						
						delete(j18GridStore.lastOptions.params["tmcode_searchform"]);						
						delete(j18GridStore.lastOptions.params["status_pos_searchform"]);						
						
					}

					j18GridStore.baseParams = {
						searchform			: true
						,provcode_searchform			:  Ext.getCmp("idprovcode").getValue()
						,sdtcode_searchform				:  Ext.getCmp("idsdtcode").getValue()
						,amcode_searchform				:  Ext.getCmp("idamcode").getValue()
						,sdcode_searchform				:  Ext.getCmp("idsdcode").getValue()
						,tmcode_searchform				:  Ext.getCmp("idtmcode").getValue()
						,status_pos_searchform			:  Ext.getCmp("idstatus_pos").getValue()
						
					}

					j18GridStore.load({ params: { start: 0, limit: 20} });	

				}
			},{
				text				: "ยกเลิก"
				,handler		: function(){
					delete(j18GridStore.baseParams["searchform"]);
					delete(j18GridStore.baseParams["provcode_searchform"]);
					delete(j18GridStore.baseParams["sdtcode_searchform"]);
					delete(j18GridStore.baseParams["amcode_searchform"]);
					delete(j18GridStore.baseParams["sdcode_searchform"]);
					delete(j18GridStore.baseParams["tmcode_searchform"]);
					delete(j18GridStore.baseParams["status_pos_searchform"]);					
					if (j18GridStore.lastOptions && j18GridStore.lastOptions.params) {
						delete(j18GridStore.lastOptions.params["searchform"]);						
						delete(j18GridStore.lastOptions.params["provcode_searchform"]);						
						delete(j18GridStore.lastOptions.params["sdtcode_searchform"]);						
						delete(j18GridStore.lastOptions.params["amcode_searchform"]);						
						delete(j18GridStore.lastOptions.params["sdcode_searchform"]);						
						delete(j18GridStore.lastOptions.params["tmcode_searchform"]);						
						delete(j18GridStore.lastOptions.params["status_pos_searchform"]);						
						
					}
					formSearchJ18Grid.getForm().reset();
					j18GridStore.reload();
				}
			}	
		]
	});
/********************************************************************/
/*			Panel J18													*/
/******************************************************************/
	var panelJ18 = new Ext.Panel({	
		layout		: "border"
		,items		: [
			j18Grid
			,formSearchJ18Grid
		]
	});
/********************************************************************/
/*			Form J18 CRUD				   */
/******************************************************************/
	///////////////////////////////////////////////////////////////////////////////////////////////////////////
		var posnametrigger = new Ext.form.TriggerField({
			fieldLabel			: "ตำแหน่งสายงาน"
			,allowBlank			: false
			,triggerClass		: "trigger"
			,anchor				: "95%"
			,id						: "posname"
			,readOnly				: true
			,onTriggerClick	: function(){
				searchPoscodeJ18(posnametrigger,Ext.getCmp("posname_id"));
			}
		});

		var innametrigger = new Ext.form.TriggerField({
			fieldLabel			: "ระดับ"
			,allowBlank			: false
			,triggerClass		: "trigger"
			,anchor				: "95%"
			,id						: "inname"
			,readOnly				: true
			,onTriggerClick	: function(){
				searchCodeInterval(innametrigger,Ext.getCmp("inname_id"));
			}
		});

		var ptnametrigger = new Ext.form.TriggerField({
			fieldLabel			: "ว./ว.ช/ชช."
			,triggerClass		: "trigger"
			,anchor				: "95%"
			,id						: "ptname"
			,readOnly				: true
			,onTriggerClick	: function(){
				searchPtname(ptnametrigger,Ext.getCmp("ptname_id"));
			}
		});

		var exnametrigger = new Ext.form.TriggerField({
			fieldLabel			: "ตำแหน่งบริหาร"
			,triggerClass		: "trigger"
			,anchor				: "95%"
			,id						: "exname"
			,readOnly				: true
			,onTriggerClick	: function(){
				searchExname(exnametrigger,Ext.getCmp("exname_id"));
			}
		});

		var experttrigger = new Ext.form.TriggerField({
			fieldLabel			: "ความเชี่ยวชาญ"
			,triggerClass		: "trigger"
			,anchor				: "95%"
			,id						: "expert"
			,readOnly				: true
			,onTriggerClick	: function(){
				searchExpert(experttrigger,Ext.getCmp("expert_id"));
			}
		});

		var minnametrigger = new Ext.form.TriggerField({
			fieldLabel			: "กระทรวง"
			,allowBlank			: false
			,triggerClass		: "trigger"
			,anchor				: "95%"
			,id						: "minname"
			,readOnly				: true
			,onTriggerClick	: function(){
				searchMinname(minnametrigger,Ext.getCmp("minname_id"));
			}
		});

		var divnametrigger = new Ext.form.TriggerField({
			fieldLabel			: "กอง"
			,triggerClass		: "trigger"
			,anchor				: "95%"
			,id						: "divname"
			,readOnly				: true
			,onTriggerClick	: function(){
				searchDivname(divnametrigger,Ext.getCmp("divname_id"));
			}
		});

		var deptnametrigger = new Ext.form.TriggerField({
			fieldLabel			: "กรม"
			,triggerClass		: "trigger"
			,anchor				: "95%"
			,id						: "deptname"
			,allowBlank			: false
			,readOnly				: true
			,onTriggerClick	: function(){
				searchDeptname(deptnametrigger,Ext.getCmp("deptname_id"));
			}
		});

		var jobnametrigger = new Ext.form.TriggerField({
			fieldLabel			: "งาน"
			,triggerClass		: "trigger"
			,anchor				: "95%"
			,id						: "jobname"
			,readOnly				: true
			,onTriggerClick	: function(){
				searchJobname(jobnametrigger,Ext.getCmp("jobname_id"));
			}
		});

		var sdnametrigger = new Ext.form.TriggerField({
			fieldLabel			: "หน่วยงาน"
			,triggerClass		: "trigger"
			,anchor				: "95%"
			,id						: "sdname"
			,readOnly				: true
			,onTriggerClick	: function(){
				searchsdname(sdnametrigger,Ext.getCmp("sdname_id"));
			}
		});

		var sectnametrigger1 = new Ext.form.TriggerField({
			fieldLabel			: "กลุ่ม"
			,triggerClass		: "trigger"
			,anchor				: "95%"
			,id						: "sectname1"
			,readOnly				: true
			,onTriggerClick	: function(){
				searchSectname(sectnametrigger1,Ext.getCmp("sectname_id1"));
			}
		});

		var sectnametrigger2 = new Ext.form.TriggerField({
			fieldLabel			: "ฝ่าย/กลุ่มงาน"
			,triggerClass		: "trigger"
			,anchor				: "95%"
			,id						: "sectname2"
			,readOnly				: true
			,onTriggerClick	: function(){
				searchSectname(sectnametrigger2,Ext.getCmp("sectname_id2"));
			}
		});
	///////////////////////////////////////////////////////////////////////////////////////////////////////////
	var j18Form_url = "";
	var j18Form = new Ext.FormPanel({ 
		title					: "เพิ่ม แก้ไข ข้อมูลตำแหน่ง"
		,border				: false
		,labelWidth		: 113
		,autoScroll		: true
		,frame				: true
		,monitorValid	: true
		,bodyStyle		: "padding:20px"
		,items				:[
			{
				xtype				: "fieldset"
				,bodyStyle		: "padding:10px"
				,items				: [
					{
						layout		: "column"
						,items		: [
							{
								layout		: "form"
								,width		: 260
								,items		: [
									{
										xtype				: "textfield"
										,fieldLabel		: "ตำแหน่งเลขที่"
										,id					: "posid"
										,allowBlank		: false
									}
								]
							},{
								layout		: "form"
								,width		: 560
								,items		: [
									{
										xtype				: "checkbox"
										,hideLabel		: true
										,boxLabel		: "ยกเลิกการใช้ตำแหน่งว่าง"										
									}
								]
							}
						]
					},{
						layout		: "column"
						,items		: [
							{
								layout					: "form"
								,columnWidth		: '.50'
								,items					: [
									posnametrigger
									,{
										xtype			: "hidden"
										,id				: "posname_id"
									}
								]
							},{
								layout					: "form"
								,labelWidth			: 50
								,columnWidth		: '.25'
								,items					: [
									{
										xtype			: "numberfield"	
										,fieldLabel	: "ระดับ"
										,allowBlank	: false
										,id				: "c"
									}						
								]
							},{
								layout					: "form"
								,labelWidth			: 50
								,columnWidth		: '.25'
								,items					: [
									{
										xtype			: "numberfield"
										,fieldLabel	: "เงินเดือน"
										,id				: "salary"
										,allowBlank	: false
									}						
								]
							}
						]
					},{
						xtype				: "textfield"	
						,fieldLabel		: "ชื่อผู้ครองตำแหน่ง"
						,id					: "fname_lname"
						,anchor			: "100%"
						,readOnly			: true
					},{
						layout		: "column"
						,items		: [
							{
								layout					: "form"
								,columnWidth		: '.5'
								,items					: [
									innametrigger
									,{
										xtype			: "hidden"
										,id				: "inname_id"
									}
								]
							},{
								layout					: "form"
								,columnWidth		: '.5'
								,items					: [
									ptnametrigger
									,{
										xtype			: "hidden"
										,id				: "ptname_id"
									}
								]
							}
						]
					},{
						layout				: "column"
						,items				: [
							{
								layout					: "form"
								,columnWidth		: '.5'
								,items					: [
									exnametrigger
									,{
										xtype			: "hidden"
										,id				: "exname_id"
									}
								]
							},{
								layout					: "form"
								,columnWidth		: '.5'
								,items					: [
									experttrigger	
									,{
										xtype			: "hidden"
										,id				: "expert_id"
									}
								]
							}
						]
					},{
						layout				: "column"
						,items				: [
							{
								layout				: "form"
								,columnWidth	: '.5'
								,items				: [
									minnametrigger
									,{
										xtype			: "hidden"
										,id				: "minname_id"
									}
									,divnametrigger
									,{
										xtype			: "hidden"
										,id				: "divname_id"
									}
								]
							},{
								layout					: "form"
								,columnWidth		: '.5'
								,items					: [
									deptnametrigger
									,{
										xtype			: "hidden"
										,id				: "deptname_id"
									}
								]
							}
						]
					}
					,sdnametrigger
					,{
						xtype			: "hidden"
						,id				: "sdname_id"
					},{
						layout				: "column"
						,items				: [
							{
								layout					: "form"
								,columnWidth		: '.5'
								,items					: [
									sectnametrigger1
									,{
										xtype			: "hidden"
										,id				: "sectname_id1"
									}
								]
							}
						]
					},{
						layout				: "column"
						,items				: [
							{
								layout					: "form"
								,columnWidth		: '.5'
								,items					: [
									sectnametrigger2
									,{
										xtype			: "hidden"
										,id				: "sectname_id2"
									}
								]
							},{
								layout					: "form"
								,columnWidth		: '.5'
								,items					: [
									jobnametrigger
									,{
										xtype			: "hidden"
										,id				: "jobname_id"
									}
								]
							}
						]
					}					
				]
			},{
				xtype			: "fieldset"
				,bodyStyle	: "padding:10px"
				,items			: [
					{
						layout		: "column"
						,items		: [
							{
								layout				: "form"
								,defaults			: {
									anchor			: "95%"
								}
								,columnWidth	: '.35'
								,items				: [
									{
										xtype			: "textfield"
										,fieldLabel	: "ถือจ่ายปีก่อน ระดับ"
										,id				: "lastc"
									},{
										xtype			: "textfield"
										,fieldLabel	: "อาศัยเบิกปีก่อน ระดับ"
										,id				: "lastcasb"
									},{
										xtype			: "textfield"
										,fieldLabel	: "1 ต.ค. ระดับ"
										,id				: "octc"
									}	
								]
							},{
								layout				: "form"
								,defaults			: {
									width			: 50
								}
								,columnWidth	: '.15'
								,labelWidth		: 20
								,items				: [
									{
										xtype			: "textfield"
										,id				: "lastsal"
										,fieldLabel	: "ชั้น"
										,plugins			: [Ext.ux.plugins.InlineItems]
										,inlineItems		: [
											{
												xtype		: "label"
												,text			: "บาท"
											}
										]
									},{
										xtype			: "textfield"
										,id				: "lastsalasb"
										,fieldLabel	: "ชั้น"
										,plugins			: [Ext.ux.plugins.InlineItems]
										,inlineItems		: [
											{
												xtype		: "label"
												,text			: "บาท"
											}
										]
									},{
										xtype			: "textfield"
										,id				: "octsalary"
										,fieldLabel	: "ชั้น"
										,plugins			: [Ext.ux.plugins.InlineItems]
										,inlineItems		: [
											{
												xtype		: "label"
												,text			: "บาท"
											}
										]
									}
								]	
							},{
								layout				: "form"
								,defaults			: {
									anchor		: "95%"
								}
								,columnWidth	: '.35'
								,labelWidth		: 135
								,items				: [
									{
										xtype			: "textfield"
										,fieldLabel	: "ถือจ่ายปีปัจจุบัน ระดับ"
										,allowBlank		: false
										,id				: "nowc"
									},{
										xtype			: "textfield"
										,fieldLabel	: "อาศัยเบิกปีปัจจุบัน ระดับ"
										,id				: "nowcasb"
									},{
										xtype			: "textfield"
										,fieldLabel	: "1 เม.ย. ระดับ"
										,id				: "aprc"
									}	
								]
							},{
								layout				: "form"
								,defaults			: {
									width		: 50
								}
								,columnWidth	: '.15'
								,labelWidth		: 20
								,items				: [
									{
										xtype			: "textfield"
										,fieldLabel	: "ชั้น"
										,id				: "nowsal"
										,allowBlank		: false
										,plugins			: [Ext.ux.plugins.InlineItems]
										,inlineItems		: [
											{
												xtype		: "label"
												,text			: "บาท"
											}
										]
									},{
										xtype			: "textfield"
										,fieldLabel	: "ชั้น"
										,id				: "nowsalasb"
										,plugins			: [Ext.ux.plugins.InlineItems]
										,inlineItems		: [
											{
												xtype		: "label"
												,text			: "บาท"
											}
										]
									},{
										xtype			: "textfield"
										,fieldLabel	: "ชั้น"
										,id				: "aprsalary"
										,plugins			: [Ext.ux.plugins.InlineItems]
										,inlineItems		: [
											{
												xtype		: "label"
												,text			: "บาท"
											}
										]
									}
								]	
							}
						]
					},{
						layout			: "column"	
						,items			: [
							{	
								layout				: "form"
								,width				: 300
								,items				: [
									{
										xtype			: "numberfield"
										,fieldLabel	: "เงินประจำตำแหน่ง"
										,id				: "posmny"
										,plugins			: [Ext.ux.plugins.InlineItems]
										,inlineItems		: [
											{
												xtype		: "label"
												,text			: "บาท"
											}
										]
									}	
								]
							},{	
								layout				: "form"
								,width				: 300
								,labelWidth		: 60
								,items				: [
									{
										xtype			: "numberfield"
										,fieldLabel	: "เบี้ยกันดาร"
										,id				: "bkdmny"
										,plugins			: [Ext.ux.plugins.InlineItems]
										,inlineItems		: [
											{
												xtype		: "label"
												,text			: "บาท"
											}
										]
									}	
								]
							},{	
								layout				: "form"
								,width				: 300
								,labelWidth		: 90
								,items				: [
									{
										xtype			: "textfield"
										,fieldLabel	: "เงื่อนไขตำแหน่ง"		
										,id				: "pcdcode"
									}	
								]
							}
						]
					},{
						layout			: "column"	
						,items			: [
							{	
								layout				: "form"
								,width				: 300
								,labelWidth		:128
								,items				: [
									{
										xtype: "datefield"
										,fieldLabel: "วัน ก.พ. กำหนดตำแหน่ง"
										,id: "cp_asbdate"
										,format: "d/m/Y"
									}							
								]
							},{	
								layout				: "form"
								,width				: 300
								,labelWidth		:90
								,items				: [
									{
										xtype: "datefield"
										,fieldLabel: "วันที่ตำแหน่งว่าง"
										,id: "cp_emptydate"
										,format: "d/m/Y"
									}
								]
							}
						]
					},{
						xtype			: "textfield"	
						,fieldLabel	: "หมายเหตุ1"
						,id				: "rem"
						,anchor		: "100%"
					},{
						xtype			: "textfield"	
						,fieldLabel	: "หมายเหตุ2"
						,id				: "rem2"
						,anchor		: "100%"
					}
				]
			},{
				xtype		: "hidden"
				,id			: "id"
			}
		]
		,buttons				:[
			{ 
				text					:'บันทึก'
				,formBind			: true 
				,handler			:function(){ 					
					j18Form.getForm().submit(
					{ 
						method		:'POST'
						,url				: j18Form_url
						,waitTitle		:'Saving Data'
						,waitMsg		:'Sending data...'
						,success		:function(){		
							Ext.Msg.alert("สถานะ","บันทึกเสร็จเรีบยร้อย", function(btn, text){										
									if (btn == 'ok')
									{
										center_govPanel.getLayout().setActiveItem(panelJ18);
										j18GridStore.load({ params: { start: 0, limit: 20} });		
									}	
								}
							);
																
						}
						,failure:function(form, action){ 
							if(action.failureType == 'server'){ 
								obj = Ext.util.JSON.decode(action.response.responseText); 
								Ext.Msg.alert('สถานะ', obj.msg); 
							}
							else{	 
								Ext.Msg.alert('สถานะ', 'Authentication server is unreachable : ' + action.response.responseText); 
							} 
						} 
					}); 
				} 
			},{
				text					: "ยกเลิก"
				,handler			: function	(){
					center_govPanel.getLayout().setActiveItem(panelJ18);
					data_pis_personel_id = "";
					j18GridStore.load({ params: { start: 0, limit: 20} });
				}
			}
		] 
	});
/********************************************************************/
/*			Function J18	                           */
/******************************************************************/	

	function searchPoscodeJ18(display,value){
		var Fields = [
			{name: "id", type: "int"}
			,{name: "poscode", type: "int"}
			,{name: "shortpre", type: "string"}
			,{name: "longpre", type: "string"}
			,{name: "posname", type: "string"}
		];

		var Cols = [
			{
				header		: "#"
				,width		: 30
				,renderer	: rowNumberer.createDelegate(this)
				,sortable  : false
			}
			,{header: "รหัสตำแหน่ง", width: 100, sortable: false, dataIndex: "poscode"}
			,{header: "ชื่อย่อคำนำหน้า", width: 100, sortable: false, dataIndex: "shortpre"}
			,{header: "คำนำหน้า", width: 100, sortable: false, dataIndex: "longpre"}
			,{header: "ตำแหน่ง", width: 150, sortable: false, dataIndex: "posname"}
		];

		var GridStore = new Ext.data.JsonStore({
			url					: "/code_position/read"
			,root					: 'records'
			,autoLoad		: false
			,totalProperty	: 'totalCount'
			,fields				: Fields
			,idProperty		: 'id'
		});

		var Grid = new Ext.grid.GridPanel({
			region				: 'center'
			,split				: true
			,store				: GridStore
			,columns			: Cols
			,stripeRows		: true
			,loadMask		: {msg:'Loading...'}
			,sm					: new Ext.grid.RowSelectionModel({singleSelect: true})       
			,bbar				: new Ext.PagingToolbar({
					pageSize			: 10
					,autoWidth		: true
					,store				: GridStore
					,displayInfo		: true
					,displayMsg	: 'Displaying {0} - {1} of {2}'
					,emptyMsg		: "Not found"
			})
			,plugins			: [
				new Ext.ux.grid.Search({
					iconCls		: 'search'
					,minChars	: 3
					,autoFocus	: true
					,position		: "top"
					,width			: 200
				})			
			]
			,tbar					: []
		});

		GridStore.load({ params: { start: 0, limit: 10} });

		Grid.on('rowdblclick', function(grid, rowIndex, e ) {
			var record = grid.getSelectionModel().getSelected();
			display.setValue(record.data.shortpre+"  "+record.data.posname);
			value.setValue(record.data.poscode);
			win.close();
		});

		if(!win){
			var win = new Ext.Window({
				title					: 'ค้นหาตำแหน่งสายงาน'
				,width				: 550
				,height				: 400
				,closable			: true
				,resizable		: false
				,plain				: true
				,border				: false
				,draggable 		: true 
				,modal				: true
				,layout				: "fit"
				,items				: [Grid]
			});
		}
		win.show();	
		win.center();
	}

	function searchCodeInterval(display,value){
		var Fields = [
			{name: "id", type: "int"}
			,{name: "incode", type: "string"}
			,{name: "inname", type: "string"}
		];

		var Cols = [
			{
				header		: "#"
				,width		: 30
				,renderer	: rowNumberer.createDelegate(this)
				,sortable  : false
			}
			,{header: "ช่วงระดับ", width: 100, sortable: false, dataIndex: "inname"}
		];

		var GridStore = new Ext.data.JsonStore({
			url					: "/code_interval/read"
			,root					: 'records'
			,autoLoad		: false
			,totalProperty	: 'totalCount'
			,fields				: Fields
			,idProperty		: 'id'
		});

		var Grid = new Ext.grid.GridPanel({
			region				: 'center'
			,split				: true
			,store				: GridStore
			,columns			: Cols
			,stripeRows		: true
			,loadMask		: {msg:'Loading...'}
			,sm					: new Ext.grid.RowSelectionModel({singleSelect: true})       
			,bbar				: new Ext.PagingToolbar({
					pageSize			: 10
					,autoWidth		: true
					,store				: GridStore
					,displayInfo		: true
					,displayMsg	: 'Displaying {0} - {1} of {2}'
					,emptyMsg		: "Not found"
			})
			,plugins			: [
				new Ext.ux.grid.Search({
					iconCls		: 'search'
					,minChars	: 3
					,autoFocus	: true
					,position		: "top"
					,width			: 200
				})			
			]
			,tbar					: []
		});

		GridStore.load({ params: { start: 0, limit: 10} });

		Grid.on('rowdblclick', function(grid, rowIndex, e ) {
			var record = grid.getSelectionModel().getSelected();
			display.setValue(record.data.inname);
			value.setValue(record.data.incode);
			win.close();
		});

		if(!win){
			var win = new Ext.Window({
				title					: 'ค้นหาตำแหน่งสายงาน'
				,width				: 300
				,height				: 400
				,closable			: true
				,resizable		: false
				,plain				: true
				,border				: false
				,draggable 		: true 
				,modal				: true
				,layout				: "fit"
				,items				: [Grid]
			});
		}
		win.show();	
		win.center();
	}

	function searchPtname(display,value){
		var Fields = [
			{name: "id", type: "int"}
			,{name: "ptcode", type: "int"}
			,{name: "ptname", type: "string"}
			,{name: "shortmn", type: "string"}
		];

		var Cols = [
			{
				header		: "#"
				,width		: 30
				,renderer	: rowNumberer.createDelegate(this)
				,sortable  : false
			}
			,{header: "ชื่อย่อ", width: 100, sortable: false, dataIndex: "shortmn"}
			,{header: "ว./วช/ชช.", width: 100, sortable: false, dataIndex: "ptname"}
		];

		var GridStore = new Ext.data.JsonStore({
			url					: "/code_postype/read"
			,root					: 'records'
			,autoLoad		: false
			,totalProperty	: 'totalCount'
			,fields				: Fields
			,idProperty		: 'id'
		});

		var Grid = new Ext.grid.GridPanel({
			region				: 'center'
			,split				: true
			,store				: GridStore
			,columns			: Cols
			,stripeRows		: true
			,loadMask		: {msg:'Loading...'}
			,sm					: new Ext.grid.RowSelectionModel({singleSelect: true})       
			,bbar				: new Ext.PagingToolbar({
					pageSize			: 10
					,autoWidth		: true
					,store				: GridStore
					,displayInfo		: true
					,displayMsg	: 'Displaying {0} - {1} of {2}'
					,emptyMsg		: "Not found"
			})
			,plugins			: [
				new Ext.ux.grid.Search({
					iconCls		: 'search'
					,minChars	: 3
					,autoFocus	: true
					,position		: "top"
					,width			: 200
				})			
			]
			,tbar					: []
		});

		GridStore.load({ params: { start: 0, limit: 10} });

		Grid.on('rowdblclick', function(grid, rowIndex, e ) {
			var record = grid.getSelectionModel().getSelected();
			display.setValue(record.data.ptname);
			value.setValue(record.data.ptcode);
			win.close();
		});

		if(!win){
			var win = new Ext.Window({
				title					: 'ค้นหาตำแหน่งสายงาน'
				,width				: 300
				,height				: 400
				,closable			: true
				,resizable		: false
				,plain				: true
				,border				: false
				,draggable 		: true 
				,modal				: true
				,layout				: "fit"
				,items				: [Grid]
			});
		}
		win.show();	
		win.center();
	}

	function searchExname(display,value){
		var Fields = [
			{name: "id", type: "int"}
			,{name: "excode", type: "int"}
			,{name: "shortpre", type: "string"}
			,{name: "longpre", type: "string"}
			,{name: "exname", type: "string"}
		];

		var Cols = [
			{
				header		: "#"
				,width		: 30
				,renderer	: rowNumberer.createDelegate(this)
				,sortable  : false
			}
			,{header: "ชื่อย่อคำนำหน้า", width: 100, sortable: false, dataIndex: "shortpre"}
			,{header: "คำนำหน้า", width: 100, sortable: false, dataIndex: "longpre"}
			,{header: "ตำแหน่งบริหาร", width: 250, sortable: false, dataIndex: "exname"}
		];

		var GridStore = new Ext.data.JsonStore({
			url					: "/code_executive/read"
			,root					: 'records'
			,autoLoad		: false
			,totalProperty	: 'totalCount'
			,fields				: Fields
			,idProperty		: 'id'
		});

		var Grid = new Ext.grid.GridPanel({
			region				: 'center'
			,split				: true
			,store				: GridStore
			,columns			: Cols
			,stripeRows		: true
			,loadMask		: {msg:'Loading...'}
			,sm					: new Ext.grid.RowSelectionModel({singleSelect: true})       
			,bbar				: new Ext.PagingToolbar({
					pageSize			: 10
					,autoWidth		: true
					,store				: GridStore
					,displayInfo		: true
					,displayMsg	: 'Displaying {0} - {1} of {2}'
					,emptyMsg		: "Not found"
			})
			,plugins			: [
				new Ext.ux.grid.Search({
					iconCls		: 'search'
					,minChars	: 3
					,autoFocus	: true
					,position		: "top"
					,width			: 200
				})			
			]
			,tbar					: []
		});

		GridStore.load({ params: { start: 0, limit: 10} });

		Grid.on('rowdblclick', function(grid, rowIndex, e ) {
			var record = grid.getSelectionModel().getSelected();
			display.setValue(record.data.shortpre+"  "+record.data.exname);
			value.setValue(record.data.excode);
			win.close();
		});

		if(!win){
			var win = new Ext.Window({
				title					: 'ค้นหาตำแหน่งสายงาน'
				,width				: 550
				,height				: 400
				,closable			: true
				,resizable		: false
				,plain				: true
				,border				: false
				,draggable 		: true 
				,modal				: true
				,layout				: "fit"
				,items				: [Grid]
			});
		}
		win.show();	
		win.center();
	}

	function searchExpert(display,value){
		var Fields = [
			{name: "id", type: "int"}
			,{name: "epcode", type: "int"}
			,{name: "prename", type: "string"}
			,{name: "expert", type: "string"}
		];

		var Cols = [
			{
				header		: "#"
				,width		: 30
				,renderer	: rowNumberer.createDelegate(this)
				,sortable  : false
			}			
			,{header: "คำนำหน้า", width: 100, sortable: false, dataIndex: "prename"}
			,{header: "ความเชี่ยวชาญ", width: 100, sortable: false, dataIndex: "expert"}
		];

		var GridStore = new Ext.data.JsonStore({
			url					: "/code_expert/read"
			,root					: 'records'
			,autoLoad		: false
			,totalProperty	: 'totalCount'
			,fields				: Fields
			,idProperty		: 'id'
		});

		var Grid = new Ext.grid.GridPanel({
			region				: 'center'
			,split				: true
			,store				: GridStore
			,columns			: Cols
			,stripeRows		: true
			,loadMask		: {msg:'Loading...'}
			,sm					: new Ext.grid.RowSelectionModel({singleSelect: true})       
			,bbar				: new Ext.PagingToolbar({
					pageSize			: 10
					,autoWidth		: true
					,store				: GridStore
					,displayInfo		: true
					,displayMsg	: 'Displaying {0} - {1} of {2}'
					,emptyMsg		: "Not found"
			})
			,plugins			: [
				new Ext.ux.grid.Search({
					iconCls		: 'search'
					,minChars	: 3
					,autoFocus	: true
					,position		: "top"
					,width			: 200
				})			
			]
			,tbar					: []
		});

		GridStore.load({ params: { start: 0, limit: 10} });

		Grid.on('rowdblclick', function(grid, rowIndex, e ) {
			var record = grid.getSelectionModel().getSelected();
			display.setValue(record.data.prename+"  "+record.data.expert);
			value.setValue(record.data.epcode);
			win.close();
		});

		if(!win){
			var win = new Ext.Window({
				title					: 'ค้นหาตำแหน่งสายงาน'
				,width				: 300
				,height				: 400
				,closable			: true
				,resizable		: false
				,plain				: true
				,border				: false
				,draggable 		: true 
				,modal				: true
				,layout				: "fit"
				,items				: [Grid]
			});
		}
		win.show();	
		win.center();
	}

	function searchMinname(display,value){
		var Fields = [
			{name: "id", type: "int"}
			,{name: "mincode", type: "int"}
			,{name: "minname", type: "string"}
		];

		var Cols = [
			{
				header		: "#"
				,width		: 30
				,renderer	: rowNumberer.createDelegate(this)
				,sortable  : false
			}
			,{header: "กระทรวง", width: 100, sortable: false, dataIndex: "minname"}
		];

		var GridStore = new Ext.data.JsonStore({
			url					: "/code_minis/read"
			,root					: 'records'
			,autoLoad		: false
			,totalProperty	: 'totalCount'
			,fields				: Fields
			,idProperty		: 'id'
		});

		var Grid = new Ext.grid.GridPanel({
			region				: 'center'
			,split				: true
			,store				: GridStore
			,columns			: Cols
			,stripeRows		: true
			,loadMask		: {msg:'Loading...'}
			,sm					: new Ext.grid.RowSelectionModel({singleSelect: true})       
			,bbar				: new Ext.PagingToolbar({
					pageSize			: 10
					,autoWidth		: true
					,store				: GridStore
					,displayInfo		: true
					,displayMsg	: 'Displaying {0} - {1} of {2}'
					,emptyMsg		: "Not found"
			})
			,plugins			: [
				new Ext.ux.grid.Search({
					iconCls		: 'search'
					,minChars	: 3
					,autoFocus	: true
					,position		: "top"
					,width			: 200
				})			
			]
			,tbar					: []
		});

		GridStore.load({ params: { start: 0, limit: 10} });

		Grid.on('rowdblclick', function(grid, rowIndex, e ) {
			var record = grid.getSelectionModel().getSelected();
			display.setValue(record.data.minname);
			value.setValue(record.data.mincode);
			win.close();
		});

		if(!win){
			var win = new Ext.Window({
				title					: 'ค้นหาตำแหน่งสายงาน'
				,width				: 300
				,height				: 400
				,closable			: true
				,resizable		: false
				,plain				: true
				,border				: false
				,draggable 		: true 
				,modal				: true
				,layout				: "fit"
				,items				: [Grid]
			});
		}
		win.show();	
		win.center();
	}

	function searchDivname(display,value){
		var Fields = [
			{name: "id", type: "int"}
			,{name: "divcode", type: "int"}
			,{name: "divname", type: "string"}
			,{name: "prefix", type: "string"}
			,{name: "flag", type: "string"}
		];

		var Cols = [
			{
				header		: "#"
				,width		: 30
				,renderer	: rowNumberer.createDelegate(this)
				,sortable  : false
			}
			,{header: "คำนำหน้า", width: 100, sortable: false, dataIndex: "prefix"}
			,{header: "กอง", width: 100, sortable: false, dataIndex: "divname"}
		];

		var GridStore = new Ext.data.JsonStore({
			url					: "/code_div/read"
			,root					: 'records'
			,autoLoad		: false
			,totalProperty	: 'totalCount'
			,fields				: Fields
			,idProperty		: 'id'
		});

		var Grid = new Ext.grid.GridPanel({
			region				: 'center'
			,split				: true
			,store				: GridStore
			,columns			: Cols
			,stripeRows		: true
			,loadMask		: {msg:'Loading...'}
			,sm					: new Ext.grid.RowSelectionModel({singleSelect: true})       
			,bbar				: new Ext.PagingToolbar({
					pageSize			: 10
					,autoWidth		: true
					,store				: GridStore
					,displayInfo		: true
					,displayMsg	: 'Displaying {0} - {1} of {2}'
					,emptyMsg		: "Not found"
			})
			,plugins			: [
				new Ext.ux.grid.Search({
					iconCls		: 'search'
					,minChars	: 3
					,autoFocus	: true
					,position		: "top"
					,width			: 200
				})			
			]
			,tbar					: []
		});

		GridStore.load({ params: { start: 0, limit: 10} });

		Grid.on('rowdblclick', function(grid, rowIndex, e ) {
			var record = grid.getSelectionModel().getSelected();
			display.setValue(record.data.prefix+"  "+record.data.divname);
			value.setValue(record.data.divcode);
			win.close();
		});

		if(!win){
			var win = new Ext.Window({
				title					: 'ค้นหาตำแหน่งสายงาน'
				,width				: 300
				,height				: 400
				,closable			: true
				,resizable		: false
				,plain				: true
				,border				: false
				,draggable 		: true 
				,modal				: true
				,layout				: "fit"
				,items				: [Grid]
			});
		}
		win.show();	
		win.center();
	}

	function searchDeptname(display,value){
		var Fields = [
			{name: "id", type: "int"}
			,{name: "deptcode", type: "int"}
			,{name: "deptname", type: "string"}
		];

		var Cols = [
			{
				header		: "#"
				,width		: 30
				,renderer	: rowNumberer.createDelegate(this)
				,sortable  : false
			}
			,{header: "กรม", width: 100, sortable: false, dataIndex: "deptname"}
		];

		var GridStore = new Ext.data.JsonStore({
			url					: "/code_dept/read"
			,root					: 'records'
			,autoLoad		: false
			,totalProperty	: 'totalCount'
			,fields				: Fields
			,idProperty		: 'id'
		});

		var Grid = new Ext.grid.GridPanel({
			region				: 'center'
			,split				: true
			,store				: GridStore
			,columns			: Cols
			,stripeRows		: true
			,loadMask		: {msg:'Loading...'}
			,sm					: new Ext.grid.RowSelectionModel({singleSelect: true})       
			,bbar				: new Ext.PagingToolbar({
					pageSize			: 10
					,autoWidth		: true
					,store				: GridStore
					,displayInfo		: true
					,displayMsg	: 'Displaying {0} - {1} of {2}'
					,emptyMsg		: "Not found"
			})
			,plugins			: [
				new Ext.ux.grid.Search({
					iconCls		: 'search'
					,minChars	: 3
					,autoFocus	: true
					,position		: "top"
					,width			: 200
				})			
			]
			,tbar					: []
		});

		GridStore.load({ params: { start: 0, limit: 10} });

		Grid.on('rowdblclick', function(grid, rowIndex, e ) {
			var record = grid.getSelectionModel().getSelected();
			display.setValue(record.data.deptname);
			value.setValue(record.data.deptcode);
			win.close();
		});

		if(!win){
			var win = new Ext.Window({
				title					: 'ค้นหาตำแหน่งสายงาน'
				,width				: 300
				,height				: 400
				,closable			: true
				,resizable		: false
				,plain				: true
				,border				: false
				,draggable 		: true 
				,modal				: true
				,layout				: "fit"
				,items				: [Grid]
			});
		}
		win.show();	
		win.center();
	}

	function searchJobname(display,value){
		var Fields = [
			{name: "id", type: "int"}
			,{name: "jobcode", type: "int"}
			,{name: "jobname", type: "string"}
		];

		var Cols = [
			{
				header		: "#"
				,width		: 30
				,renderer	: rowNumberer.createDelegate(this)
				,sortable  : false
			}
			,{header: "งาน", width: 250, sortable: false, dataIndex: "jobname"}
		];

		var GridStore = new Ext.data.JsonStore({
			url					: "/code_job/read"
			,root					: 'records'
			,autoLoad		: false
			,totalProperty	: 'totalCount'
			,fields				: Fields
			,idProperty		: 'id'
		});

		var Grid = new Ext.grid.GridPanel({
			region				: 'center'
			,split				: true
			,store				: GridStore
			,columns			: Cols
			,stripeRows		: true
			,loadMask		: {msg:'Loading...'}
			,sm					: new Ext.grid.RowSelectionModel({singleSelect: true})       
			,bbar				: new Ext.PagingToolbar({
					pageSize			: 10
					,autoWidth		: true
					,store				: GridStore
					,displayInfo		: true
					,displayMsg	: 'Displaying {0} - {1} of {2}'
					,emptyMsg		: "Not found"
			})
			,plugins			: [
				new Ext.ux.grid.Search({
					iconCls		: 'search'
					,minChars	: 3
					,autoFocus	: true
					,position		: "top"
					,width			: 200
				})			
			]
			,tbar					: []
		});

		GridStore.load({ params: { start: 0, limit: 10} });

		Grid.on('rowdblclick', function(grid, rowIndex, e ) {
			var record = grid.getSelectionModel().getSelected();
			display.setValue(record.data.jobname);
			value.setValue(record.data.jobcode);
			win.close();
		});

		if(!win){
			var win = new Ext.Window({
				title					: 'ค้นหาตำแหน่งสายงาน'
				,width				: 300
				,height				: 400
				,closable			: true
				,resizable		: false
				,plain				: true
				,border				: false
				,draggable 		: true 
				,modal				: true
				,layout				: "fit"
				,items				: [Grid]
			});
		}
		win.show();	
		win.center();
	}

	function searchsdname(display,value){
		var Fields = [
			{name: "id", type: "int"}
			,{name: "sdcode", type: "int"}
			,{name: "shortpre", type: "string"}
			,{name: "longpre", type: "string"}
			,{name: "sdname", type: "string"}
		];

		var Cols = [
			{
				header		: "#"
				,width		: 30
				,renderer	: rowNumberer.createDelegate(this)
				,sortable  : false
			}
			,{header: "ชื่อย่อคำนำหน้า", width: 80, sortable: false, dataIndex: "shortpre"}
			,{header: "คำนำหน้า", width: 150, sortable: false, dataIndex: "longpre"}
			,{header: "หน่วยงาน", width: 180, sortable: false, dataIndex: "sdname"}
		];

		var GridStore = new Ext.data.JsonStore({
			url					: "/code_sdept/read"
			,root					: 'records'
			,autoLoad		: false
			,totalProperty	: 'totalCount'
			,fields				: Fields
			,idProperty		: 'id'
		});

		var Grid = new Ext.grid.GridPanel({
			region				: 'center'
			,split				: true
			,store				: GridStore
			,columns			: Cols
			,stripeRows		: true
			,loadMask		: {msg:'Loading...'}
			,sm					: new Ext.grid.RowSelectionModel({singleSelect: true})       
			,bbar				: new Ext.PagingToolbar({
					pageSize			: 10
					,autoWidth		: true
					,store				: GridStore
					,displayInfo		: true
					,displayMsg	: 'Displaying {0} - {1} of {2}'
					,emptyMsg		: "Not found"
			})
			,plugins			: [
				new Ext.ux.grid.Search({
					iconCls		: 'search'
					,minChars	: 3
					,autoFocus	: true
					,position		: "top"
					,width			: 200
				})			
			]
			,tbar					: []
		});

		GridStore.load({ params: { start: 0, limit: 10} });

		Grid.on('rowdblclick', function(grid, rowIndex, e ) {
			var record = grid.getSelectionModel().getSelected();
			display.setValue(record.data.shortpre+"  "+record.data.sdname);
			value.setValue(record.data.sdcode);
			win.close();
		});

		if(!win){
			var win = new Ext.Window({
				title					: 'ค้นหาตำแหน่งสายงาน'
				,width				: 550
				,height				: 400
				,closable			: true
				,resizable		: false
				,plain				: true
				,border				: false
				,draggable 		: true 
				,modal				: true
				,layout				: "fit"
				,items				: [Grid]
			});
		}
		win.show();	
		win.center();
	}

	function searchSectname(display,value){
		var Fields = [
			{name: "id", type: "int"}
			,{name: "sectcode", type: "int"}
			,{name: "shortname", type: "string"}
			,{name: "sectname", type: "string"}
		];

		var Cols = [
			{
				header		: "#"
				,width		: 30
				,renderer	: rowNumberer.createDelegate(this)
				,sortable  : false
			}
			,{header: "ชื่อย่อ", width: 80, sortable: false, dataIndex: "shortname"}
			,{header: "กลุ่ม", width: 180, sortable: false, dataIndex: "sectname"}
		];

		var GridStore = new Ext.data.JsonStore({
			url					: "/code_sect/read"
			,root					: 'records'
			,autoLoad		: false
			,totalProperty	: 'totalCount'
			,fields				: Fields
			,idProperty		: 'id'
		});

		var Grid = new Ext.grid.GridPanel({
			region				: 'center'
			,split				: true
			,store				: GridStore
			,columns			: Cols
			,stripeRows		: true
			,loadMask		: {msg:'Loading...'}
			,sm					: new Ext.grid.RowSelectionModel({singleSelect: true})       
			,bbar				: new Ext.PagingToolbar({
					pageSize			: 10
					,autoWidth		: true
					,store				: GridStore
					,displayInfo		: true
					,displayMsg	: 'Displaying {0} - {1} of {2}'
					,emptyMsg		: "Not found"
			})
			,plugins			: [
				new Ext.ux.grid.Search({
					iconCls		: 'search'
					,minChars	: 3
					,autoFocus	: true
					,position		: "top"
					,width			: 200
				})			
			]
			,tbar					: []
		});

		GridStore.load({ params: { start: 0, limit: 10} });

		Grid.on('rowdblclick', function(grid, rowIndex, e ) {
			var record = grid.getSelectionModel().getSelected();
			display.setValue(record.data.sectname);
			value.setValue(record.data.sectcode);
			win.close();
		});

		if(!win){
			var win = new Ext.Window({
				title					: 'ค้นหาตำแหน่งสายงาน'
				,width				: 550
				,height				: 400
				,closable			: true
				,resizable		: false
				,plain				: true
				,border				: false
				,draggable 		: true 
				,modal				: true
				,layout				: "fit"
				,items				: [Grid]
			});
		}
		win.show();	
		win.center();
	}

	function searchJ18(){
		Ext.Msg.alert();
	}

	function searchEditJ18(id){
		
		Ext.Ajax.request({
			url				: '/j18/search_edit_j18'
			,params		: {
				id		: id
			}
			,success		: function(response, opts) {
				var obj = Ext.decode(response.responseText);
				Ext.getCmp("aprc").setValue(obj.data[0].aprc);
				Ext.getCmp("aprsalary").setValue(obj.data[0].aprsalary);
				Ext.getCmp("bkdmny").setValue(obj.data[0].bkdmny);
				Ext.getCmp("c").setValue(obj.data[0].c);
				obj.data[0].asbdate = obj.data[0].asbdate.replace(obj.data[0].asbdate.split("-")[0],(Number(obj.data[0].asbdate.split("-")[0]) + 543));
				Ext.getCmp("cp_asbdate").setValue(obj.data[0].asbdate);
				obj.data[0].emptydate = obj.data[0].emptydate.replace(obj.data[0].emptydate.split("-")[0],(Number(obj.data[0].emptydate.split("-")[0]) + 543));
				Ext.getCmp("cp_emptydate").setValue(obj.data[0].emptydate);
				Ext.getCmp("deptname").setValue(obj.data[0].deptname);
				Ext.getCmp("deptname_id").setValue(obj.data[0].deptcode);
				Ext.getCmp("divname").setValue(obj.data[0].pre_divname + " " + obj.data[0].divname);
				Ext.getCmp("divname_id").setValue(obj.data[0].divcode);
				Ext.getCmp("exname").setValue(obj.data[0].pre_exname + " " + obj.data[0].exname);
				Ext.getCmp("exname_id").setValue(obj.data[0].excode);
				Ext.getCmp("expert").setValue(obj.data[0].pre_expert + " " + obj.data[0].expert);
				Ext.getCmp("expert_id").setValue(obj.data[0].epcode);
				//Ext.getCmp("fname_lname").setValue(obj.data[0].);
				Ext.getCmp("id").setValue(obj.data[0].id);
				Ext.getCmp("inname").setValue(obj.data[0].inname);
				Ext.getCmp("inname_id").setValue(obj.data[0].incode);
				Ext.getCmp("jobname").setValue(obj.data[0].jobname);
				Ext.getCmp("jobname_id").setValue(obj.data[0].jobcode);
				Ext.getCmp("lastc").setValue(obj.data[0].lastc);
				Ext.getCmp("lastcasb").setValue(obj.data[0].lastcasb);
				Ext.getCmp("lastsal").setValue(obj.data[0].lastsal);
				Ext.getCmp("lastsalasb").setValue(obj.data[0].lastsalasb);
				Ext.getCmp("minname").setValue(obj.data[0].minname);
				Ext.getCmp("minname_id").setValue(obj.data[0].mincode);
				Ext.getCmp("nowc").setValue(obj.data[0].nowc);
				Ext.getCmp("nowcasb").setValue(obj.data[0].nowcasb);	
				Ext.getCmp("nowsal").setValue(obj.data[0].nowsal);
				Ext.getCmp("nowsalasb").setValue(obj.data[0].nowsalasb);	
				Ext.getCmp("octc").setValue(obj.data[0].octc);
				Ext.getCmp("octsalary").setValue(obj.data[0].octsalary);	
				Ext.getCmp("pcdcode").setValue(obj.data[0].pcdcode);
				Ext.getCmp("posid").setValue(obj.data[0].posid);
				Ext.getCmp("posmny").setValue(obj.data[0].posmny);	
				Ext.getCmp("posname").setValue(obj.data[0].pre_posname + " " +obj.data[0].posname);
				Ext.getCmp("posname_id").setValue(obj.data[0].poscode);
				Ext.getCmp("ptname").setValue(obj.data[0].ptname);
				Ext.getCmp("ptname_id").setValue(obj.data[0].ptcode);
				Ext.getCmp("rem").setValue(obj.data[0].rem);	
				Ext.getCmp("rem2").setValue(obj.data[0].rem2);	
				Ext.getCmp("salary").setValue(obj.data[0].salary);
				Ext.getCmp("sdname").setValue(obj.data[0].pre_sdname + " " + obj.data[0].sdname);
				Ext.getCmp("sdname_id").setValue(obj.data[0].sdcode);
				Ext.getCmp("sectname1").setValue(obj.data[0].subdname);
				Ext.getCmp("sectname2").setValue(obj.data[0].sectname);
				Ext.getCmp("sectname_id1").setValue(obj.data[0].subdcode);
				Ext.getCmp("sectname_id2").setValue(obj.data[0].sectcode);
			}
			,failure			: function(response, opts) {
				Ext.Msg.alert("สถานะ", response.statusText);
			}
		});
	}


	function deleteJ18(id){
		
		Ext.Msg.confirm('สถานะ', 'ต้องการลบใช่หรือไม่', function(btn, text){			
			if (btn == 'yes')
			{				
				loadMask.show();
				Ext.Ajax.request({
					url			: 'j18/deletej18' , 
					params	: { 
						id						: id
						,random			: Math.random()
					},	
					failure		: function ( result, request) { 
						loadMask.hide();
						Ext.MessageBox.alert('สถานะ', "Error : "+result.responseText); 
					},
					success: function ( result, request ) { 
						loadMask.hide();
						var obj = Ext.util.JSON.decode(result.responseText); 
						if (obj.success == false)
						{
							Ext.MessageBox.alert('สถานะ', 'ไม่สามารถลบได้ <br> Error: ' + obj.errors.reason); 
						}
						else if (obj.success == true)
						{
							Ext.MessageBox.alert('สถานะ', 'ลบเสร็จเรียบร้อย',function(btn, text){
									if (btn == 'ok'){
										j18GridStore.reload();
									}
								}
							); 
						}
					}
				});	
			}//end if (btn == 'yes')
			else
			{
				return false;
			}
		});		
	}