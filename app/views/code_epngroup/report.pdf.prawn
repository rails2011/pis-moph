pdf.font "#{Prawn::BASEDIR}/data/fonts/tahoma.ttf" 
records = @records.map do |records|
  [
	records.gcode.to_i,
	records.gname,
	records.stdcode
  ]
end

pdf.table records, 
	:row_colors 		=> ["FFFFFF","DDDDDD"],
	:align_headers		=> :center,
	:border_style 		=> :grid,
	:headers 			=> ["รหัส","กลุ่ม","รหัสแทน"],
	:align 				=> { 0 => :center, 1 => :left, 2 => :left },
	:position			=> :center


