class CodeJ18statusController < ApplicationController
  skip_before_filter :verify_authenticity_token
  def read
    limit = params[:limit]
    start = params[:start]
    search = Array.new
    case_search = ""
    if !(params[:query].nil?)
            #if !(params[:fields].nil?) and !(params[:query].nil?) and params[:query] != "" and params[:fields] != ""
            allfields = ActiveSupport::JSON.decode(params[:fields]).join('::varchar||') + "::varchar"
            case_search = allfields + " LIKE '%" + params[:query] + "%'"
    end
    rs = CodeJ18status.find(:all, :conditions => case_search, :limit => limit, :offset => start, :order => "id")
    return_data = Hash.new()
    return_data[:totalCount] = CodeJ18status.count(:all , :conditions => case_search)
    return_data[:records]   = rs.collect{|u| {
            :id           => u.id,                       
            :j18code      => u.j18code,
            :j18status    => u.j18status,
            :stdcode      => u.stdcode,
            :use_status   => (u.use_status == '1') ? true : false
    } }
    render :text => return_data.to_json, :layout => false
  end

	def create
    records = ActiveSupport::JSON.decode(params[:records])
    if records.type == Hash
            if records["j18code"] == "" and records["j18status"] == "" and records["use_status"] == ""
                    return_data = Hash.new()
                    return_data[:success] = false
                    render :text => return_data.to_json, :layout => false
            else
                    count_check = CodeJ18status.count(:all, :conditions => "j18code = '#{records["j18code"]}'")
                    if count_check > 0
                            return_data = Hash.new()
                            return_data[:success] = false
                            return_data[:msg] = "มีรหัสนี้แล้ว"
                            render :text => return_data.to_json, :layout=>false
                    else
                            records["use_status"] = (records["use_status"] == true) ? 1 : 0
                            store = CodeJ18status.create(records)
                            return_data = Hash.new()
                            return_data[:success] = true
                            return_data[:records] = {
                                    :id => store[:id],
                                    :j18code => store[:j18code],
                                    :j18status => store[:j18status],
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
            count_check = CodeJ18status.count(:all , :conditions => "j18code = '#{records["j18code"]}' and id <> '#{records["id"]}' ")
            if count_check > 0
                    return_data = Hash.new()
                    return_data[:success] = false
                    return_data[:msg] = "มีรหัสนี้แล้ว"
                    render :text => return_data.to_json, :layout=>false
            else
                    update_record = CodeJ18status.find(:all , :conditions => "id = '#{records["id"]}'")[0]
                    update_record.j18code = records["j18code"]
                    update_record.j18status = records["j18status"]
                    update_record.use_status = (records["use_status"] == true) ? 1 : 0
                    if update_record.save
                            return_data = Hash.new()
                            return_data[:success] = true
                            return_data[:records]= {
                                    :id => records["id"],
                                    :j18code => records["j18code"],
                                    :j18status => records["j18status"],
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
    if CodeJ18status.delete(id)
            render :text => "{success:true, records:{id:id}}"
    else
            render :text => "{success:false}"
    end
	end
	
	def report
    data = ActiveSupport::JSON.decode(params[:data])
    search = Array.new
    case_search = ""
    if !(data["query"].nil?)
    #if !(data["fields"].nil?) and !(data["query"].nil?) and data["query"] != "" and data["fields"] != ""
            allfields = ActiveSupport::JSON.decode(data["fields"]).join('::varchar||') + "::varchar"
            case_search = allfields + " LIKE '%" + data["query"] + "%'"
    end
    @records = CodeJ18status.find(:all, :conditions => case_search, :order => "j18code")
  end

  def genres
    case_search = ''
    if !params[:query].nil?
      case_search = "j18code::varchar like '%#{params[:query]}%' or j18status like '%#{params[:query]}%'"
      end
      records = CodeJ18status.find(:all,:conditions =>case_search)
      return_data = Hash.new()
      return_data[:success] = true
      return_data[:records]   = records.collect{|u| {   
        :j18code      => u.j18code,
        :j18status    => u.j18status
      } }
      render :text => return_data.to_json, :layout => false
   end 
end
