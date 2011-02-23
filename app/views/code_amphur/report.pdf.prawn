pdf.font "#{Prawn::BASEDIR}/data/fonts/tahoma.ttf" 
records = @records.map do |records|
  [
	records.amcode,
	records.amname
  ]
end

pdf.table records, 
	:row_colors 		=> ["FFFFFF","DDDDDD"],
	:align_headers		=> :center,
	:border_style 		=> :grid,
	:headers 			=> ["รหัสอำเภอ","อำเภอ"],
	:align 				=> { 0 => :right, 1 => :left, 2 => :left },
	:position			=> :center


