pdf.font "#{Prawn::BASEDIR}/data/fonts/tahoma.ttf" 
records = @records.map do |records|
  [
	records.sdcode.to_i,
	records.shortpre,
	records.longpre,
	records.sdname,
	records.sdtcode.to_i,
	records.sdgcode.to_i,
	records.acode.to_i,
	records.trlcode.to_i,
	records.provcode.to_i,
	records.amcode.to_i,
	records.tmcode.to_i,
	records.fcode.to_i,
	records.lcode.to_i,
	records.flagbkd,
	records.stdcode
  ]
end

pdf.table records, 
	:row_colors 		=> ["FFFFFF","DDDDDD"],
	:align_headers		=> :center,
	:border_style 		=> :grid,
	:headers 			=> ["รหัส","ชื่อย่อคำนำหน้า","คำนำหน้า","หน่วยงาน","รหัส sdt","รหัส sg","รหัส acode","รหัส trl","รหัสจังหวัด","รหัสอำเภอ","รหัสตำบล","รหัส fcode","รหัส lcode","สถานะ bkd","รหัสแทน"],
	:align 				=> { 0 => :center, 1 => :left, 2 => :left, 3 => :left, 4 => :right, 5 => :right, 6 => :right, 7 => :right, 8 => :right, 9 => :right, 10 => :right, 11 => :right, 12 => :right, 13 => :left, 14 => :left },
	:position			=> :center