class CreateCodeAbtypes < ActiveRecord::Migration
  def self.up
    create_table :code_abtypes do |t|
      t.integer :abcode
      t.string  :abtype
			t.string  :abcheck
			t.string  :abcount
			t.string  :abquota
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