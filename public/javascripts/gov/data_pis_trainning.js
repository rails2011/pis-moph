/********************************************************************/
/*											Grid   												*/
/******************************************************************/
    var action_griddata_pis_trainning = new Ext.ux.grid.RowActions({
             header					: 'จัดการ'
            ,keepSelection			: true
            ,widthSlope				: 50
            ,actions					:[
                    {iconCls: 'page', tooltip: 'รายละเอียด'}
            ]		
    });

    action_griddata_pis_trainning.on({
            action:function(grid, record, action, row, col) {
                    if (action == "page"){
						center_govPanel.getLayout().setActiveItem(data_trainning_detailGrid);
						data_trainning_detailGridStore.baseParams		= {
							pis_personel_id:record.data.pis_personel_id
						}
						data_trainning_detailGridStore.load({ params: { start: 0, limit: 20} }); 		
						data_trainning_detailGrid.pis_personel_id = "";
						data_trainning_detailGrid.pis_personel_id = record.data.pis_personel_id;
                    }		
            }
    });
    
    var data_pis_trainningSearch = new Ext.ux.grid.Search({
            iconCls				: 'search'
            ,minChars			: 3
            ,autoFocus			: true
            ,position				: "top"
            ,width					: 200
    });
    var data_pis_trainningFields = [
        {name: "id", type: "int"}
        ,{name: "precode", type: "string"}
        ,{name: "fname", type: "string"}
        ,{name: "lname", type: "string"}
        ,{name: "birthdate", type: "string"}
        ,{name: "sex", type: "string"}
        ,{name: "mrcode", type: "string"}
        ,{name: "race", type: "string"}
        ,{name: "nationality", type: "string"}
        ,{name: "relcode", type: "string"}
        ,{name: "address1", type: "string"}
        ,{name: "address2", type: "string"}
        ,{name: "tel", type: "string"}
        ,{name: "picname", type: "string"}
        ,{name: "pis_personel_id", type: "string"}
        ,{name: "bloodgroup", type: "string"}
        ,{name: "provcode", type: "string"}
        ,{name: "picname", type: "string"}
        ,{name: "prename", type: "string"}
        ,{name: "marital", type: "string"}
        ,{name: "relname", type: "string"}
        ,{name: "shortpre", type: "string"}
        ,{name: "provname", type: "string"}
		,{name: "pid",type: "string"}
        
    ];
    
    var data_pis_trainningCols = [
            {
                    header			: "#"
                    ,width			: 30
                    ,renderer		: rowNumberer.createDelegate(this)
                    ,sortable		: false
            }		
            ,{header: "คำนำหน้า",width: 70, sortable: false, dataIndex: 'prename'}
            ,{header: "ชื่อ",width: 100, sortable: false, dataIndex: 'fname'}
            ,{header: "นามสกุล",width: 100, sortable: false, dataIndex: 'lname'}
			,{header: "เลขบัตรประชาชน",width: 100, sortable: false, dataIndex: 'pid'}
            ,{header: "วันเกิด",width: 100, sortable: false, dataIndex: 'birthdate'}
            ,{header: "เพศ",width: 100, sortable: false, dataIndex: 'sex',renderer:function(val, x, store){
                    if (val == 1){
                        return "ชาย";
                    }
                    else if (val == 2){
                        return "หญิง";
                    }
                }
            }
            ,{header: "เบอร์โทรศัพท์",width: 100, sortable: false, dataIndex: 'tel'}
            ,action_griddata_pis_trainning
    ];
    
    var data_pis_trainningGridStore = new Ext.data.JsonStore({
            url					: "/data_personal/read"
            ,root					: "records"
            ,autoLoad		: false
            ,totalProperty	: 'totalCount'
            ,fields				: data_pis_trainningFields
            ,idProperty		: 'id'
    });
    
    var data_pis_trainningGrid = new Ext.grid.GridPanel({
            title					: "การประชุม/อบรม"
            ,region				: 'center'
            ,split				: true
            ,store				: data_pis_trainningGridStore
            ,columns			: data_pis_trainningCols
            ,stripeRows		: true
            ,loadMask		: {msg:'Loading...'}
            ,sm					: new Ext.grid.RowSelectionModel({singleSelect: true})
            ,plugins			: [data_pis_trainningSearch,action_griddata_pis_trainning]
            ,bbar				: new Ext.PagingToolbar({
                            pageSize				: 20
                            ,autoWidth			: true
                            ,store					: data_pis_trainningGridStore
                            ,displayInfo			: true
                            ,displayMsg	    : 'Displaying {0} - {1} of {2}'
                            ,emptyMsg			: "Not found"
            })
			,tbar					: ["&nbsp;"]
    });
