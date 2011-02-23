class PerformPersonNowController < ApplicationController
  skip_before_filter :verify_authenticity_token
  def search_edit
    rs = PisPersonel.find(:all,:conditions => "id = #{params[:id]}")
    rs_j18 = PisJ18.find_by_pis_personel_id(rs[0].pis_personel_id)   
    return_data = Hash.new()
    return_data[:data]    = rs.collect{|u| {   
      :id                => u.id,      
      :j18code            => u.j18code,
      :mincode            => u.mincode,
      :deptcode           => u.deptcode,
      :divcode            => u.divcode,
      :sdcode             => u.sdcode,
      :sdname             => (u.sdcode.nil?)? nil:( CodeSdept.find_by_sdcode(  u.sdcode  ).nil? )? nil:CodeSdept.find_by_sdcode(  u.sdcode  ).sdname,
      :subdcode           => u.subdcode,
      :sectcode           => u.sectcode,
      :jobcode            => u.jobcode,
      :birthdate          => u.birthdate,
      :appointdate        => u.appointdate,
      :deptdate           => u.deptdate,
      :retiredate         => u.retiredate,
      :getindate          => u.getindate,
      :exitdate           => u.exitdate,
      :qcode              => u.qcode,
      :macode             => u.macode,
      :codetrade          => u.codetrade,
      :kbk                => u.kbk,
      :cdate              => u.cdate,
      :pis_personel_id    => u.pis_personel_id,
      :note               => u.note,
      :note2              => u.note2,
      :exnamej18         => (rs_j18.nil?)? nil:( CodeExecutive.find_by_excode(   rs_j18.excode   ).nil? )? nil:CodeExecutive.find_by_excode(   rs_j18.excode   ).exname,
      :sdnamej18          => (rs_j18.nil?)? nil:( CodeSdept.find_by_sdcode(  rs_j18.sdcode  ).nil? )? nil:CodeSdept.find_by_sdcode(  rs_j18.sdcode  ).sdname,
      :salaryj18          => (rs_j18.nil?)? nil:rs_j18.salary
    } }              
    render :text => return_data.to_json, :layout => false        
  end

  def edit
    update_record = PisPersonel.find(:all , :conditions => "id = '#{params["id"]}'")[0]   
       
    update_record.j18code             = params["j18code"]      
    update_record.mincode             = params["mincode"]
    update_record.deptcode            = params["deptcode"]       
    update_record.divcode             = params["divcode"]
    update_record.sdcode              = params["sdcode"]
    update_record.subdcode            = params["subdcode"]
    update_record.sectcode            = params["sectcode"]
    update_record.jobcode             = params["jobcode"]
    update_record.birthdate           = to_date_i(params["birthdate"])
    update_record.appointdate         = to_date_i(params["appointdate"])
    update_record.deptdate            = to_date_i(params["deptdate"])
    update_record.retiredate          = to_date_i(params["retiredate"])
    update_record.getindate           = to_date_i(params["getindate"])
    update_record.exitdate            = to_date_i(params["exitdate"])
    update_record.qcode               = params["qcode"]
    update_record.macode              = params["macode"]
    update_record.codetrade           = params["codetrade"]
    update_record.kbk                 = params["kbk"]
    update_record.cdate               = to_date_i(params["cdate"])
    update_record.note                = params["note"]
    update_record.note2               = params["note2"]
    
    if update_record.save
      render :text => "{success:true}",:layout => false
    else
      render :text => "{success:false}",:layout => false
    end
  end
  
  def search_id
    rs = PisPersonel.find(:first,:conditions => "pis_personel_id = '#{params[:pis_personel_id]}'")
    render :text => "{data:#{(rs.nil?)? "''":rs.id  }}" ,:layout => false
  end
end
