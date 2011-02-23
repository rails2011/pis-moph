if(Ext.isChrome===true){
  var chromeDatePickerCSS = ".x-date-picker {border-color: #1b376c;background-color:#fff;position: relative;width: 185px;}";
  Ext.util.CSS.createStyleSheet(chromeDatePickerCSS,'chromeDatePickerStyle');
}

var loadMask = new Ext.LoadMask(Ext.getBody(), {msg:"Please wait..."});
var rowNumberer = function(value, p, record) {
		var ds = record.store
		var i = (ds.lastOptions != null && ds.lastOptions.params)? ds.lastOptions.params.start:0;
		if (isNaN ( i )) {
			i = 0;
		}
		return ds.indexOf(record)+i+1;
};

var cur_ref = '';

function  initCode(){
	var store, grid, obj;
	if (cur_ref == 'position'){
		store = code_positionGridStore;
		grid = code_positionGrid;
	}
	else if (cur_ref == 'executive'){
		store = code_executiveGridStore;
		grid = code_executiveGrid;
	}
	else if (cur_ref == 'expert'){
		store = code_expertGridStore;
		grid = code_expertGrid;
	}
	else if (cur_ref == 'postype'){
		store = code_postypeGridStore;
		grid = code_postypeGrid;
	}
	else if (cur_ref == 'grouplevel'){
		store = code_grouplevelGridStore;
		grid = code_grouplevelGrid;
	}
	else if (cur_ref == 'epngroup'){
		store = code_epngroupGridStore;
		grid = code_epngroupGrid;
	}
	else if (cur_ref == 'epnsubgroup'){
		store = code_epnsubgroupGridStore;
		grid = code_epnsubgroupGrid;
	}
	else if (cur_ref == 'epnposwork'){
		store = code_epnposworkGridStore;
		grid = code_epnposworkGrid;
	}
	else if (cur_ref == 'update'){
		store = code_updateGridStore;
		grid = code_updateGrid;
	}
	else if (cur_ref == 'qualify'){
		store = code_qualifyGridStore;
		grid = code_qualifyGrid;
	}
	else if (cur_ref == 'edulevel'){
		store = code_edulevelGridStore;
		grid = code_edulevelGrid;
	}
	else if (cur_ref == 'major'){
		store = code_majorGridStore;
		grid = code_majorGrid;
	}
	else if (cur_ref == 'ministry'){
		store = code_minisGridStore;
		grid = code_minisGrid;
	}
	else if (cur_ref == 'department'){
		store = code_deptGridStore;
		grid = code_deptGrid;
	}
	else if (cur_ref == 'division'){
		store = code_divGridStore;
		grid = code_divGrid;
	}
	else if (cur_ref == 'subdepttype'){
		store = code_sdtypeGridStore;
		grid = code_sdtypeGrid;
	}
	else if (cur_ref == 'subdept'){
		store = code_sdeptGridStore;
		grid = code_sdeptGrid;
	}
	else if (cur_ref == 'section'){
		store = code_sectGridStore;
		grid = code_sectGrid;
	}
	else if (cur_ref == 'job'){
		store = code_jobGridStore;
		grid = code_jobGrid;
	}
	else if (cur_ref == 'prefix'){
		store = code_prefixGridStore;
		grid = code_prefixGrid;
	}
	else if (cur_ref == 'marital'){
		store = code_maritalGridStore;
		grid = code_maritalGrid;
	}
	else if (cur_ref == 'absenttype'){
		store = code_abtypeGridStore;
		grid = code_abtypeGrid;
	}
	else if (cur_ref == 'religion'){
		store = code_religGridStore;
		grid = code_religGrid;
	}
	else if (cur_ref == 'punish'){
		store = code_punishGridStore;
		grid = code_punishGrid;
	}
	else if (cur_ref == 'country'){
		store = code_countryGridStore;
		grid = code_countryGrid;
	}
	else if (cur_ref == 'area'){
		store = code_areaGridStore;
		grid = code_areaGrid;
	}
	else if (cur_ref == 'province'){
		store = code_provinceGridStore;
		grid = code_provinceGrid;
	}
	else if (cur_ref == 'amphur'){
		obj = Ext.getCmp('main_center');
		obj.add(code_amphurPanel);
		obj.getLayout().setActiveItem(code_amphurPanel);
		return false; 
	}
	else if (cur_ref == 'tumbon'){
		obj = Ext.getCmp('main_center');
		obj.add(code_tumbonPanel);
		obj.getLayout().setActiveItem(code_tumbonPanel);
		return false; 
		//store = code_tumbonGridStore;
		//grid = code_tumbonGrid;
	}
	else if (cur_ref == 'gov'){
		obj = Ext.getCmp('main_center');
		obj.removeAll();
		obj.add(govPanel);
		obj.getLayout().setActiveItem(govPanel);
		return false; 
	}
	else if (cur_ref == 'code_j18status'){
		store = code_j18statusGridStore;
		grid = code_j18statusGrid;
	}
	else if (cur_ref == 'code_trade'){
		store = code_tradeGridStore;
		grid = code_tradeGrid;
	}
	else if (cur_ref == 'code_finpay'){
		store = code_finpayGridStore;
		grid = code_finpayGrid;
	}
	else if (cur_ref == 'code_decoratype'){
		store = code_decoratypeGridStore;
		grid = code_decoratypeGrid;
	}
	else if (cur_ref == 'searchj18'){
		obj = Ext.getCmp('main_center');
		obj.removeAll();
		obj.add(panelMainSearchJ18);
		obj.getLayout().setActiveItem(panelMainSearchJ18);		
		return false;
	}
	else if (cur_ref == "search_perform_person")	{
		obj = Ext.getCmp('main_center');
		obj.removeAll();
		obj.add(panelMainSearchperform_person);
		obj.getLayout().setActiveItem(panelMainSearchperform_person);		
		return false;
	}

	store.load({ params: { start: 0, limit: 20} });
	obj = Ext.getCmp('main_center');
	obj.removeAll();
	obj.add(grid);
	obj.getLayout().setActiveItem(grid);
}


