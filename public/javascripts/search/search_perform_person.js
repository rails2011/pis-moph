/*************************************************************************/
/*														Grid Search														 */
/*************************************************************************/
	var value_queryperform_person_trigger = new Ext.form.TriggerField({
		triggerClass: "trigger"
		,anchor: "95%"
		,id: "value_queryperform_person_trigger"
		,readOnly: true
		,onTriggerClick: function(a,b,c,d,e,f,g){
			if (data_queryperform_personGrid.nowRecordEdit.data.field == ""){
				Ext.Msg.alert("สถานะ","กรุณาเลือกของมูลให้ถูกต้อง");
				return false;
			}

			switch(data_queryperform_personGrid.nowRecordEdit.data.field){
				case "pp.fname":
					SetValueQueryGrid(data_queryperform_personGrid.nowRecordEdit);
					break;
				case "pp.lname":
					SetValueQueryGrid(data_queryperform_personGrid.nowRecordEdit);
					break;
				 case "pj.salary":
					SetValueQueryGrid(data_queryperform_personGrid.nowRecordEdit);
					break;
				case "cd.divcode":
					QueryDivname(data_queryperform_personGrid.nowRecordEdit);
					break;
				case "cdp.deptcode":
					QueryDeptname(data_queryperform_personGrid.nowRecordEdit);
					break;
				case "cs.sdcode":
					Querysdname(data_queryperform_personGrid.nowRecordEdit);
					break;
				case "cst.sectcode":
					QuerySectname(data_queryperform_personGrid.nowRecordEdit);
					break;
				case "cj.jobcode":
					QueryJobname(data_queryperform_personGrid.nowRecordEdit);
					break;
				case "cp.poscode":
					QueryPoscodeperform_person(data_queryperform_personGrid.nowRecordEdit);
					break;
				case "cex.excode":
					QueryExname(data_queryperform_personGrid.nowRecordEdit);
					break;
				case "cep.epcode":
					QueryExpert(data_queryperform_personGrid.nowRecordEdit);
					break;
				case "cm.mincode":
					QueryMinname(data_queryperform_personGrid.nowRecordEdit);
					break;
				case "cpt.ptcode":
					QueryPtname(data_queryperform_personGrid.nowRecordEdit);
					break;
			}			
		}
	});

	col_prepare = ['pp.fname','pp.lname','cm.mincode','cd.divcode','cdp.deptcode','cs.sdcode','cst.sectcode','cj.jobcode','cp.poscode','cex.excode','cep.epcode','cpt.ptcode','pj.salary'];

	var data_field_queryperform_person_trigger  = [
						['pp.fname'			,'ชื่อ']
						,['pp.lname'		,'นามสกุล']
						,['cm.mincode'		,'กระทรวง']
						,['cm.mincode'		,'กอง']
						,['cm.mincode'	,'กรม']				
						,['cdp.deptcode'		,'หน่วยงาน']
						,['cs.sdcode'		,'ฝ่าย/กลุ่มงาน']
						,['cj.jobcode'		,'งาน'	]			
						,['cp.poscode'		,'ตำแหน่งสายงาน']
						,['cex.excode'		,'ตำแหน่งบริหาร']
						,['cep.epcode'		,'ตำแหน่งวิชาการ']
						,['cpt.ptcode'		,'ว/วช/ชช']  
						,['pj.salary'			,'เงินเดือน']
	];


	var field_queryperform_person_trigger = new Ext.form.ComboBox({
		editable: false
		,id:'field_queryperform_person_trigger'
		,store: new Ext.data.SimpleStore({
			fields: ['id', 'type']
			,data: data_field_queryperform_person_trigger
		})
		,valueField:'id'
		,displayField:'type'
		,typeAhead: true
		,mode: 'local'
		,triggerAction: 'all'
		,selectOnFocus:true		
		,listeners: {
			select : function( combo,  record,  index ) {
				if (data_queryperform_personGrid.nowColumnEdit == 2){
					data_queryperform_personGrid.nowRecordEdit.data["field"] = '';
					data_queryperform_personGrid.nowRecordEdit.data["value"] = '';
					data_queryperform_personGrid.nowRecordEdit.data["id"] = '';
					data_queryperform_personGrid.nowRecordEdit.data["operator"] = '';
					data_queryperform_personGrid.nowRecordEdit.data["operator2"] = '';
					data_queryperform_personGrid.nowRecordEdit.commit();
				}
			}
		}
	})


	var data_operator_queryperform_person_trigger  = [
						['='			,'เท่ากับ']
						,['<='		,'น้อยกว่าเท่ากับ']
						,['>='		,'มากกว่า']
						,['!='			,'ไม่เท่ากับ']
						,['like'			,'คล้ายกับ']
	];
	var operator_queryperform_person_trigger = new Ext.form.ComboBox({
		editable: false
		,id:'operator_queryperform_person_trigger'
		,store: new Ext.data.SimpleStore({
			fields: ['id', 'type']
			,data: data_operator_queryperform_person_trigger
		})
		,valueField:'id'
		,displayField:'type'
		,typeAhead: true
		,mode: 'local'
		,triggerAction: 'all'
		,selectOnFocus:true		
	})

	var data_operator2_queryperform_person_trigger  = [
						[''				,'']
						,['and'		,'และ']
						,['or'			,'หรือ']
						
	];
	var operator2_queryperform_person_trigger = new Ext.form.ComboBox({
		editable: false
		,id:'operator2_queryperform_person_trigger'
		,store: new Ext.data.SimpleStore({
			fields: ['id', 'type']
			,data: data_operator2_queryperform_person_trigger
		})
		,valueField:'id'
		,displayField:'type'
		,typeAhead: true
		,mode: 'local'
		,triggerAction: 'all'
		,selectOnFocus:true		
	})

	var smdata_queryperform_personGrid = new Ext.grid.CheckboxSelectionModel({singleSelect: true})
    var data_queryperform_personFields = [
        {name: "field", type: "string"}        
		,{name: "value", type: "string"}
		,{name: "id", type: "string"}
		,{name: "operator", type: "string"}
		,{name: "operator2", type: "string"}
    ];
    
    var data_queryperform_personCols = [
			smdata_queryperform_personGrid
            ,{
                    header: "#"
                    ,width: 30
                    ,renderer: rowNumberer.createDelegate(this)
                    ,sortable: false
            }		
            ,{header: "Field",width: 200, sortable: false, dataIndex: 'field',editor:field_queryperform_person_trigger,renderer: function(value ,metadata ,record ,rowIndex  ,colIndex ,store ){
				var index_ = field_queryperform_person_trigger.getStore().find('id',value)
				store.commitChanges();
				if (index_ == -1){
					return "";
				}
				else{
					return data_field_queryperform_person_trigger[index_][1];
				}
			}}
			,{header: "Operator",width: 200, sortable: false, dataIndex: 'operator',editor:operator_queryperform_person_trigger,renderer: function(value ,metadata ,record ,rowIndex  ,colIndex ,store ){
				var index_ = operator_queryperform_person_trigger.getStore().find('id',value)
				store.commitChanges();
				if (index_ == -1){
					return "";
				}
				else{
					return data_operator_queryperform_person_trigger[index_][1];
				}
			}}
			,{header: "Value",width: 200, sortable: false, dataIndex: 'value',editor:value_queryperform_person_trigger}
			,{header: "Operator",width: 200, sortable: false, dataIndex: 'operator2',editor:operator2_queryperform_person_trigger,renderer: function(value ,metadata ,record ,rowIndex  ,colIndex ,store ){
				var index_ = operator2_queryperform_person_trigger.getStore().find('id',value)
				store.commitChanges();
				if (index_ == -1){
					return "";
				}
				else{
					return data_operator2_queryperform_person_trigger[index_][1];
				}
			}}
			,{header: "id",width: 70, sortable: false, dataIndex: 'id'}
    ];
    
    var data_queryperform_personGridStore = new Ext.data.JsonStore({
            url:""
            ,root: "records"
            ,autoLoad: false
            ,totalProperty: 'totalCount'
            ,fields: data_queryperform_personFields
            ,idProperty: 'id'
    });     
	
    var data_queryperform_personGrid = new Ext.grid.EditorGridPanel({
            title: "เงื่อนไขสอบถาม"
            ,region: 'north'
			,height: 200
			,clicksToEdit: 1
            ,split: true
            ,store: data_queryperform_personGridStore
            ,columns: data_queryperform_personCols
            ,stripeRows: true
            ,loadMask: {msg:'Loading...'}
            ,sm: smdata_queryperform_personGrid
			,bbar: [
				{
					text: "เพิ่ม"
					,iconCls: "table-add"
					,handler: function(){
						var data_queryperform_personNewRecord = Ext.data.Record.create(data_queryperform_personFields);
						var e = new data_queryperform_personNewRecord({
								field: ''
								,value: ''
								,id: ''
								,operator: ''
								,operator2: ''
						});
						data_queryperform_personGridStore.insert(data_queryperform_personGridStore.data.items.length, e);
						data_queryperform_personGrid.getView().refresh();
					}
				},"-",{
					ref: '../insertBtn'
					,text: "แทรก"
					,disabled: true
					,iconCls: "table-row-insert"
					,handler: function(){
						var data_queryperform_personNewRecord = Ext.data.Record.create(data_queryperform_personFields);
						var e = new data_queryperform_personNewRecord({
								field: ''
								,value: ''
								,id: ''
								,operator: ''
								,operator2: ''
						});
						data_queryperform_personGridStore.insert(data_queryperform_personGridStore.indexOf(smdata_queryperform_personGrid.getSelected() )+1, e);
						data_queryperform_personGrid.getView().refresh();
					}
				},"-",{
					ref: '../removeBtn'
					,text: "ลบ"
					,disabled: true
					,iconCls: "table-delete"
					,handler: function (){
						data_queryperform_personGridStore.remove(smdata_queryperform_personGrid.getSelected());
					}
				},"->",{
					text: "ล้างข้อมูล"
					,handler: function (){
						data_queryperform_personGridStore.removeAll();
					}
				},"-",{
					text: "ค้นหา"
					,iconCls: "search"
					,handler: function(){
						tmp_case = data_queryperform_personGridStore.data.items
						if (tmp_case.length == 0){
							Ext.Msg.alert("สถานะ","กรุณาทำรายารให้ครบถ้วน");
							return false;
						}
						else{
							for (i=0;i<tmp_case.length ;i++ ){
								if (i != tmp_case.length -1){
									if (tmp_case[i].data["field"] == "" || tmp_case[i].data["value"] == "" || tmp_case[i].data["id"] == "" || tmp_case[i].data["operator"] == "" || tmp_case[i].data["operator2"] == ""){
										Ext.Msg.alert("สถานะ","กรุณาทำรายารให้ครบถ้วน");
										return false;
									}
								}

								if (i == tmp_case.length -1){
									if (tmp_case[i].data["field"] == "" || tmp_case[i].data["value"] == "" || tmp_case[i].data["id"] == "" || tmp_case[i].data["operator"] == ""){
										Ext.Msg.alert("สถานะ","กรุณาทำรายารให้ครบถ้วน");
										return false;
									}
								}
							}
						}
						tmp_case = readDataGrid(tmp_case);

						tmp_col = select_col_querydetailperform_person.split(",");
						col_prepare = ['fname','lname','mincode','divcode','deptcode','sdcode','sectcode','jobcode','poscode','excode','epcode','ptcode','salary'];
						col_dis		  = ['ชื่อ'	,'นามสกุล','กระทรวง','กอง','กรม','หน่วยงาน','ฝ่าย/กลุ่มงาน','งาน','ตำแหน่งสายงาน','ตำแหน่งบริหาร','ตำแหน่งวิชาการ','ว/วช/ชช','เงินเดือน'];
						col_width	  = [200,200,200,200,200,200,200,200,200,200,200,200,200]

						Col = new Ext.grid.ColumnModel([
								{
										header: "#"
										,width: 30
										,renderer: rowNumberer.createDelegate(this)
										,sortable: false
								}											
						]);

						for (i=0;i<tmp_col.length ;i++ ){
							Col.config.push({
															header: col_dis[col_prepare.indexOf(tmp_col[i])]
															,width: col_width[col_prepare.indexOf(tmp_col[i])]
															, sortable: false
															, dataIndex: col_prepare[col_prepare.indexOf(tmp_col[i])]
							});
						}							
																							
						data_querydetailperform_personGrid.reconfigure(data_querydetailperform_personGridStore, Col);
						data_querydetailperform_personGridStore.baseParams = {
							col: select_col_querydetailperform_person
							,where: tmp_case
						}
						data_querydetailperform_personGridStore.load({
							params: {
								start: 0
								,limit: 20
							}
						})
					}
				}

			]
			,listeners: {
				beforeedit: function(obj){
					this.nowRecordEdit = obj.record;
					this.nowColumnEdit = obj.column;
				}
			}
    });

	data_queryperform_personGrid.getSelectionModel().on('selectionchange', function(sm){
			data_queryperform_personGrid.removeBtn.setDisabled(sm.getCount() < 1);
			data_queryperform_personGrid.insertBtn.setDisabled(sm.getCount() < 1);
	});
