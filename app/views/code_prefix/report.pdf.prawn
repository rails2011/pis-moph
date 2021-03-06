pdf.font "#{Prawn::BASEDIR}/data/fonts/tahoma.ttf" 
records = @records.map do |records|
  [
	records.precode.to_i,
	records.prename,
	records.longpre,
	records.prefax,
	records.stdcode
  ]
end

pdf.table records, 
	:row_colors 		=> ["FFFFFF","DDDDDD"],
	:align_headers		=> :center,
	:border_style 		=> :grid,
	:headers 			=> ["รหัส","คำนำหน้าชื่อ","คำนำหน้าชื่อแบบยาว","prefax","รหัสแทน"],
	:align 				=> { 0 => :center, 1 => :left, 2 => :left, 3 => :left, 4 => :left },
	:position			=> :center


