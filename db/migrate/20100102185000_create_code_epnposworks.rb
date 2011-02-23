class CreateCodeEpnposworks < ActiveRecord::Migration
  def self.up
    create_table :code_epnposworks do |t|
      t.integer :wcode
      t.integer :gcode
      t.integer :sgcode
      t.string  :wname
      t.string  :level
			t.decimal :minwage, :precision => 8, :scale => 2
			t.decimal :maxwage, :precision => 8, :scale => 2
			t.string :wattrib
			t.string :note
      t.decimal :numcode
      t.string  :stdcode
      t.string  :use_status
      t.string  :upd_user 
      t.timestamps
    end
  end

  def self.down
    drop_table :code_epnposworks
  end
end