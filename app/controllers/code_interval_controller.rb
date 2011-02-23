class CodeIntervalController < ApplicationController
        skip_before_filter :verify_authenticity_token
        def read
                limit = params[:limit]
                start = params[:start]
                search = Array.new
                case_search = ""
                if !(params[:fields].nil?) and !(params[:query].nil?) and params[:query] != "" and params[:fields] != ""
                        allfields = ActiveSupport::JSON.decode(params[:fields]).join('::varchar||') + "::varchar"
                        case_search = allfields + " LIKE '%" + params[:query] + "%'"
                end
                rs = CodeInterval.find(:all, :conditions => case_search, :limit => limit, :offset => start, :order => "incode")
                return_data = Hash.new()
                return_data[:totalCount] = CodeInterval.count(:all , :conditions => case_search)
                return_data[:records]   = rs.collect{|u| {
                        :id             => u.id,
                        :incode         => u.incode,
                        :inname         => u.inname, 
                        :stdcode        => u.stdcode,
                        :use_status     => u.use_status,
                        :upd_user       => u.upd_user
                } }
                render :text => return_data.to_json, :layout => false
        end
end
