xml.instruct! :xml, :version=>"1.0", :encoding=>"UTF-8" 
xml.Workbook({
  'xmlns'      => "urn:schemas-microsoft-com:office:spreadsheet", 
  'xmlns:o'    => "urn:schemas-microsoft-com:office:office",
  'xmlns:x'    => "urn:schemas-microsoft-com:office:excel",    
  'xmlns:html' => "http://www.w3.org/TR/REC-html40",
  'xmlns:ss'   => "urn:schemas-microsoft-com:office:spreadsheet" 
  }) do

  xml.Worksheet 'ss:Name' => 'รายงาน Code Job' do
    xml.Table do
        
    # Column
	xml.Column 'ss:Width'=>'100'
	xml.Column 'ss:Width'=>'250'
 	xml.Column 'ss:Width'=>'100'

	# Header "รหัส","งาน","รหัสแทน"
	xml.Row do
	  xml.Cell { xml.Data 'รหัส', 'ss:Type' => 'String' }
	  xml.Cell { xml.Data 'งาน', 'ss:Type' => 'String' }
	  xml.Cell { xml.Data 'รหัสแทน', 'ss:Type' => 'String' }
	end

    # Rows
    for rec in @records
      xml.Row do
        xml.Cell { xml.Data rec.jobcode, 'ss:Type' => 'Number' }
        xml.Cell { xml.Data rec.jobname, 'ss:Type' => 'String' }
        xml.Cell { xml.Data rec.stdcode, 'ss:Type' => 'String' }
      end
    end

    end
  end
end
