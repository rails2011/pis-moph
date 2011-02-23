class CodeProvinceController < ApplicationController
  skip_before_filter :verify_authenticity_token

  def read
    limit = params[:limit]
    start = params[:start]
    search = Array.new
    case_search = ""
    if !(params[:fields].nil?) and !(params[:query].nil?) and params[:query] != "" and params[:fields] != ""
      allfields = ActiveSupport::JSON.decode(params[:fields]).join('::varchar||') + "::varchar"
      case_search = allfields + " LIKE '%" + params[:query] + "%'"
    end    	
    rs = CodeProvince.find(:all ,:conditions => case_search, :limit => limit, :offset => start, :order => "provcode")
    return_data = Hash.new()    
    return_data[:totalCount] = CodeProvince.count(:all , :conditions => case_search)
    return_data[:records] 	= rs.collect{|u| {		
      :id => u.id,		  
      :provcode => u.provcode,
      :shortpre => u.shortpre,
      :longpre => u.longpre,
      :provname => u.provname,
      :use_status => (u.use_status == '1') ? true : false
    } }
    render :text => return_data.to_json, :layout => false
  end 
  
  def create
    records = ActiveSupport::JSON.decode(params[:records])
    if records.type == Hash
      if records["provcode"] == "" and records["shortpre"] == "" and records["longpre"] == "" and records["provname"] == "" and records["use_status"] == ""
        return_data = Hash.new()
        return_data[:success] = false
        render :text => return_data.to_json, :layout => false
      else      
        count_check = CodeProvince.count(:all, :conditions => "provcode = '#{records["provcode"]}'")
        if count_check > 0
          return_data = Hash.new()
          return_data[:success] = false
          return_data[:msg] = "มีรหัสจังหวัดนี้แล้ว"
          render :text=>return_data.to_json, :layout=>false
        else
          records["use_status"] = (records["use_status"] == true) ? 1 : 0
          store = CodeProvince.create(records)
          return_data = Hash.new()
          return_data[:success] = true
          return_data[:records] = {
            :id         => store[:id],
            :provcode   => store[:provcode], 
            :shortpre   => store[:shortpre], 
            :longpre    => store[:longpre],
            :provname   => store[:provname],
            :use_status => store[:use_status]                                         
          }
          render :text => return_data.to_json, :layout => false          
        end           
      end
    else
      render :text => "{success: false}"
    end
  end
  
  def update
      records = ActiveSupport::JSON.decode(params[:records])       
      if records.type == Hash
        count_check = CodeProvince.count(:all ,:conditions => "provcode = '#{records["provcode"]}' and id <> '#{records["id"]}' ")
        if count_check > 0
          return_data = Hash.new()
          return_data[:success] = false
          return_data[:msg] = "มีรหัสจังหวัดนี้แล้ว"
          render :text=>return_data.to_json, :layout=>false
        else
          update_record = CodeProvince.find(:all ,:conditions => "id = '#{records["id"]}'")[0]
          update_record.provcode    = records["provcode"]    
          update_record.shortpre    = records["shortpre"]
          update_record.longpre     = records["longpre"]
          update_record.provname    = records["provname"]
          update_record.use_status  = (records["use_status"] == true) ? 1 : 0
          
          if update_record.save
            return_data = Hash.new()
            return_data[:success] = true
            return_data[:records]= {
              :id => records["id"],
              :provcode => records["provcode"], 
              :shortpre => records["shortpre"], 
              :longpre => records["longpre"],
              :provname => records["provname"],
              :use_status => (records["use_status"] == true) ? 1 : 0 
            }
            render :text => return_data.to_json, :layout => false
          else
            render :text => "{success:false}"   
          end                             
         end
      else 
        render :text => "{success:false}" 
      end
  end

  def delete
    id = ActiveSupport::JSON.decode(params[:records])
    if CodeProvince.delete(id)
      render :text => "{success:true, records:{id:#{id.to_json}}}"  
    else
      render :text => "{success:false}"  
    end
  end
  
  def report
    data = ActiveSupport::JSON.decode(params[:data])
    search = Array.new
    case_search = ""
    if !(data["fields"].nil?) and !(data["query"].nil?) and data["query"] != "" and data["fields"] != ""
      allfields = ActiveSupport::JSON.decode(data["fields"]).join('::varchar||') + "::varchar"
      case_search = allfields + " LIKE '%" + data["query"] + "%'"
    end
    @records = CodeProvince.find(:all, :conditions => case_search, :order => "provcode")
  end
  
  def genres
      case_search = ''
      if !params[:query].nil?
        case_search = "provname like '%#{params[:query]}%'"
      end
      records = CodeProvince.find(:all,:conditions =>case_search, :order => "provname")
      return_data = Hash.new()
      return_data[:success] = true
      return_data[:records]   = records.collect{|u| {   
        :provcode => u.provcode,
        :provname => u.provname
      } }
      render :text => return_data.to_json, :layout => false
 end
end
