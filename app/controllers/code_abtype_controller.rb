class CodeAbtypeController < ApplicationController
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
                rs = CodeAbtype.find(:all, :conditions => case_search, :limit => limit, :offset => start, :order => "abcode")
                return_data = Hash.new()
                return_data[:totalCount] = CodeAbtype.count(:all , :conditions => case_search)
                return_data[:records]   = rs.collect{|u| {
                        :id => u.id,
                        :abcode => u.abcode,
                        :abtype => u.abtype,
                        :abcheck => u.abcheck,
                        :abcount => u.abcount,
                        :abquota => u.abquota,
                        :stdcode => u.stdcode,
                        :use_status => (u.use_status == '1') ? true : false
                } }
                render :text => return_data.to_json, :layout => false
        end

        def create
                records = ActiveSupport::JSON.decode(params[:records])
                if records.type == Hash
                        if records["id"] == "" and records["abcode"] == "" and records["abtype"] == "" and records["check"] == "" and records["count"] == "" and records["abquota"] == "" and records["stdcode"] == "" and records["use_status"] == ""
                                return_data = Hash.new()
                                return_data[:success] = false
                                render :text => return_data.to_json, :layout => false
                        else
                                count_check = CodeAbtype.count(:all, :conditions => "abcode = '#{records["abcode"]}'")
                                if count_check > 0
                                        return_data = Hash.new()
                                        return_data[:success] = false
                                        return_data[:msg] = "มีรหัสประเภทการลานี้แล้ว"
                                        render :text => return_data.to_json, :layout=>false
                                else
                                        records["use_status"] = (records["use_status"] == true) ? 1 : 0
                                        store = CodeAbtype.create(records)
                                        return_data = Hash.new()
                                        return_data[:success] = true
                                        return_data[:records] = {
                                                :id => store[:id],
                                                :abcode => store[:abcode],
                                                :abtype => store[:abtype],
                                                :abcheck => store[:check],
                                                :abcount => store[:count],
                                                :abquota => store[:abquota],
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
                        count_check = CodeAbtype.count(:all , :conditions => "abcode = '#{records["abcode"]}' and id <> '#{records["id"]}' ")
                        if count_check > 0
                                return_data = Hash.new()
                                return_data[:success] = false
                                return_data[:msg] = "มีรหัสตำแหน่งนี้แล้ว"
                                render :text => return_data.to_json, :layout=>false
                        else
                                update_record = CodeAbtype.find(:all , :conditions => "id = '#{records["id"]}'")[0]
                                update_record.abcode = records["abcode"]
                                update_record.abtype = records["abtype"]
                                update_record.abcheck = records["abcheck"]
                                update_record.abcount = records["abcount"]
                                update_record.abquota = records["abquota"]
                                update_record.stdcode = records["stdcode"]
                                update_record.use_status = (records["use_status"] == true) ? 1 : 0
                                if update_record.save
                                        return_data = Hash.new()
                                        return_data[:success] = true
                                        return_data[:records]= {
                                                :id => records["id"],
                                                :abcode => records["abcode"],
                                                :abtype => records["abtype"],
                                                :abcheck => records["abcheck"],
                                                :abcount => records["abcount"],
                                                :abquota => records["abquota"],
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
                if CodeAbtype.delete(id)
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
                @records = CodeAbtype.find(:all, :conditions => case_search)
        end
        
       def genres
        case_search = ''
          if !params[:query].nil?
            case_search = "abtype like '%#{params[:query]}%'"
          end
          records = CodeAbtype.find(:all,:conditions =>case_search)
          return_data = Hash.new()
          return_data[:success] = true
          return_data[:records]   = records.collect{|u| {   
            :abcode    => u.abcode,
            :abtype  => u.abtype
          } }
          render :text => return_data.to_json, :layout => false
       end        

end
