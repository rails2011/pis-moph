/********************************************************************/
/*											Grid   												*/
/******************************************************************/
    var action_gridperform_person = new Ext.ux.grid.RowActions({
             header					: 'จัดการ'
            ,keepSelection			: true
            ,widthSlope				: 50
            ,actions					:[
                    {iconCls: 'page', tooltip: 'แก้ไข'}
            ]		
    });

    action_gridperform_person.on({
            action:function(grid, record, action, row, col) {
                    if (action == "page"){
							perform_person_now_form.getForm().reset();
                            searchEditPerformPersonNow(record.data.id);
                    }		
            }
    });
    
    var perform_personSearch = new Ext.ux.grid.Search({
            iconCls				: 'search'
            ,minChars			: 3
            ,autoFocus			: true
            ,position				: "top"
            ,width					: 200
    });
    var perform_personFields = [
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
    
    var perform_personCols = [
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
            ,action_gridperform_person
    ];
    
    var perform_personGridStore = new Ext.data.JsonStore({
            url					: "/data_personal/read"
            ,root					: "records"
            ,autoLoad		: false
            ,totalProperty	: 'totalCount'
            ,fields				: perform_personFields
            ,idProperty		: 'id'
    });
    
    var perform_personGrid = new Ext.grid.GridPanel({
            title					: "ปฏิบัติราชการปัจจุบัน"
            ,region				: 'center'
            ,split				: true
            ,store				: perform_personGridStore
            ,columns			: perform_personCols
            ,stripeRows		: true
            ,loadMask		: {msg:'Loading...'}
            ,sm					: new Ext.grid.RowSelectionModel({singleSelect: true})
            ,plugins			: [perform_personSearch,action_gridperform_person]
            ,bbar				: new Ext.PagingToolbar({
                            pageSize				: 20
                            ,autoWidth			: true
                            ,store					: perform_personGridStore
                            ,displayInfo			: true
                            ,displayMsg	    : 'Displaying {0} - {1} of {2}'
                            ,emptyMsg			: "Not found"
            })
            ,tbar					: []
    });
    

/********************************************************************/
/*											Form   												*/
/******************************************************************/

	var sdname_perform_person_nowtrigger = new Ext.form.TriggerField({
			fieldLabel			: "<b>หน่วยงาน</b>"
			,triggerClass		: "trigger"
			,anchor				: "90%"
			,id						: "sdname"
			,readOnly				: true
			,onTriggerClick	: function(){
				searchsdname(sdname_perform_person_nowtrigger,Ext.getCmp("sdcode"));
			}
	});

	perform_person_now_form = new Ext.form.FormPanel({
		title					: "ปฏิบัติราชการปัจจุบัน"
		,frame				: true
		,bodyStyle		: "padding:20px"
		,monitorValid	: true
		,labelAlign		: "right"
		,autoScroll		: true
		,items				: [
			{
				layout      : "column"
				,items      : [
					{
						columnWidth     : .5
						,layout         : "form"
						,items          : [
							new Ext.form.ComboBox({
								fieldLabel 	        : '<b>ปฏิบัติงานจริง</b>'
								,anchor				: "100%"
								,id						: 'j18codeid'
								,editable 				: false
								,hiddenName 		:'j18code'
								,store 					: new Ext.data.Store({
									reader				: new Ext.data.JsonReader({
										fields				: ['j18code', 'j18status']
										,root					: 'records'
									})
									,url					: 'code_j18status/genres' 
								})
								,valueField 			: 'j18code'
								,displayField 		: 'j18status'
								,typeAhead 	        : true
								,triggerAction 		: 'all'
								,emptyText 	        : 'โปรดเลือก'
								,selectOnFocus 	: true                         
							})
						]
					},
					{
						columnWidth     : .5
						,layout         : "form"
						,labelWidth     : 120
						,items          : [
							new Ext.form.ComboBox({
								fieldLabel 	        : '<b>รักษาการในตำแหน่ง</b>'
								,anchor		: "100%"
								,id                 : 'a2'
								,editable 		: false
								,hiddenName 	:'a22'
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
			}
			,{
				xtype       : "fieldset"
				,title      : "หน่วยงานปฏิบัติงานจริง"
				,anchor     : "100%"
				,items      : [
					{
						layout      : "column"
						,items      : [
							{
								columnWidth     : .5
								,layout         : "form"
								,items          : [
									new Ext.form.ComboBox({
										fieldLabel 	        : '<b>กระทรวง</b>'
										,anchor				: "100%"
										,id						: 'mincodeid'
										,editable 				: false
										,hiddenName 		:'mincode'
										,store 					: new Ext.data.Store({
											reader				: new Ext.data.JsonReader({
												fields				: ['mincode', 'minname']
												,root					: 'records'
											})
											,url					: 'code_minis/genres' 
										})
										,valueField 			: 'mincode'
										,displayField 		: 'minname'
										,typeAhead 	        : true
										,triggerAction 		: 'all'
										,emptyText 	        : 'โปรดเลือก'
										,selectOnFocus 	: true                        
									})
								]
							}
						]
						
					}
					,{
						layout      : "column"
						,items      : [
							{
								columnWidth     : .5
								,layout         : "form"
								,items          : [
									new Ext.form.ComboBox({
										fieldLabel 	        : '<b>กรม</b>'
										,anchor				: "100%"
										,id						: 'deptcodeid'
										,editable 				: false
										,hiddenName 		:'deptcode'
										,store 					: new Ext.data.Store({
											reader				: new Ext.data.JsonReader({
												fields				: ['deptcode', 'deptname']
												,root					: 'records'
											})
											,url					: 'code_dept/genres' 
										})
										,valueField 			: 'deptcode'
										,displayField 		: 'deptname'
										,typeAhead 	        : true
										,triggerAction 		: 'all'
										,emptyText 	        : 'โปรดเลือก'
										,selectOnFocus 	: true                           
									})
								]
							}
							,{
								columnWidth     : .5
								,layout         : "form"
								,items          : [
									new Ext.form.ComboBox({
										fieldLabel 	        : '<b>กอง</b>'
										,anchor				: "100%"
										,id						: 'divcodeid'
										,editable 				: false
										,hiddenName 		:'divcode'
										,store 					: new Ext.data.Store({
											reader				: new Ext.data.JsonReader({
												fields				: ['divcode', 'divname']
												,root					: 'records'
											})
											,url					: 'code_div/genres' 
										})
										,valueField 			: 'divcode'
										,displayField 		: 'divname'
										,typeAhead 	        : true
										,triggerAction 		: 'all'
										,emptyText 	        : 'โปรดเลือก'
										,selectOnFocus 	: true                           
									})
								]
							}
						]
						
					}
					,sdname_perform_person_nowtrigger
					,{
						xtype			: "hidden"
						,id				: "sdcode"
					}
					,{
						layout      : "column"
						,items      : [
							{
								columnWidth     : .5
								,layout         : "form"
								,items          : [
									new Ext.form.ComboBox({
										fieldLabel 	        : '<b>กลุ่ม</b>'
										,anchor				: "100%"
										,id						: 'subdcodeid'
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
										,anchor				: "100%"
										,id						: 'jobcodeid'
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
							}
							,{
								columnWidth     : .5
								,layout         : "form"
								,items          : [									
									new Ext.form.ComboBox({
										fieldLabel 	        : '<b>ฝ่าย/กลุ่มงาน</b>'
										,anchor				: "100%"
										,id						: 'sectcodeid'
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
										fieldLabel 	        : '<b>โครงสร้างภายใน</b>'
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
						
					}
					
				]
			}
			
			
			,{
				xtype       : "fieldset"
				,title      : "ตำแหน่งปัจจุบันตาม จ.18"
				,anchor     : "100%"
				,items      : [
					{
						layout      : "column"
						,items      : [
							{
								columnWidth     : .7
								,layout         : "form"
								,items          : [
									{
										xtype				: "textfield"
										,fieldLabel		: "<b>ตำแหน่ง</b>"
										,anchor			: "100%"
										,id					: "exnamej18"
									}                                
								]
							}
							,{
								columnWidth     : .3
								,layout         : "form"
								,items          : [
									{
										xtype				: "numberfield"
										,anchor			: "100%"
										,fieldLabel		: "<b>เงินเดือน</b>"
										,id					: "salaryj18"
									}
								]
							}

						]
					}
					,{
						xtype				: "textarea"
						,fieldLabel		: "<b>หน่วยงาน</b>"
						,anchor			: "100%"
						,id					: "sdnamej18"
					}
				]
			}
			,{
				layout      : "column"
				,items      :[
					{
						columnWidth     : .3
						,layout         : "form"
						,labelWidth     : 150
						,defaults       : {
							anchor  : "100%"
						}
						,items          : [
							{
								xtype	: "datefield"
								,fieldLabel: "<b>วันเกิด</b>"
								,format: "d/m/Y"
								,id	: "birthdate"
								,listeners: {
										select : function(el,date ){
												SetAgePerformPersonGov();											
										} 
								}
							}
							,{
								xtype	: "datefield"
								,fieldLabel: "<b>วันบรรจุเข้ารับราชการ</b>"
								,format: "d/m/Y"
								,id	: "appointdate"
								,listeners: {
										select : function(el,date ){
												SetAgePerformPersonGov();											
										} 
								}
							}
							,{
								xtype	: "datefield"
								,fieldLabel: "<b>วันเข้าสู่หน่วยงานปัจจุบัน</b>"
								,format: "d/m/Y"
								,id	: "deptdate"
								,listeners: {
										select : function(el,date ){
												SetAgePerformPersonGov();											
										} 
								}
							}
							,{
								xtype	: "datefield"
								,fieldLabel: "<b>วันที่เข้าสู่ระดับปัจจุบัน</b>"
								,format: "d/m/Y"
								,id	: "cdate"
								,listeners: {
										select : function(el,date ){
												SetAgePerformPersonGov();											
										} 
								}
							}
							,{
								xtype       : "datefield"
								,fieldLabel : "<b>วันที่มาช่วยราชการ</b>"
								,format     : "d/m/Y"
							}
						]
					}
					,{
						columnWidth     : .4
						,bodyStyle      : "padding:0 10px 0 10px"
						,items          : [
							new Ext.BoxComponent({
								autoEl: {
									tag: "div"
									,id: "temp_etc1"
									,html   : "<table style='font:12px tahoma,arial,helvetica,sans-serif'>" +
											  "<tr ><td style='padding-bottom:4px' align='right' height='24px'><b>อายุ:</b></td><td></td></tr>" +                                          
											  "<tr ><td style='padding-bottom:4px' align='right' height='24px'><b>อายุราชการ:</b></td><td></td></tr>" +
											  "<tr ><td style='padding-bottom:4px' align='right' height='24px'><b>ระยะงาน:</b></td><td></td></tr>" +
											  "<tr ><td style='padding-bottom:4px' align='right' height='24px'><b>ระยะเวลา:</b></td><td></td></tr>" +
											  "<tr ><td style='padding-bottom:4px' align='right' height='24px'><b>ระยะเวลา:</b></td><td></td></tr>" +
											  "</table>"
								}
							})
						]
					}
					,{
						columnWidth     : .3
						,layout         : "form"
						,labelWidth     : 140
						,defaults       : {
							anchor      : "100%"
						}
						,items          : [
							new Ext.BoxComponent({
								autoEl      : {
									tag: "div"
									,id: "temp_etc2"
									,html   : "<table style='font:12px tahoma,arial,helvetica,sans-serif'>" +
											  "<tr ><td style='padding-bottom:4px' align='right' height='24px' width='140px'><b>วันที่ครบเกษียณ:</b></td><td></td></tr>" +                                          
											  "<tr ><td style='padding-bottom:4px' align='right' height='24px' width='140px'><b>ระยะครบเกบียณ:</b></td><td></td></tr>" +
											  "</table>" 
								}
							})
							,{
								xtype				: "datefield"
								,fieldLabel		: "<b>วันที่รับโอน</b>"
								,format				: "d/m/Y"
								,id					: "getindate"
							}
							,{
								xtype       : "datefield"
								,fieldLabel : "<b>วันบรรจุรับ</b>"
								,format     : "d/m/Y"
							}
							,{
								xtype				: "datefield"
								,fieldLabel		: "<b>วันที่ออกจากราชการ</b>"
								,format				: "d/m/Y"
								,id					: "exitdate"
							}
						]
					}
				]
			}
			,{
				layout      : "column"
				,items      : [
					{
						columnWidth     : .5
						,layout         : "form"
						,labelWidth     : 150
						,items          : [
							new Ext.form.ComboBox({
								fieldLabel 	        : '<b>วุฒิในตำแหน่ง</b>'
								,anchor				: "100%"
								,id						: 'qcodeid'
								,editable 				: false
								,hiddenName 		:'qcode'
								,store 					: new Ext.data.Store({
									reader				: new Ext.data.JsonReader({
										fields				: ['qcode', 'qualify']
										,root					: 'records'
									})
									,url					: 'code_qualify/genres' 
								})
								,valueField 			: 'qcode'
								,displayField 		: 'qualify'
								,typeAhead 	        : true
								,triggerAction 		: 'all'
								,emptyText 	        : 'โปรดเลือก'
								,selectOnFocus 	: true                          
							})
							
						]
					}
					,{
						columnWidth     : .5
						,layout         : "form"
						,labelWidth     : 150
						,items          : [


							new Ext.form.ComboBox({
								fieldLabel 	        : '<b>วิชาเอก</b>'
								,anchor				: "100%"
								,id						: 'macodeid'
								,editable 				: false
								,hiddenName 		:'macode'
								,store 					: new Ext.data.Store({
									reader				: new Ext.data.JsonReader({
										fields				: ['macode', 'major']
										,root					: 'records'
									})
									,url					: 'code_major/genres' 
								})
								,valueField 			: 'macode'
								,displayField 		: 'major'
								,typeAhead 	        : true
								,triggerAction 		: 'all'
								,emptyText 	        : 'โปรดเลือก'
								,selectOnFocus 	: true                          
							})

						]
					}
				]
			}
			,{
				layout      : "column"
				,items      : [
					{
						columnWidth     : 1
						,layout         : "form"
						,labelWidth     : 150
						,items          : [
							new Ext.form.ComboBox({
								fieldLabel 	        : '<b>ใบอนุญาตประกอบวิชาชีพ</b>'
								,anchor				: "100%"
								,id						: 'codetradeid'
								,editable 				: false
								,hiddenName 		:'codetrade'
								,store 					: new Ext.data.Store({
									reader				: new Ext.data.JsonReader({
										fields				: ['codetrade', 'trade']
										,root					: 'records'
									})
									,url					: 'code_trade/genres' 
								})
								,valueField 			: 'codetrade'
								,displayField 		: 'trade'
								,typeAhead 	        : true
								,triggerAction 		: 'all'
								,emptyText 	        : 'โปรดเลือก'
								,selectOnFocus 	: true                           
							})
						]
					}
				]
			}
			
			,{
				layout      : "column"
				,items      : [
					{
						width       : 300
						,layout     : "form"
						,defaults   : {
							anchor  : "100%"
						}
						,items      : [
							{
								xtype: 'radiogroup',
								fieldLabel: '<b>สมาชิก กบข.</b>',
								columns: 2,
								items: [
									{boxLabel: '<b>สมัคร</b>', name: 'kbk',id: "kbk1", inputValue: 1},
									{boxLabel: '<b>ไม่สมัคร</b>', name: 'kbk',id:"kbk0", inputValue: 0}
								]
							}
						]
					}
					,{
						columnWidth : 1
						,layout     : "form"
						,labelWidth : 120
						,defaults   : {
							anchor  : "100%"
						}
						,items      : [
							{
								xtype       : "textfield"
								,fieldLabel : "<b>ความสามารถพิเศษ</b>"
							}
						]
					}
				]
			}
			,{
				layout      : "column"
				,items      : [
					{
						width          : 500
						,items         : [
							{
								layout      : "column"
								,items      : [
									{
										columnWidth     : .3
										,layout         : "form"
										,defaults       : {
											anchor      : "100%"
										}
										,items          : [
											{
												xtype       : "textfield"
												,fieldLabel : "<b>นสร.</b>"
											}
										]
									}
									,{
										columnWidth     : .3
										,layout         : "form"
										,defaults       : {
											anchor      : "100%"
										}
										,items          : [
											{
												xtype       : "textfield"
												,fieldLabel : "<b>พภม.</b>"
											}
										]
									}
									,{
										columnWidth     : .3
										,layout         : "form"
										,defaults       : {
											anchor      : "100%"
										}
										,items          : [
											{
												xtype       : "textfield"
												,fieldLabel : "<b>พอส.</b>"
											}
										]
									}
								]
							}
						]
					}
				]
			}
			,{
				xtype				: "textfield"
				,fieldLabel		: "<b>หมายเหตุ 1</b>"
				,anchor			: "100%"
				,id					: "note"
			},{
				xtype				: "textfield"
				,fieldLabel		: "<b>หมายเหตุ 2</b>"
				,anchor			: "100%"
				,id					: "note2"
			},{
				xtype				: "hidden"
				,id					: "id"
			}
		]
		,buttons			: [
			{ 
				text					:'บันทึก'
				,formBind			: true 
				,handler			:function(){ 					
					perform_person_now_form.getForm().submit(
					{ 
						method		:'POST'
						,url				: "/perform_person_now/edit"
						,waitTitle		:'Saving Data'
						,waitMsg		:'Sending data...'
						,success		:function(){		
							Ext.Msg.alert("สถานะ","บันทึกเสร็จเรีบยร้อย", function(btn, text){										
									if (btn == 'ok')
									{
										center_govPanel.getLayout().setActiveItem(perform_personGrid);
										perform_personGridStore.reload();
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
					center_govPanel.getLayout().setActiveItem(perform_personGrid);
					perform_personGridStore.load({ params: { start: 0, limit: 20} });
				}
			}	
		]
	});

/********************************************************************/
/*											FUNCTION										*/
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

	function searchEditPerformPersonNow(id){

		
		Ext.Ajax.request({
			url				: '/perform_person_now/search_edit'
			,params		: {
				id		: id
			}
			,success		: function(response, opts) {
				center_govPanel.getLayout().setActiveItem(perform_person_now_form);
				var obj = Ext.decode(response.responseText);
				/*pis_personel_id,id*/
				Ext.getCmp("j18codeid").getStore().load()
				Ext.getCmp("j18codeid").store.on("load",function(){Ext.getCmp("j18codeid").setValue(obj.data[0].j18code);})
				Ext.getCmp("mincodeid").getStore().load()
				Ext.getCmp("mincodeid").store.on("load",function(){Ext.getCmp("mincodeid").setValue(obj.data[0].mincode);})
				Ext.getCmp("deptcodeid").getStore().load()
				Ext.getCmp("deptcodeid").store.on("load",function(){Ext.getCmp("deptcodeid").setValue(obj.data[0].deptcode);})
				Ext.getCmp("divcodeid").getStore().load()
				Ext.getCmp("divcodeid").store.on("load",function(){Ext.getCmp("divcodeid").setValue(obj.data[0].divcode);})
				Ext.getCmp("sdcode").setValue(obj.data[0].sdcode);
				Ext.getCmp("sdname").setValue(obj.data[0].sdname);
				Ext.getCmp("subdcodeid").getStore().load()
				Ext.getCmp("subdcodeid").store.on("load",function(){Ext.getCmp("subdcodeid").setValue(obj.data[0].subdcode);})
				Ext.getCmp("sectcodeid").getStore().load()
				Ext.getCmp("sectcodeid").store.on("load",function(){Ext.getCmp("sectcodeid").setValue(obj.data[0].sectcode);})
				Ext.getCmp("jobcodeid").getStore().load()
				Ext.getCmp("jobcodeid").store.on("load",function(){Ext.getCmp("jobcodeid").setValue(obj.data[0].jobcode);})
				obj.data[0].birthdate = obj.data[0].birthdate.replace(obj.data[0].birthdate.split("-")[0],(Number(obj.data[0].birthdate.split("-")[0]) + 543));
				Ext.getCmp("birthdate").setValue(to_date_i(obj.data[0].birthdate));
				obj.data[0].appointdate = obj.data[0].appointdate.replace(obj.data[0].appointdate.split("-")[0],(Number(obj.data[0].appointdate.split("-")[0]) + 543));
				Ext.getCmp("appointdate").setValue(to_date_i(obj.data[0].appointdate));
				obj.data[0].deptdate = obj.data[0].deptdate.replace(obj.data[0].deptdate.split("-")[0],(Number(obj.data[0].deptdate.split("-")[0]) + 543));
				Ext.getCmp("deptdate").setValue(to_date_i(obj.data[0].deptdate));
				obj.data[0].getindate = obj.data[0].getindate.replace(obj.data[0].getindate.split("-")[0],(Number(obj.data[0].getindate.split("-")[0]) + 543));
				Ext.getCmp("getindate").setValue(to_date_i(obj.data[0].getindate));
				obj.data[0].exitdate = obj.data[0].exitdate.replace(obj.data[0].exitdate.split("-")[0],(Number(obj.data[0].exitdate.split("-")[0]) + 543));
				Ext.getCmp("exitdate").setValue(to_date_i(obj.data[0].exitdate));
				obj.data[0].cdate = obj.data[0].cdate.replace(obj.data[0].cdate.split("-")[0],(Number(obj.data[0].cdate.split("-")[0]) + 543));
				Ext.getCmp("cdate").setValue(to_date_i(obj.data[0].cdate));
				Ext.getCmp("qcodeid").getStore().load()
				Ext.getCmp("qcodeid").store.on("load",function(){Ext.getCmp("qcodeid").setValue(obj.data[0].qcode);})
				Ext.getCmp("macodeid").getStore().load()
				Ext.getCmp("macodeid").store.on("load",function(){Ext.getCmp("macodeid").setValue(obj.data[0].macode);})
				Ext.getCmp("codetradeid").getStore().load()
				Ext.getCmp("codetradeid").store.on("load",function(){Ext.getCmp("codetradeid").setValue(obj.data[0].codetrade);})
				if (obj.data[0].kbk == "1"){
					Ext.getCmp("kbk1").setValue(true);
				}
				else if (obj.data[0].kbk == "0"){
					Ext.getCmp("kbk0").setValue(true);
				}
				Ext.getCmp("note").setValue(obj.data[0].note);
				Ext.getCmp("note2").setValue(obj.data[0].note2);
				Ext.getCmp("exnamej18").setValue(obj.data[0].exnamej18);
				Ext.getCmp("sdnamej18").setValue(obj.data[0].sdnamej18);
				Ext.getCmp("salaryj18").setValue(obj.data[0].salaryj18);
				Ext.getCmp("id").setValue(obj.data[0].id);
				SetAgePerformPersonGov();
			}
			,failure			: function(response, opts) {
				Ext.Msg.alert("สถานะ", response.statusText);
			}
		});
	}



	function SetAgePerformPersonGov(){
		var data = {
			age: ''
			,age_gov:''
			,term_task:''
			,period1:''
			,period2:"N/A"
		};

		if (Ext.getCmp("birthdate").getRawValue() != ""){
			tmp_date = Ext.getCmp("birthdate").getRawValue();
			tmp_date = tmp_date.replace(tmp_date.split("/")[2],(Number(tmp_date.split("/")[2]) - 543));
			tmp_date = calage(tmp_date);
			data.age = tmp_date[0]+" ปี  " + tmp_date[1] + " เดือน  " + tmp_date[2] + " วัน" ;			
			if (Ext.getCmp("appointdate").getRawValue() != ""){
				tmp_date = Ext.getCmp("birthdate").getRawValue();
				tmp_date = tmp_date.replace(tmp_date.split("/")[2],(Number(tmp_date.split("/")[2])  +60));
				tmp_date_min = Ext.getCmp("appointdate").getRawValue();
				tmp_date_min = tmp_date_min.replace(tmp_date_min.split("/")[2],(Number(tmp_date_min.split("/")[2]) - 543));			
				tmp_date2 = calage(tmp_date.replace(tmp_date.split("/")[2],(Number(tmp_date.split("/")[2])  -543 )),tmp_date_min);			
				tmp_date2 = tmp_date2[0]+" ปี  " + tmp_date2[1] + " เดือน  " + tmp_date2[2] + " วัน" ;
				data2 = {
					date_retire: tmp_date
					,term_retire: tmp_date2
				};
				var tpl2 = new Ext.Template(
												 "<table style='font:12px tahoma,arial,helvetica,sans-serif'>" ,
												  "<tr ><td style='padding-bottom:4px' align='right' height='24px' width='140px'><b>วันที่ครบเกษียณ:</b></td><td>{date_retire}</td></tr>" ,
												  "<tr ><td style='padding-bottom:4px' align='right' height='24px' width='140px'><b>ระยะครบเกบียณ:</b></td><td>{term_retire}</td></tr>" ,
												  "</table>" 
				);
				tpl2.overwrite(Ext.get("temp_etc2"), data2);
			}											 
		}

		if (Ext.getCmp("appointdate").getRawValue() != ""){
			tmp_date = Ext.getCmp("appointdate").getRawValue();
			tmp_date = tmp_date.replace(tmp_date.split("/")[2],(Number(tmp_date.split("/")[2]) - 543));
			tmp_date = calage(tmp_date);
			data.age_gov = tmp_date[0]+" ปี  " + tmp_date[1] + " เดือน  " + tmp_date[2] + " วัน" ;
		}

		if (Ext.getCmp("deptdate").getRawValue() != ""){
			tmp_date = Ext.getCmp("deptdate").getRawValue();
			tmp_date = tmp_date.replace(tmp_date.split("/")[2],(Number(tmp_date.split("/")[2]) - 543));
			tmp_date = calage(tmp_date);
			data.term_task = tmp_date[0]+" ปี  " + tmp_date[1] + " เดือน  " + tmp_date[2] + " วัน" ;
		}

		if (Ext.getCmp("cdate").getRawValue() != ""){
			tmp_date = Ext.getCmp("cdate").getRawValue();
			tmp_date = tmp_date.replace(tmp_date.split("/")[2],(Number(tmp_date.split("/")[2]) - 543));
			tmp_date = calage(tmp_date);
			data.period1 = tmp_date[0]+" ปี  " + tmp_date[1] + " เดือน  " + tmp_date[2] + " วัน" ;
		}										    


		var tpl = new Ext.Template(
			"<table style='font:12px tahoma,arial,helvetica,sans-serif'>" ,
				  "<tr ><td style='padding-bottom:4px' align='right' height='24px'><b>อายุ:</b></td><td>{age}</td></tr>" ,
				  "<tr ><td style='padding-bottom:4px' align='right' height='24px'><b>อายุราชการ:</b></td><td>{age_gov}</td></tr>" ,
				  "<tr ><td style='padding-bottom:4px' align='right' height='24px'><b>ระยะงาน:</b></td><td>{term_task}</td></tr>" ,
				  "<tr ><td style='padding-bottom:4px' align='right' height='24px'><b>ระยะเวลา:</b></td><td>{period1}</td></tr>" ,
				  "<tr ><td style='padding-bottom:4px' align='right' height='24px'><b>ระยะเวลา:</b></td><td>{period2}</td></tr>" ,
			  "</table>"
		);

		tpl.overwrite(Ext.get("temp_etc1"), data);



		


	}