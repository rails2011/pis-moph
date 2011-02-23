class CodeGrouplevelController < ApplicationController
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
                rs = CodeGrouplevel.find(:all, :conditions => case_search, :limit => limit, :offset => start, :order => "ccode")
                return_data = Hash.new()
                return_data[:totalCount] = CodeGrouplevel.count(:all , :conditions => case_search)
                return_data[:records]   = rs.collect{|u| {
                        :id => u.id,
                        :ccode => u.ccode,
                        :cname => u.cname,
                        :scname => u.scname,
                        :stdcode => u.stdcode,
                        :minsal => u.minsal,
                        :maxsal => u.maxsal,
                        :gname => u.gname,
                        :clname => u.clname,
                        :use_status => (u.use_status == '1') ? true : false
                } }
                render :text => return_data.to_json, :layout => false
        end

        def create
                records = ActiveSupport::JSON.decode(params[:records])
                if records.type == Hash
                        if records["id"] == "" and records["ccode"] == "" and records["cname"] == "" and records["scname"] == "" and records["stdcode"] == "" and records["minsal"] == "" and records["maxsal"] == "" and records["gname"] == "" and records["clname"] == "" and records["use_status"] == ""
                                return_data = Hash.new()
                                return_data[:success] = false
                                render :text => return_data.to_json, :layout => false
                        else
                                count_check = CodeGrouplevel.count(:all, :conditions => "ccode = '#{records["ccode"]}'")
                                if count_check > 0
                                        return_data = Hash.new()
                                        return_data[:success] = false
                                        return_data[:msg] = "มีรหัสตำแหน่งนี้แล้ว"
                                        render :text => return_data.to_json, :layout=>false
                                else
                                        records["use_status"] = (records["use_status"] == true) ? 1 : 0
                                        store = CodeGrouplevel.create(records)
                                        return_data = Hash.new()
                                        return_data[:success] = true
                                        return_data[:records] = {
                                                :id => store[:id],
                                                :ccode => store[:ccode],
                                                :cname => store[:cname],
                                                :scname => store[:scname],
                                                :stdcode => store[:stdcode],
                                                :minsal => store[:minsal],
                                                :maxsal => store[:maxsal],
                                                :gname => store[:gname],
                                                :clname => store[:clname],
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
                        count_check = CodeGrouplevel.count(:all , :conditions => "ccode = '#{records["ccode"]}' and id <> '#{records["id"]}' ")
                        if count_check > 0
                                return_data = Hash.new()
                                return_data[:success] = false
                                return_data[:msg] = "มีรหัสตำแหน่งนี้แล้ว"
                                render :text => return_data.to_json, :layout=>false
                        else
                                update_record = CodeGrouplevel.find(:all , :conditions => "id = '#{records["id"]}'")[0]
                                update_record.ccode = records["ccode"]
                                update_record.cname = records["cname"]
                                update_record.scname = records["scname"]
                                update_record.stdcode = records["stdcode"]
                                update_record.minsal = records["minsal"]
                                update_record.maxsal = records["maxsal"]
                                update_record.gname = records["gname"]
                                update_record.clname = records["clname"]
                                update_record.use_status = (records["use_status"] == true) ? 1 : 0
                                if update_record.save
                                        return_data = Hash.new()
                                        return_data[:success] = true
                                        return_data[:records]= {
                                                :id => records["id"],
                                                :ccode => records["ccode"],
                                                :cname => records["cname"],
                                                :scname => records["scname"],
                                                :stdcode => records["stdcode"],
                                                :minsal => records["minsal"],
                                                :maxsal => records["maxsal"],
                                                :gname => records["gname"],
                                                :clname => records["clname"],
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
                if CodeGrouplevel.delete(id)
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
                @records = CodeGrouplevel.find(:all, :conditions => case_search)
        end
        
        def genres
          case_search = ''
          if !params[:query].nil?
            case_search = "cname like '%#{params[:query]}%'"
          end
          records = CodeGrouplevel.find(:all,:conditions =>case_search)
          return_data = Hash.new()
          return_data[:success] = true
          return_data[:records]   = records.collect{|u| {   
            :ccode => u.ccode,
            :cname => u.cname
          } }
          render :text => return_data.to_json, :layout => false
       end          
end
