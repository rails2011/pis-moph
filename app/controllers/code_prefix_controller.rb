class CodePrefixController < ApplicationController
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
                rs = CodePrefix.find(:all, :conditions => case_search, :limit => limit, :offset => start, :order => "precode")
                return_data = Hash.new()
                return_data[:totalCount] = CodePrefix.count(:all , :conditions => case_search)
                return_data[:records]   = rs.collect{|u| {
                        :id => u.id,
                        :precode => u.precode,
                        :prename => u.prename,
                        :longpre => u.longpre,
                        :prefax => u.prefax,
                        :stdcode => u.stdcode,
                        :use_status => (u.use_status == '1') ? true : false
                } }
                render :text => return_data.to_json, :layout => false
        end

        def create
                records = ActiveSupport::JSON.decode(params[:records])
                if records.type == Hash
                        if records["id"] == "" and records["precode"] == "" and records["prename"] == "" and records["longpre"] == "" and records["prefax"] == "" and records["stdcode"] == "" and records["use_status"] == ""
                                return_data = Hash.new()
                                return_data[:success] = false
                                render :text => return_data.to_json, :layout => false
                        else
                                count_check = CodePrefix.count(:all, :conditions => "precode = '#{records["precode"]}'")
                                if count_check > 0
                                        return_data = Hash.new()
                                        return_data[:success] = false
                                        return_data[:msg] = "มีรหัสคำนำหน้าชื่อนี้แล้ว"
                                        render :text => return_data.to_json, :layout=>false
                                else
                                        records["use_status"] = (records["use_status"] == true) ? 1 : 0
                                        store = CodePrefix.create(records)
                                        return_data = Hash.new()
                                        return_data[:success] = true
                                        return_data[:records] = {
                                                :id => store[:id],
                                                :precode => store[:precode],
                                                :prename => store[:prename],
                                                :longpre => store[:longpre],
                                                :prefax => store[:prefax],
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
                        count_check = CodePrefix.count(:all , :conditions => "precode = '#{records["precode"]}' and id <> '#{records["id"]}' ")
                        if count_check > 0
                                return_data = Hash.new()
                                return_data[:success] = false
                                return_data[:msg] = "มีรหัสคำนำหน้าชื่อนี้แล้ว"
                                render :text => return_data.to_json, :layout=>false
                        else
                                update_record = CodePrefix.find(:all , :conditions => "id = '#{records["id"]}'")[0]
                                update_record.precode = records["precode"]
                                update_record.prename = records["prename"]
                                update_record.longpre = records["longpre"]
                                update_record.prefax = records["prefax"]
                                update_record.stdcode = records["stdcode"]
                                update_record.use_status = (records["use_status"] == true) ? 1 : 0
                                if update_record.save
                                        return_data = Hash.new()
                                        return_data[:success] = true
                                        return_data[:records]= {
                                                :id => records["id"],
                                                :precode => records["precode"],
                                                :prename => records["prename"],
                                                :longpre => records["longpre"],
                                                :prefax => records["prefax"],
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
                if CodePrefix.delete(id)
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
                @records = CodePrefix.find(:all, :conditions => case_search)
        end
        
        def genres
          records = CodePrefix.find(:all, :order => "id")
          return_data = Hash.new()
          return_data[:success] = true
          return_data[:records]   = records.collect{|u| {   
            :precode => u.precode,
            :prename => u.prename
          } }
          render :text => return_data.to_json, :layout => false
        end 
end
