/********************************************************************/
/*											Grid   												*/
/******************************************************************/
    var action_griddata_pis_punish = new Ext.ux.grid.RowActions({
             header					: 'จัดการ'
            ,keepSelection			: true
            ,widthSlope				: 50
            ,actions					:[
                    {iconCls: 'page', tooltip: 'รายละเอียด'}
            ]		
    });

    action_griddata_pis_punish.on({
            action:function(grid, record, action, row, col) {
                    if (action == "page"){
						center_govPanel.getLayout().setActiveItem(data_punish_detailGrid);
						data_punish_detailGridStore.baseParams		= {
							pis_personel_id:record.data.pis_personel_id
						}
						data_punish_detailGridStore.load({ params: { start: 0, limit: 20} }); 		
						data_punish_detailGrid.pis_personel_id = "";
						data_punish_detailGrid.pis_personel_id = record.data.pis_personel_id;
                    }		
            }
    });
    
    var data_pis_punishSearch = new Ext.ux.grid.Search({
            iconCls				: 'search'
            ,minChars			: 3
            ,autoFocus			: true
            ,position				: "top"
            ,width					: 200
    });
    var data_pis_punishFields = [
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
    
    var data_pis_punishCols = [
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
            ,action_griddata_pis_punish
    ];
    
    var data_pis_punishGridStore = new Ext.data.JsonStore({
            url					: "/data_personal/read"
            ,root					: "records"
            ,autoLoad		: false
            ,totalProperty	: 'totalCount'
            ,fields				: data_pis_punishFields
            ,idProperty		: 'id'
    });
    
    var data_pis_punishGrid = new Ext.grid.GridPanel({
            title					: "โทษทางวินัย"
            ,region				: 'center'
            ,split				: true
            ,store				: data_pis_punishGridStore
            ,columns			: data_pis_punishCols
            ,stripeRows		: true
            ,loadMask		: {msg:'Loading...'}
            ,sm					: new Ext.grid.RowSelectionModel({singleSelect: true})
            ,plugins			: [data_pis_punishSearch,action_griddata_pis_punish]
            ,bbar				: new Ext.PagingToolbar({
                            pageSize				: 20
                            ,autoWidth			: true
                            ,store					: data_pis_punishGridStore
                            ,displayInfo			: true
                            ,displayMsg	    : 'Displaying {0} - {1} of {2}'
                            ,emptyMsg			: "Not found"
            })
			,tbar					: ["&nbsp;"]
    });
/********************************************************************/
/*							Grid  Detail		  												*/
/******************************************************************/
    var action_griddata_punish_detail = new Ext.ux.grid.RowActions({
             header					: 'จัดการ'
            ,keepSelection			: true
            ,widthSlope				: 50
            ,actions					:[
                    {iconCls: 'table-edit', tooltip: 'แก้ไข'}
            ]		
    });

    action_griddata_punish_detail.on({
            action:function(grid, record, action, row, col) {
                    if (action == "table-edit"){
						Ext.Ajax.request({
							url				: '/data_pis_punish/search_edit'
							,params		: {
								id		: record.data.id
							}
							,success		: function(response, opts) {
								var obj = Ext.decode(response.responseText);
								if(!form){
									var form = new Ext.FormPanel({ 
										labelWidth			: 100
										,autoScroll			: true
										,url						: '/data_pis_punish/edit'
										,frame					: true
										,monitorValid		: true
										,bodyStyle			: "padding:10px"
										,items					:[
											new Ext.form.ComboBox({
												fieldLabel				: '<b>โทษที่ได้รับ</b>'
												,hiddenName			: 'puncode'
												,id							: 'idpuncode'
												,store						: new Ext.data.Store({
														reader		: new Ext.data.JsonReader({
															fields	: ['puncode', 'punname']
															,root		: 'records'
														})
														,url					: 'code_punish/genres'
												})
												,valueField				: 'puncode'
												,displayField			: 'punname'
												,typeAhead				: true
												,triggerAction			: 'all'
												,emptyText				: 'Select ...'
												,selectOnFocus		: true													
											})
											,{
												xtype			: "datefield"
												,id				: "forcedate"
												,fieldLabel	: "<b>วันที่</b>"
												,format			: "d/m/Y"
												,value			: obj.data[0].forcedate
											},{
												xtype			: "textfield"
												,id				: "description"
												,fieldLabel	: "<b>รายละเอียด</b>"
												,anchor		: "100%"
												,value			:  obj.data[0].description
											},{
												xtype			: "textfield"
												,id				: "cmdno"
												,fieldLabel	: "<b>เอกสารอ้างอิง</b>"
												,anchor		: "100%"
												,value			: obj.data[0].cmdno
											},{
												xtype				: "hidden"
												,id					: "pis_personel_id"
												,value				: data_punish_detailGrid.pis_personel_id
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
																		data_punish_detailGridStore.reload();
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
										title					: 'เพิ่ม/แก้ไข โทษทางวินัย'
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

								Ext.getCmp("idpuncode").getStore().events.load = true;
								Ext.getCmp("idpuncode").store.on("load",function( Store , records, Object  ) {
									Ext.getCmp("idpuncode").setValue(obj.data[0].puncode);
								});
								Ext.getCmp("idpuncode").store.load();



							}
							,failure			: function(response, opts) {
								Ext.Msg.alert("สถานะ", response.statusText);
							}
						});
                    }		
            }
    });

    var data_punish_detailFields = [
        {name: "id", type: "int"}
		,{name: "pis_personel_id", type: "string"}
		,{name: "forcedate", type: "string"}
		,{name: "puncode", type: "string"}
		,{name: "punname", type: "string"}
		,{name: "description", type: "string"}
		,{name: "cmdno", type: "string"}
    ];
	
    var data_punish_detailCols = [
			{
                    header			: "#"
                    ,width			: 30
                    ,renderer		: rowNumberer.createDelegate(this)
                    ,sortable		: false
            }		
			,{header: "วันที่",width: 150, sortable: false, dataIndex: 'forcedate'}
			,{header: "โทษที่ได้รับ/กรณี",width: 150, sortable: false, dataIndex: 'punname'}
            ,action_griddata_punish_detail
    ];
    
    var data_punish_detailGridStore = new Ext.data.JsonStore({
            url					: "/data_pis_punish/read"
            ,root					: "records"
            ,autoLoad		: false
            ,totalProperty	: 'totalCount'
            ,fields				: data_punish_detailFields
            ,idProperty		: 'id'
    });
    
    var data_punish_detailGrid = new Ext.grid.GridPanel({
            title					: "รายละเอียดโทษทางวินัย"
            ,region				: 'center'
            ,split				: true
            ,store				: data_punish_detailGridStore
            ,columns			: data_punish_detailCols
            ,stripeRows		: true
            ,loadMask		: {msg:'Loading...'}
            ,sm					: new Ext.grid.RowSelectionModel({singleSelect: true})
            ,plugins			: [action_griddata_punish_detail]
			 ,bbar				: new Ext.PagingToolbar({
                            pageSize				: 20
                            ,autoWidth			: true
                            ,store					: data_punish_detailGridStore
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
										,url						: '/data_pis_punish/add'
										,frame					: true
										,monitorValid		: true
										,bodyStyle			: "padding:10px"
										,items					:[
											new Ext.form.ComboBox({
												fieldLabel				: '<b>โทษที่ได้รับ</b>'
												,hiddenName			: 'puncode'
												,id							: 'idpuncode'
												,store						: new Ext.data.Store({
														reader		: new Ext.data.JsonReader({
															fields	: ['puncode', 'punname']
															,root		: 'records'
														})
														,url					: 'code_punish/genres'
												})
												,valueField				: 'puncode'
												,displayField			: 'punname'
												,typeAhead				: true
												,triggerAction			: 'all'
												,emptyText				: 'Select ...'
												,selectOnFocus		: true													
											})
											,{
												xtype			: "datefield"
												,id				: "forcedate"
												,fieldLabel	: "<b>วันที่</b>"
												,format			: "d/m/Y"
											},{
												xtype			: "textfield"
												,id				: "description"
												,fieldLabel	: "<b>รายละเอียด</b>"
												,anchor		: "100%"
											},{
												xtype			: "textfield"
												,id				: "cmdno"
												,fieldLabel	: "<b>เอกสารอ้างอิง</b>"
												,anchor		: "100%"
											},{
												xtype				: "hidden"
												,id					: "pis_personel_id"
												,value				: data_punish_detailGrid.pis_personel_id
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
																		data_punish_detailGridStore.reload();
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
										title					: 'เพิ่ม/แก้ไข โทษทางวินัย'
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
									url			: '/data_pis_punish/delete' , 
									params	: { 
										id						: data_punish_detailGrid.getSelectionModel().getSelections()[0].data.id
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
														data_punish_detailGridStore.reload();
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
						center_govPanel.getLayout().setActiveItem(data_pis_punishGrid); 
					}
				}
			]
    });

	data_punish_detailGrid.getSelectionModel().on('selectionchange', function(sm){
			data_punish_detailGrid.removeBtn.setDisabled(sm.getCount() < 1);       
	});
