pdf.font "#{Prawn::BASEDIR}/data/fonts/tahoma.ttf" 
records = @records.map do |records|
  [
	records.codetrade,
	records.trade
  ]
end

pdf.table records, 
	:row_colors 		=> ["FFFFFF","DDDDDD"],
	:align_headers		=> :center,
	:border_style 		=> :grid,
	:headers 		=>      ["รหัส","ใบอนุญาตประกอบวิชาชีพ"],
	:align 			=> { 0 => :center, 1 => :left, 2 => :left, 3 => :left, 4 => :right, 5 => :right, 6 => :left, 7 => :left },
	:position		=> :center