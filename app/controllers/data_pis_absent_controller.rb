class DataPisAbsentController < ApplicationController
  skip_before_filter :verify_authenticity_token
  def read
    limit = params[:limit]
    start = params[:start]
    sql = <<-EOF
        select 
          pa.id
          ,pa.pis_personel_id
          ,ca.abtype
          ,pa.abcode
          ,pa.begindate
          ,pa.enddate
          ,pa.amount
          ,pa.flagcount        
        from 
          pis_absents pa
          left join code_abtypes ca on pa.abcode = ca.abcode 
    EOF
    
    sql = sql + "   where pa.pis_personel_id = '#{params[:pis_personel_id]}' and pa.begindate between '#{params[:year_en].to_i-1}-10-01' and '#{params[:year_en]}-09-30' "           
    rs = PisAbsent.find_by_sql(sql+" limit #{limit} offset #{start} ")
    return_data = Hash.new()    
    return_data[:totalCount] = PisAbsent.find_by_sql(sql).length
    return_data[:records]   = rs.collect{|u| {
      :id                    => u.id,
      :pis_personel_id        => u.pis_personel_id,
      :abtype                 => u.abtype,
      :abcode                 => u.abcode,
      :begindate              => u.begindate,
      :enddate                => u.enddate,
      :amount                 => u.amount,
      :flagcount              => u.flagcount
    }}
    render :text => return_data.to_json, :layout => false
  end
  
  def add
    rs = PisAbsent.new(
        :pis_personel_id       => params[:pis_personel_id],
        :abcode                => params[:abcode],
        :begindate             => to_date_i(params[:begindate]),
        :enddate               => to_date_i(params[:enddate]),
        :amount                => params[:amount],
        :flagcount             => (params[:flagcount] == "on")? "Y":"N"
    )    
    if rs.save
      render :text => "{success:true}",:layout => false
    else
      render :text => "{success:false}",:layout => false
    end
  end
  
  def genre_year_fiscal
    rs = PisAbsent.find(:first,:select => "min(begindate) as min_date",:conditions => "pis_personel_id = '#{params[:pis_personel_id]}'" )
    dt_max = Time.new
    dt_max = dt_max.year.to_s+"-"+dt_max.month.to_s+"-"+dt_max.day.to_s
    dt_min = rs.min_date||dt_max
    fiscal_min = year_fiscal_i(dt_min)
    fiscal_max = year_fiscal_i(dt_max)
    str = Array.new
    j = 0
    for i in fiscal_min..fiscal_max
      str[j] = "{year_en:#{i},year_th:#{i+543}}"
      j += 1 
    end    
    render :text => "{records:[#{str.join(",")}]}"
  end  
  
  def delete    
    id = params[:id]
    if PisAbsent.delete(id)
      render :text => "{success:true}"
    else
      render :text => "{success:false}"
    end       
  end
  
  def search_edit
    rs = PisAbsent.find(params[:id])         
    return_data = Hash.new()
    return_data[:data] = [        
        :pis_personel_id       => rs[:pis_personel_id],
        :abcode                => rs[:abcode],
        :begindate             => rs[:begindate],
        :enddate               => rs[:enddate],
        :amount                => rs[:amount],
        :flagcount             => rs[:flagcount]
    ]               
    render :text => return_data.to_json, :layout => false
  end
  
  def edit
    store = PisAbsent.find(:all , :conditions => "id = '#{params["id"]}'")[0]
    store.pis_personel_id       = params[:pis_personel_id]
    store.abcode                = params[:abcode]
    store.begindate             = to_date_i(params[:begindate])
    store.enddate               = to_date_i(params[:enddate])
    store.amount                = params[:amount]
    store.flagcount             = (params[:flagcount] == "on")? "Y":"N"                    
    if store.save
      render :text => "{success:true}",:layout => false
    else
      render :text => "{success:false}",:layout => false
    end   
  end
  
  def search_id
    rs = PisAbsent.find(:first,:conditions => "pis_personel_id = '#{params[:pis_personel_id]}'")
    render :text => "{data:#{(rs.nil?)? "''":rs.id  }}" ,:layout => false
  end
  
end
