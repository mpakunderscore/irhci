class ActionsController < ApplicationController
  def index
  end
  
  def show
    @action = Action.find(params[:id])
  end
  
  def new
  end
  
  def create
    @action = Action.new(params[:action_])
 
    @action.save
    render action: "index"
  end

end
 
private
  def action_params
    params.require(:action).permit(:name, :tags)
  end
  
  # def team
  #   render 'vox/team.html.erb'
  # end
  # 
  # def overview
  #   render 'vox/overview.html.erb'
  # end
  # 
  # def technologies
  #   render 'vox/technologies.html.erb'
  # end
  # 
  # def application
  #   render 'vox/application.html.erb'
  # end
  # 
  # def old
  #   render 'vox/old.html.erb'
  # end
# end