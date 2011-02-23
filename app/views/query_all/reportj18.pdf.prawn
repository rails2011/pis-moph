pdf.font "#{Prawn::BASEDIR}/data/fonts/tahoma.ttf" 
records = Array.new()
for rec in @records
	rec_tmp = Array.new()
	for col in @col
		rec_tmp.push(rec[:"#{col}"].to_s)
	end
	records.push(rec_tmp)
end

pdf.table records, 
	:row_colors 		=> ["FFFFFF","DDDDDD"],
	:align_headers		=> :center,
	:border_style 		=> :grid,
	:headers 			=> @col_show,
	:align 				=> { 0 => :right, 1 => :left, 2 => :left, 3 => :left },
	:position			=> :center