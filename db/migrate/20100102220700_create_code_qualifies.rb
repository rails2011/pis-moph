class CreateCodeQualifies < ActiveRecord::Migration
  def self.up
    create_table :code_qualifies do |t|
      t.integer :qcode
      t.integer :ecode
      t.string  :qualify
      t.strinig :shortpre
      t.strinig :longpre
      t.string  :stdcode
      t.string  :use_status
      t.string  :upd_user 
      t.timestamps
    end
  end

  def self.down
    drop_table :code_qualifies
  end
end