pdf.font "#{Prawn::BASEDIR}/data/fonts/tahoma.ttf" 
records = @records.map do |records|
  [
	records.deptcode.to_i,
	records.deptname,
	records.stdcode
  ]
end

pdf.table records, 
	:row_colors 		=> ["FFFFFF","DDDDDD"],
	:align_headers		=> :center,
	:border_style 		=> :grid,
	:headers 			=> ["รหัส","กรม","รหัสแทน"],
	:align 				=> { 0 => :center, 1 => :left, 2 => :left },
	:position			=> :center


