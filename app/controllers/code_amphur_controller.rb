class CodeAmphurController < ApplicationController
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
      case_search = "provcode = '#{params[:provcode]}'"
    else
      case_search = "(#{case_search}) and provcode = '#{params[:provcode]}'"
    end
    rs = CodeAmphur.find(:all ,:conditions => case_search, :limit => limit, :offset => start, :order => "amcode")
    return_data = Hash.new()    
    return_data[:totalCount] = CodeAmphur.count(:all , :conditions => case_search)
    return_data[:records] 	= rs.collect{|u| {		
      :id           => u.id,		  
      :amcode       => u.amcode,
      :provcode     => u.provcode,
      :shortpre     => u.shortpre,
      :longpre      => u.longpre,
      :amname       => u.amname,
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
      if records["amcode"] == "" and records["shortpre"] == "" and records["longpre"] == "" and records["amname"] == "" and records["use_status"] == ""
        return_data = Hash.new()
        return_data[:success] = false
        render :text => return_data.to_json, :layout => false
      else      
        count_check = CodeAmphur.count(:all, :conditions => "amcode = '#{records["amcode"]}' and provcode = '#{params[:provcode]}' ")
        if count_check > 0
          return_data = Hash.new()
          return_data[:success] = false
          return_data[:msg]     = "มีรหัสอำเภอนี้แล้ว"
          render :text=>return_data.to_json, :layout=>false
        else
          records["use_status"] = (records["use_status"] == true) ? 1 : 0
          store                 = CodeAmphur.create(records)
          return_data           = Hash.new()
          return_data[:success] = true
          return_data[:records] = {
            :id         => store[:id],
            :amcode     => store[:amcode],
            :provcode   => store[:provcode], 
            :shortpre   => store[:shortpre], 
            :longpre    => store[:longpre],
            :amname     => store[:amname],
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
        count_check = CodeAmphur.count(:all ,:conditions => "amcode = '#{records["amcode"]}' and provcode = '#{records["provcode"]}' and id <> '#{records["id"]}' ")
        if count_check > 0
          return_data = Hash.new()
          return_data[:success] = false
          return_data[:msg] = "มีรหัสอำเภอนี้แล้ว"
          render :text=>return_data.to_json, :layout=>false
        else
          update_record = CodeAmphur.find(:all ,:conditions => "id = '#{records["id"]}'")[0]
          update_record.amcode      = records["amcode"]
          update_record.shortpre    = records["shortpre"]
          update_record.longpre     = records["longpre"]
          update_record.amname      = records["amname"]
          update_record.use_status  = (records["use_status"] == true) ? 1 : 0
          
          if update_record.save
            return_data = Hash.new()
            return_data[:success] = true
            return_data[:records]= {
              :id         => records["id"],
              :amcode     => records["amcode"],
              :provcode   => records["provcode"], 
              :shortpre   => records["shortpre"], 
              :longpre    => records["longpre"],
              :amname     => records["amname"],
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
    if CodeAmphur.delete(id)
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
      case_search = "provcode = '#{data["provcode"]}'"
    else
      case_search = "(#{case_search}) and provcode = '#{data["provcode"]}'"
    end    
    
    @records = CodeAmphur.find(:all, :conditions => case_search, :order => "amcode")
  end  
  
  #def genres
  #  records = CodeAmphur.find(:all, :conditions =>"provcode = '#{params[:provcode]}'", :order => "amname")
  #  return_data = Hash.new()
  #  return_data[:success] = true
   # return_data[:records] 	= records.collect{|u| {		
   #   :amcode => u.amcode,
   #   :amname => u.amname
   # } }
   # render :text => return_data.to_json, :layout => false
  #end 


  def genres
      case_search = ''
      if !params[:query].nil?
        case_search = " amname like '%#{params[:query]}%' "
      end
      
      if !params[:provcode].nil?
        if case_search == ""
          case_search = " provcode = '#{params[:provcode]}' "
        else
          case_search = case_search + " and provcode = '#{params[:provcode]}' "
        end        
      end
      records = CodeAmphur.find(:all,:conditions =>case_search, :order => "amname")
      return_data = Hash.new()
      return_data[:success] = true
      return_data[:records]   = records.collect{|u| {   
        :amcode => u.amcode,
        :amname => u.amname
      } }
      render :text => return_data.to_json, :layout => false
  end
    
end
