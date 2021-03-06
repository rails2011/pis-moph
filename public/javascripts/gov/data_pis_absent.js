/********************************************************************/
/*											Grid   												*/
/******************************************************************/
    var action_griddata_pis_absent = new Ext.ux.grid.RowActions({
             header					: 'จัดการ'
            ,keepSelection			: true
            ,widthSlope				: 50
            ,actions					:[
                    {iconCls: 'page', tooltip: 'รายละเอียด'}
            ]		
    });

    action_griddata_pis_absent.on({
            action:function(grid, record, action, row, col) {
				if (action == "page"){
					center_govPanel.getLayout().setActiveItem(data_absent_detailGrid);
					data_absent_detailGridStore.removeAll();
					Ext.getCmp("idfiscal").clearValue();
					Ext.getCmp("idfiscal").getStore().baseParams		= {
						pis_personel_id:record.data.pis_personel_id
					}
					Ext.getCmp("idfiscal").getStore().load();						
					Ext.getCmp("idfiscal").getStore().events.load = true;
					Ext.getCmp("idfiscal").store.on("load",function( Store , records, Object  ) {
						Ext.getCmp("idfiscal").setValue( records[records.length - 1].data.year_en );							
						data_absent_detailGridStore.baseParams		= {
							pis_personel_id:record.data.pis_personel_id
							,year_en:records[records.length - 1].data.year_en
						}
						data_absent_detailGridStore.load({ params: { start: 0, limit: 20} });
					});	
					data_absent_detailGrid.pis_personel_id = "";
					data_absent_detailGrid.pis_personel_id = record.data.pis_personel_id;
				}		
            }
    });
    
    var data_pis_absentSearch = new Ext.ux.grid.Search({
            iconCls				: 'search'
            ,minChars			: 3
            ,autoFocus			: true
            ,position				: "top"
            ,width					: 200
    });
    var data_pis_absentFields = [
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
    
    var data_pis_absentCols = [
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
            ,action_griddata_pis_absent
    ];
    
    var data_pis_absentGridStore = new Ext.data.JsonStore({
            url					: "/data_personal/read"
            ,root					: "records"
            ,autoLoad		: false
            ,totalProperty	: 'totalCount'
            ,fields				: data_pis_absentFields
            ,idProperty		: 'id'
    });
    
    var data_pis_absentGrid = new Ext.grid.GridPanel({
            title					: "ประวัติการลา"
            ,region				: 'center'
            ,split				: true
            ,store				: data_pis_absentGridStore
            ,columns			: data_pis_absentCols
            ,stripeRows		: true
            ,loadMask		: {msg:'Loading...'}
            ,sm					: new Ext.grid.RowSelectionModel({singleSelect: true})
            ,plugins			: [data_pis_absentSearch,action_griddata_pis_absent]
            ,bbar				: new Ext.PagingToolbar({
                            pageSize				: 20
                            ,autoWidth			: true
                            ,store					: data_pis_absentGridStore
                            ,displayInfo			: true
                            ,displayMsg	    : 'Displaying {0} - {1} of {2}'
                            ,emptyMsg			: "Not found"
            })
			,tbar					: ["&nbsp;"]
    });
/********************************************************************/
/*							Grid  Detail		  												*/
/******************************************************************/
	summary_data_absent_detail = new Ext.ux.grid.GridSummary();
    var action_griddata_absent_detail = new Ext.ux.grid.RowActions({
             header					: 'จัดการ'
            ,keepSelection			: true
            ,widthSlope				: 50
            ,actions					:[
                    {iconCls: 'table-edit', tooltip: 'แก้ไข'}
            ]		
    });

    action_griddata_absent_detail.on({
            action:function(grid, record, action, row, col) {
                    if (action == "table-edit"){
						Ext.Ajax.request({
							url				: '/data_pis_absent/search_edit'
							,params		: {
								id		: record.data.id
							}
							,success		: function(response, opts) {
								var obj = Ext.decode(response.responseText);

								if(!form){
									var form = new Ext.FormPanel({ 
										labelWidth			: 100
										,autoScroll			: true
										,url						: '/data_pis_absent/edit'
										,frame					: true
										,monitorValid		: true
										,bodyStyle			: "padding:10px"
										,items					:[
											new Ext.form.ComboBox({
												fieldLabel				: '<b>ประเภทการลา</b>'
												,hiddenName			: 'abcode'
												,id							: 'idabcode'
												,store						: new Ext.data.Store({
														reader		: new Ext.data.JsonReader({
															fields	: ['abcode', 'abtype']
															,root		: 'records'
														})
														,url					: 'code_abtype/genres'
												})
												,valueField				: 'abcode'
												,displayField			: 'abtype'
												,typeAhead				: true
												,triggerAction			: 'all'
												,emptyText				: 'Select ...'
												,selectOnFocus		: true													
											}),{
												xtype	: "datefield"
												,id	: "begindate"
												,fieldLabel: "<b>วันลาเริ่มต้น</b>"
												,format: "d/m/Y"
												,value: obj.data[0].begindate.split("-")[2] +'/'+obj.data[0].begindate.split("-")[1]+'/'+(Number(obj.data[0].begindate.split("-")[0])+543)
											},{
												xtype	: "datefield"
												,id	: "enddate"
												,fieldLabel: "<b>วันลาสิ้นสุด</b>"
												,format: "d/m/Y"
												,value: obj.data[0].enddate.split("-")[2] +'/'+obj.data[0].enddate.split("-")[1]+'/'+(Number(obj.data[0].enddate.split("-")[0])+543)
											},{
												xtype				: "numberfield"
												,id					: "amount"
												,fieldLabel		: "<b>จำนวนวัน</b>"
												,value				: obj.data[0].amount
											},{
												xtype				: "checkbox"
												,id					: "flagcount"
												,boxLabel		: "นับครั้ง/ไม่นับครั้ง"
												,hideLabel		: true
												,checked			: (obj.data[0].flagcount == "Y")? true:false
											},{
												xtype				: "hidden"
												,id					: "pis_personel_id"
												,value				: obj.data[0].pis_personel_id
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
																	if (btn == 'ok'){
																		data_absent_detailGridStore.reload();
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
										title					: 'เพิ่ม/แก้ไข การลา'
										,width				: 400
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
								Ext.getCmp("idabcode").getStore().events.load = true;
								Ext.getCmp("idabcode").store.on("load",function( Store , records, Object  ) {
									Ext.getCmp("idabcode").setValue(obj.data[0].abcode);
								});
								Ext.getCmp("idabcode").store.load();
							}
							,failure			: function(response, opts) {
								Ext.Msg.alert("สถานะ", response.statusText);
							}
						});
                    }		
            }
    });

    var data_absent_detailFields = [
        {name: "id", type: "int"}
		,{name: "pis_personel_id", type: "string"}
		,{name: "abtype", type: "string"}
		,{name: "abcode", type: "string"}
		,{name: "begindate", type: "string"}
		,{name: "enddate", type: "string"}
		,{name: "amount", type: "string"}
		,{name: "flagcount", type: "string"}
		
    ];
	
    var data_absent_detailCols = [
			{
                    header			: "#"
                    ,width			: 30
                    ,renderer		: rowNumberer.createDelegate(this)
                    ,sortable		: false
            }		
			,{header: "ประเภทการลา",width: 150, sortable: false, dataIndex: 'abtype'}
			,{header: "เริ่มวันที่",width: 150, sortable: false, dataIndex: 'begindate'}
			,{header: "ถึงวันที่",width: 150, sortable: false, dataIndex: 'enddate'}
			,{
				header: "จำนวนวัน"
				,width: 150
				,sortable: false
				,dataIndex: 'amount'
				,summaryType			: 'sum'
				,summaryRenderer		: function (value, p, record){
					return "รวม "+Ext.util.Format.number(value,'0,000.0')+" วัน";
				}
			}
			,{header: "นับครั้ง/ไม่นับครั้ง",width: 150, sortable: false, dataIndex: 'flagcount'}
            ,action_griddata_absent_detail
    ];
    
    var data_absent_detailGridStore = new Ext.data.JsonStore({
            url					: "/data_pis_absent/read"
            ,root					: "records"
            ,autoLoad		: false
            ,totalProperty	: 'totalCount'
            ,fields				: data_absent_detailFields
            ,idProperty		: 'id'
    });
    
    var data_absent_detailGrid = new Ext.grid.GridPanel({
            title					: "รายละเอียดการลา"
            ,region				: 'center'
            ,split				: true
            ,store				: data_absent_detailGridStore
            ,columns			: data_absent_detailCols
            ,stripeRows		: true
            ,loadMask		: {msg:'Loading...'}
            ,sm					: new Ext.grid.RowSelectionModel({singleSelect: true})
            ,plugins			: [action_griddata_absent_detail,summary_data_absent_detail]
			 ,bbar				: new Ext.PagingToolbar({
                            pageSize				: 20
                            ,autoWidth			: true
                            ,store					: data_absent_detailGridStore
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
										,url						: '/data_pis_absent/add'
										,frame					: true
										,monitorValid		: true
										,bodyStyle			: "padding:10px"
										,items					:[
											new Ext.form.ComboBox({
												fieldLabel				: '<b>ประเภทการลา</b>'
												,hiddenName			: 'abcode'
												,id							: 'idabcode'
												,store						: new Ext.data.Store({
														reader		: new Ext.data.JsonReader({
															fields	: ['abcode', 'abtype']
															,root		: 'records'
														})
														,url					: 'code_abtype/genres'
												})
												,valueField				: 'abcode'
												,displayField			: 'abtype'
												,typeAhead				: true
												,triggerAction			: 'all'
												,emptyText				: 'Select ...'
												,selectOnFocus		: true													
											}),{
												xtype	: "datefield"
												,id	: "begindate"
												,fieldLabel: "<b>วันลาเริ่มต้น</b>"
												,format: "d/m/Y"
											},{
												xtype	: "datefield"
												,id	: "enddate"
												,fieldLabel: "<b>วันลาสิ้นสุด</b>"
												,format: "d/m/Y"
											},{
												xtype				: "numberfield"
												,id					: "amount"
												,fieldLabel		: "<b>จำนวนวัน</b>"
											},{
												xtype				: "checkbox"
												,id					: "flagcount"
												,boxLabel		: "นับครั้ง/ไม่นับครั้ง"
												,hideLabel		: true
											},{
												xtype				: "hidden"
												,id					: "pis_personel_id"
												,value				: data_absent_detailGrid.pis_personel_id
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
																		data_absent_detailGridStore.reload();
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
										title					: 'เพิ่ม/แก้ไข การลา'
										,width				: 400
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
									url			: '/data_pis_absent/delete' , 
									params	: { 
										id						: data_absent_detailGrid.getSelectionModel().getSelections()[0].data.id
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
														data_absent_detailGridStore.reload();
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
						center_govPanel.getLayout().setActiveItem(data_pis_absentGrid); 
						data_pis_absentGridStore.load({ params: { start: 0, limit: 20} });
					}
				},"->"
				,"<b>ปีงบประมาณ:</b>"
				,new Ext.form.ComboBox({
					fieldLabel				: '<b>ประเภทการลา</b>'
					,hiddenName			: 'fiscal'
					,id							: 'idfiscal'
					,store						: new Ext.data.Store({
							reader		: new Ext.data.JsonReader({
								fields	: ['year_en', 'year_th']
								,root		: 'records'
							})
							,url					: '/data_pis_absent/genre_year_fiscal'
					})
					,valueField				: 'year_en'
					,displayField			: 'year_th'
					,typeAhead				: true
					,triggerAction			: 'all'
					,emptyText				: 'Select ...'
					,selectOnFocus		: true			
					,listeners					: {
						select : function(combo,record,index ){
							data_absent_detailGridStore.baseParams		= {
								pis_personel_id:data_absent_detailGrid.pis_personel_id
								,year_en:record.data.year_en
							}
							data_absent_detailGridStore.load({ params: { start: 0, limit: 20} });
						} 
					}
				})
			]
    });

	data_absent_detailGrid.getSelectionModel().on('selectionchange', function(sm){
			data_absent_detailGrid.removeBtn.setDisabled(sm.getCount() < 1);       
	});