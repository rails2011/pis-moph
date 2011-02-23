/********************************************************************/
/*											Grid   												*/
/******************************************************************/
    var action_griddata_pis_insig = new Ext.ux.grid.RowActions({
             header					: 'จัดการ'
            ,keepSelection			: true
            ,widthSlope				: 50
            ,actions					:[
                    {iconCls: 'page', tooltip: 'รายละเอียด'}
            ]		
    });

    action_griddata_pis_insig.on({
            action:function(grid, record, action, row, col) {
                    if (action == "page"){
						center_govPanel.getLayout().setActiveItem(data_insig_detailGrid);
						data_insig_detailGridStore.baseParams		= {
							pis_personel_id:record.data.pis_personel_id
						}
						data_insig_detailGridStore.load({ params: { start: 0, limit: 20} }); 		
						data_insig_detailGrid.pis_personel_id = "";
						data_insig_detailGrid.pis_personel_id = record.data.pis_personel_id;
                    }		
            }
    });
    
    var data_pis_insigSearch = new Ext.ux.grid.Search({
            iconCls				: 'search'
            ,minChars			: 3
            ,autoFocus			: true
            ,position				: "top"
            ,width					: 200
    });
    var data_pis_insigFields = [
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
    
    var data_pis_insigCols = [
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
            ,action_griddata_pis_insig
    ];
    
    var data_pis_insigGridStore = new Ext.data.JsonStore({
            url					: "/data_personal/read"
            ,root					: "records"
            ,autoLoad		: false
            ,totalProperty	: 'totalCount'
            ,fields				: data_pis_insigFields
            ,idProperty		: 'id'
    });
    
    var data_pis_insigGrid = new Ext.grid.GridPanel({
            title					: "ประวัติเครื่องราชย์"
            ,region				: 'center'
            ,split				: true
            ,store				: data_pis_insigGridStore
            ,columns			: data_pis_insigCols
            ,stripeRows		: true
            ,loadMask		: {msg:'Loading...'}
            ,sm					: new Ext.grid.RowSelectionModel({singleSelect: true})
            ,plugins			: [data_pis_insigSearch,action_griddata_pis_insig]
            ,bbar				: new Ext.PagingToolbar({
                            pageSize				: 20
                            ,autoWidth			: true
                            ,store					: data_pis_insigGridStore
                            ,displayInfo			: true
                            ,displayMsg	    : 'Displaying {0} - {1} of {2}'
                            ,emptyMsg			: "Not found"
            })
			,tbar					: ["&nbsp;"]
    });
/********************************************************************/
/*							Grid  Detail		  												*/
/******************************************************************/
    var action_griddata_insig_detail = new Ext.ux.grid.RowActions({
             header					: 'จัดการ'
            ,keepSelection			: true
            ,widthSlope				: 50
            ,actions					:[
                    {iconCls: 'table-edit', tooltip: 'แก้ไข'}
            ]		
    });

    action_griddata_insig_detail.on({
            action:function(grid, record, action, row, col) {
				if (action == "table-edit"){
					Ext.Ajax.request({
						url				: '/data_pis_insig/search_edit'
						,params		: {
							id		: record.data.id
						}
						,success		: function(response, opts) {
							var obj = Ext.decode(response.responseText);

							if(!form){
								var form = new Ext.FormPanel({ 
									labelWidth			: 100
									,autoScroll			: true
									,url						: '/data_pis_insig/edit'
									,frame					: true
									,monitorValid		: true
									,bodyStyle			: "padding:10px"
									,items					:[
										{
											xtype			: "numberfield"
											,id				: "dcyear"
											,fieldLabel	: "<b>ปีที่ขอรับ</b>"
											,value			: obj.data[0].dcyear
										}
										,new Ext.form.ComboBox({
											fieldLabel				: '<b>ชั้นเครื่องราชย์</b>'
											,hiddenName			: 'dccode'
											,id							: 'iddccode'
											,store						: new Ext.data.Store({
													reader		: new Ext.data.JsonReader({
														fields	: ['dccode', 'dcname']
														,root		: 'records'
													})
													,url					: 'code_decoratype/genres'
											})
											,valueField				: 'dccode'
											,displayField			: 'dcname'
											,typeAhead				: true
											,triggerAction			: 'all'
											,emptyText				: 'Select ...'
											,selectOnFocus		: true
											,anchor					: "90%"
										})
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
											,anchor					: "90%"
										})
										,{
											xtype			: "numberfield"
											,id				: "c"
											,fieldLabel	: "<b>ระดับ</b>"
											,value			: obj.data[0].c
										}
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
											,anchor					: "90%"
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
											,anchor					: "90%"
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
											,anchor					: "90%"
										})
										,{
											xtype			: "fieldset"
											,layout			: "form"
											,labelWidth	: 180
											,anchor		: "90%"
											,items			: [
												{
													xtype	: "datefield"
													,id	: "kitjadate"
													,fieldLabel: "<b>ประกาศในราชกิจจานุเบกษาวันที่</b>"
													,format: "d/m/Y"
													,value: obj.data[0].kitjadate.split("-")[2] +'/'+obj.data[0].kitjadate.split("-")[1]+'/'+(Number(obj.data[0].kitjadate.split("-")[0])+543)
												},{
													layout			: "column"
													,items			: [
														{
															columnWidth		: .5
															,layout					: "form"
															,labelWidth			: 100
															,items					: [
																{
																	xtype			: "numberfield"
																	,id				: "book"
																	,fieldLabel	: "<b>เล่มที่</b>"
																	,value			:  obj.data[0].book
																},{
																	xtype			: "numberfield"
																	,id				: "pageno"
																	,fieldLabel	: "<b>หน้าที่</b>"
																	,value			: obj.data[0].pageno
																}
															]
														},{
															columnWidth		: .5
															,layout					: "form"
															,labelWidth			: 100
															,items					: [
																{
																	xtype				: "numberfield"
																	,id					: "section"
																	,fieldLabel		: "<b>ตอนที่</b>"
																	,value				: obj.data[0].section
																},{
																	xtype				: "numberfield"
																	,id					: "seq"
																	,fieldLabel		: "<b>ลำดับที่</b>"
																	,value				: obj.data[0].seq
																}	
															]
														}
													]
												}
											]
										},{
											layout				: "column"
											,items				: [
												{
													columnWidth		: .5
													,layout					: "form"
													,items					: [
														{
															xtype	: "datefield"
															,id	: "recdate"
															,fieldLabel: "<b>วันที่รับเหรียญ</b>"
															,format: "d/m/Y"
															,value: obj.data[0].recdate.split("-")[2] +'/'+obj.data[0].recdate.split("-")[1]+'/'+(Number(obj.data[0].recdate.split("-")[0])+543)
														}	
													]
												},{
													columnWidth		: .5
													,layout					: "form"
													,items					: [
														{
															xtype: "datefield"
															,id	: "retdate"
															,fieldLabel: "<b>วันที่คืนเหรียญ</b>"
															,format: "d/m/Y"
															,value: obj.data[0].retdate.split("-")[2] +'/'+obj.data[0].retdate.split("-")[1]+'/'+(Number(obj.data[0].retdate.split("-")[0])+543)
														}
													]
												}
											]
										},{
											xtype				: "textfield"
											,id					: "note"
											,fieldLabel		: "<b>หมายเหตุ</b>"
											,anchor			: "90%"
											,value				: obj.data[0].note
										},{
											xtype				: "fieldset"
											,title					: "ชดใช้เงินแทนเครื่องราชย์"
											,layout				: "column"
											,anchor			: "90%"
											,items				: [
												{
													columnWidth		: .5
													,layout					: "form"
													,items					: [
														{
															xtype			: "numberfield"
															,id				: "bookno"
															,fieldLabel	: "<b>ใบเสร็จเล่มที่</b>"
															,value			: obj.data[0].bookno
														},{
															xtype: "datefield"
															,id: "billdate"
															,fieldLabel: "<b>ลงวันที่</b>"
															,format: "d/m/Y"
															,value: obj.data[0].billdate.split("-")[2] +'/'+obj.data[0].billdate.split("-")[1]+'/'+(Number(obj.data[0].billdate.split("-")[0])+543)
														}
													]
												},{
													columnWidth		: .5
													,layout					: "form"
													,items					: [
														{	
															xtype			: "numberfield"
															,id				: "billno"
															,fieldLabel	: "<b>เลขที่</b>"
															,value			: obj.data[0].billno
														},{
															xtype			: "numberfield"
															,id				: "money"
															,fieldLabel	: "<b>จำนวนเงิน</b>"
															,value			: obj.data[0].money
														}
													]
												}
											]
										},{
											xtype				: "hidden"
											,id					: "pis_personel_id"
											,value				: data_insig_detailGrid.pis_personel_id
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
																	data_insig_detailGridStore.reload();
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
									title					: 'เพิ่ม/แก้ไข ประวัติเครื่องราชย์'
									,width				: 800
									,height				: 500
									,closable			: true
									,resizable		: false
									,plain				: true
									,border				: false
									,draggable 		: true 
									,modal				: true
									,layout				: "fit"
									,maximizable	: true
									,items				: [form]
								});
							}
							win.show();
							win.center();

							Ext.getCmp("iddccode").getStore().events.load = true;
							Ext.getCmp("iddccode").store.on("load",function( Store , records, Object  ) {
								Ext.getCmp("iddccode").setValue(obj.data[0].dccode);
							});
							Ext.getCmp("iddccode").store.load();
							Ext.getCmp("idposcode").getStore().events.load = true;
							Ext.getCmp("idposcode").store.on("load",function( Store , records, Object  ) {
								Ext.getCmp("idposcode").setValue(obj.data[0].poscode);
							});
							Ext.getCmp("idposcode").store.load();
							Ext.getCmp("idexcode").getStore().events.load = true;
							Ext.getCmp("idexcode").store.on("load",function( Store , records, Object  ) {
								Ext.getCmp("idexcode").setValue(obj.data[0].excode);
							});
							Ext.getCmp("idexcode").store.load();
							Ext.getCmp("idepcode").getStore().events.load = true;
							Ext.getCmp("idepcode").store.on("load",function( Store , records, Object  ) {
								Ext.getCmp("idepcode").setValue(obj.data[0].epcode);
							});
							Ext.getCmp("idepcode").store.load();
							Ext.getCmp("idptcode").getStore().events.load = true;
							Ext.getCmp("idptcode").store.on("load",function( Store , records, Object  ) {
								Ext.getCmp("idptcode").setValue(obj.data[0].ptcode);
							});
							Ext.getCmp("idptcode").store.load();

						}
						,failure			: function(response, opts) {
							Ext.Msg.alert("สถานะ", response.statusText);
						}
					});
				}		
            }
    });

    var data_insig_detailFields = [
        {name: "id", type: "int"}
		,{name: "pis_personel_id", type: "string"}
		,{name: "dccode", type: "string"}
		,{name: "dcyear", type: "string"}
		,{name: "book", type: "string"}
		,{name: "section", type: "string"}
		,{name: "pageno", type: "string"}
		,{name: "seq", type: "string"}
		,{name: "recdate", type: "string"}
		,{name: "kitjadate", type: "string"}
		,{name: "retdate", type: "string"}
		,{name: "billno", type: "string"}
		,{name: "bookno", type: "string"}
		,{name: "billdate", type: "string"}
		,{name: "money", type: "string"}
		,{name: "poscode", type: "string"}
		,{name: "excode", type: "string"}
		,{name: "epcode", type: "string"}
		,{name: "c", type: "string"}
		,{name: "upd_user", type: "string"}
		,{name: "ptcode", type: "string"}
		,{name: "note", type: "string"}
		,{name: "dcname", type: "string"}
		,{name: "posname", type: "string"}
		,{name: "exname", type: "string"}
		,{name: "expert", type: "string"}
		,{name: "ptname", type: "string"}		
    ];
	
    var data_insig_detailCols = [
			{
                    header			: "#"
                    ,width			: 30
                    ,renderer		: rowNumberer.createDelegate(this)
                    ,sortable		: false
            }		
			,{header: "ชั้นเครื่องราชย์",width: 150, sortable: false, dataIndex: 'dcname'}
			,{header: "ปีขอรับ",width: 150, sortable: false, dataIndex: 'dcyear'}
			,{header: "ตำแหน่งสายงาน",width: 150, sortable: false, dataIndex: 'posname'}
			,{header: "ระดับ",width: 150, sortable: false, dataIndex: 'c'}
			,{header: "ตำแหน่งบริหาร",width: 150, sortable: false, dataIndex: 'exname'}
			,{header: "ว/วช/ชช",width: 150, sortable: false, dataIndex: 'ptname'}
			,{header: "ความเชี่ยวชาญ",width: 150, sortable: false, dataIndex: 'expert'}			
            ,action_griddata_insig_detail
    ];
    
    var data_insig_detailGridStore = new Ext.data.JsonStore({
            url					: "/data_pis_insig/read"
            ,root					: "records"
            ,autoLoad		: false
            ,totalProperty	: 'totalCount'
            ,fields				: data_insig_detailFields
            ,idProperty		: 'id'
    });
    
    var data_insig_detailGrid = new Ext.grid.GridPanel({
            title					: "รายละเอียดประวัติเครื่องราชย์"
            ,region				: 'center'
            ,split				: true
            ,store				: data_insig_detailGridStore
            ,columns			: data_insig_detailCols
            ,stripeRows		: true
            ,loadMask		: {msg:'Loading...'}
            ,sm					: new Ext.grid.RowSelectionModel({singleSelect: true})
            ,plugins			: [action_griddata_insig_detail]
			 ,bbar				: new Ext.PagingToolbar({
                            pageSize				: 20
                            ,autoWidth			: true
                            ,store					: data_insig_detailGridStore
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
								,url						: '/data_pis_insig/add'
								,frame					: true
								,monitorValid		: true
								,bodyStyle			: "padding:10px"
								,items					:[
									{
										xtype			: "numberfield"
										,id				: "dcyear"
										,fieldLabel	: "<b>ปีที่ขอรับ</b>"
									}
									,new Ext.form.ComboBox({
										fieldLabel				: '<b>ชั้นเครื่องราชย์</b>'
										,hiddenName			: 'dccode'
										,id							: 'iddccode'
										,store						: new Ext.data.Store({
												reader		: new Ext.data.JsonReader({
													fields	: ['dccode', 'dcname']
													,root		: 'records'
												})
												,url					: 'code_decoratype/genres'
										})
										,valueField				: 'dccode'
										,displayField			: 'dcname'
										,typeAhead				: true
										,triggerAction			: 'all'
										,emptyText				: 'Select ...'
										,selectOnFocus		: true
										,anchor					: "90%"
									})
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
										,anchor					: "90%"
									})
									,{
										xtype			: "numberfield"
										,id				: "c"
										,fieldLabel	: "<b>ระดับ</b>"
									}
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
										,anchor					: "90%"
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
										,anchor					: "90%"
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
										,anchor					: "90%"
									})
									,{
										xtype			: "fieldset"
										,layout			: "form"
										,labelWidth	: 180
										,anchor		: "90%"
										,items			: [
											{
												xtype			: "datefield"
												,id				: "kitjadate"
												,fieldLabel	: "<b>ประกาศในราชกิจจานุเบกษาวันที่</b>"
												,format			: "d/m/Y"
											},{
												layout			: "column"
												,items			: [
													{
														columnWidth		: .5
														,layout					: "form"
														,labelWidth			: 100
														,items					: [
															{
																xtype			: "numberfield"
																,id				: "book"
																,fieldLabel	: "<b>เล่มที่</b>"
															},{
																xtype			: "numberfield"
																,id				: "pageno"
																,fieldLabel	: "<b>หน้าที่</b>"
															}
														]
													},{
														columnWidth		: .5
														,layout					: "form"
														,labelWidth			: 100
														,items					: [
															{
																xtype				: "numberfield"
																,id					: "section"
																,fieldLabel		: "<b>ตอนที่</b>"
															},{
																xtype				: "numberfield"
																,id					: "seq"
																,fieldLabel		: "<b>ลำดับที่</b>"
															}	
														]
													}
												]
											}
										]
									},{
										layout				: "column"
										,items				: [
											{
												columnWidth		: .5
												,layout					: "form"
												,items					: [
													{
														xtype				: "datefield"
														,id					: "recdate"
														,fieldLabel		: "<b>วันที่รับเหรียญ</b>"
														,format				: "d/m/Y"
													}	
												]
											},{
												columnWidth		: .5
												,layout					: "form"
												,items					: [
													{
														xtype				: "datefield"
														,id					: "retdate"
														,fieldLabel		: "<b>วันที่คืนเหรียญ</b>"
														,format				: "d/m/Y"
													}
												]
											}
										]
									},{
										xtype				: "textfield"
										,id					: "note"
										,fieldLabel		: "<b>หมายเหตุ</b>"
										,anchor			: "90%"
									},{
										xtype				: "fieldset"
										,title					: "ชดใช้เงินแทนเครื่องราชย์"
										,layout				: "column"
										,anchor			: "90%"
										,items				: [
											{
												columnWidth		: .5
												,layout					: "form"
												,items					: [
													{
														xtype			: "numberfield"
														,id				: "bookno"
														,fieldLabel	: "<b>ใบเสร็จเล่มที่</b>"
													},{
														xtype			: "datefield"
														,id				: "billdate"
														,fieldLabel	: "<b>ลงวันที่</b>"
														,format			: "d/m/Y"
													}
												]
											},{
												columnWidth		: .5
												,layout					: "form"
												,items					: [
													{	
														xtype			: "numberfield"
														,id				: "billno"
														,fieldLabel	: "<b>เลขที่</b>"
													},{
														xtype			: "numberfield"
														,id				: "money"
														,fieldLabel	: "<b>จำนวนเงิน</b>"
													}
												]
											}
										]
									},{
										xtype				: "hidden"
										,id					: "pis_personel_id"
										,value				: data_insig_detailGrid.pis_personel_id
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
																data_insig_detailGridStore.reload();
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
								title					: 'เพิ่ม/แก้ไข ประวัติเครื่องราชย์'
								,width				: 800
								,height				: 500
								,closable			: true
								,resizable		: false
								,plain				: true
								,border				: false
								,draggable 		: true 
								,modal				: true
								,layout				: "fit"
								,maximizable	: true
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
									url			: '/data_pis_insig/delete' , 
									params	: { 
										id						: data_insig_detailGrid.getSelectionModel().getSelections()[0].data.id
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
														data_insig_detailGridStore.reload();
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
						center_govPanel.getLayout().setActiveItem(data_pis_insigGrid); 
					}
				}
			]
    });

	data_insig_detailGrid.getSelectionModel().on('selectionchange', function(sm){
			data_insig_detailGrid.removeBtn.setDisabled(sm.getCount() < 1);       
	});