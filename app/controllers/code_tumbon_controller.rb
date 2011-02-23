class CodeTumbonController < ApplicationController
  skip_before_filter :verify_authenticity_token
  def read
   if !(params[:provcode].nil?)
    limit = params[:limit]
    start = params[:start]
    search = Array.new
    case_search = ""
    if !(params[:fields].nil?) and !(params[:query].nil?) and params[:query] != "" and params[:fields] != ""
      allfields = ActiveSupport::JSON.decode(params[:fields]).join('::varchar||') + "::varchar"
      case_search = allfields + " LIKE '%" + params[:query] + "%'"
    end 
    if case_search == ""   	
      case_search = "provcode = '#{params[:provcode]}' and amcode = '#{params[:amcode]}'"
    else
      case_search = "(#{case_search}) and provcode = '#{params[:provcode]}' and amcode = '#{params[:amcode]}'"
    end
    rs = CodeTumbon.find(:all ,:conditions => case_search, :limit => limit, :offset => start, :order => "amcode")
    return_data = Hash.new()    
    return_data[:totalCount] = CodeTumbon.count(:all , :conditions => case_search)
    return_data[:records] 	= rs.collect{|u| {		
      :id           => u.id,		  
      :tmcode       => u.tmcode,
      :amcode       => u.amcode,
      :provcode     => u.provcode,
      :shortpre     => u.shortpre,
      :longpre      => u.longpre,
      :tmname       => u.tmname,
      :use_status   => (u.use_status == '1') ? true : false
    } }              
    render :text => return_data.to_json, :layout => false
   else
    render :text =>"{totalCount:0,records:[]}"
   end 
  end 
  
  def create
    records = ActiveSupport::JSON.decode(params[:records])
    if records.type == Hash
      if records["tmcode"] == "" and 
        return_data = Hash.new()
        return_data[:success] = false
        render :text => return_data.to_json, :layout => false
      else      
        count_check = CodeTumbon.count(:all, :conditions => "tmcode = '#{records["tmcode"]}' and amcode = '#{params[:amcode]}' and provcode = '#{params[:provcode]}' ")
        if count_check > 0
          return_data = Hash.new()
          return_data[:success] = false
          return_data[:msg]     = "มีรหัสตำบลนี้แล้ว"
          render :text=>return_data.to_json, :layout=>false
        else
          records["use_status"] = (records["use_status"] == true) ? 1 : 0
          store                 = CodeTumbon.create(records)
          return_data           = Hash.new()
          return_data[:success] = true
          return_data[:records] = {
            :id         => store[:id],
            :tmcode     => store[:tmcode],
            :amcode     => store[:amcode],            
            :provcode   => store[:provcode], 
            :shortpre   => store[:shortpre], 
            :longpre    => store[:longpre],
            :tmname     => store[:tmname],
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
        count_check = CodeTumbon.count(:all ,:conditions => "tmcode = '#{records["tmcode"]}' and amcode = '#{records["amcode"]}' and provcode = '#{records["provcode"]}' and id <> '#{records["id"]}' ")
        if count_check > 0
          return_data = Hash.new()
          return_data[:success] = false
          return_data[:msg] = "มีรหัสตำบลนี้แล้ว"
          render :text=>return_data.to_json, :layout=>false
        else
          update_record = CodeTumbon.find(:all ,:conditions => "id = '#{records["id"]}'")[0]
          update_record.tmcode      = records["tmcode"]
          update_record.shortpre    = records["shortpre"]
          update_record.longpre     = records["longpre"]
          update_record.tmname      = records["tmname"]
          update_record.use_status  = (records["use_status"] == true) ? 1 : 0
          
          if update_record.save
            return_data = Hash.new()
            return_data[:success] = true
            return_data[:records]= {
              :id         => records["id"],
              :tmcode     => records["tmcode"],
              :amcode     => records["amcode"],
              :provcode   => records["provcode"], 
              :shortpre   => records["shortpre"], 
              :longpre    => records["longpre"],
              :tmname     => records["tmname"],
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
    if CodeTumbon.delete(id)
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
    
    if case_search == ""   	
      case_search = "provcode = '#{data["provcode"]}' and amcode = '#{data["amcode"]}'"
    else
      case_search = "(#{case_search}) and provcode = '#{data["provcode"]}' and amcode = '#{data["amcode"]}'"
    end    
    
    @records = CodeTumbon.find(:all, :conditions => case_search, :order => "amcode")
  end 
  
  def genres
      case_search = ''
      if !params[:query].nil?
        case_search = "tmname like '%#{params[:query]}%'"
      end
      
      if !params[:amcode].nil?
        if case_search == ""
          case_search = " amcode = '#{params[:amcode]}' "
        else
          case_search = case_search + " and amcode = '#{params[:amcode]}' "
        end        
      end
      records = CodeTumbon.find(:all,:conditions =>case_search, :order => "tmname")
      return_data = Hash.new()
      return_data[:success] = true
      return_data[:records]   = records.collect{|u| {   
        :tmcode => u.tmcode,
        :tmname => u.tmname
      } }
      render :text => return_data.to_json, :layout => false
  end
  
end
