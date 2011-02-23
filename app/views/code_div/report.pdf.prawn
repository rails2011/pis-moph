pdf.font "#{Prawn::BASEDIR}/data/fonts/tahoma.ttf" 
records = @records.map do |records|
  [
	records.divcode.to_i,
	records.divname,
	records.prefix,
	records.flag,
	records.stdcode
  ]
end

pdf.table records, 
	:row_colors 		=> ["FFFFFF","DDDDDD"],
	:align_headers		=> :center,
	:border_style 		=> :grid,
	:headers 			=> ["รหัส","กอง","คำนำหน้า","Flag","รหัสแทน"],
	:align 				=> { 0 => :center, 1 => :left, 2 => :left, 4 => :left, 4 => :left },
	:position			=> :center


