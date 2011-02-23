data_educationForm_url = "";
/********************************************************************/
/*											Grid   												*/
/******************************************************************/
    var action_griddata_education = new Ext.ux.grid.RowActions({
             header					: 'จัดการ'
            ,keepSelection			: true
            ,widthSlope				: 50
            ,actions					:[
                    {iconCls: 'page', tooltip: 'รายละเอียด'}
            ]		
    });

    action_griddata_education.on({
            action:function(grid, record, action, row, col) {
                    if (action == "page"){
							center_govPanel.getLayout().setActiveItem(panelEducation);
							panelEducation.setTitle("ประวัติการศึกษา ("+record.data.prename+"&nbsp;"+record.data.fname+"&nbsp;&nbsp;&nbsp;"+record.data.lname+ ")");
							data_educationForm.disable();
							data_education_detailGridStore.baseParams		= {
								pis_personel_id:record.data.pis_personel_id
							}
							data_education_detailGridStore.load(); 
							data_educationForm.pis_personel_id = record.data.pis_personel_id;
                    }
            }
    });
    
    var data_educationSearch = new Ext.ux.grid.Search({
            iconCls				: 'search'
            ,minChars			: 3
            ,autoFocus			: true
            ,position				: "top"
            ,width					: 200
    });
    var data_educationFields = [
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
    
    var data_educationCols = [
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
            ,action_griddata_education
    ];
    
    var data_educationGridStore = new Ext.data.JsonStore({
            url					: "/data_personal/read"
            ,root					: "records"
            ,autoLoad		: false
            ,totalProperty	: 'totalCount'
            ,fields				: data_educationFields
            ,idProperty		: 'id'
    });
    
    var data_educationGrid = new Ext.grid.GridPanel({
           title					: "ประวัติการศึกษา"
            ,region				: 'center'
            ,split				: true
            ,store				: data_educationGridStore
            ,columns			: data_educationCols
            ,stripeRows		: true
            ,loadMask		: {msg:'Loading...'}
            ,sm					: new Ext.grid.RowSelectionModel({singleSelect: true})
            ,plugins			: [data_educationSearch,action_griddata_education]
            ,bbar				: new Ext.PagingToolbar({
                            pageSize				: 20
                            ,autoWidth			: true
                            ,store					: data_educationGridStore
                            ,displayInfo			: true
                            ,displayMsg	    : 'Displaying {0} - {1} of {2}'
                            ,emptyMsg			: "Not found"
            })
			,tbar					: ["&nbsp;"]
    });
/********************************************************************/
/*							Grid  Education  												*/
/******************************************************************/
	var expander_data_education_detail = new Ext.ux.grid.RowExpander({
        tpl : new Ext.Template(
			'<table>',
            '<tr><td with="50px" align="right"><b>วันที่สำเร็จการศึกษา:</b></td><td> {enddate}</td></tr>',
            '<tr><td with="50px" align="right"><b>วุฒิการศึกษา:</b> </td><td>{qualify}</td></tr>',
			'<tr><td with="50px" align="right"><b>ระดับการศึกษา:</b> </td><td>{edulevel}</td></tr>',
			'<tr><td with="50px" align="right"><b>วิชาเอก</b> </td><td>{major}</td></tr>',
			'<tr><td with="50px" align="right"><b>สถาบัน:</b> </td><td>{institute}</td></tr>',
			'<tr><td with="50px" align="right"><b>ประเทศ:</b> </td><td>{coname}</td></tr>',
			'</table>'

        )
    });

    var action_griddata_education_detail = new Ext.ux.grid.RowActions({
             header					: 'จัดการ'
            ,keepSelection			: true
            ,widthSlope				: 50
            ,actions					:[
                    {iconCls: 'table-edit', tooltip: 'แก้ไข'}
            ]		
    });

    action_griddata_education_detail.on({
            action:function(grid, record, action, row, col) {
                    if (action == "table-edit"){
						data_educationForm_url = "/data_education/edit";
						data_educationForm.enable();
						data_educationForm.getForm().reset();
						if (data_educationForm.findById("id") == null){
							data_educationForm.add({
								xtype			: "textfield"
								,id				: "id"
								,value			: record.data.id
							});
							data_educationForm.doLayout();
						}
						else{
							Ext.getCmp("id").setValue(record.data.id);
						}
						Ext.Ajax.request({
							url				: '/data_education/search_edit'
							,params		: {
								id		: record.data.id
							}
							,success		: function(response, opts) {
								var obj = Ext.decode(response.responseText);	
										if (obj.data[0].status == 1){
											Ext.getCmp("status1").setValue(true);
										}else if (obj.data[0].status == 0){
											Ext.getCmp("status0").setValue(true);
										}
										obj.data[0].enddate = obj.data[0].enddate.replace(obj.data[0].enddate.split("-")[0],(Number(obj.data[0].enddate.split("-")[0]) + 543));
										Ext.getCmp("enddate").setValue(obj.data[0].enddate);
										if (obj.data[0].enddate != "" && obj.data[0].enddate != "null"){
											Ext.getCmp("enddate_").setValue(obj.data[0].enddate.split("-")[2] +'/'+obj.data[0].enddate.split("-")[1]+'/'+obj.data[0].enddate.split("-")[0]);
										}
										Ext.getCmp("regisno").setValue(obj.data[0].regisno);
										Ext.getCmp("refno").setValue(obj.data[0].refno);
										Ext.getCmp("flag").setValue(obj.data[0].flag);
										Ext.getCmp("maxed").setValue(obj.data[0].maxed);
										Ext.getCmp("institute").setValue(obj.data[0].institute);										
										Ext.getCmp("qcodeid").getStore().load();
										Ext.getCmp("qcodeid").store.on("load",function(){Ext.getCmp("qcodeid").setValue(obj.data[0].qcode);});
										Ext.getCmp("ecodeid").getStore().load();
										Ext.getCmp("ecodeid").store.on("load",function(){Ext.getCmp("ecodeid").setValue(obj.data[0].ecode);});
										Ext.getCmp("macodeid").getStore().load();
										Ext.getCmp("macodeid").store.on("load",function(){Ext.getCmp("macodeid").setValue(obj.data[0].macode);});
										Ext.getCmp("cocodeid").getStore().load();
										Ext.getCmp("cocodeid").store.on("load",function(){Ext.getCmp("cocodeid").setValue(obj.data[0].cocode);});								
							}
							,failure			: function(response, opts) {
								Ext.Msg.alert("สถานะ", response.statusText);
							}
						});
                    }		
            }
    });

    var data_education_detailFields = [
        {name: "id", type: "int"}
		,{name: "pis_personel_id", type: "string"}
        ,{name: "eorder", type: "string"}
        ,{name: "macode", type: "string"}
        ,{name: "qcode", type: "string"}
        ,{name: "ecode", type: "string"}
        ,{name: "cocode", type: "string"}
        ,{name: "institute", type: "string"}
        ,{name: "enddate", type: "string"}
        ,{name: "upd_user", type: "string"}
        ,{name: "flag", type: "string"}
        ,{name: "spcode", type: "string"}
        ,{name: "maxed", type: "string"}
        ,{name: "status", type: "string"}
        ,{name: "note", type: "string"}
        ,{name: "regisno", type: "string"}
        ,{name: "edstart", type: "string"}
        ,{name: "edend", type: "string"}
        ,{name: "refno", type: "string"}
        ,{name: "major", type: "string"}
        ,{name: "qualify", type: "string"}
        ,{name: "edulevel", type: "string"}
        ,{name: "coname", type: "string"}
    ];
    
    var data_education_detailCols = [
			expander_data_education_detail
			,{
                    header			: "#"
                    ,width			: 30
                    ,renderer		: rowNumberer.createDelegate(this)
                    ,sortable		: false
            }		
            ,{header: "ระดับการศึกษา",width: 150, sortable: false, dataIndex: 'edulevel'}
			,{header: "วันที่จบการศึกษา",width: 150, sortable: false, dataIndex: 'enddate'}
			,{header: "เป็นวุฒิในตำแหน่ง",width: 150, sortable: false, dataIndex: 'flag'}			
			,{header: "",width: 70, sortable: false, dataIndex: ''}
            ,action_griddata_education_detail
    ];
    
    var data_education_detailGridStore = new Ext.data.JsonStore({
            url					: "/data_education/read"
            ,root					: "records"
            ,autoLoad		: false
            ,totalProperty	: 'totalCount'
            ,fields				: data_education_detailFields
            ,idProperty		: 'id'
    });
    
    var data_education_detailGrid = new Ext.grid.GridPanel({
            region				: 'center'
            ,split				: true
            ,store				: data_education_detailGridStore
            ,columns			: data_education_detailCols
            ,stripeRows		: true
            ,loadMask		: {msg:'Loading...'}
            ,sm					: new Ext.grid.RowSelectionModel({singleSelect: true})
            ,plugins			: [action_griddata_education_detail,expander_data_education_detail]
			,tbar					: [
				{
					text					: "	เพิ่ม"
					,iconCls			: "table-add"
					,handler			: function (){
						data_educationForm.getForm().reset();
						data_educationForm.enable();
						data_educationForm_url = "/data_education/add";
					}
				},"-",{
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
									url			: '/data_education/delete' , 
									params	: { 
										id						: data_education_detailGrid.getSelectionModel().getSelections()[0].data.id
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
														data_education_detailGridStore.reload();
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
						center_govPanel.getLayout().setActiveItem(data_educationGrid); 
					}
				}
			]
    });
	data_education_detailGrid.getSelectionModel().on('selectionchange', function(sm){
			data_education_detailGrid.removeBtn.setDisabled(sm.getCount() < 1);       
	});
/********************************************************************/
/*											Form												*/
/******************************************************************/

    var data_educationForm = new Ext.form.FormPanel({
        region					: "south"
		,height					: 300
		,autoScroll			: true
		,split					: true
        //,title						: "ประวัติการศึกษา"
		,bodyStyle			: "padding:5px"
		,labelAlign			: "right"	
		,frame					: true
		,monitorValid		: true
		,labelWidth			: 120
		,defaults				: {
			msgTarget		: "side"
		}
		,items					: [
			{
				xtype			: 'radiogroup'
				,width			: 200
				,fieldLabel	: '<b>สถานะการศึกษา</b>'
				,items: [
					{boxLabel: 'สำเร็จการศึกษา', name: 'status',id: 'status1',inputValue:1,checked:true}
					,{boxLabel: 'ลาศึกษาต่อ', name: 'status',id: 'status0',inputValue:0}
				]
			},{
				xtype: "datefield"
				,fieldLabel: "<b>วันที่สำเร็จการศึกษา</b>"
				,id: "enddate"
				,format: "d/m/Y"
			},{
				xtype				: "textfield"
				,id					: "regisno"
				,fieldLabel		: "<b>เอกสารอ้างอิง</b>"
				,anchor			: "90%"
			}
			,new Ext.form.ComboBox({
				fieldLabel 	        : '<b>วุฒิการศึกษา</b>'
				,anchor				: "50%"
				,id						: 'qcodeid'
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
				,allowBlank			: false
			})	
			,new Ext.form.ComboBox({
				fieldLabel 	        : '<b>ระบดับการการศึกษา</b>'
				,anchor				: "50%"
				,id						: 'ecodeid'
				,hiddenName 		:'ecode'
				,store 					: new Ext.data.Store({
					reader				: new Ext.data.JsonReader({
						fields				: ['ecode', 'edulevel']
						,root					: 'records'
					})
					,url					: 'code_edulevel/genres' 
				})
				,valueField 			: 'ecode'
				,displayField 		: 'edulevel'
				,typeAhead 	        : true
				,triggerAction 		: 'all'
				,emptyText 	        : 'โปรดเลือก'
				,selectOnFocus 	: true     
				,allowBlank			: false
			})
			,new Ext.form.ComboBox({
				fieldLabel 	        : '<b>วิชาเอก</b>'
				,anchor				: "50%"
				,id						: 'macodeid'
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
			}),{
				xtype					: "textfield"
				,id						: "institute"
				,fieldLabel			: "<b>ชื่อสถานบัน</b>"
				,anchor				: "50%"
			}
			,new Ext.form.ComboBox({
				fieldLabel 	        : '<b>ประเทศ</b>'
				,anchor				: "50%"
				,id						: 'cocodeid'
				,hiddenName 		:'cocode'
				,store 					: new Ext.data.Store({
					reader				: new Ext.data.JsonReader({
						fields				: ['cocode', 'coname']
						,root					: 'records'
					})
					,url					: 'code_country/genres' 
				})
				,valueField 			: 'cocode'
				,displayField 		: 'coname'
				,typeAhead 	        : true
				,triggerAction 		: 'all'
				,emptyText 	        : 'โปรดเลือก'
				,selectOnFocus 	: true                          
			})
			,{
				xtype					: 'checkboxgroup'
				,width					: 300
				,hiddenLabel		: true
				,items					: [
					{boxLabel: 'กำหนดเป็นวุฒิในตำแหน่ง', name: 'flag', id: 'flag',inputValue:1},
					{boxLabel: 'กำหนดเป็นวุฒิสูงสุด', name: 'maxed', id: 'maxed',inputValue:1}
				]
			},{
				xtype				: "textfield"
				,fieldLabel		: "<b>หมายเหตุ</b>"
				,anchor			: "90%"
				,id					: "refno"
			}
		]
		,buttons				:[
			{ 
				text					:'บันทึก'
				,formBind			: true 
				,handler			:function(){
					data_educationForm.getForm().submit(
					{ 
						method		:'POST'
						,url				: data_educationForm_url
						,waitTitle		:'Saving Data'
						,waitMsg		:'Sending data...'
						,params		: {
								pis_personel_id: data_educationForm.pis_personel_id
						}
						,success		:function(){		
						
							Ext.Msg.alert("สถานะ","บันทึกเสร็จเรีบยร้อย", function(btn, text){										
									if (btn == 'ok')
									{
										data_educationForm.getForm().reset();
										data_educationForm.disable();
										data_education_detailGridStore.reload();
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
					center_govPanel.getLayout().setActiveItem(data_education_detailGrid);
					data_educationGridStore.load({ params: { start: 0, limit: 20} });
				}
			}
		]

	});
/********************************************************************/
/*											Panel Education								*/
/******************************************************************/
	var panelEducation  = new Ext.Panel({
		title					: "ประวัติการศึกษา"
		,layout				:  "border"
		,items				: [
			data_education_detailGrid
			,data_educationForm
		]
	});