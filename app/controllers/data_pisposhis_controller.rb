class DataPisposhisController < ApplicationController
  skip_before_filter :verify_authenticity_token
  def read  
    limit = params[:limit]
    start = params[:start]
    search = Array.new
    case_search = ""
    if !(params[:query].nil?)
      field_search = ActiveSupport::JSON.decode(params[:fields])      
      field_search.collect!{|x| (x =="id")? "pp.id":x}
      field_search.collect!{|x| (x =="pis_personel_id")? "pp.pis_personel_id":x}
      field_search.collect!{|x| (x =="posid")? "pj.posid":x}
      field_search.collect!{|x| (x =="fname")? "pp.fname":x}
      field_search.collect!{|x| (x =="lname")? "pp.lname":x}
      field_search.collect!{|x| (x =="posname")? "cp.posname":x}
      field_search.collect!{|x| (x =="minname")? "cm.minname":x}
      field_search.collect!{|x| (x =="deptname")? "cd.deptname":x}
      field_search.collect!{|x| (x =="sdname")? "csd.sdname":x}
      field_search.collect!{|x| (x =="c")? "pj.c":x}      
      allfields = field_search.join('::varchar||') + "::varchar"
      case_search = " and ( "+allfields + " LIKE '%" + params[:query] + "%'" + " )"      
    end
    sql = <<-EOF
      select
        pp.id 
        ,pp.pis_personel_id
        ,pj.posid
        ,pp.fname
        ,pp.lname
        ,cp.posname
        ,cm.minname
        ,cd.deptname
        ,csd.sdname
        ,pj.c
      from 
        pis_personels   pp
        ,pis_j18s pj
        ,code_positions cp 
        ,code_minis   cm 
        ,code_depts   cd 
        ,code_sdepts  csd
      where
        pp.pis_personel_id  = pj.pis_personel_id and   
        pj.flagupdate       = '1' and 
        pj.poscode          = cp.poscode and 
        pj.mincode          = cm.mincode and 
        pj.deptcode         = cd.deptcode and 
        pj.sdcode           = csd.sdcode 
    EOF
    sql = sql + case_search
    rs = PisPoshis.find_by_sql( sql+" order by pp.id limit #{limit} offset #{start} ")
    return_data = Hash.new()
    return_data[:totalCount] = PisPersonel.find_by_sql(sql).length
    
    
    return_data[:records]   = rs.collect{|u| {
            :id                     => u.id,    
            :pis_personel_id         => u.pis_personel_id,
            :posid                   => u.posid,
            :fname                   => u.fname,
            :lname                   => u.lname,
            :posname                 => u.posname,
            :minname                 => u.minname,
            :deptname                => u.deptname,
            :sdname                  => u.sdname,
            :c                       => u.c
            
    }}
    render :text => return_data.to_json, :layout => false
    
  end

  def search_detail
    limit = params[:limit]
    start = params[:start]
    sql = <<-EOF
                select 
                  pp.id
                  ,pp.historder
                  ,pp.excode
                  ,pp.salary
                  ,pp.refcmnd
                  ,pp.forcedate
                  ,ce.exname
                  ,pp.posid
                  ,cp.poscode
                  ,cp.posname
                from 
                  pis_poshis pp 
                  left join code_executives ce on pp.excode = ce.excode
                  left join code_positions cp on pp.poscode = cp.poscode
        EOF
        
    sql = sql + "where pp.pis_personel_id = '#{params[:pis_personel_id]}'"    
    rs = PisPoshis.find_by_sql( sql+" order by pp.historder limit #{limit} offset #{start} ")
    return_data = Hash.new()
    return_data[:totalCount] = PisPersonel.find_by_sql(sql).length    
    return_data[:records]   = rs.collect{|u| {
            :id                      => u.id,
            :historder               => u.historder,
            :excode                  => u.excode,
            :salary                  => u.salary,
            :refcmnd                 => u.refcmnd,
            :forcedate               => u.forcedate,
            :exname                  => u.exname,
            :posid                    => u.posid,
            :poscode                  => u.poscode,
            :posname                  => u.posname
            
    }}
    render :text => return_data.to_json, :layout => false 
  end

  def add_detail
    sql = "Select max(historder) as n from pis_poshis where pis_personel_id = '#{params[:pis_personel_id]}'"
    rs_count = PisPoshis.find_by_sql(sql)
    store = PisPoshis.new(
                      :historder           => (rs_count[0].n.to_i) +1,
                      :refcmnd             => params[:refcmnd],
                      :updcode             => params[:updcode],
                      :forcedate           => to_date_i(params[:forcedate]),
                      :posid               => params[:posid],
                      :poscode             => params[:poscode],
                      :excode              => params[:excode],
                      :ptcode              => params[:ptcode],
                      :salary              => params[:salary],
                      :c                   => params[:c],
                      :epcode              => params[:epcode],
                      :mincode             => params[:mincode],
                      :deptcode            => params[:deptcode],
                      :divcode             => params[:divcode],
                      :sdcode              => params[:sdcode],
                      :subdcode            => params[:subdcode],
                      :sectcode            => params[:sectcode],
                      :jobcode             => params[:jobcode],
                      :note                => params[:note],
                      :pis_personel_id     => params[:pis_personel_id]

            )
    if store.save
      render :text => "{success:true}",:layout => false
    else
      render :text => "{success:false}",:layout => false
    end
 end
 
  def search_edit
    rs = PisPoshis.find(:all,:conditions => "id = #{params[:id]}")  
    return_data = Hash.new()
    return_data[:data]    = rs.collect{|u| {   
      :id                => u.id,      
      :historder         => u.historder,
      :refcmnd            => u.refcmnd,
      :updcode            => u.updcode,
      :forcedate          => u.forcedate,
      :posid              => u.posid,
      :poscode            => u.poscode,
      :excode             => u.excode,
      :ptcode             => u.ptcode,
      :salary             => u.salary,
      :c                  => u.c,
      :epcode             => u.epcode,
      :mincode            => u.mincode,
      :deptcode           => u.deptcode,
      :divcode            => u.divcode,
      :sdcode             => u.sdcode,
      :sdname             => (u.sdcode.nil?)? nil:( CodeSdept.find_by_sdcode(  u.sdcode  ).nil? )? nil:CodeSdept.find_by_sdcode(  u.sdcode  ).sdname,
      :subdcode           => u.subdcode,
      :sectcode           => u.sectcode,
      :jobcode            => u.jobcode,
      :note               => u.note     
    } }              
    render :text => return_data.to_json, :layout => false    
  end
  
  def edit_detail
    record = PisPoshis.find(:all , :conditions => "id = #{params["id"]}")[0]           
        record.refcmnd             = params[:refcmnd]
        record.updcode             = params[:updcode]
        record.forcedate           = to_date_i(params[:forcedate])
        record.posid               = params[:posid]
        record.poscode             = params[:poscode]
        record.excode              = params[:excode]
        record.ptcode              = params[:ptcode]
        record.salary              = params[:salary]
        record.c                   = params[:c]
        record.epcode              = params[:epcode]
        record.mincode             = params[:mincode]
        record.deptcode            = params[:deptcode]
        record.divcode             = params[:divcode]
        record.sdcode              = params[:sdcode]
        record.subdcode            = params[:subdcode]
        record.sectcode            = params[:sectcode]
        record.jobcode             = params[:jobcode]
        record.note                = params[:note]
    if record.save
      render :text => "{success:true}",:layout => false
    else
      render :text => "{success:false}",:layout => false
    end
  end  
  
  def delete    
    id = params[:id]
    if PisPoshis.delete(id)
      render :text => "{success:true}"
    else
      render :text => "{success:false}"
    end       
  end  
  
  def search_id
    rs = PisPoshis.find(:first,:conditions => "pis_personel_id = '#{params[:pis_personel_id]}'")
    render :text => "{data:#{(rs.nil?)? "''":rs.id  }}" ,:layout => false
  end
end
