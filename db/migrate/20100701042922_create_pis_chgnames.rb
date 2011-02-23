class CreatePisChgnames < ActiveRecord::Migration
  def self.up
    create_table :pis_chgnames,:primary_key => :chgno do |t|
      t.string      :pis_personel_id
      t.date        :chgdate
      t.integer     :precode
      t.string      :fname
      t.string      :lname
      t.string      :ref
      t.integer     :chgcode
      t.string      :upd_user
      t.timestamps     
    end
  end

  def self.down
    drop_table :pis_chgnames
  end
end
