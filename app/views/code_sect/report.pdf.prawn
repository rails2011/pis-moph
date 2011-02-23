pdf.font "#{Prawn::BASEDIR}/data/fonts/tahoma.ttf" 
records = @records.map do |records|
  [
	records.sectcode.to_i,
	records.shortname,
	records.sectname,
	records.stdcode
  ]
end

pdf.table records, 
	:row_colors 		=> ["FFFFFF","DDDDDD"],
	:align_headers		=> :center,
	:border_style 		=> :grid,
	:headers 			=> ["รหัส","ชื่อย่อ","ฝ่าย/กลุ่ม/งาน","รหัสแทน"],
	:align 				=> { 0 => :center, 1 => :left, 2 => :left, 3 => :left },
	:position			=> :center