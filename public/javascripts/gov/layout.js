var data_pis_personel_id = "";
var switch_gov_case = ""
function switchGov(data,etc){

	if (switch_gov_case == 'j18'){	
		if (data_pis_personel_id == ""){
			center_govPanel.removeAll();
			center_govPanel.add(panelJ18);
			center_govPanel.add(j18Form);
			center_govPanel.getLayout().setActiveItem(panelJ18);
			loadMask.hide();
			j18GridStore.load({ params: { start: 0, limit: 20} });
		}else{

			if (data == undefined ){
				searchId(data_pis_personel_id,"j18");			
			}

			if (data != undefined ){
				if (data == ""){
					Ext.Msg.alert("คำเตือน","กรุณาทำรายการใหม่อีกครั้ง");
					loadMask.hide();
				}else{
					center_govPanel.removeAll();
					center_govPanel.add(panelJ18);
					center_govPanel.add(j18Form);
					center_govPanel.getLayout().setActiveItem(j18Form);
					searchEditJ18(data);
					loadMask.hide();
					j18Form_url = "j18/update_j18";
				}
				return false;
			}		
		
		}		
	}
	else if (switch_gov_case == "perform_person_now"){
		if (data_pis_personel_id == ""){
			center_govPanel.removeAll();
			center_govPanel.add(perform_person_now_form);
			center_govPanel.add(perform_personGrid);
			center_govPanel.getLayout().setActiveItem(perform_personGrid);
			loadMask.hide();
			perform_personGridStore.load({ params: { start: 0, limit: 20} });
		}else{
			if (data == undefined ){
				searchId(data_pis_personel_id,"perform_person_now");			
			}

			if (data != undefined ){
				if (data == ""){
					Ext.Msg.alert("คำเตือน","กรุณาทำรายการใหม่อีกครั้ง");
					loadMask.hide();
				}else{
					center_govPanel.removeAll();
					center_govPanel.add(perform_person_now_form);
					center_govPanel.add(perform_personGrid);
					perform_person_now_form.getForm().reset();
                    searchEditPerformPersonNow(data);
					loadMask.hide();
				}
				return false;
			}
		}
	}
	else if (switch_gov_case == "data_personal"){
		if (data_pis_personel_id == ""){
			center_govPanel.removeAll();
			center_govPanel.add(data_personalGrid);
			center_govPanel.add(data_personal_panel);
			center_govPanel.getLayout().setActiveItem(data_personalGrid);
			loadMask.hide();
			data_personalGridStore.load({ params: { start: 0, limit: 20} });
		}else{
			if (data == undefined ){
				searchId(data_pis_personel_id,"data_personal");			
			}
			if (data != undefined ){
				if (data == ""){
					Ext.Msg.alert("คำเตือน","กรุณาทำรายการใหม่อีกครั้ง");
					loadMask.hide();
				}else{
					center_govPanel.removeAll();
					center_govPanel.add(data_personalGrid);
					center_govPanel.add(data_personal_panel);
					data_personalForm_url = "/data_personal/edit"
					Ext.getCmp("id").setValue(data);
					searchEditDataPersonal(data,etc);
					data_personal_change_nameGrid.pis_personel_id = data_pis_personel_id;
					data_personal_change_nameGridStore.baseParams = {
						pis_personel_id : data_pis_personel_id
					}
					data_personal_change_nameGridStore.load();
					data_personal_north.enable();
					loadMask.hide();
				}
				return false;
			}
		}
	}
	else if (switch_gov_case == "data_education"){
		if (data_pis_personel_id == ""){
			center_govPanel.removeAll();
			center_govPanel.add(data_educationGrid);
			center_govPanel.add(panelEducation);		
			center_govPanel.getLayout().setActiveItem(data_educationGrid);
			loadMask.hide();	
			data_educationGridStore.load({ params: { start: 0, limit: 20} });
		}else{
			if (data == undefined ){
				searchId(data_pis_personel_id,"data_education");			
			}

			if (data != undefined ){
				if (data == ""){
					Ext.Msg.alert("คำเตือน","กรุณาทำรายการใหม่อีกครั้ง");
					loadMask.hide();
				}else{					
					center_govPanel.removeAll();
					center_govPanel.add(data_educationGrid);
					center_govPanel.add(panelEducation);
					center_govPanel.getLayout().setActiveItem(panelEducation);
					panelEducation.setTitle("ประวัติการศึกษา ("+etc.data.prename+"&nbsp;"+etc.data.fname+"&nbsp;&nbsp;&nbsp;"+etc.data.lname+ ")");
					data_educationForm.disable();
					data_education_detailGridStore.baseParams		= {
						pis_personel_id:data_pis_personel_id
					}
					data_education_detailGridStore.load(); 
					data_educationForm.pis_personel_id = data_pis_personel_id;					
					loadMask.hide();	
				}
			}
		}
	}
	else if (switch_gov_case == "data_pisposhis"){
		if (data_pis_personel_id == ""){
			center_govPanel.removeAll();
			center_govPanel.add(data_pisposhisGrid);
			center_govPanel.add(panelDatailData_Pisposhis);
			center_govPanel.getLayout().setActiveItem(data_pisposhisGrid);
			loadMask.hide();		
			data_pisposhisGridStore.load({ params: { start: 0, limit: 20} });	
		}else{
			if (data == undefined ){
				searchId(data_pis_personel_id,"data_pisposhis");			
			}

			if (data != undefined ){
				if (data == ""){
					Ext.Msg.alert("คำเตือน","กรุณาทำรายการใหม่อีกครั้ง");
					loadMask.hide();
				}else{
					center_govPanel.removeAll();
					center_govPanel.add(data_pisposhisGrid);
					center_govPanel.add(panelDatailData_Pisposhis);
					center_govPanel.getLayout().setActiveItem(panelDatailData_Pisposhis);
					detail_pisposhisGridStore.baseParams = {
						pis_personel_id : data_pis_personel_id
					}
					detail_pisposhisGridStore.load( { params: { start: 0, limit: 20} } );	
					detail_pisposhisGridStore.pis_personel_id = data_pis_personel_id;
					loadMask.hide();				
				}
			}
		}
	}
	else if (switch_gov_case == "data_pis_absent"){
		if (data_pis_personel_id == ""){
			center_govPanel.removeAll();
			center_govPanel.add(data_pis_absentGrid);
			center_govPanel.add(data_absent_detailGrid);
			center_govPanel.getLayout().setActiveItem(data_pis_absentGrid);
			loadMask.hide();			
			data_pis_absentGridStore.load({ params: { start: 0, limit: 20} });
		}else{
			if (data == undefined ){
				searchId(data_pis_personel_id,"data_pis_absent");			
			}

			if (data != undefined ){
				if (data == ""){
					Ext.Msg.alert("คำเตือน","กรุณาทำรายการใหม่อีกครั้ง");
					loadMask.hide();
				}else{	
					center_govPanel.removeAll();
					center_govPanel.add(data_pis_absentGrid);
					center_govPanel.add(data_absent_detailGrid);
					center_govPanel.getLayout().setActiveItem(data_absent_detailGrid);
					data_absent_detailGridStore.removeAll();
					Ext.getCmp("idfiscal").clearValue();
					Ext.getCmp("idfiscal").getStore().baseParams		= {
						pis_personel_id:data_pis_personel_id
					}
					Ext.getCmp("idfiscal").getStore().load();						
					Ext.getCmp("idfiscal").getStore().events.load = true;
					Ext.getCmp("idfiscal").store.on("load",function( Store , records, Object  ) {
						Ext.getCmp("idfiscal").setValue( records[records.length - 1].data.year_en );							
						data_absent_detailGridStore.baseParams		= {
							pis_personel_id:data_pis_personel_id
							,year_en:records[records.length - 1].data.year_en
						}
						data_absent_detailGridStore.load({ params: { start: 0, limit: 20} });
					});	
					data_absent_detailGrid.pis_personel_id = "";
					data_absent_detailGrid.pis_personel_id = data_pis_personel_id;
					loadMask.hide();			
				}
			}
		}
	}
	else if (switch_gov_case == "data_pis_trainning"){
		if (data_pis_personel_id == ""){
			center_govPanel.removeAll();
			center_govPanel.add(data_pis_trainningGrid);
			center_govPanel.add(data_trainning_detailGrid);
			center_govPanel.getLayout().setActiveItem(data_pis_trainningGrid);
			loadMask.hide();			
			data_pis_trainningGridStore.load({ params: { start: 0, limit: 20} });
		}else{
			if (data == undefined ){
				searchId(data_pis_personel_id,"data_pis_trainning");			
			}

			if (data != undefined ){
				if (data == ""){
					Ext.Msg.alert("คำเตือน","กรุณาทำรายการใหม่อีกครั้ง");
					loadMask.hide();
				}else{				
					center_govPanel.removeAll();
					center_govPanel.add(data_pis_trainningGrid);
					center_govPanel.add(data_trainning_detailGrid);
					center_govPanel.getLayout().setActiveItem(data_trainning_detailGrid);
					data_trainning_detailGridStore.baseParams		= {
						pis_personel_id:data_pis_personel_id
					}
					data_trainning_detailGridStore.load({ params: { start: 0, limit: 20} }); 		
					data_trainning_detailGrid.pis_personel_id = "";
					data_trainning_detailGrid.pis_personel_id = data_pis_personel_id;
					loadMask.hide();
				}
			}
		}
	}
	else if (switch_gov_case == "data_pis_insig"){
		if (data_pis_personel_id == ""){
			center_govPanel.removeAll();
			center_govPanel.add(data_pis_insigGrid);
			center_govPanel.add(data_insig_detailGrid);
			center_govPanel.getLayout().setActiveItem(data_pis_insigGrid);
			loadMask.hide();			
			data_pis_insigGridStore.load({ params: { start: 0, limit: 20} });
		}else{
			if (data == undefined ){
				searchId(data_pis_personel_id,"data_pis_insig");			
			}

			if (data != undefined ){
				if (data == ""){
					Ext.Msg.alert("คำเตือน","กรุณาทำรายการใหม่อีกครั้ง");
					loadMask.hide();
				}else{				
					center_govPanel.removeAll();
					center_govPanel.add(data_pis_insigGrid);
					center_govPanel.add(data_insig_detailGrid);
					center_govPanel.getLayout().setActiveItem(data_insig_detailGrid);
					data_insig_detailGridStore.baseParams		= {
						pis_personel_id:data_pis_personel_id
					}
					data_insig_detailGridStore.load({ params: { start: 0, limit: 20} }); 		
					data_insig_detailGrid.pis_personel_id = "";
					data_insig_detailGrid.pis_personel_id = data_pis_personel_id;
					loadMask.hide();
				}
			}
		}
	}
	else if (switch_gov_case == "data_pis_punish"){
		if (data_pis_personel_id == ""){
			center_govPanel.removeAll();
			center_govPanel.add(data_pis_punishGrid);
			center_govPanel.add(data_punish_detailGrid);
			center_govPanel.getLayout().setActiveItem(data_pis_punishGrid);
			loadMask.hide();			
			data_pis_punishGridStore.load({ params: { start: 0, limit: 20} });
		}else{
			if (data == undefined ){
				searchId(data_pis_personel_id,"data_pis_punish");			
			}

			if (data != undefined ){
				if (data == ""){
					Ext.Msg.alert("คำเตือน","กรุณาทำรายการใหม่อีกครั้ง");
					loadMask.hide();
				}else{
					center_govPanel.removeAll();
					center_govPanel.add(data_pis_punishGrid);
					center_govPanel.add(data_punish_detailGrid);
					center_govPanel.getLayout().setActiveItem(data_punish_detailGrid);
					data_punish_detailGridStore.baseParams		= {
						pis_personel_id:data_pis_personel_id
					}
					data_punish_detailGridStore.load({ params: { start: 0, limit: 20} }); 		
					data_punish_detailGrid.pis_personel_id = "";
					data_punish_detailGrid.pis_personel_id =data_pis_personel_id;
					loadMask.hide();
				}
			}
		}
	}

	
}

