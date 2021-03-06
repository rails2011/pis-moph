class DataPisTrainningController < ApplicationController
  skip_before_filter :verify_authenticity_token
  def read
    limit = params[:limit]
    start = params[:start]
    sql = <<-EOF
        select 
          pt.id
          ,pt.tno
          ,pt.begindate
          ,pt.pis_personel_id
          ,pt.cocode
          ,cc.coname
          ,pt.enddate
          ,pt.cource
          ,pt.institute
        from
          pis_trainnings pt
          left join code_countries cc on pt.cocode = cc.cocode
    EOF
    
    sql = sql + "   where pt.pis_personel_id = '#{params[:pis_personel_id]}' order by pt.tno"           
    rs = PisTrainning.find_by_sql(sql+" limit #{limit} offset #{start} ")
    return_data = Hash.new()    
    return_data[:totalCount] = PisTrainning.find_by_sql(sql).length
    return_data[:records]   = rs.collect{|u| {
      :id                     => u.id,
      :tno                    => u.tno,
      :begindate              => u.begindate,
      :pis_personel_id        => u.pis_personel_id,
      :cocode                 => u.cocode,
      :coname                 => u.coname,
      :enddate                => u.enddate,
      :cource                 => u.cource,
      :institute              => u.institute
    }}
    render :text => return_data.to_json, :layout => false
  end
 
  def add    
    sql = "Select max(tno) as n from pis_trainnings where pis_personel_id = '#{params[:pis_personel_id]}'"
    rs_count = PisPoshis.find_by_sql(sql)
    
    rs = PisTrainning.new(
        :tno                    => (rs_count[0].n.to_i) +1,
        :begindate              => to_date_i(params[:begindate]),
        :pis_personel_id        => params[:pis_personel_id],
        :cocode                 => params[:cocode],
        :enddate                => to_date_i(params[:enddate]),
        :cource                 => params[:cource],
        :institute              => params[:institute]
    )    
    if rs.save
      render :text => "{success:true}",:layout => false
    else
      render :text => "{success:false}",:layout => false
    end
  end
  
  def delete    
    id = params[:id]
    if PisTrainning.delete(id)
      render :text => "{success:true}"
    else
      render :text => "{success:false}"
    end       
  end
  
  def search_edit
    sql = <<-EOF
        select 
          pt.id
          ,pt.tno
          ,pt.begindate
          ,pt.pis_personel_id
          ,pt.cocode
          ,cc.coname
          ,pt.enddate
          ,pt.cource
          ,pt.institute
        from
          pis_trainnings pt
          left join code_countries cc on pt.cocode = cc.cocode
    EOF
    
    sql += "where pt.id = '#{params[:id]}'"
    rs = PisTrainning.find_by_sql(sql)[0]
    
    return_data = Hash.new()
    return_data[:data] = [ 
      :id                     => rs[:id],
      :tno                    => rs[:tno],
      :begindate              => rs[:begindate],
      :pis_personel_id        => rs[:pis_personel_id],
      :cocode                 => rs[:cocode],
      :coname                 => rs[:coname],
      :enddate                => rs[:enddate],
      :cource                 => rs[:cource],
      :institute              => rs[:institute]
    ]               
    render :text => return_data.to_json, :layout => false
  end
  
  def edit
    store = PisTrainning.find(:all , :conditions => "id = '#{params["id"]}'")[0]    
    store.begindate              = to_date_i(params[:begindate])
    store.cocode                 = params[:cocode]
    store.enddate                = to_date_i(params[:enddate])
    store.cource                 = params[:cource]
    store.institute              = params[:institute]       
    if store.save
      render :text => "{success:true}",:layout => false
    else
      render :text => "{success:false}",:layout => false
    end   
  end
  
  def search_id
    rs = PisTrainning.find(:first,:conditions => "pis_personel_id = '#{params[:pis_personel_id]}'")
    render :text => "{data:#{(rs.nil?)? "''":rs.id  }}" ,:layout => false
  end
  
end
