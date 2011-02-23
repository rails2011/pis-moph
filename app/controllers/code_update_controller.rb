class CodeUpdateController < ApplicationController
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
                rs = CodeUpdate.find(:all, :conditions => case_search, :limit => limit, :offset => start, :order => "updcode")
                return_data = Hash.new()
                return_data[:totalCount] = CodeUpdate.count(:all , :conditions => case_search)
                return_data[:records]   = rs.collect{|u| {
                        :id => u.id,
                        :updcode => u.updcode,
                        :updname => u.updname,
                        :updsort => u.updsort,
                        :stdcode => u.stdcode,
                        :use_status => (u.use_status == '1') ? true : false
                } }
                render :text => return_data.to_json, :layout => false
        end

        def create
                records = ActiveSupport::JSON.decode(params[:records])
                if records.type == Hash
                        if records["id"] == "" and records["updcode"] == "" and records["updname"] == "" and records["updsort"] == "" and records["stdcode"] == "" and records["use_status"] == ""
                                return_data = Hash.new()
                                return_data[:success] = false
                                render :text => return_data.to_json, :layout => false
                        else
                                count_check = CodeUpdate.count(:all, :conditions => "updcode = '#{records["updcode"]}'")
                                if count_check > 0
                                        return_data = Hash.new()
                                        return_data[:success] = false
                                        return_data[:msg] = "มีรหัสตำแหน่งนี้แล้ว"
                                        render :text => return_data.to_json, :layout=>false
                                else
                                        records["use_status"] = (records["use_status"] == true) ? 1 : 0
                                        store = CodeUpdate.create(records)
                                        return_data = Hash.new()
                                        return_data[:success] = true
                                        return_data[:records] = {
                                                :id => store[:id],
                                                :updcode => store[:updcode],
                                                :updname => store[:updname],
                                                :updsort => store[:updsort],
                                                :stdcode => store[:stdcode],
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
                        count_check = CodeUpdate.count(:all , :conditions => "updcode = '#{records["updcode"]}' and id <> '#{records["id"]}' ")
                        if count_check > 0
                                return_data = Hash.new()
                                return_data[:success] = false
                                return_data[:msg] = "มีรหัสการเคลื่อนไหวนี้แล้ว"
                                render :text => return_data.to_json, :layout=>false
                        else
                                update_record = CodeUpdate.find(:all , :conditions => "id = '#{records["id"]}'")[0]
                                update_record.updcode = records["updcode"]
                                update_record.updname = records["updname"]
                                update_record.updsort = records["updsort"]
                                update_record.stdcode = records["stdcode"]
                                update_record.use_status = (records["use_status"] == true) ? 1 : 0
                                if update_record.save
                                        return_data = Hash.new()
                                        return_data[:success] = true
                                        return_data[:records]= {
                                                :id => records["id"],
                                                :updcode => records["updcode"],
                                                :updname => records["updname"],
                                                :updsort => records["updsort"],
                                                :stdcode => records["stdcode"],
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
                if CodeUpdate.delete(id)
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
                @records = CodeUpdate.find(:all, :conditions => case_search)
        end
        
  def genres
    case_search = ''
    if !params[:query].nil?
      case_search = "updname like '%#{params[:query]}%'"
    end
    records = CodeUpdate.find(:all,:conditions =>case_search)
    return_data = Hash.new()
    return_data[:success] = true
    return_data[:records]   = records.collect{|u| {   
      :updcode => u.updcode,
      :updname => u.updname
    } }
    render :text => return_data.to_json, :layout => false
  end
end
