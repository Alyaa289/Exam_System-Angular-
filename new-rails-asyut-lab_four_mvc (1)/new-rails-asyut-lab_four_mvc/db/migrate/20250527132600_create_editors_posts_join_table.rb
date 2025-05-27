class CreateEditorsPostsJoinTable < ActiveRecord::Migration[7.0]
  def change
    create_table :editors_posts, id: false do |t|
      t.integer :user_id
      t.integer :post_id
    end
    add_index :editors_posts, [:user_id, :post_id], unique: true
  end
end