Ext.onReady(function(){
	Ext.QuickTips.init();
	Ext.BLANK_IMAGE_URL = '/images/s.gif';
	/*	
	Date.monthNames = ['1','2','3','4','5','6','7','8','9','10','11','12'];	
	*/
	Date.monthNames = ['ม.ค','ก.พ','มี.ค','เม.ย','พ.ค','มิ.ย','ก.ค','ส.ค','ก.ย','ต.ค','พ.ย','ธ.ค'];
	var tmenu = new Ext.Toolbar({
		region		:'north',
		height		: 30,
		items		: [
			{
				text		: "ข้อมูลบุคคล"
				,menu	: {
					items	:[
						{
							text			: "ข้าราชการ"
							,handler	: function (){									
								cur_ref = "gov";								
								Ext.ux.OnDemandLoad.load('/javascripts/gov/layout.js','initCode');
							}
						}	
					]
				}
			},{
				text: "สอบถาม"
				,menu	: {
					items	: [
						{
							text: "ข้อมูลตำแหน่ง(จ. 18)"
							,handler	: function (){
								cur_ref = "searchj18";
								Ext.ux.OnDemandLoad.load('/javascripts/search/searchj18.js','initCode');
							}
						},'-',{
							text: "ปฏิบัติราชการปัจจุบัน / ข้อมูลส่วนตัว"
							,handler	: function (){
								cur_ref = "search_perform_person";
								Ext.ux.OnDemandLoad.load('/javascripts/search/search_perform_person.js','initCode');
							}
						}
					]
				}
			},{
				text		: "รหัสข้อมูล"
				,menu	: {
					items	: [
						{
							text		: "ตำแหน่งข้าราชการ"
							,menu	: {
								items		: [
									{
										text			: "ตำแหน่งสายงานข้าราชการ"
										,handler	: function (){
											cur_ref = "position";
											Ext.ux.OnDemandLoad.load('/javascripts/code/code_position.js','initCode');
										}
									},{
										text		: "ตำแหน่งบริหาร"
										,handler	: function (){
											cur_ref = "executive";
											Ext.ux.OnDemandLoad.load('/javascripts/code/code_executive.js','initCode');
										}
									},{
										text		: "ความเชี่ยวชาญ"
										,handler	: function (){
											cur_ref = "expert";
											Ext.ux.OnDemandLoad.load('/javascripts/code/code_expert.js','initCode');
										}
									},{
										text		: "ว. / วช. / ชช."
										,handler	: function (){
											cur_ref = "postype";
											Ext.ux.OnDemandLoad.load('/javascripts/code/code_postype.js','initCode');
										}
									},{
										text		: "กลุ่ม / ระดับ"
										,handler	: function (){
											cur_ref = "grouplevel";
											Ext.ux.OnDemandLoad.load('/javascripts/code/code_grouplevel.js','initCode');
										}
									}
								] 
							}
						},{
							text		: "ตำแหน่งลูกจ้างประจำ"
							,menu	: {
								items		: [
									{
										text		: "กลุ่ม"
										,handler	: function (){
											cur_ref = "epngroup";
											Ext.ux.OnDemandLoad.load('/javascripts/code/code_epngroup.js','initCode');
										}
									},{
										text		: "หมวด"
										,handler	: function (){
											cur_ref = "epnsubgroup";
											Ext.ux.OnDemandLoad.load('/javascripts/code/code_epnsubgroup.js','initCode');
										}
									},{
										text		: "ตำแหน่งลูกจ้างประจำ"
										,handler	: function (){
											cur_ref = "epnposwork";
											Ext.ux.OnDemandLoad.load('/javascripts/code/code_epnposwork.js','initCode');
										}
									}
								]
							}
						},{
							text		: "รหัสการเคลื่อนไหว"
							,handler	: function (){
								cur_ref = "update";
								Ext.ux.OnDemandLoad.load('/javascripts/code/code_update.js','initCode');
							}
						},{
							text		: "สถานะตาม จ. 18"
							,handler	: function (){
								cur_ref = 'code_j18status'
								Ext.ux.OnDemandLoad.load('/javascripts/code/code_j18status.js','initCode');
							}							
						},{
							text		: "ใบอนุญาตประกอบวิชาชีพ"
							,handler	: function (){
								cur_ref = 'code_trade'
								Ext.ux.OnDemandLoad.load('/javascripts/code/code_trade.js','initCode');
							}							
						},{
							text		: "การศึกษา"
							,menu	: {
								items		: [
									{
										text		: "วุฒิการศึกษา"
										,handler	: function (){
											cur_ref = "qualify";
											Ext.ux.OnDemandLoad.load('/javascripts/code/code_qualify.js','initCode');
										}
									},{
										text		: "ระดับการศึกษา"
										,handler	: function (){
											cur_ref = "edulevel";
											Ext.ux.OnDemandLoad.load('/javascripts/code/code_edulevel.js','initCode');
										}
									},{
										text		: "สาขาวิชาเอก"
										,handler	: function (){
											cur_ref = "major";
											Ext.ux.OnDemandLoad.load('/javascripts/code/code_major.js','initCode');
										}
									},{
										text		: "สาขาเฉพาะทาง"
									}
								]
							}
						},{
							text		: "หน่วยงาน"
							,menu	: {
								items		:[
									{
										text		: "กระทรวง"
										,handler	: function (){
											cur_ref = "ministry";
											Ext.ux.OnDemandLoad.load('/javascripts/code/code_minis.js','initCode');
										}
									},{
										text		: "กรม"
										,handler	: function (){
											cur_ref = "department";
											Ext.ux.OnDemandLoad.load('/javascripts/code/code_dept.js','initCode');
										}
									},{
										text		: "กอง"
										,handler	: function (){
											cur_ref = "division";
											Ext.ux.OnDemandLoad.load('/javascripts/code/code_div.js','initCode');
										}
									},{
										text		: "ประเภทหน่วยงาน"
										,handler	: function (){
											cur_ref = "subdepttype";
											Ext.ux.OnDemandLoad.load('/javascripts/code/code_sdtype.js','initCode');
										}
									},{
										text		: "หน่วยงานในส่วนภูมิภาค"
										,handler	: function (){
											cur_ref = "subdept";
											Ext.ux.OnDemandLoad.load('/javascripts/code/code_sdept.js','initCode');
										}
									},{
										text		: "ฝ่าย / กลุ่ม / กลุ่มงาน"
										,handler	: function (){
											cur_ref = "section";
											Ext.ux.OnDemandLoad.load('/javascripts/code/code_sect.js','initCode');
										}
									},{
										text		: "งาน"
										,handler	: function (){
											cur_ref = "job";
											Ext.ux.OnDemandLoad.load('/javascripts/code/code_job.js','initCode');
										}
									}
								]
							}
						},{
							text		: "พื้นที่"
							,menu	: {
								items		:[
									{
										text		: "ประเทศ"
										,handler	: function (){									
											cur_ref = "country";								
											Ext.ux.OnDemandLoad.load('/javascripts/code/code_country.js','initCode');
										}
									},{
										text		: "เขต"
										,handler	: function (){									
											cur_ref = "area";								
											Ext.ux.OnDemandLoad.load('/javascripts/code/code_area.js','initCode');
										}
									},{
										text		: "จังหวัด"
										,handler	: function (){									
											cur_ref = "province";								
											Ext.ux.OnDemandLoad.load('/javascripts/code/code_province.js','initCode');
										}
										//,handler	: function (){
										//	main_center.getLayout().setActiveItem(code_provinceGrid);
										//	code_provinceGridStore.load({ params: { start: 0, limit: 20} });
										//}
									},{
										text		: "อำเภอ"
										,handler	: function (){									
											cur_ref = "amphur";								
											Ext.ux.OnDemandLoad.load('/javascripts/code/code_amphur.js','initCode');
										}
										//,handler	: function (){
										//	main_center.getLayout().setActiveItem(code_amphurPanel);											
										//}
									},{
										text		: "ตำบล"
										,handler	: function (){									
											cur_ref = "tumbon";								
											Ext.ux.OnDemandLoad.load('/javascripts/code/code_tumbon.js','initCode');
										}
										//,handler	: function (){
										//	main_center.getLayout().setActiveItem(code_tumbonPanel);
										//}
									},{
										text		: "คลังเบิกจ่าย"
										,handler	: function (){									
											cur_ref = "code_finpay";								
											Ext.ux.OnDemandLoad.load('/javascripts/code/code_finpay.js','initCode');
										}
									}
								]
							}
						},{
							text		: "คำนำหน้าชื่อ"
							,handler	: function (){
								cur_ref = "prefix";
								Ext.ux.OnDemandLoad.load('/javascripts/code/code_prefix.js','initCode');
							}
						},{
							text		: "รหัสการเปลี่ยนชื่อนามสกุล"
						},{
							text		: "ความสัมพันธ์ในครอบครัว"
						},{
							text		: "สถานะภาพสมรส"
							,handler	: function (){
								cur_ref = "marital";
								Ext.ux.OnDemandLoad.load('/javascripts/code/code_marital.js','initCode');
							}
						},{
							text		: "ประเภทการลา"
							,handler	: function (){
								cur_ref = "absenttype";
								Ext.ux.OnDemandLoad.load('/javascripts/code/code_abtype.js','initCode');
							}
						},{
							text		: "ศาสนา"
							,handler	: function (){
								cur_ref = "religion";
								Ext.ux.OnDemandLoad.load('/javascripts/code/code_relig.js','initCode');
							}
						},{
							text		: "การลงโทษทางวินัย"
							,handler	: function (){
								cur_ref = "punish";
								Ext.ux.OnDemandLoad.load('/javascripts/code/code_punish.js','initCode');
							}
						},{
							text		: "เครื่องราชอิสริยาภรณ์"
							,handler	: function (){
								cur_ref = "code_decoratype";
								Ext.ux.OnDemandLoad.load('/javascripts/code/code_decoratype.js','initCode');
							}
						},{
							text		: "บัญชีเงินเดือน"
						}
					]
				}
			},{
				text		: "ผู้ดูแลระบบ"
				,menu	: {
					items		: [
						{
							text		: "กำหนดหน่วยงานที่ใช้ในโปรแกรม"
						}	
					]
				}
			}
		]
	});

	var main_center = new Ext.Panel({
            region				: 'center'
			,id					: "main_center"
			,layout				: "card"
			,layoutConfig	: {
				deferredRender		: true
			}
			,items				: [ ]
	});


	var viewport = new Ext.Viewport({
		layout			: 'border'
		,items			: [
			tmenu,main_center
		]
	});

    setTimeout(function(){
        Ext.get('loading').remove();
        Ext.get('loading-mask').fadeOut({remove:true});
    }, 250);

});
