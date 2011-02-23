# Filters added to this controller apply to all controllers in the application.
# Likewise, all the methods added will be available for all controllers.

class ApplicationController < ActionController::Base
  helper :all # include all helpers, all the time
  protect_from_forgery # See ActionController::RequestForgeryProtection for details

  # Scrub sensitive parameters from your log
  # filter_parameter_logging :password 
  def to_date_i(dt)
    if dt.nil? or dt == ""
       d=''
       d
    else
      dt = dt.split("/")
      d = (dt[2].to_i -543).to_s+"-"+dt[1]+"-"+dt[0]
      d     
    end
  end
  
  def year_fiscal_i(dt)
    dt = dt.split("-")
    dt = Time.local(dt[0].to_i,dt[1].to_i,dt[2].to_i)
    fiscal_min = Time.local(dt.year-1,10,1)
    fiscal_max = Time.local(dt.year,9,30)
    year_fiscal = ''
    if dt > fiscal_min and dt < fiscal_max
     year_fiscal = fiscal_max.year
    end     
    if dt > fiscal_max
      year_fiscal = fiscal_max.year + 1
    end
    year_fiscal   
  end
end
