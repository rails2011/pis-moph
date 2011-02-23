class QueryAllController < ApplicationController
  skip_before_filter :verify_authenticity_token
  def j18
    limit = params[:limit]
    start = params[:start]
    col = params[:col].split(',')
    where = ActiveSupport::JSON.decode(params[:where])
    tmp_where = ""
    
    where.each_index {|x| 
      if where[x]["operator"] == "like"
        where[x]["id"] = "%#{where[x]["id"]}%"
      end
      if x == (where.length - 1)
        tmp_where += " #{where[x]["field"]}::varchar #{where[x]["operator"]} '#{where[x]["id"]}' "
      else
        tmp_where += " #{where[x]["field"]}::varchar #{where[x]["operator"]} '#{where[x]["id"]}' #{where[x]["operator2"]} "
      end
    }

    sql =<<-EOF
        SELECT 
                  pp.fname
                  ,pp.lname
                  ,cm.minname as mincode_
                  ,cd.prefix || ' ' || cd.divname as divcode_
                  ,cdp.deptname as deptcode_
                  ,cs.shortpre || ' ' || cs.sdname as sdcode_
                  ,cst.sectname as sectcode_
                  ,cj.jobname as jobcode_
                  ,cp.shortpre || ' ' || cp.posname as poscode_
                  ,cex.shortpre || ' ' || cex.exname as excode_
                  ,cep.prename || ' ' || cep.expert as epcode_
                  ,cpt.ptname as ptcode_
                  ,pj.salary
          FROM 
                  pis_j18s as pj
                  left join pis_personels as pp on pj.pis_personel_id = pp.pis_personel_id
                  left join code_minis as cm on pj.mincode = cm.mincode
                  left join code_divs as cd on pj.divcode = cd.divcode
                  left join code_depts as cdp on pj.deptcode = cdp.deptcode
                  left join code_sdepts as cs on pj.sdcode = cs.sdcode
                  left join code_sects as cst on pj.sectcode = cst.sectcode
                  left join code_jobs as cj on pj.jobcode = cj.jobcode
                  left join code_positions as cp on pj.poscode = cp.poscode
                  left join code_executives as cex on pj.excode = cex.excode
                  left join code_experts as cep on pj.epcode = cep.epcode
                  left join code_postypes as cpt on pj.ptcode = cpt.ptcode
          WHERE 
                  pj.flagupdate = '1' and
    EOF
        
    sql = sql + "(" + tmp_where + ")"
    rs = PisJ18.find_by_sql(sql+" order by pj.posid limit #{limit} offset #{start} ")
    return_data = Hash.new()
    return_data[:totalCount] = PisJ18.find_by_sql(sql).length
    return_data[:records]    = rs.collect{|u| {   
      :fname             => u.fname,
      :lname             => u.lname,
      :mincode           => u.mincode_,
      :divcode           => u.divcode_,
      :deptcode          => u.deptcode_,
      :sdcode            => u.sdcode_,
      :sectcode          => u.sectcode_,
      :jobcode           => u.jobcode_,
      :poscode           => u.poscode_,
      :excode            => u.excode_,
      :epcode            => u.epcode_,
      :ptcode            => u.ptcode_,
      :salary            => u.salary,
    } }              
    render :text => return_data.to_json, :layout => false
  end
  
  def reportj18
    @col      = params[:col].split(',')
    @col_show = params[:col_show].split(',')
    where = ActiveSupport::JSON.decode(params[:where])
    tmp_where = ""    
    where.each_index {|x| 
      if x == (where.length - 1)
        tmp_where += " #{where[x]["field"]} #{where[x]["operator"]} '#{where[x]["id"]}' "
      else
        tmp_where += " #{where[x]["field"]} #{where[x]["operator"]} '#{where[x]["id"]}' #{where[x]["operator2"]} "
      end
    }
    sql =<<-EOF
        SELECT 
                  pp.fname
                  ,pp.lname
                  ,cm.minname as mincode_
                  ,cd.prefix || ' ' || cd.divname as divcode_
                  ,cdp.deptname as deptcode_
                  ,cs.shortpre || ' ' || cs.sdname as sdcode_
                  ,cst.sectname as sectcode_
                  ,cj.jobname as jobcode_
                  ,cp.shortpre || ' ' || cp.posname as poscode_
                  ,cex.shortpre || ' ' || cex.exname as excode_
                  ,cep.prename || ' ' || cep.expert as epcode_
                  ,cpt.ptname as ptcode_
                  ,pj.salary
          FROM 
                  pis_j18s as pj
                  left join pis_personels as pp on pj.pis_personel_id = pp.pis_personel_id
                  left join code_minis as cm on pj.mincode = cm.mincode
                  left join code_divs as cd on pj.divcode = cd.divcode
                  left join code_depts as cdp on pj.deptcode = cdp.deptcode
                  left join code_sdepts as cs on pj.sdcode = cs.sdcode
                  left join code_sects as cst on pj.sectcode = cst.sectcode
                  left join code_jobs as cj on pj.jobcode = cj.jobcode
                  left join code_positions as cp on pj.poscode = cp.poscode
                  left join code_executives as cex on pj.excode = cex.excode
                  left join code_experts as cep on pj.epcode = cep.epcode
                  left join code_postypes as cpt on pj.ptcode = cpt.ptcode
          WHERE 
                  pj.flagupdate = '1' and
    EOF
        
    sql = sql + "(" + tmp_where + ")"
    rs = PisJ18.find_by_sql(sql)    
    @records    = rs.collect{|u| {   
      :fname             => u.fname,
      :lname             => u.lname,
      :mincode           => u.mincode_,
      :divcode           => u.divcode_,
      :deptcode          => u.deptcode_,
      :sdcode            => u.sdcode_,
      :sectcode          => u.sectcode_,
      :jobcode           => u.jobcode_,
      :poscode           => u.poscode_,
      :excode            => u.excode_,
      :epcode            => u.epcode_,
      :ptcode            => u.ptcode_,
      :salary            => u.salary,
    } }    
    
    #render :text => @col
  end
  
end
