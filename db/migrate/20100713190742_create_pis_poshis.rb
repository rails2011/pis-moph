class CreatePisPoshis < ActiveRecord::Migration
  def self.up
    create_table :pis_poshis do |t|
      t.string      :pis_personel_id
      t.integer     :historder
      t.date        :forcedate 
      t.integer     :poscode 
      t.integer     :excode
      t.integer     :epcode 
      t.integer     :mincode 
      t.integer     :divcode 
      t.integer     :deptcode 
      t.integer     :sdcode 
      t.integer     :sectcode 
      t.integer     :jobcode 
      t.integer     :hmcode 
      t.integer     :updcode 
      t.integer     :posid 
      t.integer     :c 
      t.integer     :salary 
      t.string      :refcmnd 
      t.text        :note 
      t.integer     :ptcode 
      t.string      :persontype 
      t.integer     :subdcode 
      t.integer     :officecode 
      t.integer     :histno 
      t.integer     :upsalary 
      t.string      :upd_user
      t.timestamps
    end
  end

  def self.down
    drop_table :pis_poshis
  end
end
