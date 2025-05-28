class AddAddressToUsers < ActiveRecord::Migration[8.0]
  def change
    add_column :users, :Address, :string
  end
end
