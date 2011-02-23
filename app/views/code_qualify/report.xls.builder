xml.instruct! :xml, :version=>"1.0", :encoding=>"UTF-8" 
xml.Workbook({
  'xmlns'      => "urn:schemas-microsoft-com:office:spreadsheet", 
  'xmlns:o'    => "urn:schemas-microsoft-com:office:office",
  'xmlns:x'    => "urn:schemas-microsoft-com:office:excel",    
  'xmlns:html' => "http://www.w3.org/TR/REC-html40",
  'xmlns:ss'   => "urn:schemas-microsoft-com:office:spreadsheet" 
  }) do

  xml.Worksheet 'ss:Name' => 'รายงาน Code Qualify' do
    xml.Table do
        
       # Column
			xml.Column 'ss:Width'=>'100'
			xml.Column 'ss:Width'=>'100'
			xml.Column 'ss:Width'=>'100'
			xml.Column 'ss:Width'=>'250'
			xml.Column 'ss:Width'=>'100'
 			xml.Column 'ss:Width'=>'100'

        # Header  "รหัสวุฒิการศึกษา","รหัส ecode","วุฒิการศึกษา","คำย่อคำนำหน้า","คำนำหน้า","รหัสแทน"
        xml.Row do
          xml.Cell { xml.Data 'รหัสวุฒิการศึกษา', 'ss:Type' => 'String' }
          xml.Cell { xml.Data 'รหัส ecode', 'ss:Type' => 'String' }
          xml.Cell { xml.Data 'วุฒิการศึกษา', 'ss:Type' => 'String' }
          xml.Cell { xml.Data 'คำย่อคำนำหน้า', 'ss:Type' => 'String' }
          xml.Cell { xml.Data 'คำนำหน้า', 'ss:Type' => 'String' }
          xml.Cell { xml.Data 'รหัสแทน', 'ss:Type' => 'String' }
				end

        # Rows
        for rec in @records
          xml.Row do
            xml.Cell { xml.Data rec.qcode, 'ss:Type' => 'Number' }
            xml.Cell { xml.Data rec.ecode, 'ss:Type' => 'Number' }
            xml.Cell { xml.Data rec.qualify, 'ss:Type' => 'String' }
            xml.Cell { xml.Data rec.shortpre, 'ss:Type' => 'String' }
            xml.Cell { xml.Data rec.longpre, 'ss:Type' => 'String' }
            xml.Cell { xml.Data rec.stdcode, 'ss:Type' => 'String' }
          end
        end

    end
  end
end
