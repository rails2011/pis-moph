xml.instruct! :xml, :version=>"1.0", :encoding=>"UTF-8" 
xml.Workbook({
  'xmlns'      => "urn:schemas-microsoft-com:office:spreadsheet", 
  'xmlns:o'    => "urn:schemas-microsoft-com:office:office",
  'xmlns:x'    => "urn:schemas-microsoft-com:office:excel",    
  'xmlns:html' => "http://www.w3.org/TR/REC-html40",
  'xmlns:ss'   => "urn:schemas-microsoft-com:office:spreadsheet" 
  }) do

  xml.Worksheet 'ss:Name' => 'รายงาน Code Epnposwork' do
    xml.Table do
        
       # Column
			xml.Column 'ss:Width'=>'100'
			xml.Column 'ss:Width'=>'100'
			xml.Column 'ss:Width'=>'100'
 
        # Header "รหัสตำแหน่ง","รหัสกลุ่ม","รหัสหมวด","ชื่อตำแหน่ง","ระดับ","ค่าจ้างขั้นต่ำ","ค่าจ้างขั้นสูง","attribute","หมายเหตุ","รหัสตัวเลข","รหัสแทน"
        xml.Row do
          xml.Cell { xml.Data 'รหัสตำแหน่ง', 'ss:Type' => 'String' }
          xml.Cell { xml.Data 'รหัสกลุ่ม', 'ss:Type' => 'String' }
          xml.Cell { xml.Data 'รหัสหมวด', 'ss:Type' => 'String' }
          xml.Cell { xml.Data 'ชื่อตำแหน่ง', 'ss:Type' => 'String' }
          xml.Cell { xml.Data 'ระดับ', 'ss:Type' => 'String' }
          xml.Cell { xml.Data 'ค่าจ้างขั้นต่ำ', 'ss:Type' => 'String' }
          xml.Cell { xml.Data 'ค่าจ้างขั้นสูง', 'ss:Type' => 'String' }
          xml.Cell { xml.Data 'attribute', 'ss:Type' => 'String' }
          xml.Cell { xml.Data 'หมายเหตุ', 'ss:Type' => 'String' }
          xml.Cell { xml.Data 'รหัสตัวเลข', 'ss:Type' => 'String' }
          xml.Cell { xml.Data 'รหัสแทน', 'ss:Type' => 'String' }
        end

        # Rows
        for rec in @records
          xml.Row do
            xml.Cell { xml.Data rec.wcode, 'ss:Type' => 'Number' }
            xml.Cell { xml.Data rec.gcode, 'ss:Type' => 'Number' }
            xml.Cell { xml.Data rec.sgcode, 'ss:Type' => 'Number' }
            xml.Cell { xml.Data rec.wname, 'ss:Type' => 'String' }
            xml.Cell { xml.Data rec.level, 'ss:Type' => 'String' }
            xml.Cell { xml.Data rec.minwage, 'ss:Type' => 'Number', 'ss:StyleID' => 'Decimal' }
            xml.Cell { xml.Data rec.maxwage, 'ss:Type' => 'Number', 'ss:StyleID' => 'Decimal' }
            xml.Cell { xml.Data rec.wattrib, 'ss:Type' => 'String' }
            xml.Cell { xml.Data rec.note, 'ss:Type' => 'String' }
            xml.Cell { xml.Data rec.numcode, 'ss:Type' => 'Number' }
            xml.Cell { xml.Data rec.stdcode, 'ss:Type' => 'String' }
          end
        end

    end
  end
end
