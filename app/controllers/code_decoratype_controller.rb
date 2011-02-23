class CodeDecoratypeController < ApplicationController
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
                rs = CodeDecoratype.find(:all, :conditions => case_search, :limit => limit, :offset => start, :order => "id")
                return_data = Hash.new()
                return_data[:totalCount] = CodeDecoratype.count(:all , :conditions => case_search)
                return_data[:records]   = rs.collect{|u| {
                        :id           => u.id,                       
                        :dccode       => u.dccode,
                        :shortname    => u.shortname,
                        :dcname       => u.dcname,
                        :stdcode      => u.stdcode,
                        :use_status   => (u.use_status == '1') ? true : false
                } }
                render :text => return_data.to_json, :layout => false
        end

        def create
                records = ActiveSupport::JSON.decode(params[:records])
                if records.type == Hash
                        if records["dccode"] == "" and records["dcname"] == ""  and records["shortname"] == "" and records["use_status"] == ""
                                return_data = Hash.new()
                                return_data[:success] = false
                                render :text => return_data.to_json, :layout => false
                        else
                                count_check = CodeDecoratype.count(:all, :conditions => "dccode = '#{records["dccode"]}'")
                                if count_check > 0
                                        return_data = Hash.new()
                                        return_data[:success] = false
                                        return_data[:msg] = "มีรหัสนี้แล้ว"
                                        render :text => return_data.to_json, :layout=>false
                                else
                                        records["use_status"] = (records["use_status"] == true) ? 1 : 0
                                        store = CodeDecoratype.create(records)
                                        return_data = Hash.new()
                                        return_data[:success] = true
                                        return_data[:records] = {
                                                :id           => store[:id],
                                                :dccode       => store[:dccode],
                                                :shortname    => store[:shortname],
                                                :dcname       => store[:dcname],
                                                :use_status   => store[:use_status]
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
                        count_check = CodeDecoratype.count(:all , :conditions => "dccode = '#{records["dccode"]}' and id <> '#{records["id"]}' ")
                        if count_check > 0
                                return_data = Hash.new()
                                return_data[:success] = false
                                return_data[:msg] = "มีรหัสนี้แล้ว"
                                render :text => return_data.to_json, :layout=>false
                        else
                                update_record = CodeDecoratype.find(:all , :conditions => "id = '#{records["id"]}'")[0]
                                update_record.dccode = records["dccode"]
                                update_record.shortname = records["shortname"]
                                update_record.dcname = records["dcname"]
                                update_record.use_status = (records["use_status"] == true) ? 1 : 0
                                if update_record.save
                                        return_data = Hash.new()
                                        return_data[:success] = true
                                        return_data[:records]= {
                                                :id             => records["id"],
                                                :dccode         => records["dccode"],
                                                :shortname      => records["shortname"],
                                                :dcname         => records["dcname"],
                                                :use_status     => (records["use_status"] == true) ? 1 : 0
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
                if CodeDecoratype.delete(id)
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
                @records = CodeDecoratype.find(:all, :conditions => case_search, :order => "dccode")
	     end
  
        def genres
          case_search = ''
          if !params[:query].nil? and params[:query] != ""
            case_search = "dcname like '%#{params[:query]}%' or dccode like '%#{params[:query]}%'"
          end
          records = CodeDecoratype.find(:all,:conditions =>case_search)
          return_data = Hash.new()
          return_data[:success] = true
          return_data[:records]   = records.collect{|u| {   
            :dccode => u.dccode,
            :dcname => u.dcname
          } }
          render :text => return_data.to_json, :layout => false
        end 
	
end
