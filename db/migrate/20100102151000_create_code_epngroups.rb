class CreateCodeEpngroups < ActiveRecord::Migration
  def self.up
    create_table :code_epngroups do |t|
      t.integer :gcode
      t.string  :gname
      t.string  :stdcode
      t.string  :use_status
      t.string  :upd_user   
      t.timestamps
    end
  end

  def self.down
    drop_table :code_epngroups
  end
end