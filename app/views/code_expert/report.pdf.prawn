pdf.font "#{Prawn::BASEDIR}/data/fonts/tahoma.ttf" 
records = @records.map do |records|
  [
	records.epcode.to_i,
	records.prename,
	records.expert,
	records.stdcode
  ]
end

pdf.table records, 
	:row_colors 		=> ["FFFFFF","DDDDDD"],
	:align_headers		=> :center,
	:border_style 		=> :grid,
	:headers 			=> ["รหัส","คำนำหน้า","ความเชี่ยวชาญ"	,"รหัสแทน"],
	:align 				=> { 0 => :center, 1 => :left, 2 => :left, 3 => :left },
	:position			=> :center


