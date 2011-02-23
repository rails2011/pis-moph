data_personalForm_url = "";
/********************************************************************/
/*											Grid   												*/
/******************************************************************/
    var action_griddata_personal = new Ext.ux.grid.RowActions({
             header					: 'จัดการ'
            ,keepSelection			: true
            ,widthSlope				: 50
            ,actions					:[
                    {iconCls: 'page', tooltip: 'แก้ไข'}
            ]		
    });
    action_griddata_personal.on({
            action:function(grid, record, action, row, col) {
                    if (action == "page"){
							data_personalForm_url = "/data_personal/edit"
							Ext.getCmp("id").setValue(record.data.id);
                            searchEditDataPersonal(record.data.id,record);
							data_personal_change_nameGrid.pis_personel_id = record.data.pis_personel_id;
							data_personal_change_nameGridStore.baseParams = {
								pis_personel_id : record.data.pis_personel_id
							}
							data_personal_change_nameGridStore.load();
							data_personal_north.enable();
                    }		
            }
    });
    var data_personalSearch = new Ext.ux.grid.Search({
            iconCls				: 'search'
            ,minChars			: 3
            ,autoFocus			: true
            ,position				: "top"
            ,width					: 200
    });
    var data_personalFields = [
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
    var data_personalCols = [
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
            ,action_griddata_personal
    ];    
    var data_personalGridStore = new Ext.data.JsonStore({
            url					: "/data_personal/read"
            ,root					: "records"
            ,autoLoad		: false
            ,totalProperty	: 'totalCount'
            ,fields				: data_personalFields
            ,idProperty		: 'chgno'
    });
    var data_personalGrid = new Ext.grid.GridPanel({
            title					: "ข้อมูลส่วนตัว"
            ,region				: 'center'
            ,split				: true
            ,store				: data_personalGridStore
            ,columns			: data_personalCols
            ,stripeRows		: true
            ,loadMask		: {msg:'Loading...'}
            ,sm					: new Ext.grid.RowSelectionModel({singleSelect: true})
            ,plugins			: [data_personalSearch,action_griddata_personal]
            ,bbar				: new Ext.PagingToolbar({
                            pageSize				: 20
                            ,autoWidth			: true
                            ,store					: data_personalGridStore
                            ,displayInfo			: true
                            ,displayMsg	    : 'Displaying {0} - {1} of {2}'
                            ,emptyMsg			: "Not found"
            })
            ,tbar					: [
                    {
                            text						: "เพิ่ม"
                            ,iconCls				: "table-add"
                            ,handler				: function(){
                                    data_personalForm_url = "/data_personal/create"
                                    center_govPanel.getLayout().setActiveItem(data_personal_panel); 
									data_personal_form.getForm().reset();
									data_personal_north.disable();
                            }
                    }                    
            ]
    });
    
/********************************************************************/
/*										Panel  Image										*/
/******************************************************************/
    
    var data_personal_image = new Ext.Panel({
        region					: "west"
        ,title						: "แสดงภาพข้าราชการ"
        ,width					: 200
        
    });
 /********************************************************************/
/*								Grid Change name										*/
/******************************************************************/

    var action_data_personal_change_name = new Ext.ux.grid.RowActions({
             header					: 'จัดการ'
            ,keepSelection			: true
            ,widthSlope				: 50
            ,actions					:[
                    {iconCls: 'table-edit', tooltip: 'แก้ไข'}
            ]		
    });
    action_data_personal_change_name.on({
            action:function(grid, record, action, row, col) {
                    if (action == "table-edit"){
						Ext.Ajax.request({
							url				: '/data_pis_change_names/search_edit'
							,params		: {
								chgno		: record.data.chgno
							}
							,success		: function(response, opts) {
								var obj = Ext.decode(response.responseText);
								if(!form){
									var form = new Ext.FormPanel({ 
										labelWidth			: 100
										,autoScroll			: true
										,url						: '/data_pis_change_names/edit'
										,frame					: true
										,monitorValid		: true
										,labelAlign			: "right"
										,labelWidth			: 80
										,items					:[
											{
												xtype: "datefield"
												,fieldLabel: "<b>วันที่</b>"
												,id: "chgdate"
												,format: "d/m/Y"
												,value: obj.records[0].chgdate.split("-")[2] +'/'+obj.records[0].chgdate.split("-")[1]+'/'+(Number(obj.records[0].chgdate.split("-")[0])+543)
												
											}
											,new Ext.form.ComboBox({
												fieldLabel 	        : '<b>คำนำหน้า</b>'
												,id						: 'idprecode'
												,editable 				: false
												,hiddenName 		:'precode2'
												,store 					: new Ext.data.Store({
													reader				: new Ext.data.JsonReader({
														fields				: ['precode', 'prename']
														,root					: 'records'
													})
													,url					: 'code_prefix/genres' 
												})
												,valueField 			: 'precode'
												,displayField 		: 'prename'
												,typeAhead 	        : true
												,triggerAction 		: 'all'
												,emptyText 	        : 'โปรดเลือก'
												,selectOnFocus 	: true                         
											})	
											,{
												xtype				: "textfield"
												,id					: "fname2"
												,fieldLabel		: "<b>ชื่อ</b>"
												,value				: obj.records[0].fname
											},{
												xtype				: "textfield"
												,id					: "lname2"
												,fieldLabel		: "<b>นามสกุล</b>"
												,value				: obj.records[0].lname
											},{
												xtype				: "textfield"
												,id					: "ref2"
												,fieldLabel		: "<b>เอกสารอ้างอิง</b>"
												,anchor			: "80%"
												,value				: obj.records[0].ref
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
															pis_personel_id: data_personal_change_nameGrid.pis_personel_id
															,chgno: record.data.chgno
														}
														,success		:function(){		
															Ext.Msg.alert("สถานะ","บันทึกเสร็จเรีบยร้อย", function(btn, text){										
																	if (btn == 'ok')
																	{
																		win.close();
																		data_personal_change_nameGridStore.load();
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
										title					: 'เพิ่มรายการเปลี่ยนชื่อ'
										,width				: 500
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
								
								Ext.getCmp("idprecode").getStore().load();
								Ext.getCmp("idprecode").store.on("load",function(){Ext.getCmp("idprecode").setValue(obj.records[0].precode);});
							}
							,failure			: function(response, opts) {
								Ext.Msg.alert("สถานะ", response.statusText);
							}
						});
                    }		
            }
    });

	var data_personal_change_nameFields = [
		{name: "chgno", type: "int"}
		,{name: "longpre", type: "string"}
		,{name: "chgdate", type: "string"}
		,{name: "fname", type: "string"}
		,{name: "lname", type: "string"}
		,{name: "ref", type: "string"}		
	];           

	var data_personal_change_nameCols = [
		{
			header		: "#"
			,width		: 30
			,renderer	: rowNumberer.createDelegate(this)
			,sortable  : false
		}
		,{header: "วันที่", width: 100, sortable: false, dataIndex: "chgdate"}
		,{header: "คำนำหน้า", width: 100, sortable: false, dataIndex: "longpre"}
		,{header: "ชื่อ", width: 100, sortable: false, dataIndex: "fname"}
		,{header: "นามสกุล", width: 100, sortable: false, dataIndex: "lname"}
		,{header: "เอกสารอ้างอิง", width: 100, sortable: false, dataIndex: "ref"}
		,action_data_personal_change_name
	];

	var data_personal_change_nameGridStore = new Ext.data.JsonStore({
		url					: "/data_pis_change_names/read"
		,root					: 'records'
		,autoLoad		: false
		,totalProperty	: 'totalCount'
		,fields				: data_personal_change_nameFields
		,idProperty		: 'id'
	});

	var data_personal_change_nameGrid = new Ext.grid.GridPanel({
		region				: "center"
        ,title					: "ประวัติการเปลี่ยนชื่อ - นามสกุล"
		,store				: data_personal_change_nameGridStore
		,columns			: data_personal_change_nameCols
		,stripeRows		: true
		,loadMask		: {msg:'Loading...'}
		,sm					: new Ext.grid.RowSelectionModel({singleSelect: true})  
		,plugins			: [action_data_personal_change_name]
		,tbar					: [
			{
				text					: "เพิ่ม"
				,handler			: function (){
					if(!form){
						var form = new Ext.FormPanel({ 
							labelWidth			: 100
							,autoScroll			: true
							,url						: '/data_pis_change_names/add'
							,frame					: true
							,monitorValid		: true
							,labelAlign			: "right"
							,labelWidth			: 80
							,items					:[
								{
									xtype: "datefield"
									,fieldLabel: "<b>วันที่</b>"
									,id: "chgdate"
									,format: "d/m/Y"
								}
								,new Ext.form.ComboBox({
									fieldLabel 	        : '<b>คำนำหน้า</b>'
									,id						: 'idprecode'
									,editable 				: false
									,hiddenName 		:'precode2'
									,store 					: new Ext.data.Store({
										reader				: new Ext.data.JsonReader({
											fields				: ['precode', 'prename']
											,root					: 'records'
										})
										,url					: 'code_prefix/genres' 
									})
									,valueField 			: 'precode'
									,displayField 		: 'prename'
									,typeAhead 	        : true
									,triggerAction 		: 'all'
									,emptyText 	        : 'โปรดเลือก'
									,selectOnFocus 	: true                         
								})	
								,{
									xtype				: "textfield"
									,id					: "fname2"
									,fieldLabel		: "<b>ชื่อ</b>"
								},{
									xtype				: "textfield"
									,id					: "lname2"
									,fieldLabel		: "<b>นามสกุล</b>"
								},{
									xtype				: "textfield"
									,id					: "ref2"
									,fieldLabel		: "<b>เอกสารอ้างอิง</b>"
									,anchor			: "80%"
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
												pis_personel_id: data_personal_change_nameGrid.pis_personel_id
											}
											,success		:function(){		
												Ext.Msg.alert("สถานะ","บันทึกเสร็จเรีบยร้อย", function(btn, text){										
														if (btn == 'ok')
														{
															win.close();
															data_personal_change_nameGridStore.load();
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
							title					: 'เพิ่มรายการเปลี่ยนชื่อ'
							,width				: 500
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
			},'-',{
				ref                    : '../removeBtn'
				,text					: 'ลบ'
				,tooltip             : 'ลบ'
				,iconCls           : 'table-delete'
				,disabled			: true
				,handler			: function(){

					Ext.Msg.confirm('สถานะ', 'ต้องการลบใช่หรือไม่', function(btn, text){			
						if (btn == 'yes')
						{				
							loadMask.show();
							Ext.Ajax.request({
								url			: '/data_pis_change_names/delete' , 
								params	: { 
									chgno				: data_personal_change_nameGrid.getSelectionModel().getSelections()[0].data.chgno
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
													data_personal_change_nameGridStore.load();
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
			}
		]
		
	});

	data_personal_change_nameGrid.getSelectionModel().on('selectionchange', function(sm){
		data_personal_change_nameGrid.removeBtn.setDisabled(sm.getCount() < 1);
		
	});        
/********************************************************************/
/*								Panel North													*/
/******************************************************************/    
    var data_personal_north = new Ext.Panel({
        region					: "north"
        ,height					: 200
        ,layout					: "border"
		,disabled				: true
        ,items					: [
            data_personal_image
            ,data_personal_change_nameGrid
        ]
    });
/********************************************************************/
/*								Form															*/
/******************************************************************/    
    var data_personal_form = new Ext.form.FormPanel({
        region					: "center"
		,autoScroll			: true
       // ,title						: "ข้อมูลส่วนตัว"
		,bodyStyle			: "padding:5px"
		,labelAlign			: "right"	
		,frame					: true
		,monitorValid		: true
		,fileUpload			: true
		,defaults				: {
			msgTarget		: "side"
		}
		,items					: [
			{
				xtype			: "hidden"
				,id				: "id"
			},{
				xtype			: "fieldset"
				,layout			: "form"
				,labelWidth	: 150
				,bodyStyle	: "padding:5px"
				,defaults				: {
					msgTarget		: "side"
				}
				,items			: [
					{
						xtype				: "textfield"
						,fieldLabel		: "<b>เลขประจำตัวประชาชน</b>"
						,id					: "pid"
						,width				: 150						
					},{
						layout			: "column"
						,items			: [
							{
								width					: 250
								,labelWidth			: 80
								,layout					: "form"
								,defaults				: {
									msgTarget		: "side"
								}
								,items					: [
									new Ext.form.ComboBox({
										fieldLabel 	        : '<b>คำนำหน้า</b>'
										,anchor				: "95%"
										,id						: 'precodeid'
										,editable 				: false
										,hiddenName 		:'precode'
										,store 					: new Ext.data.Store({
											reader				: new Ext.data.JsonReader({
												fields				: ['precode', 'prename']
												,root					: 'records'
											})
											,url					: 'code_prefix/genres' 
										})
										,valueField 			: 'precode'
										,displayField 		: 'prename'
										,typeAhead 	        : true
										,triggerAction 		: 'all'
										,emptyText 	        : 'โปรดเลือก'
										,selectOnFocus 	: true                         
									})	
								]
							},{
								width					: 190
								,labelWidth			: 20
								,layout					: "form"
								,defaults				: {
									msgTarget		: "side"
								}
								,items					: [
									{
										xtype			: "textfield"
										,anchor		: "95%"
										,id				: "fname"
										,fieldLabel	: "<b>ชื่อ</b>"
									}	
								]
							},{
								width					: 230
								,labelWidth			: 60
								,layout					: "form"
								,defaults				: {
									msgTarget		: "side"
								}
								,items					: [
									{
										xtype			: "textfield"
										,anchor		: "95%"
										,id				: "lname"
										,fieldLabel	: "<b>นามสกุล</b>"
									}	
								]
							}
						]
					},{
						layout			: "column"
						,items			: [
							{
								width				: 350
								,layout				: "form"
								,labelWidth		: 80
								,defaults			: {
									anchor				: "95%"
									,msgTarget		: "side"
								}
								,items				: [	
									{
										xtype: "datefield"
										,fieldLabel: "<b>วันเกิด</b>"
										,id: "birthdate"
										,format: "d/m/Y"
										,listeners: {
												select : function(el,date ){
														SetAgeDataPerson();
												} 
										}
									}
									,new Ext.form.ComboBox({
										fieldLabel 	        : '<b>สถานะภาพ</b>'
										,anchor				: "95%"
										,id						: 'mrcodeid'
										,editable 				: false
										,hiddenName 		:'mrcode'
										,store 					: new Ext.data.Store({
											reader				: new Ext.data.JsonReader({
												fields				: ['mrcode', 'marital']
												,root					: 'records'
											})
											,url					: 'code_marital/genres' 
										})
										,valueField 			: 'mrcode'
										,displayField 		: 'marital'
										,typeAhead 	        : true
										,triggerAction 		: 'all'
										,emptyText 	        : 'โปรดเลือก'
										,selectOnFocus 	: true                     
									})
									,new Ext.form.ComboBox({
										fieldLabel 	        : '<b>ศาสนา</b>'
										,anchor				: "95%"
										,id						: 'relcodeid'
										,editable 				: false
										,hiddenName 		:'relcode'
										,store 					: new Ext.data.Store({
											reader				: new Ext.data.JsonReader({
												fields				: ['relcode', 'relname']
												,root					: 'records'
											})
											,url					: 'code_relig/genres' 
										})
										,valueField 			: 'relcode'
										,displayField 		: 'relname'
										,typeAhead 	        : true
										,triggerAction 		: 'all'
										,emptyText 	        : 'โปรดเลือก'
										,selectOnFocus 	: true           
									})
								]
							},{
								width				: 350
								,layout				: "form"
								,labelWidth		: 80
								,defaults			: {
									anchor				: "95%"
									,msgTarget		: "side"
								}
								,items				: [
									new Ext.BoxComponent({
										id					: "age_data_person"
										,autoEl			: {
											tag		: "div"
											,html	:	"<table style='font:12px tahoma,arial,helvetica,sans-serif'>" +
																"<tr ><td style='width:78px' align='right' height='24px'><b>อายุ:</b></td><td style='padding-left:5px'></td></tr>" + 
															"</table>"
										}
									})
									,{
										xtype			: "textfield"
										,id				: "race"
										,fieldLabel	: "<b>เชื้อชาติ</b>"
									}
									,new Ext.form.ComboBox({
										fieldLabel 	        : '<b>ภูมิลำเนา</b>'
										,anchor				: "95%"
										,id						: 'provcodeid'
										,editable 				: false
										,hiddenName 		:'provcode'
										,store 					: new Ext.data.Store({
											reader				: new Ext.data.JsonReader({
												fields				: ['provcode', 'provname']
												,root					: 'records'
											})
											,url					: 'code_province/genres' 
										})
										,valueField 			: 'provcode'
										,displayField 		: 'provname'
										,typeAhead 	        : true
										,triggerAction 		: 'all'
										,emptyText 	        : 'โปรดเลือก'
										,selectOnFocus 	: true                          
									})
								]
							},{
								width				: 350
								,layout				: "form"
								,labelWidth		: 80
								,defaults			: {
									anchor				: "95%"
									,msgTarget		: "side"
								}
								,items				: [
									new Ext.form.ComboBox({
										editable			: false
										,id					: "sexid"										
										,hiddenName 	: 'sex'
										,fieldLabel		: "<b>เพศ</b>"
										,width				: 100
										,store				: new Ext.data.SimpleStore({
												fields	    : ['id', 'type']
												,data	    : [
																["1", "ชาย"]
																,["2", "หญิง"]                                                                           
															  ] 
										})
										,valueField	    :'id'
										,displayField	:'type'
										,typeAhead	    : true
										,mode				: 'local'
										,triggerAction	: 'all'
										,emptyText	    :'Select ...'
									})
									,{
										xtype			: "textfield"
										,id				: "nationality"
										,fieldLabel	: "<b>สัญชาติ</b>"
									},{
										xtype			: "textfield"
										,id				: "bloodgroup"
										,fieldLabel	: "<b>กรุ๊ปเลือด</b>"
									}
								]
								
							}
						]
					}
				]
			},{
				xtype				: "fieldset"
				,layout				: "form"
				,labelWidth		: 150
				,defaults				: {
					msgTarget		: "side"
				}
				,items				: [
					{
						xtype			: "textfield"
						,id				: "address1"
						,fieldLabel	: "<b>บ้านเลขที่ ซอย ถนน</b>"
						,anchor		: "95%"
					},{
						xtype			: "textfield"
						,id				: "address2"
						,fieldLabel	: "<b>ตำบล อำเภอ จังหวัด</b>"
						,anchor		: "95%"
					},{
						xtype			: "numberfield"
						,id				: "zip"
						,fieldLabel	: "<b>รหัสไปรษณีย์</b>"
					},{
						xtype			: "textfield"
						,id				: "tel"
						,fieldLabel	: "<b>โทรศัพท์</b>"
					},{
						xtype				: "fileuploadfield"
						,id					: 'idpicname'
						,name				: 'picname'										
						,fieldLabel		: "<b>รูปภาพข้าราชการ<b>"
						,anchor			: "50%"
					}
				]
			},
					

		]
		,buttons				:[
			{ 
				text					:'บันทึก'
				,formBind			: true 
				,handler			:function(){ 					
					data_personal_form.getForm().submit(
					{ 
						method		:'POST'
						,url				: data_personalForm_url
						,waitTitle		:'Saving Data'
						,waitMsg		:'Sending data...'
						,success		:function(){		
							Ext.Msg.alert("สถานะ","บันทึกเสร็จเรีบยร้อย", function(btn, text){										
									if (btn == 'ok')
									{
										center_govPanel.getLayout().setActiveItem(data_personalGrid);
										data_personalGridStore.reload();
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
					center_govPanel.getLayout().setActiveItem(data_personalGrid);
					data_personalGridStore.load({ params: { start: 0, limit: 20} });
				}
			}
		]
    }); 
    var data_personal_panel = new Ext.Panel({
        layout					: "border"
		,title						: "&nbsp;"
        ,items					: [
            data_personal_north
            ,data_personal_form
        ]
    });
/********************************************************************/
/*										Function												 */
/********************************************************************/
	function searchEditDataPersonal(id,record){
		Ext.Ajax.request({
			url				: '/data_personal/search_edit'
			,params		: {
				id		: id
			}
			,success		: function(response, opts) {
				data_personal_panel.setTitle("ข้อมูลส่วนตัว ("+record.data.prename+"&nbsp;"+record.data.fname+"&nbsp;&nbsp;&nbsp;"+record.data.lname+ ")");
				center_govPanel.getLayout().setActiveItem(data_personal_panel);
				var obj = Ext.decode(response.responseText).data[0];
				/*picname
				pis_personel_id
				*/
				Ext.getCmp("pid").setValue(obj.pid);
				Ext.getCmp("precodeid").getStore().load();
				Ext.getCmp("precodeid").store.on("load",function(){Ext.getCmp("precodeid").setValue(obj.precode);});
				Ext.getCmp("fname").setValue(obj.fname);
				Ext.getCmp("lname").setValue(obj.lname);
				obj.birthdate = obj.birthdate.replace(obj.birthdate.split("-")[0],(Number(obj.birthdate.split("-")[0]) + 543));
				Ext.getCmp("birthdate").setValue(obj.birthdate);
				Ext.getCmp("sexid").setValue(obj.sex);
				Ext.getCmp("mrcodeid").getStore().load();
				Ext.getCmp("mrcodeid").store.on("load",function(){Ext.getCmp("mrcodeid").setValue(obj.mrcode);});
				Ext.getCmp("race").setValue(obj.race);
				Ext.getCmp("nationality").setValue(obj.nationality);
				Ext.getCmp("address1").setValue(obj.address1);
				Ext.getCmp("address2").setValue(obj.address2);
				Ext.getCmp("tel").setValue(obj.tel);
				Ext.getCmp("bloodgroup").setValue(obj.bloodgroup);
				Ext.getCmp("zip").setValue(obj.zip);
				Ext.getCmp("relcodeid").getStore().load();
				Ext.getCmp("relcodeid").store.on("load",function(){Ext.getCmp("relcodeid").setValue(obj.relcode);});
				Ext.getCmp("provcodeid").getStore().load();
				Ext.getCmp("provcodeid").store.on("load",function(){Ext.getCmp("provcodeid").setValue(obj.provcode);});		
				SetAgeDataPerson();
			}
			,failure			: function(response, opts) {
				Ext.Msg.alert("สถานะ", response.statusText);
			}
		});
	}    

	function SetAgeDataPerson(){
			data = {
				age: ''
			};	
			tmp_date = Ext.getCmp("birthdate").getRawValue();
			tmp_date = tmp_date.replace(tmp_date.split("/")[2],(Number(tmp_date.split("/")[2]) - 543));
			tmp_date = calage(tmp_date);
			data.age = tmp_date[0]+" ปี  " + tmp_date[1] + " เดือน  " + tmp_date[2] + " วัน" ;
			var tpl = new Ext.Template(
											 "<table style='font:12px tahoma,arial,helvetica,sans-serif'>" ,
												"<tr ><td style='width:78px' align='right' height='24px'><b>อายุ:</b></td><td style='padding-left:5px'>{age}</td></tr>" ,
											"</table>"
			);
			tpl.overwrite(Ext.get("age_data_person"), data);
	}