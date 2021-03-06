class DataPisPunishController < ApplicationController
  skip_before_filter :verify_authenticity_token
  def read
    limit = params[:limit]
    start = params[:start]
    sql = <<-EOF
        select 
          pp.id
          ,pp.pis_personel_id
          ,pp.forcedate
          ,pp.puncode
          ,cp.punname
          ,pp.description
          ,pp.cmdno
        from
          pis_punishes pp
          left join code_punishes cp on pp.puncode = cp.puncode 
    EOF
    
    sql = sql + "   where pp.pis_personel_id = '#{params[:pis_personel_id]}'"           
    rs = PisPunish.find_by_sql(sql+" limit #{limit} offset #{start} ")
    return_data = Hash.new()    
    return_data[:totalCount] = PisPunish.find_by_sql(sql).length
    return_data[:records]   = rs.collect{|u| {
      :id                     => u.id,
      :pis_personel_id        => u.pis_personel_id,
      :forcedate              => u.forcedate,
      :puncode                => u.puncode,
      :punname                => u.punname,
      :description            => u.description,
      :cmdno                  => u.cmdno
    }}
    render :text => return_data.to_json, :layout => false
  end
  
  def add
    rs = PisPunish.new(
      :pis_personel_id        => params[:pis_personel_id],
      :forcedate              => to_date_i( params[:forcedate] ) ,
      :puncode                => params[:puncode],
      :description            => params[:description],
      :cmdno                  => params[:cmdno]
    )    
    if rs.save
      render :text => "{success:true,aaa:'#{to_date_i(params[:forcedate])}'}",:layout => false
    else
      render :text => "{success:false}",:layout => false
    end
  end
  
  def delete    
    id = params[:id]
    if PisPunish.delete(id)
      render :text => "{success:true}"
    else
      render :text => "{success:false}"
    end       
  end
  
  def search_edit
    sql = <<-EOF
        select 
          pp.id
          ,pp.pis_personel_id
          ,pp.forcedate
          ,pp.puncode
          ,cp.punname
          ,pp.description
          ,pp.cmdno
        from
          pis_punishes pp
          left join code_punishes cp on pp.puncode = cp.puncode 
    EOF
    
    sql += "where pp.id = '#{params[:id]}'"
    rs = PisPunish.find_by_sql(sql)[0]    
    return_data = Hash.new()
    return_data[:data] = [       
      :pis_personel_id        => rs[:pis_personel_id],
      :forcedate              => rs[:forcedate] ,
      :puncode                => rs[:puncode],
      :description            => rs[:description],
      :cmdno                  => rs[:cmdno]
    ]               
    render :text => return_data.to_json, :layout => false
  end
  
  def edit
    store = PisPunish.find(:all , :conditions => "id = '#{params["id"]}'")[0]    
    store.forcedate              = to_date_i( params[:forcedate] ) 
    store.puncode                = params[:puncode]
    store.description            = params[:description]
    store.cmdno                  = params[:cmdno]    
    if store.save
      render :text => "{success:true}",:layout => false
    else
      render :text => "{success:false}",:layout => false
    end   
  end
  
  def search_id
    rs = PisPunish.find(:first,:conditions => "pis_personel_id = '#{params[:pis_personel_id]}'")
    render :text => "{data:#{(rs.nil?)? "''":rs.id  }}" ,:layout => false
  end
  
  
  
  
end
