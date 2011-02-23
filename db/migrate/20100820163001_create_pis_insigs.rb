class CreatePisInsigs < ActiveRecord::Migration
  def self.up
    create_table :pis_insigs do |t|
      t.string      :pis_personel_id
      t.integer     :dccode
      t.integer     :dcyear
      t.integer     :book
      t.string      :section
      t.integer     :pageno
      t.integer     :seq      
      t.date        :recdate
      t.date        :kitjadate
      t.date        :retdate
      t.string      :billno
      t.string      :bookno
      t.date        :billdate
      t.integer     :money
      t.integer     :poscode
      t.integer     :excode
      t.integer     :epcode
      t.integer     :c
      t.string      :upd_user
      t.integer     :ptcode
      t.string      :note
      t.timestamps
    end
  end

  def self.down
    drop_table :pis_insigs
  end
end
