class CreateCodePositions < ActiveRecord::Migration
  def self.up
    create_table :code_positions do |t|
      t.integer :poscode
      t.string  :shortpre
      t.string  :longpre
      t.string  :posname   
      t.string  :stdcode 
      t.string  :use_status
      t.string  :upd_user  
      t.timestamps
    end
  end

  def self.down
    drop_table :code_positions
  end
end
