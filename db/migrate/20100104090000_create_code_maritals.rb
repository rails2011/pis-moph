class CreateCodeMaritals < ActiveRecord::Migration
  def self.up
    create_table :code_maritals do |t|
      t.integer :mrcode
      t.string  :marital
      t.string  :stdcode
      t.string  :use_status
      t.string  :upd_user 
      t.timestamps
    end
  end

  def self.down
    drop_table :code_abtypes
  end
end