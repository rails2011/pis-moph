class DataEducationController < ApplicationController
  skip_before_filter :verify_authenticity_token
  def read
    sql = <<-EOF
                 Select
                  pe. id                    
                  ,pe.pis_personel_id       
                  ,pe.eorder                
                  ,pe.macode              
                  ,pe.qcode                 
                  ,pe.ecode                 
                  ,pe.cocode               
                  ,pe.institute             
                  ,pe.enddate             
                  ,pe.upd_user             
                  ,pe.flag                  
                  ,pe.spcode            
                  ,pe.maxed             
                  ,pe.status              
                  ,pe.note                 
                  ,pe.regisno            
                  ,pe.edstart             
                  ,pe.edend              
                  ,pe.refno
                  ,cm.major
                  ,cq.qualify
                  ,ce.edulevel
                  ,cc.coname
                from
                  pis_educations pe 
                  left join code_majors cm on pe.macode = cm.macode 
                  left join code_qualifies cq on pe.qcode = cq.qcode
                  left join code_edulevels ce on pe.ecode = ce.ecode 
                  left join code_countries cc on pe.cocode= cc.cocode
    EOF
    sql = sql + "   where pe.pis_personel_id = '#{params[:pis_personel_id]}'"
           
     

    
    rs = PisEducation.find_by_sql(sql)
    return_data = Hash.new()
    
    return_data[:records]   = rs.collect{|u| {
      :id                    => u.id, 
      :pis_personel_id       => u.pis_personel_id, 
      :eorder                => u.eorder, 
      :macode                => u.macode, 
      :qcode                 => u.qcode, 
      :ecode                 => u.ecode, 
      :cocode                => u.cocode, 
      :institute             => u.institute, 
      :enddate               => u.enddate,
      :upd_user               => u.upd_user, 
      :flag                  => u.flag, 
      :spcode                => u.spcode, 
      :maxed                 => u.maxed, 
      :status                => u.status, 
      :note                  => u.note, 
      :regisno               => u.regisno, 
      :edstart               => u.edstart, 
      :edend                 => u.edend, 
      :refno                 => u.refno,   
      :major                 => u.major,
      :qualify               => u.qualify,
      :edulevel              => u.edulevel,
      :coname                => u.coname
    }}
    render :text => return_data.to_json, :layout => false
  end
  
  def add
    store = PisEducation.new(
        :status             => params[:status],
        :enddate            => to_date_i(params[:enddate]),
        :qcode              => params[:qcode],
        :ecode              => params[:ecode],
        :macode             => params[:macode],
        :institute          => params[:institute],
        :cocode             => params[:cocode],
        :flag               => (params[:flag].nil?)? 0:params[:flag],
        :maxed              => (params[:maxed].nil?)? 0:params[:maxed],
        :pis_personel_id    => params[:pis_personel_id],
        :regisno            => params[:regisno],
        :refno              => params[:refno]

    )
    if store.save
      render :text => "{success:true}",:layout => false
    else
      render :text => "{success:false}",:layout => false
    end
  end
  
  def search_edit
    rs = PisEducation.find(params[:id])         
    return_data = Hash.new()
    return_data[:data] = [
        :status             => rs[:status],
        :enddate            => rs[:enddate],
        :qcode              => rs[:qcode],
        :ecode              => rs[:ecode],
        :macode             => rs[:macode],
        :institute          => rs[:institute],
        :cocode             => rs[:cocode],
        :flag               => rs[:flag],
        :maxed              => rs[:maxed],
        :id                 => rs[:id],
        :regisno            => rs[:regisno],
        :refno              => rs[:refno]
    ]               
    render :text => return_data.to_json, :layout => false
  end
  
  def edit
    store = PisEducation.find(:all , :conditions => "id = '#{params["id"]}'")[0]    
    store.status             = params[:status]
    store.enddate            = to_date_i(params[:enddate])
    store.qcode              = params[:qcode]
    store.ecode              = params[:ecode]
    store.macode             = params[:macode]
    store.institute          = params[:institute]
    store.cocode             = params[:cocode]
    store.flag               = (params[:flag].nil?)? 0:params[:flag]
    store.maxed              = (params[:maxed].nil?)? 0:params[:maxed]
    store.pis_personel_id    = params[:pis_personel_id]
    store.regisno            = params[:regisno]
    store.refno              = params[:refno]    
    if store.save
      render :text => "{success:true}",:layout => false
    else
      render :text => "{success:false}",:layout => false
    end
  end
  
  def delete    
    id = params[:id]
    if PisEducation.delete(id)
      render :text => "{success:true}"
    else
      render :text => "{success:false}"
    end       
  end
  
  def search_id
    rs = PisEducation.find(:first,:conditions => "pis_personel_id = '#{params[:pis_personel_id]}'")
    rs_person = PisPersonel.find(:first,:conditions => "pis_personel_id = '#{params[:pis_personel_id]}'")
    if rs.nil?
        render :text => "{data:''}" ,:layout => false
    else
      render :text => "{data:#{rs.id},record:{data:{fname:'#{rs_person.fname}',lname:'#{rs_person.lname}',prename:'#{CodePrefix.find(:first,:conditions=>"precode = '#{rs_person.precode}'").prename }'        }}}" ,:layout => false
    end
  end

end
