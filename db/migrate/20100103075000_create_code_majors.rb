class CreateCodeMajors < ActiveRecord::Migration
  def self.up
    create_table :code_majors do |t|
      t.integer :macode
      t.string  :major
      t.string  :stdcode
      t.string  :use_status
      t.string  :upd_user 
      t.timestamps
    end
  end

  def self.down
    drop_table :code_majors
  end
end