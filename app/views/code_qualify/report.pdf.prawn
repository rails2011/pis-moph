pdf.font "#{Prawn::BASEDIR}/data/fonts/tahoma.ttf" 
records = @records.map do |records|
  [
	records.qcode.to_i,
	records.ecode.to_i,
	records.qualify,
	records.shortpre,
	records.longpre,
	records.stdcode
  ]
end

pdf.table records, 
	:row_colors 		=> ["FFFFFF","DDDDDD"],
	:align_headers		=> :center,
	:border_style 		=> :grid,
	:headers 			=> ["รหัสวุฒิการศึกษา","รหัส ecode","วุฒิการศึกษา","คำย่อคำนำหน้า","คำนำหน้า","รหัสแทน"],
	:align 				=> { 0 => :center, 1 => :left, 2 => :left, 3 => :left, 4 => :left, 5 => :left },
	:position			=> :center


