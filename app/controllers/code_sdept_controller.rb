class CodeSdeptController < ApplicationController
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
                rs = CodeSdept.find(:all, :conditions => case_search, :limit => limit, :offset => start, :order => "sdcode")
                return_data = Hash.new()
                return_data[:totalCount] = CodeSdept.count(:all , :conditions => case_search)
                return_data[:records]   = rs.collect{|u| {
                        :id => u.id,
                        :sdcode => u.sdcode,
                        :shortpre => u.shortpre,
                        :longpre => u.longpre,
                        :sdname => u.sdname,
                        :sdtcode => u.sdtcode,
                        :sdgcode => u.sdgcode,
                        :acode => u.acode,
                        :trlcode => u.trlcode,
                        :provcode => u.provcode,
                        :amcode => u.amcode,
                        :tmcode => u.tmcode,
                        :fcode => u.fcode,
                        :lcode => u.lcode,
                        :flagbkd => u.flagbkd,
                        :stdcode => u.stdcode,
                        :use_status => (u.use_status == '1') ? true : false
                } }
                render :text => return_data.to_json, :layout => false
        end

        def create
                records = ActiveSupport::JSON.decode(params[:records])
                if records.type == Hash
                        if records["id"] == "" and records["sdcode"] == "" and records["shortpre"] == "" and records["longpre"] == "" and records["sdname"] == "" and records["sdtcode"] == "" and records["sdgcode"] == "" and records["acode"] == "" and records["trlcode"] == "" and records["provcode"] == "" and records["amcode"] == "" and records["tmcode"] == "" and records["fcode"] == "" and records["lcode"] == "" and records["flagbkd"] == "" and records["stdcode"] == "" and records["use_status"] == ""
                                return_data = Hash.new()
                                return_data[:success] = false
                                render :text => return_data.to_json, :layout => false
                        else
                                count_check = CodeSdept.count(:all, :conditions => "sdcode = '#{records["sdcode"]}'")
                                if count_check > 0
                                        return_data = Hash.new()
                                        return_data[:success] = false
                                        return_data[:msg] = "มีรหัสหน่วยงานนี้แล้ว"
                                        render :text => return_data.to_json, :layout=>false
                                else
                                        records["use_status"] = (records["use_status"] == true) ? 1 : 0
                                        store = CodeSdept.create(records)
                                        return_data = Hash.new()
                                        return_data[:success] = true
                                        return_data[:records] = {
                                                :id => store[:id],
                                                :sdcode => store[:sdcode],
                                                :shortpre => store[:shortpre],
                                                :longpre => store[:longpre],
                                                :sdname => store[:sdname],
                                                :sdtcode => store[:sdtcode],
                                                :sdgcode => store[:sdgcode],
                                                :acode => store[:acode],
                                                :trlcode => store[:trlcode],
                                                :provcode => store[:provcode],
                                                :amcode => store[:amcode],
                                                :tmcode => store[:tmcode],
                                                :fcode => store[:fcode],
                                                :lcode => store[:lcode],
                                                :flagbkd => store[:flagbkd],
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
                        count_check = CodeSdept.count(:all , :conditions => "sdcode = '#{records["sdcode"]}' and id <> '#{records["id"]}' ")
                        if count_check > 0
                                return_data = Hash.new()
                                return_data[:success] = false
                                return_data[:msg] = "มีรหัสตำแหน่งนี้แล้ว"
                                render :text => return_data.to_json, :layout=>false
                        else
                                update_record = CodeSdept.find(:all , :conditions => "id = '#{records["id"]}'")[0]
                                update_record.sdcode = records["sdcode"]
                                update_record.shortpre = records["shortpre"]
                                update_record.longpre = records["longpre"]
                                update_record.sdname = records["sdname"]
                                update_record.sdtcode = records["sdtcode"]
                                update_record.sdgcode = records["sdgcode"]
                                update_record.acode = records["acode"]
                                update_record.trlcode = records["trlcode"]
                                update_record.provcode = records["provcode"]
                                update_record.amcode = records["amcode"]
                                update_record.tmcode = records["tmcode"]
                                update_record.fcode = records["fcode"]
                                update_record.lcode = records["lcode"]
                                update_record.flagbkd = records["flagbkd"]
                                update_record.stdcode = records["stdcode"]
                                update_record.use_status = (records["use_status"] == true) ? 1 : 0
                                if update_record.save
                                        return_data = Hash.new()
                                        return_data[:success] = true
                                        return_data[:records]= {
                                                :id => records["id"],
                                                :sdcode => records["sdcode"],
                                                :shortpre => records["shortpre"],
                                                :longpre => records["longpre"],
                                                :sdname => records["sdname"],
                                                :sdtcode => records["sdtcode"],
                                                :sdgcode => records["sdgcode"],
                                                :acode => records["acode"],
                                                :trlcode => records["trlcode"],
                                                :provcode => records["provcode"],
                                                :amcode => records["amcode"],
                                                :tmcode => records["tmcode"],
                                                :fcode => records["fcode"],
                                                :lcode => records["lcode"],
                                                :flagbkd => records["flagbkd"],
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
                if CodeSdept.delete(id)
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
                @records = CodeSdept.find(:all, :conditions => case_search)
        end
        
        def genres
          case_search = ''
          if !params[:query].nil? and params[:query] !=  ''
            case_search = "(sdcode::varchar like '%#{params[:query]}%' or sdname like '%#{params[:query]}%')"
          end
          if !params[:provcode].nil?            
            i = 0
            tmp_search = Array.new()
            if params[:provcode] != ""
              tmp_search[i] = "provcode = #{params[:provcode]}"
              i= i+1
            end            
            if params[:amcode] != ""
              tmp_search[i] = "amcode = #{params[:amcode]}"
              i=i+1
            end            
            if params[:tmcode] != ""
              tmp_search[i] = "tmcode = #{params[:tmcode]}"
              i=i+1
            end            
            if params[:sdtcode] != ""
              tmp_search[i] = "sdtcode = #{params[:sdtcode]}"
              i=i+1
            end            
            if case_search == ""               
              case_search = tmp_search.join(" and ")
            else
              case_search = case_search + " and #{tmp_search.join(" and ")} "
            end
          end
          records = CodeSdept.find(:all,:conditions =>case_search)
          return_data = Hash.new()
          return_data[:success] = true
          return_data[:records]   = records.collect{|u| {   
            :sdcode => u.sdcode,
            :sdname => u.sdname
          } }
          render :text => return_data.to_json, :layout => false
       end 

end
