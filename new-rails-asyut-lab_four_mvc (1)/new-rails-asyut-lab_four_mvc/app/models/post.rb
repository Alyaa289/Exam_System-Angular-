class Post < ApplicationRecord
  belongs_to :creator,class_name:"User", foreign_key: "user_id"
  has_many :editors_posts
  has_many :editors, through: :editors_posts, source: :user
end
