class J18Controller < ApplicationController
  skip_before_filter :verify_authenticity_token
  def read_j18
    limit = params[:limit]
    start = params[:start]
    
    case_search = ""
    if !(params[:query].nil?)
	    field_search = ActiveSupport::JSON.decode(params[:fields])	    
	    field_search.collect!{|x| (x =="id")? "pj.id":x}
	    field_search.collect!{|x| (x =="posid")? "pj.posid":x}
	    field_search.collect!{|x| (x =="poscode")? "cp.poscode":x}
	    field_search.collect!{|x| (x =="mincode")? "cm.mincode":x}
	    field_search.collect!{|x| (x =="deptcode")? "cd.deptcode":x}
	    field_search.collect!{|x| (x =="sdcode")? "csd.sdcode":x}
	    field_search.collect!{|x| (x =="posname")? "cp.posname":x}
	    field_search.collect!{|x| (x =="minname")? "cm.minname":x}
	    field_search.collect!{|x| (x =="deptname")? "cd.deptname":x}
	    field_search.collect!{|x| (x =="sdname")? "csd.sdname":x}
	    field_search.collect!{|x| (x =="c")? "pj.c":x}
	    field_search.collect!{|x| (x =="salary")? "pj.salary":x}	    
	    allfields = field_search.join('::varchar||') + "::varchar"
	    case_search = "and ( "+allfields + " LIKE '%" + params[:query] + "%'" + " )"
	  end
    
    if !(params[:searchform].nil?)
      tmp_search = Array.new()
      itmp_search = 0
      if params[:provcode_searchform] != ''
        tmp_search[itmp_search] = "csd.provcode = #{params[:provcode_searchform]}"
        itmp_search = itmp_search+1
      end
      if params[:sdtcode_searchform] != ''
        tmp_search[itmp_search] = "csd.sdtcode = #{params[:sdtcode_searchform]}"
        itmp_search = itmp_search+1
      end
      if params[:amcode_searchform] != ''
        tmp_search[itmp_search] = "csd.amcode = #{params[:amcode_searchform]}"
        itmp_search = itmp_search+1
      end
      if params[:sdcode_searchform] != ''
        tmp_search[itmp_search] = "csd.sdcode = #{params[:sdcode_searchform]}"
        itmp_search = itmp_search+1
      end
      if params[:tmcode_searchform] != ''
        tmp_search[itmp_search] = "csd.tmcode = #{params[:tmcode_searchform]}"
        itmp_search = itmp_search+1
      end        
      if params[:status_pos_searchform] == '0' 
         tmp_search[itmp_search] = " ( pj.pis_personel_id = '' or pj.pis_personel_id is null )"
         itmp_search = itmp_search+1
      end
      if params[:status_pos_searchform] == '1'
          tmp_search[itmp_search] = " ( pj.pis_personel_id != '' and pj.pis_personel_id is not null )"
          itmp_search = itmp_search+1
      end      
      if tmp_search.length > 0
        case_search = case_search + " and "+tmp_search.join(" and ")
      end      
    end
    
    sql =<<-EOF
              SELECT 
                        pj.id
                        ,pj.posid
                        ,pj.pis_personel_id
                        ,cp.poscode
                        ,cm.mincode
                        ,cd.deptcode
                        ,csd.sdcode
                        ,cp.posname
                        ,cm.minname
                        ,cd.deptname
                        ,csd.sdname
                        ,pj.c
                        ,pj.salary 
                        ,pp.fname
                        ,pp.lname
                        ,cpf.prename
                FROM 
                        pis_j18s as pj
                        left join code_positions as cp on pj.poscode = cp.poscode
                        left join code_minis as cm on pj.mincode = cm.mincode
                        left join code_depts as cd on pj.deptcode = cd.deptcode 
                        left join code_sdepts as csd on pj.sdcode = csd.sdcode
                        left join pis_personels as pp on pj.pis_personel_id = pp.pis_personel_id
                        left join code_prefixes as cpf on pp.precode = cpf.precode
                WHERE 
                        pj.flagupdate = '1' 
    EOF
              
    sql = sql +case_search
    rs = PisJ18.find_by_sql(sql+" order by pj.posid limit #{limit} offset #{start} ")
    return_data = Hash.new()
    return_data[:totalCount] = PisJ18.find_by_sql(sql).length
    return_data[:records] 	 = rs.collect{|u| {		
    	:id                => u.id,
      :pis_personel_id   => u.pis_personel_id,
    	:posid             => u.posid,
    	:poscode           => u.poscode,
    	:mincode           => u.mincode,
    	:deptcode          => u.deptcode,
    	:sdcode            => u.sdcode,
    	:posname           => u.posname,
    	:minname           => u.minname,
    	:deptname          => u.deptname,
    	:sdname	           => u.sdname,
    	:c                 => u.c,
    	:salary 	         => u.salary,
      :fname             => u.fname,
      :lname             => u.lname,
      :prename           => u.prename
    } }              
    render :text => return_data.to_json, :layout => false
  end
  
  def create_j18
     count_check = PisJ18.count(:all, :conditions => "posid = '#{params[:posid]}'")
     if count_check > 0
            return_data = Hash.new()
            return_data[:success] = false
            return_data[:msg] = "มีรหัสตำแหน่งนี้แล้ว"
            render :text => return_data.to_json, :layout=>false
    else
            store = PisJ18.new(
                                :posid						=> params[:posid],
                                :divcode					=> params[:divname_id],
                                :deptcode					=> params[:deptname_id],
                                :sdcode						=> params[:sdname_id],
                                :sectcode					=> params[:sectname_id2],
                                :jobcode					=> params[:jobname_id],
                                :poscode					=> params[:posname_id],
                                :excode						=> params[:exname_id],
                                :epcode						=> params[:expert_id],
                                :lastc						=> params[:lastc],
                                :lastsal					=> params[:lastsal],
                                :nowc						  => params[:nowc],
                                :nowsal						=> params[:nowsal],
                                :lastcasb					=> params[:lastcasb],
                                :lastsalasb				=> params[:lastsalasb],
                                :nowcasb					=> params[:nowcasb],
                                :nowsalasb				=> params[:nowsalasb],
                                :posmny					  => params[:posmny],
                                :bkdmny						=> params[:bkdmny],
                                :incode						=> params[:inname_id],
                                :pcdcode					=> params[:pcdcode],
                                :ptcode						=> params[:ptname_id],
                                :rem						  => params[:rem],
                                :emptydate				=> to_date_i(params[:cp_emptydate]),
                                :asbdate					=> to_date_i(params[:cp_asbdate]),
                                :c						  	=> params[:c],
                                :salary						=> params[:salary],
                                :mincode				  => params[:minname_id],
                                :subdcode				  => params[:sectname_id1],
                                :octsalary			  => params[:octsalary],
                                :octc						  => params[:octc],
                                :aprsalary				=> params[:aprsalary],
                                :aprc						  => params[:aprc],
                                :rem2						  => params[:rem2],
                                :flagupdate       => 1
            )
            store.save
            return_data = Hash.new()
            return_data[:success] = true            
            render :text => return_data.to_json, :layout => false
     end
  end
  
  def search_edit_j18
    sql = " select pj.asbdate,pj.emptydate,pj.rem,pj.rem2,pj.posmny,pj.pcdcode,pj.bkdmny,pj.id ,pj.posid,pj.c,pj.salary,pj.lastc,pj.lastcasb,pj.octc,pj.lastsal,pj.lastsalasb,pj.octsalary,pj.nowc,pj.nowcasb,pj.aprc,pj.nowsal,pj.nowsalasb,pj.aprsalary,cp.poscode,cp.shortpre as pre_posname,cp.posname,cv.incode,cv.inname,cpt.ptcode,cpt.ptname,cex.excode,cex.exname,cex.shortpre as pre_exname,cep.epcode,cep.prename as pre_expert,cep.expert,cmn.mincode,cmn.minname,cd.deptcode,cd.deptname,cdiv.divcode,cdiv.prefix as pre_divname,cdiv.divname ,csd.sdcode,csd.shortpre as pre_sdname,csd.sdname	,cj.jobcode	,cj.jobname from pis_j18s pj left join code_positions cp 		on  pj.poscode 	= cp.poscode	left join code_intervals cv 		on  pj.incode 	= cv.incode	left join code_postypes cpt 		on pj.ptcode 	= cpt.ptcode 	left join code_executives cex 		on pj.excode 	= cex.excode	left join code_experts cep 		on pj.epcode 	= cep.epcode	left join code_minis cmn 		on pj.mincode 	= cmn.mincode	left join code_depts cd       		on pj.deptcode	= cd.deptcode	left join code_divs cdiv		on pj.divcode	= cdiv.divcode	left join code_sdepts csd		on pj.sdcode	= csd.sdcode	left join code_jobs cj			on pj.jobcode	= cj.jobcode where pj.id = '#{params[:id]}'"
    rs_sum = PisJ18.find_by_sql(sql)    
    sql = "select pj.subdcode ,cs.sectname from pis_j18s pj left join code_sects cs on pj.subdcode = cs.sectcode where pj.id = '#{params[:id]}'"
    rs_subdcode = PisJ18.find_by_sql(sql)    
    sql = "select pj.sectcode ,cs.sectname from pis_j18s pj left join code_sects cs on pj.sectcode = cs.sectcode where pj.id = '#{params[:id]}'"
    rs_sectcode = PisJ18.find_by_sql(sql)          
    return_data = Hash.new()
    return_data[:data] = [
          :id                    => rs_sum[0][:id],
          :asbdate               => (rs_sum[0][:asbdate] == nil)? 		"":rs_sum[0][:asbdate],
          :emptydate             => (rs_sum[0][:emptydate] == nil)? 	"":rs_sum[0][:emptydate],
          :rem                   => (rs_sum[0][:rem] == nil)? 		"":rs_sum[0][:rem],
          :rem2                  => (rs_sum[0][:rem2] == nil)? 		"":rs_sum[0][:rem2],
          :posmny                => (rs_sum[0][:posmny] == nil)? 		"":rs_sum[0][:posmny],
          :pcdcode               => (rs_sum[0][:pcdcode] == nil)? 		"":rs_sum[0][:pcdcode],
          :bkdmny                => (rs_sum[0][:bkdmny] == nil)? 		"":rs_sum[0][:bkdmny],
          :octsalary             => (rs_sum[0][:octsalary] == nil)? 	"":rs_sum[0][:octsalary],
			    :posid                 => (rs_sum[0][:posid] == nil)? 		"":rs_sum[0][:posid],
			    :c                     => (rs_sum[0][:c] == nil)? 		"":rs_sum[0][:c],
			    :salary                => (rs_sum[0][:salary] == nil)? 		"":rs_sum[0][:salary],
			    :lastc                 => (rs_sum[0][:lastc] == nil)? 		"":rs_sum[0][:lastc],
			    :lastcasb              => (rs_sum[0][:lastcasb] == nil)? 	"":rs_sum[0][:lastcasb],
			    :octc                  => (rs_sum[0][:octc] == nil)? 		"":rs_sum[0][:octc],
			    :lastsal               => (rs_sum[0][:lastsal] == nil)? 		"":rs_sum[0][:lastsal],
			    :lastsalasb            => (rs_sum[0][:lastsalasb] == nil)? 	"":rs_sum[0][:lastsalasb],
			    :nowc                  => (rs_sum[0][:nowc] == nil)? 		"":rs_sum[0][:nowc],
			    :nowcasb               => (rs_sum[0][:nowcasb] == nil)? 		"":rs_sum[0][:nowcasb],
			    :aprc                  => (rs_sum[0][:aprc] == nil)? 		"":rs_sum[0][:aprc],
			    :nowsal                => (rs_sum[0][:nowsal] == nil)? 		"":rs_sum[0][:nowsal],
			    :nowsalasb             => (rs_sum[0][:nowsalasb] == nil)? 	"":rs_sum[0][:nowsalasb],
			    :aprsalary             => (rs_sum[0][:aprsalary] == nil)?	"":rs_sum[0][:aprsalary],
			    :poscode               => (rs_sum[0][:poscode] == nil)?		"":rs_sum[0][:poscode],
			    :pre_posname           => (rs_sum[0][:pre_posname] == nil)?	"":rs_sum[0][:pre_posname],
			    :posname               => (rs_sum[0][:posname] == nil)?		"":rs_sum[0][:posname],
			    :incode                => (rs_sum[0][:incode] == nil)?		"":rs_sum[0][:incode],
			    :inname                => (rs_sum[0][:inname] == nil)?		"":rs_sum[0][:inname],
			    :ptcode                => (rs_sum[0][:ptcode] == nil)?		"":rs_sum[0][:ptcode],
			    :ptname                => (rs_sum[0][:ptname] == nil)?		"":rs_sum[0][:ptname],
			    :excode                => (rs_sum[0][:excode] == nil)?		"":rs_sum[0][:excode],
			    :exname                => (rs_sum[0][:exname] == nil)?		"":rs_sum[0][:exname],
			    :pre_exname            => (rs_sum[0][:pre_exname] == nil)?	"":rs_sum[0][:pre_exname],
			    :epcode                => (rs_sum[0][:epcode] == nil)?		"":rs_sum[0][:epcode],
			    :pre_expert            => (rs_sum[0][:pre_expert] == nil)?	"":rs_sum[0][:pre_expert],
			    :expert                => (rs_sum[0][:expert] == nil)?		"":rs_sum[0][:expert],
			    :mincode               => (rs_sum[0][:mincode] == nil)?		"":rs_sum[0][:mincode],
			    :minname               => (rs_sum[0][:minname] == nil)?		"":rs_sum[0][:minname],
			    :deptcode              => (rs_sum[0][:deptcode] == nil)?		"":rs_sum[0][:deptcode],
			    :deptname              => (rs_sum[0][:deptname] == nil)?		"":rs_sum[0][:deptname],
			    :divcode               => (rs_sum[0][:divcode] == nil)?		"":rs_sum[0][:divcode],
			    :pre_divname           => (rs_sum[0][:pre_divname] == nil)?	"":rs_sum[0][:pre_divname],
			    :divname               => (rs_sum[0][:divname] == nil)?		"":rs_sum[0][:divname],
			    :sdcode                => (rs_sum[0][:sdcode] == nil)?		"":rs_sum[0][:sdcode],
			    :pre_sdname            => (rs_sum[0][:pre_sdname] == nil)?	"":rs_sum[0][:pre_sdname],
			    :sdname                => (rs_sum[0][:sdname] == nil)?		"":rs_sum[0][:sdname],
			    :jobcode               => (rs_sum[0][:jobcode] == nil)? 		"":rs_sum[0][:jobcode],
			    :jobname               => (rs_sum[0][:jobname] == nil)?		"":rs_sum[0][:jobname],
			    :subdcode              => (rs_subdcode[0][:subdcode] == nil)?	"":rs_subdcode[0][:subdcode],
			    :subdname              => (rs_subdcode[0][:sectname] == nil)?	"":rs_subdcode[0][:sectname],
			    :sectcode              => (rs_sectcode[0][:sectcode] == nil)?	"":rs_sectcode[0][:sectcode],
			    :sectname              => (rs_sectcode[0][:sectname] == nil)?	"":rs_sectcode[0][:sectname] 
    ]               
    render :text => return_data.to_json, :layout => false
  end
  
  def update_j18
   count_check = PisJ18.count(:all, :conditions => "posid = '#{params[:posid]}' and id != '#{params[:id]}'")
   if count_check > 0
          return_data = Hash.new()
          return_data[:success] = false
          return_data[:msg] = "มีรหัสตำแหน่งนี้แล้ว"
          render :text => return_data.to_json, :layout=>false
    else 
          update_record = PisJ18.find(params[:id])
          update_record.update_attributes(
                              :posid						=> params[:posid],
                              :divcode					=> params[:divname_id],
                              :deptcode					=> params[:deptname_id],
                              :sdcode						=> params[:sdname_id],
                              :sectcode					=> params[:sectname_id2],
                              :jobcode					=> params[:jobname_id],
                              :poscode					=> params[:posname_id],
                              :excode						=> params[:exname_id],
                              :epcode						=> params[:expert_id],
                              :lastc						=> params[:lastc],
                              :lastsal					=> params[:lastsal],
                              :nowc						=> params[:nowc],
                              :nowsal						=> params[:nowsal],
                              :lastcasb					=> params[:lastcasb],
                              :lastsalasb					=> params[:lastsalasb],
                              :nowcasb					=> params[:nowcasb],
                              :nowsalasb					=> params[:nowsalasb],
                              :posmny					    	=> params[:posmny],
                              :bkdmny						=> params[:bkdmny],
                              :incode						=> params[:inname_id],
                              :pcdcode					=> params[:pcdcode],
                              :ptcode						=> params[:ptname_id],
                              :rem						=> params[:rem],
                              :emptydate					=> to_date_i(params[:cp_emptydate]),
                              :asbdate					=> to_date_i(params[:cp_asbdate]),
                              :c						=> params[:c],
                              :salary						=> params[:salary],
                              :mincode				    	=> params[:minname_id],
                              :subdcode				    	=> params[:sectname_id1],
                              :octsalary					=> params[:octsalary],
                              :octc						=> params[:octc],
                              :aprsalary					=> params[:aprsalary],
                              :aprc						=> params[:aprc],
                              :rem2						=> params[:rem2],
                              :flagupdate                 			=> 1            
          )
          if update_record.save
                  render :text => "{success:true}"
          else
                  render :text => "{success:false,msg:'เกิดความผิดพลาด'}"
          end
    end
  end
  
  def deletej18    
    id = params[:id]
    if PisJ18.delete(id)
            render :text => "{success:true}"
    else
            render :text => "{success:false}"
    end       
  end
  
  
  def search_id
    rs = PisJ18.find(:first,:conditions => "pis_personel_id = '#{params[:pis_personel_id]}'")
    render :text => "{data:#{(rs.nil?)? "''":rs.id  }}" ,:layout => false
  end
  
end
