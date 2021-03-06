class CodeEpnposworkController < ApplicationController
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
                rs = CodeEpnposwork.find(:all, :conditions => case_search, :limit => limit, :offset => start, :order => "wcode")
                return_data = Hash.new()
                return_data[:totalCount] = CodeEpnposwork.count(:all , :conditions => case_search)
                return_data[:records]   = rs.collect{|u| {
                        :id => u.id,
                        :wcode => u.wcode,
                        :gcode => u.gcode,
                        :sgcode => u.sgcode,
                        :wname => u.wname,
                        :level => u.level,
                        :minwage => u.minwage,
                        :maxwage => u.maxwage,
                        :wattrib => u.wattrib,
                        :note => u.note,
                        :numcode => u.numcode,
                        :stdcode => u.stdcode,
                        :use_status => (u.use_status == '1') ? true : false
                } }
                render :text => return_data.to_json, :layout => false
        end

        def create
                records = ActiveSupport::JSON.decode(params[:records])
                if records.type == Hash
                        if records["id"] == "" and records["wcode"] == "" and records["gcode"] == "" and records["sgcode"] == "" and records["wname"] == "" and records["level"] == "" and records["minwage"] == "" and records["maxwage"] == "" and records["wattrib"] == "" and records["note"] == "" and records["numcode"] == "" and records["stdcode"] == "" and records["use_status"] == ""
                                return_data = Hash.new()
                                return_data[:success] = false
                                render :text => return_data.to_json, :layout => false
                        else
                                count_check = CodeEpnposwork.count(:all, :conditions => "wcode = '#{records["wcode"]}'")
                                if count_check > 0
                                        return_data = Hash.new()
                                        return_data[:success] = false
                                        return_data[:msg] = "มีรหัสตำแหน่งนี้แล้ว"
                                        render :text => return_data.to_json, :layout=>false
                                else
                                        records["use_status"] = (records["use_status"] == true) ? 1 : 0
                                        store = CodeEpnposwork.create(records)
                                        return_data = Hash.new()
                                        return_data[:success] = true
                                        return_data[:records] = {
                                                :id => store[:id],
                                                :wcode => store[:wcode],
                                                :gcode => store[:gcode],
                                                :sgcode => store[:sgcode],
                                                :wname => store[:wname],
                                                :level => store[:level],
                                                :minwage => store[:minwage],
                                                :maxwage => store[:maxwage],
                                                :wattrib => store[:wattrib],
                                                :note => store[:note],
                                                :numcode => store[:numcode],
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
                        count_check = CodeEpnposwork.count(:all , :conditions => "wcode = '#{records["wcode"]}' and id <> '#{records["id"]}' ")
                        if count_check > 0
                                return_data = Hash.new()
                                return_data[:success] = false
                                return_data[:msg] = "มีรหัสตำแหน่งนี้แล้ว"
                                render :text => return_data.to_json, :layout=>false
                        else
                                update_record = CodeEpnposwork.find(:all , :conditions => "id = '#{records["id"]}'")[0]
                                update_record.wcode = records["wcode"]
                                update_record.gcode = records["gcode"]
                                update_record.sgcode = records["sgcode"]
                                update_record.wname = records["wname"]
                                update_record.level = records["level"]
                                update_record.minwage = records["minwage"]
                                update_record.maxwage = records["maxwage"]
                                update_record.wattrib = records["wattrib"]
                                update_record.note = records["note"]
                                update_record.numcode = records["numcode"]
                                update_record.stdcode = records["stdcode"]
                                update_record.use_status = (records["use_status"] == true) ? 1 : 0
                                if update_record.save
                                        return_data = Hash.new()
                                        return_data[:success] = true
                                        return_data[:records]= {
                                                :id => records["id"],
                                                :wcode => records["wcode"],
                                                :gcode => records["gcode"],
                                                :sgcode => records["sgcode"],
                                                :wname => records["wname"],
                                                :level => records["level"],
                                                :minwage => records["minwage"],
                                                :maxwage => records["maxwage"],
                                                :wattrib => records["wattrib"],
                                                :note => records["note"],
                                                :numcode => records["numcode"],
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
                if CodeEpnposwork.delete(id)
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
                @records = CodeEpnposwork.find(:all, :conditions => case_search)
        end
end
