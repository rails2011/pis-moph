class CodeExpertController < ApplicationController
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
                rs = CodeExpert.find(:all, :conditions => case_search, :limit => limit, :offset => start, :order => "epcode")
                return_data = Hash.new()
                return_data[:totalCount] = CodeExpert.count(:all , :conditions => case_search)
                return_data[:records]   = rs.collect{|u| {
                        :id => u.id,
                        :epcode => u.epcode,
                        :prename => u.prename,
                        :expert => u.expert,
                        :stdcode => u.stdcode,
                        :use_status => (u.use_status == '1') ? true : false
                } }
                render :text => return_data.to_json, :layout => false
        end

        def create
                records = ActiveSupport::JSON.decode(params[:records])
                if records.type == Hash
                        if records["id"] == "" and records["epcode"] == "" and records["prename"] == "" and records["expert"] == "" and records["stdcode"] == "" and records["use_status"] == ""
                                return_data = Hash.new()
                                return_data[:success] = false
                                render :text => return_data.to_json, :layout => false
                        else
                                count_check = CodeExpert.count(:all, :conditions => "epcode = '#{records["epcode"]}'")
                                if count_check > 0
                                        return_data = Hash.new()
                                        return_data[:success] = false
                                        return_data[:msg] = "มีรหัสตำแหน่งนี้แล้ว"
                                        render :text => return_data.to_json, :layout=>false
                                else
                                        records["use_status"] = (records["use_status"] == true) ? 1 : 0
                                        store = CodeExpert.create(records)
                                        return_data = Hash.new()
                                        return_data[:success] = true
                                        return_data[:records] = {
                                                :id => store[:id],
                                                :epcode => store[:epcode],
                                                :prename => store[:prename],
                                                :expert => store[:expert],
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
                        count_check = CodeExpert.count(:all , :conditions => "epcode = '#{records["epcode"]}' and id <> '#{records["id"]}' ")
                        if count_check > 0
                                return_data = Hash.new()
                                return_data[:success] = false
                                return_data[:msg] = "มีรหัสตำแหน่งนี้แล้ว"
                                render :text => return_data.to_json, :layout=>false
                        else
                                update_record = CodeExpert.find(:all , :conditions => "id = '#{records["id"]}'")[0]
                                update_record.epcode = records["epcode"]
                                update_record.prename = records["prename"]
                                update_record.expert = records["expert"]
                                update_record.stdcode = records["stdcode"]
                                update_record.use_status = (records["use_status"] == true) ? 1 : 0
                                if update_record.save
                                        return_data = Hash.new()
                                        return_data[:success] = true
                                        return_data[:records]= {
                                                :id => records["id"],
                                                :epcode => records["epcode"],
                                                :prename => records["prename"],
                                                :expert => records["expert"],
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
                if CodeExpert.delete(id)
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
                @records = CodeExpert.find(:all, :conditions => case_search)
        end
        
        def genres
          case_search = ''
          if !params[:query].nil?
            case_search = "expert like '%#{params[:query]}%'"
          end
          records = CodeExpert.find(:all,:conditions =>case_search)
          return_data = Hash.new()
          return_data[:success] = true
          return_data[:records]   = records.collect{|u| {   
            :epcode => u.epcode,
            :expert => u.expert
          } }
          render :text => return_data.to_json, :layout => false
       end          
end
