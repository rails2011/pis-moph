class DataPersonalController < ApplicationController
      skip_before_filter :verify_authenticity_token
      def read
          limit = params[:limit]
          start = params[:start]
          search = Array.new
          case_search = ""
          if !(params[:query].nil?) and params[:query] != ""
            field_search = ActiveSupport::JSON.decode(params[:fields])  
            
            field_search.collect!{|x| (x =="prename")? "cpf.prename":x}    
            field_search.collect!{|x| (x =="fname")? "pp.fname":x}    
            field_search.collect!{|x| (x =="lname")? "pp.lname":x}    
            field_search.collect!{|x| (x =="pid")? "pp.pid":x}    
            field_search.collect!{|x| (x =="birthdate")? "pp.birthdate":x}    
            
            allfields = field_search.join('::varchar||') + "::varchar"
            case_search = " where  "+allfields + " LIKE '%" + params[:query] + "%'" + " "  
          end
          sql = <<-EOF
                      SELECT 
                        pp.id,pp.precode
                        ,pp.fname,pp.lname
                        ,pp.birthdate,pp.sex
                        ,pp.mrcode,pp.race
                        ,pp.nationality,pp.relcode
                        ,pp.address1,pp.address2
                        ,pp.tel,pp.picname,pp.pis_personel_id
                        ,pp.bloodgroup,pp.provcode
                        ,pp.picname,cpf.prename
                        ,cm.marital ,cr.relname
                        ,cpv.shortpre,cpv.provname   
                        ,pp.pid                      
                      FROM 
                        pis_personels pp 
                        left join code_prefixes cpf on (pp.precode = cpf.precode)
                        left join code_maritals cm on (pp.mrcode = cm.mrcode)
                        left join code_religs cr on (pp.relcode = cr.relcode)
                        left join code_provinces cpv on (pp.provcode = cpv.provcode)
          EOF
          sql = sql + case_search
          rs = PisPersonel.find_by_sql( sql+" order by pp.id limit #{limit} offset #{start} ")
          return_data = Hash.new()
          return_data[:totalCount] = PisPersonel.find_by_sql(sql).length
          return_data[:records]   = rs.collect{|u| {
                  :id                    => u.id,
                  :precode               => u.precode,
                  :fname                 => u.fname,
                  :lname                 => u.lname,
                  :birthdate             => u.birthdate,
                  :sex                   => u.sex,
                  :mrcode                => u.mrcode,
                  :race                  => u.race,
                  :nationality           => u.nationality,
                  :relcode                => u.relcode,
                  :address1              => u.address1,
                  :address2              => u.address2,
                  :tel                   => u.tel,
                  :picname               => u.picname,
                  :pis_personel_id       => u.pis_personel_id,
                  :bloodgroup            => u.bloodgroup,
                  :provcode              => u.provcode,
                  :picname               => u.picname,
                  :prename               => u.prename,
                  :marital               => u.marital,
                  :relname               => u.relname,
                  :shortpre              => u.shortpre,
                  :provname              => u.provname,
                  :pid                   => u.pid
          }}
          render :text => return_data.to_json, :layout => false
      end
        
      def create        
        count_check = PisPersonel.count(:all, :conditions => "pid = '#{params[:pid]}'")
        if count_check > 0
                return_data = Hash.new()
                return_data[:success] = false
                return_data[:msg] = "มีเลขบัตรประชาชนนี้แล้ว"
                render :text => return_data.to_json, :layout=>false
        else
                if !params[:picname].nil?
                  upload = UploadPicPisPersonel.save(params[:picname],"rwerewrwe")
                end          
                store = PisPersonel.new()
                store.precode              = params[:precode]
                store.fname                = params[:fname]
                store.lname                = params[:lname]
                store.birthdate            = to_date_i(params[:birthdate])
                store.sex                  = params[:sex]
                store.mrcode               = params[:mrcode]
                store.race                 = params[:race]
                store.nationality          = params[:nationality]
                store.relcode              = params[:relcode]
                store.address1             = params[:address1]
                store.address2             = params[:address2]
                store.tel                  = params[:tel]                
                #store.pis_personel_id      = params[:pis_personel_id]
                store.bloodgroup           = params[:bloodgroup]
                store.provcode             = params[:provcode]
                store.pid                  = params[:pid]
                store.zip                  = params[:zip]                
                if store.save
                  render :text => "{success:true}",:layout => false
                else
                  render :text => "{success:false}",:layout => false
                end
        end                 
                      
      end
      
      def edit                                                                          
        count_check = PisPersonel.count(:all, :conditions => "pid = '#{params[:pid]}' and id <> '#{params[:id]}'")
        if count_check > 0
                return_data = Hash.new()
                return_data[:success] = false
                return_data[:msg] = "มีเลขบัตรประชาชนนี้แล้ว"
                render :text => return_data.to_json, :layout=>false
        else
                store = PisPersonel.find(:all , :conditions => "id = '#{params["id"]}'")[0]   
                store.precode              = params[:precode]
                store.fname                = params[:fname]
                store.lname                = params[:lname]
                store.birthdate            = to_date_i(params[:birthdate])
                store.sex                  = params[:sex]
                store.mrcode               = params[:mrcode]
                store.race                 = params[:race]
                store.nationality          = params[:nationality]
                store.relcode              = params[:relcode]
                store.address1             = params[:address1]
                store.address2             = params[:address2]
                store.tel                  = params[:tel]
                store.picname              = params[:picname]
                store.pis_personel_id      = params[:pis_personel_id]
                store.bloodgroup           = params[:bloodgroup]
                store.provcode             = params[:provcode]
                store.pid                  = params[:pid]
                store.zip                  = params[:zip]
                
                if store.save
                  render :text => "{success:true}",:layout => false
                else
                  render :text => "{success:false}",:layout => false
                end
        end
      end
      
      def search_edit
        rs = PisPersonel.find(params[:id])   
        
        return_data = Hash.new()
        return_data[:data] = [
          :precode                  => (rs[:precode] == nil)? "":rs[:precode],
          :fname                    => (rs[:fname] == nil)? "":rs[:fname],
          :lname                    => (rs[:lname] == nil)? "":rs[:lname],
          :birthdate                => (rs[:birthdate] == nil)? "":rs[:birthdate],
          :sex                      => (rs[:sex] == nil)? "":rs[:sex],
          :mrcode                   => (rs[:mrcode] == nil)? "":rs[:mrcode],
          :race                     => (rs[:race] == nil)? "":rs[:race],
          :nationality              => (rs[:nationality] == nil)? "":rs[:nationality],
          :relcode                   => (rs[:relcode] == nil)? "":rs[:relcode],
          :address1                 => (rs[:address1] == nil)? "":rs[:address1],
          :address2                 => (rs[:address2] == nil)? "":rs[:address2],
          :tel                      => (rs[:tel] == nil)? "":rs[:tel],
          :picname                  => (rs[:picname] == nil)? "":rs[:picname],
          :pis_personel_id          => (rs[:pis_personel_id] == nil)? "":rs[:pis_personel_id],
          :bloodgroup               => (rs[:bloodgroup] == nil)? "":rs[:bloodgroup],
          :provcode                 => (rs[:provcode] == nil)? "":rs[:provcode],
          :pid                      => (rs[:pid] == nil)? "":rs[:pid],
          :zip                      => (rs[:zip] == nil)? "":rs[:zip],
        ]               
        render :text => return_data.to_json, :layout => false
        
        
    end   

    def search_id
      rs = PisPersonel.find(:first,:conditions => "pis_personel_id = '#{params[:pis_personel_id]}'")
      if rs.nil?
        render :text => "{data:''}" ,:layout => false
      else
        render :text => "{data:#{rs.id},record:{data:{fname:'#{rs.fname}',lname:'#{rs.lname}',prename:'#{CodePrefix.find(:first,:conditions=>"precode = '#{rs.precode}'").prename }'        }}}" ,:layout => false
      end
      
    end
    ########end Controller  
end 
