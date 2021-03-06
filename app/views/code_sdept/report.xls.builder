xml.instruct! :xml, :version=>"1.0", :encoding=>"UTF-8" 
xml.Workbook({
  'xmlns'      => "urn:schemas-microsoft-com:office:spreadsheet", 
  'xmlns:o'    => "urn:schemas-microsoft-com:office:office",
  'xmlns:x'    => "urn:schemas-microsoft-com:office:excel",    
  'xmlns:html' => "http://www.w3.org/TR/REC-html40",
  'xmlns:ss'   => "urn:schemas-microsoft-com:office:spreadsheet" 
  }) do

  xml.Worksheet 'ss:Name' => 'รายงาน Code Subdept' do
    xml.Table do
        
    # Column
	xml.Column 'ss:Width'=>'50'
	xml.Column 'ss:Width'=>'50'
	xml.Column 'ss:Width'=>'200'
	xml.Column 'ss:Width'=>'200'
	xml.Column 'ss:Width'=>'50'
	xml.Column 'ss:Width'=>'50'
	xml.Column 'ss:Width'=>'50'
	xml.Column 'ss:Width'=>'50'
	xml.Column 'ss:Width'=>'50'
	xml.Column 'ss:Width'=>'50'
	xml.Column 'ss:Width'=>'50'
	xml.Column 'ss:Width'=>'50'
	xml.Column 'ss:Width'=>'50'
	xml.Column 'ss:Width'=>'50'
	xml.Column 'ss:Width'=>'50'
 
	# Header "รหัส","ชื่อย่อคำนำหน้า","คำนำหน้า","หน่วยงาน","รหัส sdt","รหัส sg","รหัส acode","รหัส trl","รหัสจังหวัด","รหัสอำเภอ","รหัสตำบล","รหัส fcode","รหัส lcode","สถานะ bkd","รหัสแทน"
	xml.Row do
	  xml.Cell { xml.Data 'รหัส', 'ss:Type' => 'String' }
	  xml.Cell { xml.Data 'ชื่อย่อคำนำหน้า', 'ss:Type' => 'String' }
	  xml.Cell { xml.Data 'คำนำหน้า', 'ss:Type' => 'String' }
	  xml.Cell { xml.Data 'หน่วยงาน', 'ss:Type' => 'String' }
	  xml.Cell { xml.Data 'รหัส sdt', 'ss:Type' => 'String' }
	  xml.Cell { xml.Data 'รหัส sg', 'ss:Type' => 'String' }
	  xml.Cell { xml.Data 'รหัส acode', 'ss:Type' => 'String' }
	  xml.Cell { xml.Data 'รหัส trl', 'ss:Type' => 'String' }
	  xml.Cell { xml.Data 'รหัสจังหวัด', 'ss:Type' => 'String' }
	  xml.Cell { xml.Data 'รหัสอำเภอ', 'ss:Type' => 'String' }
	  xml.Cell { xml.Data 'รหัสตำบล', 'ss:Type' => 'String' }
	  xml.Cell { xml.Data 'รหัส fcode', 'ss:Type' => 'String' }
	  xml.Cell { xml.Data 'รหัส lcode', 'ss:Type' => 'String' }
	  xml.Cell { xml.Data 'สถานะ bkd', 'ss:Type' => 'String' }
	  xml.Cell { xml.Data 'รหัสแทน', 'ss:Type' => 'String' }
	end

    # Rows
    for rec in @records
      xml.Row do
        xml.Cell { xml.Data rec.sdcode, 'ss:Type' => 'Number' }
        xml.Cell { xml.Data rec.shortpre, 'ss:Type' => 'String' }
        xml.Cell { xml.Data rec.longpre, 'ss:Type' => 'String' }
        xml.Cell { xml.Data rec.sdname, 'ss:Type' => 'String' }
        xml.Cell { xml.Data rec.sdtcode, 'ss:Type' => 'Number' }
        xml.Cell { xml.Data rec.sdgcode, 'ss:Type' => 'Number' }
        xml.Cell { xml.Data rec.acode, 'ss:Type' => 'Number' }
        xml.Cell { xml.Data rec.trlcode, 'ss:Type' => 'Number' }
        xml.Cell { xml.Data rec.provcode, 'ss:Type' => 'Number' }
        xml.Cell { xml.Data rec.amcode, 'ss:Type' => 'Number' }
        xml.Cell { xml.Data rec.tmcode, 'ss:Type' => 'Number' }
        xml.Cell { xml.Data rec.fcode, 'ss:Type' => 'Number' }
        xml.Cell { xml.Data rec.lcode, 'ss:Type' => 'Number' }
        xml.Cell { xml.Data rec.flagbkd, 'ss:Type' => 'String' }
        xml.Cell { xml.Data rec.stdcode, 'ss:Type' => 'String' }
      end
    end

    end
  end
end
