class CreateCodeEpnsubgroups < ActiveRecord::Migration
  def self.up
    create_table :code_epnsubgroups do |t|
      t.integer :sgcode
      t.string  :sgname
      t.string  :stdcode
      t.string  :use_status
      t.string  :upd_user   
      t.timestamps
    end
  end

  def self.down
    drop_table :code_epnsubgroups
  end
end