function searchId(pis_personel_id,url){
	Ext.Ajax.request({
		url				: '/'+url+'/search_id'
		,params		: {
			pis_personel_id		: pis_personel_id
		}
		,success		: function(response, opts) {
			var obj = Ext.decode(response.responseText);
			if (obj.record != undefined){
				switchGov(obj.data,obj.record);
			}else{
				switchGov(obj.data);
			}
		}
		,failure			: function(response, opts) {
			switchGov("");
		}
	});
}




var summary_govPanel = new Ext.Panel({	
	region		: "north"
	,border		: false
	,height		: 150
	,frame		: true
	//,title			: "SUMMARY"
});

var menu_govPanel = new Ext.Panel({	
	region				: "center"
	,border				: false
	,layout				: "vbox"
	,frame				: true
	,title					: "MENU"
	,autoScroll		: true
	,layoutConfig	: {
		pack			: "center"		
		,align		:'center'
		,padding	:'5'
    }
	,defaults			:{margins:'0 0 5 0'}
	,items				: [
		{//1
			xtype		: "button"
			,width		: 128
			,text		: "ข้อมูลตำแหน่ง(จ.18)"	
			,handler	: function(){
				loadMask.show();
				switch_gov_case = "j18";
				Ext.ux.OnDemandLoad.load('/javascripts/gov/j18.js',"switchGov");	
			}
		},{	//2
			xtype		: "button"
			,width		: 128			
			,text		: "ปฏิบัติราชการปัจจุบัน"
			,handler	: function(){
				loadMask.show();
				switch_gov_case = "perform_person_now";
				Ext.ux.OnDemandLoad.load('/javascripts/gov/perform_person_now.js',"switchGov");	
			}
		},{	//3
			xtype		: "button"
			,width		: 128			
			,text			: "ประวัติการรับราชการ"
			,handler	: function(){
				loadMask.show();
				switch_gov_case = "data_pisposhis";
				Ext.ux.OnDemandLoad.load('/javascripts/gov/data_pisposhis.js',"switchGov");	
			}
		},{	//4
			xtype		: "button"
			,width		: 128			
			,text			: "ข้อมูลส่วนตัว"
			,handler	: function(){
				loadMask.show();
				switch_gov_case = "data_personal";
				Ext.ux.OnDemandLoad.load('/javascripts/gov/data_personal.js',"switchGov");	
			}
		},{	
			xtype		: "button"
			,width		: 128			
			,text		: "การศึกษา"
			,handler	: function(){
				loadMask.show();
				switch_gov_case = "data_education";
				Ext.ux.OnDemandLoad.load('/javascripts/gov/data_education.js',"switchGov");	
			}
		},{	
			xtype		: "button"
			,width		: 128			
			,text			: "การลา"
			,handler	: function(){
				loadMask.show();
				switch_gov_case = "data_pis_absent";
				Ext.ux.OnDemandLoad.load('/javascripts/gov/data_pis_absent.js',"switchGov");	
			}
		},{	
			xtype		: "button"
			,width		: 128			
			,text			: "การประชุม/อบรม"
			,handler	: function(){
				loadMask.show();
				switch_gov_case = "data_pis_trainning";
				Ext.ux.OnDemandLoad.load('/javascripts/gov/data_pis_trainning.js',"switchGov");	
			}			
		},{	
			xtype		: "button"
			,width		: 128			
			,text			: "ประวัติเครื่อราชย์"
			,handler	: function(){
				loadMask.show();
				switch_gov_case = "data_pis_insig";
				Ext.ux.OnDemandLoad.load('/javascripts/gov/data_pis_insig.js',"switchGov");	
			}	
		},{	
			xtype		: "button"
			,width		: 128			
			,text			: "โทษทางวินัย"
			,handler	: function(){
				loadMask.show();
				switch_gov_case = "data_pis_punish";
				Ext.ux.OnDemandLoad.load('/javascripts/gov/data_pis_punish.js',"switchGov");	
			}			
		}					
	]
});


var east_govPanel = new Ext.Panel({	
	region		: "east"
	,border		: false
	,layout		: "border"
	,width		: 200
	,frame		: true	
	,items		: [summary_govPanel,menu_govPanel]
});

var center_govPanel = new Ext.Panel({
	region		: "center"
	,border		: false
	,layout		: "card"
	,listeners: {
		beforedestroy: function(p){
			center_govPanel.removeAll();
		}
	}
});


var govPanel = new Ext.Panel({	
	title					: "ตำแหน่งและทะเบียนประวัติราชการ"
	,layout				: "border"
	,border				: false
	,layoutConfig	: {
		deferredRender		: true
	}
	,items				: [center_govPanel,east_govPanel]
})