/********************************************************************/
/*							Grid  Detail		  												*/
/******************************************************************/
    var action_griddata_trainning_detail = new Ext.ux.grid.RowActions({
             header					: 'จัดการ'
            ,keepSelection			: true
            ,widthSlope				: 50
            ,actions					:[
                    {iconCls: 'table-edit', tooltip: 'แก้ไข'}
            ]		
    });

    action_griddata_trainning_detail.on({
		action:function(grid, record, action, row, col) {
			if (action == "table-edit"){
				Ext.Ajax.request({
					url				: '/data_pis_trainning/search_edit'
					,params		: {
						id		: record.data.id
					}
					,success		: function(response, opts) {
						var obj = Ext.decode(response.responseText);
						if(!form){
							var form = new Ext.FormPanel({ 
								labelWidth			: 100
								,autoScroll			: true
								,url						: '/data_pis_trainning/edit'
								,frame					: true
								,monitorValid		: true
								,bodyStyle			: "padding:10px"
								,items					:[
									{
										xtype			: "textfield"
										,id				: "cource"
										,fieldLabel	: "<b>หลักสูตร</b>"
										,anchor		: "100%"
										,value			: obj.data[0].cource
									},{
										xtype: "datefield"
										,id	: "begindate"
										,fieldLabel: "<b>ตั้งแต่วันที่</b>"
										,format: "d/m/Y"		
										,value: obj.data[0].begindate.split("-")[2] +'/'+obj.data[0].begindate.split("-")[1]+'/'+(Number(obj.data[0].begindate.split("-")[0])+543)
									},{
										xtype	: "datefield"
										,id	: "enddate"
										,fieldLabel: "<b>ถึงวันที่</b>"
										,format: "d/m/Y"		
										,value: obj.data[0].enddate.split("-")[2] +'/'+obj.data[0].enddate.split("-")[1]+'/'+(Number(obj.data[0].enddate.split("-")[0])+543)
									},{
										xtype			: "textfield"
										,id				: "institute"
										,fieldLabel	: "<b>สถาบัน</b>"
										,anchor		: "100%"
										,value			: obj.data[0].institute
									}
									,new Ext.form.ComboBox({
										fieldLabel				: '<b>ประเทศ</b>'
										,hiddenName			: 'cocode'
										,id							: 'idcocode'
										,store						: new Ext.data.Store({
												reader		: new Ext.data.JsonReader({
													fields	: ['cocode', 'coname']
													,root		: 'records'
												})
												,url					: 'code_country/genres'
										})
										,valueField				: 'cocode'
										,displayField			: 'coname'
										,typeAhead				: true
										,triggerAction			: 'all'
										,emptyText				: 'Select ...'
										,selectOnFocus		: true													
									}),{
										xtype				: "hidden"
										,id					: "pis_personel_id"
										,value				: data_trainning_detailGrid.pis_personel_id
									}
								]
								,buttons				:[
									{ 
										text					:'บันทึก'
										,formBind			: true 
										,handler			:function(){ 					
											form.getForm().submit(
											{ 
												method		:'POST'
												,waitTitle		:'Saving Data'
												,waitMsg		:'Sending data...'
												,params		: {
													id		: record.data.id
												}
												,success		:function(){		
													Ext.Msg.alert("สถานะ","บันทึกเสร็จเรีบยร้อย", function(btn, text){										
															if (btn == 'ok')
															{
																data_trainning_detailGridStore.reload();
																win.close();											
															}	
														}
													);
																						
												}
												,failure:function(form, action){ 
													if(action.failureType == 'server'){ 
														obj = Ext.util.JSON.decode(action.response.responseText); 
														Ext.Msg.alert('สถานะ', obj.errors.reason); 
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
											win.close();
										}
									}
								] 
							});
						}//end if form
						if(!win){
							var win = new Ext.Window({
								title					: 'เพิ่ม/แก้ไข การประชุม/อบรม'
								,width				: 600
								,height				: 300
								,closable			: true
								,resizable		: false
								,plain				: true
								,border				: false
								,draggable 		: true 
								,modal				: true
								,layout				: "fit"
								,items				: [form]
							});
						}
						win.show();
						win.center();

						Ext.getCmp("idcocode").getStore().events.load = true;
						Ext.getCmp("idcocode").store.on("load",function( Store , records, Object  ) {
							Ext.getCmp("idcocode").setValue(obj.data[0].cocode);
						});
						Ext.getCmp("idcocode").store.load();














					}
					,failure			: function(response, opts) {
						Ext.Msg.alert("สถานะ", response.statusText);
					}
				});
			}		
		}
    });

    var data_trainning_detailFields = [
        {name: "id", type: "int"}
		,{name: "tno", type: "int"}
		,{name: "begindate", type: "string"}
		,{name: "pis_personel_id", type: "string"}
		,{name: "cocode", type: "string"}
		,{name: "coname", type: "string"}
		,{name: "enddate", type: "string"}
		,{name: "cource", type: "string"}
		,{name: "institute", type: "string"}		
    ];
	
    var data_trainning_detailCols = [
			{
                    header			: "#"
                    ,width			: 30
                    ,renderer		: rowNumberer.createDelegate(this)
                    ,sortable		: false
            }		
			,{header: "ครั้งที่",width: 150, sortable: false, dataIndex: 'tno'}
			,{header: "ตั้งแต่วันที่",width: 150, sortable: false, dataIndex: 'begindate'}
			,{header: "ถึงวันที่",width: 150, sortable: false, dataIndex: 'enddate'}
			,{header: "หลักสูตร",width: 150, sortable: false, dataIndex: 'cource'}
			,{header: "สถาบัน",width: 150, sortable: false, dataIndex: 'institute'}
			,{header: "ประเทศ",width: 150, sortable: false, dataIndex: 'coname'}
            ,action_griddata_trainning_detail
    ];
    
    var data_trainning_detailGridStore = new Ext.data.JsonStore({
            url					: "/data_pis_trainning/read"
            ,root					: "records"
            ,autoLoad		: false
            ,totalProperty	: 'totalCount'
            ,fields				: data_trainning_detailFields
            ,idProperty		: 'id'
    });
    
    var data_trainning_detailGrid = new Ext.grid.GridPanel({
            title					: "รายละเอียด การประชุม/อบรม"
            ,region				: 'center'
            ,split				: true
            ,store				: data_trainning_detailGridStore
            ,columns			: data_trainning_detailCols
            ,stripeRows		: true
            ,loadMask		: {msg:'Loading...'}
            ,sm					: new Ext.grid.RowSelectionModel({singleSelect: true})
            ,plugins			: [action_griddata_trainning_detail]
			 ,bbar				: new Ext.PagingToolbar({
                            pageSize				: 20
                            ,autoWidth			: true
                            ,store					: data_trainning_detailGridStore
                            ,displayInfo			: true
                            ,displayMsg	    : 'Displaying {0} - {1} of {2}'
                            ,emptyMsg			: "Not found"
            })
			,tbar					: [
				{
					text					: "	เพิ่ม"
					,iconCls			: "table-add"
					,handler			: function (){
								if(!form){
									var form = new Ext.FormPanel({ 
										labelWidth			: 100
										,autoScroll			: true
										,url						: '/data_pis_trainning/add'
										,frame					: true
										,monitorValid		: true
										,bodyStyle			: "padding:10px"
										,items					:[
											{
												xtype			: "textfield"
												,id				: "cource"
												,fieldLabel	: "<b>หลักสูตร</b>"
												,anchor		: "100%"
											},{
												xtype			: "datefield"
												,id				: "begindate"
												,fieldLabel	: "<b>ตั้งแต่วันที่</b>"
												,format			: "d/m/Y"												
											},{
												xtype			: "datefield"
												,id				: "enddate"
												,fieldLabel	: "<b>ถึงวันที่</b>"
												,format			: "d/m/Y"												
											},{
												xtype			: "textfield"
												,id				: "institute"
												,fieldLabel	: "<b>สถาบัน</b>"
												,anchor		: "100%"
											}
											,new Ext.form.ComboBox({
												fieldLabel				: '<b>ประเทศ</b>'
												,hiddenName			: 'cocode'
												,id							: 'idcocode'
												,store						: new Ext.data.Store({
														reader		: new Ext.data.JsonReader({
															fields	: ['cocode', 'coname']
															,root		: 'records'
														})
														,url					: 'code_country/genres'
												})
												,valueField				: 'cocode'
												,displayField			: 'coname'
												,typeAhead				: true
												,triggerAction			: 'all'
												,emptyText				: 'Select ...'
												,selectOnFocus		: true													
											}),{
												xtype				: "hidden"
												,id					: "pis_personel_id"
												,value				: data_trainning_detailGrid.pis_personel_id
											}
										]
										,buttons				:[
											{ 
												text					:'บันทึก'
												,formBind			: true 
												,handler			:function(){ 					
													form.getForm().submit(
													{ 
														method		:'POST'
														,waitTitle		:'Saving Data'
														,waitMsg		:'Sending data...'
														,success		:function(){		
															Ext.Msg.alert("สถานะ","บันทึกเสร็จเรีบยร้อย", function(btn, text){										
																	if (btn == 'ok')
																	{
																		data_trainning_detailGridStore.reload();
																		win.close();											
																	}	
																}
															);
																								
														}
														,failure:function(form, action){ 
															if(action.failureType == 'server'){ 
																obj = Ext.util.JSON.decode(action.response.responseText); 
																Ext.Msg.alert('สถานะ', obj.errors.reason); 
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
													win.close();
												}
											}
										] 
									});
								}//end if form
								if(!win){
									var win = new Ext.Window({
										title					: 'เพิ่ม/แก้ไข การประชุม/อบรม'
										,width				: 600
										,height				: 300
										,closable			: true
										,resizable		: false
										,plain				: true
										,border				: false
										,draggable 		: true 
										,modal				: true
										,layout				: "fit"
										,items				: [form]
									});
								}
								win.show();
								win.center();
					}
				},"-",{
					ref                    : '../removeBtn'
					,text					: 'ลบ'
					,tooltip             : 'ลบ'
					,iconCls           : 'table-delete'
					,disabled			: true
					,handler			: function(){
						Ext.Msg.confirm('สถานะ', 'ต้องการลบใช่หรือไม่', function(btn, text){			
							if (btn == 'yes'){				
								loadMask.show();
								Ext.Ajax.request({
									url			: '/data_pis_trainning/delete' , 
									params	: { 
										id						: data_trainning_detailGrid.getSelectionModel().getSelections()[0].data.id
										,random			: Math.random()
									},	
									failure		: function ( result, request) { 
										loadMask.hide();
										Ext.MessageBox.alert('สถานะ', "Error : "+result.responseText); 
									},
									success: function ( result, request ) { 
										loadMask.hide();
										var obj = Ext.util.JSON.decode(result.responseText); 
										if (obj.success == false){
											Ext.MessageBox.alert('สถานะ', 'ไม่สามารถลบได้ <br> Error: ' + obj.errors.reason); 
										}
										else if (obj.success == true){
											Ext.MessageBox.alert('สถานะ', 'ลบเสร็จเรียบร้อย',function(btn, text){
													if (btn == 'ok'){
														data_trainning_detailGridStore.reload();
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
				},"-",{
					text					: "ปิด"
					,iconCls			: "delete"
					,handler			: function	(){
						center_govPanel.getLayout().setActiveItem(data_pis_trainningGrid); 
					}
				}
			]
    });

	data_trainning_detailGrid.getSelectionModel().on('selectionchange', function(sm){
			data_trainning_detailGrid.removeBtn.setDisabled(sm.getCount() < 1);       
	});
