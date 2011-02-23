pdf.font "#{Prawn::BASEDIR}/data/fonts/tahoma.ttf" 
records = @records.map do |records|
  [
	records.wcode.to_i,
	records.gcode.to_i,
	records.sgcode.to_i,
	records.wname,
	records.level,
	records.minwage.to_f,
	records.maxwage.to_f,
	records.wattrib,
	records.note,
	records.numcode.to_i,
	records.stdcode
  ]
end

pdf.table records, 
	:row_colors 		=> ["FFFFFF","DDDDDD"],
	:align_headers		=> :center,
	:border_style 		=> :grid,
	:headers 			=> ["รหัสตำแหน่ง","รหัสกลุ่ม","รหัสหมวด","ชื่อตำแหน่ง","ระดับ","ค่าจ้างขั้นต่ำ","ค่าจ้างขั้นสูง","attribute","หมายเหตุ","รหัสตัวเลข","รหัสแทน"],
	:align 				=> { 0 => :center, 1 => :center, 2 => :center, 3 => :left, 4 => :left, 5 => :right, 6 => :right, 7 => :left, 8 => :left, 9 => :center, 10 => :center },
	:position			=> :center
