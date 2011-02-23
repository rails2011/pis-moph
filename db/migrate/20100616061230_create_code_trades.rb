class CreateCodeTrades < ActiveRecord::Migration
  def self.up
    create_table :code_trades do |t|
      t.integer     :codetrade
      t.string      :trade
      t.string      :stdcode
      t.string      :use_status
      t.string      :upd_user
      t.timestamps
    end
  end

  def self.down
    drop_table :code_trades
  end
end
