class CreateCodeJobs < ActiveRecord::Migration
  def self.up
    create_table :code_jobs do |t|
      t.integer :jobcode
      t.string  :jobname
      t.string  :stdcode
      t.string  :use_status
      t.string  :upd_user 
      t.timestamps
    end
  end

  def self.down
    drop_table :code_jobs
  end
end