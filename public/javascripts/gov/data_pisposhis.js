/********************************************************************/
/*											Grid   												*/
/******************************************************************/
    var action_griddata_pisposhis = new Ext.ux.grid.RowActions({
             header					: 'จัดการ'
            ,keepSelection			: true
            ,widthSlope				: 50
            ,actions					:[
                    {iconCls: 'page', tooltip: 'แก้ไข'}
            ]		
    });

    action_griddata_pisposhis.on({
            action:function(grid, record, action, row, col) {
                    if (action == "page"){
						center_govPanel.getLayout().setActiveItem(panelDatailData_Pisposhis);
						detail_pisposhisGridStore.baseParams = {
							pis_personel_id : record.data.pis_personel_id
						}
						detail_pisposhisGridStore.load( { params: { start: 0, limit: 20} } );	
						detail_pisposhisGridStore.pis_personel_id = record.data.pis_personel_id;
                    }		
            }
    });
    
    var data_pisposhisSearch = new Ext.ux.grid.Search({
            iconCls				: 'search'
            ,minChars			: 3
            ,autoFocus			: true
            ,position				: "top"
            ,width					: 200
    });
    var data_pisposhisFields = [
        {name: "id", type: "int"}
		,{name: "pis_personel_id", type: "string"}
        ,{name: "posid", type: "int"}
        ,{name: "fname", type: "string"}
        ,{name: "lname", type: "string"}
        ,{name: "posname", type: "string"}
        ,{name: "minname", type: "string"}
        ,{name: "deptname", type: "string"}
        ,{name: "sdname", type: "string"}
        ,{name: "c", type: "string"}
    ];
    
    var data_pisposhisCols = [
            {
                    header			: "#"
                    ,width			: 30
                    ,renderer		: rowNumberer.createDelegate(this)
                    ,sortable		: false
            }	
			 ,{header: "ชื่อ",width: 100, sortable: false, dataIndex: 'fname'	}
			 ,{header: "นามสกุล",width: 100, sortable: false, dataIndex: 'lname'	}
            ,{header: "ตำแหน่งเลขที่",width: 100, sortable: false, dataIndex: 'posid'	}
			,{header: "ตำแหน่งสายงาน",width: 100, sortable: false, dataIndex: 'posname'	}
			,{header: "กระทรวง",width: 200, sortable: false, dataIndex: 'minname'	}
			,{header: "กรม",width: 200, sortable: false, dataIndex: 'deptname'	}
			,{header: "หน่วยงาน",width: 200, sortable: false, dataIndex: 'sdname'	}
			,{header: "ระดับ",width: 100, sortable: false, dataIndex: 'c'	}
            ,action_griddata_pisposhis
    ];
    
    var data_pisposhisGridStore = new Ext.data.JsonStore({
            url					: "/data_pisposhis/read"
            ,root					: "records"
            ,autoLoad		: false
            ,totalProperty	: 'totalCount'
            ,fields				: data_pisposhisFields
            ,idProperty		: 'id'
    });
    
    var data_pisposhisGrid = new Ext.grid.GridPanel({
            title					: "ข้อมูลประวัติการดำรงตำแหน่งและเงินเดือน"
            ,split				: true
            ,store				: data_pisposhisGridStore
            ,columns			: data_pisposhisCols
            ,stripeRows		: true
            ,loadMask		: {msg:'Loading...'}
            ,sm					: new Ext.grid.RowSelectionModel({singleSelect: true})
            ,plugins			: [data_pisposhisSearch,action_griddata_pisposhis]
            ,bbar				: new Ext.PagingToolbar({
                            pageSize				: 20
                            ,autoWidth			: true
                            ,store					: data_pisposhisGridStore
                            ,displayInfo			: true
                            ,displayMsg	    : 'Displaying {0} - {1} of {2}'
                            ,emptyMsg			: "Not found"
            })
			,tbar					: []
            
    });
