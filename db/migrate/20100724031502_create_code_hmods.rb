class CreateCodeHmods < ActiveRecord::Migration
  def self.up
    create_table :code_hmods,:primary_key => :hmcode do |t|
      t.string    :hmod
      t.string    :upd_user
      t.timestamps
    end
  end

  def self.down
    drop_table :code_hmods
  end
end
