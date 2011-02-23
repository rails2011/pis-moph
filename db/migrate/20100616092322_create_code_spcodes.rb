class CreateCodeSpcodes < ActiveRecord::Migration
  def self.up
    create_table :code_spcodes do |t|
      t.string      :spcode
      t.string      :spdesc
      t.string      :groupid
      t.string      :spcodeold
      t.string      :splevel
      t.integer     :poscode
      t.string      :upd_user
      t.timestamps
    end
  end

  def self.down
    drop_table :code_spcodes
  end
end
