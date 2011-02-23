class CodeQualifyController < ApplicationController
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
                rs = CodeQualify.find(:all, :conditions => case_search, :limit => limit, :offset => start, :order => "qcode")
                return_data = Hash.new()
                return_data[:totalCount] = CodeQualify.count(:all , :conditions => case_search)
                return_data[:records]   = rs.collect{|u| {
                        :id => u.id,
                        :qcode => u.qcode.to_i,
                        :ecode => u.ecode.to_i,
                        :qualify => u.qualify,
                        :shortpre => u.shortpre,
                        :longpre => u.longpre,
                        :stdcode => u.stdcode,
                        :use_status => (u.use_status == '1') ? true : false
                } }
                render :text => return_data.to_json, :layout => false
        end

        def create
                records = ActiveSupport::JSON.decode(params[:records])
                if records.type == Hash
                        if records["id"] == "" and records["qcode"] == "" and records["ecode"] == "" and records["qualify"] == "" and records["shortpre"] == "" and records["longpre"] == "" and records["stdcode"] == "" and records["use_status"] == ""
                                return_data = Hash.new()
                                return_data[:success] = false
                                render :text => return_data.to_json, :layout => false
                        else
                                count_check = CodeQualify.count(:all, :conditions => "qcode = '#{records["qcode"]}'")
                                if count_check > 0
                                        return_data = Hash.new()
                                        return_data[:success] = false
                                        return_data[:msg] = "มีรหัสวุฒิการศึกษานี้แล้ว"
                                        render :text => return_data.to_json, :layout=>false
                                else
                                        records["use_status"] = (records["use_status"] == true) ? 1 : 0
                                        store = CodeQualify.create(records)
                                        return_data = Hash.new()
                                        return_data[:success] = true
                                        return_data[:records] = {
                                                :id => store[:id],
                                                :qcode => store[:qcode],
                                                :ecode => store[:ecode],
                                                :qualify => store[:qualify],
                                                :shortpre => store[:shortpre],
                                                :longpre => store[:longpre],
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
                        count_check = CodeQualify.count(:all , :conditions => "qcode = '#{records["qcode"]}' and id <> '#{records["id"]}' ")
                        if count_check > 0
                                return_data = Hash.new()
                                return_data[:success] = false
                                return_data[:msg] = "มีรหัสตำแหน่งนี้แล้ว"
                                render :text => return_data.to_json, :layout=>false
                        else
                                update_record = CodeQualify.find(:all , :conditions => "id = '#{records["id"]}'")[0]
                                update_record.qcode = records["qcode"]
                                update_record.ecode = records["ecode"]
                                update_record.qualify = records["qualify"]
                                update_record.shortpre = records["shortpre"]
                                update_record.longpre = records["longpre"]
                                update_record.stdcode = records["stdcode"]
                                update_record.use_status = (records["use_status"] == true) ? 1 : 0
                                if update_record.save
                                        return_data = Hash.new()
                                        return_data[:success] = true
                                        return_data[:records]= {
                                                :id => records["id"],
                                                :qcode => records["qcode"],
                                                :ecode => records["ecode"],
                                                :qualify => records["qualify"],
                                                :shortpre => records["shortpre"],
                                                :longpre => records["longpre"],
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
                if CodeQualify.delete(id)
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
                @records = CodeQualify.find(:all, :conditions => case_search)
        end
        
        def genres
          case_search = ''
          if !params[:query].nil?
            case_search = "qualify like '%#{params[:query]}%'"
          end
          records = CodeQualify.find(:all,:conditions =>case_search)
          return_data = Hash.new()
          return_data[:success] = true
          return_data[:records]   = records.collect{|u| {   
            :qcode    => u.qcode,
            :qualify  => u.qualify
          } }
          render :text => return_data.to_json, :layout => false
       end
end