/********************************************************************/
/*											Form   												*/
/******************************************************************/
	urlformDatailData_Pisposhis = "";

	/////////////////////////////////// Grid Detail
		var detail_pisposhisFields = [
			{name: "id", type: "int"}
			,{name: "historder", type: "int"}
			,{name: "excode", type: "string"}
			,{name: "salary", type: "string"}
			,{name: "refcmnd", type: "string"}
			,{name: "forcedate", type: "string"}
			,{name: "exname", type: "string"}
			,{name: "posid", type: "string"}
			,{name: "poscode", type: "string"}
			,{name: "posname", type: "string"}
			
		];
		
		var detail_pisposhisCols = [
				{
						header			: "#"
						,width			: 30
						,renderer		: rowNumberer.createDelegate(this)
						,sortable		: false
				}
				,{header: "ลำดับที่",width: 200, sortable: false, dataIndex: 'historder'	}
			    ,{header: "วันที่มีผลบังคับใช้",width: 150, sortable: false, dataIndex: 'forcedate'	}
				,{header: "เลขที่ตำแหน่ง",width: 100, sortable: false, dataIndex: 'posid'	}
				,{header: "ตำแหน่งสายงาน",width: 200, sortable: false, dataIndex: 'posname'	}
				,{header: "เงินเดือน",width: 100, sortable: false, dataIndex: 'salary'	}
				,{header: "คำสั่ง",width: 300, sortable: false, dataIndex: 'refcmnd'	}
		];
		
		var detail_pisposhisGridStore = new Ext.data.JsonStore({
				url					: "/data_pisposhis/search_detail"
				,root					: "records"
				,autoLoad		: false
				,totalProperty	: 'totalCount'
				,fields				: detail_pisposhisFields
				,idProperty		: 'id'
		});
		
		var detail_pisposhisGrid = new Ext.grid.GridPanel({
				region				: 'north'
				,height				: 200
				,split				: true
				,store				: detail_pisposhisGridStore
				,columns			: detail_pisposhisCols
				,stripeRows		: true
				,loadMask		: {msg:'Loading...'}
				,sm					: new Ext.grid.RowSelectionModel({singleSelect: true})
				,bbar				: new Ext.PagingToolbar({
								pageSize				: 20
								,autoWidth			: true
								,store					: detail_pisposhisGridStore
								,displayInfo			: true
								,displayMsg	    : 'Displaying {0} - {1} of {2}'
								,emptyMsg			: "Not found"
				})
				,tbar					: [
					{
						text				: "	เพิ่ม"
						,iconCls		: "table-add"
						,handler		: function(){
							urlformDatailData_Pisposhis = "/data_pisposhis/add_detail";
							formDatailData_Pisposhis.getForm().reset();
							formDatailData_Pisposhis.enable();
						}
					},"-",{
						ref                    : '../removeBtn'
						,text					: 'ลบ'
						,tooltip             : 'ลบ'
						,iconCls           : 'table-delete'
						,disabled			: true
						,handler			: function(){
								delete_detail_pisposhis(detail_pisposhisGrid.getSelectionModel().getSelections()[0].data.id);
						}
					}
				]
				
		});

		detail_pisposhisGrid.on('rowdblclick', function(grid, rowIndex, e ) {
			formDatailData_Pisposhis.getForm().reset();
			urlformDatailData_Pisposhis = "/data_pisposhis/edit_detail";
			var record = grid.getSelectionModel().getSelected();
			searchEditDataPisposhis(record.data.id);
			formDatailData_Pisposhis.enable();
			Ext.getCmp("id").setValue(record.data.id);	 

		});

		detail_pisposhisGrid.getSelectionModel().on('selectionchange', function(sm){			
				detail_pisposhisGrid.removeBtn.setDisabled(sm.getCount() < 1);		
		});

	//////////////////////////Form Deatil

		var sdnametrigger = new Ext.form.TriggerField({
			fieldLabel			: "<b>หน่วยงาน</b>"
			,triggerClass		: "trigger"
			,anchor				: "100%"
			,id						: "sdname"
			,readOnly				: true
			,onTriggerClick	: function(){
				searchsdname(sdnametrigger,Ext.getCmp("sdcode"));
			}
		});

		var formDatailData_Pisposhis = new Ext.FormPanel({
			region				: "center"
			,frame				: true
			,border				: false
			,labelWidth		: 110
			,labelAlign		: "right"
			,autoScroll		: true
			,monitorValid	: true
			,disabled			: true
			,bodyStyle		: "padding:20px"
			,items				: [
				{
					xtype			: "hidden"
					,id				: "id"
				}
				,{
					layout			: "column"
					,items			: [
						{
							width				: 1000
							,layout				: "form"
							,items				: [
								{
									layout			: "column"
									,items			: [
										{
											width		: 240
											,layout		: "form"
											,items		: [
												{
													xtype			: "numberfield"
													,id				: "historder"
													,fieldLabel	: "<b>ลำดับที่</b>"
													,readOnly		: true
													,width			: 80
												}
											]
										},{
											width				: 760
											,layout				: "form"
											,labelWidth		: 50
											,items		: [
												{
													xtype				: "textfield"
													,id					: "refcmnd"
													,fieldLabel		: "<b>คำสั่ง</b>"
													,anchor			: "100%"
												}
											]
										}	
									]
								},{
									layout				: "column"
									,items				: [
										{
											width			: 500
											,layout			: "form"
											,defaults		: {
												anchor		: "95%"
											}
											,items			: [
												new Ext.form.ComboBox({
													fieldLabel				: '<b>การเคลื่อนไหว</b>'
													,hiddenName			: 'updcode'
													,id							: 'idupdcode'
													,store						: new Ext.data.Store({
															reader		: new Ext.data.JsonReader({
																fields	: ['updcode', 'updname']
																,root		: 'records'
															})
															,url					: 'code_update/genres'
												})
													,valueField				: 'updcode'
													,displayField			: 'updname'
													,typeAhead				: true
													,triggerAction			: 'all'
													,emptyText				: 'Select ...'
													,selectOnFocus		: true													
												}),{
														xtype				: "textfield"
														,id					: "posid"
														,fieldLabel		: "<b>เลขที่ตำแหน่ง</b>"
														,readOnly			: true
												}
												,new Ext.form.ComboBox({
													fieldLabel				: '<b>ตำแหน่งสายงาน</b>'
													,hiddenName			: 'poscode'
													,id							: 'idposcode'
													,store						: new Ext.data.Store({
															reader		: new Ext.data.JsonReader({
																fields	: ['poscode', 'posname']
																,root		: 'records'
															})
															,url					: 'code_position/genres'
													})
													,valueField				: 'poscode'
													,displayField			: 'posname'
													,typeAhead				: true
													,triggerAction			: 'all'
													,emptyText				: 'Select ...'
													,selectOnFocus		: true
												})
												,new Ext.form.ComboBox({
													fieldLabel				: '<b>ตำแหน่งบริหาร</b>'
													,hiddenName			: 'excode'
													,id							: 'idexcode'
													,store						: new Ext.data.Store({
															reader		: new Ext.data.JsonReader({
																fields	: ['excode', 'exname']
																,root		: 'records'
															})
															,url					: 'code_executive/genres'
													})
													,valueField				: 'excode'
													,displayField			: 'exname'
													,typeAhead				: true
													,triggerAction			: 'all'
													,emptyText				: 'Select ...'
													,selectOnFocus		: true
												})
												,new Ext.form.ComboBox({
													fieldLabel				: '<b>ว./วช./ชช.</b>'
													,hiddenName			: 'ptcode'
													,id							: 'idptcode'
													,store						: new Ext.data.Store({
															reader		: new Ext.data.JsonReader({
																fields	: ['ptcode', 'ptname']
																,root		: 'records'
															})
															,url					: 'code_postype/genres'
													})
													,valueField				: 'ptcode'
													,displayField			: 'ptname'
													,typeAhead				: true
													,triggerAction			: 'all'
													,emptyText				: 'Select ...'
													,selectOnFocus		: true
												})
											]
										},{
											width			: 500
											,layout			: "form"
											,items			: [
												{
													xtype			: "datefield"
													,id				: "forcedate"
													,fieldLabel	: "<b>วันที่มีผลบังคับใช้</b>"
													,format			: "d/m/Y"
												}
												,new Ext.BoxComponent({
													autoEl: {
														tag			: 'div',
														style		: "padding-top:28px"
													}
												})
												,new Ext.form.ComboBox({
													fieldLabel				: '<b>ระดับ</b>'
													,hiddenName			: 'c'
													,id							: 'idc'
													,store						: new Ext.data.Store({
															reader		: new Ext.data.JsonReader({
																fields	: ['ccode', 'cname']
																,root		: 'records'
															})
															,url					: 'code_grouplevel/genres'
													})
													,valueField				: 'ccode'
													,displayField			: 'cname'
													,typeAhead				: true
													,triggerAction			: 'all'
													,emptyText				: 'Select ...'
													,selectOnFocus		: true
													,anchor					: "100%"
												})
												,new Ext.form.ComboBox({
													fieldLabel				: '<b>ความเชี่ยวชาญ</b>'
													,hiddenName			: 'epcode'
													,id							: 'idepcode'
													,store						: new Ext.data.Store({
															reader		: new Ext.data.JsonReader({
																fields	: ['epcode', 'expert']
																,root		: 'records'
															})
															,url					: 'code_expert/genres'
													})
													,valueField				: 'epcode'
													,displayField			: 'expert'
													,typeAhead				: true
													,triggerAction			: 'all'
													,emptyText				: 'Select ...'
													,selectOnFocus		: true
													,anchor					: "100%"
												})
											]
										}
									]
								},{
									layout				: "column"
									,items				: [
										{
											width				: 250
											,layout				: "form"
											,items				: [
												{
													xtype				: "numberfield"
													,id					: "salary"
													,fieldLabel		: "<b>เงินเดือน</b>"
													,readOnly			: true
												}
											]
										},{
											width				: 250
											,layout				: "form"
											,items				: [
												{
													xtype				: "numberfield"
													,fieldLabel		: "<b>ร้อยละที่ได้เลื่อน</b>"
												}
											]	
										},{
											width				: 250
											,layout				: "form"
											,items				: [
												{
													xtype				: "numberfield"
													,fieldLabel		: "<b>ค่าตอบแทนพิเศษ</b>"
												}
											]	
										}
														
									]
								},{
									layout				: "column"
									,items				: [
										{
											width				: 250
											,layout				: "form"
											,items				: [
												{
													xtype				: "numberfield"
													,fieldLabel		: "<b>เงินประจำตำแหน่ง</b>"
												}	
											]
										},{
											width				: 250
											,layout				: "form"
											,items				: [
												{
													xtype			: "numberfield"
													,fieldLabel	: "<b>เงิน พสร.</b>"
												}	
											]
										}	
									]
								},{
									layout				: "column"
									,items				: [
										{
											width		: 500
											,layout		: "form"
											,defaults	: {
												anchor		: "95%"
											}
											,items		: [
												new Ext.form.ComboBox({
													fieldLabel				: '<b>กระทรวง</b>'
													,hiddenName			: 'mincode'
													,id							: 'idmincode'
													,store						: new Ext.data.Store({
															reader		: new Ext.data.JsonReader({
																fields	: ['mincode', 'minname']
																,root		: 'records'
															})
															,url					: 'code_minis/genres'
													})
													,valueField				: 'mincode'
													,displayField			: 'minname'
													,typeAhead				: true
													,triggerAction			: 'all'
													,emptyText				: 'Select ...'
													,selectOnFocus		: true
												})
												,new Ext.form.ComboBox({
													fieldLabel				: '<b>กรม</b>'
													,hiddenName			: 'deptcode'
													,id							: 'iddeptcode'
													,store						: new Ext.data.Store({
															reader		: new Ext.data.JsonReader({
																fields	: ['deptcode', 'deptname']
																,root		: 'records'
															})
															,url					: 'code_dept/genres'
													})
													,valueField				: 'deptcode'
													,displayField			: 'deptname'
													,typeAhead				: true
													,triggerAction			: 'all'
													,emptyText				: 'Select ...'
													,selectOnFocus		: true
												})
											]
										},{
											width		: 500
											,layout		: "form"
											,defaults	: {
												anchor		: "95%"
											}
											,items		: [
												new Ext.form.ComboBox({
													fieldLabel				: '<b>กอง</b>'
													,hiddenName			: 'divcode'
													,id							: 'iddivcode'
													,store						: new Ext.data.Store({
															reader		: new Ext.data.JsonReader({
																fields	: ['divcode', 'divname']
																,root		: 'records'
															})
															,url					: 'code_div/genres'
													})
													,valueField				: 'divcode'
													,displayField			: 'divname'
													,typeAhead				: true
													,triggerAction			: 'all'
													,emptyText				: 'Select ...'
													,selectOnFocus		: true
												})
											]
										}
									]
								}
								,sdnametrigger
								,{
									xtype			: "textfield"
									,id				: "sdcode"
								},{
									layout				: "column"
									,items				: [
										{
											width				: 500
											,layout				: "form"
											,defaults			: {
												anchor		: "95%"
											}
											,items				: [
												new Ext.form.ComboBox({
													fieldLabel 	        : '<b>กลุ่ม</b>'
													,id						: 'idsubdcode'
													,editable 				: false
													,hiddenName 		:'subdcode'
													,store 					: new Ext.data.Store({
														reader				: new Ext.data.JsonReader({
															fields				: ['sectcode', 'sectname']
															,root					: 'records'
														})
														,url					: 'code_sect/genres' 
													})
													,valueField 			: 'sectcode'
													,displayField 		: 'sectname'
													,typeAhead 	        : true
													,triggerAction 		: 'all'
													,emptyText 	        : 'โปรดเลือก'
													,selectOnFocus 	: true                          
												})
												,new Ext.form.ComboBox({
													fieldLabel 	        : '<b>งาน</b>'
													,id						: 'idjobcode'
													,editable 				: false
													,hiddenName 		:'jobcode'
													,store 					: new Ext.data.Store({
														reader				: new Ext.data.JsonReader({
															fields				: ['jobcode', 'jobname']
															,root					: 'records'
														})
														,url					: 'code_job/genres' 
													})
													,valueField 			: 'jobcode'
													,displayField 		: 'jobname'
													,typeAhead 	        : true
													,triggerAction 		: 'all'
													,emptyText 	        : 'โปรดเลือก'
													,selectOnFocus 	: true                        
												})
											]
										},{
											width				: 500
											,layout				: "form"
											,defaults			: {
												anchor		: "100%"
											}
											,items				: [
												new Ext.form.ComboBox({
													fieldLabel 	        : '<b>ฝ่าย/กลุ่มงาน</b>'
													,anchor				: "100%"
													,id						: 'idsectcode'
													,editable 				: false
													,hiddenName 		: 'sectcode'
													,store 					: new Ext.data.Store({
														reader				: new Ext.data.JsonReader({
															fields				: ['sectcode', 'sectname']
															,root					: 'records'
														})
														,url					: 'code_sect/genres' 
													})
													,valueField 			: 'sectcode'
													,displayField 		: 'sectname'
													,typeAhead 	        : true
													,triggerAction 		: 'all'
													,emptyText 	        : 'โปรดเลือก'
													,selectOnFocus 	: true                         
												})
												,new Ext.form.ComboBox({
													fieldLabel 	        : '<b>หน่วยงานภายใน</b>'
													,anchor		: "100%"
													,id                 : 'a10'
													,editable 		: false
													,hiddenName 	:'a1010'
													,store 		: new Ext.data.Store({
														reader		: new Ext.data.JsonReader({
															fields		: ['ray_id', 'ray_name']
															,root		: 'records'
														})
														,url		: '' 
													})
													,valueField 	: 'ray_id'
													,displayField 	: 'ray_name'
													,typeAhead 	        : true
													,triggerAction 	: 'all'
													,emptyText 	        : 'โปรดเลือก'
													,selectOnFocus 	: true                          
												})
											]
										}
									]
								},{
									xtype			: "textfield"
									,id				: "note"
									,fieldLabel	: "<b>หมาายเหตุ</b>"
									,anchor		: "100%"
								}

					
							]
						}	
					]
				}
			]
			,buttons			: [
				{ 
					text					:'บันทึก'
					,formBind			: true 
					,handler			:function(){ 		
						
					
						formDatailData_Pisposhis.getForm().submit(
						{ 
							method		:'POST'
							,url				: urlformDatailData_Pisposhis
							,waitTitle		:'Saving Data'
							,waitMsg		:'Sending data...'
							,params		: {
								pis_personel_id : detail_pisposhisGridStore.pis_personel_id
							}
							,success		:function(){		
								Ext.Msg.alert("สถานะ","บันทึกเสร็จเรีบยร้อย", function(btn, text){										
										if (btn == 'ok')
										{
											formDatailData_Pisposhis.getForm().reset();
											formDatailData_Pisposhis.disable();
											detail_pisposhisGridStore.reload();
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
					text			: "ยกเลิก"
					,handler	: function(){
						center_govPanel.getLayout().setActiveItem(data_pisposhisGrid);
						data_pisposhisGridStore.load({ params: { start: 0, limit: 20} });	
					}
				}	
			]
		});

	//////////////////////////Display Deatil
		var panelDatailData_Pisposhis = new Ext.Panel({
			title					: "ข้อมูลประวัติการดำรงตำแหน่งและเงินเดือน"
			,layout				: "border"
			,items				: [
				detail_pisposhisGrid
				,formDatailData_Pisposhis
			]
		});
/********************************************************************/
/*									Function     												*/
/******************************************************************/

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
			,{header: "รหัส", width: 80, sortable: false, dataIndex: "sdcode"}
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

	function searchEditDataPisposhis(id){ 
		Ext.Ajax.request({
			url				: '/data_pisposhis/search_edit'
			,params		: {
				id		: id
			}
			,success		: function(response, opts) {
				var obj = Ext.decode(response.responseText);
				Ext.getCmp("historder").setValue(obj.data[0].historder);
				Ext.getCmp("refcmnd").setValue(obj.data[0].refcmnd);
				Ext.getCmp("idupdcode").getStore().load()
				Ext.getCmp("idupdcode").store.on("load",function(){Ext.getCmp("idupdcode").setValue(obj.data[0].updcode);})
				obj.data[0].forcedate = obj.data[0].forcedate.replace(obj.data[0].forcedate.split("-")[0],(Number(obj.data[0].forcedate.split("-")[0]) + 543));
				Ext.getCmp("forcedate").setValue( to_date_i(obj.data[0].forcedate) );
				Ext.getCmp("posid").setValue( obj.data[0].posid );
				Ext.getCmp("idposcode").getStore().load()
				Ext.getCmp("idposcode").store.on("load",function(){Ext.getCmp("idposcode").setValue(obj.data[0].poscode);})
				Ext.getCmp("idexcode").getStore().load()
				Ext.getCmp("idexcode").store.on("load",function(){Ext.getCmp("idexcode").setValue(obj.data[0].excode);})
				Ext.getCmp("idptcode").getStore().load()
				Ext.getCmp("idptcode").store.on("load",function(){Ext.getCmp("idptcode").setValue(obj.data[0].ptcode);})
				Ext.getCmp("salary").setValue(obj.data[0].salary);
				Ext.getCmp("idc").getStore().load()
				Ext.getCmp("idc").store.on("load",function(){Ext.getCmp("idc").setValue(obj.data[0].c);})
				Ext.getCmp("idepcode").getStore().load()
				Ext.getCmp("idepcode").store.on("load",function(){Ext.getCmp("idepcode").setValue(obj.data[0].epcode);})
				Ext.getCmp("idmincode").getStore().load()
				Ext.getCmp("idmincode").store.on("load",function(){Ext.getCmp("idmincode").setValue(obj.data[0].mincode);})
				Ext.getCmp("iddeptcode").getStore().load()
				Ext.getCmp("iddeptcode").store.on("load",function(){Ext.getCmp("iddeptcode").setValue(obj.data[0].deptcode);})
				Ext.getCmp("iddivcode").getStore().load()
				Ext.getCmp("iddivcode").store.on("load",function(){Ext.getCmp("iddivcode").setValue(obj.data[0].divcode);})
				Ext.getCmp("sdcode").setValue(obj.data[0].sdcode);
				Ext.getCmp("sdname").setValue(obj.data[0].sdname);
				Ext.getCmp("idsubdcode").getStore().load()
				Ext.getCmp("idsubdcode").store.on("load",function(){Ext.getCmp("idsubdcode").setValue(obj.data[0].subdcode);})
				Ext.getCmp("idsectcode").getStore().load()
				Ext.getCmp("idsectcode").store.on("load",function(){Ext.getCmp("idsectcode").setValue(obj.data[0].sectcode);})
				Ext.getCmp("idjobcode").getStore().load()
				Ext.getCmp("idjobcode").store.on("load",function(){Ext.getCmp("idjobcode").setValue(obj.data[0].jobcode);})
				Ext.getCmp("note").setValue(obj.data[0].note);
			}
			,failure			: function(response, opts) {
				Ext.Msg.alert("สถานะ", response.statusText);
			}
		});
	}

	function to_date_i(dt){
		if (dt == null){
			return "";
		}
		dt = dt.split("-");
		return dt[2]+"/"+dt[1]+"/"+dt[0];
	}

	function delete_detail_pisposhis(id){
		
		Ext.Msg.confirm('สถานะ', 'ต้องการลบใช่หรือไม่', function(btn, text){			
			if (btn == 'yes')
			{				
				loadMask.show();
				Ext.Ajax.request({
					url			: 'data_pisposhis/delete' , 
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
										detail_pisposhisGridStore.reload();
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



