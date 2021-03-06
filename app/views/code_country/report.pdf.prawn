pdf.font "#{Prawn::BASEDIR}/data/fonts/tahoma.ttf" 
records = @records.map do |records|
  [
	records.cocode.to_i,
	records.coname
  ]
end

pdf.table records, 
	:row_colors 		=> ["FFFFFF","DDDDDD"],
	:align_headers		=> :center,
	:border_style 		=> :grid,
	:headers 			=> ["รหัส","ประเทศ"],
	:align 				=> { 0 => :center, 1 => :left },
	:position			=> :center