/***************************************************************************/
/*														Grid Detail     														 */
/*************************************************************************/
	var select_col_querydetailperform_person = "fname,lname";
	var data_querydetailperform_personFields =  [
		{name: "fname", type: "string"}
		,{name: "lname", type: "string"}
		,{name: "mincode", type: "string"}
		,{name: "divcode", type: "string"}
		,{name: "deptcode", type: "string"}
		,{name: "sdcode", type: "string"}
		,{name: "sectcode", type: "string"}
		,{name: "jobcode", type: "string"}
		,{name: "poscode", type: "string"}
		,{name: "excode", type: "string"}
		,{name: "epcode", type: "string"}
		,{name: "ptcode", type: "string"}
		,{name: "salary", type: "int"}
	];
	
	var data_querydetailperform_personCols = [
            {
                    header: "#"
                    ,width: 30
                    ,renderer: rowNumberer.createDelegate(this)
                    ,sortable: false
            }            
    ];
    
    var data_querydetailperform_personGridStore = new Ext.data.JsonStore({
			url: "query_all/j18"
			,root: "records"
			,autoLoad: false
			,totalProperty: 'totalCount'
			,fields: data_querydetailperform_personFields
    });
    
    var data_querydetailperform_personGrid = new Ext.grid.GridPanel({
            title: "รายละเอียด"
            ,region: 'center'
            ,split: true
            ,store: data_querydetailperform_personGridStore
            ,columns: data_querydetailperform_personCols
            ,stripeRows: true
            ,loadMask: {msg:'Loading...'}
            ,sm: new Ext.grid.RowSelectionModel({singleSelect: true})
            ,bbar: new Ext.PagingToolbar({
                            pageSize: 20
                            ,autoWidth: true
                            ,store: data_querydetailperform_personGridStore
                            ,displayInfo: true
                            ,displayMsg	    : 'Displaying {0} - {1} of {2}'
                            ,emptyMsg: "Not found"
            })
			,tbar: [
				{
					text: "เลือกคอลัมน์"
					,handler: function(){
						QueryDetailperform_person();
					}
				},"-",{
					text: "Excel"
					,iconCls: "excel"
					,handler: function(){
						tmp_case = data_queryperform_personGridStore.data.items
						if (tmp_case.length == 0){
							Ext.Msg.alert("สถานะ","กรุณาทำรายารให้ครบถ้วน");
							return false;
						}
						else{
							for (i=0;i<tmp_case.length ;i++ ){
								if (i != tmp_case.length -1){
									if (tmp_case[i].data["field"] == "" || tmp_case[i].data["value"] == "" || tmp_case[i].data["id"] == "" || tmp_case[i].data["operator"] == "" || tmp_case[i].data["operator2"] == ""){
										Ext.Msg.alert("สถานะ","กรุณาทำรายารให้ครบถ้วน");
										return false;
									}
								}

								if (i == tmp_case.length -1){
									if (tmp_case[i].data["field"] == "" || tmp_case[i].data["value"] == "" || tmp_case[i].data["id"] == "" || tmp_case[i].data["operator"] == ""){
										Ext.Msg.alert("สถานะ","กรุณาทำรายารให้ครบถ้วน");
										return false;
									}
								}
							}
						}
						tmp_case = readDataGrid(tmp_case);
						tmp_col = select_col_querydetailperform_person.split(",");
						col_prepare = ['fname','lname','mincode','divcode','deptcode','sdcode','sectcode','jobcode','poscode','excode','epcode','ptcode','salary'];
						col_dis		  = ['ชื่อ'	,'นามสกุล','กระทรวง','กอง','กรม','หน่วยงาน','ฝ่าย/กลุ่มงาน','งาน','ตำแหน่งสายงาน','ตำแหน่งบริหาร','ตำแหน่งวิชาการ','ว/วช/ชช','เงินเดือน'];
						col_width	  = [200,200,200,200,200,200,200,200,200,200,200,200,200]
						col_show = ""
						for (i=0;i<tmp_col.length ;i++ ){
							 col_show += col_dis[col_prepare.indexOf(tmp_col[i])] + ",";									
						}	
						col_show = col_show.substr(0,col_show.length -1);
						var form = document.createElement("form");
						form.setAttribute("method", "post");
						form.setAttribute("action", "/query_all/reportperform_person?format=xls");
						form.setAttribute("target", "_blank");
						var hiddenField = document.createElement("input");
						hiddenField.setAttribute("name", "col");
						hiddenField.setAttribute("value", select_col_querydetailperform_person);
						
						var hiddenField2 = document.createElement("input");
						hiddenField2.setAttribute("name", "where");
						hiddenField2.setAttribute("value", tmp_case);

						var hiddenField3 = document.createElement("input");
						hiddenField3.setAttribute("name", "col_show");
						hiddenField3.setAttribute("value", col_show);

						form.appendChild(hiddenField);
						form.appendChild(hiddenField2);
						form.appendChild(hiddenField3);

						document.body.appendChild(form);
						form.submit();
						document.body.removeChild(form);
					}
				},"-",{
					text: "PDF"
					,iconCls: "pdf"
					,handler: function(){
						tmp_case = data_queryperform_personGridStore.data.items
						if (tmp_case.length == 0){
							Ext.Msg.alert("สถานะ","กรุณาทำรายารให้ครบถ้วน");
							return false;
						}
						else{
							for (i=0;i<tmp_case.length ;i++ ){
								if (i != tmp_case.length -1){
									if (tmp_case[i].data["field"] == "" || tmp_case[i].data["value"] == "" || tmp_case[i].data["id"] == "" || tmp_case[i].data["operator"] == "" || tmp_case[i].data["operator2"] == ""){
										Ext.Msg.alert("สถานะ","กรุณาทำรายารให้ครบถ้วน");
										return false;
									}
								}

								if (i == tmp_case.length -1){
									if (tmp_case[i].data["field"] == "" || tmp_case[i].data["value"] == "" || tmp_case[i].data["id"] == "" || tmp_case[i].data["operator"] == ""){
										Ext.Msg.alert("สถานะ","กรุณาทำรายารให้ครบถ้วน");
										return false;
									}
								}
							}
						}
						tmp_case = readDataGrid(tmp_case);
						tmp_col = select_col_querydetailperform_person.split(",");
						col_prepare = ['fname','lname','mincode','divcode','deptcode','sdcode','sectcode','jobcode','poscode','excode','epcode','ptcode','salary'];
						col_dis		  = ['ชื่อ'	,'นามสกุล','กระทรวง','กอง','กรม','หน่วยงาน','ฝ่าย/กลุ่มงาน','งาน','ตำแหน่งสายงาน','ตำแหน่งบริหาร','ตำแหน่งวิชาการ','ว/วช/ชช','เงินเดือน'];
						col_width	  = [200,200,200,200,200,200,200,200,200,200,200,200,200]
						col_show = ""
						for (i=0;i<tmp_col.length ;i++ ){
							 col_show += col_dis[col_prepare.indexOf(tmp_col[i])] + ",";									
						}	
						col_show = col_show.substr(0,col_show.length -1);
						var form = document.createElement("form");
						form.setAttribute("method", "post");
						form.setAttribute("action", "/query_all/reportj18?format=pdf");
						form.setAttribute("target", "_blank");
						var hiddenField = document.createElement("input");
						hiddenField.setAttribute("name", "col");
						hiddenField.setAttribute("value", select_col_querydetailperform_person);
						
						var hiddenField2 = document.createElement("input");
						hiddenField2.setAttribute("name", "where");
						hiddenField2.setAttribute("value", tmp_case);

						var hiddenField3 = document.createElement("input");
						hiddenField3.setAttribute("name", "col_show");
						hiddenField3.setAttribute("value", col_show);

						form.appendChild(hiddenField);
						form.appendChild(hiddenField2);
						form.appendChild(hiddenField3);

						document.body.appendChild(form);
						form.submit();
						document.body.removeChild(form);
					}
				}		
			]
    });
