class CodeSectController < ApplicationController
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
                rs = CodeSect.find(:all, :conditions => case_search, :limit => limit, :offset => start, :order => "sectcode")
                return_data = Hash.new()
                return_data[:totalCount] = CodeSect.count(:all , :conditions => case_search)
                return_data[:records]   = rs.collect{|u| {
                        :id => u.id,
                        :sectcode => u.sectcode,
                        :shortname => u.shortname,
                        :sectname => u.sectname,
                        :stdcode => u.stdcode,
                        :use_status => (u.use_status == '1') ? true : false
                } }
                render :text => return_data.to_json, :layout => false
        end

        def create
                records = ActiveSupport::JSON.decode(params[:records])
                if records.type == Hash
                        if records["id"] == "" and records["sectcode"] == "" and records["shortname"] == "" and records["sectname"] == "" and records["stdcode"] == "" and records["use_status"] == ""
                                return_data = Hash.new()
                                return_data[:success] = false
                                render :text => return_data.to_json, :layout => false
                        else
                                count_check = CodeSect.count(:all, :conditions => "sectcode = '#{records["sectcode"]}'")
                                if count_check > 0
                                        return_data = Hash.new()
                                        return_data[:success] = false
                                        return_data[:msg] = "มีรหัสฝ่าย/กลุ่ม/งานนี้แล้ว"
                                        render :text => return_data.to_json, :layout=>false
                                else
                                        records["use_status"] = (records["use_status"] == true) ? 1 : 0
                                        store = CodeSect.create(records)
                                        return_data = Hash.new()
                                        return_data[:success] = true
                                        return_data[:records] = {
                                                :id => store[:id],
                                                :sectcode => store[:sectcode],
                                                :shortname => store[:shortname],
                                                :sectname => store[:sectname],
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
                        count_check = CodeSect.count(:all , :conditions => "sectcode = '#{records["sectcode"]}' and id <> '#{records["id"]}' ")
                        if count_check > 0
                                return_data = Hash.new()
                                return_data[:success] = false
                                return_data[:msg] = "มีรหัสตำแหน่งนี้แล้ว"
                                render :text => return_data.to_json, :layout=>false
                        else
                                update_record = CodeSect.find(:all , :conditions => "id = '#{records["id"]}'")[0]
                                update_record.sectcode = records["sectcode"]
                                update_record.shortname = records["shortname"]
                                update_record.sectname = records["sectname"]
                                update_record.stdcode = records["stdcode"]
                                update_record.use_status = (records["use_status"] == true) ? 1 : 0
                                if update_record.save
                                        return_data = Hash.new()
                                        return_data[:success] = true
                                        return_data[:records]= {
                                                :id => records["id"],
                                                :sectcode => records["sectcode"],
                                                :shortname => records["shortname"],
                                                :sectname => records["sectname"],
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
                if CodeSect.delete(id)
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
                @records = CodeSect.find(:all, :conditions => case_search)
        end
        
  def genres
    case_search = ''
    if !params[:query].nil?
      case_search = "sectcode::varchar like '%#{params[:query]}%' or sectname like '%#{params[:query]}%'"
      end
      records = CodeSect.find(:all,:conditions =>case_search)
      return_data = Hash.new()
      return_data[:success] = true
      return_data[:records]   = records.collect{|u| {   
        :sectcode      => u.sectcode,
        :sectname    => u.sectname
      } }
      render :text => return_data.to_json, :layout => false
  end         
end
