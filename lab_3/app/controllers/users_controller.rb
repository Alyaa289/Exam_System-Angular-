class UsersController < ApplicationController

  def index
    @users = User.all
  end

  def show
    @user =User.find(params[:id])
  end

  def new
    @user = User.new
  end

   def edit
            @user =User.find(params[:id])

  end       


  def create
    @user = User.new(name:params[:user][:name],dob:params[:user][:dob],email:params[:user][:email],phone_number:params[:user][:phone_number])

      if @user.save
        redirect_to @user, notice: "User was successfully created." 
      else
        render :new, status: :unprocessable_entity 
     
    end
  end

  def update
        @user =User.find(params[:id])

      if @user.update(name:params[:user][:name],dob:params[:user][:dob],email:params[:user][:email],phone_number:params[:user][:phone_number])
       redirect_to @user, notice: "User was successfully updated." 
      else
         render :edit, status: :unprocessable_entity 
      
    end
  end

  def destroy
        @user =User.find(params[:id])

        @user.destroy!

      redirect_to users_path, status: :see_other, notice: "User was successfully destroyed." 
    
  end

  

    
end