/***************************************************************************/
/*														Panel Main     														 */
/*************************************************************************/

	var panelMainSearchperform_person  = new Ext.Panel({
		title: "สอบถามข้อมูลปฏิบัติราชการปัจจุบัน / ข้อมูลส่วนตัว"
		,layout:  "border"
		,items: [
			data_queryperform_personGrid
			,data_querydetailperform_personGrid
		]
	});
/***************************************************************************/
/*														Function          														 */
/*************************************************************************/

	function SetValueQueryGrid(record){
		if(!form){
			var form = new Ext.FormPanel({ 
				labelWidth: 50
				,autoScroll: true
				,url: ''
				,frame: true
				,monitorValid: true
				,items:[
					{
						xtype: "textfield"
						,id: "set_value_query_grid_value"
						,fieldLabel: "<b>Value</b>"
						,anchor: "95%"
					}	
				]
				,buttons:[
					{ 
						text:'บันทึก'
						,formBind: true 
						,handler:function(){ 
							record.data["value"] = Ext.getCmp("set_value_query_grid_value").getValue();
							record.data["id"] = Ext.getCmp("set_value_query_grid_value").getValue();
							record.commit();
							win.close();	
						} 
					},{
						text: "ยกเลิก"
						,handler: function	(){
							win.close();
						}
					}
				] 
			});
		}//end if form
		if(!win){
			var win = new Ext.Window({
				title: ''
				,width: 400
				,height: 150
				,closable: true
				,resizable: false
				,plain: true
				,border: false
				,draggable: true 
				,modal: true
				,layout: "fit"
				,items: [form]
			});
		}
		win.show();
		win.center();	
	}

	function QueryDivname(record){
		var Fields = [
			{name: "id", type: "int"}
			,{name: "divcode", type: "int"}
			,{name: "divname", type: "string"}
			,{name: "prefix", type: "string"}
			,{name: "flag", type: "string"}
		];

		var Cols = [
			{
				header: "#"
				,width: 50
				,renderer: rowNumberer.createDelegate(this)
				,sortable: false
			}
			,{header: "คำนำหน้า", width: 100, sortable: false, dataIndex: "prefix"}
			,{header: "กอง", width: 200, sortable: false, dataIndex: "divname"}
		];

		var GridStore = new Ext.data.JsonStore({
			url: "/code_div/read"
			,root: 'records'
			,autoLoad: false
			,totalProperty: 'totalCount'
			,fields: Fields
			,idProperty: 'id'
		});

		var Grid = new Ext.grid.GridPanel({
			region: 'center'
			,split: true
			,store: GridStore
			,columns: Cols
			,stripeRows: true
			,loadMask: {msg:'Loading...'}
			,sm: new Ext.grid.RowSelectionModel({singleSelect: true})       
			,bbar: new Ext.PagingToolbar({
					pageSize: 10
					,autoWidth: true
					,store: GridStore
					,displayInfo: true
					,displayMsg: 'Displaying {0} - {1} of {2}'
					,emptyMsg: "Not found"
			})
			,plugins: [
				new Ext.ux.grid.Search({
					iconCls: 'search'
					,minChars: 3
					,autoFocus: true
					,position: "top"
					,width: 200
				})			
			]
			,tbar: []
		});

		GridStore.load({ params: { start: 0, limit: 10} });

		Grid.on('rowdblclick', function(grid, rowIndex, e ) {
			var record_sl = grid.getSelectionModel().getSelected();
			record.data["value"] = record_sl.data.prefix+"  "+record_sl.data.divname;
			record.data["id"] = record_sl.data.divcode;
			record.commit();
			win.close();
		});

		if(!win){
			var win = new Ext.Window({
				title: ''
				,width: 400
				,height: 400
				,closable: true
				,resizable: false
				,plain: true
				,border: false
				,draggable: true 
				,modal: true
				,layout: "fit"
				,items: [Grid]
			});
		}
		win.show();	
		win.center();
	}

	function QueryDeptname(record){
		var Fields = [
			{name: "id", type: "int"}
			,{name: "deptcode", type: "int"}
			,{name: "deptname", type: "string"}
		];

		var Cols = [
			{
				header: "#"
				,width: 50
				,renderer: rowNumberer.createDelegate(this)
				,sortable: false
			}
			,{header: "กรม", width: 200, sortable: false, dataIndex: "deptname"}
		];

		var GridStore = new Ext.data.JsonStore({
			url: "/code_dept/read"
			,root: 'records'
			,autoLoad: false
			,totalProperty: 'totalCount'
			,fields: Fields
			,idProperty: 'id'
		});

		var Grid = new Ext.grid.GridPanel({
			region: 'center'
			,split: true
			,store: GridStore
			,columns: Cols
			,stripeRows: true
			,loadMask: {msg:'Loading...'}
			,sm: new Ext.grid.RowSelectionModel({singleSelect: true})       
			,bbar: new Ext.PagingToolbar({
					pageSize: 10
					,autoWidth: true
					,store: GridStore
					,displayInfo: true
					,displayMsg: 'Displaying {0} - {1} of {2}'
					,emptyMsg: "Not found"
			})
			,plugins: [
				new Ext.ux.grid.Search({
					iconCls: 'search'
					,minChars: 3
					,autoFocus: true
					,position: "top"
					,width: 200
				})			
			]
			,tbar: []
		});

		GridStore.load({ params: { start: 0, limit: 10} });

		Grid.on('rowdblclick', function(grid, rowIndex, e ) {
			var record_sl = grid.getSelectionModel().getSelected();
			record.data["value"] = record_sl.data.deptname;
			record.data["id"] = record_sl.data.deptcode;
			record.commit();
			win.close();
		});

		if(!win){
			var win = new Ext.Window({
				title: ''
				,width: 400
				,height: 400
				,closable: true
				,resizable: false
				,plain: true
				,border: false
				,draggable: true 
				,modal: true
				,layout: "fit"
				,items: [Grid]
			});
		}
		win.show();	
		win.center();
	}

	function Querysdname(record){
		var Fields = [
			{name: "id", type: "int"}
			,{name: "sdcode", type: "int"}
			,{name: "shortpre", type: "string"}
			,{name: "longpre", type: "string"}
			,{name: "sdname", type: "string"}
		];

		var Cols = [
			{
				header: "#"
				,width: 30
				,renderer: rowNumberer.createDelegate(this)
				,sortable: false
			}
			,{header: "ชื่อย่อคำนำหน้า", width: 80, sortable: false, dataIndex: "shortpre"}
			,{header: "คำนำหน้า", width: 150, sortable: false, dataIndex: "longpre"}
			,{header: "หน่วยงาน", width: 180, sortable: false, dataIndex: "sdname"}
		];

		var GridStore = new Ext.data.JsonStore({
			url: "/code_sdept/read"
			,root: 'records'
			,autoLoad: false
			,totalProperty: 'totalCount'
			,fields: Fields
			,idProperty: 'id'
		});

		var Grid = new Ext.grid.GridPanel({
			region: 'center'
			,split: true
			,store: GridStore
			,columns: Cols
			,stripeRows: true
			,loadMask: {msg:'Loading...'}
			,sm: new Ext.grid.RowSelectionModel({singleSelect: true})       
			,bbar: new Ext.PagingToolbar({
					pageSize: 10
					,autoWidth: true
					,store: GridStore
					,displayInfo: true
					,displayMsg: 'Displaying {0} - {1} of {2}'
					,emptyMsg: "Not found"
			})
			,plugins: [
				new Ext.ux.grid.Search({
					iconCls: 'search'
					,minChars: 3
					,autoFocus: true
					,position: "top"
					,width: 200
				})			
			]
			,tbar: []
		});

		GridStore.load({ params: { start: 0, limit: 10} });

		Grid.on('rowdblclick', function(grid, rowIndex, e ) {
			var record_sl = grid.getSelectionModel().getSelected();
			record.data["value"] = record_sl.data.shortpre+"  "+record_sl.data.sdname;
			record.data["id"] = record_sl.data.sdcode;
			record.commit();
			win.close();
		});

		if(!win){
			var win = new Ext.Window({
				title: ''
				,width: 550
				,height: 400
				,closable: true
				,resizable: false
				,plain: true
				,border: false
				,draggable: true 
				,modal: true
				,layout: "fit"
				,items: [Grid]
			});
		}
		win.show();	
		win.center();
	}

	function QuerySectname(record){
		var Fields = [
			{name: "id", type: "int"}
			,{name: "sectcode", type: "int"}
			,{name: "shortname", type: "string"}
			,{name: "sectname", type: "string"}
		];

		var Cols = [
			{
				header: "#"
				,width: 30
				,renderer: rowNumberer.createDelegate(this)
				,sortable: false
			}
			,{header: "ชื่อย่อ", width: 80, sortable: false, dataIndex: "shortname"}
			,{header: "กลุ่ม", width: 180, sortable: false, dataIndex: "sectname"}
		];

		var GridStore = new Ext.data.JsonStore({
			url: "/code_sect/read"
			,root: 'records'
			,autoLoad: false
			,totalProperty: 'totalCount'
			,fields: Fields
			,idProperty: 'id'
		});

		var Grid = new Ext.grid.GridPanel({
			region: 'center'
			,split: true
			,store: GridStore
			,columns: Cols
			,stripeRows: true
			,loadMask: {msg:'Loading...'}
			,sm: new Ext.grid.RowSelectionModel({singleSelect: true})       
			,bbar: new Ext.PagingToolbar({
					pageSize: 10
					,autoWidth: true
					,store: GridStore
					,displayInfo: true
					,displayMsg: 'Displaying {0} - {1} of {2}'
					,emptyMsg: "Not found"
			})
			,plugins: [
				new Ext.ux.grid.Search({
					iconCls: 'search'
					,minChars: 3
					,autoFocus: true
					,position: "top"
					,width: 200
				})			
			]
			,tbar: []
		});

		GridStore.load({ params: { start: 0, limit: 10} });

		Grid.on('rowdblclick', function(grid, rowIndex, e ) {
			var record_sl = grid.getSelectionModel().getSelected();
			record.data["value"] = record_sl.data.sectname;
			record.data["id"] = record_sl.data.sectcode;
			record.commit();
			win.close();
		});

		if(!win){
			var win = new Ext.Window({
				title: ''
				,width: 550
				,height: 400
				,closable: true
				,resizable: false
				,plain: true
				,border: false
				,draggable: true 
				,modal: true
				,layout: "fit"
				,items: [Grid]
			});
		}
		win.show();	
		win.center();
	}

	function QueryJobname(record){
		var Fields = [
			{name: "id", type: "int"}
			,{name: "jobcode", type: "int"}
			,{name: "jobname", type: "string"}
		];

		var Cols = [
			{
				header: "#"
				,width: 30
				,renderer: rowNumberer.createDelegate(this)
				,sortable: false
			}
			,{header: "งาน", width: 250, sortable: false, dataIndex: "jobname"}
		];

		var GridStore = new Ext.data.JsonStore({
			url: "/code_job/read"
			,root: 'records'
			,autoLoad: false
			,totalProperty: 'totalCount'
			,fields: Fields
			,idProperty: 'id'
		});

		var Grid = new Ext.grid.GridPanel({
			region: 'center'
			,split: true
			,store: GridStore
			,columns: Cols
			,stripeRows: true
			,loadMask: {msg:'Loading...'}
			,sm: new Ext.grid.RowSelectionModel({singleSelect: true})       
			,bbar: new Ext.PagingToolbar({
					pageSize: 10
					,autoWidth: true
					,store: GridStore
					,displayInfo: true
					,displayMsg: 'Displaying {0} - {1} of {2}'
					,emptyMsg: "Not found"
			})
			,plugins: [
				new Ext.ux.grid.Search({
					iconCls: 'search'
					,minChars: 3
					,autoFocus: true
					,position: "top"
					,width: 200
				})			
			]
			,tbar: []
		});

		GridStore.load({ params: { start: 0, limit: 10} });

		Grid.on('rowdblclick', function(grid, rowIndex, e ) {
			var record_sl = grid.getSelectionModel().getSelected();
			record.data["value"] = record_sl.data.jobname;
			record.data["id"] = record_sl.data.jobcode;
			record.commit();
			win.close();
		});

		if(!win){
			var win = new Ext.Window({
				title: ''
				,width: 400
				,height: 400
				,closable: true
				,resizable: false
				,plain: true
				,border: false
				,draggable: true 
				,modal: true
				,layout: "fit"
				,items: [Grid]
			});
		}
		win.show();	
		win.center();
	}

	function QueryPoscodeperform_person(record){
		var Fields = [
			{name: "id", type: "int"}
			,{name: "poscode", type: "int"}
			,{name: "shortpre", type: "string"}
			,{name: "longpre", type: "string"}
			,{name: "posname", type: "string"}
		];

		var Cols = [
			{
				header: "#"
				,width: 30
				,renderer: rowNumberer.createDelegate(this)
				,sortable: false
			}
			,{header: "รหัสตำแหน่ง", width: 100, sortable: false, dataIndex: "poscode"}
			,{header: "ชื่อย่อคำนำหน้า", width: 100, sortable: false, dataIndex: "shortpre"}
			,{header: "คำนำหน้า", width: 100, sortable: false, dataIndex: "longpre"}
			,{header: "ตำแหน่ง", width: 150, sortable: false, dataIndex: "posname"}
		];

		var GridStore = new Ext.data.JsonStore({
			url: "/code_position/read"
			,root: 'records'
			,autoLoad: false
			,totalProperty: 'totalCount'
			,fields: Fields
			,idProperty: 'id'
		});

		var Grid = new Ext.grid.GridPanel({
			region: 'center'
			,split: true
			,store: GridStore
			,columns: Cols
			,stripeRows: true
			,loadMask: {msg:'Loading...'}
			,sm: new Ext.grid.RowSelectionModel({singleSelect: true})       
			,bbar: new Ext.PagingToolbar({
					pageSize: 10
					,autoWidth: true
					,store: GridStore
					,displayInfo: true
					,displayMsg: 'Displaying {0} - {1} of {2}'
					,emptyMsg: "Not found"
			})
			,plugins: [
				new Ext.ux.grid.Search({
					iconCls: 'search'
					,minChars: 3
					,autoFocus: true
					,position: "top"
					,width: 200
				})			
			]
			,tbar: []
		});

		GridStore.load({ params: { start: 0, limit: 10} });

		Grid.on('rowdblclick', function(grid, rowIndex, e ) {
			var record_sl = grid.getSelectionModel().getSelected();
			record.data["value"] =record_sl.data.shortpre+"  "+record_sl.data.posname;
			record.data["id"] = record_sl.data.poscode;
			record.commit();
			win.close();
		});

		if(!win){
			var win = new Ext.Window({
				title: ''
				,width: 550
				,height: 400
				,closable: true
				,resizable: false
				,plain: true
				,border: false
				,draggable: true 
				,modal: true
				,layout: "fit"
				,items: [Grid]
			});
		}
		win.show();	
		win.center();
	}

	function QueryExname(record){
		var Fields = [
			{name: "id", type: "int"}
			,{name: "excode", type: "int"}
			,{name: "shortpre", type: "string"}
			,{name: "longpre", type: "string"}
			,{name: "exname", type: "string"}
		];

		var Cols = [
			{
				header: "#"
				,width: 30
				,renderer: rowNumberer.createDelegate(this)
				,sortable: false
			}
			,{header: "ชื่อย่อคำนำหน้า", width: 100, sortable: false, dataIndex: "shortpre"}
			,{header: "คำนำหน้า", width: 100, sortable: false, dataIndex: "longpre"}
			,{header: "ตำแหน่งบริหาร", width: 250, sortable: false, dataIndex: "exname"}
		];

		var GridStore = new Ext.data.JsonStore({
			url: "/code_executive/read"
			,root: 'records'
			,autoLoad: false
			,totalProperty: 'totalCount'
			,fields: Fields
			,idProperty: 'id'
		});

		var Grid = new Ext.grid.GridPanel({
			region: 'center'
			,split: true
			,store: GridStore
			,columns: Cols
			,stripeRows: true
			,loadMask: {msg:'Loading...'}
			,sm: new Ext.grid.RowSelectionModel({singleSelect: true})       
			,bbar: new Ext.PagingToolbar({
					pageSize: 10
					,autoWidth: true
					,store: GridStore
					,displayInfo: true
					,displayMsg: 'Displaying {0} - {1} of {2}'
					,emptyMsg: "Not found"
			})
			,plugins: [
				new Ext.ux.grid.Search({
					iconCls: 'search'
					,minChars: 3
					,autoFocus: true
					,position: "top"
					,width: 200
				})			
			]
			,tbar: []
		});

		GridStore.load({ params: { start: 0, limit: 10} });

		Grid.on('rowdblclick', function(grid, rowIndex, e ) {
			var record_sl = grid.getSelectionModel().getSelected();
			record.data["value"] =record_sl.data.shortpre+"  "+record_sl.data.exname;
			record.data["id"] = record_sl.data.excode;
			record.commit();
			win.close();
		});

		if(!win){
			var win = new Ext.Window({
				title: ''
				,width: 550
				,height: 400
				,closable: true
				,resizable: false
				,plain: true
				,border: false
				,draggable: true 
				,modal: true
				,layout: "fit"
				,items: [Grid]
			});
		}
		win.show();	
		win.center();
	}

	function QueryExpert(record){
		var Fields = [
			{name: "id", type: "int"}
			,{name: "epcode", type: "int"}
			,{name: "prename", type: "string"}
			,{name: "expert", type: "string"}
		];

		var Cols = [
			{
				header: "#"
				,width: 30
				,renderer: rowNumberer.createDelegate(this)
				,sortable  : false
			}			
			,{header: "คำนำหน้า", width: 100, sortable: false, dataIndex: "prename"}
			,{header: "ความเชี่ยวชาญ", width: 200, sortable: false, dataIndex: "expert"}
		];

		var GridStore = new Ext.data.JsonStore({
			url: "/code_expert/read"
			,root: 'records'
			,autoLoad: false
			,totalProperty: 'totalCount'
			,fields: Fields
			,idProperty: 'id'
		});

		var Grid = new Ext.grid.GridPanel({
			region: 'center'
			,split: true
			,store: GridStore
			,columns: Cols
			,stripeRows: true
			,loadMask: {msg:'Loading...'}
			,sm: new Ext.grid.RowSelectionModel({singleSelect: true})       
			,bbar: new Ext.PagingToolbar({
					pageSize: 10
					,autoWidth: true
					,store: GridStore
					,displayInfo: true
					,displayMsg: 'Displaying {0} - {1} of {2}'
					,emptyMsg: "Not found"
			})
			,plugins: [
				new Ext.ux.grid.Search({
					iconCls: 'search'
					,minChars: 3
					,autoFocus: true
					,position: "top"
					,width: 200
				})			
			]
			,tbar: []
		});

		GridStore.load({ params: { start: 0, limit: 10} });

		Grid.on('rowdblclick', function(grid, rowIndex, e ) {
			var record_sl = grid.getSelectionModel().getSelected();
			record.data["value"] =record_sl.data.prename+"  "+record_sl.data.expert;
			record.data["id"] = record_sl.data.epcode;
			record.commit();
			win.close();
		});

		if(!win){
			var win = new Ext.Window({
				title: ''
				,width: 400
				,height: 400
				,closable: true
				,resizable: false
				,plain: true
				,border: false
				,draggable : true 
				,modal: true
				,layout: "fit"
				,items: [Grid]
			});
		}
		win.show();	
		win.center();
	}

	function QueryMinname(record){
		var Fields = [
			{name: "id", type: "int"}
			,{name: "mincode", type: "int"}
			,{name: "minname", type: "string"}
		];

		var Cols = [
			{
				header: "#"
				,width: 30
				,renderer: rowNumberer.createDelegate(this)
				,sortable  : false
			}
			,{header: "กระทรวง", width: 200, sortable: false, dataIndex: "minname"}
		];

		var GridStore = new Ext.data.JsonStore({
			url: "/code_minis/read"
			,root: 'records'
			,autoLoad: false
			,totalProperty: 'totalCount'
			,fields: Fields
			,idProperty: 'id'
		});

		var Grid = new Ext.grid.GridPanel({
			region: 'center'
			,split: true
			,store: GridStore
			,columns: Cols
			,stripeRows: true
			,loadMask: {msg:'Loading...'}
			,sm: new Ext.grid.RowSelectionModel({singleSelect: true})       
			,bbar: new Ext.PagingToolbar({
					pageSize: 10
					,autoWidth: true
					,store: GridStore
					,displayInfo: true
					,displayMsg: 'Displaying {0} - {1} of {2}'
					,emptyMsg: "Not found"
			})
			,plugins: [
				new Ext.ux.grid.Search({
					iconCls: 'search'
					,minChars: 3
					,autoFocus: true
					,position: "top"
					,width: 200
				})			
			]
			,tbar: []
		});

		GridStore.load({ params: { start: 0, limit: 10} });

		Grid.on('rowdblclick', function(grid, rowIndex, e ) {
			var record_sl = grid.getSelectionModel().getSelected();
			record.data["value"] =record_sl.data.minname;
			record.data["id"] = record_sl.data.mincode;
			record.commit();
			win.close();
		});

		if(!win){
			var win = new Ext.Window({
				title: ''
				,width: 400
				,height: 400
				,closable: true
				,resizable: false
				,plain: true
				,border: false
				,draggable : true 
				,modal: true
				,layout: "fit"
				,items: [Grid]
			});
		}
		win.show();	
		win.center();
	}

	function QueryPtname(record){
		var Fields = [
			{name: "id", type: "int"}
			,{name: "ptcode", type: "int"}
			,{name: "ptname", type: "string"}
			,{name: "shortmn", type: "string"}
		];

		var Cols = [
			{
				header: "#"
				,width: 30
				,renderer: rowNumberer.createDelegate(this)
				,sortable  : false
			}
			,{header: "ชื่อย่อ", width: 100, sortable: false, dataIndex: "shortmn"}
			,{header: "ว./วช/ชช.", width: 200, sortable: false, dataIndex: "ptname"}
		];

		var GridStore = new Ext.data.JsonStore({
			url: "/code_postype/read"
			,root: 'records'
			,autoLoad: false
			,totalProperty: 'totalCount'
			,fields: Fields
			,idProperty: 'id'
		});

		var Grid = new Ext.grid.GridPanel({
			region: 'center'
			,split: true
			,store: GridStore
			,columns: Cols
			,stripeRows: true
			,loadMask: {msg:'Loading...'}
			,sm: new Ext.grid.RowSelectionModel({singleSelect: true})       
			,bbar: new Ext.PagingToolbar({
					pageSize: 10
					,autoWidth: true
					,store: GridStore
					,displayInfo: true
					,displayMsg: 'Displaying {0} - {1} of {2}'
					,emptyMsg: "Not found"
			})
			,plugins: [
				new Ext.ux.grid.Search({
					iconCls: 'search'
					,minChars: 3
					,autoFocus: true
					,position: "top"
					,width: 200
				})			
			]
			,tbar: []
		});

		GridStore.load({ params: { start: 0, limit: 10} });

		Grid.on('rowdblclick', function(grid, rowIndex, e ) {
			var record_sl = grid.getSelectionModel().getSelected();
			record.data["value"] =record_sl.data.ptname;
			record.data["id"] = record_sl.data.ptcode;
			record.commit();
			win.close();
		});

		if(!win){
			var win = new Ext.Window({
				title: ''
				,width: 400
				,height: 400
				,closable: true
				,resizable: false
				,plain: true
				,border: false
				,draggable : true 
				,modal: true
				,layout: "fit"
				,items: [Grid]
			});
		}
		win.show();	
		win.center();
	}

	function QueryDetailperform_person(){

		var ds = new Ext.data.ArrayStore({
			data: [
						['mincode'		,'กระทรวง']
						,['divcode'		,'กอง']
						,['deptcode'	,'กรม']				
						,['sdcode'		,'หน่วยงาน']
						,['sectcode'		,'ฝ่าย/กลุ่มงาน']
						,['jobcode'		,'งาน'	]			
						,['poscode'		,'ตำแหน่งสายงาน']
						,['excode'		,'ตำแหน่งบริหาร']
						,['epcode'		,'ตำแหน่งวิชาการ']
						,['ptcode'		,'ว/วช/ชช']  
						,['salary'			,'เงินเดือน']
			],
			fields: ['id','value']
		});

		var isForm = new Ext.form.FormPanel({
			width:580,
			frame: true,
			bodyStyle: 'padding:10px;',
			items:[
			{
				xtype: 'itemselector',
				name: 'itemselector',
				id: 'itemselector',
				hideLabel: true,
				imagePath: '/javascripts/extjs/examples/ux/images/',
				multiselects: [{
					width: 250,
					height: 200,
					store: ds,
					displayField: 'value',
					valueField: 'id'
				},{
					width: 250,
					height: 200,
					store: new Ext.data.ArrayStore({
						data: [
									['fname'			,'ชื่อ']
									,['lname'		,'นามสกุล']
						],
						fields: ['id','value']
					}),
					displayField: 'value',
					valueField: 'id',
					tbar:[{
						text: 'clear',
						handler:function(){							
							isForm.getForm().findField('itemselector').reset();
						}
					}]
				}]
			}],

			buttons: [{
				text: 'Save',
				handler: function(){
					if(isForm.getForm().isValid()){
							var tmp = Ext.getCmp("itemselector").getValue();
							if (tmp.split(",").length > 5){
								Ext.Msg.alert("สถานะ","เลือกได้ 5 คอลัมน์");
							}
							else{
								select_col_querydetailperform_person =tmp;
								win.close();
							}
					}
				}
			}]
		});

		if(!win){
			var win = new Ext.Window({
				title: ''
				,width: 600
				,height: 300
				,closable: true
				,resizable: false
				,plain: true
				,border: false
				,draggable : true 
				,modal: true
				,layout: "fit"
				,items: [isForm]
			});
		}
		win.show();	
		win.center();
	}