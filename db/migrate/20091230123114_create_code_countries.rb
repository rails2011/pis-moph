class CreateCodeCountries < ActiveRecord::Migration
  def self.up
    create_table :code_countries do |t|
      t.integer  :cocode
      t.string   :coname
      t.string   :stdcode
      t.string   :use_status
      t.string   :upd_user
      t.timestamps
    end
  end

  def self.down
    drop_table :code_countries
  end
end
