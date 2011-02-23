class CreatePisJ18s < ActiveRecord::Migration
  def self.up
    create_table :pis_j18s do |t|
      t.integer     :posid
      t.string      :pis_personel_id
      t.integer     :divcode
      t.integer     :deptcode
      t.integer     :sdcode
      t.integer     :sectcode
      t.integer     :jobcode
      t.integer     :poscode
      t.integer     :excode
      t.integer     :epcode
      t.integer     :lastc
      t.integer     :lastsal
      t.integer     :nowc
      t.integer     :nowsal
      t.integer     :lastcasb
      t.integer     :lastsalasb
      t.integer     :nowcasb
      t.integer     :nowsalasb
      t.integer     :decmny
      t.integer     :incmny
      t.integer     :qualmny
      t.integer     :posupmny
      t.integer     :addmny
      t.string      :flagasb
      t.integer     :posmny
      t.integer     :bkdmny
      t.integer     :precode
      t.integer     :incode
      t.integer     :pcdcode
      t.integer     :ptcode
      t.string      :rem
      t.date        :emptydate
      t.date        :asbdate
      t.string      :flagupdate
      t.integer     :c      
      t.integer     :addc
      t.integer     :salary  
      t.integer     :rp_order
      t.integer     :posid2
      t.integer     :dcode2
      t.integer     :sdcode2
      t.integer     :seccode2
      t.integer     :jobcode2
      t.integer     :sortj182
      t.integer     :updapr
      t.integer     :updoct
      t.integer     :mincode
      t.integer     :subdcode
      t.integer     :octsalary
      t.integer     :octc
      t.integer     :aprsalary
      t.integer     :aprc
      t.string      :rem2
      t.string      :upd_user 
      t.timestamps

    end
  end

  def self.down
    drop_table :pis_j18s
  end
end
