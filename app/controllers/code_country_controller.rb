class CodeCountryController < ApplicationController
  skip_before_filter :verify_authenticity_token
  def read
    limit			= params[:limit]
    start			= params[:start]    
    search			= Array.new
    case_search     = ""    
    if !(params[:fields].nil?) and !(params[:query].nil?) and params[:query] != "" and params[:fields] != ""
      allfields = ActiveSupport::JSON.decode(params[:fields]).join('::varchar||') + "::varchar"
      case_search = allfields + " LIKE '%" + params[:query] + "%'"
    end
    rs = CodeCountry.find(:all ,:conditions => case_search, :limit => limit, :offset => start, :order => "cocode")
    return_data 		        = Hash.new()    
    return_data[:totalCount] 	= CodeCountry.count(:all ,:conditions => case_search)
    return_data[:records] 	= rs.collect{|u| {		
                          :id         => u.id,		  
						  :cocode     => u.cocode,
						  :coname     => u.coname,
						  :use_status => (u.use_status == '1')? true:false                                           } 
					     }      
    render :text=>return_data.to_json, :layout=>false
  end 
  
  def create
    records   = ActiveSupport::JSON.decode(params[:records])    
    if records.type == Hash
      if records["cocode"] == "" and records["coname"] == "" and records["use_status"] == "" 
        return_data = Hash.new()
        return_data[:success] = false
        render :text=>return_data.to_json, :layout=>false
      else      
        count_check = CodeCountry.count(:all ,:conditions => "cocode = '#{records["cocode"]}'")
        if count_check > 0
          return_data = Hash.new()
          return_data[:success] = false
          return_data[:msg] = "มีรหัสประเทศนี้แล้ว"
          render :text=>return_data.to_json, :layout=>false          
        else
          records["use_status"] = (records["use_status"] == true)? 1:0
          store = CodeCountry.create(records)
          return_data = Hash.new()
          return_data[:success] = true
          return_data[:records]= {
                                  :id         => store[:id],
                                  :cocode     => store[:poscode],
                                  :coname     => store[:coname],
                                  :use_status => store[:use_status]                                         
                                 }
          render :text=>return_data.to_json, :layout=>false          
        end     
      end
    else
      render :text => "{success: false}"
    end
  end    

  def update     
      records = ActiveSupport::JSON.decode(params[:records])       
      if records.type == Hash
        count_check = CodeCountry.count(:all ,:conditions => "cocode = '#{records["cocode"]}' and id <> '#{records["id"]}' ")
        if count_check > 0
          return_data = Hash.new()
          return_data[:success] = false
          return_data[:msg] = "มีะหัสประเทศนี้แล้ว"
          render :text=>return_data.to_json, :layout=>false          
        else
          update_record               = CodeCountry.find(:all ,:conditions => "id = '#{records["id"]}'")[0]
          update_record.cocode        = records["cocode"]
          update_record.coname        = records["coname"]
          update_record.use_status    = (records["use_status"] == true)? 1:0
          
          if update_record.save
            return_data = Hash.new()
            return_data[:success] = true
            return_data[:records]= {
                                    :id         => records["id"],
                                    :cocode     => records["cocode"],
                                    :coname     => records["coname"],
                                    :use_status => (records["use_status"] == true)? 1:0 
                                    }
            render :text=>return_data.to_json, :layout=>false
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
    if CodeCountry.delete(id)
      render :text => "{success:true,records:{id:#{id.to_json}}}"  
    else
      render :text => "{success:false}"  
    end
  end
      
  def report
    data                    = ActiveSupport::JSON.decode(params[:data])
    search			        = Array.new
    case_search          	= ""    
    if !(data["fields"].nil?) and !(data["query"].nil?) and data["query"] != "" and data["fields"] != ""
      allfields = ActiveSupport::JSON.decode(data["fields"]).join('::varchar||') + "::varchar"
      case_search = allfields + " LIKE '%" + data["query"] + "%'"
    end         
    @records = CodeCountry.find(:all, :conditions => case_search, :order => "cocode")
  end
  
  def genres
    case_search = ''
    if !params[:query].nil?
      case_search = "coname like '%#{params[:query]}%'"
    end
    records = CodeCountry.find(:all,:conditions =>case_search)
    return_data = Hash.new()
    return_data[:success] = true
    return_data[:records]   = records.collect{|u| {   
      :cocode    => u.cocode,
      :coname  => u.coname
    } }
    render :text => return_data.to_json, :layout => false
 end  
end
